begin;
select plan(24);
select ok(pg_catalog.has_role('feedback_writer'),'writer exists');
select ok(not(select rolcanlogin from pg_catalog.pg_roles where rolname='feedback_writer'),'writer nologin');
select ok(not(select rolinherit from pg_catalog.pg_roles where rolname='feedback_writer'),'writer noinherit');
select ok(not(select rolbypassrls from pg_catalog.pg_roles where rolname='feedback_writer'),'writer no bypassrls');
select ok(not pg_catalog.pg_has_role('postgres','feedback_writer','usage') and not exists(select 1 from pg_catalog.pg_auth_members m join pg_catalog.pg_roles r on r.oid=m.roleid where r.rolname='feedback_writer' and (m.inherit_option or m.set_option)),'writer membership has neither USE nor SET');
select ok((select relowner::pg_catalog.regrole::text='postgres' from pg_catalog.pg_class where oid='private.feedback_security_config'::pg_catalog.regclass),'private config stays postgres-owned');
select ok((select count(*) from private.feedback_security_config where key_state='active')=1,'exactly one active HMAC key');
select ok((select pg_catalog.octet_length(hmac_key)=32 from private.feedback_security_config where key_state='active'),'active key has 32 bytes');
select ok((select pg_catalog.pg_get_userbyid(proowner)='feedback_writer' from pg_catalog.pg_proc where oid='public.feedback_create(text,text,text,text,text,text,text)'::pg_catalog.regprocedure),'public RPC owner is writer');
select ok(not pg_catalog.has_schema_privilege('feedback_writer','public','create'),'writer has no public CREATE');
select ok(not pg_catalog.has_function_privilege('anon','public.feedback_create(text,text,text,text,text,text,text)','execute'),'anon denied RPC');
select ok(not pg_catalog.has_function_privilege('authenticated','public.feedback_vote_set(text,boolean,text,text)','execute'),'authenticated denied RPC');
select ok(pg_catalog.has_function_privilege('service_role','public.feedback_create(text,text,text,text,text,text,text)','execute'),'service role RPC path granted');
select ok(not exists(select 1 from pg_catalog.pg_roles r left join pg_catalog.pg_default_acl d on d.defaclrole=r.oid and d.defaclnamespace=0 and d.defaclobjtype='f' cross join lateral pg_catalog.aclexplode(pg_catalog.coalesce(d.defaclacl,pg_catalog.acldefault('f',r.oid))) x where r.rolname in('postgres','feedback_writer') and x.grantee=0 and x.privilege_type='EXECUTE'),'creator global defaults deny PUBLIC EXECUTE');
select ok((public.feedback_create(null,'bug','title','body',null,'actor1','192.0.2.1')->>'error')='invalid_project','invalid enum result is explicit');
select ok((public.feedback_vote_set('bad id!',true,'actor1','192.0.2.1')->>'error')='invalid_feedback_id','invalid id precedes CHECK');
select ok((public.feedback_vote_set('valid_id',null,'actor1','192.0.2.1')->>'error')='invalid_voted','null voted is an explicit result');
select ok((public.feedback_vote_state('valid_id','actor1','not-an-ip')->>'error')='invalid_ip','invalid IP result is explicit');
select ok((public.feedback_vote_state('valid_id','actor1','192.0.2.1/24')->>'error')='invalid_ip','CIDR input is rejected');
set local role service_role;
select public.feedback_create('threadr','bug','service call','service-role test',null,'serviceactor','192.0.2.1');
reset role;
select pass('service role executes the public RPC path');
do $$
declare r jsonb; fid text; active_hash text; retired_hash text;
begin
  r:=public.feedback_create('threadr','bug','legacy vote','legacy test',null,'legacyactor','192.0.2.2'); fid:=r->>'id';
  active_hash:=private.feedback_hmac('actor:legacyactor');
  insert into private.feedback_security_config(key_id,key_state,hmac_key) values('retired_fixture','retired',extensions.gen_random_bytes(32)) on conflict(key_id) do nothing;
  retired_hash:=private.feedback_hmac('actor:legacyactor','retired_fixture');
  delete from public.feedback_votes where feedback_id=fid;
  insert into public.feedback_votes(feedback_id,voter_id) values(fid,'legacyactor'),(fid,retired_hash),(fid,active_hash);
  r:=public.feedback_vote_set(fid,true,'legacyactor','192.0.2.2');
  if r->>'ok'<>'true' or r->>'changed'<>'false' or (select votes from public.feedback where id=fid)<>1 or (select count(*) from public.feedback_votes where feedback_id=fid)<>1 or exists(select 1 from public.feedback_votes where feedback_id=fid and voter_id='legacyactor') then raise exception 'legacy vote transition failed'; end if;
  insert into public.feedback_votes(feedback_id,voter_id) values(fid,'legacyactor'),(fid,retired_hash);
  r:=public.feedback_vote_set(fid,false,'legacyactor','192.0.2.2');
  if r->>'changed'<>'true' or r->>'voted'<>'false' or (select votes from public.feedback where id=fid)<>0 or exists(select 1 from public.feedback_votes where feedback_id=fid) then raise exception 'legacy logical unvote counter failed'; end if;
