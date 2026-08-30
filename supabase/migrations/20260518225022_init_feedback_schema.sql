
create table feedback (
  id text primary key,
  project text not null,
  type text not null,
  status text not null default 'open',
  title text not null,
  body text not null,
  author text,
  date timestamptz default now(),
  votes int default 0,
  comments int default 0,
  tags text[],
  reply text
);

create table feedback_votes (
  feedback_id text references feedback(id) on delete cascade,
  voter_id text not null,
  primary key (feedback_id, voter_id)
);

-- RLS: anon key 가 클라이언트에 노출되므로 반드시 켤 것
alter table feedback enable row level security;
alter table feedback_votes enable row level security;

create policy "public read"   on feedback for select using (true);
create policy "public insert" on feedback for insert with check (true);
create policy "public update" on feedback for update using (true);

create policy "votes read"   on feedback_votes for select using (true);
create policy "votes insert" on feedback_votes for insert with check (true);
create policy "votes delete" on feedback_votes for delete using (true);

create index feedback_date_idx on feedback (date desc);
create index feedback_project_idx on feedback (project);
create index feedback_status_idx on feedback (status);
