# JIUM LABS — 배포 안내

## 파일 구성
- `index.html` — 메인 랜딩 페이지
- `feedback.html` — 베타 피드백 보드
- `styles.css` `components.css` `portfolio.css` `feedback.css` — 스타일
- `tweaks.js` — 디자인 토글 패널 (라이트/다크, 액센트, 헤로 베리언트)
- `sections.js` `sections2.js` — 메인 페이지 섹션 렌더러
- `feedback.js` — 피드백 보드 로직 (현재는 localStorage 데모)

## 빠른 배포 (Vercel + GitHub)

1. 이 폴더 전체를 GitHub 새 저장소에 푸시
2. vercel.com → New Project → 저장소 선택 → Deploy (빌드 설정 없음)
3. Vercel 대시보드 → Settings → Domains → 구매한 도메인 추가
4. 도메인 관리 페이지(가비아 등)에서 DNS를 Vercel이 알려주는 값으로 설정

루트 파일이 정적이므로 별도 빌드 설정 없이 그대로 배포됩니다.

## 다음 단계 — Supabase 연동 (피드백 보드 백엔드)

현재 `feedback.js` 의 데이터는 사용자 브라우저의 localStorage에만 저장됩니다.
실제 운영하려면 Supabase에 다음 테이블을 만들고 `feedback.js` 의 `load/save` 함수만 교체하면 됩니다:

```sql
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
```

`SUPABASE_URL` 과 `SUPABASE_ANON_KEY` 를 Vercel 환경변수로 등록한 뒤 클라이언트에서 호출하시면 됩니다.

다음 메시지로 "Supabase 연동 버전 만들어줘" 라고 하시면 위 SQL과 함께 동작하는 `feedback.js` 로 교체해드릴게요.
