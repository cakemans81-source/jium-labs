/* JIUM LABS — sections part 2 (approach, process, faq, cta) */

/* ---------- APPROACH (스튜디오 철학) ---------- */
document.getElementById("approach-slot").innerHTML = `
<section class="section" id="approach">
  <div class="container">
    <div class="section__head">
      <span class="eyebrow">스튜디오 철학</span>
      <h2>크게 만들지 않습니다.<br/>잘 맞게 만듭니다.</h2>
      <p>JIUM LABS의 모든 결정은 다음 6가지 원칙에서 출발합니다. 화려한 기능 목록 대신 매일 쓰는 도구의 작은 디테일에 시간을 씁니다.</p>
    </div>
    <div class="features">
      ${[
        { i:"clock", t:"느리게, 단단하게", d:"기능을 무리하게 늘리지 않습니다. 한 번 출시한 제품은 오래 유지·개선합니다." },
        { i:"link",  t:"독립과 연결",       d:"각 프로젝트는 자체 도메인·팀·요금으로 독립 운영됩니다. 필요할 때만 자연스럽게 이어집니다." },
        { i:"flag",  t:"한국어 우선",       d:"외산 SaaS를 번역하지 않습니다. 한국 팀의 워크플로우와 세무·계약 처리에서 출발합니다." },
        { i:"shield",t:"데이터는 가볍게",   d:"수집은 최소한으로, 보관은 보수적으로. 처음부터 감사 가능한 구조로 설계합니다." },
        { i:"code",  t:"열린 인터페이스",   d:"각 제품은 REST·Webhook·SDK를 기본 제공합니다. 사내 도구와 자연스럽게 이어집니다." },
        { i:"heart", t:"한 명의 사용자",   d:"천 명을 상상하지 않고, 매일 쓰는 한 명을 위해 설계합니다. 그게 결국 천 명에게 닿습니다." },
      ].map(f => `
        <article class="feature">
          <span class="feature__icon" aria-hidden="true">${icon(f.i)}</span>
          <h3>${f.t}</h3>
          <p>${f.d}</p>
        </article>
      `).join("")}
    </div>
  </div>
</section>
`;

