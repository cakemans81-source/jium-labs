begin;
select plan(21);

select ok((select count(*)=3 and bool_and(relrowsecurity) from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and c.relkind='r'),'all feedback tables retain RLS');
select ok(not exists(
  with expected(rel_name, column_name) as (
    values
      ('feedback'::name, 'id'::name), ('feedback'::name, 'project'::name), ('feedback'::name, 'type'::name), ('feedback'::name, 'status'::name), ('feedback'::name, 'title'::name), ('feedback'::name, 'body'::name), ('feedback'::name, 'author'::name), ('feedback'::name, 'date'::name), ('feedback'::name, 'votes'::name), ('feedback'::name, 'comments'::name), ('feedback'::name, 'tags'::name), ('feedback'::name, 'reply'::name),
      ('feedback_comments'::name, 'id'::name), ('feedback_comments'::name, 'feedback_id'::name), ('feedback_comments'::name, 'author'::name), ('feedback_comments'::name, 'body'::name), ('feedback_comments'::name, 'voter_id'::name), ('feedback_comments'::name, 'created_at'::name),
      ('feedback_votes'::name, 'feedback_id'::name), ('feedback_votes'::name, 'voter_id'::name)
  ), actual as (
    select c.relname::name as rel_name, a.attname::name as column_name from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace join pg_catalog.pg_attribute a on a.attrelid=c.oid where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and a.attnum>0 and not a.attisdropped
  )
  select 1 from expected e full join actual a on a.rel_name=e.rel_name and a.column_name=e.column_name where e.rel_name is null or a.rel_name is null
),'target table columns exactly match the lockdown ACL boundary');
select ok(not exists(
  with expected(rel_name, policy_name, policy_cmd, policy_roles, permissive, using_expression, check_expression) as (
    values
      ('feedback'::name, 'feedback_client_read'::name, 'r'::"char", array[(select oid from pg_catalog.pg_roles where rolname='anon'),(select oid from pg_catalog.pg_roles where rolname='authenticated')]::oid[], true, 'true'::text, null::text),
      ('feedback'::name, 'feedback_writer_read'::name, 'r'::"char", array[(select oid from pg_catalog.pg_roles where rolname='feedback_writer')]::oid[], true, 'true'::text, null::text),
      ('feedback'::name, 'feedback_writer_insert'::name, 'a'::"char", array[(select oid from pg_catalog.pg_roles where rolname='feedback_writer')]::oid[], true, null::text, 'true'::text),
      ('feedback'::name, 'feedback_writer_update'::name, 'w'::"char", array[(select oid from pg_catalog.pg_roles where rolname='feedback_writer')]::oid[], true, 'true'::text, 'true'::text),
      ('feedback_comments'::name, 'feedback_comments_client_read'::name, 'r'::"char", array[(select oid from pg_catalog.pg_roles where rolname='anon'),(select oid from pg_catalog.pg_roles where rolname='authenticated')]::oid[], true, 'true'::text, null::text),
      ('feedback_comments'::name, 'feedback_comments_writer_insert'::name, 'a'::"char", array[(select oid from pg_catalog.pg_roles where rolname='feedback_writer')]::oid[], true, null::text, 'true'::text),
      ('feedback_votes'::name, 'feedback_votes_writer_read'::name, 'r'::"char", array[(select oid from pg_catalog.pg_roles where rolname='feedback_writer')]::oid[], true, 'true'::text, null::text),
      ('feedback_votes'::name, 'feedback_votes_writer_insert'::name, 'a'::"char", array[(select oid from pg_catalog.pg_roles where rolname='feedback_writer')]::oid[], true, null::text, 'true'::text),
      ('feedback_votes'::name, 'feedback_votes_writer_delete'::name, 'd'::"char", array[(select oid from pg_catalog.pg_roles where rolname='feedback_writer')]::oid[], true, 'true'::text, null::text)
  ), actual as (
    select c.relname::name as rel_name, p.polname::name as policy_name, p.polcmd as policy_cmd, p.polroles as policy_roles, p.polpermissive as permissive, pg_catalog.pg_get_expr(p.polqual,p.polrelid) as using_expression, pg_catalog.pg_get_expr(p.polwithcheck,p.polrelid) as check_expression from pg_catalog.pg_policy p join pg_catalog.pg_class c on c.oid=p.polrelid join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes')
  )
  select 1 from expected e full join actual a on a.rel_name=e.rel_name and a.policy_name=e.policy_name and a.policy_cmd=e.policy_cmd and a.policy_roles=e.policy_roles and a.permissive=e.permissive and a.using_expression is not distinct from e.using_expression and a.check_expression is not distinct from e.check_expression where e.rel_name is null or a.rel_name is null
),'exactly nine lockdown policies replace the legacy public write policies');
select ok(not exists(
  with roles(role_name, grantee) as (
    values ('PUBLIC'::text, 0::oid), ('anon'::text, (select oid from pg_catalog.pg_roles where rolname='anon')), ('authenticated'::text, (select oid from pg_catalog.pg_roles where rolname='authenticated')), ('service_role'::text, (select oid from pg_catalog.pg_roles where rolname='service_role'))
  ), expected(rel_name, grantee, privilege_type, is_grantable) as (
    values ('feedback'::name, (select grantee from roles where role_name='anon'), 'SELECT'::text, false), ('feedback'::name, (select grantee from roles where role_name='authenticated'), 'SELECT'::text, false)
  ), actual as (
    select c.relname::name as rel_name, x.grantee, x.privilege_type, x.is_grantable from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace cross join lateral pg_catalog.aclexplode(coalesce(c.relacl,pg_catalog.acldefault('r',c.relowner))) x where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and x.grantee in (select grantee from roles)
  )
  select 1 from expected e full join actual a on a.rel_name=e.rel_name and a.grantee=e.grantee and a.privilege_type=e.privilege_type and a.is_grantable=e.is_grantable where e.rel_name is null or a.rel_name is null
),'relation ACL matrix permits only client feedback SELECT');
select ok(not exists(
  with roles(role_name, grantee) as (
    values ('PUBLIC'::text, 0::oid), ('anon'::text, (select oid from pg_catalog.pg_roles where rolname='anon')), ('authenticated'::text, (select oid from pg_catalog.pg_roles where rolname='authenticated')), ('service_role'::text, (select oid from pg_catalog.pg_roles where rolname='service_role'))
  ), expected(rel_name, column_name, grantee, privilege_type, is_grantable) as (
    values
      ('feedback_comments'::name, 'id'::name, (select grantee from roles where role_name='anon'), 'SELECT'::text, false), ('feedback_comments'::name, 'feedback_id'::name, (select grantee from roles where role_name='anon'), 'SELECT'::text, false), ('feedback_comments'::name, 'author'::name, (select grantee from roles where role_name='anon'), 'SELECT'::text, false), ('feedback_comments'::name, 'body'::name, (select grantee from roles where role_name='anon'), 'SELECT'::text, false), ('feedback_comments'::name, 'created_at'::name, (select grantee from roles where role_name='anon'), 'SELECT'::text, false),
      ('feedback_comments'::name, 'id'::name, (select grantee from roles where role_name='authenticated'), 'SELECT'::text, false), ('feedback_comments'::name, 'feedback_id'::name, (select grantee from roles where role_name='authenticated'), 'SELECT'::text, false), ('feedback_comments'::name, 'author'::name, (select grantee from roles where role_name='authenticated'), 'SELECT'::text, false), ('feedback_comments'::name, 'body'::name, (select grantee from roles where role_name='authenticated'), 'SELECT'::text, false), ('feedback_comments'::name, 'created_at'::name, (select grantee from roles where role_name='authenticated'), 'SELECT'::text, false)
  ), actual as (
    select c.relname::name as rel_name, a.attname::name as column_name, x.grantee, x.privilege_type, x.is_grantable from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace join pg_catalog.pg_attribute a on a.attrelid=c.oid and a.attnum>0 and not a.attisdropped cross join lateral pg_catalog.aclexplode(coalesce(a.attacl,array[]::pg_catalog.aclitem[])) x where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and x.grantee in (select grantee from roles)
  )
  select 1 from expected e full join actual a on a.rel_name=e.rel_name and a.column_name=e.column_name and a.grantee=e.grantee and a.privilege_type=e.privilege_type and a.is_grantable=e.is_grantable where e.rel_name is null or a.rel_name is null
),'column ACL matrix exposes only the five safe comment columns');
select ok(
  not exists(
    with expected(rel_name, privilege_type, is_grantable) as (
      values ('feedback_comments'::name, 'INSERT'::text, false), ('feedback_votes'::name, 'INSERT'::text, false), ('feedback_votes'::name, 'DELETE'::text, false)
    ), actual as (
      select c.relname::name as rel_name, x.privilege_type, x.is_grantable from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace cross join lateral pg_catalog.aclexplode(coalesce(c.relacl,pg_catalog.acldefault('r',c.relowner))) x where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and x.grantee=(select oid from pg_catalog.pg_roles where rolname='feedback_writer')
    )
    select 1 from expected e full join actual a on a.rel_name=e.rel_name and a.privilege_type=e.privilege_type and a.is_grantable=e.is_grantable where e.rel_name is null or a.rel_name is null
  )
  and not exists(
    with expected(rel_name, column_name, privilege_type, is_grantable) as (
      values
        ('feedback'::name, 'id'::name, 'SELECT'::text, false), ('feedback'::name, 'votes'::name, 'SELECT'::text, false), ('feedback'::name, 'comments'::name, 'SELECT'::text, false),
        ('feedback'::name, 'id'::name, 'INSERT'::text, false), ('feedback'::name, 'project'::name, 'INSERT'::text, false), ('feedback'::name, 'type'::name, 'INSERT'::text, false), ('feedback'::name, 'status'::name, 'INSERT'::text, false), ('feedback'::name, 'title'::name, 'INSERT'::text, false), ('feedback'::name, 'body'::name, 'INSERT'::text, false), ('feedback'::name, 'author'::name, 'INSERT'::text, false), ('feedback'::name, 'date'::name, 'INSERT'::text, false), ('feedback'::name, 'votes'::name, 'INSERT'::text, false), ('feedback'::name, 'comments'::name, 'INSERT'::text, false), ('feedback'::name, 'tags'::name, 'INSERT'::text, false),
        ('feedback'::name, 'votes'::name, 'UPDATE'::text, false), ('feedback'::name, 'comments'::name, 'UPDATE'::text, false),
        ('feedback_votes'::name, 'feedback_id'::name, 'SELECT'::text, false), ('feedback_votes'::name, 'voter_id'::name, 'SELECT'::text, false)
    ), actual as (
      select c.relname::name as rel_name, a.attname::name as column_name, x.privilege_type, x.is_grantable from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace join pg_catalog.pg_attribute a on a.attrelid=c.oid and a.attnum>0 and not a.attisdropped cross join lateral pg_catalog.aclexplode(coalesce(a.attacl,array[]::pg_catalog.aclitem[])) x where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and x.grantee=(select oid from pg_catalog.pg_roles where rolname='feedback_writer')
    )
    select 1 from expected e full join actual a on a.rel_name=e.rel_name and a.column_name=e.column_name and a.privilege_type=e.privilege_type and a.is_grantable=e.is_grantable where e.rel_name is null or a.rel_name is null
  )
  and not exists(
    with target_sequences as (
      select c.oid from pg_catalog.pg_class c join pg_catalog.pg_depend d on d.classid='pg_catalog.pg_class'::pg_catalog.regclass and d.objid=c.oid and d.refclassid='pg_catalog.pg_class'::pg_catalog.regclass and d.deptype in ('a','i') join pg_catalog.pg_class t on t.oid=d.refobjid join pg_catalog.pg_namespace tn on tn.oid=t.relnamespace where c.relkind='S' and tn.nspname='public' and t.relname in ('feedback','feedback_comments','feedback_votes')
    )
    select 1 from target_sequences s where pg_catalog.has_sequence_privilege((select oid from pg_catalog.pg_roles where rolname='feedback_writer'),s.oid,'USAGE,SELECT,UPDATE') or exists(select 1 from pg_catalog.pg_class c cross join lateral pg_catalog.aclexplode(coalesce(c.relacl,array[]::pg_catalog.aclitem[])) x where c.oid=s.oid and x.grantee=(select oid from pg_catalog.pg_roles where rolname='feedback_writer'))
  ),
  'feedback_writer target ACLs exactly match the Foundation minimum and no target sequence privilege remains'
);
select ok(not exists(
  with roles(role_name, grantee) as (
    values ('PUBLIC'::text, 0::oid), ('anon'::text, (select oid from pg_catalog.pg_roles where rolname='anon')), ('authenticated'::text, (select oid from pg_catalog.pg_roles where rolname='authenticated')), ('service_role'::text, (select oid from pg_catalog.pg_roles where rolname='service_role'))
  ), target_sequences as (
    select c.oid from pg_catalog.pg_class c join pg_catalog.pg_depend d on d.classid='pg_catalog.pg_class'::pg_catalog.regclass and d.objid=c.oid and d.refclassid='pg_catalog.pg_class'::pg_catalog.regclass and d.deptype in ('a','i') join pg_catalog.pg_class t on t.oid=d.refobjid join pg_catalog.pg_namespace tn on tn.oid=t.relnamespace where c.relkind='S' and tn.nspname='public' and t.relname in ('feedback','feedback_comments','feedback_votes')
  )
  select 1 from target_sequences s cross join roles r cross join lateral pg_catalog.aclexplode(coalesce((select relacl from pg_catalog.pg_class where oid=s.oid),array[]::pg_catalog.aclitem[])) x where x.grantee=r.grantee
),'target-owned sequence ACLs deny PUBLIC, anon, authenticated, and service_role');
select ok(not exists(
  with roles(role_name, role_oid) as (values ('anon'::text,(select oid from pg_catalog.pg_roles where rolname='anon')),('authenticated'::text,(select oid from pg_catalog.pg_roles where rolname='authenticated')),('service_role'::text,(select oid from pg_catalog.pg_roles where rolname='service_role'))), target_sequences as (select c.oid from pg_catalog.pg_class c join pg_catalog.pg_depend d on d.classid='pg_catalog.pg_class'::pg_catalog.regclass and d.objid=c.oid and d.refclassid='pg_catalog.pg_class'::pg_catalog.regclass and d.deptype in ('a','i') join pg_catalog.pg_class t on t.oid=d.refobjid join pg_catalog.pg_namespace tn on tn.oid=t.relnamespace where c.relkind='S' and tn.nspname='public' and t.relname in ('feedback','feedback_comments','feedback_votes')) select 1 from target_sequences s cross join roles r where pg_catalog.has_sequence_privilege(r.role_oid,s.oid,'USAGE,SELECT,UPDATE')
),'target-owned sequences have no effective client or service-role privilege');
select ok((select count(*)=4 and bool_and(pg_catalog.pg_get_userbyid(proowner)='feedback_writer') and bool_and(prosecdef) and bool_and(coalesce(proconfig in (array['search_path=']::text[],array['search_path=""']::text[]),false)) and bool_and(pg_catalog.has_function_privilege('service_role',oid,'EXECUTE')) from pg_catalog.pg_proc where oid in ('public.feedback_create(text,text,text,text,text,text,text)'::pg_catalog.regprocedure,'public.feedback_comment_create(text,text,text,text,text)'::pg_catalog.regprocedure,'public.feedback_vote_set(text,boolean,text,text)'::pg_catalog.regprocedure,'public.feedback_vote_state(text,text,text)'::pg_catalog.regprocedure)),'service-role RPCs remain writer-owned SECURITY DEFINER with empty search_path');
select ok(not exists(select 1 from pg_catalog.pg_proc p cross join lateral pg_catalog.aclexplode(coalesce(p.proacl,pg_catalog.acldefault('f',p.proowner))) x where p.oid in ('public.feedback_create(text,text,text,text,text,text,text)'::pg_catalog.regprocedure,'public.feedback_comment_create(text,text,text,text,text)'::pg_catalog.regprocedure,'public.feedback_vote_set(text,boolean,text,text)'::pg_catalog.regprocedure,'public.feedback_vote_state(text,text,text)'::pg_catalog.regprocedure) and x.privilege_type='EXECUTE' and x.grantee not in (p.proowner,(select oid from pg_catalog.pg_roles where rolname='service_role'))),'only service_role receives explicit RPC EXECUTE');

