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

  function estimatePercent(item, list) {
    const tier = String(item.tier || item.tierLabel || "").toUpperCase();
    const tierItems = list.filter((entry) => String(entry.tier || entry.tierLabel || "").toUpperCase() === tier);
    const tierIndex = Math.max(0, tierItems.findIndex((entry) => slug(entry.name) === slug(item.name)));
    const denominator = Math.max(1, tierItems.length - 1);
    const tierProgress = tierIndex / denominator;
    const ranges = {
      META: [8.4, 4.2],
      A: [3.8, 1.9],
      B: [1.8, 0.9],
      C: [0.9, 0.45],
      D: [0.45, 0.18],
    };
    const [max, min] = ranges[tier] || [0.7, 0.25];
    const estimate = max - (max - min) * tierProgress;
    return Math.max(0.1, Math.min(12, estimate));
  }

  function formatPercent(percent, estimated) {
    const value = percent < 10 ? percent.toFixed(1) : percent.toFixed(0);
    return estimated ? `~${value}%` : `${value}%`;
  }

  function metaList() {
    return state.meta?.[activeModeKey()]?.items || [];
  }

  function metaItemsByName() {
    return new Map(metaList().map((item) => [slug(item.name), item]));
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

      body #loadoutGrid .pickrate-meter__hint {
        margin-left: 0.3rem;
        color: rgba(168, 176, 189, 0.78);
        font-size: 0.58rem;
        font-weight: 900;
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

      body #loadoutGrid .pickrate-meter.estimated .pickrate-meter__fill {
        opacity: 0.86;
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
    const list = metaList();
    const items = metaItemsByName();

    document.querySelectorAll("#loadoutGrid .loadout-card").forEach((card) => {
      const name = card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent || "";
      const item = items.get(slug(name));
      const cardBody = card.querySelector(".card-body");
      const statRow = card.querySelector(".stat-row");
      if (!cardBody || !statRow || !item) return;

      const publicPercent = normalizePercent(item.pickRate);
      const estimated = publicPercent === null;
      const percent = publicPercent ?? estimatePercent(item, list);
      const label = item.pickRateLabel && !estimated ? item.pickRateLabel : formatPercent(percent, estimated);
      const existing = card.querySelector(".pickrate-meter");
      const html = `
        <div class="pickrate-meter${estimated ? " estimated" : ""}" style="--pickrate-width: ${percent.toFixed(2)}%">
          <div class="pickrate-meter__label"><span>Pickrate${estimated ? " <small class=\"pickrate-meter__hint\">geschätzt</small>" : ""}</span><strong class="pickrate-meter__value">${escapeHtml(label)}</strong></div>
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
