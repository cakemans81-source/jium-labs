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
          ${["PartStream / 3D CAD 견적", "세일정밀산업 / 5축 정밀가공", "CAD Studio / 3D 뷰어", "(주)황토식품 / 식품유통 웹사이트", "OrderFlow / 발주 자동화", "(주)한빛테크 / 스마트팩토리", "— JIUM LABS 2026"].concat(["PartStream / 3D CAD 견적", "세일정밀산업 / 5축 정밀가공", "CAD Studio / 3D 뷰어", "(주)황토식품 / 식품유통 웹사이트", "OrderFlow / 발주 자동화", "(주)한빛테크 / 스마트팩토리", "— JIUM LABS 2026"]).map(t => `<span class="marquee__item">${t}</span>`).join("")}
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
    tagline: "3D 도면 파일 업로드 즉시 자동 견적 산출",
    desc: "STL·STEP 파일을 자동 분석해 부피·면적·가공 난이도를 추출하고, 재료비·가공비·셋업비까지 투명하게 산출합니다. 거래명세서 PDF와 월정산 자동화로 견적부터 정산까지 한 흐름.",
    accent: "#818CF8",
    desktop: {
      url: "partstream-pi.vercel.app",
      nav: ["솔루션", "견적체험", "고객사례"],
      cta: "견적 시작",
      kicker: "3D CAD AUTO-QUOTE",
      title: "도면 올리면 견적 산출",
      desc: "STL·STEP 1초 체적 및 가공비 계산",
      btnMain: "3D 파일 업로드",
      btnSub: "견적서 샘플",
      visHtml: `
        <div class="m-cad-box">
          <div class="m-cad-svg-wrap">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
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
      feet: ["STL/STEP 분석", "실시간 단가", "명세서 자동"]
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
      nav: ["뷰어 기능", "지원 포맷", "엔터프라이즈"],
      cta: "무료 체험",
      kicker: "WEB 3D CAD VIEWER",
      title: "설치 없는 웹 CAD 뷰어",
      desc: "브라우저에서 STEP/IGES 치수 측정 및 단면 분석",
      btnMain: "3D 뷰어 실행",
      btnSub: "샘플 도면 보기",
      visHtml: `
        <div class="m-cad-box">
          <div class="m-cad-svg-wrap">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="32" height="32" rx="4" stroke="#06B6D4" stroke-width="1.8" fill="rgba(6, 182, 212, 0.08)"/>
              <circle cx="24" cy="24" r="8" stroke="#06B6D4" stroke-width="1.5" stroke-dasharray="3 3"/>
              <line x1="8" y1="24" x2="40" y2="24" stroke="#06B6D4" stroke-width="1.2" opacity="0.6"/>
              <line x1="24" y1="8" x2="24" y2="40" stroke="#06B6D4" stroke-width="1.2" opacity="0.6"/>
            </svg>
          </div>
          <div class="m-cad-info">
            <span class="mono m-cad-fn">engine_block.step</span>
            <span class="mono m-cad-dim">정밀도 0.001mm · 60fps</span>
            <span class="m-cad-price" style="color:#06B6D4; font-size:9.5px;">측정 모드 가동</span>
          </div>
        </div>
      `,
      feet: ["STEP/IGES/STL", "실시간 단면도", "원클릭 공유"]
    },
    mobile: {
      tag: "모바일 뷰어",
      title: "스마트폰에서도<br/>3D 도면 회전",
      cardHtml: `
        <div class="mob-card__row">
          <span>engine_block</span>
          <span class="mob-badge" style="color:#06B6D4; border-color:rgba(6,182,212,0.3)">60 FPS</span>
        </div>
        <div class="mob-card__dim">단면 절단선 분석 완료</div>
        <div class="mob-card__price" style="color:#06B6D4; font-size:7.5px;">치수: 120 × 85 mm</div>
      `,
      btn: "도면 공유하기"
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
    accent: "#10B981",
    desktop: {
      url: "orderflow.jiumlabs.com",
      nav: ["발주 관리", "거래명세서", "ERP 연동"],
      cta: "사전 예약",
      kicker: "B2B ORDER PIPELINE",
      title: "수기 발주를 자동 파이프라인으로",
      desc: "발주 접수부터 PDF 거래명세서 발행까지 자동화",
      btnMain: "파이프라인 시작",
      btnSub: "연동 가이드",
      visHtml: `
        <div class="m-flow-box">
          <div class="m-flow-row">
            <span class="m-flow-node" style="border-color:#10B981; color:#10B981">발주 접수</span>
            <span class="m-flow-arr">➔</span>
            <span class="m-flow-node">자동 검증</span>
            <span class="m-flow-arr">➔</span>
            <span class="m-flow-node" style="border-color:#10B981; color:#10B981">명세서 발행</span>
          </div>
          <div class="m-flow-stat"><span class="m-flow-pulse" style="background:#10B981"></span> 전표 처리 자동화 가동</div>
        </div>
      `,
      feet: ["발주서 자동인식", "전자명세서 PDF", "ERP 실시간 연동"]
    },
    mobile: {
      tag: "실시간 발주",
      title: "신규 발주서<br/>자동 승인 완료",
      cardHtml: `
        <div class="mob-card__row">
          <span>발주 승인</span>
          <span class="mob-badge mob-badge--live" style="color:#10B981; border-color:rgba(16,185,129,0.3)">승인 완료</span>
        </div>
        <div class="mob-card__dim">세일정밀 발주 3건</div>
        <div class="mob-card__price" style="color:#10B981; font-size:7.5px;">거래명세서 즉시 전송</div>
      `,
      btn: "발주 내역 확인"
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
    tagline: "제조 현장의 리듬과 신뢰를 담은 5축 정밀가공 웹사이트",
    desc: "경주 금형·시제품·정밀가공 업체를 위해 만든 웹사이트. 독일 하이덴하인·HERMLE 5축 설비부터 도면 문의까지 원스톱으로 이어집니다.",
    accent: "#FF7A00",
    desktop: {
      url: "seil-precision.vercel.app",
      nav: ["회사소개", "설비현황", "가공사례"],
      cta: "도면 문의",
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
  },
  {
    n: "02",
    name: "(주)황토식품",
    domain: null,
    category: "site",
    catBadge: "[ COMPANY · 식품유통 ]",
    status: "work",
    statusLabel: "제작 사례",
    tagline: "56년 전통 건어물·견과류 제조유통 브랜드 공식 웹사이트",
    desc: "황토마을 브랜드 소개부터 위생적인 건어물·견과류 제조 공정, 전국 유통망 안내까지 정갈하고 직관적인 비주얼로 구현했습니다.",
    accent: "#EAB308",
    desktop: {
      url: "hwangto.co.kr",
      nav: ["회사소개", "브랜드소개", "제품소개", "고객센터"],
      cta: "제품 보기",
      kicker: "NUTS & FISHERY 황토마을",
      title: "Your Pocket Friend",
      desc: "56년 전통 프리미엄 건어물 및 견과류 유통·제조",
      btnMain: "브랜드 스토리",
      btnSub: "사업분야 보기",
      visHtml: `
        <div class="m-food-box">
          <span class="m-food-badge">56년 역사와 함께하는 (주)황토식품</span>
          <div class="m-food-grid">
            <div class="m-food-col"><span>🚚 건어물 유통</span></div>
            <div class="m-food-col"><span>🏭 견과 가공제조</span></div>
          </div>
        </div>
      `,
      feet: ["HACCP 위생인증", "전국 온·오프라인 유통", "맞춤 선물세트"]
    },
    mobile: {
      tag: "황토마을",
      title: "건어물·견과류<br/>대표 브랜드",
      cardHtml: `
        <div class="mob-card__row">
          <span>브랜드</span>
          <span class="mob-badge" style="color:#EAB308; border-color:rgba(234,179,8,0.3)">황토식품</span>
        </div>
        <div class="mob-card__dim">건어물 유통의 선두주자</div>
        <div class="mob-card__price" style="color:#EAB308; font-size:7.5px;">HACCP 클린 공정</div>
      `,
      btn: "제품 카탈로그"
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
      nav: ["사업영역", "클린룸설비", "연구개발"],
      cta: "기술 문의",
      kicker: "SMART FACTORY & ROBOTICS",
      title: "차세대 반도체 자동화 장비",
      desc: "초정밀 자동화 지그 및 클린룸 제어 시스템",
      btnMain: "장비 포트폴리오",
      btnSub: "인증 현황",
      visHtml: `
        <div class="m-cad-box">
          <div class="m-cad-svg-wrap">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path d="M12 36V16L24 8L36 16V36L24 44L12 36Z" stroke="#3B82F6" stroke-width="1.8" fill="rgba(59, 130, 246, 0.08)"/>
              <circle cx="24" cy="24" r="5" fill="#3B82F6"/>
              <path d="M24 13V19M24 29V35M15 24H21M27 24H33" stroke="#3B82F6" stroke-width="1.4"/>
            </svg>
          </div>
          <div class="m-cad-info">
            <span class="mono m-cad-fn">Cleanroom 100 Class</span>
            <span class="mono m-cad-dim">지그 정밀도 3μm</span>
            <span class="m-cad-price" style="color:#3B82F6; font-size:9.5px;">ISO 9001 인증</span>
          </div>
        </div>
      `,
      feet: ["클린룸 Class 100", "정밀 공차 3μm", "국내외 대기업 납품"]
    },
    mobile: {
      tag: "기술 신뢰",
      title: "반도체 설비<br/>전문 엔지니어링",
      cardHtml: `
        <div class="mob-card__row">
          <span>인증 현황</span>
          <span class="mob-badge" style="color:#3B82F6; border-color:rgba(59,130,246,0.3)">ISO 9001</span>
        </div>
        <div class="mob-card__dim">클린룸 100 Class 설비</div>
        <div class="mob-card__price" style="color:#3B82F6; font-size:7.5px;">스마트 팩토리 연동</div>
      `,
      btn: "설비 상담 문의"
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
