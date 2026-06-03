(function () {
  const STYLE_ID = "season4-live-20260603-style";
  const DATA_URL = "data/season-watch.json";
  let seasonData = null;

  function html(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;");
  }

  async function fetchSeasonData() {
    try {
      const response = await fetch(`${DATA_URL}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return null;
      seasonData = await response.json();
      return seasonData;
    } catch {
      return null;
    }
  }

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }

    style.textContent = `
      body .season4-watch-panel {
        --season-green: #b9ff3d;
        --season-green-rgb: 185, 255, 61;
      }

      body .season4-watch-panel .mode-info-main {
        width: 100% !important;
        max-width: none !important;
        border-color: rgba(var(--season-green-rgb), 0.28) !important;
        background:
          radial-gradient(circle at 16% 0%, rgba(var(--season-green-rgb), 0.12), transparent 22rem),
          linear-gradient(145deg, rgba(12, 18, 21, 0.96), rgba(6, 9, 12, 0.98)) !important;
      }

      body .season4-watch-panel #modeInfoTabs {
        display: none !important;
      }

      body .season4-watch-panel #modeInfoImage {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        object-fit: cover !important;
        object-position: center !important;
        border-bottom: 1px solid rgba(var(--season-green-rgb), 0.24) !important;
      }

      body .season4-watch-panel #modeInfoStats {
        display: grid !important;
        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        gap: 0.7rem !important;
        margin-bottom: 0.95rem !important;
      }

      body .season4-watch-panel #modeInfoStats > div {
        border: 1px solid rgba(var(--season-green-rgb), 0.24) !important;
        border-radius: 8px !important;
        padding: 0.75rem 0.82rem !important;
        background: linear-gradient(145deg, rgba(var(--season-green-rgb), 0.11), rgba(9, 13, 16, 0.92)) !important;
      }

      body .season4-watch-panel #modeInfoStats span {
        display: block !important;
        color: rgba(240, 247, 228, 0.74) !important;
        font-size: 0.72rem !important;
        font-weight: 900 !important;
        text-transform: uppercase !important;
      }

      body .season4-watch-panel #modeInfoStats strong {
        color: #e5ff9f !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: 1.1rem !important;
        line-height: 1 !important;
      }

      body .season4-watch-panel #modeInfoCards {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 0.8rem !important;
      }

      body .season4-watch-panel #modeInfoCards article {
        border: 1px solid rgba(var(--season-green-rgb), 0.2) !important;
        border-radius: 8px !important;
        padding: 0.85rem 0.9rem !important;
        background: rgba(8, 12, 15, 0.72) !important;
      }

      body .season4-watch-panel #modeInfoCards span {
        color: var(--season-green) !important;
        font-size: 0.72rem !important;
        font-weight: 950 !important;
        text-transform: uppercase !important;
      }

      body .season4-watch-panel #modeInfoCards h3 {
        margin: 0.22rem 0 0.4rem !important;
        color: #f6ffe2 !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: 1.2rem !important;
        line-height: 1 !important;
      }

      body .season4-watch-panel #modeInfoCards p {
        margin: 0 !important;
        color: rgba(234, 240, 228, 0.88) !important;
        line-height: 1.58 !important;
      }

      body .season4-watch-panel #modeInfoGallery {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 0.8rem !important;
      }

      body .season4-watch-panel #modeInfoGallery figure {
        margin: 0 !important;
        overflow: hidden !important;
        border: 1px solid rgba(var(--season-green-rgb), 0.18) !important;
        border-radius: 8px !important;
        background: rgba(5, 8, 11, 0.82) !important;
      }

      body .season4-watch-panel #modeInfoGallery img {
        display: block !important;
        width: 100% !important;
        aspect-ratio: 16 / 9 !important;
        object-fit: cover !important;
      }

      body .season4-watch-panel #modeInfoGallery figcaption {
        padding: 0.62rem 0.74rem !important;
        color: #f3f8ea !important;
        font-size: 0.88rem !important;
        font-weight: 800 !important;
      }

      @media (max-width: 900px) {
        body .season4-watch-panel #modeInfoStats,
        body .season4-watch-panel #modeInfoCards,
        body .season4-watch-panel #modeInfoGallery {
          grid-template-columns: 1fr !important;
        }
      }
    `;
  }

  function getSeason4Button() {
    return Array.from(document.querySelectorAll(".primary-mode-switch .mode-button, .primary-mode-switch button"))
      .find((button) => {
        const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        const mode = String(button.dataset.mode || "").toLowerCase();
        return mode === "season4-info" || mode === "season-4-info" || label.includes("season 4");
      }) || null;
  }

  function prepareSeason4Button() {
    const button = getSeason4Button();
    if (!button) return null;
    button.classList.add("mode-button", "season4-mode-button", "season-mode-button");
    button.dataset.mode = "season4-info";
    button.type = "button";
    return button;
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function renderSeason4() {
    const data = seasonData;
    if (!data) return;

    const featured = data.featuredPost || {};
    const panel = document.querySelector('[data-panel="mode-info"]');
    if (panel) {
      panel.classList.add("season4-watch-panel");
      panel.classList.remove("mw4-watch-panel");
    }

    setText("#tierTitle", "Season 4");
    setText("#tierDescription", "Offizielle Season-4-News, Live-Seasons, Events und Start-Hinweise aus Call-of-Duty-Quellen.");
    setText("#modeInfoTitle", "Season 4");
    setText("#modeInfoDescription", "Automatisch beobachtet: offizieller Call-of-Duty-Blog plus der offizielle X-Kanal CODLiveSeasons fuer Season-, Event- und Live-Updates.");
    setText("#modeInfoKicker", "Season 4 Live");
    setText("#modeInfoUpdateTime", data.generatedAtLabel || "Season 4 Watch");
    setText("#modeInfoUpdateSummary", data.officialSummary || "Offizielle Season-4-Infos wurden aktualisiert.");

    const modeInfoTabs = document.querySelector("#modeInfoTabs");
    if (modeInfoTabs) {
      modeInfoTabs.hidden = true;
      modeInfoTabs.style.display = "none";
    }

    const stats = document.querySelector("#modeInfoStats");
    if (stats) {
      stats.innerHTML = (data.stats || []).map(([label, value]) => `
        <div>
          <span>${html(label)}</span>
          <strong>${html(value)}</strong>
        </div>
      `).join("");
    }

    const cards = document.querySelector("#modeInfoCards");
    if (cards) {
      cards.innerHTML = (data.cards || []).map((card) => `
        <article>
          <span>${html(card.label || "Offiziell")}</span>
          <h3>${html(card.title || "Season 4")}</h3>
          <p>${html(card.text || "")}</p>
        </article>
      `).join("");
      cards.hidden = false;
      cards.style.display = "grid";
    }

    const tips = document.querySelector("#modeInfoTips");
    if (tips) {
      tips.innerHTML = (data.tips || []).map((tip, index) => `<li><span>${index + 1}</span>${html(tip)}</li>`).join("");
    }

    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      const items = (data.gallery || []).length ? data.gallery : [[featured.title || "Season 4", featured.imageUrl || "assets/cod-loadout-hero.png"]];
      gallery.innerHTML = items.map(([label, src]) => `
        <figure>
          <img src="${html(src)}" alt="${html(label)}" loading="lazy">
          <figcaption>${html(label)}</figcaption>
        </figure>
      `).join("");
      gallery.hidden = false;
      gallery.style.display = "grid";
    }

    const image = document.querySelector("#modeInfoImage");
    if (image) {
      image.src = featured.imageUrl || "assets/cod-loadout-hero.png";
      image.alt = featured.title || "Season 4";
      image.loading = "eager";
      image.decoding = "async";
    }
  }

  function activateSeason4(button = prepareSeason4Button()) {
    if (!button) return;
    installStyle();

    document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".secondary-mode-switch .mode-button").forEach((item) => item.classList.remove("active"));

    const contentTabs = document.querySelector("#contentTabs");
    if (contentTabs) contentTabs.hidden = true;

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      const active = panel.dataset.panel === "mode-info";
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });

    renderSeason4();
    window.dispatchEvent(new CustomEvent("loadoutlab:lite-render", { detail: { panel: "season4" } }));
  }

  document.addEventListener("click", async (event) => {
    const button = event.target.closest(".season4-mode-button, .season-mode-button, [data-mode='season4-info'], [data-mode='season-4-info']");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    if (!seasonData) await fetchSeasonData();
    activateSeason4(button);
  }, true);

  async function init() {
    installStyle();
    prepareSeason4Button();
    await fetchSeasonData();
    if (getSeason4Button()?.classList.contains("active")) activateSeason4();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(prepareSeason4Button, 300);
}());
