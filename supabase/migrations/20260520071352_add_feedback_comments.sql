
-- 댓글 테이블
create table feedback_comments (
  id text primary key default ('c' || substring(md5(random()::text || clock_timestamp()::text) from 1 for 12)),
  feedback_id text not null references feedback(id) on delete cascade,
  author text not null default '익명',
  body text not null,
  voter_id text,
  created_at timestamptz not null default now()
);

-- 인덱스: 피드백별 댓글 조회 + 시간순 정렬
create index feedback_comments_fid_idx on feedback_comments (feedback_id, created_at);

-- RLS: 읽기/작성 누구나 (피드백 본체와 동일 정책)
alter table feedback_comments enable row level security;
create policy "public read"   on feedback_comments for select using (true);
create policy "public insert" on feedback_comments for insert with check (true);
create policy "public delete" on feedback_comments for delete using (true);  -- 향후 작성자 본인 삭제용

-- 댓글 카운트 자동 동기화 트리거
create or replace function sync_feedback_comment_count()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    update feedback set comments = comments + 1 where id = NEW.feedback_id;
    return NEW;
  elsif tg_op = 'DELETE' then
    update feedback set comments = greatest(0, comments - 1) where id = OLD.feedback_id;
    return OLD;
  end if;
  return null;
end; $$ language plpgsql;

create trigger trg_feedback_comment_count
after insert or delete on feedback_comments
for each row execute function sync_feedback_comment_count();
