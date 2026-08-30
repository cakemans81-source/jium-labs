-- Applied Foundation is immutable. This migration closes only RPC ACL defaults/current grants.
alter default privileges for role postgres revoke execute on functions from public, anon, authenticated;

grant feedback_writer to postgres with inherit false, set true;
set local role feedback_writer;
alter default privileges revoke execute on functions from public, anon, authenticated;

revoke all on function public.feedback_create(text,text,text,text,text,text,text) from public, anon, authenticated;
revoke all on function public.feedback_comment_create(text,text,text,text,text) from public, anon, authenticated;
revoke all on function public.feedback_vote_set(text,boolean,text,text) from public, anon, authenticated;
revoke all on function public.feedback_vote_state(text,text,text) from public, anon, authenticated;

grant execute on function public.feedback_create(text,text,text,text,text,text,text) to service_role;
grant execute on function public.feedback_comment_create(text,text,text,text,text) to service_role;
grant execute on function public.feedback_vote_set(text,boolean,text,text) to service_role;
grant execute on function public.feedback_vote_state(text,text,text) to service_role;

reset role;
revoke set option for feedback_writer from postgres;
