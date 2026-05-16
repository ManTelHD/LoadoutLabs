(function () {
  const SOURCES = {
    meta: "data/wzstats-meta.json",
    mw4: "data/mw4-watch.json",
    codWeapons: "data/cod-weapons.json",
  };

  const verifiedImages = {
    "ds20-mirage": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-DS20-MIRAGE.webp",
    "kogot-7": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/COD-BO7-SMG-KOGOT-7.webp",
    mk78: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LMG-MK-78.webp",
    vst: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S03-VST-MAIN.webp",
    "carbon-57": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-CARBON-57.webp",
    "mxr-17": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-MXR-17.webp",
    "dravec-45": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-DRAVEC-45.webp",
    "m15-mod-0": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-M15-MOD-0.webp",
    "mpc-25": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-MPC-25.webp",
  };

  const verifiedBuilds = {
    "kogot-7": {
      role: "Warzone-Meta-SMG mit sehr starker Mobility und schneller TTK.",
      buildCode: "",
      secondary: "DS20 Mirage",
      attachments: ["Muzzle: Hawker Series 45", "Barrel: 8.5\" Targil Hock-XR Barrel", "Underbarrel: EAM Steady-90 Grip", "Magazine: Vex Expanse Mag", "Fire Mods: Buffer Spring"],
      perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
    },
    mk78: {
      role: "WZStats #1 Langstrecke: sehr stabiles LMG mit starkem Damage-Profil und sauberem Recoil fuer Ranked-Resurgence.",
      buildCode: "",
      secondary: "Kogot-7",
      attachments: ["Optic: Greaves AccuSpot 3x", "Barrel: 22\" Impulse HB-762 Barrel", "Underbarrel: Bowen Sentry Foregrip", "Rear Grip: Fleet-G2 Grip", "Fire Mods: Accelerated Recoil System"],
      perks: ["Scavenger", "Quick Fix", "Survivor"],
    },
    "ds20-mirage": {
      role: "Gebuffte Long-Range-AR mit staerkerem Mid-/Minimum-Damage, besserem Headshot-Wert und mehr Bullet Velocity in BR/Resurgence.",
      buildCode: "",
      secondary: "Kogot-7",
      attachments: ["Optic: EAM XL Reflex", "Muzzle: Monolithic Suppressor", "Barrel: 17.1\" Abdicator Barrel", "Magazine: Griffon Reserve Extended II", "Rear Grip: A1-C Control Grip"],
      perks: ["Scavenger", "Quick Fix", "Survivor"],
    },
  };

  const state = { meta: null, mw4: null, codWeapons: null };
  const html = (value) => String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const slug = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/mk\./g, "mk").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const fetchJson = async (url) => {
    const response = await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" });
    return response.ok ? response.json() : null;
  };

  function activePanel() {
    return document.querySelector(".tab-panel.active")?.dataset.panel || "weapons";
  }

  function currentMode() {
    return document.querySelector(".secondary-mode-switch .mode-button.active")?.dataset.mode || "warzone-ranked";
  }

  function getMetaList() {
    if (!state.meta) return null;
    return currentMode() === "bo7-ranked" ? state.meta.bo7Ranked : state.meta.warzoneRanked;
  }

  function imageMap() {
    const map = new Map();
    for (const weapon of state.codWeapons?.weapons || []) {
      if (weapon.imageUrl) map.set(slug(weapon.name), weapon.imageUrl);
    }
    return map;
  }

  function weaponImage(item, map) {
    return verifiedImages[item.id] || verifiedImages[slug(item.name)] || map.get(slug(item.name)) || "";
  }

  function staticLoadout(item) {
    const key = item.id || slug(item.name);
    if (verifiedBuilds[key]) return verifiedBuilds[key];
    if (!Array.isArray(window.loadouts)) return null;
    return window.loadouts.find((loadout) => slug(loadout.name) === slug(item.name)) || null;
  }

  function tierHeading(item, groupSize) {
    const title = item.tier === "META" ? "Absolute Meta" : `${item.tierLabel || `${item.tier}-Tier`} Waffen`;
    const metaClass = item.tier === "META" ? " tier-heading-meta" : "";
    return `<div class="meta-tier-heading${metaClass}" data-tier="${html(item.tier)}"><span>${html(title)}</span><small>${groupSize} Waffen</small></div>`;
  }

  function renderMetaSummary() {
    const summary = document.querySelector("#metaPatchSummary");
    const data = getMetaList();
    if (!summary || !data || activePanel() !== "weapons") return;
    const top = data.items.slice(0, 4).map((item) => `${item.name} (${item.tier})`).join(", ");
    summary.innerHTML = `<span>WZStats Auto Update - ${html(state.meta.generatedAtLabel)}</span><p><strong>${html(data.title)}:</strong> ${html(top)}.</p>`;
  }

  function renderRolePanel() {
    const panel = document.querySelector("#weaponComparePanel");
    const data = getMetaList();
    if (!panel || !data || activePanel() !== "weapons") return;
    panel.dataset.rolePicks = "true";
    panel.innerHTML = `
      <div class="weapon-compare-copy"><span>Quelle: WZStats</span><strong>${html(data.title)}</strong><p>${html(data.sourceNote)}</p></div>
      <div class="weapon-compare-stats role-pick-stats">
        ${data.items.slice(0, 4).map((item) => `<article><span>${html(item.role || item.weaponClass || "Meta")}</span><strong>${html(item.name)}</strong><p>${html(item.tier)} - ${html(item.rankLabel)}</p></article>`).join("")}
      </div>`;
  }

  function renderLoadoutCards() {
    const grid = document.querySelector("#loadoutGrid");
    const count = document.querySelector("#resultCount");
    const data = getMetaList();
    if (!grid || !data || activePanel() !== "weapons") return;

    const map = imageMap();
    const cards = data.items;
    const expandedCards = new Set([...grid.querySelectorAll(".loadout-card.expanded")].map((card) => card.dataset.loadoutCard));
    if (count) count.textContent = `${cards.length} Meta-Waffen angezeigt`;
    const groupSizes = cards.reduce((sizes, item) => sizes.set(item.tier, (sizes.get(item.tier) || 0) + 1), new Map());
    let lastTier = "";
    grid.innerHTML = cards.map((item) => {
      const loadout = staticLoadout(item);
      const attachments = loadout?.attachments?.length ? loadout.attachments : item.attachments || [];
      const perks = loadout?.perks || [];
      const role = loadout?.role || item.description || "";
      const secondary = loadout?.secondary || "";
      const buildCode = loadout?.buildCode || "";
      const imageUrl = weaponImage(item, map);
      const image = imageUrl ? `<div class="weapon-art"><img src="${html(imageUrl)}" alt="${html(item.name)}" loading="lazy" onerror="this.closest('.weapon-art').remove()"></div>` : "";
      const statItems = [
        `<span><strong>${html(item.scoreLabel)}</strong> Score</span>`,
        item.pickRateLabel ? `<span><strong>${html(item.pickRateLabel)}</strong> Pick-Rate</span>` : "",
        `<span><strong>${html(item.role || "Meta")}</strong> Rolle</span>`,
        `<span><strong>${html(item.sourceUpdatedLabel)}</strong> Stand</span>`,
      ].filter(Boolean).join("");
      const isExpanded = expandedCards.has(item.name);
      const heading = item.tier !== lastTier ? tierHeading(item, groupSizes.get(item.tier) || 0) : "";
      lastTier = item.tier;
      return `
        ${heading}
        <article class="loadout-card ${item.tier === "META" ? "tier-absolute-meta" : "tier-meta"}${isExpanded ? " expanded" : ""}" data-loadout-card="${html(item.name)}">
          <div class="rank-badge">#${html(item.position)}<span>${html(item.tierLabel)}</span></div>
          ${image}
          <div class="card-body">
            <div class="card-title-row"><div><span class="mode-pill">${html(item.weaponClass)}</span><h3 class="weapon-name">${html(item.name)}</h3></div></div>
            <div class="stat-row">${statItems}</div>
            <div class="tag-list"><span>${html(item.rankLabel)}</span><span>${html(item.tierLabel)}</span></div>
            <div class="card-details">
              <p class="role">${html(role)}</p>
              <div class="attachment-columns">
                <ul class="attachment-list">${attachments.length ? attachments.map((attachment) => `<li>${html(attachment)}</li>`).join("") : "<li>Keine verifizierten Aufsaetze fuer diese Waffe hinterlegt.</li>"}</ul>
                <ul class="perk-list">${/^wzstats/i.test(buildCode) ? "" : `<li>Code: ${html(buildCode)}</li>`}${secondary ? `<li>Pair: ${html(secondary)}</li>` : ""}${perks.map((perk, index) => `<li>Extra ${index + 1}: ${html(perk)}</li>`).join("")}</ul>
              </div>
            </div>
          </div>
          <footer class="card-footer"><span class="range">${html(item.role || item.weaponClass)}</span><button class="expand-button" type="button" aria-expanded="${isExpanded ? "true" : "false"}" aria-label="${html(item.name)} Aufsaetze ${isExpanded ? "ausblenden" : "anzeigen"}"><span>Details</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6 1.4-1.4Z"></path></svg></button></footer>
        </article>`;
    }).join("");
  }

  function fixImages(root = document) {
    root.querySelectorAll?.('.camo-swatch img[src*="img.game8.co"]').forEach((image) => {
      image.closest(".camo-swatch")?.classList.remove("has-image");
      image.remove();
    });
    root.querySelectorAll?.('img[alt="Kogot-7"], img[src*="BO7-WM-KOGOT-7"], img[src*="COD-BO7-SMG-KOGOT-7"]').forEach((image) => {
      image.src = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/COD-BO7-SMG-KOGOT-7.webp";
    });
  }

  function injectWeaponArtStyle() {
    if (document.querySelector("#weapon-art-zoom-fix")) return;
    const style = document.createElement("style");
    style.id = "weapon-art-zoom-fix";
    style.textContent = `
      body #loadoutGrid .loadout-card .weapon-art,
      body .loadout-grid .loadout-card .weapon-art {
        width: 10.25rem !important;
        max-width: 10.25rem !important;
        height: 6.15rem !important;
        border-color: rgba(185, 255, 61, 0.16) !important;
        background: linear-gradient(135deg, rgba(185, 255, 61, 0.09), rgba(41, 230, 129, 0.04)), rgba(8, 13, 19, 0.45) !important;
      }

      body #loadoutGrid .loadout-card .weapon-art img,
      body .loadout-grid .loadout-card .weapon-art img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center center !important;
        transform: scale(1.12);
        filter: brightness(1.16) contrast(1.12) saturate(1.16);
      }

      body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
        width: 11.5rem !important;
        max-width: 11.5rem !important;
        height: 6.75rem !important;
      }

      @media (max-width: 720px) {
        body #loadoutGrid .loadout-card .weapon-art,
        body .loadout-grid .loadout-card .weapon-art,
        body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
          width: 8.4rem !important;
          max-width: 8.4rem !important;
          height: 5.1rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function renderAll() {
    injectWeaponArtStyle();
    renderMetaSummary();
    renderRolePanel();
    renderLoadoutCards();
    fixImages();
  }

  async function init() {
    const [meta, mw4, codWeapons] = await Promise.all([
      fetchJson(SOURCES.meta).catch(() => null),
      fetchJson(SOURCES.mw4).catch(() => null),
      fetchJson(SOURCES.codWeapons).catch(() => null),
    ]);
    state.meta = meta;
    state.mw4 = mw4;
    state.codWeapons = codWeapons;
    renderAll();
    document.addEventListener("click", (event) => {
      if (event.target.closest("#loadoutGrid .loadout-card")) return;
      requestAnimationFrame(renderAll);
      setTimeout(renderAll, 80);
    });
    new MutationObserver(() => fixImages()).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
