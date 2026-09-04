/* JIUM LABS — sections (portfolio edition) */
window.JIUM = window.JIUM || {};

/* ---------- HERO ---------- */
const HERO = {
  workflow: () => `
    <section class="hero hero--workflow section--flush">
      <div class="container hero__workflow-cinema">
        <div class="hero__copy hero__copy--cinema">
          <span class="eyebrow">JIUM LABS · 2026</span>
          <h1 class="hero__h1--cinema">반복 업무는 줄이고,<br/><em>하나의 연결된</em> 워크플로우로.</h1>
          <p class="hero__lead hero__lead--cinema">JIUM LABS는 소규모 팀의 일상 업무를 자동화하는 <strong>실용적인 B2B SaaS</strong>와 비즈니스 가치를 전달하는 <strong>고품질 웹사이트</strong>를 설계합니다.</p>
          <div class="hero__cta hero__cta--cinema">
            <a class="btn btn--accent btn--lg" href="#projects">포트폴리오 둘러보기 <span aria-hidden="true">↓</span></a>
            <a class="btn btn--outline btn--lg" href="#cta">협업 및 제작 문의</a>
            <a class="btn btn--youtube btn--lg" href="https://www.youtube.com/@jieumlabs" target="_blank" rel="noopener noreferrer" aria-label="JIUM LABS 유튜브 채널 새 창에서 열기">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              영상으로 보기
            </a>
          </div>
          <ul class="hero__meta hero__meta--cinema">
            <li><span class="mono">경기 화성 · 2026</span></li>
            <li><span class="mono">B2B SaaS & 맞춤형 웹</span></li>
            <li><span class="mono">100% 독립 도메인 운영</span></li>
          </ul>
        </div>
        <div class="hero__stage-wrap hero__stage-wrap--cinema">
          <div class="workflow-stage workflow-stage--cinema">
            <div class="workflow-hud workflow-hud--top">
              <span class="workflow-hud__dot workflow-hud__dot--live"></span>
              <span class="workflow-hud__text">연결된 자동화 파이프라인</span>
              <span class="workflow-hud__badge">LIVE</span>
            </div>
            <div class="workflow-stage__inner workflow-stage__inner--cinema">
              <video class="workflow-video" autoplay loop muted playsinline poster="assets/hero-workflow-poster.jpg?v=20260904_04">
                <source src="assets/hero-workflow.mp4?v=20260904_04" type="video/mp4" />
              </video>
              <div class="workflow-stage__overlay" aria-hidden="true"></div>
            </div>
            <div class="workflow-hud workflow-hud--bottom">
              <span class="workflow-hud__dot"></span>
              <span class="workflow-hud__text">수작업 85% 자동화 절감</span>
              <span class="workflow-hud__badge">STUDIO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  default: () => `
    <section class="hero hero--default section--flush">
      <div class="container hero__grid">
        <div class="hero__copy">
          <span class="eyebrow">JIUM LABS · 2026</span>
          <h1>필요한 도구를<br/><em>짓다.</em></h1>
          <p class="hero__lead">JIUM LABS는 소규모 팀이 매일 마주치는 반복 업무를 줄이는 <strong>실용적인 도구</strong>를 차례로 만듭니다. 공개된 작업과 준비 상태는 아래 프로젝트 카드에서 확인할 수 있습니다.</p>
          <div class="hero__cta">
            <a class="btn btn--accent btn--lg" href="#projects">프로젝트 둘러보기 <span aria-hidden="true">→</span></a>
            <a class="btn btn--outline btn--lg" href="#cta">협업 문의</a>
            <a class="btn btn--youtube btn--lg" href="https://www.youtube.com/@jieumlabs" target="_blank" rel="noopener noreferrer" aria-label="JIUM LABS 유튜브 채널 새 창에서 열기">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              영상으로 보기
            </a>
          </div>
          <ul class="hero__meta">
            <li><span class="mono">경기 화성 · 2026</span></li>
            <li><span class="mono">프로젝트 6종</span></li>
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
          <p class="hero__lead hero__lead--center">하나의 스튜디오에서 만드는 여러 작업. 공개 여부와 준비 상태는 프로젝트 카드에 표시합니다.</p>
          <div class="hero__cta hero__cta--center">
            <a class="btn btn--accent btn--lg" href="#projects">프로젝트 6종 둘러보기 <span aria-hidden="true">→</span></a>
            <a class="btn btn--outline btn--lg" href="#approach">스튜디오 철학</a>
            <a class="btn btn--youtube btn--lg" href="https://www.youtube.com/@jieumlabs" target="_blank" rel="noopener noreferrer" aria-label="JIUM LABS 유튜브 채널 새 창에서 열기">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              영상으로 보기
            </a>
          </div>
        </div>
      </div>
      <div class="marquee" aria-hidden="true">
        <div class="marquee__track">
          ${["PartStream / 3D CAD 자동견적", "세일정밀산업 / 5축 정밀가공", "CAD Studio / 웹 3D 뷰어", "와이즈디자인 / 부천 플라스틱·AL CNC", "OrderFlow / 발주 파이프라인", "(주)한빛테크 / 스마트팩토리", "— JIUM LABS 2026"].concat(["PartStream / 3D CAD 자동견적", "세일정밀산업 / 5축 정밀가공", "CAD Studio / 웹 3D 뷰어", "와이즈디자인 / 부천 플라스틱·AL CNC", "OrderFlow / 발주 파이프라인", "(주)한빛테크 / 스마트팩토리", "— JIUM LABS 2026"]).map(t => `<span class="marquee__item">${t}</span>`).join("")}
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
            <a class="btn btn--youtube btn--lg" href="https://www.youtube.com/@jieumlabs" target="_blank" rel="noopener noreferrer" aria-label="JIUM LABS 유튜브 채널 새 창에서 열기">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              영상으로 보기
            </a>
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
        <div class="art__chead"><span class="art__dot"></span><span class="mono">도구 화면 · 받은편지함</span></div>
        <div class="art__list">
          <div class="art__row"><span class="art__avatar" style="background:oklch(0.7 0.08 30)"></span><span class="art__line w70"></span><span class="art__time">11:24</span></div>
          <div class="art__row"><span class="art__avatar" style="background:oklch(0.7 0.08 220)"></span><span class="art__line w55"></span><span class="art__time">10:51</span></div>
          <div class="art__row art__row--active"><span class="art__avatar" style="background:var(--accent)"></span><span class="art__line w80"></span><span class="art__time">09:18</span></div>
          <div class="art__row"><span class="art__avatar" style="background:oklch(0.7 0.08 140)"></span><span class="art__line w40"></span><span class="art__time">어제</span></div>
        </div>
      </article>
      <article class="art__card art__card--2">
        <div class="art__chead"><span class="art__dot art__dot--g"></span><span class="mono">도구 화면 · 자동화</span></div>
        <div class="art__flow">
          <div class="art__node">트리거</div>
          <div class="art__arrow"></div>
          <div class="art__node art__node--accent">규칙</div>
          <div class="art__arrow"></div>
          <div class="art__node">알림</div>
        </div>
      </article>
      <article class="art__card art__card--3">
        <div class="art__chead"><span class="art__dot art__dot--a"></span><span class="mono">도구 화면 · 지표</span></div>
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
        <span class="mono art__url">jiumlabs — 워크스페이스 / 2026</span>
      </div>
      <div class="art__doc">
        <div class="art__tag mono">결정</div>
        <div class="art__h">결정 기록 화면</div>
        <p class="art__p">결정 기록 화면 예시입니다. 표시된 일정과 담당자는 실제 정보가 아닙니다.</p>
        <div class="art__tag mono">담당</div>
        <div class="art__people">
          <span class="art__chip"><span class="art__avatar" style="background:oklch(0.7 0.09 30)"></span>현우</span>
          <span class="art__chip"><span class="art__avatar" style="background:oklch(0.7 0.09 220)"></span>지윤</span>
          <span class="art__chip"><span class="art__avatar" style="background:var(--accent)"></span>+2</span>
        </div>
        <div class="art__tag mono">다음 액션</div>
        <ul class="art__todo">
          <li><span class="art__check"></span>다음 항목 예시</li>
          <li><span class="art__check art__check--done"></span>완료 항목 예시</li>
          <li><span class="art__check"></span>검토 항목 예시</li>
        </ul>
      </div>
    </div>
  </div>`;
}

JIUM.renderHero = function (variant) {
  const root = document.getElementById("hero-slot");
  if (!root) return;
  root.innerHTML = (HERO[variant] || HERO.workflow || HERO.default)();
  const v = root.querySelector(".workflow-video");
  if (v) {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const p = v.play();
    if (p !== undefined) {
      p.catch(() => {});
    }
  }
};

JIUM.renderHero(document.body.dataset.hero || "workflow");

/* ---------- STRIP (운영 중인 프로젝트 한줄 요약) ---------- */
document.getElementById("strip-slot").innerHTML = `
<section class="strip section--flush">
  <div class="container">
    <div class="strip__row">
      <div class="strip__cell">
        <span class="strip__k mono">SaaS 라인업</span>
        <span class="strip__v">3 <span class="strip__sub">솔루션</span></span>
      </div>
      <div class="strip__cell">
        <span class="strip__k mono">WebSite 제작</span>
        <span class="strip__v">3 <span class="strip__sub">사례</span></span>
      </div>
      <div class="strip__cell">
        <span class="strip__k mono">자동 분석</span>
        <span class="strip__v">3D <span class="strip__sub">CAD 견적</span></span>
      </div>
      <div class="strip__cell">
        <span class="strip__k mono">정밀 제조</span>
        <span class="strip__v">5축 <span class="strip__sub">맞춤 가공</span></span>
      </div>
    </div>
  </div>
</section>
`;

/* ---------- PROJECTS (카테고리별 포트폴리오 데이터) ---------- */
const PROJECTS_SAAS = [
  {
    n: "01",
    name: "PartStream",
    domain: "partstream-pi.vercel.app",
    category: "saas",
    catBadge: "[ B2B SAAS · 3D 견적 ]",
    status: "live",
    statusLabel: "운영 중",
    tagline: "3D 도면 파일 업로드 즉시 자동 견적 계산 (견적온)",
    desc: "STL·STEP 파일을 자동 분석해 부피·면적·가공 난이도를 추출하고, 재료비·가공비·셋업비까지 투명하게 산출합니다. 거래명세서 PDF와 월정산 자동화로 견적부터 정산까지 한 흐름.",
    accent: "#818CF8",
    desktop: {
      url: "partstream-pi.vercel.app",
      img: "assets/portfolio/partstream-pc.png"
    },
    mobile: {
      img: "assets/portfolio/partstream-mob.png"
    }
  },
  {
    n: "02",
    name: "CAD Studio",
    domain: null,
    category: "saas",
    catBadge: "[ B2B SAAS · 3D 뷰어 ]",
    status: "beta",
    statusLabel: "베타",
    tagline: "웹 브라우저 무설치 3D CAD 뷰어 & 측정 도구",
    desc: "별도 소프트웨어 설치 없이 브라우저에서 3D 도면을 열고 다각도 회전, 치수 측정, 단면 분석을 실시간으로 수행합니다.",
    accent: "#06B6D4",
    desktop: {
      url: "cadstudio.jiumlabs.com",
      img: "assets/portfolio/cadstudio-pc.png"
    },
    mobile: {
      img: "assets/portfolio/cadstudio-mob.png"
    }
  },
  {
    n: "03",
    name: "OrderFlow",
    domain: null,
    category: "saas",
    catBadge: "[ B2B SAAS · 발주 연동 ]",
    status: "soon",
    statusLabel: "준비 중",
    tagline: "제조·유통 협력사 간 발주 접수 및 거래명세서 자동화",
    desc: "반복적인 발주서 취합, 전표 처리, 거래명세서 발행을 클라우드로 연결해 수작업 오류를 제로화합니다.",
    accent: "#A855F7",
    desktop: {
      url: "orderflow.jiumlabs.com",
      img: "assets/portfolio/orderflow-pc.png"
    },
    mobile: {
      img: "assets/portfolio/orderflow-mob.png"
    }
  }
];

const PROJECTS_SITE = [
  {
    n: "01",
    name: "(주)세일정밀산업",
    domain: "seil-precision.vercel.app",
    category: "site",
    catBadge: "[ COMPANY · 정밀제조 ]",
    status: "work",
    statusLabel: "제작 사례",
    tagline: "까다로운 형상일수록 기술이 빛나는 5축 정밀가공 웹사이트",
    desc: "경주 금형·시제품·정밀가공 업체를 위해 만든 웹사이트. DN솔루션즈 5축 머시닝센터 DVF 5000 설비부터 온라인 도면 접수까지 원스톱으로 이어집니다.",
    accent: "#FF7A00",
    desktop: {
      url: "seil-precision.vercel.app",
      img: "assets/portfolio/seil-pc.png"
    },
    mobile: {
      img: "assets/portfolio/seil-mob.png"
    }
  },
  {
    n: "02",
    name: "와이즈디자인",
    domain: "wise-design-cnc-bucheon.cakemans81.chatgpt.site",
    category: "site",
    catBadge: "[ COMPANY · 시제품·CNC ]",
    status: "work",
    statusLabel: "제작 사례",
    tagline: "부천 플라스틱 수지 & 알루미늄 CNC 가공 및 시제품 제작",
    desc: "ABS·POM·PC·MC 플라스틱과 알루미늄 정밀 CNC 가공. 3D 모델링부터 기구 설계, 졸업작품·스타트업 시제품 및 디자인 목업까지 제작합니다.",
    accent: "#0284C7",
    desktop: {
      url: "wise-design-cnc-bucheon.cakemans81.chatgpt.site",
      img: "assets/portfolio/wise-pc.png"
    },
    mobile: {
      img: "assets/portfolio/wise-mob.png"
    }
  },
  {
    n: "03",
    name: "(주)한빛테크",
    domain: null,
    category: "site",
    catBadge: "[ COMPANY · 스마트팩토리 ]",
    status: "work",
    statusLabel: "제작 사례",
    tagline: "반도체 자동화 장비 및 스마트팩토리 솔루션 웹사이트",
    desc: "클린룸 자동화 장비와 정밀 지그 설계 역량을 글로벌 고객사에 효과적으로 어필할 수 있는 엔지니어링 브랜딩 웹사이트.",
    accent: "#3B82F6",
    desktop: {
      url: "hanbit-tech.co.kr",
      img: "assets/portfolio/hanbit-pc.png"
    },
    mobile: {
      img: "assets/portfolio/hanbit-mob.png"
    }
  }
];

function dualMockup(p) {
  const d = p.desktop;
  const m = p.mobile;
  return `
    <div class="dual-mockup">
      <!-- PC Desktop Mockup (Left / Base) -->
      <div class="mockup-desktop">
        <div class="mockup-desktop__bar">
          <div class="mockup-dots">
            <span class="mockup-dot mockup-dot--r"></span>
            <span class="mockup-dot mockup-dot--y"></span>
            <span class="mockup-dot mockup-dot--g"></span>
          </div>
          <div class="mockup-desktop__url">${d.url}</div>
        </div>
        <div class="mockup-desktop__screen">
          <img class="mockup-desktop__img" src="${d.img}" alt="${p.name} PC 화면 스크린샷" loading="lazy" />
        </div>
      </div>

      <!-- Smartphone Mockup (Overlapping right) -->
      <div class="mockup-mobile">
        <div class="mockup-mobile__notch"></div>
        <div class="mockup-mobile__screen">
          <img class="mockup-mobile__img" src="${m.img}" alt="${p.name} 모바일 화면 스크린샷" loading="lazy" />
        </div>
        <div class="mockup-mobile__bar"></div>
      </div>
    </div>
  `;
}

function renderCard(p) {
  return `
    <article class="wize-card" data-category="${p.category}" style="--proj-accent:${p.accent}">
      <div class="wize-card__preview">
        ${dualMockup(p)}
        <a class="wize-card__overlay" ${p.domain ? `href="https://${p.domain}" target="_blank" rel="noopener noreferrer" aria-label="${p.name} 사이트 방문"` : `href="#cta"`}>
          <span class="wize-card__click blink">Click</span>
          <span class="wize-card__action-text">${p.domain ? "웹사이트 바로가기 ↗" : "제작 문의하기 ↗"}</span>
        </a>
      </div>
      <div class="wize-card__caption">
        <span class="wize-card__cat mono">${p.catBadge}</span>
        <h4 class="wize-card__name">${p.name}</h4>
        ${p.tagline ? `<p class="wize-card__tagline">${p.tagline}</p>` : ''}
      </div>
    </article>
  `;
}

document.getElementById("projects-slot").innerHTML = `
<section class="section" id="projects">
  <div class="container">
    <div class="section__head">
      <span class="eyebrow">PORTFOLIO</span>
      <h2>지음랩스 크리에이티브 & 솔루션</h2>
      <p>와이즈디자인처럼 명확하고 직관적인 쇼케이스. 자체 개발 SaaS 솔루션과 기업의 가치를 높이는 맞춤형 웹사이트 제작 사례를 둘러보세요.</p>
    </div>

    <!-- Category 1: SaaS 솔루션 -->
    <div class="port-group">
      <div class="port-group__head">
        <div class="port-group__title-wrap">
          <span class="port-group__badge">CATEGORY 01</span>
          <h3 class="port-group__title">SaaS 솔루션</h3>
        </div>
        <p class="port-group__desc">3D CAD 도면 분석부터 실시간 견적·발주 자동화까지, 팀의 반복 업무를 줄이는 B2B 소프트웨어</p>
      </div>
      <div class="port-row">
        ${PROJECTS_SAAS.map(p => renderCard(p)).join("")}
      </div>
    </div>

    <!-- Category 2: WebSite 제작 -->
    <div class="port-group">
      <div class="port-group__head">
        <div class="port-group__title-wrap">
          <span class="port-group__badge">CATEGORY 02</span>
          <h3 class="port-group__title">WebSite 제작</h3>
        </div>
        <p class="port-group__desc">정밀 제조 현장부터 식품 유통까지, 비즈니스의 신뢰와 가치를 직관적으로 전달하는 고품질 맞춤형 웹사이트</p>
      </div>
      <div class="port-row">
        ${PROJECTS_SITE.map(p => renderCard(p)).join("")}
      </div>
    </div>
  </div>
</section>
`;