end; $$;
select pass('legacy raw vote migrates to active hash without duplicate');
do $$
declare r jsonb; global_before integer; actor_hash text; old_ip_hash text; new_ip_hash text;
begin
  actor_hash:=private.feedback_hmac('actor:rateactor'); old_ip_hash:=private.feedback_hmac('ip:192.0.2.3'); new_ip_hash:=private.feedback_hmac('ip:192.0.2.4');
  select coalesce(request_count,0) into global_before from private.feedback_rate_limit_windows where action='feedback.create' and scope='global' and scope_hash=private.feedback_hmac('global:feedback.create');
  perform public.feedback_create('threadr','bug','rate1','rate test',null,'rateactor','192.0.2.3');
  perform public.feedback_create('threadr','bug','rate2','rate test',null,'rateactor','192.0.2.3');
  perform public.feedback_create('threadr','bug','rate3','rate test',null,'rateactor','192.0.2.3');
  r:=public.feedback_create('threadr','bug','rate4','rate test',null,'rateactor','192.0.2.3');
  perform public.feedback_create('threadr','bug','rate5','rate test',null,'rateactor','192.0.2.4');
  if r->>'error'<>'rate_limited' or (select request_count from private.feedback_rate_limit_windows where action='feedback.create' and scope='actor' and scope_hash=actor_hash)<>3 or (select request_count from private.feedback_rate_limit_windows where action='feedback.create' and scope='ip' and scope_hash=old_ip_hash)<>4 or (select request_count from private.feedback_rate_limit_windows where action='feedback.create' and scope='ip' and scope_hash=new_ip_hash)<>1 or (select request_count from private.feedback_rate_limit_windows where action='feedback.create' and scope='global' and scope_hash=private.feedback_hmac('global:feedback.create'))<>global_before+5 then raise exception 'rate buckets were not all consumed'; end if;
end; $$;
select pass('denial consumes actor IP and global buckets');
do $$
declare r jsonb; fid text; before_count integer; after_count integer;
begin
  r:=public.feedback_create('threadr','bug','comment parent','comment test',null,'commentactor','192.0.2.9'); fid:=r->>'id'; select comments into before_count from public.feedback where id=fid;
  execute 'set local role service_role'; r:=public.feedback_comment_create(fid,'tester','body','commentactor','192.0.2.9'); execute 'reset role';
  select comments into after_count from public.feedback where id=fid;
  if r->>'ok'<>'true' or after_count<>before_count+1 then raise exception 'service comment trigger failed'; end if;
end; $$;
select pass('service-role comment increments the parent counter');
do $$
begin
  perform public.feedback_create('threadr','bug','ipv6a','ip test',null,'ipactor1','2001:db8:1:2::1');
  perform public.feedback_create('threadr','bug','ipv6b','ip test',null,'ipactor2','2001:db8:1:2::2');
  if (select count(*) from private.feedback_rate_limit_windows where scope='ip' and scope_hash=private.feedback_hmac('ip:2001:db8:1:2::/64'))<>1 or (select request_count from private.feedback_rate_limit_windows where scope='ip' and scope_hash=private.feedback_hmac('ip:2001:db8:1:2::/64'))<>2 then raise exception 'IPv6 canonical bucket failed'; end if;
end; $$;
select pass('same IPv6 /64 shares one hashed IP bucket');
select * from finish();
rollback;
