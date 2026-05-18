(function () {
  const wzPerks = ["Scavenger", "Quick Fix", "Survivor"];
  const closePerks = ["Mountaineer", "Quick Fix", "Stim Shot"];
  const sniperPerks = ["Survivor", "Smoke Grenade", "Fast Hands"];
  const bo7Perks = ["Dexterity", "Fast Hands", "Tac Mask"];
  const noAttach = (slot) => [`Slot: ${slot}`, "Aufsaetze: nicht verfuegbar", "Empfehlung: Utility- oder Mobility-Setup spielen"];

  const rows = [
    ["warzone-ranked", "Ryden 45K", ["Optic: Lethal Tools ELO", "Barrel: 12\" Vienna Barrel", "Magazine: Forward Breach Mag", "Rear Grip: Eruption Grip", "Stock: MFS Full Stock+"], "DS20 Mirage", "Close-Range-SMG mit Fokus auf Mobility und Handling.", closePerks],
    ["warzone-ranked", "Sturmwolf 45", ["Optic: Lethal Tools ELO", "Muzzle: Hawker Series 45", "Barrel: Long Barrel", "Magazine: Extended Mag II", "Fire Mods: Buffer Spring"], "DS20 Mirage", "Close-Range-SMG fuer aggressive Pushes.", closePerks],
    ["warzone-ranked", "Dravec 45", ["Muzzle: Compensator", "Barrel: Ranger Barrel", "Underbarrel: Lightweight Handstop", "Magazine: Fast Mag", "Stock: Raider Stock"], "DS20 Mirage", "Close-Range-SMG fuer schnelle Entries.", closePerks],
    ["warzone-ranked", "EGRT-17", ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: Reinforced Barrel", "Underbarrel: VAS Convergence Foregrip", "Magazine: Extended Mag II"], "Kogot-7", "Long-Range-AR mit Recoil-Control.", wzPerks],
    ["warzone-ranked", "REV-46", ["Optic: Lethal Tools ELO", "Muzzle: Hawker Series 45", "Barrel: Caudal Target Barrel", "Magazine: Komodo Drum Mag", "Fire Mods: Recoil Sync Unit"], "DS20 Mirage", "Close-Range-SMG mit sauberer Zielaufnahme.", closePerks],
    ["warzone-ranked", "Maddox RFB", ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: Reinforced Long Barrel", "Underbarrel: VAS Convergence Foregrip", "Magazine: Extended Mag II"], "Kogot-7", "Long-Range-AR fuer kontrollierte Fights.", wzPerks],
    ["warzone-ranked", "Peacekeeper Mk1", ["Muzzle: Ported Compensator", "Barrel: Balanced Barrel", "Underbarrel: Precision Foregrip", "Rear Grip: Quickdraw Grip", "Stock: Agile Stock"], "Kogot-7", "Long-Range-AR mit schnellem Handling.", wzPerks, ["Peacekeeper MK1"]],
    ["warzone-ranked", "M15 MOD 0", ["Optic: Reflex ELO", "Muzzle: Compensator", "Barrel: Reinforced Long Barrel", "Underbarrel: Vertical Foregrip", "Rear Grip: Quickdraw Grip"], "Kogot-7", "Long-Range-AR mit starkem Allround-Profil.", wzPerks],
    ["warzone-ranked", "X9 Maverick", ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: Long Barrel", "Underbarrel: Vertical Foregrip", "Magazine: Extended Mag II"], "Kogot-7", "Long-Range-AR mit ruhigem Rueckstoss.", wzPerks],
    ["warzone-ranked", "M8A1", ["Muzzle: VAS 5.56 Suppressor", "Barrel: M8A1 Autostrike-X8 Conversion", "Stock: MFS Striker Tactical Stock", "Magazine: Redline Capacity Drum", "Rear Grip: K&S Raze Grip"], "Kogot-7", "Sniper-Support-Marksman-Build.", wzPerks],
    ["warzone-ranked", "Hawker HX", ["Muzzle: Monolithic Suppressor", "Barrel: Reinforced Barrel", "Stock: Precision Stock", "Rear Grip: Quickdraw Grip", "Fire Mods: Overpressured"], "Ryden 45K", "Sniper-Build fuer schnelle Long-Range-Picks.", sniperPerks],
    ["warzone-ranked", "VS Recon", ["Muzzle: Monolithic Suppressor", "Barrel: Reinforced Long Barrel", "Stock: Heavy Stock", "Rear Grip: Ergonomic Grip", "Fire Mods: Overpressured"], "Ryden 45K", "Sniper-Build mit Velocity-Fokus.", sniperPerks],
    ["bo7-ranked", "VS Recon", ["Muzzle: Monolithic Suppressor", "Barrel: Reinforced Long Barrel", "Stock: Heavy Stock", "Rear Grip: Ergonomic Grip", "Fire Mods: Overpressured"], "Dravec 45", "Sniper-Build mit Velocity-Fokus.", bo7Perks],
    ["warzone-ranked", "Swordfish A1", ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: Reinforced Barrel", "Underbarrel: Precision Foregrip", "Magazine: Extended Mag"], "Ryden 45K", "Marksman-Setup fuer Distanz.", sniperPerks],
    ["warzone-ranked", "Sokol 545", ["Optic: Greaves AccuSpot 3x", "Muzzle: Monolithic Suppressor", "Barrel: Long Barrel", "Underbarrel: Bowen Sentry Foregrip", "Rear Grip: Control Grip"], "Kogot-7", "Long-Range-LMG mit Kontrolle.", wzPerks],
    ["warzone-ranked", "RK-9", ["Optic: Lethal Tools ELO", "Muzzle: Hawker Series 45", "Barrel: Long Barrel", "Magazine: Extended Mag II", "Stock: Raider Stock"], "DS20 Mirage", "Close-Range-SMG fuer mobile Fights.", closePerks],
    ["bo7-ranked", "MPC-25", ["Muzzle: K&S Compensator", "Barrel: 14.5\" VAS Ashe Barrel", "Underbarrel: Zero Shift Handstop", "Magazine: MPC Overload Drum", "Fire Mods: Recoil Sync Unit"], "M15 MOD 0", "Close-Range-SMG mit starkem Entry-Profil.", bo7Perks],
    ["warzone-ranked", "XM325", ["Optic: Greaves AccuSpot 3x", "Muzzle: Monolithic Suppressor", "Barrel: Reinforced Long Barrel", "Underbarrel: Vertical Foregrip", "Magazine: Extended Mag"], "Kogot-7", "Long-Range-LMG als stabiler Beam.", wzPerks],
    ["warzone-ranked", "XR-3 Ion", ["Muzzle: Monolithic Suppressor", "Barrel: Long Barrel", "Stock: Precision Stock", "Rear Grip: Quickdraw Grip", "Fire Mods: Overpressured"], "Ryden 45K", "Sniper-Build mit Handling-Fokus.", sniperPerks],
    ["warzone-ranked", "Shadow SK", ["Muzzle: Monolithic Suppressor", "Barrel: Reinforced Barrel", "Stock: Heavy Stock", "Rear Grip: Ergonomic Grip", "Fire Mods: Overpressured"], "Ryden 45K", "Sniper-Build fuer kontrollierte Picks.", sniperPerks],
    ["warzone-ranked", "M34 Novaline", ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: Reinforced Barrel", "Underbarrel: Precision Foregrip", "Rear Grip: Quickdraw Grip"], "Ryden 45K", "Marksman-Setup fuer Praezision.", sniperPerks],
    ["warzone-ranked", "Warden 308", ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: Reinforced Barrel", "Underbarrel: Vertical Foregrip", "Magazine: Extended Mag"], "Ryden 45K", "Marksman-Build mit Lane-Kontrolle.", sniperPerks],
    ["warzone-ranked", "1911", ["Muzzle: Suppressor", "Barrel: Long Barrel", "Magazine: Extended Mag", "Rear Grip: Quickdraw Grip", "Fire Mods: Rapid Fire"], "DS20 Mirage", "Close-Range-Pistol-Setup.", closePerks],
    ["warzone-ranked", "CODA 9", ["Muzzle: Suppressor", "Barrel: Reinforced Barrel", "Magazine: Extended Mag", "Rear Grip: Quickdraw Grip", "Fire Mods: Rapid Fire"], "DS20 Mirage", "Close-Range-Pistol-Setup.", closePerks],
    ["warzone-ranked", "Velox 5.7", ["Muzzle: Suppressor", "Barrel: Long Barrel", "Magazine: Extended Mag", "Rear Grip: Ergonomic Grip", "Fire Mods: Rapid Fire"], "DS20 Mirage", "Close-Range-Pistol-Setup.", closePerks],
    ["warzone-ranked", "Jager 45", ["Muzzle: Suppressor", "Barrel: Reinforced Barrel", "Magazine: Extended Mag", "Rear Grip: Quickdraw Grip", "Fire Mods: Rapid Fire"], "DS20 Mirage", "Close-Range-Pistol-Setup.", closePerks, ["J\u00e4ger 45"]],
    ["bo7-ranked", "Jager 45", ["Muzzle: Suppressor", "Barrel: Reinforced Barrel", "Magazine: Extended Mag", "Rear Grip: Quickdraw Grip", "Fire Mods: Rapid Fire"], "M15 MOD 0", "Close-Range-Pistol-Setup.", bo7Perks, ["J\u00e4ger 45"]],
    ["warzone-ranked", "A.R.C. M1", noAttach("Launcher"), "Kogot-7", "Launcher: keine klassischen Waffenaufsaetze verfuegbar.", wzPerks],
    ["warzone-ranked", "Flatline MK.II", noAttach("Melee"), "DS20 Mirage", "Melee: keine klassischen Waffenaufsaetze verfuegbar.", closePerks],
    ["warzone-ranked", "AAROW 109", noAttach("Launcher"), "Kogot-7", "Launcher: keine klassischen Waffenaufsaetze verfuegbar.", wzPerks],
    ["warzone-ranked", "KNIFE", noAttach("Melee"), "DS20 Mirage", "Melee: keine klassischen Waffenaufsaetze verfuegbar.", closePerks],
    ["warzone-ranked", "Ballistic Knife", noAttach("Melee"), "DS20 Mirage", "Melee/Special: keine klassischen Waffenaufsaetze verfuegbar.", closePerks],
    ["warzone-ranked", "NX Ravager", noAttach("Special"), "Kogot-7", "Special Weapon: keine klassischen Waffenaufsaetze verfuegbar.", wzPerks],
    ["warzone-ranked", "H311-SAW", noAttach("Melee"), "DS20 Mirage", "Melee: keine klassischen Waffenaufsaetze verfuegbar.", closePerks],
    ["warzone-ranked", "GDL Havoc", noAttach("Special"), "Kogot-7", "Special Weapon: keine klassischen Waffenaufsaetze verfuegbar.", wzPerks],
    ["warzone-ranked", "Siren", noAttach("Special"), "Kogot-7", "Special Weapon: keine klassischen Waffenaufsaetze verfuegbar.", wzPerks],
    ["warzone-ranked", "Katana", noAttach("Melee"), "DS20 Mirage", "Melee: keine klassischen Waffenaufsaetze verfuegbar.", closePerks],
  ];

  const slug = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/mk\./g, "mk").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  function injectCardCleanup() {
    if (typeof document === "undefined" || document.querySelector("#meta-card-cleanup")) return;
    const style = document.createElement("style");
    style.id = "meta-card-cleanup";
    style.textContent = `
      body #loadoutGrid .loadout-card .tag-list { display: none !important; }
      body #loadoutGrid .loadout-card .stat-row span:first-child { display: none !important; }
      body #loadoutGrid .loadout-card .stat-row span:last-child { display: none !important; }
      body #loadoutGrid .loadout-card .stat-row span:only-child { display: inline-flex !important; }
    `;
    document.head.appendChild(style);
  }

  function legacyLoadouts() {
    try {
      const request = new XMLHttpRequest();
      request.open("GET", `script.js?v=${Date.now()}`, false);
      request.send(null);
      if (request.status < 200 || request.status >= 300) return [];
      const match = request.responseText.match(/const loadouts\s*=\s*(\[[\s\S]*?\]);\s*(?:window\.loadouts\s*=|const modeConfig\s*=)/);
      if (!match) return [];
      const parsed = new Function(`"use strict"; return ${match[1]};`)();
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  const extraLoadouts = rows.map(([mode, name, attachments, secondary, role, perks, aliases]) => ({
    mode,
    name,
    aliases,
    role,
    secondary,
    buildCode: "",
    attachments,
    perks,
  }));

  const byModeAndName = new Map();
  [...legacyLoadouts(), ...extraLoadouts].forEach((loadout) => {
    const names = [loadout.name, ...(loadout.aliases || [])];
    names.forEach((name) => byModeAndName.set(`${loadout.mode}:${slug(name)}`, { ...loadout, name }));
  });

  injectCardCleanup();
  window.loadouts = [...byModeAndName.values()];
}());
