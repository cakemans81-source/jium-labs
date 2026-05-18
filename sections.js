/* JIUM LABS — sections (portfolio edition) */
window.JIUM = window.JIUM || {};

/* ---------- HERO ---------- */
const HERO = {
  default: () => `
    <section class="hero hero--default section--flush">
      <div class="container hero__grid">
        <div class="hero__copy">
          <span class="eyebrow">JIUM LABS · 2026</span>
          <h1>필요한 도구를<br/><em>짓다.</em></h1>
          <p class="hero__lead">JIUM LABS는 소규모 팀이 매일 마주치는 반복 업무를 줄이는 <strong>실용적인 SaaS 제품</strong>을 차례로 만듭니다. 각 제품은 자체 도메인에서 독립적으로 운영됩니다.</p>
          <div class="hero__cta">
            <a class="btn btn--accent btn--lg" href="#projects">프로젝트 둘러보기 <span aria-hidden="true">→</span></a>
            <a class="btn btn--outline btn--lg" href="#cta">협업 문의</a>
          </div>
          <ul class="hero__meta">
            <li><span class="mono">서울 · 2026</span></li>
            <li><span class="mono">프로젝트 4종</span></li>
            <li><span class="mono">독립 도메인 운영</span></li>
          </ul>
        </div>
        <div class="hero__visual" aria-hidden="true">
          ${heroGridArt()}
        </div>
      </div>
    </section>
  `,
  marquee: () => `
    <section class="hero hero--marquee section--flush">
      <div class="container">
        <div class="hero__center">
          <span class="eyebrow">JIUM LABS · 2026</span>
          <h1 class="hero__h1--big">팀이 쓰는 도구를<br/><em>한 곳에서</em> 짓습니다.</h1>
          <p class="hero__lead hero__lead--center">하나의 스튜디오에서 출시한 여러 개의 SaaS. 각 제품은 자체 도메인에서 독립적으로 자랍니다.</p>
          <div class="hero__cta hero__cta--center">
            <a class="btn btn--accent btn--lg" href="#projects">프로젝트 4종 보기 <span aria-hidden="true">→</span></a>
            <a class="btn btn--outline btn--lg" href="#approach">스튜디오 철학</a>
          </div>
        </div>
      </div>
      <div class="marquee" aria-hidden="true">
        <div class="marquee__track">
          ${["Threadr / 고객 대화", "Loomi / 자동화 워크플로우", "Stackbench / 운영 대시보드", "Notedeck / 회의록", "— JIUM 09"].concat(["Threadr / 고객 대화", "Loomi / 자동화 워크플로우", "Stackbench / 운영 대시보드", "Notedeck / 회의록", "— JIUM 09"]).map(t => `<span class="marquee__item">${t}</span>`).join("")}
        </div>
      </div>
    </section>
  `,
  editor: () => `
    <section class="hero hero--editor section--flush">
      <div class="container hero__grid">
        <div class="hero__copy">
          <span class="eyebrow">JIUM LABS · 2026</span>
          <h1>작은 팀을 위한<br/>운영의 <em>레이어</em>.</h1>
          <p class="hero__lead">매뉴얼 대신 자동화로, 회의록 대신 결정 기록으로. 팀의 손에 익는 SaaS를 차례로 출시하는 스튜디오입니다.</p>
          <div class="hero__cta">
            <a class="btn btn--accent btn--lg" href="#projects">프로젝트 보기 <span aria-hidden="true">→</span></a>
            <a class="btn btn--outline btn--lg" href="#process">작업 절차</a>
          </div>
        </div>
        <div class="hero__visual" aria-hidden="true">
          ${heroEditorArt()}
        </div>
      </div>
    </section>
  `,
};

function heroGridArt() {
  return `
  <div class="art art--grid">
    <div class="art__bg"></div>
    <div class="art__cards">
      <article class="art__card art__card--1">
        <div class="art__chead"><span class="art__dot"></span><span class="mono">threadr · 받은편지함</span></div>
        <div class="art__list">
          <div class="art__row"><span class="art__avatar" style="background:oklch(0.7 0.08 30)"></span><span class="art__line w70"></span><span class="art__time">11:24</span></div>
          <div class="art__row"><span class="art__avatar" style="background:oklch(0.7 0.08 220)"></span><span class="art__line w55"></span><span class="art__time">10:51</span></div>
          <div class="art__row art__row--active"><span class="art__avatar" style="background:var(--accent)"></span><span class="art__line w80"></span><span class="art__time">09:18</span></div>
          <div class="art__row"><span class="art__avatar" style="background:oklch(0.7 0.08 140)"></span><span class="art__line w40"></span><span class="art__time">어제</span></div>
        </div>
      </article>
      <article class="art__card art__card--2">
        <div class="art__chead"><span class="art__dot art__dot--g"></span><span class="mono">loomi · 자동화</span></div>
        <div class="art__flow">
          <div class="art__node">트리거</div>
          <div class="art__arrow"></div>
          <div class="art__node art__node--accent">규칙</div>
          <div class="art__arrow"></div>
          <div class="art__node">알림</div>
        </div>
      </article>
      <article class="art__card art__card--3">
        <div class="art__chead"><span class="art__dot art__dot--a"></span><span class="mono">stackbench</span></div>
        <div class="art__chart">
          ${Array.from({length: 14}, (_, i) => {
            const h = 18 + Math.round(40 * Math.sin(i * 0.7) + 32 + (i % 3) * 6);
            return `<span class="art__bar" style="height:${Math.min(96, h)}%"></span>`;
          }).join("")}
        </div>
      </article>
    </div>
  </div>`;
}

