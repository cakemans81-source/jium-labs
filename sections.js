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
            <li><span class="mono">프로젝트 2종</span></li>
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
            <a class="btn btn--accent btn--lg" href="#projects">프로젝트 보기 <span aria-hidden="true">→</span></a>
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
          ${["PartStream / 자동 견적", "세일정밀산업 / 제조 웹사이트", "— JIUM LABS 2026"].concat(["PartStream / 자동 견적", "세일정밀산업 / 제조 웹사이트", "— JIUM LABS 2026"]).map(t => `<span class="marquee__item">${t}</span>`).join("")}
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
        <span class="strip__k mono">운영 중</span>
        <span class="strip__v">1 <span class="strip__sub">프로젝트</span></span>
      </div>
      <div class="strip__cell">
        <span class="strip__k mono">제작 사례</span>
        <span class="strip__v">1 <span class="strip__sub">프로젝트</span></span>
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

/* ---------- PROJECTS (메인 포트폴리오) ---------- */
const PROJECTS = [
  {
    n: "01",
    name: "PartStream",
    domain: "partstream-pi.vercel.app",
    category: "saas",
    catBadge: "[ B2B SAAS · 3D 견적 ]",
    status: "live",
    statusLabel: "운영 중",
    tagline: "3D 파일을 올리면 견적이 바로 나옵니다.",
    desc: "STL·STEP 파일을 자동 분석해 부피·면적·가공 난이도를 추출하고, 재료비·가공비·셋업비까지 투명하게 산출합니다. 거래명세서 PDF와 월정산 자동화로 견적부터 정산까지 한 흐름.",
    tags: ["제조 견적", "3D 자동 분석", "B2B SaaS"],
    accent: "#818CF8",
    desktop: {
      url: "partstream-pi.vercel.app",
      nav: ["솔루션", "견적체험", "고객사례"],
      cta: "견적 시작",
      kicker: "3D CAD AUTO-QUOTE",
      title: "도면 올리면 견적 산출",
      desc: "STL·STEP 1초 정밀 체적 및 가공비 계산",
      btnMain: "3D 파일 업로드",
      btnSub: "견적서 샘플",
      visHtml: `
        <div class="m-cad-box">
          <div class="m-cad-svg-wrap">
            <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5L24 4Z" stroke="#818CF8" stroke-width="1.8" fill="rgba(129, 140, 248, 0.08)"/>
              <path d="M24 4V44M24 24L42 14.5M24 24L6 14.5" stroke="#818CF8" stroke-width="1.4" stroke-dasharray="2 2"/>
              <circle cx="24" cy="24" r="2.5" fill="#818CF8"/>
            </svg>
          </div>
          <div class="m-cad-info">
            <span class="mono m-cad-fn">part_v2.stl</span>
            <span class="mono m-cad-dim">32.4 cm³ · Al6061</span>
            <span class="m-cad-price">₩ 34,400</span>
          </div>
        </div>
      `,
      feet: ["STL/STEP 분석", "실시간 단가 산출", "명세서 자동발행"]
    },
    mobile: {
      tag: "3D 견적",
      title: "도면 업로드 즉시<br/>견적 확인",
      cardHtml: `
        <div class="mob-card__row">
          <span>part_v2.stl</span>
          <span class="mob-badge">분석 완료</span>
        </div>
        <div class="mob-card__dim">32.4 cm³ · 5축 가공</div>
        <div class="mob-card__price" style="color:#818CF8">₩ 34,400</div>
      `,
      btn: "견적서 다운로드"
    }
  },
  {
    n: "02",
    name: "세일정밀산업",
    domain: "seil-precision.vercel.app",
    category: "site",
    catBadge: "[ COMPANY · 제조기업 웹사이트 ]",
    status: "work",
    statusLabel: "제작 사례",
    tagline: "제조 현장을 그대로 담은 홈페이지.",
    desc: "경주 금형·시제품·정밀가공 업체를 위해 만든 웹사이트 샘플입니다. 히어로부터 설비·작업·도면 문의까지, 공장의 리듬으로 이어집니다.",
    tags: ["홈페이지 제작", "제조업 브랜딩", "반응형 웹"],
    accent: "#FF7A00",
    desktop: {
      url: "seil-precision.vercel.app",
      nav: ["회사소개", "설비현황", "가공사례"],
      cta: "도면문의",
      kicker: "SEIL PRECISION · GYEONGJU",
      title: "도면이 정밀 금형이 됩니다",
      desc: "독일 하이덴하인·HERMLE 5축 설비 기반 맞춤 가공",
      btnMain: "온라인 도면 접수",
      btnSub: "설비 스펙 보기",
      visHtml: `
        <div class="m-cnc-box">
          <span class="m-cnc-badge">HERMLE C42U 5축</span>
          <div class="m-cnc-name">공차 ±0.005mm 정밀도</div>
          <div class="m-cnc-desc">독일 하이덴하인 CNC 기반<br/>납기준수율 99.4% 달성</div>
        </div>
      `,
      feet: ["5축 동시 가공", "항공/반도체 지그", "3차원 정밀 측정"]
    },
    mobile: {
      tag: "24H 도면 접수",
      title: "경주 5축 가공<br/>빠른 견적 상담",
      cardHtml: `
        <div class="mob-card__row">
          <span>CAD 도면 접수</span>
          <span class="mob-badge" style="color:#FF7A00; border-color:rgba(255,122,0,0.3)">당일 회신</span>
        </div>
        <div class="mob-card__dim">5축 정밀가공 · 시제품</div>
        <div class="mob-card__price" style="color:#FF7A00; font-size:7.5px;">054-000-0000</div>
      `,
      btn: "📞 상담 전화 연결"
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
          <div class="m-nav">
            <div class="m-nav__logo">
              <span class="m-nav__dot" style="background:${p.accent}"></span>
              <span>${p.name}</span>
            </div>
            <div class="m-nav__links">
              ${d.nav.map(n => `<span>${n}</span>`).join("")}
            </div>
            <span class="m-nav__cta" style="background:${p.accent}">${d.cta}</span>
          </div>
          <div class="m-hero">
            <div class="m-hero__copy">
              <span class="m-hero__kicker" style="color:${p.accent}">${d.kicker}</span>
              <h4 class="m-hero__h">${d.title}</h4>
              <p class="m-hero__p">${d.desc}</p>
              <div class="m-hero__btns">
                <span class="m-hero__btn-main" style="background:${p.accent}">${d.btnMain}</span>
                <span class="m-hero__btn-sub">${d.btnSub}</span>
              </div>
            </div>
            <div class="m-hero__vis">
              ${d.visHtml}
            </div>
          </div>
          <div class="m-feet">
            ${d.feet.map(f => `<div class="m-feet__item">${f}</div>`).join("")}
          </div>
        </div>
      </div>

      <!-- Smartphone Mockup (Overlapping right) -->
      <div class="mockup-mobile">
        <div class="mockup-mobile__notch"></div>
        <div class="mockup-mobile__screen">
          <div class="mob-nav">
            <span class="mob-nav__logo" style="color:${p.accent}">${p.name}</span>
            <span class="mob-nav__burger">☰</span>
          </div>
          <div class="mob-body">
            <span class="mob-tag" style="color:${p.accent}">${m.tag}</span>
            <h5 class="mob-title">${m.title}</h5>
            <div class="mob-card">
              ${m.cardHtml}
            </div>
            <span class="mob-btn" style="background:${p.accent}">${m.btn}</span>
          </div>
          <div class="mob-home-bar"></div>
        </div>
        <div class="mockup-mobile__bar"></div>
      </div>
    </div>
  `;
}

document.getElementById("projects-slot").innerHTML = `
<section class="section" id="projects">
  <div class="container">
    <div class="section__head">
      <span class="eyebrow">PORTFOLIO</span>
      <h2>지음랩스 크리에이티브 & 솔루션</h2>
      <p>와이즈디자인처럼 명확하고 직관적인 쇼케이스. 자체 개발 SaaS 도구와 현장 가치를 높이는 맞춤형 홈페이지 제작 사례를 둘러보세요.</p>
    </div>

    <div class="port-head">
      <div class="port-tabs" role="tablist" aria-label="포트폴리오 분류">
        <button class="port-tab port-tab--active" data-filter="all" type="button" role="tab" aria-selected="true">
          전체보기 <span class="port-tab__badge">2</span>
        </button>
        <button class="port-tab" data-filter="saas" type="button" role="tab" aria-selected="false">
          SaaS 솔루션 <span class="port-tab__badge">1</span>
        </button>
        <button class="port-tab" data-filter="site" type="button" role="tab" aria-selected="false">
          홈페이지 제작사례 <span class="port-tab__badge">1</span>
        </button>
      </div>
    </div>

    <div class="wize-grid" id="portfolio-grid">
      ${PROJECTS.map(p => `
        <article class="wize-card" data-category="${p.category}" style="--proj-accent:${p.accent}">
          <div class="wize-card__preview">
            ${dualMockup(p)}
            <a class="wize-card__overlay" ${p.domain ? `href="https://${p.domain}" target="_blank" rel="noopener noreferrer" aria-label="${p.name} 사이트 방문"` : `href="#cta"`}>
              <span class="wize-card__click blink">Click</span>
              <span class="wize-card__action-text">${p.domain ? "웹사이트 바로가기 ↗" : "제작 문의하기 ↗"}</span>
            </a>
          </div>
          <div class="wize-card__body">
            <div class="wize-card__meta-row">
              <span class="wize-card__cat mono">${p.catBadge}</span>
              <span class="proj__status proj__status--${p.status}">
                <span class="proj__pulse"></span>${p.statusLabel}
              </span>
            </div>
            <h3 class="wize-card__name">${p.name}</h3>
            <p class="wize-card__tagline">${p.tagline}</p>
            <p class="wize-card__desc">${p.desc}</p>
            <div class="wize-card__tags">
              ${p.tags.map(t => `<span>${t}</span>`).join("")}
            </div>
            <div class="wize-card__foot">
              ${p.domain ? `
                <a class="wize-card__domain" href="https://${p.domain}" target="_blank" rel="noopener noreferrer" aria-label="${p.name} 사이트 새 창에서 열기">
                  <span>${p.domain}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ` : `
                <span class="mono" style="font-size:12px; color:var(--fg-subtle);">사이트 준비 중</span>
              `}
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  </div>
</section>
`;

/* Portfolio Tab Filter Interaction */
document.querySelectorAll(".port-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".port-tab").forEach(t => {
      t.classList.remove("port-tab--active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("port-tab--active");
    tab.setAttribute("aria-selected", "true");
    const filter = tab.getAttribute("data-filter");
    document.querySelectorAll(".wize-card").forEach(card => {
      const match = filter === "all" || card.getAttribute("data-category") === filter;
      card.style.display = match ? "flex" : "none";
    });
  });
});
