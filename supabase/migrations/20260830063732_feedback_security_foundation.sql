-- Additive foundation. Legacy public grants and RLS policies are intentionally unchanged.
create extension if not exists pgcrypto with schema extensions;
do $$ begin if not exists(select 1 from pg_catalog.pg_roles where rolname='feedback_writer') then create role feedback_writer nologin noinherit nobypassrls; end if; end $$;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private, extensions to feedback_writer;

create table if not exists private.feedback_security_config (
  key_id text primary key check(key_id ~ '^[a-z][a-z0-9_]{0,31}$'),
  key_state text not null check(key_state in ('active','retired')),
  hmac_key bytea not null check(pg_catalog.octet_length(hmac_key)=32)
);
create unique index if not exists feedback_security_one_active on private.feedback_security_config(key_state) where key_state='active';
alter table private.feedback_security_config enable row level security;
revoke all on private.feedback_security_config from public, anon, authenticated;
insert into private.feedback_security_config(key_id,key_state,hmac_key) values('active','active',extensions.gen_random_bytes(32)) on conflict(key_id) do nothing;

create table if not exists private.feedback_rate_limit_rules (
 action text primary key check(action in ('feedback.create','comment.create','vote.set')),
 window_seconds integer not null check(window_seconds between 1 and 3600),
 actor_limit integer not null check(actor_limit between 1 and 1000),
 ip_limit integer not null check(ip_limit between 1 and 10000),
 global_limit integer not null check(global_limit between 1 and 100000)
);
alter table private.feedback_rate_limit_rules enable row level security;
revoke all on private.feedback_rate_limit_rules from public, anon, authenticated;
insert into private.feedback_rate_limit_rules values
 ('feedback.create',600,3,20,100),('comment.create',600,10,60,300),('vote.set',600,60,240,2000)
on conflict(action) do nothing;
create table if not exists private.feedback_rate_limit_windows (
 scope text not null check(scope in ('actor','ip','global')),
 scope_hash text not null check(scope_hash ~ '^[a-f0-9]{64}$'),
 action text not null references private.feedback_rate_limit_rules(action),
 window_started_at timestamptz not null, request_count integer not null check(request_count>=1),
 primary key(scope,scope_hash,action,window_started_at)
);
alter table private.feedback_rate_limit_windows enable row level security;
revoke all on private.feedback_rate_limit_windows from public, anon, authenticated;

alter table public.feedback
 add constraint feedback_id_format check(id ~ '^[A-Za-z0-9_-]{1,64}$') not valid,
 add constraint feedback_project_allowed check(project in ('threadr','loomi','stackbench','notedeck','general')) not valid,
 add constraint feedback_type_allowed check(type in ('bug','feature','improve','other')) not valid,
 add constraint feedback_status_allowed check(status in ('open','progress','done','rejected')) not valid,
 add constraint feedback_title_length check(pg_catalog.char_length(title) between 1 and 80) not valid,
 add constraint feedback_body_length check(pg_catalog.char_length(body) between 1 and 800) not valid,
 add constraint feedback_author_length check(author is null or pg_catalog.char_length(author) between 1 and 24) not valid,
 add constraint feedback_votes_nonnegative check(votes>=0) not valid,
 add constraint feedback_comments_nonnegative check(comments>=0) not valid;
alter table public.feedback_comments
 add constraint feedback_comments_id_format check(id ~ '^[A-Za-z0-9_-]{1,64}$') not valid,
 add constraint feedback_comments_author_length check(pg_catalog.char_length(author) between 1 and 24) not valid,
 add constraint feedback_comments_body_length check(pg_catalog.char_length(body) between 1 and 500) not valid,
 add constraint feedback_comments_actor_length check(voter_id is null or pg_catalog.char_length(voter_id) between 1 and 128) not valid;
