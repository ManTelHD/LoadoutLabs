(function () {
  const DATA_URL = "data/wzstats-meta.json";
  const state = { meta: null };

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/mk\./g, "mk")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function activeModeKey() {
    const mode = document.querySelector(".secondary-mode-switch .mode-button.active")?.dataset.mode || "warzone-ranked";
    return mode === "bo7-ranked" ? "bo7Ranked" : "warzoneRanked";
  }

  function normalizePercent(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric <= 0) return null;
    const percent = numeric <= 1 ? numeric * 100 : numeric;
    return Math.max(0, Math.min(100, percent));
  }

  function formatPercent(percent, fallbackLabel) {
    if (fallbackLabel) return fallbackLabel;
    if (percent === null) return "k. A.";
    return `${percent < 10 ? percent.toFixed(1) : percent.toFixed(0)}%`;
  }

  function metaItemsByName() {
    const list = state.meta?.[activeModeKey()]?.items || [];
    return new Map(list.map((item) => [slug(item.name), item]));
  }

  function injectStyles() {
    if (document.querySelector("#pickrate-bar-style")) return;
    const style = document.createElement("style");
    style.id = "pickrate-bar-style";
    style.textContent = `
      body #loadoutGrid .pickrate-meter {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        grid-column: 1 / -1;
        align-items: center;
        gap: 0.52rem;
        width: min(22rem, 100%);
        margin-top: 0.58rem;
        padding: 0.48rem 0.6rem;
        border: 1px solid rgba(var(--card-tier-rgb, 216, 180, 87), 0.2);
        border-radius: 8px;
        background:
          linear-gradient(135deg, rgba(var(--card-tier-rgb, 216, 180, 87), 0.1), rgba(8, 13, 19, 0.72)),
          rgba(8, 13, 19, 0.64);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045);
      }

      body #loadoutGrid .pickrate-meter__label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.6rem;
        grid-column: 1 / -1;
        color: var(--muted);
        font-size: 0.68rem;
        font-weight: 950;
        line-height: 1;
        text-transform: uppercase;
      }

      body #loadoutGrid .pickrate-meter__value {
        color: var(--card-tier-text, #ffe7a3);
        font-size: 0.78rem;
      }

      body #loadoutGrid .pickrate-meter__track {
        position: relative;
        grid-column: 1 / -1;
        height: 0.48rem;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.08);
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.035);
      }

      body #loadoutGrid .pickrate-meter__fill {
        display: block;
        width: var(--pickrate-width, 0%);
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--card-tier-color, #d8b457), color-mix(in srgb, var(--card-tier-color, #d8b457) 72%, #ffffff));
        box-shadow: 0 0 1rem rgba(var(--card-tier-rgb, 216, 180, 87), 0.32);
        transition: width 420ms cubic-bezier(.18,.86,.22,1);
      }

      body #loadoutGrid .pickrate-meter.unavailable {
        opacity: 0.72;
      }

      body #loadoutGrid .pickrate-meter.unavailable .pickrate-meter__fill {
        width: 0% !important;
        box-shadow: none;
      }

      @media (max-width: 720px) {
        body #loadoutGrid .pickrate-meter {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderBars() {
    injectStyles();
    if (!state.meta) return;
    const items = metaItemsByName();

    document.querySelectorAll("#loadoutGrid .loadout-card").forEach((card) => {
      const name = card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent || "";
      const item = items.get(slug(name));
      const cardBody = card.querySelector(".card-body");
      const statRow = card.querySelector(".stat-row");
      if (!cardBody || !statRow || !item) return;

      const percent = normalizePercent(item.pickRate);
      const label = formatPercent(percent, item.pickRateLabel);
      const width = percent === null ? 0 : percent;
      const unavailable = percent === null;
      const existing = card.querySelector(".pickrate-meter");
      const html = `
        <div class="pickrate-meter${unavailable ? " unavailable" : ""}" style="--pickrate-width: ${width.toFixed(2)}%">
          <div class="pickrate-meter__label"><span>Pickrate</span><strong class="pickrate-meter__value">${escapeHtml(label)}</strong></div>
          <div class="pickrate-meter__track" aria-hidden="true"><span class="pickrate-meter__fill"></span></div>
        </div>`;

      if (existing) existing.outerHTML = html;
      else statRow.insertAdjacentHTML("afterend", html);
    });
  }

  async function loadMeta() {
    try {
      const response = await fetch(`${DATA_URL}?v=${Date.now()}`, { cache: "no-store" });
      if (response.ok) state.meta = await response.json();
    } catch {
      state.meta = null;
    }
    renderBars();
  }

  function bind() {
    document.addEventListener("click", () => setTimeout(renderBars, 80));
    document.querySelector("#weaponSearch")?.addEventListener("input", () => requestAnimationFrame(renderBars));
    document.querySelector("#sortSelect")?.addEventListener("change", () => requestAnimationFrame(renderBars));
    new MutationObserver(() => requestAnimationFrame(renderBars)).observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    injectStyles();
    bind();
    loadMeta();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
