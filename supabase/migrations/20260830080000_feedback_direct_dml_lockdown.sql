begin;

do $$
begin
  if (select count(*) from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and c.relkind='r' and c.relrowsecurity)=3 then
    null;
  else
    raise exception using errcode='P0001', message='feedback_lockdown_preflight_drift';
  end if;

  if exists (
    with expected(rel_name, column_name) as (
      values
        ('feedback'::name, 'id'::name), ('feedback'::name, 'project'::name), ('feedback'::name, 'type'::name), ('feedback'::name, 'status'::name), ('feedback'::name, 'title'::name), ('feedback'::name, 'body'::name), ('feedback'::name, 'author'::name), ('feedback'::name, 'date'::name), ('feedback'::name, 'votes'::name), ('feedback'::name, 'comments'::name), ('feedback'::name, 'tags'::name), ('feedback'::name, 'reply'::name),
        ('feedback_comments'::name, 'id'::name), ('feedback_comments'::name, 'feedback_id'::name), ('feedback_comments'::name, 'author'::name), ('feedback_comments'::name, 'body'::name), ('feedback_comments'::name, 'voter_id'::name), ('feedback_comments'::name, 'created_at'::name),
        ('feedback_votes'::name, 'feedback_id'::name), ('feedback_votes'::name, 'voter_id'::name)
    ), actual as (
      select c.relname::name as rel_name, a.attname::name as column_name
      from pg_catalog.pg_class c
      join pg_catalog.pg_namespace n on n.oid=c.relnamespace
      join pg_catalog.pg_attribute a on a.attrelid=c.oid
      where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and a.attnum>0 and not a.attisdropped
    )
    select 1 from expected e full join actual a on a.rel_name=e.rel_name and a.column_name=e.column_name where e.rel_name is null or a.rel_name is null
  ) then
    raise exception using errcode='P0001', message='feedback_lockdown_preflight_drift';
  end if;

  if exists (
    with expected(rel_name, policy_name, policy_cmd, policy_roles, permissive, using_expression, check_expression) as (
      values
        ('feedback'::name, 'public read'::name, 'r'::"char", array[0::oid], true, 'true'::text, null::text),
        ('feedback'::name, 'public insert'::name, 'a'::"char", array[0::oid], true, null::text, 'true'::text),
        ('feedback'::name, 'public update'::name, 'w'::"char", array[0::oid], true, 'true'::text, null::text),
        ('feedback_comments'::name, 'public read'::name, 'r'::"char", array[0::oid], true, 'true'::text, null::text),
        ('feedback_comments'::name, 'public insert'::name, 'a'::"char", array[0::oid], true, null::text, 'true'::text),
        ('feedback_comments'::name, 'public delete'::name, 'd'::"char", array[0::oid], true, 'true'::text, null::text),
        ('feedback_votes'::name, 'votes read'::name, 'r'::"char", array[0::oid], true, 'true'::text, null::text),
        ('feedback_votes'::name, 'votes insert'::name, 'a'::"char", array[0::oid], true, null::text, 'true'::text),
        ('feedback_votes'::name, 'votes delete'::name, 'd'::"char", array[0::oid], true, 'true'::text, null::text)
    ), actual as (
      select c.relname::name as rel_name, p.polname::name as policy_name, p.polcmd as policy_cmd, p.polroles as policy_roles, p.polpermissive as permissive, pg_catalog.pg_get_expr(p.polqual,p.polrelid) as using_expression, pg_catalog.pg_get_expr(p.polwithcheck,p.polrelid) as check_expression
      from pg_catalog.pg_policy p
      join pg_catalog.pg_class c on c.oid=p.polrelid
      join pg_catalog.pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes')
    )
    select 1
    from expected e
    full join actual a on a.rel_name=e.rel_name and a.policy_name=e.policy_name and a.policy_cmd=e.policy_cmd and a.policy_roles=e.policy_roles and a.permissive=e.permissive and a.using_expression is not distinct from e.using_expression and a.check_expression is not distinct from e.check_expression
    where e.rel_name is null or a.rel_name is null
  ) then
    raise exception using errcode='P0001', message='feedback_lockdown_preflight_drift';
  end if;

  if not (
    select count(*)=4
      and bool_and(pg_catalog.pg_get_userbyid(p.proowner)='feedback_writer')
      and bool_and(p.prosecdef)
      and bool_and(coalesce(p.proconfig in (array['search_path=']::text[], array['search_path=""']::text[]),false))
      and bool_and(pg_catalog.has_function_privilege('service_role',p.oid,'EXECUTE'))
      and bool_and(not exists (
        select 1
        from pg_catalog.aclexplode(coalesce(p.proacl,pg_catalog.acldefault('f',p.proowner))) x
        where x.privilege_type='EXECUTE'
          and x.grantee not in (p.proowner,(select oid from pg_catalog.pg_roles where rolname='service_role'))
      ))
    from pg_catalog.pg_proc p
    where p.oid in (
      'public.feedback_create(text,text,text,text,text,text,text)'::pg_catalog.regprocedure,
      'public.feedback_comment_create(text,text,text,text,text)'::pg_catalog.regprocedure,
      'public.feedback_vote_set(text,boolean,text,text)'::pg_catalog.regprocedure,
      'public.feedback_vote_state(text,text,text)'::pg_catalog.regprocedure
    )
  ) then
    raise exception using errcode='P0001', message='feedback_lockdown_preflight_drift';
  end if;

  if not (
    (select not rolcanlogin and not rolinherit and not rolbypassrls and not rolsuper and not rolcreaterole and not rolcreatedb and not rolreplication from pg_catalog.pg_roles where rolname='feedback_writer')
    and not pg_catalog.pg_has_role('postgres','feedback_writer','USAGE')
    and not exists(select 1 from pg_catalog.pg_auth_members membership join pg_catalog.pg_roles member_role on member_role.oid=membership.member join pg_catalog.pg_roles granted_role on granted_role.oid=membership.roleid where member_role.rolname='postgres' and granted_role.rolname='feedback_writer' and (membership.inherit_option or membership.set_option))
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','id','SELECT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','votes','SELECT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','comments','SELECT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','id','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','project','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','type','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','status','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','title','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','body','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','author','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','date','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','votes','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','comments','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','tags','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','votes','UPDATE')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback','comments','UPDATE')
    and pg_catalog.has_table_privilege('feedback_writer','public.feedback_comments','INSERT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback_votes','feedback_id','SELECT')
    and pg_catalog.has_column_privilege('feedback_writer','public.feedback_votes','voter_id','SELECT')
    and pg_catalog.has_table_privilege('feedback_writer','public.feedback_votes','INSERT')
    and pg_catalog.has_table_privilege('feedback_writer','public.feedback_votes','DELETE')
    and not pg_catalog.has_table_privilege('feedback_writer','public.feedback','SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')
    and not pg_catalog.has_table_privilege('feedback_writer','public.feedback_comments','SELECT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER')
    and not pg_catalog.has_table_privilege('feedback_writer','public.feedback_votes','SELECT,UPDATE,TRUNCATE,REFERENCES,TRIGGER')
    and not exists (
      with expected(rel_name, column_name, privilege_type) as (
        values
          ('feedback'::name, 'id'::name, 'SELECT'::text), ('feedback'::name, 'votes'::name, 'SELECT'::text), ('feedback'::name, 'comments'::name, 'SELECT'::text),
          ('feedback'::name, 'id'::name, 'INSERT'::text), ('feedback'::name, 'project'::name, 'INSERT'::text), ('feedback'::name, 'type'::name, 'INSERT'::text), ('feedback'::name, 'status'::name, 'INSERT'::text), ('feedback'::name, 'title'::name, 'INSERT'::text), ('feedback'::name, 'body'::name, 'INSERT'::text), ('feedback'::name, 'author'::name, 'INSERT'::text), ('feedback'::name, 'date'::name, 'INSERT'::text), ('feedback'::name, 'votes'::name, 'INSERT'::text), ('feedback'::name, 'comments'::name, 'INSERT'::text), ('feedback'::name, 'tags'::name, 'INSERT'::text),
          ('feedback'::name, 'votes'::name, 'UPDATE'::text), ('feedback'::name, 'comments'::name, 'UPDATE'::text),
          ('feedback_comments'::name, 'id'::name, 'INSERT'::text), ('feedback_comments'::name, 'feedback_id'::name, 'INSERT'::text), ('feedback_comments'::name, 'author'::name, 'INSERT'::text), ('feedback_comments'::name, 'body'::name, 'INSERT'::text), ('feedback_comments'::name, 'voter_id'::name, 'INSERT'::text), ('feedback_comments'::name, 'created_at'::name, 'INSERT'::text),
          ('feedback_votes'::name, 'feedback_id'::name, 'SELECT'::text), ('feedback_votes'::name, 'voter_id'::name, 'SELECT'::text), ('feedback_votes'::name, 'feedback_id'::name, 'INSERT'::text), ('feedback_votes'::name, 'voter_id'::name, 'INSERT'::text)
      ), actual as (
        select c.relname::name as rel_name, a.attname::name as column_name, privileges.privilege_type
        from pg_catalog.pg_class c
        join pg_catalog.pg_namespace n on n.oid=c.relnamespace
        join pg_catalog.pg_attribute a on a.attrelid=c.oid and a.attnum>0 and not a.attisdropped
        cross join unnest(array['SELECT','INSERT','UPDATE','REFERENCES']::text[]) as privileges(privilege_type)
        where n.nspname='public' and c.relname in ('feedback','feedback_comments','feedback_votes') and pg_catalog.has_column_privilege('feedback_writer',c.oid,a.attname,privileges.privilege_type)
      )
      select 1 from expected e full join actual a on a.rel_name=e.rel_name and a.column_name=e.column_name and a.privilege_type=e.privilege_type where e.rel_name is null or a.rel_name is null
    )
  ) then
    raise exception using errcode='P0001', message='feedback_lockdown_preflight_drift';
  end if;
