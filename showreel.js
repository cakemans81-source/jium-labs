/* JIUM LABS — showreel: muted in-view loop + full-screen modal player */
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

  /* ---------- inline muted loop (only while on screen) ---------- */
  const frame = document.querySelector(".reel__frame");
  const inline = frame && frame.querySelector(".reel__video");
  let inView = false;
  let modalOpen = false;

  function syncInline() {
    if (!inline) return;
    const shouldPlay = inView && !modalOpen && !reduceMotion.matches && !saveData && !document.hidden;
    if (shouldPlay) {
      setSources(inline, pickSize(inline.clientWidth));
      const p = inline.play();
      if (p) p.then(() => frame.classList.add("is-playing")).catch(() => frame.classList.remove("is-playing"));
    } else if (!inline.paused) {
      inline.pause();
    }
  }
  if (inline) {
    inline.muted = true;
    inline.defaultMuted = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        syncInline();
      }, { threshold: 0.35 }).observe(frame);
    }
    document.addEventListener("visibilitychange", syncInline);
    reduceMotion.addEventListener && reduceMotion.addEventListener("change", () => {
      if (reduceMotion.matches) { inline.pause(); frame.classList.remove("is-playing"); }
      syncInline();
    });
  }

  /* ---------- modal ---------- */
  const modal = document.getElementById("reel-modal");
  if (!modal || typeof modal.showModal !== "function") return;
  const player = modal.querySelector(".reel-modal__video");
  let returnFocus = null;

  function openReel(startAt) {
    returnFocus = document.activeElement;
    modalOpen = true;
    syncInline();
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
    syncInline();
  });
  // backdrop click (the dialog box itself is transparent padding-free, so target === modal means backdrop)
  modal.addEventListener("click", (e) => { if (e.target === modal) closeReel(); });
  modal.querySelector(".reel-modal__close").addEventListener("click", closeReel);

  // delegated: hero buttons are re-rendered by sections.js, so bind on document
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-reel-open]");
    if (!trigger) return;
    e.preventDefault();
    openReel(parseFloat(trigger.dataset.reelAt || "0"));
  });
})();
