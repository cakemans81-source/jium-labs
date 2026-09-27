/* JIUM LABS — showreel: muted loop in the hero console + full-screen modal player */
(function () {
  const BASE = "assets/showreel/showreel";
  const VER = "?v=20260927_01";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  // 720p for small / low-DPR screens, 1080p otherwise
  function pickSize(cssWidth) {
    return cssWidth * Math.min(window.devicePixelRatio || 1, 2) > 1400 ? "1080" : "720";
  }
  function setSources(video, size) {
    if (video.dataset.size === size) return;
    video.dataset.size = size;
    video.innerHTML =
      `<source src="${BASE}-${size}.webm${VER}" type="video/webm">` +
      `<source src="${BASE}-${size}.mp4${VER}" type="video/mp4">`;
    video.load();
  }

  /* ---------- hero console: muted loop while on screen ---------- */
  let inView = true;
  let modalOpen = false;
  let observed = null;
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => { inView = entries[0].isIntersecting; syncHero(); }, { threshold: 0.2 })
    : null;

  function syncHero() {
    const hero = document.querySelector("video[data-reel-hero]");
    if (!hero) return;
    if (hero !== observed && io) { // hero markup can be re-rendered by sections.js
      if (observed) io.unobserve(observed);
      io.observe(hero);
      observed = hero;
    }
    hero.muted = true;
    hero.defaultMuted = true;
    const shouldPlay = inView && !modalOpen && !reduceMotion.matches && !saveData && !document.hidden;
    if (shouldPlay) {
      setSources(hero, pickSize(hero.clientWidth || window.innerWidth));
      const p = hero.play();
      if (p) p.catch(() => {});
    } else if (!hero.paused) {
      hero.pause();
    }
  }
  syncHero();
  document.addEventListener("visibilitychange", syncHero);
  if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", syncHero);
  const heroSlot = document.getElementById("hero-slot");
  if (heroSlot) new MutationObserver(syncHero).observe(heroSlot, { childList: true });

  /* ---------- modal ---------- */
  const modal = document.getElementById("reel-modal");
  if (!modal || typeof modal.showModal !== "function") return;
  const player = modal.querySelector(".reel-modal__video");
  let returnFocus = null;

  function openReel(startAt) {
    returnFocus = document.activeElement;
    modalOpen = true;
    syncHero();
    setSources(player, window.innerWidth < 700 ? "720" : "1080"); // modal is large → prefer 1080p except on phones
    modal.showModal();
    document.documentElement.classList.add("reel-lock");
    const start = () => {
      try { player.currentTime = startAt || 0; } catch (e) { /* not seekable yet */ }
      player.muted = false;
      const p = player.play();
      if (p) p.catch(() => {});
    };
    if (player.readyState >= 1) start();
    else player.addEventListener("loadedmetadata", start, { once: true });
  }
  function closeReel() {
    if (modal.open) modal.close();
  }
  modal.addEventListener("close", () => {
    player.pause();
    modalOpen = false;
    document.documentElement.classList.remove("reel-lock");
    if (returnFocus && typeof returnFocus.focus === "function") returnFocus.focus();
    syncHero();
  });
  // backdrop click (target === dialog itself only outside its children)
  modal.addEventListener("click", (e) => { if (e.target === modal) closeReel(); });
  modal.querySelector(".reel-modal__close").addEventListener("click", closeReel);

  // delegated: hero markup is re-rendered by sections.js, so bind on document
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-reel-open]");
    if (!trigger) return;
    e.preventDefault();
    openReel(parseFloat(trigger.dataset.reelAt || "0"));
  });
})();