alter table public.feedback_votes add constraint feedback_votes_actor_length check(pg_catalog.char_length(voter_id) between 1 and 128) not valid;
alter table public.feedback validate constraint feedback_id_format; alter table public.feedback validate constraint feedback_project_allowed; alter table public.feedback validate constraint feedback_type_allowed; alter table public.feedback validate constraint feedback_status_allowed; alter table public.feedback validate constraint feedback_title_length; alter table public.feedback validate constraint feedback_body_length; alter table public.feedback validate constraint feedback_author_length; alter table public.feedback validate constraint feedback_votes_nonnegative; alter table public.feedback validate constraint feedback_comments_nonnegative;
alter table public.feedback_comments validate constraint feedback_comments_id_format; alter table public.feedback_comments validate constraint feedback_comments_author_length; alter table public.feedback_comments validate constraint feedback_comments_body_length; alter table public.feedback_comments validate constraint feedback_comments_actor_length; alter table public.feedback_votes validate constraint feedback_votes_actor_length;

create or replace function public.sync_feedback_comment_count() returns trigger language plpgsql security invoker set search_path='' as $$ begin if tg_op='INSERT' then update public.feedback set comments=comments+1 where id=new.feedback_id; return new; elsif tg_op='DELETE' then update public.feedback set comments=pg_catalog.greatest(0,comments-1) where id=old.feedback_id; return old; end if; return null; end; $$;
create or replace function private.feedback_hmac(p_value text,p_key_id text default null) returns text language plpgsql security definer set search_path='' as $$ declare k bytea; begin select hmac_key into k from private.feedback_security_config where (p_key_id is null and key_state='active') or key_id=p_key_id; if not found then return null; end if; return pg_catalog.encode(extensions.hmac(pg_catalog.convert_to(p_value,'utf8'),k,'sha256'),'hex'); end; $$;
create or replace function private.feedback_actor_hashes(p_actor text) returns table(actor_hash text) language sql security definer set search_path='' as $$ select pg_catalog.encode(extensions.hmac(pg_catalog.convert_to('actor:'||p_actor,'utf8'),c.hmac_key,'sha256'),'hex') from private.feedback_security_config c where c.key_state in ('active','retired'); $$;
create or replace function private.feedback_rate_rule(p_action text) returns integer[] language sql security invoker set search_path='' as $$ select array[rr.window_seconds,rr.actor_limit,rr.ip_limit,rr.global_limit]::integer[] from private.feedback_rate_limit_rules as rr where rr.action=p_action; $$;
create or replace function private.feedback_rate_limit_consume(p_action text,p_actor text,p_ip text) returns table(allowed boolean,retry_after_seconds integer) language plpgsql security definer set search_path='' as $$
declare v_rule integer[]; v_window_seconds integer; v_actor_limit integer; v_ip_limit integer; v_global_limit integer; v_window_started_at timestamptz; v_actor_hash text; v_ip_hash text; v_global_hash text; v_actor_allowed boolean; v_ip_allowed boolean; v_global_allowed boolean; v_retry_after_seconds integer; v_affected integer;
begin
 v_rule:=private.feedback_rate_rule(p_action); if v_rule is null or pg_catalog.cardinality(v_rule)<>4 then raise exception using errcode='22023',message='invalid_rate_limit_action'; end if; v_window_seconds:=v_rule[1]; v_actor_limit:=v_rule[2]; v_ip_limit:=v_rule[3]; v_global_limit:=v_rule[4];
 v_window_started_at:=pg_catalog.to_timestamp(pg_catalog.floor(pg_catalog.extract(epoch from pg_catalog.clock_timestamp())/v_window_seconds)*v_window_seconds); v_retry_after_seconds:=pg_catalog.greatest(1,v_window_seconds-pg_catalog.floor(pg_catalog.extract(epoch from pg_catalog.clock_timestamp()-v_window_started_at))::integer);
 v_actor_hash:=private.feedback_hmac('actor:'||p_actor); v_ip_hash:=private.feedback_hmac('ip:'||p_ip); v_global_hash:=private.feedback_hmac('global:'||p_action);
 insert into private.feedback_rate_limit_windows as q values('actor',v_actor_hash,p_action,v_window_started_at,1) on conflict(scope,scope_hash,action,window_started_at) do update set request_count=q.request_count+1 where q.request_count<v_actor_limit; get diagnostics v_affected=row_count; v_actor_allowed:=v_affected=1;
 insert into private.feedback_rate_limit_windows as q values('ip',v_ip_hash,p_action,v_window_started_at,1) on conflict(scope,scope_hash,action,window_started_at) do update set request_count=q.request_count+1 where q.request_count<v_ip_limit; get diagnostics v_affected=row_count; v_ip_allowed:=v_affected=1;
 insert into private.feedback_rate_limit_windows as q values('global',v_global_hash,p_action,v_window_started_at,1) on conflict(scope,scope_hash,action,window_started_at) do update set request_count=q.request_count+1 where q.request_count<v_global_limit; get diagnostics v_affected=row_count; v_global_allowed:=v_affected=1;
 allowed:=v_actor_allowed and v_ip_allowed and v_global_allowed; retry_after_seconds:=case when allowed then 0 else v_retry_after_seconds end; return next; return;
