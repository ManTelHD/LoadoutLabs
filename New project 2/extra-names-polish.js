(function () {
  const roleExtraSets = {
    long: ["Plünderer", "Sprinter", "Geist"],
    close: ["Bergsteiger", "Sprinter", "Jäger"],
    sniper: ["Plünderer", "Sprinter", "Jäger"],
    support: ["Feldsanitäter", "Sprinter", "Überlebender"],
    utility: ["Bergsteiger", "Sprinter", "Überlebender"],
  };

  const closeRangeKeys = new Set([
    "kogot-7", "carbon-57", "vst", "dravec-45", "ryden-45k", "sturmwolf-45",
    "mpc-25", "rev-46", "razor-9mm", "rk-9", "1911", "coda-9", "velox-57", "jager-45",
  ]);

  const sniperKeys = new Set([
    "m8a1", "hawker-hx", "vs-recon", "strider-300", "xr-3-ion", "shadow-sk", "m34-novaline",
  ]);

  const supportKeys = new Set(["mk35-isr-support"]);

  const utilityKeys = new Set([
    "arc-m1", "flatline-mkii", "aarow-109", "knife-bo7", "ballistic-knife",
    "nx-ravager", "h311-saw", "gdl-havoc", "siren", "katana",
  ]);

  const nameMap = new Map([
    ["Scavenger", "Plünderer"],
    ["Survivor", "Überlebender"],
    ["Mountaineer", "Bergsteiger"],
    ["Field Medic", "Feldsanitäter"],
    ["Ghost", "Geist"],
    ["Hunter", "Jäger"],
    ["Tempered", "Gehärtet"],
    ["Sprinter", "Sprinter"],
    ["Momentum", "Momentum"],
    ["Berserker", "Berserker"],
    ["Reactive Armor", "Reaktive Panzerung"],
    ["Adaptive", "Adaptiv"],
    ["Surveyor", "Kundschafter"],
    ["Drill Instructor", "Ausbilder"],
    ["Fast Hands", "Fingerfertigkeit"],
    ["Sleight of Hand", "Fingerfertigkeit"],
    ["Überlebenskünstler", "Überlebender"],
    ["Flinke Hände", "Fingerfertigkeit"],
  ]);

  const bannedExtras = [
    "Quick Fix",
    "Schnelle Heilung",
    "Stim Shot",
    "Stim-Spritze",
    "Stim-Injektion",
    "Smoke Grenade",
    "Rauchgranate",
  ];

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/mk\./g, "mk")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function normalizeExtraName(value) {
    let result = String(value || "");
    for (const [from, to] of nameMap) {
      result = result.replace(new RegExp(escapeRegExp(from), "g"), to);
    }
    return result;
  }

  function isBannedExtra(value) {
    return bannedExtras.some((term) => String(value || "").includes(term));
  }

  function getCardKey(card) {
    return slug(card?.dataset?.loadoutCard || card?.querySelector(".weapon-name")?.textContent || "");
  }

  function getCardRole(card) {
    const key = getCardKey(card);
    if (supportKeys.has(key)) return "support";
    if (sniperKeys.has(key)) return "sniper";
    if (closeRangeKeys.has(key)) return "close";
    if (utilityKeys.has(key)) return "utility";

    const text = slug(card?.textContent || "");
    if (text.includes("sniper-unterstutzung") || text.includes("sniper-support")) return "support";
    if (text.includes("sniper")) return "sniper";
    if (text.includes("kurzstrecke") || text.includes("close-range")) return "close";
    if (text.includes("werfer") || text.includes("nahkampf") || text.includes("keine-waffenaufsatze")) return "utility";
    return "long";
  }

  function rewriteLegacyPerkList(card, extras, role) {
    const list = card.querySelector(".perk-list");
    if (!list) return;
    const items = Array.from(list.querySelectorAll("li"));
    const codeItem = items.find((item) => /^(Code|Klassen-Code):/i.test(item.textContent.trim()));
    const codeText = codeItem?.textContent.replace(/^Code:/i, "Klassen-Code:") || "";
    const signature = `${role}|legacy|${extras.join("|")}|${codeText}`;
    if (list.dataset.extraNamesSignature === signature) return;

    const nextItems = [];
    if (codeText) nextItems.push(codeText);
    extras.forEach((extra, index) => nextItems.push(`Extra ${index + 1}: ${extra}`));
    list.innerHTML = nextItems.map((item) => `<li>${item}</li>`).join("");
    list.dataset.extraNamesSignature = signature;
  }

  function rewritePremiumPerkList(card, extras, role) {
    const list = card.querySelector(".premium-perk-list");
    if (!list) return;
    const signature = `${role}|premium|${extras.join("|")}`;
    if (list.dataset.extraNamesSignature === signature) return;
    list.innerHTML = extras.map((extra, index) => `
      <li class="perk-chip">
        <span>${index + 1}</span>
        <strong>${extra}</strong>
      </li>`).join("");
    list.dataset.extraNamesSignature = signature;
  }

  function rewritePerkLists(card) {
    const role = getCardRole(card);
    const extras = roleExtraSets[role] || roleExtraSets.long;
    rewriteLegacyPerkList(card, extras, role);
    rewritePremiumPerkList(card, extras, role);
  }

  function polishNode(node) {
    if (!node) return;
    const current = node.textContent || "";
    const next = normalizeExtraName(current);
    if (next !== current) node.textContent = next;
  }

  function polishExtras() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach(rewritePerkLists);
    document.querySelectorAll([
      "#loadoutGrid .perk-list li",
      "#loadoutGrid .premium-perk-list li",
      "#loadoutGrid .perk-chip strong",
      "#loadoutGrid .loadout-perks li",
      "#loadoutGrid [data-extra]",
      "#loadoutGrid [data-perk]"
    ].join(",")).forEach((node) => {
      polishNode(node);
      if (isBannedExtra(node.textContent)) {
        const card = node.closest(".loadout-card");
        if (card) rewritePerkLists(card);
      }
    });
  }

  let scheduled = false;
  function schedulePolish() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      polishExtras();
    });
  }

  function watchGrid() {
    const grid = document.querySelector("#loadoutGrid");
    if (!grid || grid.dataset.extraNamesPolishWatched === "true") return;
    grid.dataset.extraNamesPolishWatched = "true";
    new MutationObserver(schedulePolish).observe(grid, { childList: true, subtree: true });
  }

  function init() {
    polishExtras();
    watchGrid();
    [80, 180, 420, 900, 1800].forEach((delay) => window.setTimeout(() => {
      polishExtras();
      watchGrid();
    }, delay));
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("#loadoutGrid, .mode-button, .content-tab, .filter-button")) {
      window.setTimeout(polishExtras, 80);
      window.setTimeout(polishExtras, 240);
    }
  }, true);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
