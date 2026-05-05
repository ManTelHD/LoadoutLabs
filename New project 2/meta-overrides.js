(function () {
  const SOURCES = {
    meta: "data/wzstats-meta.json",
    mw4: "data/mw4-watch.json",
    codWeapons: "data/cod-weapons.json",
  };

  const verifiedImages = {
    "ds20-mirage": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-DS20-MIRAGE.webp",
    "kogot-7": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-WM-KOGOT-7-PRESTIGE.webp",
    "mk78": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LMG-MK-78.webp",
    "vst": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S03-VST-MAIN.webp",
    "voyak-kt-3": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S02-VOYAK-KT-3.webp",
    "carbon-57": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-CARBON-57.webp",
    "mxr-17": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-MXR-17.webp",
    "dravec-45": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-DRAVEC-45.webp",
    "m15-mod-0": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-M15-MOD-0.webp",
    "mpc-25": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-MPC-25.webp",
    "vs-recon": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SR-VS-RECON.webp",
  };

  const state = { meta: null, mw4: null, codWeapons: null };

  function escapeHtml(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function slug(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/mk\./g, "mk").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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

  function getMetaList() {
    if (!state.meta) return null;
    return currentMode() === "bo7-ranked" ? state.meta.bo7Ranked : state.meta.warzoneRanked;
  }

  function codImageMap() {
    const map = new Map();
    for (const weapon of state.codWeapons?.weapons || []) {
      if (weapon.imageUrl) map.set(slug(weapon.name), weapon.imageUrl);
    }
    return map;
  }

  function weaponImage(item, imageMap) {
    return imageMap.get(slug(item.name)) || verifiedImages[item.id] || verifiedImages[slug(item.name)] || "";
  }

  function renderMetaSummary() {
    const summary = document.querySelector("#metaPatchSummary");
    const data = getMetaList();
    if (!summary || !data || activePanel() !== "weapons") return;
    const top = data.items.slice(0, 4).map((item) => `${item.name} (${item.tier})`).join(", ");
    const pickRateText = data.hasPickRates ? "Pick-Rates stammen direkt von WZStats." : "WZStats liefert aktuell keine Pick-Rate-Werte im oeffentlichen Datensatz; deshalb werden keine geratenen Pick-Rates angezeigt.";
    summary.innerHTML = `<span>WZStats Auto Update - ${escapeHtml(state.meta.generatedAtLabel)}</span><p><strong>${escapeHtml(data.title)}:</strong> ${escapeHtml(top)}. ${escapeHtml(pickRateText)}</p>`;
  }

  function renderRolePanel() {
    const panel = document.querySelector("#weaponComparePanel");
    const data = getMetaList();
    if (!panel || !data || activePanel() !== "weapons") return;
    panel.dataset.rolePicks = "true";
    panel.innerHTML = `<div class="weapon-compare-copy"><span>Quelle: WZStats</span><strong>${escapeHtml(data.title)}</strong><p>${escapeHtml(data.sourceNote)}</p></div><div class="weapon-compare-stats role-pick-stats">${data.items.slice(0, 4).map((item) => `<article><span>${escapeHtml(item.role || item.weaponClass || "Meta")}</span><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.tier)} - ${escapeHtml(item.rankLabel)}${item.pickRateLabel ? ` - ${escapeHtml(item.pickRateLabel)}` : ""}</p></article>`).join("")}</div>`;
  }

  function renderLoadoutCards() {
    const grid = document.querySelector("#loadoutGrid");
    const count = document.querySelector("#resultCount");
    const data = getMetaList();
    if (!grid || !data || activePanel() !== "weapons") return;
    const imageMap = codImageMap();
    const cards = data.items.slice(0, 12);
    if (count) count.textContent = `${cards.length} WZStats-Picks angezeigt`;
    grid.innerHTML = cards.map((item) => {
      const imageUrl = weaponImage(item, imageMap);
      const image = imageUrl ? `<div class="weapon-art"><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.closest('.weapon-art').remove()"></div>` : "";
      return `<article class="loadout-card ${item.tier === "META" ? "tier-absolute-meta" : "tier-meta"}" data-loadout-card="${escapeHtml(item.name)}"><div class="rank-badge">#${escapeHtml(item.position)}<span>${escapeHtml(item.tierLabel)}</span></div>${image}<div class="card-body"><div class="card-title-row"><div><span class="mode-pill">${escapeHtml(item.weaponClass)}</span><h3 class="weapon-name">${escapeHtml(item.name)}</h3></div></div><div class="stat-row"><span><strong>${escapeHtml(item.scoreLabel)}</strong> WZStats</span><span><strong>${escapeHtml(item.pickRateLabel || "n/a")}</strong> Pick-Rate</span><span><strong>${escapeHtml(item.role || "Meta")}</strong> Rolle</span><span><strong>${escapeHtml(item.sourceUpdatedLabel)}</strong> Stand</span></div><div class="tag-list"><span>WZStats</span><span>${escapeHtml(item.rankLabel)}</span><span>${escapeHtml(item.tierLabel)}</span></div><div class="details"><div><p class="role">${escapeHtml(item.description)}</p><ul>${item.attachments.map((attachment) => `<li>${escapeHtml(attachment)}</li>`).join("")}</ul></div></div></div></article>`;
    }).join("");
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
    if (cards) cards.innerHTML = state.mw4.cards.map((card) => `<article><span>${escapeHtml(card.label)}</span><strong>${escapeHtml(card.title)}</strong><p>${escapeHtml(card.text)}</p></article>`).join("");
    if (tips) tips.innerHTML = state.mw4.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
  }

  function renderAll() {
    renderMetaSummary();
    renderRolePanel();
    renderLoadoutCards();
    renderMw4Watch();
  }

  async function init() {
    const [meta, mw4, codWeapons] = await Promise.all([fetchJson(SOURCES.meta).catch(() => null), fetchJson(SOURCES.mw4).catch(() => null), fetchJson(SOURCES.codWeapons).catch(() => null)]);
    state.meta = meta;
    state.mw4 = mw4;
    state.codWeapons = codWeapons;
    renderAll();
    document.addEventListener("click", () => { requestAnimationFrame(renderAll); setTimeout(renderAll, 80); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
