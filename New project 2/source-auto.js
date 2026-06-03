(function () {
  const SOURCES = {
    meta: "data/wzstats-meta.json",
    mw4: "data/mw4-watch.json",
    season: "data/season-watch.json",
  };
  const refreshIntervalMs = 60 * 1000;

  const state = {
    meta: null,
    mw4: null,
    season: null,
  };
  let refreshInFlight = false;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function renderSeasonCategories(categories) {
    return (categories || []).map((category) => `
      <article>
        <span>${escapeHtml(category.title || "Season 4")}</span>
        <h3>${escapeHtml(category.title || "Season 4")}</h3>
        <p>${escapeHtml(category.summary || "")}</p>
        ${(category.bullets || []).length ? `
          <ul>
            ${category.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
          </ul>
        ` : ""}
      </article>
    `).join("");
  }

  async function fetchJson(url) {
    const response = await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    return response.json();
  }

  function currentMode() {
    return document.querySelector(".secondary-mode-switch .mode-button.active")?.dataset.mode || "warzone-ranked";
  }

  function activePanel() {
    return document.querySelector(".tab-panel.active")?.dataset.panel || "weapons";
  }

  function updatePrimaryTabs() {
    const switcher = document.querySelector(".primary-mode-switch");
    const mw4Button = switcher?.querySelector(".mw4-mode-button");
    if (!switcher || !mw4Button) return;

    mw4Button.textContent = "MW4";

    if (!switcher.querySelector(".season-mode-button")) {
      const seasonButton = document.createElement("button");
      seasonButton.className = "mode-button season-mode-button";
      seasonButton.dataset.mode = "season-4-info";
      seasonButton.type = "button";
      seasonButton.textContent = "Season 4";
      switcher.append(seasonButton);
    }
  }

  function showSeasonFour() {
    const switcher = document.querySelector(".primary-mode-switch");
    switcher?.querySelectorAll(".mode-button").forEach((button) => {
      button.classList.toggle("active", button.classList.contains("season-mode-button"));
    });

    const contentTabs = document.querySelector("#contentTabs");
    if (contentTabs) contentTabs.hidden = true;

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      const isSeasonPanel = panel.dataset.panel === "mode-info";
      panel.hidden = !isSeasonPanel;
      panel.classList.toggle("active", isSeasonPanel);
    });

    setText("#tierTitle", "Season 4");
    setText("#tierDescription", "Sammelpunkt fuer Season-4-News, Patchnotes, Roadmap-Inhalte und Live-Updates.");
    setText("#modeInfoTitle", "Season 4");
    setText("#modeInfoDescription", "Sammelpunkt fuer Season-4-News, Patchnotes, Roadmap-Inhalte und Live-Updates.");
    setText("#modeInfoKicker", "Season 4");
    setText("#modeInfoUpdateTime", "Season-4-Uebersicht");
    setText("#modeInfoUpdateSummary", "Offizielle Roadmap, deutsche Startzeit sowie Warzone-, Multiplayer-, Zombies- und Endgame-Inhalte werden hier gesammelt.");

    const modeInfoTabs = document.querySelector("#modeInfoTabs");
    if (modeInfoTabs) {
      modeInfoTabs.hidden = true;
      modeInfoTabs.style.display = "none";
    }
  }

  function getMetaList() {
    if (!state.meta) return null;
    return currentMode() === "bo7-ranked" ? state.meta.bo7Ranked : state.meta.warzoneRanked;
  }

  function renderMetaSummary() {
    const summary = document.querySelector("#metaPatchSummary");
    const data = getMetaList();
    if (!summary || !data || activePanel() !== "weapons") return;

    const top = data.items.slice(0, 4).map((item) => `${item.name} (${item.tier})`).join(", ");
    const pickRateText = data.hasPickRates
      ? "Pick-Rates stammen direkt von WZStats."
      : "WZStats liefert aktuell keine Pick-Rate-Werte im oeffentlichen Datensatz; deshalb werden keine geratenen Pick-Rates angezeigt.";

    summary.innerHTML = `
      <span>WZStats Auto Update · ${escapeHtml(state.meta.generatedAtLabel)}</span>
      <p><strong>${escapeHtml(data.title)}:</strong> ${escapeHtml(top)}. ${escapeHtml(pickRateText)}</p>
    `;
  }

  function renderRolePanel() {
    const panel = document.querySelector("#weaponComparePanel");
    const data = getMetaList();
    if (!panel || !data || activePanel() !== "weapons") return;

    panel.dataset.rolePicks = "true";
    panel.innerHTML = `
      <div class="weapon-compare-copy">
        <span>Quelle: WZStats</span>
        <strong>${escapeHtml(data.title)}</strong>
        <p>${escapeHtml(data.sourceNote)}</p>
      </div>
      <div class="weapon-compare-stats role-pick-stats">
        ${data.items.slice(0, 4).map((item) => `
          <article>
            <span>${escapeHtml(item.role || item.weaponClass || "Meta")}</span>
            <strong>${escapeHtml(item.name)}</strong>
            <p>${escapeHtml(item.tier)} · ${escapeHtml(item.rankLabel)}${item.pickRateLabel ? ` · ${escapeHtml(item.pickRateLabel)}` : ""}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderLoadoutCards() {
    const grid = document.querySelector("#loadoutGrid");
    const count = document.querySelector("#resultCount");
    const data = getMetaList();
    if (!grid || !data || activePanel() !== "weapons") return;

    const cards = data.items.slice(0, 12);
    if (count) count.textContent = `${cards.length} WZStats-Picks angezeigt`;
    grid.innerHTML = cards.map((item) => `
      <article class="loadout-card ${item.tier === "META" ? "tier-absolute-meta" : "tier-meta"}" data-loadout-card="${escapeHtml(item.name)}">
        <div class="rank-badge">#${escapeHtml(item.position)}<span>${escapeHtml(item.tierLabel)}</span></div>
        <div class="weapon-art">
          <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" loading="lazy">
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <div>
              <span class="mode-pill">${escapeHtml(item.weaponClass)}</span>
              <h3 class="weapon-name">${escapeHtml(item.name)}</h3>
            </div>
          </div>
          <div class="stat-row">
            <span class="score-stat"><strong>${escapeHtml(item.scoreLabel)}</strong> Meta Score</span>
            <span><strong>${escapeHtml(item.pickRateLabel || "n/a")}</strong> Pick-Rate</span>
            <span><strong>${escapeHtml(item.role || "Meta")}</strong> Rolle</span>
            <span><strong>${escapeHtml(item.sourceUpdatedLabel)}</strong> Stand</span>
          </div>
          <div class="tag-list">
            <span>WZStats</span>
            <span>${escapeHtml(item.rankLabel)}</span>
            <span>${escapeHtml(item.tierLabel)}</span>
          </div>
          <div class="details">
            <div>
              <p class="role">${escapeHtml(item.description)}</p>
              <ul>
                ${item.attachments.map((attachment) => `<li>${escapeHtml(attachment)}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>
      </article>
    `).join("");
  }

  function renderMw4Watch() {
    if (!state.mw4) return;
    const infoTitle = document.querySelector("#modeInfoTitle");
    const infoDescription = document.querySelector("#modeInfoDescription");
    const infoKicker = document.querySelector("#modeInfoKicker");
    const updateTime = document.querySelector("#modeInfoUpdateTime");
    const updateSummary = document.querySelector("#modeInfoUpdateSummary");
    const cards = document.querySelector("#modeInfoCards");
    const tips = document.querySelector("#modeInfoTips");

    const isMw4 = document.querySelector(".mw4-mode-button.active") || infoTitle?.textContent?.toLowerCase().includes("mw4");
    if (!isMw4) return;

    if (infoTitle) infoTitle.textContent = "MW4 Infos & Geruechte";
    if (infoDescription) infoDescription.textContent = "Automatisch beobachtet: offizielle Call-of-Duty-/Infinity-Ward-Posts und aktuelle Tridzo-YouTube-Transkripte. Offizielles und Geruecht bleiben getrennt.";
    if (infoKicker) infoKicker.textContent = "COD 2026 Watch";
    if (updateTime) updateTime.textContent = state.mw4.generatedAtLabel;
    if (updateSummary) updateSummary.textContent = state.mw4.officialSummary;

    if (cards) {
      cards.innerHTML = state.mw4.cards.map((card) => `
        <article>
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.title)}</strong>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `).join("");
    }

    if (tips) {
      tips.innerHTML = state.mw4.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
    }
  }

  function renderSeasonWatch() {
    if (!state.season) return;

    const infoTitle = document.querySelector("#modeInfoTitle");
    const infoDescription = document.querySelector("#modeInfoDescription");
    const infoKicker = document.querySelector("#modeInfoKicker");
    const updateTime = document.querySelector("#modeInfoUpdateTime");
    const updateSummary = document.querySelector("#modeInfoUpdateSummary");
    const stats = document.querySelector("#modeInfoStats");
    const cards = document.querySelector("#modeInfoCards");
    const tips = document.querySelector("#modeInfoTips");
    const gallery = document.querySelector("#modeInfoGallery");
    const image = document.querySelector("#modeInfoImage");

    const isSeason = document.querySelector(".season-mode-button.active") || infoTitle?.textContent?.toLowerCase().includes("season 4");
    if (!isSeason) return;

    const featured = state.season.featuredPost || {};

    setText("#tierTitle", "Season 4");
    setText("#tierDescription", "Offizielle Season-4-News, deutsche Startzeit und getrennte Inhalte fuer Warzone, Multiplayer, Zombies und Endgame.");
    if (infoTitle) infoTitle.textContent = "Season 4";
    if (infoDescription) infoDescription.textContent = "Automatisch beobachtet: offizieller Call-of-Duty-Blog und der offizielle X-Kanal CODLiveSeasons fuer Season-, Event- und Live-Updates.";
    if (infoKicker) infoKicker.textContent = "Season 4 Live";
    if (updateTime) updateTime.textContent = state.season.generatedAtLabel;
    if (updateSummary) updateSummary.textContent = state.season.officialSummary || "Offizielle Season-4-Infos wurden aktualisiert.";

    if (stats) {
      stats.innerHTML = (state.season.stats || []).map(([label, value]) => `
        <div>
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `).join("");
    }

    if (cards) {
      const categoryMarkup = renderSeasonCategories(state.season.categories);
      cards.innerHTML = categoryMarkup || (state.season.cards || []).map((card) => `
        <article>
          <span>${escapeHtml(card.label || "Offiziell")}</span>
          <h3>${escapeHtml(card.title || "Season 4")}</h3>
          <p>${escapeHtml(card.text || "")}</p>
        </article>
      `).join("");
    }

    if (tips) {
      tips.innerHTML = (state.season.tips || []).map((tip, index) => `<li><span>${index + 1}</span>${escapeHtml(tip)}</li>`).join("");
    }

    if (gallery) {
      const galleryItems = (state.season.gallery || []).length
        ? state.season.gallery
        : [[featured.title || "Season 4", featured.imageUrl || "assets/cod-loadout-hero.png"]];
      gallery.innerHTML = galleryItems.map(([label, src]) => `
        <figure>
          <img src="${escapeHtml(src)}" alt="${escapeHtml(label)}" loading="lazy">
          <figcaption>${escapeHtml(label)}</figcaption>
        </figure>
      `).join("");
    }

    if (image && featured.imageUrl) {
      image.src = featured.imageUrl;
      image.alt = featured.title || "Season 4";
    }
  }

  function renderAll() {
    updatePrimaryTabs();
    renderMetaSummary();
    renderRolePanel();
    renderLoadoutCards();
    renderMw4Watch();
    renderSeasonWatch();
  }

  async function refreshSourceData() {
    if (refreshInFlight) return;
    refreshInFlight = true;

    try {
      const [meta, mw4, season] = await Promise.all([
        fetchJson(SOURCES.meta).catch(() => null),
        fetchJson(SOURCES.mw4).catch(() => null),
        fetchJson(SOURCES.season).catch(() => null),
      ]);

      if (meta) state.meta = meta;
      if (mw4) state.mw4 = mw4;
      if (season) state.season = season;
      updatePrimaryTabs();
      renderAll();
    } catch (error) {
      console.warn("Source data could not be refreshed.", error);
    } finally {
      refreshInFlight = false;
    }
  }

  function refreshWhenVisible() {
    if (document.visibilityState !== "hidden") refreshSourceData();
  }

  async function init() {
    await refreshSourceData();

    document.addEventListener("click", () => {
      requestAnimationFrame(renderAll);
      setTimeout(renderAll, 80);
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".season-mode-button")) return;
      showSeasonFour();
      requestAnimationFrame(renderSeasonWatch);
      window.setTimeout(renderSeasonWatch, 80);
    });

    window.setInterval(refreshWhenVisible, refreshIntervalMs);
    window.addEventListener("focus", refreshSourceData);
    document.addEventListener("visibilitychange", refreshWhenVisible);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
