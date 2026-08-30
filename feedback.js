/* JIUM LABS — feedback board logic (Supabase backend) */
(function () {
  const PROJECTS = {
    threadr:    { name: "PartStream", color: "oklch(0.55 0.15 260)" },
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
  let voterId = null;
  try { voterId = localStorage.getItem(VOTER_KEY); } catch { /* session-memory actor fallback */ }
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(voterId || "")) {
    voterId = "v" + (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));
    try { localStorage.setItem(VOTER_KEY, voterId); } catch { /* session-memory actor fallback */ }
  }

  // ---- state
  let items = [];
  const PAGE_SIZE = 20;
  let nextOffset = 0;
  let hasMore = false;
  let loadMorePromise = null;
  let loadMoreState = "idle";
  const stats = { total: null, progress: null, done: null, open: null };
  let statsGeneration = 0;
  const myVotes = new Map(); // Edge vote.state only; never a local authorization source
  const voteStates = new Map();
  const voteHydrationQueue = [];
  const queuedVoteIds = new Set();
  let activeVoteHydrations = 0;
  let feedbackGeneration = 0;
  const edgeUrl = cfg.SUPABASE_URL ? `${cfg.SUPABASE_URL}/functions/v1/feedback-write` : "";
  let writePromise = null;
  let listState = "loading";
  const commentStates = new Map();
  async function edge(action, payload) {
    if (!edgeUrl) throw Object.assign(new Error("unavailable"), { kind: "unavailable" });
    const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(edgeUrl, { method: "POST", headers: { apikey: cfg.SUPABASE_ANON_KEY, "content-type": "application/json" }, body: JSON.stringify({ action, actor_id: voterId, payload }), signal: controller.signal });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw Object.assign(new Error("edge_request_failed"), { kind: res.status === 429 ? "rate" : res.status === 400 ? "validation" : "unavailable", retryAfter: res.headers.get("retry-after") });
      return data;
    } catch (error) {
      if (error && error.name === "AbortError") throw Object.assign(new Error("timeout"), { kind: "timeout" });
      throw error;
    } finally { clearTimeout(timer); }
  }
  let commentsCache = {}; // { feedback_id: [comments] } — 펼친 적 있는 댓글 캐시
  const commentDrafts = new Map();
  let openThreads = new Set(); // 현재 펼쳐진 댓글 영역
  const cardElements = new Map();
  const cardControls = new Map();
  let filter = { project: "all", status: "all" };
  let sort = "votes";

  // ---- helpers
  const SAFE_ID = /^[A-Za-z0-9_-]{1,64}$/;
  const PROJECT_KEYS = new Set(Object.keys(PROJECTS));
  const STATUS_KEYS = new Set(Object.keys(STATUS));
  const TYPE_KEYS = new Set(Object.keys(TYPES));

  function writeErrorMessage(error) {
    if (error && error.kind === "rate") return "요청이 많습니다. 잠시 후 다시 시도해주세요.";
    if (error && error.kind === "timeout") return "요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.";
    if (error && error.kind === "validation") return "입력 내용을 확인한 뒤 다시 시도해주세요.";
    return "현재 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.";
  }
  function setWriteBusy(active) {
    [document.getElementById("fb-list"), document.getElementById("fb-form"), document.getElementById("fb-modal")]
      .forEach(node => node && node.setAttribute("aria-busy", String(active)));
    document.querySelectorAll(".fb-vote, .fb-thread__submit, #fb-form button[type=submit], #fb-modal [data-close]")
      .forEach(control => {
        if (control.classList.contains("fb-vote")) {
          const state = voteStates.get(control.dataset.id);
          control.disabled = active || !state || state === "loading";
        } else control.disabled = active;
      });
  }
  function runWrite(operation) {
    if (writePromise) return null;
    const pending = (async () => {
      setWriteBusy(true);
      try { return await operation(); }
      finally { setWriteBusy(false); writePromise = null; }
    })();
    writePromise = pending;
    return pending;
  }

  function el(tag, { className, text, attrs } = {}, children = []) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    if (attrs) Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, String(value)));
    children.flat().filter(Boolean).forEach(child => node.append(child));
    return node;
  }
  function boundedText(value, max, fallback = "") {
    return typeof value === "string" ? value.trim().slice(0, max) : fallback;
  }
  function count(value) {
    return Number.isFinite(value) && Number.isInteger(value) && value >= 0 ? value : 0;
  }
  function validDate(value) {
    return typeof value === "string" && value.length <= 40 &&
      /^\d{4}-\d{2}-\d{2}T/.test(value) && Number.isFinite(Date.parse(value));
  }
  function normalizeFeedback(row) {
    if (!row || typeof row !== "object" || !SAFE_ID.test(row.id || "") ||
        !PROJECT_KEYS.has(row.project) || !TYPE_KEYS.has(row.type) ||
        !STATUS_KEYS.has(row.status) || !validDate(row.date)) return null;
    const title = boundedText(row.title, 80);
    const body = boundedText(row.body, 800);
    if (!title || !body) return null;
    const tags = Array.isArray(row.tags) ? row.tags
      .filter(tag => typeof tag === "string")
      .map(tag => boundedText(tag, 24))
      .filter(Boolean)
      .slice(0, 10) : [];
    return {
      id: row.id, project: row.project, type: row.type, status: row.status, title, body,
      author: boundedText(row.author, 24, "익명") || "익명", date: row.date,
      votes: count(row.votes), comments: count(row.comments), tags,
      reply: boundedText(row.reply, 800),
    };
  }
  function normalizeComment(row, feedbackId) {
    if (!row || typeof row !== "object" || !SAFE_ID.test(row.id || "") ||
        row.feedback_id !== feedbackId || !validDate(row.created_at)) return null;
    const body = boundedText(row.body, 500);
    if (!body) return null;
    return { id: row.id, feedback_id: feedbackId, author: boundedText(row.author, 24, "익명") || "익명", body, created_at: row.created_at };
  }
  function feedbackIdFor(element, id) {
    if (SAFE_ID.test(id)) element.dataset.id = id;
    return element;
  }
  function fmtDate(iso) {
    const d = new Date(iso); const now = new Date();
    const diff = Math.floor((now - d) / 86400000);
    if (diff === 0) return "오늘";
    if (diff === 1) return "어제";
    if (diff < 7) return diff + "일 전";
    return `${d.getMonth()+1}월 ${d.getDate()}일`;
  }
  function commentIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    [ ["viewBox", "0 0 24 24"], ["width", "14"], ["height", "14"], ["fill", "none"], ["stroke", "currentColor"], ["stroke-width", "1.6"], ["stroke-linecap", "round"], ["stroke-linejoin", "round"], ["aria-hidden", "true"] ]
      .forEach(([name, value]) => svg.setAttribute(name, value));
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l1.6-4.7A8.5 8.5 0 1 1 21 11.5z");
    svg.append(path);
    return svg;
  }

  // ---- data layer (Supabase)
  function mergeFeedback(rows) {
    const known = new Set(items.map(item => item.id));
    const valid = rows.map(normalizeFeedback).filter(Boolean).filter(item => !known.has(item.id));
    items.push(...valid);
    return valid;
  }
  async function loadAll() {
    listState = "loading";
    feedbackGeneration += 1;
    nextOffset = 0; hasMore = false; loadMoreState = "idle"; items = []; myVotes.clear(); voteStates.clear();
    if (!supabase) { listState = "error"; return []; }
    const { data: rows, error } = await supabase
      .from("feedback")
      .select("id,project,type,status,title,body,author,date,votes,comments,tags,reply")
      .order("date", { ascending: false })
      .order("id", { ascending: false })
      .range(0, PAGE_SIZE);
    if (error) { console.error("[JIUM] loadAll failed"); listState = "error"; return []; }
    const rawPage = rows || [];
    const page = rawPage.slice(0, PAGE_SIZE);
    const loaded = mergeFeedback(page);
    if (page.length !== loaded.length) console.warn("[JIUM] Ignored invalid or duplicate feedback rows");
    nextOffset = PAGE_SIZE;
    hasMore = rawPage.length > PAGE_SIZE;
    listState = items.length ? "ready" : "empty";
    return loaded;
  }
  async function loadMore() {
    if (!supabase || !hasMore || loadMorePromise) return null;
    const offset = nextOffset;
    const pending = (async () => {
      const { data: rows, error } = await supabase
        .from("feedback")
        .select("id,project,type,status,title,body,author,date,votes,comments,tags,reply")
        .order("date", { ascending: false })
        .order("id", { ascending: false })
        .range(offset, offset + PAGE_SIZE);
      if (error) throw Object.assign(new Error("load_more_failed"), { kind: "unavailable" });
      const rawPage = rows || [];
      const page = rawPage.slice(0, PAGE_SIZE);
      const loaded = mergeFeedback(page);
      nextOffset = offset + PAGE_SIZE;
      hasMore = rawPage.length > PAGE_SIZE;
      loadMoreState = "ready";
      return loaded;
    })();
    loadMorePromise = pending;
    loadMoreState = "loading";
    try { return await pending; }
    catch (error) { loadMoreState = "error"; throw error; }
    finally { loadMorePromise = null; }
  }
  function renderStats() {
    document.getElementById("stat-total").textContent = stats.total ?? "—";
    document.getElementById("stat-progress").textContent = stats.progress ?? "—";
    document.getElementById("stat-done").textContent = stats.done ?? "—";
    document.getElementById("stat-open").textContent = stats.open ?? "—";
  }
  async function loadStats() {
    if (!supabase) return;
    const generation = ++statsGeneration;
    try {
      const queries = [
        ["total", supabase.from("feedback").select("id", { count: "exact", head: true })],
        ["progress", supabase.from("feedback").select("id", { count: "exact", head: true }).eq("status", "progress")],
        ["done", supabase.from("feedback").select("id", { count: "exact", head: true }).eq("status", "done")],
        ["open", supabase.from("feedback").select("id", { count: "exact", head: true }).eq("status", "open")],
      ];
      const results = await Promise.all(queries.map(([, request]) => request));
      if (generation !== statsGeneration) return;
      results.forEach((result, index) => {
        if (!result.error && Number.isInteger(result.count) && result.count >= 0) stats[queries[index][0]] = result.count;
      });
      renderStats();
    } catch { /* retain safe previous stats */ }
  }

  async function insertItem(item) {
    return edge("feedback.create", { project: item.project, type: item.type, title: item.title, body: item.body, author: item.author });
  }

  async function loadComments(feedbackId) {
    commentStates.set(feedbackId, "loading");
    if (!supabase) { commentsCache[feedbackId] = []; commentStates.set(feedbackId, "error"); return []; }
    const { data, error } = await supabase
      .from("feedback_comments")
      .select("id,feedback_id,author,body,created_at")
      .eq("feedback_id", feedbackId)
      .order("created_at", { ascending: true });
    if (error) { console.error("[JIUM] loadComments failed"); commentsCache[feedbackId] = []; commentStates.set(feedbackId, "error"); return []; }
    commentsCache[feedbackId] = (data || []).map(row => normalizeComment(row, feedbackId)).filter(Boolean);
    if ((data || []).length !== commentsCache[feedbackId].length) console.warn("[JIUM] Ignored invalid feedback comments");
    commentStates.set(feedbackId, commentsCache[feedbackId].length ? "ready" : "empty");
    return commentsCache[feedbackId];
  }

  async function insertComment(feedbackId, author, body) {
    const data = await edge("comment.create", { feedback_id: feedbackId, author: author || "익명", body });
    // 캐시와 카드의 카운트도 즉시 갱신 (트리거가 DB.comments 갱신은 처리)
    if (!commentsCache[feedbackId]) commentsCache[feedbackId] = [];
    const comment = normalizeComment(data, feedbackId);
    if (!comment) { console.warn("[JIUM] Ignored invalid created comment"); return null; }
    commentsCache[feedbackId].push(comment);
    const item = items.find(x => x.id === feedbackId);
    if (item) item.comments = (item.comments || 0) + 1;
    return comment;
  }

  function normalizeVoteState(data, feedbackId) {
    if (!data || typeof data !== "object" || data.feedback_id !== feedbackId || typeof data.voted !== "boolean" ||
        !Number.isFinite(data.votes) || !Number.isInteger(data.votes) || data.votes < 0) return null;
    return { feedbackId, voted: data.voted, votes: data.votes };
  }
  async function getVoteState(id) {
    const state = normalizeVoteState(await edge("vote.state", { feedback_id: id }), id);
    if (!state) throw Object.assign(new Error("invalid_vote_state"), { kind: "unavailable" });
    return state;
  }
  function applyVoteState(id, state, availability) {
    const controls = cardControls.get(id);
    if (!controls) return;
    const { vote, voteCount } = controls;
    if (state) {
      voteCount.textContent = String(state.votes);
      vote.classList.toggle("is-on", state.voted);
      vote.setAttribute("aria-pressed", String(state.voted));
    } else vote.removeAttribute("aria-pressed");
    const unknown = availability === "loading";
    vote.disabled = unknown || !!writePromise;
    vote.setAttribute("aria-busy", String(unknown));
    vote.setAttribute("aria-label", unknown ? "추천 상태를 확인하는 중" : availability === "error" ? "추천 상태를 확인할 수 없습니다. 다시 시도하려면 추천" : "추천");
  }
  function reorderVisibleCardNodes() {
    if (sort !== "votes") return;
    const list = document.getElementById("fb-list");
    visible().forEach(item => {
      const card = cardElements.get(item.id);
      if (card) list.append(card);
    });
  }
  function pumpVoteHydration() {
    while (activeVoteHydrations < 4 && voteHydrationQueue.length) {
      const task = voteHydrationQueue.shift();
      activeVoteHydrations += 1;
      void hydrateVoteState(task).finally(() => {
        activeVoteHydrations -= 1;
        queuedVoteIds.delete(task.key);
        pumpVoteHydration();
        if (!activeVoteHydrations && !voteHydrationQueue.length) reorderVisibleCardNodes();
      });
    }
  }
  async function hydrateVoteState(task) {
    const item = items.find(candidate => candidate.id === task.id);
    if (!item || task.generation !== feedbackGeneration) return;
    try {
      const state = await getVoteState(task.id);
      if (task.generation !== feedbackGeneration || !items.includes(item)) return;
      myVotes.set(task.id, state.voted);
      item.votes = state.votes;
      voteStates.set(task.id, "ready");
      applyVoteState(task.id, state, "ready");
    } catch {
      if (task.generation !== feedbackGeneration) return;
      voteStates.set(task.id, "error");
      applyVoteState(task.id, null, "error");
    }
  }
  function enqueueVoteHydration(loadedItems) {
    loadedItems.forEach(item => {
      const key = `${feedbackGeneration}:${item.id}`;
      if (!SAFE_ID.test(item.id) || queuedVoteIds.has(key) || voteStates.has(item.id)) return;
      queuedVoteIds.add(key);
      voteStates.set(item.id, "loading");
      applyVoteState(item.id, null, "loading");
      voteHydrationQueue.push({ id: item.id, generation: feedbackGeneration, key });
    });
    pumpVoteHydration();
  }
  async function toggleVote(id) {
    const item = items.find(x => x.id === id);
    if (!item || !SAFE_ID.test(id)) return false;
    const before = await getVoteState(id);
    const after = normalizeVoteState(await edge("vote.set", { feedback_id: id, desired: !before.voted }), id);
    if (!after) throw Object.assign(new Error("invalid_vote_result"), { kind: "unavailable" });
    item.votes = after.votes;
    myVotes.set(id, after.voted);
    voteStates.set(id, "ready");
    return after;
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

  function captureFocus() {
    const active = document.activeElement;
    if (active === document.getElementById("fb-load-more")) return { controlKind: "loadMore" };
    for (const [feedbackId, controls] of cardControls) {
      for (const [controlKind, control] of Object.entries(controls)) {
        if (active === control) return { feedbackId, controlKind };
      }
    }
    return null;
  }
  function restoreFocus(reference) {
    if (!reference) return;
    const target = reference.controlKind === "loadMore"
      ? document.getElementById("fb-load-more")
      : cardControls.get(reference.feedbackId)?.[reference.controlKind];
    if (target && !target.disabled && !target.hidden) target.focus();
  }
  function render(focusReference = captureFocus()) {
    const list = document.getElementById("fb-list");
    const empty = document.getElementById("fb-empty");
    const emptyMessage = empty.querySelector("p");
    const statusMessage = document.getElementById("fb-status");
    const loadMoreButton = document.getElementById("fb-load-more");
    const data = visible();
    cardElements.clear();
    cardControls.clear();
    list.replaceChildren(...data.map(card));
    list.setAttribute("aria-busy", String(listState === "loading" || !!writePromise));
    const filteredEmpty = listState === "ready" && data.length === 0;
    empty.hidden = listState === "ready" && !filteredEmpty;
    emptyMessage.textContent = listState === "loading" ? "피드백을 불러오는 중입니다." :
      listState === "error" ? "피드백을 불러올 수 없습니다. 잠시 후 다시 시도해주세요." :
      filteredEmpty ? "조건에 맞는 피드백이 없습니다." : "표시할 피드백이 없습니다.";
    loadMoreButton.hidden = !hasMore;
    loadMoreButton.disabled = !!loadMorePromise;
    loadMoreButton.textContent = loadMorePromise ? "더 불러오는 중…" : "더 보기";
    statusMessage.hidden = loadMoreState === "idle" || loadMoreState === "ready";
    statusMessage.textContent = loadMoreState === "loading" ? "피드백을 더 불러오는 중입니다." :
      loadMoreState === "error" ? "피드백을 더 불러올 수 없습니다. 다시 시도해주세요." : "";

    renderStats();
    if (writePromise) setWriteBusy(true);
    restoreFocus(focusReference);
  }

  function card(it) {
    const p = PROJECTS[it.project];
    const s = STATUS[it.status];
    const t = TYPES[it.type];
    const voteState = voteStates.get(it.id);
    const voteUnknown = !voteState || voteState === "loading";
    const voted = myVotes.get(it.id) === true;
    const voteCount = el("strong", { text: String(it.votes) });
    const voteAttrs = { type: "button", "aria-label": voteState === "error" ? "추천 상태를 확인할 수 없습니다. 다시 시도하려면 추천" : voteUnknown ? "추천 상태를 확인하는 중" : "추천", "aria-busy": String(voteUnknown) };
    if (voteState === "ready") voteAttrs["aria-pressed"] = String(voted);
    const vote = feedbackIdFor(el("button", { className: `fb-vote${voted ? " is-on" : ""}`, attrs: voteAttrs }, [
      el("span", { text: "▲", attrs: { "aria-hidden": "true" } }), voteCount,
    ]), it.id);
    vote.disabled = voteUnknown || !!writePromise;
    vote.addEventListener("click", async () => {
      const focusReference = { feedbackId: it.id, controlKind: "vote" };
      const originalActive = document.activeElement;
      const write = runWrite(() => toggleVote(it.id));
      if (!write) return;
      try {
        const state = await write;
        if (state) {
          applyVoteState(it.id, state, "ready");
          reorderVisibleCardNodes();
          if (originalActive === vote && (document.activeElement === vote || document.activeElement === document.body)) restoreFocus(focusReference);
        }
      }
      catch (error) { alert(writeErrorMessage(error)); }
    });

    const project = el("span", { className: "fb-proj" }, [el("span", { className: "fb-proj__dot" }), document.createTextNode(p.name)]);
    project.style.setProperty("--c", p.color);
    const top = el("div", { className: "fb-card__top" }, [
      project,
      el("span", { className: "fb-type mono", text: `${t.emoji} ${t.label}` }),
      el("span", { className: `fb-status fb-status--${s.k}`, text: s.label }),
    ]);
    const main = el("div", { className: "fb-card__main" }, [
      top,
      el("h3", { className: "fb-card__title", text: it.title }),
      el("p", { className: "fb-card__body", text: it.body }),
    ]);
    if (it.tags.length) main.append(el("div", { className: "fb-card__tags" }, it.tags.map(tag => el("span", { text: `#${tag}` }))));
    if (it.reply) main.append(el("div", { className: "fb-reply" }, [
      el("div", { className: "fb-reply__head mono", text: "JIUM LABS · 답변" }),
      el("p", { text: it.reply }),
    ]));

    const comments = feedbackIdFor(el("button", { className: "fb-comments fb-comments--btn", attrs: { type: "button", "aria-expanded": String(openThreads.has(it.id)), "aria-label": "댓글 펼치기" } }, [
      commentIcon(), el("span", { className: "fb-comments__n", text: String(it.comments) }),
    ]), it.id);
    comments.addEventListener("click", async () => {
      if (openThreads.has(it.id)) {
        openThreads.delete(it.id);
        render();
        return;
      }
      openThreads.add(it.id);
      if (!commentsCache[it.id] && commentStates.get(it.id) !== "loading") {
        render();
        await loadComments(it.id);
      }
      render();
    });
    main.append(el("div", { className: "fb-card__foot" }, [
      el("span", { text: it.author }), el("span", { className: "fb-dot", text: "·" }),
      el("span", { text: fmtDate(it.date) }), el("span", { className: "fb-dot", text: "·" }), comments,
    ]));
    cardControls.set(it.id, { vote, voteCount, comments });
    if (openThreads.has(it.id)) main.append(thread(it, cardControls.get(it.id)));
    const cardElement = feedbackIdFor(el("article", { className: "fb-card" }, [vote, main]), it.id);
    cardElements.set(it.id, cardElement);
    return cardElement;
  }

  function thread(it, controls) {
    const list = commentsCache[it.id];
    const threadList = el("div", { className: "fb-thread__list" });
    if (commentStates.get(it.id) === "loading" || !list) threadList.append(el("div", { className: "fb-thread__loading mono", text: "불러오는 중…" }));
    else if (commentStates.get(it.id) === "error") threadList.append(el("div", { className: "fb-thread__empty mono", text: "댓글을 불러올 수 없습니다. 잠시 후 다시 시도해주세요." }));
    else if (!list.length) threadList.append(el("div", { className: "fb-thread__empty mono", text: "첫 댓글을 남겨보세요." }));
    else list.forEach(comment => threadList.append(el("div", { className: "fb-comment" }, [
      el("div", { className: "fb-comment__head" }, [
        el("span", { className: "fb-comment__author", text: comment.author }),
        el("span", { className: "fb-dot", text: "·" }),
        el("span", { className: "fb-comment__date mono", text: fmtDate(comment.created_at) }),
      ]),
      el("div", { className: "fb-comment__body", text: comment.body }),
    ])));
    const author = el("input", { className: "fb-thread__author", attrs: { type: "text", name: "author", placeholder: "이름 (선택)", maxlength: "20" } });
    const body = el("textarea", { className: "fb-thread__body", attrs: { name: "body", placeholder: "댓글을 남겨주세요…", rows: "2", maxlength: "500", required: "" } });
    const draft = commentDrafts.get(it.id) || { author: "", body: "" };
    author.value = draft.author;
    body.value = draft.body;
    const syncDraft = () => {
      if (SAFE_ID.test(it.id)) commentDrafts.set(it.id, { author: author.value.slice(0, 20), body: body.value.slice(0, 500) });
    };
    author.addEventListener("input", syncDraft);
    body.addEventListener("input", syncDraft);
    const submit = el("button", { className: "fb-thread__submit", text: "등록", attrs: { type: "submit" } });
    submit.disabled = !!writePromise;
    controls.author = author;
    controls.body = body;
    controls.commentSubmit = submit;
    const form = feedbackIdFor(el("form", { className: "fb-thread__form" }, [author, body, submit]), it.id);
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const commentBody = body.value.trim();
      if (!commentBody) return;
      const write = runWrite(() => insertComment(it.id, author.value.trim(), commentBody));
      if (!write) return;
      try {
        if (await write) {
          commentDrafts.delete(it.id);
          body.value = "";
          commentStates.set(it.id, "ready");
          render({ feedbackId: it.id, controlKind: "body" });
        }
      } catch (error) { alert(writeErrorMessage(error)); }
    });
    return feedbackIdFor(el("div", { className: "fb-thread" }, [threadList, form]), it.id);
  }

  // ---- filters / sort
  document.querySelectorAll("[data-filter]").forEach(el => {
    el.addEventListener("click", () => {
      const k = el.dataset.filter, v = el.dataset.value;
      if ((k !== "project" && k !== "status") || !v) return;
      filter[k] = v;
      document.querySelectorAll("[data-filter]").forEach(b => {
        if (b.dataset.filter === k) b.classList.toggle("is-on", b.dataset.value === v);
      });
      render();
    });
  });
  document.getElementById("sort").addEventListener("change", (e) => { sort = e.target.value; render(); });
  document.getElementById("fb-load-more").addEventListener("click", async () => {
    if (!hasMore || loadMorePromise) return;
    const request = loadMore();
    render({ controlKind: "loadMore" });
    try {
      const loaded = await request;
      render({ controlKind: "loadMore" });
      if (loaded.length) enqueueVoteHydration(loaded);
    } catch {
      render({ controlKind: "loadMore" });
    }
  });

  // ---- modal
  const modal = document.getElementById("fb-modal");
  const feedbackForm = document.getElementById("fb-form");
  let modalOpener = null;
  function modalFocusable() {
    return Array.from(modal.querySelectorAll("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]"))
      .filter(node => !node.hidden && node.getAttribute("aria-hidden") !== "true");
  }
  function handleModalKeydown(event) {
    if (event.key === "Escape") { event.preventDefault(); closeModal(); return; }
    if (event.key !== "Tab") return;
    const nodes = modalFocusable();
    if (!nodes.length) { event.preventDefault(); return; }
    const first = nodes[0], last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  function openModal(opener) {
    if (modal.getAttribute("aria-hidden") === "false") return;
    modalOpener = opener instanceof HTMLElement ? opener : document.activeElement;
    const sel = document.getElementById("f-project");
    if (filter.project && filter.project !== "all" && Array.from(sel.options).some(option => option.value === filter.project)) {
      sel.value = filter.project;
    }
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleModalKeydown);
    setTimeout(() => document.getElementById("f-title").focus(), 50);
  }
  function closeModal() {
    if (writePromise) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    feedbackForm.reset();
    document.removeEventListener("keydown", handleModalKeydown);
    if (modalOpener && modalOpener.isConnected) modalOpener.focus();
    modalOpener = null;
  }
  document.getElementById("open-new").addEventListener("click", (e) => { e.preventDefault(); openModal(e.currentTarget); });
  document.getElementById("open-new-2").addEventListener("click", (e) => openModal(e.currentTarget));
  modal.querySelectorAll("[data-close]").forEach(el => el.addEventListener("click", closeModal));

  feedbackForm.addEventListener("submit", async (e) => {
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

    const write = runWrite(() => insertItem(item));
    if (!write) return;
    let created;
    try { created = await write; }
    catch (error) { alert(writeErrorMessage(error)); return; }

    const createdItem = normalizeFeedback({ ...item, ...created });
    if (!createdItem || typeof created.voted !== "boolean") {
      console.warn("[JIUM] Ignored invalid created feedback");
      alert("저장 결과를 확인할 수 없습니다. 새로고침 후 확인해주세요.");
      return;
    }
    items.unshift(createdItem);
    myVotes.set(createdItem.id, created.voted);
    voteStates.set(createdItem.id, "ready");
    void loadStats();
    closeModal();

    filter = { project: "all", status: "all" };
    document.querySelectorAll("[data-filter]").forEach(b => b.classList.toggle("is-on", b.dataset.value === "all"));
    sort = "recent";
    document.getElementById("sort").value = "recent";
    render();
    const newCard = cardElements.get(createdItem.id);
    if (newCard) { newCard.classList.add("is-new"); newCard.scrollIntoView({behavior: "smooth", block: "center"}); }

  });

  // ---- init
  (async function init() {
    void loadStats();
    const initialLoad = loadAll();
    render();
    const loaded = await initialLoad;
    render();
    if (loaded.length) enqueueVoteHydration(loaded);
  })();
})();
