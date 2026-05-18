/* JIUM LABS — Tweaks panel (vanilla) */
(function () {
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "light",
    "accent": "indigo",
    "hero": "default"
  }/*EDITMODE-END*/;

  let state = { ...DEFAULTS };
  let panel = null;
  let active = false;

  function apply() {
    document.body.dataset.theme = state.theme;
    document.body.dataset.accent = state.accent;
    document.body.dataset.hero = state.hero;
    if (window.JIUM && typeof window.JIUM.renderHero === "function") {
      window.JIUM.renderHero(state.hero);
    }
  }

  function persist(key, val) {
    state[key] = val;
    apply();
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [key]: val } }, "*");
    if (panel) update();
  }

  function field(label, key, options) {
    const wrap = document.createElement("div");
    wrap.className = "tw__field";
    wrap.innerHTML = `<div class="tw__label">${label}</div>`;
    const row = document.createElement("div");
    row.className = "tw__row";
    options.forEach(opt => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tw__chip" + (state[key] === opt.value ? " is-on" : "");
      b.dataset.k = key; b.dataset.v = opt.value;
      if (opt.swatch) {
        b.innerHTML = `<span class="tw__sw" style="background:${opt.swatch}"></span>${opt.label}`;
      } else {
        b.textContent = opt.label;
      }
      b.addEventListener("click", () => persist(key, opt.value));
      row.appendChild(b);
    });
    wrap.appendChild(row);
    return wrap;
  }

  function update() {
    panel.querySelectorAll(".tw__chip").forEach(c => {
      c.classList.toggle("is-on", state[c.dataset.k] === c.dataset.v);
    });
  }

  function build() {
    panel = document.createElement("div");
    panel.className = "tw";
    panel.innerHTML = `
      <div class="tw__head">
        <div>
          <div class="tw__title">Tweaks</div>
          <div class="tw__sub">디자인 옵션을 실시간으로 조정합니다</div>
        </div>
        <button class="tw__close" aria-label="닫기">×</button>
      </div>
    `;
    panel.appendChild(field("테마", "theme", [
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
    ]));
    panel.appendChild(field("액센트", "accent", [
      { label: "Indigo",  value: "indigo",  swatch: "oklch(0.55 0.15 260)" },
      { label: "Emerald", value: "emerald", swatch: "oklch(0.58 0.13 158)" },
      { label: "Amber",   value: "amber",   swatch: "oklch(0.70 0.15 70)"  },
      { label: "Rose",    value: "rose",    swatch: "oklch(0.62 0.16 18)"  },
      { label: "Ink",     value: "ink",     swatch: "var(--fg)" },
    ]));
    panel.appendChild(field("Hero 베리언트", "hero", [
      { label: "Grid",    value: "default" },
      { label: "Marquee", value: "marquee" },
      { label: "Editor",  value: "editor"  },
    ]));
    panel.querySelector(".tw__close").addEventListener("click", () => {
      hide(); window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
    });
    document.body.appendChild(panel);
  }

  function show() { if (!panel) build(); panel.classList.add("is-on"); active = true; }
  function hide() { if (panel) panel.classList.remove("is-on"); active = false; }

  window.addEventListener("message", (e) => {
    if (!e.data || typeof e.data !== "object") return;
    if (e.data.type === "__activate_edit_mode") show();
    if (e.data.type === "__deactivate_edit_mode") hide();
  });
  window.parent.postMessage({ type: "__edit_mode_available" }, "*");

  apply();
  window.JIUM = window.JIUM || {};
  window.JIUM.state = state;
})();