end; $$;
create or replace function private.feedback_valid_actor_ip(p_actor text,p_ip text) returns text language sql security definer set search_path='' as $$ select case when p_actor is null or p_actor !~ '^[A-Za-z0-9_-]{1,128}$' then 'invalid_actor' when p_ip is null or not pg_catalog.pg_input_is_valid(p_ip,'inet'::pg_catalog.regtype) then 'invalid_ip' when pg_catalog.family(p_ip::inet)=4 and pg_catalog.masklen(p_ip::inet)<>32 then 'invalid_ip' when pg_catalog.family(p_ip::inet)=6 and pg_catalog.masklen(p_ip::inet)<>128 then 'invalid_ip' else null end; $$;
create or replace function private.feedback_canonical_ip(p_ip text) returns text language sql security definer set search_path='' as $$ select case when pg_catalog.family(p_ip::inet)=4 then pg_catalog.host(p_ip::inet) else pg_catalog.network(pg_catalog.set_masklen(p_ip::inet,64))::text end; $$;

create or replace function public.feedback_create(p_project text,p_type text,p_title text,p_body text,p_author text,p_actor text,p_ip text) returns jsonb language plpgsql security definer set search_path='' as $$
declare e text; rate record; idv text; t timestamptz; authorv text; hashv text; ip_bucket text;
begin
 if p_project is null or p_project not in('threadr','loomi','stackbench','notedeck','general') then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_project'); end if;
 if p_type is null or p_type not in('bug','feature','improve','other') then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_type'); end if;
 if p_title is null or pg_catalog.btrim(p_title)='' or pg_catalog.char_length(p_title)>80 then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_title'); end if;
 if p_body is null or pg_catalog.btrim(p_body)='' or pg_catalog.char_length(p_body)>800 then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_body'); end if;
 if p_author is not null and p_author<>'' and (pg_catalog.btrim(p_author)='' or pg_catalog.char_length(p_author)>24) then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_author'); end if;
 e:=private.feedback_valid_actor_ip(p_actor,p_ip); if e is not null then return pg_catalog.jsonb_build_object('ok',false,'error',e); end if;
 ip_bucket:=private.feedback_canonical_ip(p_ip); select * into rate from private.feedback_rate_limit_consume('feedback.create',p_actor,ip_bucket); if not rate.allowed then return pg_catalog.jsonb_build_object('ok',false,'error','rate_limited','retry_after_seconds',rate.retry_after_seconds); end if;
 idv:='u'||pg_catalog.encode(extensions.gen_random_bytes(16),'hex'); t:=pg_catalog.clock_timestamp(); authorv:=pg_catalog.coalesce(pg_catalog.nullif(p_author,''),'익명'); hashv:=private.feedback_hmac('actor:'||p_actor);
 insert into public.feedback(id,project,type,status,title,body,author,date,votes,comments,tags) values(idv,p_project,p_type,'open',p_title,p_body,authorv,t,1,0,array[]::text[]); insert into public.feedback_votes(feedback_id,voter_id) values(idv,hashv);
 return pg_catalog.jsonb_build_object('ok',true,'id',idv,'project',p_project,'type',p_type,'status','open','title',p_title,'body',p_body,'author',authorv,'date',t,'votes',1,'comments',0,'voted',true);
