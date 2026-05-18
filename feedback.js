/* JIUM LABS — feedback board logic (Supabase backend) */
(function () {
  const PROJECTS = {
    threadr:    { name: "Threadr",    color: "oklch(0.55 0.15 260)" },
    loomi:      { name: "Loomi",      color: "oklch(0.58 0.13 158)" },
    stackbench: { name: "Stackbench", color: "oklch(0.70 0.15 70)"  },
    notedeck:   { name: "Notedeck",   color: "oklch(0.62 0.16 18)"  },
    general:    { name: "JIUM",       color: "var(--fg)" },
  };
  const STATUS = {
    open:      { label: "검토 중", k: "open" },
    progress:  { label: "진행 중", k: "progress" },
    done:      { label: "반영 완료", k: "done" },
    rejected:  { label: "반려",   k: "rejected" },
  };
  const TYPES = {
    bug:     { label: "버그",     emoji: "🐞" },
    feature: { label: "기능 제안", emoji: "✨" },
    improve: { label: "개선",     emoji: "↑" },
    other:   { label: "기타",     emoji: "·" },
  };

  // ---- Supabase client
  const cfg = window.JIUM_CONFIG || {};
  const supabase = (window.supabase && cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY)
    ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY)
    : null;

  if (!supabase) {
    console.warn("[JIUM] Supabase not configured. Set window.JIUM_CONFIG in config.js");
  }

  // 익명 투표자 ID (브라우저별 식별, 중복투표 방지용)
  const VOTER_KEY = "jium_voter_id_v1";
  let voterId = localStorage.getItem(VOTER_KEY);
  if (!voterId) {
    voterId = "v" + (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
    localStorage.setItem(VOTER_KEY, voterId);
  }

  // ---- state
  let items = [];
  let myVotes = {}; // { feedback_id: true } — 이 브라우저로 추천한 항목
  let filter = { project: "all", status: "all" };
  let sort = "votes";

  // ---- helpers
  function fmtDate(iso) {
    const d = new Date(iso); const now = new Date();
    const diff = Math.floor((now - d) / 86400000);
    if (diff === 0) return "오늘";
    if (diff === 1) return "어제";
    if (diff < 7) return diff + "일 전";
    return `${d.getMonth()+1}월 ${d.getDate()}일`;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;" }[ch]));
  }

  // ---- data layer (Supabase)
  async function loadAll() {
    if (!supabase) { items = []; myVotes = {}; return; }
    const { data: rows, error } = await supabase
      .from("feedback")
      .select("*")
      .order("date", { ascending: false });
    if (error) { console.error("[JIUM] loadAll error", error); items = []; return; }
    items = (rows || []).map(r => ({ ...r, tags: r.tags || [] }));

    const { data: myV, error: mvErr } = await supabase
      .from("feedback_votes")
      .select("feedback_id")
      .eq("voter_id", voterId);
    if (mvErr) { console.warn("[JIUM] loadVotes error", mvErr); myVotes = {}; return; }
    myVotes = {};
    (myV || []).forEach(r => { myVotes[r.feedback_id] = true; });
  }

  async function insertItem(item) {
    if (!supabase) return false;
    const { error } = await supabase.from("feedback").insert(item);
    if (error) { console.error("[JIUM] insertItem error", error); alert("저장에 실패했습니다. 잠시 후 다시 시도해주세요."); return false; }
    return true;
  }

  async function toggleVote(id) {
    if (!supabase) return;
    const item = items.find(x => x.id === id);
    if (!item) return;
    if (myVotes[id]) {
      // 추천 취소
      const { error: dErr } = await supabase.from("feedback_votes").delete().eq("feedback_id", id).eq("voter_id", voterId);
      if (dErr) { console.error("[JIUM] unvote error", dErr); return; }
      const next = Math.max(0, (item.votes || 0) - 1);
      await supabase.from("feedback").update({ votes: next }).eq("id", id);
      item.votes = next;
      delete myVotes[id];
    } else {
      // 추천
      const { error: iErr } = await supabase.from("feedback_votes").insert({ feedback_id: id, voter_id: voterId });
      if (iErr) { console.error("[JIUM] vote error", iErr); return; }
      const next = (item.votes || 0) + 1;
      await supabase.from("feedback").update({ votes: next }).eq("id", id);
      item.votes = next;
      myVotes[id] = true;
    }
  }

  // ---- view
  function visible() {
    return items
      .filter(it => filter.project === "all" || it.project === filter.project)
      .filter(it => filter.status === "all" || it.status === filter.status)
      .sort((a, b) => {
        if (sort === "votes") return (b.votes||0) - (a.votes||0);
        if (sort === "recent") return new Date(b.date) - new Date(a.date);
        if (sort === "comments") return (b.comments||0) - (a.comments||0);
        return 0;
      });
  }

  function render() {
    const list = document.getElementById("fb-list");
    const empty = document.getElementById("fb-empty");
    const data = visible();
    list.innerHTML = data.map(card).join("");
    empty.hidden = data.length > 0;

    // stats
    document.getElementById("stat-total").textContent = items.length;
    document.getElementById("stat-progress").textContent = items.filter(i => i.status === "progress").length;
    document.getElementById("stat-done").textContent = items.filter(i => i.status === "done").length;
    document.getElementById("stat-open").textContent = items.filter(i => i.status === "open").length;

    bindCards();
  }

  function card(it) {
    const p = PROJECTS[it.project] || PROJECTS.general;
    const s = STATUS[it.status] || STATUS.open;
    const t = TYPES[it.type] || TYPES.other;
    const voted = !!myVotes[it.id];
    return `
      <article class="fb-card" data-id="${it.id}">
        <button class="fb-vote ${voted ? 'is-on' : ''}" data-id="${it.id}" aria-label="추천">
          <span aria-hidden="true">▲</span>
          <strong>${it.votes||0}</strong>
        </button>
        <div class="fb-card__main">
          <div class="fb-card__top">
            <span class="fb-proj" style="--c:${p.color}">
              <span class="fb-proj__dot"></span>${p.name}
            </span>
            <span class="fb-type mono">${t.emoji} ${t.label}</span>
            <span class="fb-status fb-status--${s.k}">${s.label}</span>
          </div>
          <h3 class="fb-card__title">${escapeHtml(it.title)}</h3>
          <p class="fb-card__body">${escapeHtml(it.body)}</p>
          ${it.tags && it.tags.length ? `<div class="fb-card__tags">${it.tags.map(tag => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
          ${it.reply ? `
            <div class="fb-reply">
              <div class="fb-reply__head mono">JIUM LABS · 답변</div>
              <p>${escapeHtml(it.reply)}</p>
            </div>` : ""}
          <div class="fb-card__foot">
            <span>${escapeHtml(it.author || "익명")}</span>
            <span class="fb-dot">·</span>
            <span>${fmtDate(it.date)}</span>
            <span class="fb-dot">·</span>
            <span class="fb-comments" aria-label="댓글">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l1.6-4.7A8.5 8.5 0 1 1 21 11.5z"/></svg>
              ${it.comments||0}
            </span>
          </div>
        </div>
      </article>
    `;
  }

  function bindCards() {
    document.querySelectorAll(".fb-vote").forEach(btn => {
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        await toggleVote(btn.dataset.id);
        render();
      });
    });
  }

  // ---- filters / sort
  document.querySelectorAll("[data-filter]").forEach(el => {
    el.addEventListener("click", () => {
      const k = el.dataset.filter, v = el.dataset.value;
      filter[k] = v;
      document.querySelectorAll(`[data-filter='${k}']`).forEach(b => b.classList.toggle("is-on", b.dataset.value === v));
      render();
    });
  });
  document.getElementById("sort").addEventListener("change", (e) => { sort = e.target.value; render(); });

  // ---- modal
  const modal = document.getElementById("fb-modal");
  function openModal() {
    const sel = document.getElementById("f-project");
    if (filter.project && filter.project !== "all" && sel.querySelector(`option[value="${filter.project}"]`)) {
      sel.value = filter.project;
    }
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => document.getElementById("f-title").focus(), 50);
  }
  function closeModal() { modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; document.getElementById("fb-form").reset(); }
  document.getElementById("open-new").addEventListener("click", (e) => { e.preventDefault(); openModal(); });
  document.getElementById("open-new-2").addEventListener("click", openModal);
  modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal(); });

  document.getElementById("fb-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const project = document.getElementById("f-project").value;
    const type = (document.querySelector("input[name=type]:checked") || {}).value || "feature";
    const title = document.getElementById("f-title").value.trim();
    const body = document.getElementById("f-body").value.trim();
    const author = document.getElementById("f-name").value.trim() || "익명";
    if (!title || !body) return;

    const item = {
      id: "u" + Date.now().toString(36),
      project, type, status: "open",
      title, body, author, date: new Date().toISOString(),
      votes: 1, comments: 0, tags: [],
    };

    const submitBtn = e.target.querySelector("button[type=submit]");
    if (submitBtn) submitBtn.disabled = true;

    const ok = await insertItem(item);
    if (!ok) { if (submitBtn) submitBtn.disabled = false; return; }

    // 작성자 본인은 자동 추천
    await supabase.from("feedback_votes").insert({ feedback_id: item.id, voter_id: voterId });

    items.unshift(item);
    myVotes[item.id] = true;
    closeModal();

    filter = { project: "all", status: "all" };
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.toggle("is-on", b.dataset.value === "all"));
    sort = "recent";
    document.getElementById("sort").value = "recent";
    render();
    const el = document.querySelector(`[data-id="${item.id}"]`);
    if (el) { el.classList.add("is-new"); el.scrollIntoView({behavior: "smooth", block: "center"}); }

    if (submitBtn) submitBtn.disabled = false;
  });

  // ---- init
  (async function init() {
    await loadAll();
    render();
  })();
})();