end;
$$;

revoke all privileges on table public.feedback, public.feedback_comments, public.feedback_votes from public, anon, authenticated, service_role, feedback_writer;
revoke all privileges (id,project,type,status,title,body,author,date,votes,comments,tags,reply) on table public.feedback from public, anon, authenticated, service_role, feedback_writer;
revoke all privileges (id,feedback_id,author,body,voter_id,created_at) on table public.feedback_comments from public, anon, authenticated, service_role, feedback_writer;
revoke all privileges (feedback_id,voter_id) on table public.feedback_votes from public, anon, authenticated, service_role, feedback_writer;

do $$
declare sequence_name text;
begin
  for sequence_name in
    select pg_catalog.format('%I.%I', sequence_schema.nspname, sequence_class.relname)
    from pg_catalog.pg_class sequence_class
    join pg_catalog.pg_namespace sequence_schema on sequence_schema.oid=sequence_class.relnamespace
    join pg_catalog.pg_depend dependency on dependency.classid='pg_catalog.pg_class'::pg_catalog.regclass and dependency.objid=sequence_class.oid and dependency.refclassid='pg_catalog.pg_class'::pg_catalog.regclass and dependency.deptype in ('a','i')
    join pg_catalog.pg_class owning_table on owning_table.oid=dependency.refobjid
    join pg_catalog.pg_namespace owning_schema on owning_schema.oid=owning_table.relnamespace
    where sequence_class.relkind='S' and owning_schema.nspname='public' and owning_table.relname in ('feedback','feedback_comments','feedback_votes')
  loop
    execute pg_catalog.format('revoke all privileges on sequence %s from public, anon, authenticated, service_role, feedback_writer', sequence_name);
  end loop;
