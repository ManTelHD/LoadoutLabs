(function () {
  const roleExtraSets = {
    long: ["Plünderer", "Überlebender", "Wachsamkeit"],
    close: ["Bergsteiger", "Sprinter", "Entschlossen"],
    sniper: ["Überlebender", "Fingerfertigkeit", "Wachsamkeit"],
    support: ["Bergsteiger", "Fingerfertigkeit", "Überlebender"],
    utility: ["Bergsteiger", "Sprinter", "Überlebender"],
  };

  const nameMap = new Map([
    ["Scavenger", "Plünderer"],
    ["Survivor", "Überlebender"],
    ["Mountaineer", "Bergsteiger"],
    ["Fast Hands", "Fingerfertigkeit"],
    ["Sleight of Hand", "Fingerfertigkeit"],
    ["Sprinter", "Sprinter"],
    ["Alertness", "Wachsamkeit"],
    ["Resolute", "Entschlossen"],
    ["Tracker", "Fährtenleser"],
    ["Ghost", "Geist"],
    ["Tempered", "Gehärtet"],
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

  function getCardRole(card) {
    const text = String(card?.innerText || "").toLowerCase();
    const key = String(card?.dataset?.loadoutCard || "").toLowerCase();
    if (text.includes("sniper-unterstützung") || text.includes("sniper support") || key.includes("support")) return "support";
    if (text.includes("sniper")) return "sniper";
    if (text.includes("kurzstrecke") || text.includes("close range") || text.includes("0-")) return "close";
    if (text.includes("werfer") || text.includes("nahkampf") || text.includes("keine waffenaufsätze")) return "utility";
    return "long";
  }

  function rewriteLegacyPerkList(card, extras, role) {
    const list = card.querySelector(".perk-list");
    if (!list) return;
    const items = Array.from(list.querySelectorAll("li"));
    if (!items.length) return;
    const codeItem = items.find((item) => /^(Code|Klassen-Code):/i.test(item.textContent.trim()));
    const signature = `${role}|legacy|${extras.join("|")}|${codeItem?.textContent || ""}`;
    if (list.dataset.extraNamesSignature === signature) return;
    const nextItems = [];
    if (codeItem) nextItems.push(codeItem.textContent.replace(/^Code:/i, "Klassen-Code:"));
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
    new MutationObserver(schedulePolish).observe(grid, { childList: true, subtree: true, characterData: true });
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
