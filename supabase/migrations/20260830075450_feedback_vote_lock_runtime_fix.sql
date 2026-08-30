grant feedback_writer to postgres with inherit false, set true;
grant create on schema public to feedback_writer;
set local role feedback_writer;
create or replace function public.feedback_vote_set(p_feedback_id text,p_voted boolean,p_actor text,p_ip text) returns jsonb language plpgsql security definer set search_path='' as $$
declare e text; rate record; h text; n integer; active boolean; logical_was_voted boolean; inserted boolean:=false; deleted integer:=0; votesv integer; votedv boolean; ip_bucket text;
begin
 if p_feedback_id is null or p_feedback_id !~ '^[A-Za-z0-9_-]{1,64}$' then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_feedback_id'); end if; if p_voted is null then return pg_catalog.jsonb_build_object('ok',false,'error','invalid_voted'); end if; e:=private.feedback_valid_actor_ip(p_actor,p_ip); if e is not null then return pg_catalog.jsonb_build_object('ok',false,'error',e); end if; ip_bucket:=private.feedback_canonical_ip(p_ip); select * into rate from private.feedback_rate_limit_consume('vote.set',p_actor,ip_bucket); if not rate.allowed then return pg_catalog.jsonb_build_object('ok',false,'error','rate_limited','retry_after_seconds',rate.retry_after_seconds); end if;
 select votes into votesv from public.feedback where id=p_feedback_id for update; if not found then return pg_catalog.jsonb_build_object('ok',false,'error','feedback_not_found'); end if; h:=private.feedback_hmac('actor:'||p_actor);
 perform 1 from public.feedback_votes where feedback_id=p_feedback_id and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor)));
 select count(*),coalesce(bool_or(voter_id=h),false) into n,active from public.feedback_votes where feedback_id=p_feedback_id and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor))); logical_was_voted:=n>0;
 if p_voted then if not active then insert into public.feedback_votes(feedback_id,voter_id) values(p_feedback_id,h) on conflict do nothing returning true into inserted; inserted:=coalesce(inserted,false); if inserted and n=0 then update public.feedback set votes=votes+1 where id=p_feedback_id returning votes into votesv; end if; end if; delete from public.feedback_votes where feedback_id=p_feedback_id and voter_id<>h and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor))); else delete from public.feedback_votes where feedback_id=p_feedback_id and (voter_id=p_actor or voter_id in(select actor_hash from private.feedback_actor_hashes(p_actor))); get diagnostics deleted=row_count; if deleted>0 then update public.feedback set votes=greatest(0,votes-1) where id=p_feedback_id returning votes into votesv; end if; end if;
 select exists(select 1 from public.feedback_votes where feedback_id=p_feedback_id and voter_id=h) into votedv; return pg_catalog.jsonb_build_object('ok',true,'feedback_id',p_feedback_id,'votes',votesv,'voted',votedv,'changed',case when p_voted then not logical_was_voted else logical_was_voted end);
end; $$;
reset role;
revoke create on schema public from feedback_writer;
revoke set option for feedback_writer from postgres;