function heroEditorArt() {
  return `
  <div class="art art--editor">
    <div class="art__win">
      <div class="art__winbar">
        <span class="art__tl"></span><span class="art__tl"></span><span class="art__tl"></span>
        <span class="mono art__url">notedeck — 회의록 / 2026-05-18</span>
      </div>
      <div class="art__doc">
        <div class="art__tag mono">결정</div>
        <div class="art__h">Q2 출시 범위 확정</div>
        <p class="art__p">Threadr 베타는 5월 27일에 한정 공개. Loomi는 6월 둘째 주 일반 출시.</p>
        <div class="art__tag mono">담당</div>
        <div class="art__people">
          <span class="art__chip"><span class="art__avatar" style="background:oklch(0.7 0.09 30)"></span>현우</span>
          <span class="art__chip"><span class="art__avatar" style="background:oklch(0.7 0.09 220)"></span>지윤</span>
          <span class="art__chip"><span class="art__avatar" style="background:var(--accent)"></span>+2</span>
        </div>
        <div class="art__tag mono">다음 액션</div>
        <ul class="art__todo">
          <li><span class="art__check"></span>도메인 DNS 전환</li>
          <li><span class="art__check art__check--done"></span>가격표 페이지 작성</li>
          <li><span class="art__check"></span>고객사 베타 안내 메일</li>
        </ul>
      </div>
    </div>
  </div>`;
}

JIUM.renderHero = function (variant) {
  const root = document.getElementById("hero-slot");
  if (!root) return;
  root.innerHTML = (HERO[variant] || HERO.default)();
};

JIUM.renderHero(document.body.dataset.hero || "default");

/* ---------- STRIP (운영 중인 프로젝트 한줄 요약) ---------- */
document.getElementById("strip-slot").innerHTML = `
<section class="strip section--flush">
  <div class="container">
    <div class="strip__row">
      <div class="strip__cell">
        <span class="strip__k mono">운영 중</span>
        <span class="strip__v">2 <span class="strip__sub">프로젝트</span></span>
      </div>
      <div class="strip__cell">
        <span class="strip__k mono">개발 중</span>
        <span class="strip__v">2 <span class="strip__sub">프로젝트</span></span>
      </div>
      <div class="strip__cell">
        <span class="strip__k mono">설립</span>
        <span class="strip__v">2026 <span class="strip__sub">· 서울</span></span>
      </div>
      <div class="strip__cell">
        <span class="strip__k mono">접근 방식</span>
        <span class="strip__v">독립 운영 <span class="strip__sub">제품별 도메인</span></span>
      </div>
    </div>
  </div>
</section>
`;

/* ---------- PROJECTS (메인 포트폴리오) ---------- */
const PROJECTS = [
  {
    n: "01", name: "Threadr", domain: "threadr.jium.io",
    status: "live", statusLabel: "운영 중",
    tagline: "고객 대화를 받은편지함 하나로.",
    desc: "이메일·카카오톡·문의 폼을 한 곳에 모아 팀이 함께 답합니다. 작은 팀이 큰 회사처럼 응대할 수 있게 합니다.",
    tags: ["고객 지원", "공유 받은편지함", "B2B"],
    art: "inbox",
    accent: "oklch(0.55 0.15 260)",
  },
  {
    n: "02", name: "Loomi", domain: "loomi.jium.io",
    status: "beta", statusLabel: "베타",
    tagline: "노코드 워크플로우 자동화.",
    desc: "트리거·규칙·액션 세 가지 블록으로 반복 업무를 자동화합니다. 슬랙·이메일·웹훅으로 결과를 흘려보냅니다.",
    tags: ["자동화", "워크플로우", "노코드"],
    art: "flow",
    accent: "oklch(0.58 0.13 158)",
  },
  {
    n: "03", name: "Stackbench", domain: "stackbench.jium.io",
    status: "dev", statusLabel: "개발 중",
    tagline: "흩어진 운영 지표를 한 화면에.",
    desc: "서비스 매출·재고·대화량·서버 상태를 하나의 대시보드로. 매주 자동으로 정리되는 운영 리포트.",
    tags: ["대시보드", "BI 라이트", "리포트"],
    art: "chart",
    accent: "oklch(0.70 0.15 70)",
  },
  {
    n: "04", name: "Notedeck", domain: "notedeck.jium.io",
    status: "soon", statusLabel: "준비 중",
    tagline: "회의록보다 결정 기록.",
    desc: "누가, 언제, 왜 결정했는지 남깁니다. 다음 액션은 자동으로 추적되며 결정의 맥락을 잃지 않습니다.",
    tags: ["회의록", "의사결정", "문서"],
    art: "doc",
    accent: "oklch(0.62 0.16 18)",
  },
];