end;
$$;

drop policy "public read" on public.feedback;
drop policy "public insert" on public.feedback;
drop policy "public update" on public.feedback;
drop policy "public read" on public.feedback_comments;
drop policy "public insert" on public.feedback_comments;
drop policy "public delete" on public.feedback_comments;
drop policy "votes read" on public.feedback_votes;
drop policy "votes insert" on public.feedback_votes;
drop policy "votes delete" on public.feedback_votes;

create policy feedback_client_read on public.feedback for select to anon, authenticated using (true);
create policy feedback_writer_read on public.feedback for select to feedback_writer using (true);
create policy feedback_writer_insert on public.feedback for insert to feedback_writer with check (true);
create policy feedback_writer_update on public.feedback for update to feedback_writer using (true) with check (true);

create policy feedback_comments_client_read on public.feedback_comments for select to anon, authenticated using (true);
create policy feedback_comments_writer_insert on public.feedback_comments for insert to feedback_writer with check (true);

create policy feedback_votes_writer_read on public.feedback_votes for select to feedback_writer using (true);
create policy feedback_votes_writer_insert on public.feedback_votes for insert to feedback_writer with check (true);
create policy feedback_votes_writer_delete on public.feedback_votes for delete to feedback_writer using (true);

grant select(id,votes,comments) on public.feedback to feedback_writer;
grant insert(id,project,type,status,title,body,author,date,votes,comments,tags), update(votes,comments) on public.feedback to feedback_writer;
grant insert on public.feedback_comments to feedback_writer;
grant select(feedback_id,voter_id), insert, delete on public.feedback_votes to feedback_writer;

grant select on public.feedback to anon, authenticated;
grant select(id,feedback_id,author,body,created_at) on public.feedback_comments to anon, authenticated;

commit;