end; $$;
create or replace function public.feedback_comment_create(p_feedback_id text,p_author text,p_body text,p_actor text,p_ip text) returns jsonb language plpgsql security definer set search_path='' as $$
declare e text; rate record; idv text; t timestamptz; authorv text; ip_bucket text;
begin
 if p_feedback_id is null or p_feedback_id !~ '^[A-Za-z0-9_-]{1,64}$' then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_feedback_id'); end if;
 if p_body is null or pg_catalog.btrim(p_body)='' or pg_catalog.char_length(p_body)>500 then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_body'); end if;
 if p_author is not null and p_author<>'' and (pg_catalog.btrim(p_author)='' or pg_catalog.char_length(p_author)>24) then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_author'); end if;
 e:=private.feedback_valid_actor_ip(p_actor,p_ip); if e is not null then return pg_catalog.jsonb_build_object('ok',false,'error',e); end if;
 ip_bucket:=private.feedback_canonical_ip(p_ip); select * into rate from private.feedback_rate_limit_consume('comment.create',p_actor,ip_bucket); if not rate.allowed then return pg_catalog.jsonb_build_object('ok',false,'error','rate_limited','retry_after_seconds',rate.retry_after_seconds); end if;
 perform 1 from public.feedback where id=p_feedback_id for update; if not found then return pg_catalog.jsonb_build_object('ok',false,'error','feedback_not_found'); end if;
 idv:='c'||pg_catalog.encode(extensions.gen_random_bytes(16),'hex'); t:=pg_catalog.clock_timestamp(); authorv:=pg_catalog.coalesce(pg_catalog.nullif(p_author,''),'익명');
 insert into public.feedback_comments(id,feedback_id,author,body,voter_id,created_at) values(idv,p_feedback_id,authorv,p_body,private.feedback_hmac('actor:'||p_actor),t);
 return pg_catalog.jsonb_build_object('ok',true,'id',idv,'feedback_id',p_feedback_id,'author',authorv,'body',p_body,'created_at',t);
end; $$;
create or replace function public.feedback_vote_set(p_feedback_id text,p_voted boolean,p_actor text,p_ip text) returns jsonb language plpgsql security definer set search_path='' as $$
declare e text; rate record; h text; n integer; active boolean; logical_was_voted boolean; inserted boolean:=false; deleted integer:=0; votesv integer; votedv boolean; ip_bucket text;
begin
 if p_feedback_id is null or p_feedback_id !~ '^[A-Za-z0-9_-]{1,64}$' then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_feedback_id'); end if;
 if p_voted is null then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_voted'); end if;
 e:=private.feedback_valid_actor_ip(p_actor,p_ip); if e is not null then return pg_catalog.jsonb_build_object('ok',false,'error',e); end if;
 ip_bucket:=private.feedback_canonical_ip(p_ip); select * into rate from private.feedback_rate_limit_consume('vote.set',p_actor,ip_bucket); if not rate.allowed then return pg_catalog.jsonb_build_object('ok',false,'error','rate_limited','retry_after_seconds',rate.retry_after_seconds); end if;
 select votes into votesv from public.feedback where id=p_feedback_id for update; if not found then return pg_catalog.jsonb_build_object('ok',false,'error','feedback_not_found'); end if;
 h:=private.feedback_hmac('actor:'||p_actor);
 perform 1 from public.feedback_votes where feedback_id=p_feedback_id and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor))) for update;
 select count(*),coalesce(bool_or(voter_id=h),false) into n,active from public.feedback_votes where feedback_id=p_feedback_id and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor)));
 logical_was_voted:=n>0;
 if p_voted then
   if not active then insert into public.feedback_votes(feedback_id,voter_id) values(p_feedback_id,h) on conflict do nothing returning true into inserted; inserted:=coalesce(inserted,false); if inserted and n=0 then update public.feedback set votes=votes+1 where id=p_feedback_id returning votes into votesv; end if; end if;
   delete from public.feedback_votes where feedback_id=p_feedback_id and voter_id<>h and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor)));
 else
   delete from public.feedback_votes where feedback_id=p_feedback_id and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor))); get diagnostics deleted=row_count;
   if deleted>0 then update public.feedback set votes=pg_catalog.greatest(0,votes-1) where id=p_feedback_id returning votes into votesv; end if;
 end if;
 select exists(select 1 from public.feedback_votes where feedback_id=p_feedback_id and voter_id=h) into votedv;
 return pg_catalog.jsonb_build_object('ok',true,'feedback_id',p_feedback_id,'votes',votesv,'voted',votedv,'changed',case when p_voted then not logical_was_voted else logical_was_voted end);
