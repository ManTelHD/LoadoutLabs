(function () {
  const VERSION = "20260529-fast1";
  const DATA_URLS = {
    meta: `data/wzstats-meta.json?v=${VERSION}`,
    weapons: `data/cod-weapons.json?v=${VERSION}`,
    builds: "loadout-builds.js?v=20260524-complete-builds3",
  };

  const roleExtraSets = {
    long: ["Plünderer", "Sprinter", "Geist"],
    close: ["Bergsteiger", "Sprinter", "Jäger"],
    sniper: ["Plünderer", "Sprinter", "Jäger"],
    support: ["Feldsanitäter", "Sprinter", "Überlebender"],
    utility: ["Bergsteiger", "Sprinter", "Überlebender"],
  };

  const classLabels = new Map([
    ["assault-rifle", "Sturmgewehr"],
    ["smg", "MP"],
    ["lmg", "LMG"],
    ["sniper-rifle", "Scharfschützengewehr"],
    ["marksman-rifle", "Präzisionsgewehr"],
    ["pistol", "Pistole"],
    ["launcher", "Werfer"],
    ["melee", "Nahkampf"],
    ["special", "Spezial"],
  ]);

  const roleLabels = new Map([
    ["long-range", "Langstrecke"],
    ["close-range", "Kurzstrecke"],
    ["sniper-support", "Sniper-Unterstützung"],
    ["sniper", "Sniper"],
    ["launcher", "Werfer"],
    ["melee", "Nahkampf"],
    ["special", "Spezial"],
    ["flex", "Flex"],
  ]);

  const slotLabels = new Map([
    ["optic", "Visier"],
    ["muzzle", "Mündung"],
    ["barrel", "Lauf"],
    ["underbarrel", "Unterlauf"],
    ["magazine", "Magazin"],
    ["rear grip", "Hinterer Griff"],
    ["stock", "Schaft"],
    ["fire mods", "Feuermodifikation"],
  ]);

  const phraseMap = new Map([
    ["Monolithic Suppressor", "Monolithischer Schalldämpfer"],
    ["Ported Compensator", "Portierter Kompensator"],
    ["Compensator", "Kompensator"],
    ["Suppressor", "Schalldämpfer"],
    ["Reinforced Long Barrel", "Verstärkter langer Lauf"],
    ["Reinforced Barrel", "Verstärkter Lauf"],
    ["Long Barrel", "Langer Lauf"],
    ["Balanced Barrel", "Ausbalancierter Lauf"],
    ["Marksman Barrel", "Präzisionslauf"],
    ["Ranger Barrel", "Ranger-Lauf"],
    ["Precision Foregrip", "Präzisions-Vordergriff"],
    ["Vertical Foregrip", "Vertikaler Vordergriff"],
    ["Angled Grip", "Winkelgriff"],
    ["Foregrip", "Vordergriff"],
    ["Quickdraw Grip", "Schnellziehgriff"],
    ["Ergonomic Grip", "Ergonomischer Griff"],
    ["Control Grip", "Kontrollgriff"],
    ["Advanced Grip", "Verbesserter Griff"],
    ["Grip", "Griff"],
    ["Lightweight Handstop", "Leichter Handstopper"],
    ["Handstop", "Handstopper"],
    ["Extended Mag II", "Erweitertes Magazin II"],
    ["Extended Mag", "Erweitertes Magazin"],
    ["Fast Mag", "Schnellmagazin"],
    ["Drum Mag", "Trommelmagazin"],
    ["Drum", "Trommel"],
    ["Magazine", "Magazin"],
    ["Combat Stock", "Kampfschaft"],
    ["Agile Stock", "Agiler Schaft"],
    ["Raider Stock", "Raider-Schaft"],
    ["Stock", "Schaft"],
    ["High Velocity", "Hohe Geschossgeschwindigkeit"],
    ["Overpressured", "Überdruckmunition"],
    ["Accelerated Recoil System", "Beschleunigtes Rückstoßsystem"],
    ["Buffer Spring", "Pufferfeder"],
    ["Recoil Sync Unit", "Rückstoß-Sync-Einheit"],
    ["Defense Conversion", "Verteidigungs-Umrüstung"],
    ["Zero Shift", "Null-Versatz"],
  ]);

  const knownImages = {
    "mk78": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LMG-MK-78.webp",
    "kogot-7": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/COD-BO7-SMG-KOGOT-7.webp",
    "ds20-mirage": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-DS20-MIRAGE.webp",
    "carbon-57": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-CARBON-57.webp",
    "mxr-17": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-MXR-17.webp",
    "dravec-45": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-DRAVEC-45.webp",
    "m15-mod-0": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-M15-MOD-0.webp",
    "mpc-25": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-MPC-25.webp",
    "peacekeeper-mk1": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-PEACEKEEPER-MK1.webp",
    "ak-27": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-AK-27.webp",
    "ryden-45k": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-RYDEN-45K.webp",
    "sturmwolf-45": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/COD-BO7-SMG-STURMWOLF-45.webp",
    "egrt-17": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7_S02_AR_EGRT-17.webp",
    "rev-46": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7_S02_SMG_REV-46.webp",
    "razor-9mm": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-RAZOR-9MM.webp",
    "maddox-rfb": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/COD-BO7-AR-MADDOX-RFB.webp",
    "x9-maverick": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-X9-MAVERICK.webp",
    "m8a1": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-DMR-M8A1.webp",
    "hawker-hx": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SR-HAWKER-HX.webp",
    "vs-recon": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SR-VS-RECON.webp",
    "strider-300": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-Weapons-Strider-300-Main.webp",
    "swordfish-a1": "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-DMR-SWORDFISH-A1.webp",
    "sokol-545": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LMG-SOKOL-545.webp",
    "rk-9": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-SK-9.webp",
    "xm325": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LMG-XM325.webp",
    "xr-3-ion": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SR-XR-3-ION.webp",
    "shadow-sk": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SR-SHADOW-SK.webp",
    "m34-novaline": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-DMR-M34-NOVALINE.webp",
    "warden-308": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-DMR-WARDEN-308.webp",
    "1911": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-Weapons-1911-Main.webp",
    "coda-9": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-PISTOL-CODA-9.webp",
    "velox-57": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-PISTOL-VELOX-5-7.webp",
    "jager-45": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-PISTOL-JAGER-45.webp",
    "jäger-45": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-PISTOL-JAGER-45.webp",
    "arc-m1": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LAU-ARC-M1.webp",
    "a-r-c-m1": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LAU-ARC-M1.webp",
    "flatline-mkii": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-MELEE-FLATLINE-MK-II.webp",
    "aarow-109": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LAU-AAROW-109.webp",
    "knife-bo7": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-MELEE-KNIFE.webp",
    "knife": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-MELEE-KNIFE.webp",
    "ballistic-knife": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/COD-BO7-MELEE-BALLISTIC-KNIFE.webp",
    "nx-ravager": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SPC-NX-RAVAGER.webp",
    "h311-saw": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7_S02_H311-SAW.webp",
    "gdl-havoc": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-02/weapons/BO7_S02_GDL_Havoc.webp",
    "siren": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-Weapons-Siren.webp",
    "katana": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-Weapons-Katana-Main.webp",
  };

  const state = { meta: null, weapons: null, builds: {}, renderQueued: false };

  function html(value) {
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

  function label(map, value) {
    return map.get(slug(value)) || value || "";
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function translateAttachment(value) {
    let text = String(value || "")
      .replace(/Aufsaetze/g, "Aufsätze")
      .replace(/geprueft/g, "geprüft")
      .replace(/verfuegbar/g, "verfügbar")
      .replace(/fuer/g, "für");
    const slotMatch = text.match(/^([^:]+):\s*(.+)$/);
    if (slotMatch) {
      const translatedSlot = slotLabels.get(slotMatch[1].trim().toLowerCase()) || slotMatch[1].trim();
      text = `${translatedSlot}: ${slotMatch[2].trim()}`;
    }
    for (const [from, to] of phraseMap) text = text.replace(new RegExp(`\b${escapeRegExp(from)}\b`, "g"), to);
    return text;
  }

  function parseAttachment(value) {
    const clean = translateAttachment(value).replace(/\s+/g, " ").trim();
    const levelMatch = clean.match(/\((Stufe [^)]+|Prestige)\)\s*$/i);
    const level = levelMatch ? levelMatch[1] : "";
    const withoutLevel = levelMatch ? clean.slice(0, levelMatch.index).trim() : clean;
    const parts = withoutLevel.split(":");
    const slot = parts.length > 1 ? parts.shift().trim() : "Aufsatz";
    const name = parts.join(":").trim() || withoutLevel;
    return { slot, name, level };
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: "force-cache" });
    if (!response.ok) throw new Error(`Fetch failed: ${url}`);
    return response.json();
  }

  async function fetchBuilds() {
    try {
      const response = await fetch(DATA_URLS.builds, { cache: "force-cache" });
      if (!response.ok) return {};
      const source = await response.text();
      const match = source.match(/const builds\s*=\s*({[\s\S]*?});\s*const slug/);
      if (!match) return {};
      const prelude = "const longRangeExtras=[];const closeRangeExtras=[];const sniperExtras=[];const utilityExtras=[];";
      return Function(`${prelude} return (${match[1]});`)();
    } catch {
      return {};
    }
  }

  function buildImageMap() {
    const map = new Map();
    for (const weapon of state.weapons?.weapons || []) {
      const key = slug(weapon.name);
      if (weapon.imageUrl) map.set(key, weapon.imageUrl);
    }
    return map;
  }

  function fallbackImage(item) {
    const safeName = html(item.name || "Waffe");
    const safeClass = html(label(classLabels, item.weaponClass) || "Loadout");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 236"><rect width="420" height="236" fill="#070b10"/><path d="M34 151h250l26-22h51l20 22h20v25H34z" fill="#222c38" stroke="#ffd35a" stroke-width="4"/><path d="M68 123h182l23-24h83l-16 24h28v24H68z" fill="#111820" stroke="#647080" stroke-width="3"/><text x="24" y="42" fill="#ffd35a" font-family="Arial" font-size="24" font-weight="900">${safeName}</text><text x="24" y="69" fill="#c4cad4" font-family="Arial" font-size="15" font-weight="700">${safeClass}</text></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function weaponImage(item, map) {
    return knownImages[item.id] || knownImages[slug(item.name)] || map.get(slug(item.name)) || fallbackImage(item);
  }

  function currentMode() {
    const active = document.querySelector(".secondary-mode-switch .mode-button.active")?.dataset.mode;
    return active === "bo7-ranked" ? "bo7-ranked" : "warzone-ranked";
  }

  function activePanel() {
    return document.querySelector(".tab-panel.active")?.dataset.panel || "weapons";
  }

  function activeFilter() {
    return document.querySelector("#filterToolbar .filter-button.active")?.dataset.filter || "all";
  }

  function currentQuery() {
    return (document.querySelector("#loadoutSearch") || document.querySelector("#weaponSearch"))?.value?.trim().toLowerCase() || "";
  }

  function currentSort() {
    return document.querySelector("#sortSelect")?.value || "score";
  }

  function getMetaList() {
    if (!state.meta) return null;
    return currentMode() === "bo7-ranked" ? state.meta.bo7Ranked : state.meta.warzoneRanked;
  }

  function matchesFilter(item) {
    const filter = activeFilter();
    if (filter === "all") return true;
    const role = slug(item.role);
    const weaponClass = slug(item.weaponClass);
    if (filter === "long") return role === "long-range";
    if (filter === "close") return role === "close-range";
    if (filter === "support") return role === "sniper-support";
    if (filter === "sniper") return role === "sniper";
    if (filter === "ar") return weaponClass === "assault-rifle";
    if (filter === "smg") return weaponClass === "smg";
    if (filter === "flex") return role === "flex" || weaponClass === "marksman-rifle" || weaponClass === "pistol";
    return role === slug(filter) || weaponClass === slug(filter);
  }

  function matchesQuery(item) {
    const query = currentQuery();
    if (!query) return true;
    const build = state.builds[item.id] || state.builds[slug(item.name)] || {};
    return [item.name, item.weaponClass, item.role, item.tierLabel, item.rankLabel, ...(build.attachments || [])]
      .join(" ")
      .toLowerCase()
      .includes(query);
  }

  function visibleItems(data) {
    const items = data.items.filter(matchesFilter).filter(matchesQuery);
    const sort = currentSort();
    if (sort === "name") return items.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "range") return items.sort((a, b) => String(a.role).localeCompare(String(b.role)) || a.position - b.position);
    if (sort === "pick") return items.sort((a, b) => (b.pickRate || 0) - (a.pickRate || 0) || a.position - b.position);
    return items.sort((a, b) => tierOrder(a.tier) - tierOrder(b.tier) || a.position - b.position);
  }

  function tierOrder(tier) {
    return { META: 0, S: 0, A: 1, B: 2, C: 3, D: 4 }[tier] ?? 9;
  }

  function scoreFor(item) {
    const pos = Number(item.position) || 1;
    if (item.tier === "META") return Math.max(94, 101 - pos);
    if (item.tier === "A") return Math.max(82, 92 - pos);
    if (item.tier === "B") return Math.max(72, 82 - pos);
    if (item.tier === "C") return Math.max(62, 72 - pos);
    if (item.tier === "D") return Math.max(52, 62 - pos);
    return Math.max(50, 90 - pos);
  }

  function roleKey(item) {
    const role = slug(item.role);
    const key = item.id || slug(item.name);
    if (["arc-m1", "flatline-mkii", "aarow-109", "knife-bo7", "ballistic-knife", "nx-ravager", "h311-saw", "gdl-havoc", "siren", "katana"].includes(key)) return "utility";
    if (role.includes("support")) return "support";
    if (role.includes("sniper")) return "sniper";
    if (role.includes("close")) return "close";
    return "long";
  }

  function tierHeading(item, groupSize) {
    const tierKey = item.tier === "META" ? "meta" : slug(item.tier || "tier");
    const title = item.tier === "META" ? "Absolute Meta" : `${item.tier}-Tier Waffen`;
    return `<div class="meta-tier-heading tier-heading-${tierKey}" data-tier="${html(item.tier)}"><span>${html(title)}</span><small>${groupSize} Waffen</small></div>`;
  }

  function renderDetails(item, build) {
    const attachments = (build.attachments && build.attachments.length ? build.attachments : ["Keine geprüften Aufsätze für diese Waffe hinterlegt."])
      .filter((line) => !/^(Pick-Rate|Quelle|Rolle):/i.test(line))
      .map(parseAttachment);
    const extras = roleExtraSets[roleKey(item)] || roleExtraSets.long;
    const code = build.code && !/^wzstats/i.test(build.code) ? build.code : "";

    const attachmentHtml = attachments.map((attachment) => `
      <li class="loadout-slot">
        <span class="slot-type">${html(attachment.slot)}</span>
        <strong>${html(attachment.name)}</strong>
        ${attachment.level ? `<em>${html(attachment.level)}</em>` : ""}
      </li>
    `).join("");

    const perkHtml = extras.map((extra, index) => `
      <li class="perk-chip"><span>${index + 1}</span><strong>${html(extra)}</strong></li>
    `).join("");

    return `
      <section class="card-details meta-card-details">
        <div class="premium-details-grid">
          <section class="detail-panel attachments-panel" aria-label="Aufsätze">
            <div class="detail-panel-title"><span>Aufsätze</span><strong>${attachments.length}/5</strong></div>
            <ul class="premium-attachment-list">${attachmentHtml}</ul>
          </section>
          <section class="detail-panel setup-panel" aria-label="Setup">
            ${code ? `<div class="build-code-box"><span>Klassen-Code</span><strong>${html(code)}</strong></div>` : ""}
            <div class="detail-panel-title compact-title"><span>Extras</span><strong>${extras.length}</strong></div>
            <ul class="premium-perk-list">${perkHtml}</ul>
          </section>
        </div>
      </section>
    `;
  }

  function renderCard(item, imageMap, expandedCards) {
    const key = item.id || slug(item.name);
    const build = state.builds[key] || state.builds[slug(item.name)] || {};
    const score = scoreFor(item);
    const tierKey = item.tier === "META" ? "meta" : slug(item.tier || "tier");
    const expanded = expandedCards.has(item.name);
    const image = weaponImage(item, imageMap);
    const fallback = fallbackImage(item);
    return `
      <article class="loadout-card tier-card-${tierKey}${item.tier === "META" ? " tier-absolute-meta" : " tier-meta"}${expanded ? " expanded" : ""}" data-loadout-card="${html(item.name)}">
        <div class="rank-badge">#${html(item.position)}<span>${html(item.tier === "META" ? "Legendär" : item.tierLabel)}</span></div>
        <div class="weapon-art"><img src="${html(image)}" data-fallback="${html(fallback)}" alt="${html(item.name)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=this.dataset.fallback"></div>
        <div class="card-body">
          <div class="card-title-row"><div><span class="mode-pill">${html(label(classLabels, item.weaponClass))}</span><h3 class="weapon-name">${html(item.name)}</h3></div></div>
          <div class="meta-score-pill" aria-label="Score ${score} von 100"><span>Score</span><strong>${score}</strong><em>/100</em></div>
          <div class="stat-row"><span><em>Rolle</em><strong>${html(label(roleLabels, item.role))}</strong></span></div>
        </div>
        ${renderDetails(item, build)}
        <footer class="card-footer"><button class="expand-button" type="button" aria-expanded="${expanded ? "true" : "false"}" aria-label="${html(item.name)} Aufsätze ${expanded ? "ausblenden" : "anzeigen"}"><span>${expanded ? "Schließen" : "Details"}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6 1.4-1.4Z"></path></svg></button></footer>
      </article>
    `;
  }

  function installStyle() {
    if (document.querySelector("#meta-fast-style")) return;
    const style = document.createElement("style");
    style.id = "meta-fast-style";
    style.textContent = `
      body #weaponComparePanel, body .weapon-compare-panel, body #metaPatchSummary:empty { display: none !important; }
      body #loadoutGrid { contain: layout paint; }
      body #loadoutGrid .meta-tier-heading { display:flex; align-items:center; justify-content:space-between; gap:1rem; min-height:4.1rem; margin:1.05rem 0 .7rem; padding:.95rem 1.2rem; border:1px solid rgba(var(--tier-rgb), .38); border-left:.9rem solid var(--tier-color); border-radius:.4rem; background:linear-gradient(90deg, rgba(var(--tier-rgb), .22), rgba(var(--tier-rgb), .07) 42%, rgba(255,255,255,.025)), #10151b; box-shadow:0 .8rem 1.8rem rgba(0,0,0,.24), 0 0 1.5rem rgba(var(--tier-rgb), .12); }
      body #loadoutGrid .meta-tier-heading span { color:var(--tier-color); font-family:Rajdhani, Inter, sans-serif; font-size:clamp(1.35rem, 1.9vw, 1.85rem); font-weight:950; text-transform:uppercase; }
      body #loadoutGrid .meta-tier-heading small { color:var(--tier-color); font-weight:900; }
      body #loadoutGrid .tier-heading-meta { --tier-color:#ffd35a; --tier-rgb:255,211,90; }
      body #loadoutGrid .tier-heading-a { --tier-color:#b08cff; --tier-rgb:176,140,255; }
      body #loadoutGrid .tier-heading-b { --tier-color:#35d7ff; --tier-rgb:53,215,255; }
      body #loadoutGrid .tier-heading-c { --tier-color:#29e681; --tier-rgb:41,230,129; }
      body #loadoutGrid .tier-heading-d { --tier-color:#9aa4b4; --tier-rgb:154,164,180; }
      body #loadoutGrid .loadout-card { --tier-card-color:#9aa4b4; --tier-card-rgb:154,164,180; contain:layout paint; gap:.86rem !important; padding:.72rem .9rem .72rem !important; border-color:rgba(var(--tier-card-rgb), .28) !important; box-shadow:inset .45rem 0 0 rgba(var(--tier-card-rgb), .86), 0 .8rem 1.8rem rgba(0,0,0,.26), 0 0 1.6rem rgba(var(--tier-card-rgb), .12) !important; transition:border-color 90ms ease, background-color 90ms ease !important; transform:none !important; }
      body #loadoutGrid .tier-card-meta, body #loadoutGrid .tier-absolute-meta { --tier-card-color:#ffd35a; --tier-card-rgb:255,211,90; background:linear-gradient(135deg, rgba(255,211,90,.20), rgba(255,157,58,.075) 44%, rgba(255,255,255,.025)), #12150f !important; }
      body #loadoutGrid .tier-card-a { --tier-card-color:#b08cff; --tier-card-rgb:176,140,255; background:linear-gradient(135deg, rgba(176,140,255,.14), rgba(110,83,255,.055) 42%, rgba(255,255,255,.02)), #101820 !important; }
      body #loadoutGrid .tier-card-b { --tier-card-color:#35d7ff; --tier-card-rgb:53,215,255; background:linear-gradient(135deg, rgba(53,215,255,.13), rgba(51,116,255,.05) 42%, rgba(255,255,255,.02)), #101820 !important; }
      body #loadoutGrid .tier-card-c { --tier-card-color:#29e681; --tier-card-rgb:41,230,129; background:linear-gradient(135deg, rgba(41,230,129,.13), rgba(90,255,105,.05) 42%, rgba(255,255,255,.02)), #101820 !important; }
      body #loadoutGrid .tier-card-d { --tier-card-color:#9aa4b4; --tier-card-rgb:154,164,180; background:linear-gradient(135deg, rgba(154,164,180,.12), rgba(99,110,125,.05) 42%, rgba(255,255,255,.02)), #101820 !important; }
      body #loadoutGrid .rank-badge { background:linear-gradient(135deg, var(--tier-card-color), color-mix(in srgb, var(--tier-card-color) 70%, #fff)) !important; color:#071008 !important; box-shadow:0 0 1.25rem rgba(var(--tier-card-rgb), .32) !important; }
      body #loadoutGrid .weapon-art { width:10.2rem !important; max-width:10.2rem !important; height:5.75rem !important; border-radius:.42rem !important; overflow:hidden !important; background:rgba(5,8,12,.72) !important; transform:none !important; will-change:auto !important; }
      body #loadoutGrid .tier-absolute-meta .weapon-art { width:11rem !important; max-width:11rem !important; height:6.15rem !important; }
      body #loadoutGrid .weapon-art img, body #loadoutGrid .loadout-card:hover .weapon-art img { width:100% !important; height:100% !important; object-fit:contain !important; object-position:center !important; transform:none !important; transition:none !important; animation:none !important; filter:none !important; will-change:auto !important; }
      body #loadoutGrid .meta-score-pill { display:inline-grid !important; grid-template-columns:auto auto auto !important; align-items:baseline !important; width:fit-content !important; margin:.12rem 0 .46rem !important; overflow:hidden !important; border:1px solid rgba(var(--tier-card-rgb), .72) !important; border-radius:.48rem !important; background:linear-gradient(135deg, rgba(var(--tier-card-rgb), .22), rgba(var(--tier-card-rgb), .08)), rgba(7,10,12,.92) !important; box-shadow:0 0 0 1px rgba(var(--tier-card-rgb), .12), 0 .7rem 1.4rem rgba(var(--tier-card-rgb), .14) !important; }
      body #loadoutGrid .meta-score-pill span { align-self:stretch !important; display:inline-grid !important; place-items:center !important; padding:.32rem .58rem !important; background:rgba(var(--tier-card-rgb), .16) !important; color:var(--tier-card-color) !important; font-size:.68rem !important; font-weight:950 !important; text-transform:uppercase !important; }
      body #loadoutGrid .meta-score-pill strong { padding:.17rem .1rem .17rem .55rem !important; color:#fff !important; font-family:Rajdhani, Inter, sans-serif !important; font-size:clamp(1.48rem, 2.5vw, 2.08rem) !important; line-height:.92 !important; font-weight:950 !important; }
      body #loadoutGrid .meta-score-pill em { padding:.17rem .62rem .17rem .06rem !important; color:var(--tier-card-color) !important; font-size:.74rem !important; font-style:normal !important; font-weight:950 !important; }
      body #loadoutGrid .stat-row span { display:inline-flex !important; align-items:center !important; gap:.34rem !important; width:fit-content !important; min-height:1.8rem !important; border:1px solid rgba(255,255,255,.075) !important; border-radius:999px !important; background:rgba(8,13,19,.64) !important; padding:.2rem .56rem !important; white-space:nowrap !important; }
      body #loadoutGrid .stat-row em { color:rgba(255,255,255,.58) !important; font-style:normal !important; font-size:.66rem !important; font-weight:900 !important; text-transform:uppercase !important; }
      body #loadoutGrid .stat-row strong { color:#fff !important; font-size:.86rem !important; }
      body #loadoutGrid .card-details, body #loadoutGrid .meta-card-details { grid-column:1 / -1 !important; width:100% !important; max-height:0; overflow:hidden; padding-top:0 !important; contain:layout paint; transition:none !important; animation:none !important; }
      body #loadoutGrid .loadout-card.expanded .card-details, body #loadoutGrid .loadout-card.expanded .meta-card-details { display:block !important; max-height:none; overflow:visible; padding-top:.78rem !important; }
      body #loadoutGrid .premium-details-grid { display:grid !important; grid-template-columns:minmax(0, 1.35fr) minmax(14rem, .85fr) !important; gap:.85rem !important; }
      body #loadoutGrid .detail-panel { overflow:hidden !important; border:1px solid rgba(var(--tier-card-rgb), .22) !important; border-radius:.48rem !important; background:rgba(6,9,12,.46) !important; }
      body #loadoutGrid .detail-panel-title { display:flex !important; align-items:center !important; justify-content:space-between !important; gap:.75rem !important; padding:.68rem .8rem .52rem 1rem !important; border-bottom:1px solid rgba(255,255,255,.075) !important; color:rgba(255,255,255,.68) !important; font-size:.72rem !important; font-weight:900 !important; text-transform:uppercase !important; }
      body #loadoutGrid .detail-panel-title strong { color:var(--tier-card-color) !important; }
      body #loadoutGrid .premium-attachment-list, body #loadoutGrid .premium-perk-list { display:grid !important; gap:.42rem !important; margin:0 !important; padding:.72rem !important; list-style:none !important; background:transparent !important; }
      body #loadoutGrid .premium-attachment-list { grid-template-columns:repeat(2, minmax(0, 1fr)) !important; }
      body #loadoutGrid .loadout-slot { display:grid !important; grid-template-columns:minmax(4.4rem, auto) minmax(0, 1fr) auto !important; align-items:center !important; gap:.55rem !important; min-height:2.4rem !important; padding:.46rem .55rem !important; border:1px solid rgba(255,255,255,.07) !important; border-radius:.36rem !important; background:rgba(255,255,255,.034) !important; }
      body #loadoutGrid .slot-type { color:var(--tier-card-color) !important; font-size:.66rem !important; font-weight:900 !important; text-transform:uppercase !important; }
      body #loadoutGrid .loadout-slot strong, body #loadoutGrid .perk-chip strong { min-width:0 !important; color:#f7f9fc !important; font-size:.86rem !important; line-height:1.12 !important; }
      body #loadoutGrid .loadout-slot em { justify-self:end !important; border:1px solid rgba(var(--tier-card-rgb), .28) !important; border-radius:999px !important; padding:.15rem .4rem !important; color:rgba(255,255,255,.8) !important; font-size:.66rem !important; font-style:normal !important; font-weight:800 !important; white-space:nowrap !important; }
      body #loadoutGrid .build-code-box { margin:.72rem .72rem 0 !important; padding:.7rem !important; border:1px solid rgba(var(--tier-card-rgb), .32) !important; border-radius:.42rem !important; background:rgba(0,0,0,.2) !important; }
      body #loadoutGrid .build-code-box span { display:block !important; margin-bottom:.22rem !important; color:rgba(255,255,255,.62) !important; font-size:.68rem !important; font-weight:900 !important; text-transform:uppercase !important; }
      body #loadoutGrid .build-code-box strong { display:block !important; color:#fff !important; font-family:Rajdhani, Inter, sans-serif !important; font-size:1.04rem !important; line-height:1.05 !important; word-break:break-word !important; }
      body #loadoutGrid .compact-title { margin-top:.2rem !important; border-bottom:0 !important; padding-bottom:.2rem !important; }
      body #loadoutGrid .premium-perk-list { padding-top:.25rem !important; }
      body #loadoutGrid .perk-chip { display:grid !important; grid-template-columns:1.52rem minmax(0, 1fr) !important; align-items:center !important; gap:.48rem !important; min-height:2.16rem !important; padding:.38rem .5rem !important; border:1px solid rgba(255,255,255,.07) !important; border-radius:.36rem !important; background:rgba(255,255,255,.034) !important; }
      body #loadoutGrid .perk-chip span { display:grid !important; width:1.36rem !important; height:1.36rem !important; place-items:center !important; border-radius:999px !important; background:var(--tier-card-color) !important; color:#060809 !important; font-size:.74rem !important; font-weight:900 !important; }
      body #loadoutGrid .card-footer .range, body #loadoutGrid .tag-list { display:none !important; }
      body #loadoutGrid .expand-button { min-height:2.52rem !important; min-width:7.7rem !important; border-color:rgba(var(--tier-card-rgb), .55) !important; background:linear-gradient(135deg, rgba(var(--tier-card-rgb), .18), rgba(var(--tier-card-rgb), .08)), #101620 !important; color:#fff !important; animation:none !important; transform:none !important; transition:background-color 90ms ease, border-color 90ms ease, color 90ms ease !important; }
      body #loadoutGrid .expand-button:hover, body #loadoutGrid .loadout-card.expanded .expand-button { border-color:rgba(var(--tier-card-rgb), .86) !important; background:var(--tier-card-color) !important; color:#071008 !important; }
      @media (max-width: 980px) { body #loadoutGrid .premium-details-grid, body #loadoutGrid .premium-attachment-list { grid-template-columns:1fr !important; } body #loadoutGrid .loadout-slot { grid-template-columns:minmax(4rem, auto) minmax(0, 1fr) !important; } body #loadoutGrid .loadout-slot em { grid-column:2 !important; justify-self:start !important; } }
      @media (max-width: 720px) { body #loadoutGrid .weapon-art, body #loadoutGrid .tier-absolute-meta .weapon-art { width:7.2rem !important; max-width:7.2rem !important; height:4.2rem !important; } }
    `;
    document.head.append(style);
  }

  function render() {
    const data = getMetaList();
    const grid = document.querySelector("#loadoutGrid");
    if (!data || !grid || activePanel() !== "weapons") return;
    installStyle();
    const imageMap = buildImageMap();
    const cards = visibleItems(data);
    const expandedCards = new Set([...grid.querySelectorAll(".loadout-card.expanded")].map((card) => card.dataset.loadoutCard));
    const count = document.querySelector("#resultCount");
    if (count) count.textContent = `${cards.length} von ${data.items.length} Meta-Waffen angezeigt`;

    if (!cards.length) {
      grid.innerHTML = `<div class="empty-state"><h3>Keine Meta-Waffe gefunden</h3><p>Versuch einen anderen Suchbegriff oder wechsel den Rollenfilter.</p></div>`;
      return;
    }

    const groupSizes = cards.reduce((sizes, item) => sizes.set(item.tier, (sizes.get(item.tier) || 0) + 1), new Map());
    let lastTier = "";
    grid.innerHTML = cards.map((item) => {
      const heading = item.tier !== lastTier ? tierHeading(item, groupSizes.get(item.tier) || 0) : "";
      lastTier = item.tier;
      return `${heading}${renderCard(item, imageMap, expandedCards)}`;
    }).join("");
  }

  function scheduleRender(delay = 0) {
    if (state.renderQueued) return;
    state.renderQueued = true;
    window.setTimeout(() => {
      state.renderQueued = false;
      window.requestAnimationFrame(render);
    }, delay);
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      if (event.target.closest("#loadoutGrid .loadout-card")) return;
      if (event.target.closest(".secondary-mode-switch .mode-button, #filterToolbar .filter-button, .content-tab[data-tab='weapons']")) scheduleRender(0);
    });
    document.addEventListener("input", (event) => {
      if (event.target.matches("#loadoutSearch, #weaponSearch")) scheduleRender(90);
    });
    document.addEventListener("change", (event) => {
      if (event.target.matches("#sortSelect")) scheduleRender(0);
    });
  }

  async function init() {
    installStyle();
    const [meta, weapons, builds] = await Promise.all([
      fetchJson(DATA_URLS.meta).catch(() => null),
      fetchJson(DATA_URLS.weapons).catch(() => null),
      fetchBuilds(),
    ]);
    state.meta = meta;
    state.weapons = weapons;
    state.builds = builds || {};
    bindEvents();
    scheduleRender(0);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