set local role anon;
select lives_ok($$ select id,project,type,status,title,body,author,date,votes,comments,tags,reply from public.feedback limit 1 $$,'anon feedback read executes');
select lives_ok($$ select id,feedback_id,author,body,created_at from public.feedback_comments limit 1 $$,'anon safe comment read executes');
select throws_ok($$ select voter_id from public.feedback_comments limit 1 $$,'42501',null,'anon cannot read comment voter_id');
select throws_ok($$ select feedback_id,voter_id from public.feedback_votes limit 1 $$,'42501',null,'anon cannot read votes');
select throws_ok($$ insert into public.feedback(id,project,type,status,title,body,author,date,votes,comments,tags) values('lockdown_direct_write','threadr','bug','open','denied','denied','tester',pg_catalog.clock_timestamp(),0,0,array[]::text[]) $$,'42501',null,'anon direct feedback write is denied');
reset role;

set local role authenticated;
select lives_ok($$ select id,project,type,status,title,body,author,date,votes,comments,tags,reply from public.feedback limit 1 $$,'authenticated feedback read executes');
select lives_ok($$ select id,feedback_id,author,body,created_at from public.feedback_comments limit 1 $$,'authenticated safe comment read executes');
select throws_ok($$ select voter_id from public.feedback_comments limit 1 $$,'42501',null,'authenticated cannot read comment voter_id');
select throws_ok($$ select feedback_id,voter_id from public.feedback_votes limit 1 $$,'42501',null,'authenticated cannot read votes');
select throws_ok($$ insert into public.feedback(id,project,type,status,title,body,author,date,votes,comments,tags) values('lockdown_authenticated_write','threadr','bug','open','denied','denied','tester',pg_catalog.clock_timestamp(),0,0,array[]::text[]) $$,'42501',null,'authenticated direct feedback write is denied');
reset role;