end; $$;
create or replace function public.feedback_vote_state(p_feedback_id text,p_actor text,p_ip text) returns jsonb language plpgsql security definer set search_path='' as $$
declare e text; votesv integer; votedv boolean;
begin
 if p_feedback_id is null or p_feedback_id !~ '^[A-Za-z0-9_-]{1,64}$' then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_feedback_id'); end if;
 e:=private.feedback_valid_actor_ip(p_actor,p_ip); if e is not null then return pg_catalog.jsonb_build_object('ok',false,'error',e); end if;
 select votes into votesv from public.feedback where id=p_feedback_id; if not found then return pg_catalog.jsonb_build_object('ok',false,'error','feedback_not_found'); end if;
 select exists(select 1 from public.feedback_votes where feedback_id=p_feedback_id and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor)))) into votedv;
 return pg_catalog.jsonb_build_object('ok',true,'feedback_id',p_feedback_id,'votes',votesv,'voted',votedv);
end; $$;

grant select(id,votes,comments) on public.feedback to feedback_writer; grant insert(id,project,type,status,title,body,author,date,votes,comments,tags),update(votes,comments) on public.feedback to feedback_writer; grant insert on public.feedback_comments to feedback_writer; grant select(feedback_id,voter_id),insert,delete on public.feedback_votes to feedback_writer;
grant execute on function private.feedback_hmac(text,text),private.feedback_actor_hashes(text),private.feedback_rate_limit_consume(text,text,text),private.feedback_valid_actor_ip(text,text),private.feedback_canonical_ip(text) to feedback_writer;
grant feedback_writer to postgres with inherit false, set true; grant create on schema public to feedback_writer;
alter default privileges for role postgres revoke execute on functions from public;
alter default privileges for role feedback_writer revoke execute on functions from public;
alter function public.feedback_create(text,text,text,text,text,text,text) owner to feedback_writer; alter function public.feedback_comment_create(text,text,text,text,text) owner to feedback_writer; alter function public.feedback_vote_set(text,boolean,text,text) owner to feedback_writer; alter function public.feedback_vote_state(text,text,text) owner to feedback_writer;
revoke create on schema public from feedback_writer; revoke set option for feedback_writer from postgres;
revoke all on function private.feedback_hmac(text,text),private.feedback_actor_hashes(text),private.feedback_rate_rule(text),private.feedback_rate_limit_consume(text,text,text),private.feedback_valid_actor_ip(text,text),private.feedback_canonical_ip(text),public.sync_feedback_comment_count(),public.feedback_create(text,text,text,text,text,text,text),public.feedback_comment_create(text,text,text,text,text),public.feedback_vote_set(text,boolean,text,text),public.feedback_vote_state(text,text,text) from public,anon,authenticated;
grant execute on function public.feedback_create(text,text,text,text,text,text,text),public.feedback_comment_create(text,text,text,text,text),public.feedback_vote_set(text,boolean,text,text),public.feedback_vote_state(text,text,text) to service_role;
