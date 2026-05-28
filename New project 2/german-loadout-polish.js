(function () {
  const directMap = new Map([
    ["BUILD CODE", "KLASSEN-CODE"],
    ["Build Code", "Klassen-Code"],
    ["MOD", "FEUERMODIFIKATION"],
    ["GRIFF", "HINTERER GRIFF"],
    ["Grip", "Griff"],
    ["Scavenger", "Plünderer"],
    ["Survivor", "Überlebender"],
    ["Mountaineer", "Bergsteiger"],
    ["Field Medic", "Feldsanitäter"],
    ["Ghost", "Geist"],
    ["Hunter", "Jäger"],
    ["Long Range", "Langstrecke"],
    ["Close Range", "Kurzstrecke"],
    ["Sniper Support", "Sniper-Unterstützung"],
    ["Assault Rifle", "Sturmgewehr"],
    ["SMG", "MP"],
    ["Smg", "MP"],
    ["Lmg", "LMG"],
    ["Marksman Rifle", "Präzisionsgewehr"],
    ["Pistol", "Pistole"],
    ["Launcher", "Werfer"],
    ["Melee", "Nahkampf"],
  ]);

  const prefixMap = new Map([
    ["Optic", "Visier"],
    ["Muzzle", "Mündung"],
    ["Barrel", "Lauf"],
    ["Underbarrel", "Unterlauf"],
    ["Magazine", "Magazin"],
    ["Rear Grip", "Hinterer Griff"],
    ["Stock", "Schaft"],
    ["Fire Mods", "Feuermodifikation"],
    ["Code", "Klassen-Code"],
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
    ["Barrel", "Lauf"],
    ["Precision Foregrip", "Präzisions-Vordergriff"],
    ["Vertical Foregrip", "Vertikaler Vordergriff"],
    ["Foregrip", "Vordergriff"],
    ["Quickdraw Grip", "Schnellziehgriff"],
    ["Ergonomic Grip", "Ergonomischer Griff"],
    ["Control Grip", "Kontrollgriff"],
    ["Grip", "Griff"],
    ["Lightweight Handstop", "Leichter Handstopper"],
    ["Handstop", "Handstopper"],
    ["Extended Mag II", "Erweitertes Magazin II"],
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
  ]);

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function replaceTerms(text, map) {
    let result = String(text || "");
    for (const [from, to] of map) result = result.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, "g"), to);
    return result;
  }

  function translate(text) {
    let result = String(text || "")
      .replace(/Aufsaetze/g, "Aufsätze")
      .replace(/geprueft/g, "geprüft")
      .replace(/verfuegbar/g, "verfügbar");
    for (const [from, to] of prefixMap) result = result.replace(new RegExp(`^${escapeRegExp(from)}:\\s*`, "i"), `${to}: `);
    result = replaceTerms(result, directMap);
    result = replaceTerms(result, phraseMap);
    return result;
  }

  function polishTextNode(node) {
    if (!node) return;
    const current = node.textContent || "";
    const next = translate(current);
    if (next !== current) node.textContent = next;
  }

  function polish(root = document) {
    root.querySelectorAll?.([
      "#loadoutGrid .attachment-list li",
      "#loadoutGrid .perk-list li",
      "#loadoutGrid .range",
      "#loadoutGrid .mode-pill",
      "#loadoutGrid .stat-row strong",
      "#loadoutGrid .details-kicker",
      "#loadoutGrid .slot-type",
      "#loadoutGrid .loadout-slot strong",
      "#loadoutGrid .build-code-box span",
      "#loadoutGrid .perk-chip strong",
      "#loadoutGrid .detail-panel-title span",
      "#contentTabs .content-tab",
      "#filterToolbar .filter-button",
      ".secondary-mode-switch .mode-button",
      ".primary-mode-switch .mode-button"
    ].join(",")).forEach(polishTextNode);
  }

  let scheduled = false;
  function schedulePolish(root = document) {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => {
      scheduled = false;
      polish(root);
    });
  }

  function watch() {
    const grid = document.querySelector("#loadoutGrid");
    if (grid && grid.dataset.germanPolishWatched !== "lite") {
      grid.dataset.germanPolishWatched = "lite";
      new MutationObserver(() => schedulePolish(grid)).observe(grid, { childList: true });
    }
  }

  function init() {
    polish();
    watch();
    window.setTimeout(() => { polish(); watch(); }, 700);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
