(function () {
  const replacements = new Map([
    ["Scavenger", "Plünderer"],
    ["Quick Fix", "Schnelle Heilung"],
    ["Survivor", "Überlebender"],
    ["Mountaineer", "Bergsteiger"],
    ["Stim Shot", "Stim-Spritze"],
    ["Smoke Grenade", "Rauchgranate"],
    ["Fast Hands", "Fingerfertigkeit"],
    ["Sleight of Hand", "Fingerfertigkeit"],
    ["Plünderer", "Plünderer"],
    ["Schnelle Heilung", "Schnelle Heilung"],
    ["Überlebenskünstler", "Überlebender"],
    ["Bergsteiger", "Bergsteiger"],
    ["Stim-Injektion", "Stim-Spritze"],
    ["Flinke Hände", "Fingerfertigkeit"],
  ]);

  function normalizeExtraName(value) {
    let result = String(value || "");
    for (const [from, to] of replacements) {
      result = result.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), to);
    }
    return result;
  }

  function polishNode(node) {
    if (!node) return;
    const current = node.textContent || "";
    const next = normalizeExtraName(current);
    if (next !== current) node.textContent = next;
  }

  function polishExtras() {
    document.querySelectorAll([
      "#loadoutGrid .perk-list li",
      "#loadoutGrid .perk-chip strong",
      "#loadoutGrid .loadout-perks li",
      "#loadoutGrid [data-extra]",
      "#loadoutGrid [data-perk]"
    ].join(",")).forEach(polishNode);
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
