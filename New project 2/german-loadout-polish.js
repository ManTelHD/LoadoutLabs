(function () {
  const prefixMap = new Map([
    ["Optic", "Visier"],
    ["Muzzle", "Mündung"],
    ["Barrel", "Lauf"],
    ["Underbarrel", "Unterlauf"],
    ["Magazine", "Magazin"],
    ["Rear Grip", "Hinterer Griff"],
    ["Stock", "Schaft"],
    ["Fire Mods", "Feuermodifikation"],
    ["Laser", "Laser"],
  ]);

  const termMap = new Map([
    ["Scavenger", "Plünderer"],
    ["Quick Fix", "Schnelle Heilung"],
    ["Survivor", "Überlebenskünstler"],
    ["Mountaineer", "Bergsteiger"],
    ["Stim Shot", "Stim-Injektion"],
    ["Smoke Grenade", "Rauchgranate"],
    ["Fast Hands", "Flinke Hände"],
    ["Long Range", "Langstrecke"],
    ["Close Range", "Kurzstrecke"],
    ["Sniper Support", "Sniper-Unterstützung"],
    ["Sniper", "Sniper"],
    ["Flex", "Flex"],
    ["Assault Rifle", "Sturmgewehr"],
    ["SMG", "MP"],
    ["Smg", "MP"],
    ["LMG", "LMG"],
    ["Lmg", "LMG"],
    ["Marksman Rifle", "Präzisionsgewehr"],
    ["Pistol", "Pistole"],
    ["Launcher", "Werfer"],
    ["Melee", "Nahkampf"],
    ["Special", "Spezial"],
    ["Pair", "Zweitwaffe"],
    ["Code", "Klassen-Code"],
    ["Setup", "Setup"],
    ["Details", "Details"],
    ["Meta Waffen", "Meta-Waffen"],
  ]);

  const wordMap = new Map([
    ["Compensator", "Kompensator"],
    ["Suppressor", "Schalldämpfer"],
    ["Monolithic Suppressor", "Monolithischer Schalldämpfer"],
    ["Ported Compensator", "Portierter Kompensator"],
    ["Barrel", "Lauf"],
    ["Long Barrel", "Langer Lauf"],
    ["Reinforced Barrel", "Verstärkter Lauf"],
    ["Reinforced Long Barrel", "Verstärkter langer Lauf"],
    ["Balanced Barrel", "Ausbalancierter Lauf"],
    ["Marksman Barrel", "Präzisionslauf"],
    ["Ranger Barrel", "Ranger-Lauf"],
    ["Stock", "Schaft"],
    ["Combat Stock", "Kampfschaft"],
    ["Agile Stock", "Agiler Schaft"],
    ["Raider Stock", "Raider-Schaft"],
    ["Grip", "Griff"],
    ["Foregrip", "Vordergriff"],
    ["Vertical Foregrip", "Vertikaler Vordergriff"],
    ["Precision Foregrip", "Präzisions-Vordergriff"],
    ["Quickdraw Grip", "Schnellziehgriff"],
    ["Ergonomic Grip", "Ergonomischer Griff"],
    ["Control Grip", "Kontrollgriff"],
    ["Handstop", "Handstopper"],
    ["Lightweight Handstop", "Leichter Handstopper"],
    ["Magazine", "Magazin"],
    ["Extended Mag II", "Erweitertes Magazin II"],
    ["Fast Mag", "Schnellmagazin"],
    ["Drum Mag", "Trommelmagazin"],
    ["Drum", "Trommel"],
    ["High Velocity", "Hohe Geschossgeschwindigkeit"],
    ["Overpressured", "Überdruckmunition"],
    ["Accelerated Recoil System", "Beschleunigtes Rückstoßsystem"],
    ["Buffer Spring", "Pufferfeder"],
    ["Recoil Sync Unit", "Rückstoß-Sync-Einheit"],
    ["Defense Conversion", "Verteidigungs-Umrüstung"],
  ]);

  function replaceWholeTerms(text, map) {
    let result = text;
    for (const [from, to] of map) {
      result = result.replace(new RegExp(`\\b${from.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\b`, "g"), to);
    }
    return result;
  }

  function translateAttachment(text) {
    let result = text;
    for (const [from, to] of prefixMap) {
      result = result.replace(new RegExp(`^${from.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}:\\s*`, "i"), `${to}: `);
    }
    return replaceWholeTerms(result, wordMap);
  }

  function translateLine(text) {
    let result = text
      .replace(/^Extra\s+(\d+):\s*/i, "Extra $1: ")
      .replace(/^Code:\s*/i, "Klassen-Code: ")
      .replace(/^Pair:\s*/i, "Zweitwaffe: ")
      .replace(/Aufsaetze/g, "Aufsätze")
      .replace(/geprueft/g, "geprüft")
      .replace(/verfuegbar/g, "verfügbar");

    result = translateAttachment(result);
    result = replaceWholeTerms(result, termMap);
    return result;
  }

  function polishNode(node) {
    if (!node || node.dataset.germanPolished === "true") return;
    const next = translateLine(node.textContent || "");
    if (next && next !== node.textContent) node.textContent = next;
    node.dataset.germanPolished = "true";
  }

  function polish() {
    document.querySelectorAll([
      "#loadoutGrid .attachment-list li",
      "#loadoutGrid .perk-list li",
      "#loadoutGrid .range",
      "#loadoutGrid .mode-pill",
      "#loadoutGrid .stat-row strong",
      "#loadoutGrid .details-kicker",
      "#contentTabs .content-tab",
      "#filterToolbar .filter-button",
      ".secondary-mode-switch .mode-button",
      ".primary-mode-switch .mode-button"
    ].join(",")).forEach(polishNode);
  }

  let scheduled = false;
  function schedulePolish() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      polish();
    });
  }

  function watch() {
    const grid = document.querySelector("#loadoutGrid");
    if (grid && grid.dataset.germanPolishWatched !== "true") {
      grid.dataset.germanPolishWatched = "true";
      new MutationObserver(schedulePolish).observe(grid, { childList: true, subtree: true });
    }
  }

  function init() {
    polish();
    watch();
    [150, 500, 1000, 2000].forEach((delay) => window.setTimeout(() => {
      polish();
      watch();
    }, delay));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