do $$
declare created jsonb; commented jsonb; voted jsonb; unvoted jsonb; revoted jsonb; feedback_id text;
begin
  execute 'set local role service_role';
  created:=public.feedback_create('threadr','bug','lockdown RPC','transaction-scoped verification',null,'lockdown_test_actor','198.51.100.41');
  feedback_id:=created->>'id';
  if created->>'ok'<>'true' then raise exception 'create RPC failed'; end if;
  commented:=public.feedback_comment_create(feedback_id,'tester','transaction-scoped comment','lockdown_test_actor','198.51.100.41');
  voted:=public.feedback_vote_set(feedback_id,true,'lockdown_test_actor_2','198.51.100.42');
  unvoted:=public.feedback_vote_set(feedback_id,false,'lockdown_test_actor_2','198.51.100.42');
  revoted:=public.feedback_vote_set(feedback_id,true,'lockdown_test_actor_2','198.51.100.42');
  if commented->>'ok'<>'true' or voted->>'ok'<>'true' or unvoted->>'ok'<>'true' or revoted->>'ok'<>'true' or revoted->>'voted'<>'true' then raise exception 'service RPC transition failed'; end if;
  execute 'reset role';
end;
$$;
select pass('service-role RPC create/comment/vote/unvote/revote works in rollback scope');

select * from finish();
rollback;
