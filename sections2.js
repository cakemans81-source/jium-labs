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
        { i:"clock", t:"느리게, 단단하게", d:"기능을 무리하게 늘리지 않습니다. 출시한 제품의 안정적인 운영과 지속적인 개선을 지향합니다." },
        { i:"link",  t:"독립과 연결",       d:"각 프로젝트는 목적과 준비 상태에 맞춰 별도로 운영합니다. 연결 기능은 실제 지원 범위 안에서 안내합니다." },
        { i:"flag",  t:"한국어 우선",       d:"외산 SaaS를 번역하지 않습니다. 한국 팀의 워크플로우와 세무·계약 처리에서 출발합니다." },
        { i:"shield",t:"데이터는 가볍게",   d:"수집은 최소한으로, 보관은 보수적으로. 처음부터 감사 가능한 구조로 설계합니다." },
        { i:"code",  t:"확인된 연결",       d:"REST·Webhook·SDK 등 연동 기능은 제품별 준비 상태에 따라 다릅니다. 실제로 제공되는 기능만 각 프로젝트에서 안내합니다." },
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
      <p>프로젝트마다 필요한 순서와 속도는 다릅니다. 아래는 상황에 따라 조정되는 기본 작업 흐름입니다.</p>
    </div>
    <ol class="steps">
      ${[
        { n:"01", t:"발견", d:"현장 업무에서 마주친 불편과 사용자 의견을 기록해 시작점을 찾습니다." },
        { n:"02", t:"프로토타입", d:"핵심 흐름을 확인할 수 있는 작은 버전을 만들고 직접 검토합니다." },
        { n:"03", t:"검토", d:"필요한 범위에서 사용 의견을 받고 기능과 흐름을 다듬습니다." },
        { n:"04", t:"공개", d:"준비가 끝난 프로젝트부터 공개하고, 확인된 필요에 따라 개선합니다." },
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
          a:"지음랩스는 소규모 팀을 위한 운영 도구와 홈페이지를 만드는 스튜디오입니다. 공개된 작업과 준비 상태는 프로젝트 카드에서 확인할 수 있습니다." },
        { q:"이 사이트에서 바로 가입할 수 있나요?",
          a:"이 사이트에서는 가입이나 결제를 제공하지 않습니다. 이용 가능한 작업은 프로젝트 카드의 링크에서 확인할 수 있고, 아직 공개되지 않은 작업은 준비 중으로 표시합니다." },
        { q:"프로젝트는 어떻게 구분해 운영하나요?",
          a:"각 프로젝트의 목적과 준비 상태를 따로 관리합니다. 공개된 작업은 해당 링크로 안내하고, 아직 이용할 수 없는 작업은 준비 중으로 표시합니다." },
        { q:"제품끼리는 연동되나요?",
          a:"제품별 연동 범위는 서로 다르며, 이 페이지에서는 공통 인증이나 Webhook 연동을 보장하지 않습니다. 실제 지원 기능은 각 프로젝트의 안내를 기준으로 확인해 주세요." },
        { q:"협업이나 제휴 문의는 어떻게 하나요?",
          a:"페이지 하단 이메일 버튼 또는 jiumlabs@jiumlabs.com으로 문의해 주세요. 홈페이지 제작과 SaaS 협업 문의를 확인한 뒤 가능한 범위에서 회신드립니다." },
        { q:"채용은 진행 중인가요?",
          a:"현재 정규 채용 공고는 없습니다. 함께 만들고 싶은 분은 자신의 작업과 함께 메일로 연락해 주세요." },
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
      <h2>의견을 남기고,<br/>처리 상태를 확인하세요.</h2>
      <p>피드백 보드에 공개된 의견을 보고, 추천하고, 진행 상태를 확인할 수 있습니다.</p>
      <div class="fb-promo__cta">
        <a class="btn btn--accent btn--lg" href="feedback.html">피드백 보드 열기 <span aria-hidden="true">→</span></a>
        <a class="btn btn--outline btn--lg" href="feedback.html#new">새 피드백 작성</a>
      </div>
    </div>
    <div class="fb-promo__preview">
      <span class="fb-promo__preview-label">화면 예시 · 실제 데이터 아님</span>
      <div class="fb-promo__card" aria-hidden="true">
        <span class="fb-promo__pdot" style="background:oklch(0.55 0.15 260)"></span>
        <div>
          <div class="fb-promo__t">받은편지함 다중 선택으로 일괄 답장</div>
          <div class="fb-promo__m mono">PartStream · 피드백 예시</div>
        </div>
      </div>
      <div class="fb-promo__card" aria-hidden="true">
        <span class="fb-promo__pdot" style="background:oklch(0.58 0.13 158)"></span>
        <div>
          <div class="fb-promo__t">Webhook 한글 페이로드 인코딩 수정</div>
          <div class="fb-promo__m mono">Loomi · 피드백 예시</div>
        </div>
      </div>
      <div class="fb-promo__card fb-promo__card--dim" aria-hidden="true">
        <span class="fb-promo__pdot" style="background:oklch(0.70 0.15 70)"></span>
        <div>
          <div class="fb-promo__t">주간 리포트 PDF 자동 저장</div>
          <div class="fb-promo__m mono">Notedeck · 피드백 예시</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section cta" id="cta">
  <div class="container cta__inner">
    <div class="cta__copy">
      <span class="eyebrow">함께 만들기</span>
      <h2>만들고 싶은 일을 <br/>함께 이야기해요.</h2>
      <p>홈페이지 제작부터 SaaS 협업까지, 프로젝트의 맥락을 이메일로 들려주세요.</p>
    </div>
    <div class="cta__contact">
      <span class="mono">이메일 문의</span>
      <a class="cta__email" href="mailto:jiumlabs@jiumlabs.com">jiumlabs@jiumlabs.com</a>
      <a class="btn btn--accent btn--lg" href="mailto:jiumlabs@jiumlabs.com">이메일로 문의하기 <span aria-hidden="true">→</span></a>
      <p class="cta__fine">홈페이지 제작과 SaaS 협업 문의를 이메일로 보내주세요.</p>
    </div>
  </div>
</section>
`;
