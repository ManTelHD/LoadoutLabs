(function () {
  const SOURCES = {
    meta: "data/wzstats-meta.json",
    mw4: "data/mw4-watch.json",
    codWeapons: "data/cod-weapons.json",
  };

  const verifiedImages = {
    "ds20-mirage": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-DS20-MIRAGE.webp",
    "kogot-7": "assets/weapons/kogot-7.svg",
    "mk78": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LMG-MK-78.webp",
    "vst": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S03-VST-MAIN.webp",
    "voyak-kt-3": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S02-VOYAK-KT-3.webp",
    "carbon-57": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-CARBON-57.webp",
    "mxr-17": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-MXR-17.webp",
    "dravec-45": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-DRAVEC-45.webp",
    "m15-mod-0": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-M15-MOD-0.webp",
    "peacekeeper-mk1": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-WM-PEACEKEEPER-MK1.jpg",
    "ak-27": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-WM-AK-27.jpg",
    "ryden-45k": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-WM-RYDEN-45K.jpg",
    "mpc-25": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-MPC-25.webp",
    "vs-recon": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SR-VS-RECON.webp",
  };

  const state = {
    meta: null,
    mw4: null,
    codWeapons: null,
  };

  const verifiedBuilds = {
    "ds20-mirage": {
      role: "Gebuffte Long-Range-AR mit staerkerem Mid-/Minimum-Damage, besserem Headshot-Wert und mehr Bullet Velocity in BR/Resurgence.",
      buildCode: "WZStats Loadout",
      secondary: "Kogot-7",
      attachments: ["Optic: EAM XL Reflex", "Muzzle: Monolithic Suppressor", "Barrel: 17.1\" Abdicator Barrel", "Magazine: Griffon Reserve Extended II", "Rear Grip: A1-C Control Grip"],
      perks: ["Scavenger", "Quick Fix", "Survivor"],
    },
    "kogot-7": {
      role: "Warzone-Meta-SMG mit sehr starker Mobility und schneller TTK.",
      buildCode: "WZStats Loadout",
      secondary: "DS20 Mirage",
      attachments: ["Muzzle: Hawker Series 45", "Barrel: 8.5\" Targil Hock-XR Barrel", "Underbarrel: EAM Steady-90 Grip", "Magazine: Vex Expanse Mag", "Fire Mods: Buffer Spring"],
      perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
    },
    mk78: {
      role: "WZStats #1 Langstrecke: sehr stabiles LMG mit starkem Damage-Profil und sauberem Recoil fuer Ranked-Resurgence.",
      buildCode: "WZStats Loadout",
      secondary: "Kogot-7",
      attachments: ["Optic: Greaves AccuSpot 3x", "Barrel: 22\" Impulse HB-762 Barrel", "Underbarrel: Bowen Sentry Foregrip", "Rear Grip: Fleet-G2 Grip", "Fire Mods: Accelerated Recoil System"],
      perks: ["Scavenger", "Quick Fix", "Survivor"],
    },
    vst: {
      role: "Season-03-SMG mit hoher Mobility, gutem Handling und starkem Close-Range-Druck.",
      buildCode: "S09-8B5QH-UQ31",
      secondary: "MK35 ISR",
      attachments: ["Muzzle: H-9mm Precision Comp", "Barrel: Longshot Vector Barrel", "Underbarrel: Zero Shift Handstop", "Magazine: Extended Mag II", "Fire Mods: MF 5.56 Defense Conversion"],
      perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
    },
    "carbon-57": {
      role: "WZStats #3 Kurzstrecke: mobile SMG-Option mit starkem Handling und solidem TTK fuer aggressive Pushes.",
      buildCode: "S05-6U1FK-1551",
      secondary: "Maddox RFB",
      attachments: ["Barrel: 14\" Rockleigh Barrel", "Underbarrel: Vitalize Handstop", "Magazine: Compact-246 Fast Mag", "Rear Grip: Bombus Quick Grip", "Fire Mods: Accelerated Recoil System"],
      perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
    },
    "mxr-17": {
      role: "WZStats Long-Range-AR: spielbar und gebufft, aber aktuell nicht vor DS20 Mirage oder MK.78.",
      buildCode: "WZStats Loadout",
      secondary: "Kogot-7",
      attachments: ["Optic: EAM XL Reflex", "Muzzle: Monolithic Suppressor", "Barrel: 17\" Greaves Scourge Barrel", "Magazine: Rhodes Drum Mag", "Stock: Winch Stock"],
      perks: ["Scavenger", "Quick Fix", "Survivor"],
    },
    "mk35-isr": {
      role: "Long Range AR fuer kontrollierte Warzone-Beams.",
      buildCode: "A12-34FK5-DRNJU-11",
      secondary: "Razor 9mm",
      attachments: ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: 16.5\" Greaves Bellum Barrel", "Underbarrel: VAS Convergence Foregrip", "Magazine: Bowen Siren Drum"],
      perks: ["Quick Fix", "Survivor", "Smoke Grenade"],
    },
    "ak-27": {
      role: "BO7 AR fuer Spieler, die Recoil-Kontrolle und Range bevorzugen.",
      buildCode: "A02-2JD6P-CPNP9-QY11",
      secondary: "Kogot-7",
      attachments: ["Muzzle: EMT3 Compensator", "Barrel: 18.2\" Vostok Extended Barrel", "Underbarrel: Ironhold Angled Grip", "Rear Grip: Garin Advanced Grip", "Fire Mods: 7.62 Soviet Overpressured"],
      perks: ["Perk Greed", "Mute Field", "Dexterity"],
    },
  };

  const detailLayoutCss = `
    .loadout-card.expanded { align-items: start; }
    .loadout-card.expanded .card-body { overflow: visible; }
    .loadout-card.expanded .card-details {
      display: block;
      grid-template-rows: none;
      min-height: max-content;
      margin-top: 0.9rem;
      overflow: visible;
      opacity: 1;
    }
    .loadout-card.expanded .card-details > .role {
      margin: 0 0 0.85rem;
    }
    .loadout-card.expanded .card-details > .attachment-columns {
      min-height: max-content;
      overflow: visible;
    }
    .loadout-card.expanded .attachment-columns {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
      gap: 0.75rem;
    }
    .loadout-card.expanded .attachment-list,
    .loadout-card.expanded .perk-list {
      height: auto;
      margin: 0.75rem 0 0;
    }
    .loadout-card.expanded .card-footer {
      align-self: start;
      margin-top: 1.1rem;
    }
    @media (max-width: 720px) {
      .loadout-card.expanded .attachment-columns { grid-template-columns: 1fr; }
    }
  `;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/mk\./g, "mk")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function fetchJson(url) {
    const response = await fetch(`${url}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    return response.json();
  }

  function injectDetailLayoutCss() {
    if (document.querySelector("#loadout-detail-layout-fix")) return;
    const style = document.createElement("style");
    style.id = "loadout-detail-layout-fix";
    style.textContent = detailLayoutCss;
    document.head.append(style);
  }

  function applyImageFallbacks(root = document) {
    root.querySelectorAll?.('.camo-swatch img[src*="img.game8.co"]').forEach((image) => {
      image.closest(".camo-swatch")?.classList.remove("has-image");
      image.remove();
    });

    root.querySelectorAll?.(".weapon-thumb img").forEach((image) => {
      if (image.dataset.fallbackBound) return;
      image.dataset.fallbackBound = "true";
      image.addEventListener("error", () => {
        image.src = "assets/cod-loadout-hero.png";
      }, { once: true });
    });
  }

  function watchImageFallbacks() {
    applyImageFallbacks();
    document.addEventListener("error", (event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement)) return;
      if (image.src.includes("img.game8.co")) {
        image.closest(".camo-swatch")?.classList.remove("has-image");
        image.remove();
      }
    }, true);

    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) applyImageFallbacks(node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
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

  function getStaticLoadout(item) {
    const verified = verifiedBuilds[item.id] || verifiedBuilds[slug(item.name)];
    if (verified) return verified;
    if (typeof loadouts === "undefined" || !Array.isArray(loadouts)) return null;
    const mode = currentMode();
    const itemSlug = slug(item.name);
    return loadouts.find((loadout) => loadout.mode === mode && slug(loadout.name) === itemSlug)
      || loadouts.find((loadout) => slug(loadout.name) === itemSlug)
      || null;
  }

  function hasRealAttachments(attachments = []) {
    return attachments.some((attachment) => /^(optic|muzzle|barrel|underbarrel|magazine|stock|rear grip|fire mods):/i.test(attachment));
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
      <span>WZStats Auto Update - ${escapeHtml(state.meta.generatedAtLabel)}</span>
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
            <p>${escapeHtml(item.tier)} - ${escapeHtml(item.rankLabel)}${item.pickRateLabel ? ` - ${escapeHtml(item.pickRateLabel)}` : ""}</p>
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

    const imageMap = codImageMap();
    const cards = data.items.slice(0, 12);
    if (count) count.textContent = `${cards.length} WZStats-Picks angezeigt`;
    grid.innerHTML = cards.map((item) => {
      const staticLoadout = getStaticLoadout(item);
      const attachments = staticLoadout?.attachments?.length ? staticLoadout.attachments : item.attachments;
      const perks = staticLoadout?.perks?.length ? staticLoadout.perks : [];
      const buildCode = staticLoadout?.buildCode || "WZStats Tierlist";
      const secondary = staticLoadout?.secondary || "";
      const role = staticLoadout?.role || item.description;
      const codeLabel = /^wzstats/i.test(buildCode) ? "" : `Code: ${escapeHtml(buildCode)}`;
      const imageUrl = weaponImage(item, imageMap);
      const image = imageUrl
        ? `<div class="weapon-art" style="grid-column:1!important;width:160px!important;max-width:160px!important;height:90px!important;margin:4px 0 0!important;overflow:hidden!important;display:flex!important;align-items:center!important;justify-content:center!important;border:1px solid rgba(245,242,233,.12);border-radius:6px;background:rgba(245,242,233,.035);"><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.name)}" loading="lazy" style="display:block!important;width:100%!important;max-width:160px!important;height:100%!important;max-height:90px!important;object-fit:contain!important;" onerror="this.closest('.weapon-art').remove()"></div>`
        : "";

      return `
        <article class="loadout-card ${item.tier === "META" ? "tier-absolute-meta" : "tier-meta"}" data-loadout-card="${escapeHtml(item.name)}">
          <div class="rank-badge">#${escapeHtml(item.position)}<span>${escapeHtml(item.tierLabel)}</span></div>
          ${image}
          <div class="card-body">
            <div class="card-title-row"><div><span class="mode-pill">${escapeHtml(item.weaponClass)}</span><h3 class="weapon-name">${escapeHtml(item.name)}</h3></div></div>
            <div class="stat-row">
              <span><strong>${escapeHtml(item.scoreLabel)}</strong> WZStats</span>
              <span><strong>${escapeHtml(item.pickRateLabel || "n/a")}</strong> Pick-Rate</span>
              <span><strong>${escapeHtml(item.role || "Meta")}</strong> Rolle</span>
              <span><strong>${escapeHtml(item.sourceUpdatedLabel)}</strong> Stand</span>
            </div>
            <div class="tag-list"><span>WZStats</span><span>${escapeHtml(item.rankLabel)}</span><span>${escapeHtml(item.tierLabel)}</span></div>
            <div class="card-details">
              <p class="role">${escapeHtml(role)}</p>
              <div class="attachment-columns">
                <div>
                  <ul class="attachment-list">
                    ${hasRealAttachments(attachments) ? attachments.map((attachment) => `<li>${escapeHtml(attachment)}</li>`).join("") : `<li>Keine verifizierten Aufsaetze fuer diese Waffe hinterlegt.</li>`}
                  </ul>
                </div>
                <ul class="perk-list">
                  ${codeLabel ? `<li>${codeLabel}</li>` : ""}
                  ${secondary ? `<li>Pair: ${escapeHtml(secondary)}</li>` : ""}
                  ${perks.map((perk, index) => `<li>Extra ${index + 1}: ${escapeHtml(perk)}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <span class="range">${escapeHtml(item.role || item.weaponClass)}</span>
            <button class="expand-button" type="button" aria-expanded="false" aria-label="${escapeHtml(item.name)} Aufsaetze anzeigen">
              <span>Details</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6 1.4-1.4Z"></path>
              </svg>
            </button>
          </footer>
        </article>
      `;
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
    injectDetailLayoutCss();
    watchImageFallbacks();

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
      if (event.target.closest("#loadoutGrid")) return;
      requestAnimationFrame(renderAll);
      setTimeout(renderAll, 80);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