function icon(name) {
  const c = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
  const map = {
    clock:  `<svg viewBox="0 0 24 24" width="20" height="20" ${c}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    link:   `<svg viewBox="0 0 24 24" width="20" height="20" ${c}><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 1 0-5.66-5.66L11.5 7"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 1 0 5.66 5.66L12.5 17"/></svg>`,
    flag:   `<svg viewBox="0 0 24 24" width="20" height="20" ${c}><path d="M5 21V5"/><path d="M5 5h11l-2 4 2 4H5"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="20" height="20" ${c}><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>`,
    code:   `<svg viewBox="0 0 24 24" width="20" height="20" ${c}><path d="M8 8l-4 4 4 4"/><path d="M16 8l4 4-4 4"/><path d="M14 5l-4 14"/></svg>`,
    heart:  `<svg viewBox="0 0 24 24" width="20" height="20" ${c}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>`,
  };
  return map[name] || "";
}

/* ---------- PROCESS (작업 절차) ---------- */
document.getElementById("process-slot").innerHTML = `
<section class="section section--alt" id="process">
  <div class="container">
    <div class="section__head">
      <span class="eyebrow">작업 방식</span>
      <h2>하나의 제품이<br/>세상에 나오기까지.</h2>
      <p>JIUM LABS는 모든 프로젝트를 같은 흐름으로 만듭니다. 각 단계의 결과물을 외부에 투명하게 공유합니다.</p>
    </div>
    <ol class="steps">
      ${[
        { n:"01", t:"발견", d:"실제 팀 운영에서 마주친 불편을 기록합니다. 트위터·블로그·고객 인터뷰에서 시작점을 찾습니다." },
        { n:"02", t:"프로토타입", d:"2주 안에 가장 작은 버전을 만듭니다. 동작하지만 가공되지 않은 형태로 직접 사용합니다." },
        { n:"03", t:"비공개 베타", d:"10–20개 팀과 함께 6주 동안 손에 익게 다듬습니다. 매주 변경 사항을 함께 검토합니다." },
        { n:"04", t:"공개 출시", d:"자체 도메인에서 정식 출시합니다. 이후 매주 조용한 릴리스가 누적됩니다." },
      ].map(s => `
        <li class="step">
          <span class="step__num mono">${s.n}</span>
          <div>
            <h3>${s.t}</h3>
            <p>${s.d}</p>
          </div>
        </li>
      `).join("")}
    </ol>
  </div>
</section>
`;

/* ---------- FAQ ---------- */
document.getElementById("faq-slot").innerHTML = `
<section class="section" id="faq">
  <div class="container faq__wrap">
    <div class="section__head">
      <span class="eyebrow">자주 묻는 질문</span>
      <h2>자주 묻는 것들.</h2>
    </div>
    <div class="faq">
      ${[
        { q:"JIUM LABS는 어떤 회사인가요?",
          a:"지음랩스는 소규모 팀이 매일 쓰는 운영 도구를 만드는 SaaS 스튜디오입니다. 한 번에 하나의 제품을, 오래 다듬어 출시합니다. 각 제품은 자체 도메인에서 독립적으로 운영됩니다." },
        { q:"이 사이트에서 바로 가입할 수 있나요?",
          a:"이 사이트는 스튜디오 소개와 프로젝트 포트폴리오 페이지입니다. 가입과 결제는 각 프로젝트의 도메인에서 진행됩니다. 프로젝트 카드의 도메인 링크를 눌러주세요." },
        { q:"왜 제품마다 도메인을 분리하나요?",
          a:"각 제품은 사용자도, 사용 시점도 다릅니다. 도메인을 분리해 제품마다 독립된 정체성과 속도로 자랄 수 있게 합니다. 한 곳에서 묶여 흐려지는 것보다 각자 또렷한 편이 낫다고 봅니다." },
        { q:"제품끼리는 연동되나요?",
          a:"필요하면 됩니다. 모든 제품은 같은 인증 체계와 Webhook을 공유하므로 한 곳에서 시작한 작업을 다른 제품에서 이어 받을 수 있습니다. 다만 따로 써도 어색하지 않게 설계합니다." },
        { q:"협업이나 제휴 문의는 어떻게 하나요?",
          a:"페이지 하단의 문의 양식이나 jiumlabs@jiumlabs.com 로 메일 주세요. 영업일 기준 2일 이내 회신드립니다. 투자·M&A·라이선스 관련 문의는 별도 채널이 없습니다." },
        { q:"채용은 진행 중인가요?",
          a:"현재는 정규 채용 공고를 운영하지 않습니다. 다만 함께 만들고 싶은 분이라면 자신의 작업과 함께 메일 주세요. 회신은 더디지만 반드시 드립니다." },
      ].map((f, i) => `
        <details class="faq__item" ${i === 0 ? "open" : ""}>
          <summary><span>${f.q}</span><span class="faq__icon" aria-hidden="true">+</span></summary>
          <p>${f.a}</p>
        </details>
      `).join("")}
    </div>
  </div>
</section>
`;

/* ---------- CTA ---------- */
document.getElementById("cta-slot").innerHTML = `
<section class="fb-promo">
  <div class="container fb-promo__inner">
    <div class="fb-promo__copy">
      <span class="eyebrow">베타 피드백 보드</span>
      <h2>모든 의견은 공개적으로,<br/>모든 처리 상태도 공개적으로.</h2>
      <p>JIUM LABS의 제품은 베타 테스터의 피드백으로 다듬어집니다. 누구나 의견을 남기고, 추천하고, 진행 상황을 추적할 수 있습니다.</p>
      <div class="fb-promo__cta">
        <a class="btn btn--accent btn--lg" href="feedback.html">피드백 보드 열기 <span aria-hidden="true">→</span></a>
        <a class="btn btn--outline btn--lg" href="feedback.html#new">새 피드백 작성</a>
      </div>
    </div>
    <div class="fb-promo__preview" aria-hidden="true">
      <div class="fb-promo__card">
        <span class="fb-promo__pdot" style="background:oklch(0.55 0.15 260)"></span>
        <div>
          <div class="fb-promo__t">받은편지함 다중 선택으로 일괄 답장</div>
          <div class="fb-promo__m mono">Threadr · 진행 중 · 38</div>
        </div>
      </div>
      <div class="fb-promo__card">
        <span class="fb-promo__pdot" style="background:oklch(0.58 0.13 158)"></span>
        <div>
          <div class="fb-promo__t">Webhook 한글 페이로드 인코딩 수정</div>
          <div class="fb-promo__m mono">Loomi · 반영 완료 · 27</div>
        </div>
      </div>
      <div class="fb-promo__card fb-promo__card--dim">
        <span class="fb-promo__pdot" style="background:oklch(0.70 0.15 70)"></span>
        <div>
          <div class="fb-promo__t">주간 리포트 PDF 자동 저장</div>
          <div class="fb-promo__m mono">Stackbench · 검토 중 · 24</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section cta" id="cta">
  <div class="container cta__inner">
    <div class="cta__copy">
      <span class="eyebrow">함께 만들기</span>
      <h2>새 프로젝트 소식을<br/>가장 먼저 받아보세요.</h2>
      <p>JIUM LABS의 새 제품 출시, 비공개 베타 모집, 작업 노트를 한 달에 한 번 정리해 보내드립니다.</p>
    </div>
    <form class="cta__form" onsubmit="event.preventDefault(); this.querySelector('button').textContent='구독 완료 ✓'; this.querySelector('button').disabled = true;">
      <label class="cta__field">
        <span class="mono">이메일</span>
        <input type="email" required placeholder="you@team.co.kr" />
      </label>
      <button class="btn btn--accent btn--lg" type="submit">월간 소식 받기 <span aria-hidden="true">→</span></button>
      <p class="cta__fine">언제든 한 번의 클릭으로 구독 해지 · 협업 문의는 jiumlabs@jiumlabs.com</p>
    </form>
  </div>
</section>
`;