function projectArt(kind, accent) {
  if (kind === "inbox") {
    return `<div class="pa pa--inbox">
      ${[1,2,3,4].map((i) => `
        <div class="pa__row ${i===2?'pa__row--on':''}">
          <span class="pa__av" style="background:${i===2?accent:'color-mix(in oklab,'+accent+' 25%, transparent)'}"></span>
          <span class="pa__l1"></span>
          <span class="pa__l2"></span>
          <span class="pa__time">0${9+i}:${10+i*7}</span>
        </div>
      `).join("")}
    </div>`;
  }
  if (kind === "flow") {
    return `<div class="pa pa--flow">
      <div class="pa__node">트리거</div>
      <div class="pa__arr"></div>
      <div class="pa__node pa__node--on" style="background:color-mix(in oklab, ${accent} 18%, transparent); color:${accent}">규칙</div>
      <div class="pa__arr"></div>
      <div class="pa__node">액션</div>
      <div class="pa__arr"></div>
      <div class="pa__node pa__node--on" style="background:color-mix(in oklab, ${accent} 18%, transparent); color:${accent}">알림</div>
    </div>`;
  }
  if (kind === "chart") {
    return `<div class="pa pa--chart">
      <div class="pa__bars">
        ${Array.from({length: 16}, (_, i) => {
          const h = 22 + Math.round(38 * Math.sin(i * 0.6) + 30 + (i % 4) * 5);
          return `<span class="pa__bar" style="height:${Math.min(96, h)}%; background: linear-gradient(180deg, ${accent}, color-mix(in oklab, ${accent} 50%, transparent))"></span>`;
        }).join("")}
      </div>
      <div class="pa__axis"></div>
    </div>`;
  }
  if (kind === "doc") {
    return `<div class="pa pa--doc">
      <div class="pa__doc-tag mono" style="color:${accent}">결정 · 05/18</div>
      <div class="pa__doc-h">Q2 출시 범위 확정</div>
      <div class="pa__doc-line"></div>
      <div class="pa__doc-line w60"></div>
      <div class="pa__doc-tag mono" style="color:${accent}; margin-top: 10px;">다음 액션 (3)</div>
      <div class="pa__doc-todo"><span class="pa__chk" style="background:${accent}"></span> 도메인 전환</div>
      <div class="pa__doc-todo"><span class="pa__chk"></span> 가격표 작성</div>
      <div class="pa__doc-todo"><span class="pa__chk"></span> 베타 안내 메일</div>
    </div>`;
  }
  return "";
}

document.getElementById("projects-slot").innerHTML = `
<section class="section" id="projects">
  <div class="container">
    <div class="section__head">
      <span class="eyebrow">프로젝트</span>
      <h2>네 개의 작은 SaaS,<br/>각자의 도메인에서.</h2>
      <p>JIUM LABS는 한 번에 하나씩, 천천히 만듭니다. 각 제품은 독립된 도메인과 팀에서 운영되며, 필요하다면 자연스럽게 연결됩니다.</p>
    </div>
    <div class="projects">
      ${PROJECTS.map(p => `
        <article class="proj proj--${p.status}">
          <div class="proj__main">
            <div class="proj__head">
              <span class="mono proj__num">${p.n} / Project</span>
              <span class="proj__status proj__status--${p.status}">
                <span class="proj__pulse"></span>${p.statusLabel}
              </span>
            </div>
            <h3 class="proj__name" style="--proj-accent:${p.accent}">${p.name}</h3>
            <p class="proj__tagline">${p.tagline}</p>
            <p class="proj__desc">${p.desc}</p>
            <div class="proj__tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
            <div class="proj__foot">
              <a class="proj__link" href="https://${p.domain}" target="_blank" rel="noopener">
                <span class="proj__domain mono">${p.domain}</span>
                <span class="proj__arrow" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div class="proj__art" aria-hidden="true" style="--proj-accent:${p.accent}">
            ${projectArt(p.art, p.accent)}
          </div>
        </article>
      `).join("")}
    </div>
  </div>
</section>
`;
