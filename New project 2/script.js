const loadouts = [
  {
    tierGroup: "Meta",
    mode: "warzone-ranked",
    category: "long",
    rank: 4,
    tier: "A+",
    score: 88,
    pickRate: 18.6,
    ease: 8.0,
    name: "MK35 ISR",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S03-MK35-ISR-MAIN.webp",
    weaponClass: "Assault Rifle",
    role: "Long Range AR für kontrollierte Warzone-Beams, nach Reloaded aber spürbar schwächer auf Range.",
    secondary: "Razor 9mm",
    range: "35-95 m",
    rangeValue: 95,
    buildCode: "A12-34FK5-DRNJU-11",
    tags: ["Warzone Ranked", "Long Range", "WZStats #4", "Nerf"],
    attachments: ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: 16.5\" Greaves Bellum Barrel", "Underbarrel: VAS Convergence Foregrip", "Magazine: Bowen Siren Drum"],
    perks: ["Quick Fix", "Survivor", "Smoke Grenade"],
    patchImpact: {
      type: "nerf",
      label: "Generft",
      text: "Medium-/Minimum-Damage, Range, Upper-Torso-Multiplikator und Monolithic-Suppressor-Werte reduziert.",
    },
  },
  {
    tierGroup: "Contender",
    mode: "warzone-ranked",
    category: "close",
    rank: 3,
    tier: "A",
    score: 83,
    pickRate: 10.9,
    ease: 6.4,
    name: "Razor 9mm",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-RAZOR-9MM.webp",
    weaponClass: "SMG",
    role: "Close-Range SMG für schnelle Entries, nach Reloaded mit weniger Schaden, ADS und Recoil-Komfort.",
    secondary: "MK35 ISR",
    range: "0-24 m",
    rangeValue: 24,
    buildCode: "S03-AUXZ3-92ZB1-1",
    tags: ["Warzone Ranked", "Close Range", "Nerf 29. Apr."],
    attachments: ["Optic: Lethal Tools ELO", "Muzzle: H-9mm Precision Comp", "Barrel: 12\" MFS Sidewinder Barrel", "Magazine: Zealot Extended Mag II", "Stock: Serpent Pad"],
    perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
    patchImpact: {
      type: "nerf",
      label: "Generft",
      text: "Max-Damage gesenkt, ADS verlangsamt, Recoil erhöht und wichtige H-9mm/Sidewinder-Aufsätze abgeschwächt.",
    },
  },
  {
    tierGroup: "Meta",
    mode: "warzone-ranked",
    category: "close",
    rank: 2,
    tier: "A+",
    score: 93,
    pickRate: 13.4,
    ease: 7.6,
    name: "VST",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S03-VST-MAIN.webp",
    weaponClass: "SMG",
    role: "Season-03-SMG mit hoher Mobility, gutem Handling und starkem Close-Range-Druck.",
    secondary: "MK35 ISR",
    range: "0-25 m",
    rangeValue: 25,
    buildCode: "S09-8B5QH-UQ31",
    tags: ["Warzone Ranked", "Close Range", "WZStats #2", "New"],
    attachments: ["Muzzle: H-9mm Precision Comp", "Barrel: Longshot Vector Barrel", "Underbarrel: Zero Shift Handstop", "Magazine: Extended Mag II", "Fire Mods: MF 5.56 Defense Conversion"],
    perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
  },
  {
    tierGroup: "Contender",
    mode: "warzone-ranked",
    category: "sniper",
    rank: 7,
    tier: "A+",
    score: 90,
    pickRate: 7.9,
    ease: 7.2,
    name: "Strider 300",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-Weapons-Strider-300-Main.webp",
    weaponClass: "Sniper Rifle",
    role: "Sniper-Build für lange Picks mit starkem Bullet-Speed-Fokus.",
    secondary: "Carbon 57",
    range: "70-160 m",
    rangeValue: 160,
    buildCode: "R03-META-30011",
    tags: ["Warzone Ranked", "Sniper", "Absolute Meta"],
    attachments: ["Muzzle: Monolithic Suppressor", "Barrel: 25\" Bowen Grooved Barrel", "Magazine: Carnation Fast Mag", "Rear Grip: Hatch Quick Grip", "Fire Mods: .300 WM Overpressured"],
    perks: ["Survivor", "Smoke Grenade", "Fast Hands"],
  },
  {
    tierGroup: "Meta",
    mode: "warzone-ranked",
    category: "close",
    rank: 8,
    tier: "A",
    score: 85,
    pickRate: 11.7,
    ease: 7.0,
    name: "MPC-25",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-MPC-25.webp",
    weaponClass: "SMG",
    role: "Close-Range BO7 SMG mit starkem TTK, nach Reloaded deutlich besserer Range, Schaden und Recoil.",
    secondary: "MK35 ISR",
    range: "0-26 m",
    rangeValue: 26,
    buildCode: "S06-7YF4R-YD51",
    tags: ["Warzone Ranked", "Close Range", "WZStats A-Tier #8", "Buff"],
    attachments: ["Muzzle: K&S Compensator", "Barrel: 14.5\" VAS Ashe Barrel", "Underbarrel: Zero Shift Handstop", "Magazine: MPC Overload Drum", "Fire Mods: Recoil Sync Unit"],
    perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
    patchImpact: {
      type: "buff",
      label: "Gebufft",
      text: "Max-/Mid-Damage, Range, Lower-Torso-Multiplikator, Recoil sowie VAS-Ashe-Barrel und K&S Compensator verbessert.",
    },
  },
  {
    tierGroup: "Meta",
    mode: "warzone-ranked",
    category: "support",
    rank: 9,
    tier: "A+",
    score: 88,
    pickRate: 6.2,
    ease: 7.7,
    name: "MK35 ISR Support",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/BO7-S03-MK35-ISR-MAIN.webp",
    weaponClass: "Assault Rifle",
    role: "Sniper-Support-Variante für bewegliche Midrange-Fights.",
    secondary: "Strider 300",
    range: "12-45 m",
    rangeValue: 45,
    buildCode: "A12-9LGAJ-6F11",
    tags: ["Warzone Ranked", "Sniper Support", "Nerf 29. Apr."],
    attachments: ["Barrel: 19\" MFS Nightfall Suppressed Barrel", "Underbarrel: VAS Convergence Foregrip", "Magazine: Gen-X04 Extended Mag", "Rear Grip: Verdugo Brigand Grip", "Stock: Bowen ST-Move Stock"],
    perks: ["Quick Fix", "Survivor", "Smoke Grenade"],
    patchImpact: {
      type: "nerf",
      label: "Generft",
      text: "MK35-ISR-Grundwerte wurden reduziert; Support-Build bleibt spielbar, verliert aber Range-Druck.",
    },
  },
  {
    tierGroup: "Absolute Meta",
    mode: "warzone-ranked",
    category: "long",
    rank: 1,
    tier: "S",
    score: 99,
    pickRate: 16.2,
    ease: 8.7,
    name: "MK.78",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-LMG-MK-78.webp",
    weaponClass: "Light Machine Gun",
    role: "WZStats #1 Langstrecke: sehr stabiles LMG mit starkem Damage-Profil und sauberem Recoil fuer Ranked-Resurgence.",
    secondary: "Kogot-7",
    range: "35-95 m",
    rangeValue: 95,
    buildCode: "WZStats Loadout",
    tags: ["Warzone Ranked", "Long Range", "WZStats #1", "Buff"],
    attachments: ["Optic: Greaves AccuSpot 3x", "Barrel: 22\" Impulse HB-762 Barrel", "Underbarrel: Bowen Sentry Foregrip", "Rear Grip: Fleet-G2 Grip", "Fire Mods: Accelerated Recoil System"],
    perks: ["Scavenger", "Quick Fix", "Survivor"],
    patchImpact: {
      type: "buff",
      label: "Gebufft",
      text: "WZStats listet MK.78 aktuell als #1 Langstrecke; der Build ist die erste Wahl fuer stabile Long-Range-Fights.",
    },
  },
  {
    tierGroup: "Contender",
    mode: "warzone-ranked",
    category: "long",
    rank: 8,
    tier: "A",
    score: 86,
    pickRate: 7.2,
    ease: 8.1,
    name: "MXR-17",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-MXR-17.webp",
    weaponClass: "Assault Rifle",
    role: "WZStats A-Tier #8 Langstrecke: weiterhin spielbar und gebufft, aber aktuell nicht mehr vor MK.78, DS20 oder Voyak.",
    secondary: "Kogot-7",
    range: "30-80 m",
    rangeValue: 80,
    buildCode: "WZStats Loadout",
    tags: ["Warzone Ranked", "Long Range", "WZStats A-Tier #8", "Buff"],
    attachments: ["Optic: EAM XL Reflex", "Muzzle: Monolithic Suppressor", "Barrel: 17\" Greaves Scourge Barrel", "Magazine: Rhodes Drum Mag", "Stock: Winch Stock"],
    perks: ["Scavenger", "Quick Fix", "Survivor"],
    patchImpact: {
      type: "buff",
      label: "Gebufft",
      text: "MXR-17 wurde gebufft, steht bei WZStats aktuell aber nur im A-Tier als #8 Langstrecke.",
    },
  },
  {
    tierGroup: "Absolute Meta",
    mode: "warzone-ranked",
    category: "long",
    rank: 2,
    tier: "S",
    score: 96,
    pickRate: 14.2,
    ease: 8.5,
    name: "DS20 Mirage",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-DS20-MIRAGE.webp",
    weaponClass: "Assault Rifle",
    role: "Gebuffte Long-Range-AR mit stärkerem Mid-/Minimum-Damage, besserem Headshot-Wert und mehr Bullet Velocity in BR/Resurgence.",
    secondary: "Kogot-7",
    range: "32-90 m",
    rangeValue: 90,
    buildCode: "WZStats Loadout",
    tags: ["Warzone Ranked", "Long Range", "WZStats #2", "Buff 29. Apr."],
    attachments: ["Optic: EAM XL Reflex", "Muzzle: Monolithic Suppressor", "Barrel: 17.1\" Abdicator Barrel", "Magazine: Griffon Reserve Extended II", "Rear Grip: A1-C Control Grip"],
    perks: ["Scavenger", "Quick Fix", "Survivor"],
    patchImpact: {
      type: "buff",
      label: "Gebufft",
      text: "Medium-/Minimum-Damage, Headshot- und Lower-Body-Multiplikatoren sowie Bullet Velocity und mehrere Range-/Recoil-Aufsätze verbessert.",
    },
  },
  {
    tierGroup: "Absolute Meta",
    mode: "warzone-ranked",
    category: "close",
    rank: 1,
    tier: "S",
    score: 97,
    pickRate: 12.8,
    ease: 7.8,
    name: "Kogot-7",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/COD-BO7-SMG-KOGOT-7.webp",
    weaponClass: "SMG",
    role: "Warzone-Meta-SMG mit sehr starker Mobility und schneller TTK, nach Reloaded aber weniger stabil über Recoil-/Range-Aufsätze.",
    secondary: "DS20 Mirage",
    range: "0-22 m",
    rangeValue: 22,
    buildCode: "WZStats Loadout",
    tags: ["Warzone Ranked", "Close Range", "WZStats #1", "Nerf 29. Apr."],
    attachments: ["Muzzle: Hawker Series 45", "Barrel: 8.5\" Targil Hock-XR Barrel", "Underbarrel: EAM Steady-90 Grip", "Magazine: Vex Expanse Mag", "Fire Mods: Buffer Spring"],
    perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
    patchImpact: {
      type: "nerf",
      label: "Generft",
      text: "Long Barrel und mehrere Recoil-Aufsätze wurden reduziert; aktuelle Meta-Listen führen Kogot-7 trotzdem weiter als Meta-SMG.",
    },
  },
  {
    tierGroup: "Meta",
    mode: "warzone-ranked",
    category: "close",
    rank: 8,
    tier: "A+",
    score: 91,
    pickRate: 6.4,
    ease: 7.9,
    name: "Carbon 57",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-CARBON-57.webp",
    weaponClass: "SMG",
    role: "WZStats #3 Kurzstrecke: mobile SMG-Option mit starkem Handling und solidem TTK fuer aggressive Pushes.",
    secondary: "Maddox RFB",
    range: "0-24 m",
    rangeValue: 24,
    buildCode: "S05-6U1FK-1551",
    tags: ["Warzone Ranked", "Close Range", "WZStats #3", "Buff"],
    attachments: ["Barrel: 14\" Rockleigh Barrel", "Underbarrel: Vitalize Handstop", "Magazine: Compact-246 Fast Mag", "Rear Grip: Bombus Quick Grip", "Fire Mods: Accelerated Recoil System"],
    perks: ["Mountaineer", "Quick Fix", "Stim Shot"],
    patchImpact: {
      type: "new",
      label: "Neuer Aufsatz",
      text: "Carbon 57 Fabricator Mag kommt als Weekly-Challenge-Reward und öffnet einen neuen aggressiven Magazin-Build.",
    },
  },
  {
    tierGroup: "Contender",
    mode: "warzone-ranked",
    category: "long",
    rank: 10,
    tier: "A",
    score: 85,
    pickRate: 4.9,
    ease: 8.2,
    name: "AK-27",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-AK-27.webp",
    weaponClass: "Assault Rifle",
    role: "BO7 AR für Spieler, die Recoil-Kontrolle und Range bevorzugen.",
    secondary: "Kogot-7",
    range: "30-85 m",
    rangeValue: 85,
    buildCode: "A02-2JD6P-CPNP9-QY11",
    tags: ["Warzone Ranked", "Long Range", "AR"],
    attachments: ["Muzzle: EMT3 Compensator", "Barrel: 18.2\" Vostok Extended Barrel", "Underbarrel: Ironhold Angled Grip", "Rear Grip: Garin Advanced Grip", "Fire Mods: 7.62 Soviet Overpressured"],
    perks: ["Perk Greed", "Mute Field", "Dexterity"],
  },
  {
    tierGroup: "Absolute Meta",
    mode: "bo7-ranked",
    category: "ar",
    rank: 1,
    tier: "S",
    score: 97,
    pickRate: 0,
    ease: 8.6,
    name: "M15 MOD 0",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-M15-MOD-0.webp",
    weaponClass: "Assault Rifle",
    role: "Main-AR für Ranked mit starkem Allround-Profil, sauberem Recoil und Objective-Kontrolle.",
    secondary: "Dravec 45",
    range: "18-55 m",
    rangeValue: 55,
    buildCode: "BO7-R-M15-CTRL",
    tags: ["BO7 Ranked", "AR", "Main AR"],
    attachments: ["Optic: Reflex ELO", "Muzzle: Compensator", "Barrel: Reinforced Long Barrel", "Underbarrel: Vertical Foregrip", "Rear Grip: Quickdraw Grip"],
    perks: ["Dexterity", "Fast Hands", "Tac Mask"],
  },
  {
    tierGroup: "Absolute Meta",
    mode: "bo7-ranked",
    category: "smg",
    rank: 2,
    tier: "S",
    score: 95,
    pickRate: 0,
    ease: 8.1,
    name: "Dravec 45",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-SMG-DRAVEC-45.webp",
    weaponClass: "SMG",
    role: "Entry-SMG für Breaks und schnelle Trades mit sehr niedrigem Recoil.",
    secondary: "M15 MOD 0",
    range: "0-22 m",
    rangeValue: 22,
    buildCode: "BO7-R-DRAVEC-ENTRY",
    tags: ["BO7 Ranked", "SMG", "Entry"],
    attachments: ["Muzzle: Compensator", "Barrel: Ranger Barrel", "Underbarrel: Lightweight Handstop", "Magazine: Fast Mag", "Stock: Raider Stock"],
    perks: ["Dexterity", "Fast Hands", "Flak Jacket"],
  },
  {
    tierGroup: "Meta",
    mode: "bo7-ranked",
    category: "flex",
    rank: 3,
    tier: "A+",
    score: 92,
    pickRate: 0,
    ease: 7.5,
    name: "Peacekeeper MK1",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-PEACEKEEPER-MK1.webp",
    weaponClass: "Assault Rifle",
    role: "Flex-AR für Spieler, die AR-Range mit schnellerem Handling verbinden wollen.",
    secondary: "Dravec 45",
    range: "12-42 m",
    rangeValue: 42,
    buildCode: "BO7-R-PK-FLEX",
    tags: ["BO7 Ranked", "Flex", "AR"],
    attachments: ["Muzzle: Ported Compensator", "Barrel: Balanced Barrel", "Underbarrel: Precision Foregrip", "Rear Grip: Quickdraw Grip", "Stock: Agile Stock"],
    perks: ["Dexterity", "Fast Hands", "Tac Mask"],
  },
  {
    tierGroup: "Meta",
    mode: "bo7-ranked",
    category: "ar",
    rank: 4,
    tier: "A+",
    score: 91,
    pickRate: 0,
    ease: 8.8,
    name: "MXR-17",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-MXR-17.webp",
    weaponClass: "Assault Rifle",
    role: "Anchor-AR mit hoher Genauigkeit und Reichweite, durch Reloaded-Buff stärker für Lanes und Crossfire.",
    secondary: "Dravec 45",
    range: "25-60 m",
    rangeValue: 60,
    buildCode: "BO7-R-MXR-ANCHOR",
    tags: ["BO7 Ranked", "AR", "Buff 29. Apr."],
    attachments: ["Optic: Reflex ELO", "Muzzle: Compensator", "Barrel: Reinforced Barrel", "Underbarrel: Precision Foregrip", "Rear Grip: Ergonomic Grip"],
    perks: ["Flak Jacket", "Fast Hands", "Tac Mask"],
    patchImpact: {
      type: "buff",
      label: "Gebufft",
      text: "Max-/Minimum-Damage steigen in allen Modi; Bullet Velocity und mehrere Aufsätze wurden in BR/Resurgence verbessert.",
    },
  },
  {
    tierGroup: "Contender",
    mode: "bo7-ranked",
    category: "ar",
    rank: 5,
    tier: "A",
    score: 88,
    pickRate: 0,
    ease: 7.9,
    name: "AK-27",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/navigation/COD-BO7-AR-AK-27.webp",
    weaponClass: "Assault Rifle",
    role: "Power-AR für kontrollierte Pre-Aims, braucht aber bessere Recoil-Disziplin.",
    secondary: "Kogot-7",
    range: "20-58 m",
    rangeValue: 58,
    buildCode: "BO7-R-AK27-HOLD",
    tags: ["BO7 Ranked", "AR", "Power"],
    attachments: ["Muzzle: Compensator", "Barrel: Extended Barrel", "Underbarrel: Angled Foregrip", "Rear Grip: Advanced Grip", "Fire Mods: Overpressured"],
    perks: ["Flak Jacket", "Fast Hands", "Tac Mask"],
  },
  {
    tierGroup: "Contender",
    mode: "bo7-ranked",
    category: "smg",
    rank: 6,
    tier: "A",
    score: 86,
    pickRate: 0,
    ease: 7.6,
    name: "Kogot-7",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/weapons-matrix/weapons/COD-BO7-SMG-KOGOT-7.webp",
    weaponClass: "SMG",
    role: "Aggressive SMG für sehr schnelle Breaks, mit kürzerer Range als Dravec 45.",
    secondary: "M15 MOD 0",
    range: "0-20 m",
    rangeValue: 20,
    buildCode: "BO7-R-KOGOT-RUSH",
    tags: ["BO7 Ranked", "SMG", "Rush"],
    attachments: ["Muzzle: Hawker Series 45", "Barrel: 13.5\" Canis-05 Barrel", "Underbarrel: EAM Steady-90 Grip", "Magazine: Fortune Extended Mag", "Fire Mods: Buffer Spring"],
    perks: ["Dexterity", "Fast Hands", "Lightweight"],
  },
];

const modeConfig = {
  "warzone-ranked": {
    title: "Warzone Ranked Meta Tierlist",
    description: "Suche nach Warzone-Ranked-Waffen, Klasse oder Rolle. Die Liste zeigt Meta-Stufen, Pick-Rate, Handhabung, Code und Aufsätze.",
    season: "Apr. 2026",
    filters: [
      ["all", "Alle"],
      ["long", "Long Range"],
      ["close", "Close Range"],
      ["sniper", "Sniper"],
      ["support", "Sniper Support"],
    ],
  },
  "bo7-ranked": {
    title: "Black Ops 7 Ranked Meta Tierlist",
    description: "Ranked-Setups für Black Ops 7 Multiplayer mit AR-, SMG- und Flex-Rollen, passenden Aufsätzen und Extra-Slots.",
    season: "Apr. 2026",
    filters: [
      ["all", "Alle"],
      ["ar", "Assault Rifle"],
      ["smg", "SMG"],
      ["flex", "Flex"],
    ],
  },
};

const mapData = {
  "warzone-ranked": {
    title: "Warzone Ranked Maps",
    kicker: "Resurgence Ranked Rotation",
    description: "Season 03 rotiert Warzone Ranked gleichmäßig zwischen zwei Resurgence-Maps. Beide Maps können pro Match ausgewählt werden.",
    notes: [
      "Prozentwerte sind Loadout-Lab-Schätzungen für Hot Drops, nicht offizielle Activision-Statistiken.",
      "Haven's Hollow und Rebirth Island rotieren laut Season-03-Patch Notes gleichmäßig.",
      "Spiel früh auf Buy-Station-Kontrolle, weil Resurgence-Ranked oft über Cash, UAVs und Re-Entry-Timing entschieden wird.",
      "Halte immer einen Exit-Plan für Zone 3 bereit: Rotationen sind wichtiger als späte Ego-Challenges.",
    ],
    groups: [
      {
        mode: "Resurgence Ranked",
        maps: ["Haven's Hollow", "Rebirth Island"],
        focus: "Trios-Ranked mit schnellem Tempo, Rotationsdruck und starkem Utility-Wert.",
      },
    ],
  },
  "bo7-ranked": {
    title: "Black Ops 7 Ranked Maps & Modi",
    kicker: "CDL Ranked Pool",
    description: "BO7 Ranked nutzt kompetitive Map/Mode-Kombinationen. Season 3 basiert auf Hardpoint, Search & Destroy und Overload.",
    notes: [
      "Prozentwerte sind Loadout-Lab-Schätzungen für First-Rotate-Traffic, nicht offizielle Activision-Statistiken.",
      "Vor jedem Ranked Match werden drei Map/Mode-Kombinationen vorgestellt; beide Teams können je eine Option vetoen.",
      "Hardpoint verlangt saubere Hill-Rotationen, Search & Destroy klare Trades, Overload schnelle Ball- und Spawn-Kontrolle.",
      "Den und Scar sind besonders wichtig, weil sie in mehreren Modi im Pool liegen.",
    ],
    groups: [
      {
        mode: "Hardpoint",
        maps: ["Cliff Town", "Colossus", "Den", "Gridlock", "Sake", "Scar"],
        focus: "Rotationen, Break-Timing und Trophy/Utility-Management.",
      },
      {
        mode: "Search & Destroy",
        maps: ["Den", "Fringe", "Gridlock", "Plaza", "Raid", "Scar"],
        focus: "First Bloods, Info-Spiel und sichere Trades.",
      },
      {
        mode: "Overload",
        maps: ["Den", "Exposure", "Scar"],
        focus: "Ball-Control, schnelle Cuts und Spawn-Druck.",
      },
    ],
  },
};

const mapImages = {
  "Haven's Hollow": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/wz/s01/havens_hollow.png",
  "Rebirth Island": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/warzone/rebirth-island/WZ_RBI_GUIDE_001.webp",
  "Cliff Town": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-02/cliff-town/BO7_MP_Cliff_Town_001.webp",
  Colossus: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/colossus/BO7_Colossus_003.webp",
  Den: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/den/BO7_Den_001.webp",
  Gridlock: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-03/mp/gridlock/BO7-Gridlock-001.webp",
  Sake: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-02/sake/BO7_SAKE_001.webp",
  Scar: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/scar/BO7_Scar_003.webp",
  Fringe: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-01/maps/fringe/BO7_S01_Fringe_001.webp",
  Plaza: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-03/mp/plaza/BO7-Plaza-001.webp",
  Raid: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/raid/BO7_Raid_003.webp",
  Exposure: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/exposure/COD-BO7-MAPS-CORE-EXPOSURE-TOUT.webp",
};

const tacMapImages = {
  "Rebirth Island": "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/warzone/rebirth-island/WZ_RBI_GUIDE_002.webp",
  Colossus: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/colossus/Colossus_Tac_Map_BLANK.webp",
  Den: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/den/Den_Tac_Map_BLANK.webp",
  Gridlock: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-03/mp/gridlock/Gridlock_Tac_Map_BLANK.webp",
  Sake: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-02/sake/Sake_Tac_Map_BLANK.webp",
  Scar: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/scar/Scar_Tac_Map_BLANK.webp",
  Plaza: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/season-03/mp/plaza/Plaza_Tac_Map_BLANK.webp",
  Raid: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/raid/Raid_Tac_Map_BLANK.webp",
  Exposure: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/guides/games/blackops7/exposure/Exposure_Tac_Map_BLANK.webp",
};

const tacMapTiles = {
  "Haven's Hollow": {
    template: "https://www.callofduty.com/cdn/blog/guides/maps/wz/havens-hollow/baselayer/v1/tiles/2/{x}/{y}.webp",
    size: 4,
    frame: "wide",
  },
  "Rebirth Island": {
    template: "https://www.callofduty.com/cdn/blog/guides/maps/wz/rebirth-island/baselayer/v1/tiles/2/{x}/{y}.webp",
    size: 4,
    frame: "wide",
  },
};

const mapPois = {
  "Haven's Hollow": [["Mansion", 18], ["Research Center", 16], ["Coal Depot", 14], ["Lumbermill", 13], ["Main Street", 12], ["Barn", 11], ["Train Station", 10], ["River Boat", 9], ["Pond", 7]],
  "Rebirth Island": [["Prison", 21], ["Living Quarters", 15], ["Control Center", 13], ["Harbor", 11], ["Chemical Eng.", 10], ["Headquarters", 9], ["Bioweapons", 8], ["Stronghold", 7], ["Factory", 6], ["Industries", 5], ["Dock", 4], ["Turbine", 3]],
  "Cliff Town": [["Market", 31], ["Cliff House", 26], ["Courtyard", 23], ["Back Alley", 20]],
  Colossus: [["Main Deck", 29], ["Engine Lane", 25], ["Bridge", 24], ["Lower Hall", 22]],
  Den: [["Mid Cave", 32], ["Warehouse", 25], ["Back Spawn", 22], ["Outer Lane", 21]],
  Gridlock: [["Center Street", 34], ["Garage", 24], ["Office", 22], ["Back Lot", 20]],
  Sake: [["Bar", 30], ["Kitchen", 26], ["Garden", 23], ["Alley", 21]],
  Scar: [["Bunker", 31], ["Radar", 27], ["Trench", 22], ["Cliff Path", 20]],
  Fringe: [["Barn", 30], ["Tracks", 26], ["Street", 23], ["Back Field", 21]],
  Plaza: [["Nightclub", 33], ["Courtyard", 25], ["Lobby", 23], ["Parking", 19]],
  Raid: [["Basketball", 29], ["Kitchen", 26], ["Pool", 24], ["Garage", 21]],
  Exposure: [["Lab", 32], ["Hangar", 25], ["Cliff", 22], ["Service Tunnel", 21]],
};

const mapPoiMarkers = {
  "Haven's Hollow": [
    ["Barn", 47.9, 41.6],
    ["Coal Depot", 69.1, 57],
    ["Lumbermill", 61.7, 66.6],
    ["Main Street", 37.7, 59.4],
    ["Mansion", 49.7, 27.6],
    ["Pond", 31.7, 28.9],
    ["Research Center", 76.3, 39.7],
    ["River Boat", 48, 68.7],
    ["Train Station", 22.9, 40.5],
  ],
  "Rebirth Island": [
    ["Bioweapons", 71.8, 23.6],
    ["Chemical Eng.", 72.5, 38.4],
    ["Control Center", 36.6, 52.3],
    ["Dock", 35.3, 42.3],
    ["Factory", 55.8, 65.9],
    ["Harbor", 68.7, 49.4],
    ["Headquarters", 46.9, 59.9],
    ["Industries", 63.5, 32.4],
    ["Living Quarters", 41.9, 69.4],
    ["Prison", 52.2, 49.5],
    ["Stronghold", 22.4, 73],
    ["Turbine", 51.7, 32.6],
  ],
};

const camos = [
  {
    name: "Strict",
    category: "Weapon Prestige",
    status: "Prestige 1",
    weapon: "Strider 300",
    note: "Prestige-Camo für die Strider 300. Gut als Showcase-Camo für Sniper-Loadouts.",
    pattern: "linear-gradient(135deg, #071412, #0aa99a 34%, #1f2f32 35% 52%, #0aa99a 53%, #101415)",
  },
  {
    name: "Pastel",
    category: "Weapon Prestige",
    status: "Prestige 2",
    weapon: "Strider 300",
    note: "Helle Pink/White-Camo mit auffälligem Look für Clips und Inspect-Screens.",
    pattern: "radial-gradient(circle at 25% 28%, #ffb9d7 0 12%, transparent 13%), radial-gradient(circle at 72% 54%, #f5f2e9 0 16%, transparent 17%), linear-gradient(135deg, #f6bfd1, #f7edf2)",
  },
  {
    name: "Vivid Wave",
    category: "Weapon Prestige",
    status: "Prestige Max",
    weapon: "Strider 300",
    note: "Animierter Max-Prestige-Look. Als Premium-Mastery-Ziel markiert.",
    pattern: "linear-gradient(115deg, #100b17, #4b1d7a 22%, #167a67 43%, #e6d54a 62%, #76210d 82%, #090909)",
  },
  {
    name: "Gold",
    category: "Mastery",
    status: "Mastery",
    weapon: "Alle Waffen",
    note: "Klassisches Ziel für abgeschlossene Camo-Grinds einer Waffe.",
    pattern: "linear-gradient(135deg, #5f4514, #ffcd4d 35%, #8a651d 56%, #fff0a3 72%, #6f4c10)",
  },
  {
    name: "Diamond",
    category: "Mastery",
    status: "Class Clear",
    weapon: "Waffenklasse",
    note: "Für Spieler, die eine komplette Waffenklasse sichtbar abschließen wollen.",
    pattern: "linear-gradient(135deg, #c9f6ff, #ffffff 28%, #7ec9e6 50%, #eefcff 72%, #8cc9df)",
  },
  {
    name: "Dark Matter",
    category: "Mastery",
    status: "Endgame",
    weapon: "Account Grind",
    note: "Endgame-Camo für Completionists. Im Tab als höchstes Langzeit-Ziel geführt.",
    pattern: "radial-gradient(circle at 20% 30%, #8c3bff, transparent 24%), radial-gradient(circle at 70% 62%, #00d4ff, transparent 22%), linear-gradient(135deg, #05050b, #171126 45%, #05050b)",
  },
];

const camoGroups = [
  ["Warzone", "Military", ["Autumn", "Arctic", "Forest Digital", "Balsam", "Arid", "Oil", "Snowcap", "Hunter", "Sapphire Snake"], "Basis-Tarnungen über Eliminierungen in Warzone."],
  ["Warzone", "Special", ["Shimmer", "Tyrant", "Trace"], "Spezial-Tarnungen mit waffenspezifischen Mini-Challenges."],
  ["Warzone", "Mastery", ["Golden Damascus", "Starglass", "Absolute Zero", "Apocalypse"], "Warzone-Mastery-Grind bis zur finalen Apocalypse-Tarnung."],
  ["Multiplayer", "Military", ["Underbrush", "Woodland", "Slate Digital", "Redwood", "Poison", "Toxic", "Mountain", "Stalker", "Ruby Snake"], "Multiplayer-Basis-Tarnungen über Kill-Meilensteine."],
  ["Multiplayer", "Special", ["Diamondback", "Raptor", "Mainframe"], "Spezial-Tarnungen nach Abschluss aller Multiplayer-Military-Camos."],
  ["Multiplayer", "Mastery", ["Shattered Gold", "Arclight", "Tempest", "Singularity"], "Die vier großen Multiplayer-Mastery-Stufen."],
  ["Zombies", "Military", ["Char", "Tundra", "Flood Digital", "Cedar", "Marshland", "Mire", "Ravine", "Skulk", "Emerald Snake"], "Zombies-Basis-Tarnungen über Eliminierungen."],
  ["Zombies", "Special", ["Mutilate", "Slither", "Pathfinder"], "Spezial-Tarnungen für Pack-a-Punch-, Armor- und No-Damage-Challenges."],
  ["Zombies", "Mastery", ["Golden Dragon", "Bloodstone", "Doomsteel", "Infestation"], "Die Zombies-Mastery-Leiter bis Infestation."],
  ["Endgame", "Military", ["Foliage", "Desert", "City Digital", "Pine", "Forest", "Sludge", "Plateau", "Nocturne", "Topaz Snake"], "Co-Op/Endgame-Basis-Tarnungen über Kill-Meilensteine."],
  ["Endgame", "Special", ["Cinder", "Caiman", "Network"], "Spezial-Tarnungen für Co-Op- und Endgame-Aufgaben."],
  ["Endgame", "Mastery", ["Molten Gold", "Moonstone", "Chroma Flux", "Genesis"], "Endgame-Mastery-Camos aus Co-Op Campaign und Endgame."],
];

const camoImages = {
  "Warzone|Autumn": "https://img.game8.co/4358116/c38c7435d0c481cf4b63bbf730e70e17.png/show",
  "Warzone|Arctic": "https://img.game8.co/4358111/74f65c79a1e65aaa773faa4a8f064bbb.png/show",
  "Warzone|Forest Digital": "https://img.game8.co/4358353/182194cf9ae940ff3bbd1ece565657e8.png/show",
  "Warzone|Balsam": "https://img.game8.co/4358108/433f3d446cb694dc78184ac3eeae18b0.png/show",
  "Warzone|Arid": "https://img.game8.co/4358112/55834774f6a44179e05947171af9b487.png/show",
  "Warzone|Oil": "https://img.game8.co/4358117/f253e5a19b78907d4a96d70eb4ea6a5b.png/show",
  "Warzone|Snowcap": "https://img.game8.co/4358120/d5f053e58fd6cee602a1d546110ddc4c.png/show",
  "Warzone|Hunter": "https://img.game8.co/4358118/ba8d3102c54fe80b19eda3bb4768673d.png/show",
  "Warzone|Sapphire Snake": "https://img.game8.co/4358122/ea068220e7ff88237216e44e136bd15a.png/show",
  "Warzone|Shimmer": "https://img.game8.co/4358121/4f71fe1e153f375d83dea3a66defd61d.png/show",
  "Warzone|Tyrant": "https://img.game8.co/4358124/081e26c3e7fdaf321b2579447af647c9.png/show",
  "Warzone|Trace": "https://img.game8.co/4358123/de48968a2a1358d4f4424afd7793da28.png/show",
  "Warzone|Golden Damascus": "https://img.game8.co/4358113/6c1a9c0d93df8a2e026d5274474390b8.png/show",
  "Warzone|Starglass": "https://img.game8.co/4358119/8df46df52c71322f3f092f4ce5c25de8.png/show",
  "Warzone|Absolute Zero": "https://img.game8.co/4358106/d9ddaac64ef230b11ef671d7670faf62.png/show",
  "Warzone|Apocalypse": "https://img.game8.co/4358100/2e9968806fedb2a1004df801e79e265e.png/show",
  "Multiplayer|Underbrush": "https://img.game8.co/4333833/f55514550e914149556cfd87207ea811.png/show",
  "Multiplayer|Woodland": "https://img.game8.co/4333841/e5a69f2db1e35a0224c4a60cd93acce4.png/show",
  "Multiplayer|Slate Digital": "https://img.game8.co/4333823/668ca81a20e60be09c2332c33d331ef7.png/show",
  "Multiplayer|Redwood": "https://img.game8.co/4333828/a030c7940b6665d82e72e0795bfeb449.png/show",
  "Multiplayer|Poison": "https://img.game8.co/4333845/32117414aee5b6e0b954462777da5245.png/show",
  "Multiplayer|Toxic": "https://img.game8.co/4333846/375126527d1037dd5f0fb7b52c8e21fb.png/show",
  "Multiplayer|Mountain": "https://img.game8.co/4333843/589c60d9777b8b155026ec012ea06f17.png/show",
  "Multiplayer|Stalker": "https://img.game8.co/4333844/622884d6da61137b69bc7442ef6095f4.png/show",
  "Multiplayer|Ruby Snake": "https://img.game8.co/4333832/8941dfa5ca48f5fb50cc4f115ee42631.png/show",
  "Multiplayer|Diamondback": "https://img.game8.co/4333851/d14cc39dcd1ca1abc9d10cdb45c1df33.png/show",
  "Multiplayer|Raptor": "https://img.game8.co/4333842/4aef18be1c02ef20ca461f2c30ff22e4.png/show",
  "Multiplayer|Mainframe": "https://img.game8.co/4333834/4ac596ef5a5f90e1a924eae67fe83de9.png/show",
  "Multiplayer|Shattered Gold": "https://img.game8.co/4331954/e61d5df0d6b7faff20e7df13043eb871.png/show",
  "Multiplayer|Arclight": "https://img.game8.co/4331951/2b8c67e339a8cf6eabedf3907113702d.png/show",
  "Multiplayer|Tempest": "https://img.game8.co/4331953/b0b52bfb3c333dc426542e6d425ffbb3.png/show",
  "Multiplayer|Singularity": "https://img.game8.co/4331949/0384c9a4061b718fe7f13c9539eb8245.png/show",
  "Zombies|Char": "https://img.game8.co/4333831/b6f345b3144c57a38ec37b224f0947e8.png/show",
  "Zombies|Tundra": "https://img.game8.co/4333830/9ba8cd463840da29bee41eee5b95b532.png/show",
  "Zombies|Flood Digital": "https://img.game8.co/4333824/dc726bab9314d2070cc3deffbc18ae3e.png/show",
  "Zombies|Cedar": "https://img.game8.co/4333848/8ee4c7033811b866f3b8422b216e5846.png/show",
  "Zombies|Marshland": "https://img.game8.co/4333854/c600916f0556d02da51faef5951e9104.png/show",
  "Zombies|Mire": "https://img.game8.co/4333826/b4467216fa7bb9688457e15ee008e1e6.png/show",
  "Zombies|Ravine": "https://img.game8.co/4333840/a12ec400ba56f299c3acaac989863da0.png/show",
  "Zombies|Skulk": "https://img.game8.co/4333853/a8e77bea845d9a4cecf1cf86addca3ce.png/show",
  "Zombies|Emerald Snake": "https://img.game8.co/4333852/8cd0e7ff6ab218bc4aeadb3e4b100311.png/show",
  "Zombies|Mutilate": "https://img.game8.co/4333825/812f1d5382910b5688a987546d2fef02.png/show",
  "Zombies|Slither": "https://img.game8.co/4333857/e7798b808ce429ce7681f8a18c4865d6.png/show",
  "Zombies|Pathfinder": "https://img.game8.co/4333835/3593d0859612d1b5bdb6c34a3d44484e.png/show",
  "Zombies|Golden Dragon": "https://img.game8.co/4331955/b0100461cbc2ba038ed13fb45cd79d9b.png/show",
  "Zombies|Bloodstone": "https://img.game8.co/4331948/53f4a5fa822fe39fe9d1bd017ebd817c.png/show",
  "Zombies|Doomsteel": "https://img.game8.co/4331950/10df88989804b2a50218d8047bfc0385.png/show",
  "Zombies|Infestation": "https://img.game8.co/4331945/173e547bf7e082eccf3f07d061fc2b2c.png/show",
  "Endgame|Foliage": "https://img.game8.co/4333817/38fe28caa1da58cd169cc2aaba20b4eb.png/show",
  "Endgame|Desert": "https://img.game8.co/4333816/d1c9b78a5c586536842c1a867ad86e1b.png/show",
  "Endgame|City Digital": "https://img.game8.co/4333819/5a602d46c9582b5748cde1f576426a81.png/show",
  "Endgame|Pine": "https://img.game8.co/4333818/bfbd3d327f460efd7408e2dfaf305dcb.png/show",
  "Endgame|Forest": "https://img.game8.co/4333839/507943476c0d0afdeaa5e0582b44eb56.png/show",
  "Endgame|Sludge": "https://img.game8.co/4333827/6e5c205c9c42b3a482a805b2daff142c.png/show",
  "Endgame|Plateau": "https://img.game8.co/4333829/58c190a245e7d7ac5b058c59430a4798.png/show",
  "Endgame|Nocturne": "https://img.game8.co/4333822/d35be8b54f1689848eb10e9534129a55.png/show",
  "Endgame|Topaz Snake": "https://img.game8.co/4333821/fd1dde1ab7946f7d43a10bb59964e81b.png/show",
  "Endgame|Cinder": "https://img.game8.co/4333820/267836f2baaa2a8266cff8a2b6522eef.png/show",
  "Endgame|Caiman": "https://img.game8.co/4333838/adb55b483cb138bc2a89f9baa9c2379f.png/show",
  "Endgame|Network": "https://img.game8.co/4333836/7e92e9b68277167454c6ec46f23c1a8b.png/show",
  "Endgame|Molten Gold": "https://img.game8.co/4331944/0dd4a9649873d43715f3ea95a31fdd33.png/show",
  "Endgame|Moonstone": "https://img.game8.co/4331952/ecdd5f8e4013b1d960d8df20405c910e.png/show",
  "Endgame|Chroma Flux": "https://img.game8.co/4331947/5758bfc0fbcf5ff86660c2f7c1c7ee90.png/show",
  "Endgame|Genesis": "https://img.game8.co/4331946/151e83b586c24c9eff8f3a08800f1c3a.png/show",
};

const camoChallenges = {
  Warzone: {
    Military: {
      Autumn: "5 Eliminierungen in Warzone erzielen.",
      Arctic: "10 Eliminierungen in Warzone erzielen.",
      "Forest Digital": "15 Eliminierungen in Warzone erzielen.",
      Balsam: "20 Eliminierungen in Warzone erzielen.",
      Arid: "30 Eliminierungen in Warzone erzielen.",
      Oil: "40 Eliminierungen in Warzone erzielen.",
      Snowcap: "50 Eliminierungen in Warzone erzielen.",
      Hunter: "75 Eliminierungen in Warzone erzielen.",
      "Sapphire Snake": "100 Eliminierungen in Warzone erzielen.",
    },
    Special: {
      Shimmer: "Waffenspezifische Spezial-Challenge; häufig Headshot-Kills oder ein ähnliches Präzisionsziel.",
      Tyrant: "Waffenspezifische Spezial-Challenge; häufig Eliminierungen mit bestimmtem Setup wie Schalldämpfer.",
      Trace: "Waffenspezifische Spezial-Challenge; häufig Eliminierungen kurz nach Sprint oder in Bewegung.",
    },
    Mastery: {
      "Golden Damascus": "Mit der Waffe 5-mal jeweils 3 Kills in einem Match erzielen.",
      Starglass: "Mit der Waffe 5-mal jeweils 5 Kills ohne zu sterben erzielen.",
      "Absolute Zero": "Mit der Waffe 10 Eliminierungen erzielen, während du in den Top 10 bist.",
      Apocalypse: "Absolute Zero auf 30 Waffen freischalten.",
    },
  },
  Multiplayer: {
    Military: {
      Underbrush: "5 Headshots im Multiplayer erzielen.",
      Woodland: "10 Headshots im Multiplayer erzielen.",
      "Slate Digital": "15 Headshots im Multiplayer erzielen.",
      Redwood: "20 Headshots im Multiplayer erzielen.",
      Poison: "30 Headshots im Multiplayer erzielen.",
      Toxic: "40 Headshots im Multiplayer erzielen.",
      Mountain: "50 Headshots im Multiplayer erzielen.",
      Stalker: "75 Headshots im Multiplayer erzielen.",
      "Ruby Snake": "100 Headshots im Multiplayer erzielen.",
    },
    Special: {
      Diamondback: "Alle Basis-Tarnungen der Waffe abschließen, danach die waffenspezifische Spezial-Challenge erledigen.",
      Raptor: "Alle Basis-Tarnungen der Waffe abschließen, danach die waffenspezifische Spezial-Challenge erledigen.",
      Mainframe: "Alle Basis-Tarnungen der Waffe abschließen, danach die waffenspezifische Spezial-Challenge erledigen.",
    },
    Mastery: {
      "Shattered Gold": "Alle Basis- und Spezial-Tarnungen der Waffe abschließen, danach die Mastery-Challenge der Waffe erledigen.",
      Arclight: "Shattered Gold freischalten und die nächste Mastery-Challenge der Waffe abschließen.",
      Tempest: "Arclight freischalten und die nächste Mastery-Challenge der Waffe abschließen.",
      Singularity: "Tempest auf 30 Waffen freischalten.",
    },
  },
  Zombies: {
    Military: {
      Char: "100 kritische Kills in Zombies erzielen.",
      Tundra: "200 kritische Kills in Zombies erzielen.",
      "Flood Digital": "300 kritische Kills in Zombies erzielen.",
      Cedar: "400 kritische Kills in Zombies erzielen.",
      Marshland: "500 kritische Kills in Zombies erzielen.",
      Mire: "600 kritische Kills in Zombies erzielen.",
      Ravine: "700 kritische Kills in Zombies erzielen.",
      Skulk: "800 kritische Kills in Zombies erzielen.",
      "Emerald Snake": "1.000 kritische Kills in Zombies erzielen.",
    },
    Special: {
      Mutilate: "Waffenspezifische Spezial-Challenge; häufig Hipfire-, Pack-a-Punch- oder Waffenrollen-Aufgaben.",
      Slither: "Waffenspezifische Spezial-Challenge; häufig kritische Kill-Serien oder Ammo-Mod-Aufgaben.",
      Pathfinder: "Waffenspezifische Spezial-Challenge; häufig Armor-, Elite- oder Spezialgegner-Aufgaben.",
    },
    Mastery: {
      "Golden Dragon": "15-mal 10 Kills schnell hintereinander erzielen.",
      Bloodstone: "5-mal mindestens 20 Kills in Folge erzielen, ohne Schaden zu nehmen.",
      Doomsteel: "10 Elite-Zombies eliminieren.",
      Infestation: "Doomsteel auf 30 Waffen freischalten.",
    },
  },
  Endgame: {
    Military: {
      Foliage: "10 kritische Kills in Endgame erzielen.",
      Desert: "25 kritische Kills in Endgame erzielen.",
      "City Digital": "50 kritische Kills in Endgame erzielen.",
      Pine: "75 kritische Kills in Endgame erzielen.",
      Forest: "100 kritische Kills in Endgame erzielen.",
      Sludge: "125 kritische Kills in Endgame erzielen.",
      Plateau: "150 kritische Kills in Endgame erzielen.",
      Nocturne: "200 kritische Kills in Endgame erzielen.",
      "Topaz Snake": "250 kritische Kills in Endgame erzielen.",
    },
    Special: {
      Cinder: "Waffenspezifische Spezial-Challenge; häufig Kills nach Sprint, mit vielen Aufsätzen oder unter Spezialbedingungen.",
      Caiman: "Waffenspezifische Spezial-Challenge; häufig ADS-, Scope-, Rarity- oder Zone-Aufgaben.",
      Network: "Waffenspezifische Spezial-Challenge; häufig Fear-, Human-Enemy- oder Rapid-Kill-Aufgaben.",
    },
    Mastery: {
      "Molten Gold": "20 Spezialgegner eliminieren.",
      Moonstone: "100 Gegner in Zone 3 oder Zone 4 eliminieren.",
      "Chroma Flux": "10 Elite-Gegner eliminieren.",
      Genesis: "Chroma Flux auf 30 Waffen freischalten.",
    },
  },
};

function getCamoChallenge(mode, category, name) {
  return camoChallenges[mode]?.[category]?.[name] || "Challenge abhängig von Waffe und Modus im Camo-Menü prüfen.";
}

const allCamos = camoGroups.flatMap(([mode, category, names, note]) =>
  names.map((name, index) => ({
    name,
    mode,
    category,
    status: `${category} ${index + 1}/${names.length}`,
    weapon: mode,
    note,
    challenge: getCamoChallenge(mode, category, name),
    imageUrl: camoImages[`${mode}|${name}`],
    pattern: getCamoPattern(mode, category, index),
  }))
);

const modeInfoData = {
  mw4: {
    kicker: "Call of Duty 2026",
    title: "MW4 Infos & Gerüchte",
    description: "Aktueller Stand zu Call of Duty 2026: MW4 ist nicht offiziell bestätigt. Aktuelle Berichte sprechen weiter von einem Modern-Warfare-Projekt von Infinity Ward, während ein angeblicher April-Reveal nicht eingetreten ist.",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-REVEAL-FULL-TOUT.jpg",
    imageAlt: "Modern Warfare III Reveal Artwork als Platzhalter für MW4 Gerüchte",
    stats: [
      ["Offiziell", "Kein MW4 Reveal"],
      ["Gerücht", "Modern Warfare 4 / CoD 2026"],
      ["Studio", "Infinity Ward erwartet"],
      ["Zeitraum", "Herbst 2026 vermutet"],
    ],
    updateTime: "Noch kein offizieller Termin",
    updateSummary: "Activision hat MW4 bisher nicht offiziell angekündigt. Gerüchte sprechen weiter von einem Reveal im Sommer 2026 und einem Release im klassischen Oktober/November-Fenster. Ein angeblicher Reveal Ende April ist nicht passiert und bleibt als Fake/unklarer Leak eingeordnet.",
    cards: [
      ["Offizieller Stand", "Es gibt aktuell keinen offiziellen Call-of-Duty-Artikel, der MW4 als Namen, Release-Datum, Trailer oder Feature-Liste bestätigt. Der Bereich trennt deshalb bestätigte Fakten klar von Gerüchten."],
      ["Gerücht: Titel & Release", "Mehrere Berichte nennen Call of Duty 2026 als mögliches Modern Warfare 4. Erwartet wird ein Release im Herbst 2026, wahrscheinlich Oktober oder November, weil Call of Duty traditionell in diesem Fenster erscheint."],
      ["Reveal Watch", "Ein behaupteter April-Reveal ist nicht eingetreten. Aktuell wirkt ein Sommer-Reveal rund um große Showcase-Zeiträume plausibler, aber ohne offizielle Bestätigung bleibt das Spekulation."],
      ["Gerücht: Kampagne", "Leaks sprechen von einer Fortsetzung der Modern-Warfare-Handlung mit Task Force 141, Makarov und einem stärkeren Korea-Fokus. Das ist nicht offiziell bestätigt und kann sich bis zum Reveal ändern."],
      ["Gerücht: Multiplayer & DMZ", "Berichte nennen Infinity Ward als erwartetes Studio, diskutieren einen eher modernen, geerdeten Multiplayer und spekulieren über eine Rückkehr von DMZ. Infinity Ward hat frühere Leaks öffentlich relativiert, daher vorsichtig einordnen."],
      ["Game Pass", "Aktuelle Berichte deuten darauf hin, dass neue Call-of-Duty-Titel nicht mehr automatisch Day One im Game Pass landen. Für Call of Duty 2026 ist auch das noch nicht als MW4-spezifische offizielle Produktinfo bestätigt."],
      ["Was wichtig wird", "Für Loadout Lab sind vor allem Reveal-Termin, Waffenliste, Movement-System, Gunsmith, Warzone-Integration und mögliche DMZ-Rückkehr relevant. Diese Punkte sollten nach offiziellen News sofort aktualisiert werden."],
    ],
    images: [
      ["MWIII Reveal Artwork", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwiii/MWIII-REVEAL-FULL-TOUT.jpg"],
      ["Task Force 141 Artwork", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/hero/mwii/MWII-000-ARTREVEAL-TOUT.jpg"],
      ["MWIII Campaign", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/guides/mwiii/body/MWIII-CAMPAIGN-HOWTOPLAY-001.jpg"],
      ["Modern Warfare Mission", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/guides/mwiii/body/MWIII-CAMPAIGN-HOWTOPLAY-002.jpg"],
      ["Open Combat Mission", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/guides/mwiii/body/MWIII-CAMPAIGN-HOWTOPLAY-003.jpg"],
      ["MWIII Intel", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/guides/mwiii/body/MWIII-CAMPAIGN-HOWTOPLAY-004.jpg"],
    ],
    tips: [
      "MW4 ist Stand 3. Mai 2026 nicht offiziell angekündigt.",
      "Ein angeblicher April-Reveal wurde nicht bestätigt und wird nicht als Fakt behandelt.",
      "Alle Angaben zu Release, Setting, DMZ und Multiplayer sind aktuell Gerüchte oder Berichte.",
      "Bilder im MW4-Tab sind offizielle Modern-Warfare-Franchise-Bilder, keine bestätigten MW4-Screenshots.",
      "Sobald Activision einen Reveal veröffentlicht, sollte dieser Tab auf offizielle Bilder und Fakten umgestellt werden.",
    ],
  },
  multiplayer: {
    kicker: "Black Ops 7",
    title: "Aktuelle Multiplayer Infos",
    description: "Neueste offizielle Multiplayer-Meldungen zu Season 03 Reloaded, Patch Notes, Maps, Modi, Ranked Rewards und Waffenänderungen.",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/seasons/blackops7/season-03/maps/mp/BO7_S3_Maps_Plaza.webp",
    imageAlt: "Black Ops 7 Multiplayer Map Plaza",
    stats: [
      ["Aktuell", "Season 03 Reloaded"],
      ["Neu", "Onsen, Summit, Hacienda"],
      ["Modus", "Freerun: Ascent"],
      ["Patch", "29. April 2026"],
    ],
    updateTime: "30. April 2026 um 18:00 Uhr MESZ",
    updateSummary: "Season 03 Reloaded startet in Deutschland um 18:00 Uhr MESZ. Die offiziellen BO7-Patchnotes vom 29. April ergänzen dazu Multiplayer-Playlist, Waffen-Tuning, Scorestreak-Fixes, Prestige-Master-Challenges und Ranked-Infos.",
    cards: [
      ["Änderungen im neuesten Update", "Onsen kommt als neue kleine Map für 6v6 und 2v2. Summit kehrt als Remaster zurück. Hacienda kommt als mittelgroße 6v6-Map zurück. Freerun: Ascent ergänzt den Multiplayer um einen Time-Trial- und Movement-Modus."],
      ["Patch Notes vom 29. April", "Die Season 3 Reloaded Moshpit-Playlist nutzt Beacon, Plaza, Gridlock, Onsen, Summit und Hacienda mit Team Deathmatch, Kill Confirmed, Domination und Hardpoint."],
      ["Waffen & Meta", "X9 Maverick Javelin Assembly bekommt höhere Projektilgeschwindigkeit, weniger Drop und besseren Multi-Hit-Nutzen. Carbon 57/VST Prestige-Magazin wird auf Damage Range, Recoil Control und Bullet Deviation umgebaut. 1911 bekommt Range-Nerfs."],
      ["Streaks & Ranked", "Lockshot wird schneller und erhält Long-Shot als neues Overclock. Ion Core und Rhino bekommen Fixes. Ranked Play Season 03 läuft weiter mit saisonalen Blueprints, Camos, Calling Cards und Rewards."],
    ],
    images: [
      ["Onsen", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-005.webp"],
      ["Summit", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-007.webp"],
      ["Hacienda", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-009.webp"],
      ["Freerun: Ascent", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-011.webp"],
      ["Ranked Play Season 03", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/mp/season-03/BO7_S3_MP_RankedPlay.webp"],
      ["Ion Core", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/mp/season-03/BO7_S3_MP_IonCore.webp"],
    ],
    tips: [
      "Neueste Inhalte zuerst: Season 03 Reloaded erweitert Multiplayer vor allem über Maps und Freerun.",
      "Patch Notes vom 21. April sind für Meta- und Ranked-Spieler wichtiger als Download-Infos.",
      "Waffenänderungen können Loadout Lab Rankings direkt verschieben.",
      "Ranked Rewards und Camo-Unlock-Fixes gehören in den Blick, weil sie Progression betreffen.",
    ],
  },
  warzone: {
    kicker: "Battle Royale",
    title: "Aktuelle Warzone Infos",
    description: "Neueste offizielle Warzone-Meldungen zu Season 03 Reloaded, neuen Modi, Loot, Ranked-Kontext, Equipment und Exotic Weapons.",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/wz/s03/Big-Map-Rotation.jpg",
    imageAlt: "Warzone Big Map Rotation",
    stats: [
      ["Aktuell", "Season 03 Reloaded"],
      ["Neu", "Hot Pursuit, Prop Hunt Royale"],
      ["Map", "Rebirth Island, Avalon"],
      ["Patch", "29. April 2026"],
    ],
    updateTime: "30. April 2026 um 18:00 Uhr MESZ",
    updateSummary: "Season 03 Reloaded startet in Deutschland um 18:00 Uhr MESZ. Die Warzone Reloaded Patch Notes vom 29. April bringen Personal Bests, Ranked Series, Spikes, Loot- und Economy-Anpassungen und neue Equipment-Rotation.",
    cards: [
      ["Änderungen im neuesten Update", "Hot Pursuit kommt auf Avalon als Black-Ops-Royale-LTM. Prop Hunt Royale kommt auf Rebirth Island als 24v24-Modus. Dazu werden Cluster Grenades und Spikes als neue beziehungsweise wichtige Utility-Elemente ergänzt."],
      ["Patch Notes vom 29. April", "Warzone bekommt ein Personal-Best-System für Damage, Kills und E/D. Ranked Play erhält die Warzone Ranked Series mit 50-Spieler-Leaderboards, Emblem- und Weapon-Camo-Rewards."],
      ["Loot & Economy", "Spikes kommen exklusiv an Buy Stations, während Spikes, Hades LMG-SMG Conversion Kit und XR-3 Ion Sniper Rifle in Ranked eingeschränkt werden. Supply Boxes sollen weniger doppelte Equipment-Typen droppen."],
      ["Equipment & Meta", "Frag Grenade wird durch Cluster Grenade ersetzt, Shock Stick durch EMP Grenade und Pinpoint Grenade durch Sensor Dart. Smoke Screen wird stärker, Precision-Airstrike-Warnungen erscheinen früher."],
      ["Waffen-Balance", "WZStats führt DS20 Mirage, Carbon 57, AK-27, Dravec 45, MXR-17 und VST als aktuelle Warzone-Meta. BO7 Ranked führt M15 MOD 0, MPC-25, Dravec 45, VS Recon und Jäger 45."],
    ],
    images: [
      ["Hot Pursuit", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-028.webp"],
      ["Prop Hunt Royale", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-030.webp"],
      ["Spikes", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-031.webp"],
      ["Big Map Rotation", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/wz/s03/Big-Map-Rotation.jpg"],
      ["Warzone Ranked", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/wz/s03/Ranked-Play-S03.jpg"],
      ["Win Streak Camos", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/wz/s03/Win-Streak-Static-Camos.jpg"],
    ],
    tips: [
      "Neueste Warzone-Infos zuerst: Reloaded-Modi, Loot-Änderungen und Exotic-Rotation.",
      "Tac Maps bleiben für Ranked wichtiger als allgemeine Mode-Erklärungen.",
      "Exotic Weapons beeinflussen frühe Runden stark, auch wenn das eigentliche Loadout unverändert bleibt.",
      "Equipment wie Spikes oder Cluster Grenades kann Rotationen und Pushes sichtbar verändern.",
    ],
  },
  zombies: {
    kicker: "Round-Based",
    title: "Aktuelle Zombies Infos",
    description: "Neueste offizielle Zombies-Meldungen zu Season 03 Reloaded, Totenreich, Ashwood, neuen Gegnern, Wonder Weapons, Rewards und Fixes.",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-015.webp",
    imageAlt: "Totenreich Zombies Map",
    stats: [
      ["Aktuell", "Season 03 Reloaded"],
      ["Neu", "Totenreich"],
      ["Feature", "Jotunn Star, Wild Fire"],
      ["Patch", "29. April 2026"],
    ],
    updateTime: "30. April 2026 um 18:00 Uhr MESZ",
    updateSummary: "Season 03 Reloaded startet in Deutschland um 18:00 Uhr MESZ. Die BO7-Patchnotes vom 29. April bestätigen Totenreich, Jotunn Star, Necropincer, Wild Fire und neue Prestige-Master-Challenges für Zombies.",
    cards: [
      ["Änderungen im neuesten Update", "Totenreich kommt als neue Round-Based Map. Dazu kommen Necropincer als neuer Gegner, Jotunn Star als Wonder Weapon, eine neue Main Quest mit Rewards und Challenges sowie Wild Fire als neues Field Upgrade."],
      ["Season 03 Launch", "Zum Season-Start kam Ashwood als Survival Map dazu. Rewards sind unter anderem Emblem, Weapon Charm, XP und GobbleGum-Ziele für bestimmte Runden- und Cursed-Mode-Meilensteine."],
      ["Patch Notes vom 29. April", "Neue Zombies-Prestige-Master-Challenges nennen unter anderem Aether Ruler, Final Boss, Shaman, Invincible und Fresh. Das betrifft besonders langfristige Completionist-Ziele."],
      ["Camos & Challenges", "Zombies bleibt für Camo-Grinds wichtig, weil viele Tarnungen über kritische Kills, Elite-Ziele, schnelle Kills und spezielle Waffen-Challenges laufen. Totenreich bringt zusätzlich Main-Quest- und Intel-Rewards."],
    ],
    images: [
      ["Totenreich", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-015.webp"],
      ["Necropincer", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-018.webp"],
      ["Jotunn Star", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-020.webp"],
      ["Wild Fire", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-026.webp"],
      ["Ashwood", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/seasons/blackops7/season-03/maps/zombies/BO7_S3_Maps_Ashwood.webp"],
    ],
    tips: [
      "Neueste Zombies-Infos zuerst: Totenreich, Necropincer, Jotunn Star und Wild Fire.",
      "Ashwood bleibt wichtig, weil dort eigene Survival- und Cursed-Rewards hängen.",
      "Patch-Fixes können Camo-Tracking und Challenge-Fortschritt beeinflussen.",
      "Tarnungs-Herausforderungen sollten immer mit dem Camo-Tab verbunden bleiben.",
    ],
  },
  endgame: {
    kicker: "Co-Op PvE",
    title: "Aktuelle Endgame Infos",
    description: "Neueste offizielle Endgame-Meldungen zu Season 03 Reloaded, Free-to-Play-Zeitraum, Operation Broken Mirror, Mega Abomination und neuen Abilities.",
    imageUrl: "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-002.webp",
    imageAlt: "Operation Broken Mirror Endgame",
    stats: [
      ["Aktuell", "Season 03 Reloaded"],
      ["Neu", "Operation Broken Mirror"],
      ["Aktivität", "Mega Abomination"],
      ["Patch", "29. April 2026"],
    ],
    updateTime: "30. April 2026 um 18:00 Uhr MESZ",
    updateSummary: "Season 03 Reloaded startet in Deutschland um 18:00 Uhr MESZ. Die BO7-Patchnotes vom 29. April bestätigen Endgame Free to Play, Operation Broken Mirror, neue Abilities, Exotic Skills und Mega Abomination.",
    cards: [
      ["Änderungen im neuesten Update", "Endgame bleibt für begrenzte Zeit Free to Play. Operation Broken Mirror startet als neue Operation und setzt Zone III oder höher voraus."],
      ["Neue Aktivität", "Mega Abomination kommt als neue Endgame-Aktivität dazu. Der Fokus liegt auf kooperativem PvE-Fortschritt, stärkeren Gegnern und wiederholbaren Rewards."],
      ["Neue Abilities & Skills", "Thermal Spike kommt als Major Ability. Dazu werden Conductive Shot als Exotic Skill und Wingman Unit als Nightmare Skill genannt."],
      ["Exotics & Rewards", "Pulsebreach und Reboot kommen als neue Exotic Weapons. Operation Broken Mirror bietet Rewards wie Blueprint, Emblem, Tokens, Loading Screen, Emote und animated Calling Card."],
    ],
    images: [
      ["Endgame Free to Play", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-001.webp"],
      ["Operation Broken Mirror", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-002.webp"],
      ["Mega Abomination", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-004.webp"],
      ["Survivors of Ash", "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/seasons/blackops7/season-03/events/BO7-S3-Announcenment-Survivors-of-ash.webp"],
    ],
    tips: [
      "Neueste Endgame-Infos zuerst: Free-to-Play, Broken Mirror, Mega Abomination und Thermal Spike.",
      "Operationen und Challenge-Fixes sind wichtiger als allgemeine PvE-Erklärungen.",
      "Endgame-Rewards sollten neben Camos und Events sichtbar bleiben.",
      "Patch-Fixes können Dark-Ops- und Completionist-Fortschritt direkt betreffen.",
    ],
  },
};

function getCamoPattern(mode, category, index) {
  const palettes = {
    Warzone: ["#e2a94f", "#9ec7e8", "#486447", "#8f6b3a"],
    Multiplayer: ["#5fc7c8", "#d04747", "#24282b", "#9fb16f"],
    Zombies: ["#76d96f", "#67204b", "#3f293b", "#d0e65a"],
    Endgame: ["#f0ad37", "#6b6fd6", "#111827", "#b8f3ff"],
  };
  const colors = palettes[mode] || palettes.Warzone;
  if (category === "Mastery") {
    return `radial-gradient(circle at 18% 24%, ${colors[1]}, transparent 25%), radial-gradient(circle at 74% 62%, ${colors[3]}, transparent 26%), linear-gradient(135deg, #050706, ${colors[index % colors.length]} 48%, #090b0a)`;
  }
  if (category === "Special") {
    return `linear-gradient(135deg, ${colors[0]}, ${colors[2]} 36%, #101412 37% 54%, ${colors[1]} 55%, #070908)`;
  }
  return `repeating-linear-gradient(135deg, ${colors[index % colors.length]} 0 0.9rem, #121716 0.9rem 1.8rem, ${colors[(index + 1) % colors.length]} 1.8rem 2.45rem)`;
}

const state = {
  mode: "warzone-ranked",
  map: "Rebirth Island",
  filter: "all",
  camo: "Warzone",
  camoCategory: "Military",
  modeInfo: "warzone",
  updateView: "all",
  query: "",
  sort: "score",
};

const grid = document.querySelector("#loadoutGrid");
const resultCount = document.querySelector("#resultCount");
const searchInput = document.querySelector("#loadoutSearch");
const sortSelect = document.querySelector("#sortSelect");
const modeButtons = document.querySelectorAll(".mode-button");
const contentTabsWrap = document.querySelector("#contentTabs");
const contentTabs = document.querySelectorAll(".content-tab");
const tabPanels = document.querySelectorAll(".tab-panel");
const camoGrid = document.querySelector("#camoGrid");
const camoCount = document.querySelector("#camoCount");
const camoFilter = document.querySelector("#camoFilter");
const camoCategoryFilter = document.querySelector("#camoCategoryFilter");
const filterToolbar = document.querySelector("#filterToolbar");
const metaPatchSummary = document.querySelector("#metaPatchSummary");
const weaponComparePanel = document.querySelector("#weaponComparePanel");
const tierTitle = document.querySelector("#tierTitle");
const tierDescription = document.querySelector("#tierDescription");
const mapsTitle = document.querySelector("#mapsTitle");
const mapsDescription = document.querySelector("#mapsDescription");
const mapsKicker = document.querySelector("#mapsKicker");
const mapsSummary = document.querySelector("#mapsSummary");
const mapNotes = document.querySelector("#mapNotes");
const hotspotRank = document.querySelector("#hotspotRank");
const mapTabs = document.querySelector("#mapTabs");
const mapModeGrid = document.querySelector("#mapModeGrid");
const modeInfoTabs = document.querySelector("#modeInfoTabs");
const modeInfoTitle = document.querySelector("#modeInfoTitle");
const modeInfoDescription = document.querySelector("#modeInfoDescription");
const modeInfoKicker = document.querySelector("#modeInfoKicker");
const modeInfoImage = document.querySelector("#modeInfoImage");
const modeInfoStats = document.querySelector("#modeInfoStats");
const modeInfoCards = document.querySelector("#modeInfoCards");
const modeInfoTips = document.querySelector("#modeInfoTips");
const modeInfoUpdateTime = document.querySelector("#modeInfoUpdateTime");
const modeInfoUpdateSummary = document.querySelector("#modeInfoUpdateSummary");
const modeInfoGallery = document.querySelector("#modeInfoGallery");
const updateModeTabs = document.querySelector("#updateModeTabs");
const updateModePanel = document.querySelector("#updateModePanel");
const updateModeTitle = document.querySelector("#updateModeTitle");
const updateModeDescription = document.querySelector("#updateModeDescription");
const updateModeKicker = document.querySelector("#updateModeKicker");
const updateModeImage = document.querySelector("#updateModeImage");
const updateModeStats = document.querySelector("#updateModeStats");
const updateModeUpdateTime = document.querySelector("#updateModeUpdateTime");
const updateModeUpdateSummary = document.querySelector("#updateModeUpdateSummary");
const updateModeCards = document.querySelector("#updateModeCards");
const updateModeTips = document.querySelector("#updateModeTips");
const updateModeGallery = document.querySelector("#updateModeGallery");
const updateBoard = document.querySelector(".update-board");

function getModeLoadouts() {
  return loadouts.filter((loadout) => loadout.mode === state.mode);
}

function matchesQuery(loadout) {
  const query = state.query.trim().toLowerCase();
  if (!query) return true;

  return [
    loadout.name,
    loadout.weaponClass,
    loadout.role,
    loadout.secondary,
    loadout.tierGroup,
    loadout.buildCode,
    ...loadout.tags,
    ...loadout.attachments,
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function getVisibleLoadouts() {
  return getModeLoadouts()
    .filter((loadout) => state.filter === "all" || loadout.category === state.filter)
    .filter(matchesQuery)
    .sort((a, b) => {
      if (state.sort === "name") return a.name.localeCompare(b.name);
      if (state.sort === "range") return b.rangeValue - a.rangeValue;
      if (state.sort === "pick") return b.pickRate - a.pickRate;
      return b.score - a.score;
    });
}

function getTierOrder(tier) {
  return ["Absolute Meta", "Meta", "Contender"].indexOf(tier);
}

function renderMode() {
  const config = modeConfig[state.mode];

  tierTitle.textContent = config.title;
  tierDescription.textContent = config.description;
  metaPatchSummary.innerHTML = getMetaPatchSummary(state.mode);

  filterToolbar.innerHTML = config.filters
    .map(([value, label]) => `<button class="filter-button${value === state.filter ? " active" : ""}" data-filter="${value}" type="button">${label}</button>`)
    .join("");
}

function getMetaPatchSummary(mode) {
  if (mode === "warzone-ranked") {
    return `
      <span>Meta Update · 12. Juni 2026</span>
      <p><strong>WZStats live geprüft:</strong> DS20 Mirage ist #1, Carbon 57 #2, AK-27 #3, Dravec 45 #4, MXR-17 #5 und VST #6 in der aktuellen Warzone-Meta.</p>
    `;
  }

  return `
    <span>Meta Update · 12. Juni 2026</span>
    <p><strong>BO7 Ranked:</strong> M15 MOD 0, MPC-25, Dravec 45, VS Recon und Jäger 45 bilden die aktuellen Top-Empfehlungen.</p>
  `;
}

function renderWeaponCompare() {
  if (!weaponComparePanel) return;

  const candidates = getModeLoadouts()
    .filter((item) => item.tierGroup === "Absolute Meta" || item.tierGroup === "Meta")
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (candidates.length < 2) {
    weaponComparePanel.innerHTML = "";
    return;
  }

  const [first, second] = candidates;
  const pickLabel = state.mode === "warzone-ranked" ? "Pick-Rate" : "Ranked-Priorität";
  const firstPick = first.pickRate ? `${first.pickRate}%` : first.tier;
  const secondPick = second.pickRate ? `${second.pickRate}%` : second.tier;

  weaponComparePanel.innerHTML = `
    <div class="weapon-compare-copy">
      <span>Meta Vergleich</span>
      <strong>${first.name} vs ${second.name}</strong>
      <p>${first.name} ist aktuell die stärkere Empfehlung für ${first.range}. ${second.name} ist die beste Alternative, wenn du ${second.role.toLowerCase()} brauchst.</p>
    </div>
    <div class="weapon-compare-stats">
      <article>
        <span>${first.name}</span>
        <strong>${first.score}</strong>
        <p>Meta Score · ${first.range}</p>
      </article>
      <article>
        <span>${second.name}</span>
        <strong>${second.score}</strong>
        <p>Meta Score · ${second.range}</p>
      </article>
      <article>
        <span>${pickLabel}</span>
        <strong>${firstPick} / ${secondPick}</strong>
        <p>${first.name} gegen ${second.name}</p>
      </article>
      <article>
        <span>Build Code</span>
        <strong>${first.buildCode}</strong>
        <p>Top-Empfehlung direkt kopierbar</p>
      </article>
    </div>
  `;
}

function renderMaps() {
  const data = mapData[state.mode];
  const uniqueMaps = [...new Set(data.groups.flatMap((group) => group.maps))];
  const selectedWarzoneMap = state.mode === "warzone-ranked" ? state.map : null;
  const visibleGroups = state.mode === "warzone-ranked"
    ? data.groups.map((group) => ({ ...group, maps: group.maps.filter((map) => map === selectedWarzoneMap) }))
    : data.groups;

  mapsTitle.textContent = data.title;
  mapsDescription.textContent = data.description;
  mapsKicker.textContent = data.kicker;
  mapsSummary.textContent = selectedWarzoneMap || `${uniqueMaps.length} Maps`;

  mapTabs.hidden = state.mode !== "warzone-ranked";
  mapTabs.innerHTML = state.mode === "warzone-ranked"
    ? uniqueMaps
      .map((map) => `<button class="map-tab${map === state.map ? " active" : ""}" data-map="${map}" type="button">${map}</button>`)
      .join("")
    : "";

  mapNotes.innerHTML = data.notes
    .map((note, index) => `<li><span>${index + 1}</span>${note}</li>`)
    .join("");

  const activeMaps = visibleGroups.flatMap((group) => group.maps);
  const hotspotItems = activeMaps
    .flatMap((map) => (mapPois[map] || []).map(([poi, percent]) => ({ map, poi, percent })))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, state.mode === "warzone-ranked" ? 12 : 8);

  hotspotRank.innerHTML = hotspotItems
    .map((item) => `<li><strong>${item.percent}%</strong><span>${item.poi}</span><em>${item.map}</em></li>`)
    .join("");

  mapModeGrid.innerHTML = visibleGroups
    .filter((group) => group.maps.length)
    .map((group) => `
      <article class="map-mode-card">
        <span class="mode-pill">${group.mode}</span>
        <h3>${group.maps.length} Maps</h3>
        <p>${group.focus}</p>
        <div class="ranked-map-grid">
          ${group.maps.map((map) => renderMapTile(map, group.mode)).join("")}
        </div>
      </article>
    `)
    .join("");
}

function renderCamos() {
  const visibleCamos = allCamos.filter((camo) => camo.mode === state.camo && camo.category === state.camoCategory);
  const categoryLabel = getCamoCategoryLabel(state.camoCategory);
  camoCount.textContent = visibleCamos.length;
  camoGrid.innerHTML = visibleCamos
    .map((camo, index) => `
      <article class="camo-card">
        <div class="camo-swatch ${camo.imageUrl ? "has-image" : ""}" style="--camo-pattern: ${camo.pattern};">
          ${camo.imageUrl ? `<img src="${camo.imageUrl}" alt="${camo.name} Tarnung" loading="lazy">` : ""}
        </div>
        <div class="camo-card-body">
          <span class="mode-pill">${camo.mode} · ${categoryLabel}</span>
          <h3>${camo.name}</h3>
          <p>${camo.note}</p>
          <div class="camo-challenge">
            <span>Herausforderung</span>
            <strong>${camo.challenge}</strong>
          </div>
          <div class="camo-meta">
            <span>${categoryLabel} ${index + 1}/${visibleCamos.length}</span>
            <strong>${camo.weapon}</strong>
          </div>
        </div>
      </article>
    `)
    .join("");
}

function renderModeInfo() {
  const info = modeInfoData[state.modeInfo];
  modeInfoTitle.textContent = info.title;
  modeInfoDescription.textContent = info.description;
  modeInfoKicker.textContent = info.kicker;
  if (document.querySelector(".tab-panel.active")?.dataset.panel === "mode-info") {
    tierTitle.textContent = info.title;
    tierDescription.textContent = info.description;
  }
  const hideModeTabs = state.modeInfo === "mw4";
  modeInfoTabs.hidden = hideModeTabs;
  modeInfoTabs.style.display = hideModeTabs ? "none" : "";
  modeInfoImage.src = info.imageUrl;
  modeInfoImage.alt = info.imageAlt;
  modeInfoUpdateTime.textContent = info.updateTime;
  modeInfoUpdateSummary.textContent = info.updateSummary;

  modeInfoTabs.querySelectorAll("[data-mode-info]").forEach((button) => {
    button.classList.toggle("active", button.dataset.modeInfo === state.modeInfo);
  });

  modeInfoStats.innerHTML = info.stats
    .map(([label, value]) => `
      <div>
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `)
    .join("");

  modeInfoCards.innerHTML = info.cards
    .map(([title, text]) => `
      <article>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>
    `)
    .join("");

  modeInfoTips.innerHTML = info.tips
    .map((tip, index) => `<li><span>${index + 1}</span>${tip}</li>`)
    .join("");

  modeInfoGallery.innerHTML = info.images
    .map(([label, src]) => `
      <figure>
        <img src="${src}" alt="${label}" loading="lazy">
        <figcaption>${label}</figcaption>
      </figure>
    `)
    .join("");
}

function renderUpdateMode() {
  updateModeTabs.querySelectorAll("[data-update-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.updateView === state.updateView);
  });

  const showAll = state.updateView === "all";
  updateModePanel.hidden = showAll;
  updateBoard.hidden = !showAll;
  if (showAll) return;

  const info = modeInfoData[state.updateView];
  updateModeTitle.textContent = info.title;
  updateModeDescription.textContent = info.description;
  updateModeKicker.textContent = info.kicker;
  updateModeImage.src = info.imageUrl;
  updateModeImage.alt = info.imageAlt;
  updateModeUpdateTime.textContent = info.updateTime;
  updateModeUpdateSummary.textContent = info.updateSummary;

  updateModeStats.innerHTML = info.stats
    .map(([label, value]) => `
      <div>
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `)
    .join("");

  updateModeCards.innerHTML = info.cards
    .map(([title, text]) => `
      <article>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>
    `)
    .join("");

  updateModeTips.innerHTML = info.tips
    .map((tip, index) => `<li><span>${index + 1}</span>${tip}</li>`)
    .join("");

  updateModeGallery.innerHTML = info.images
    .map(([label, src]) => `
      <figure>
        <img src="${src}" alt="${label}" loading="lazy">
        <figcaption>${label}</figcaption>
      </figure>
    `)
    .join("");
}

function getCamoCategoryLabel(category) {
  return {
    Military: "Basis Tarnungen",
    Special: "Spezial Tarnungen",
    Mastery: "Mastery Tarnungen",
  }[category] || category;
}

function renderMapTile(map, mode) {
  const tacImage = tacMapImages[map] || mapImages[map];
  const tileMap = tacMapTiles[map];

  return `
    <div class="ranked-map-card">
      <div class="map-card-title">
        <strong>${map}</strong>
        <span>${mode}</span>
      </div>
      <section class="tac-map-panel" aria-label="${map} Tac Map und POI Prozentwerte">
        ${tileMap ? renderTacTileMap(map, tileMap) : `<img src="${tacImage}" alt="${map} Tac Map" loading="lazy">`}
      </section>
    </div>
  `;
}

function renderTacTileMap(map, tileMap) {
  const tiles = [];
  const markers = mapPoiMarkers[map] || [];
  const heatValues = new Map((mapPois[map] || []).map(([name, percent]) => [name, percent]));

  for (let y = 0; y < tileMap.size; y += 1) {
    for (let x = 0; x < tileMap.size; x += 1) {
      const src = tileMap.template.replace("{x}", x).replace("{y}", y);
      tiles.push(`<img src="${src}" alt="${map} Tac Map Tile ${x}-${y}" loading="lazy">`);
    }
  }

  return `
    <div class="tac-map-frame ${tileMap.frame === "wide" ? "wide-frame" : ""}">
      <div class="tac-tile-map" style="--tile-count: ${tileMap.size}">
        ${tiles.join("")}
        ${markers.map(([name, x, y]) => {
          const percent = heatValues.get(name) || 0;
          const size = 2.8 + percent * 0.2;
          const opacity = Math.min(0.92, 0.34 + percent / 32);
          return `<span class="heat-spot" style="left: ${x}%; top: ${y}%; --heat-size: ${size}rem; --heat-opacity: ${opacity};" aria-hidden="true"></span>`;
        }).join("")}
        ${markers.map(([name, x, y]) => `<span class="poi-marker" style="left: ${x}%; top: ${y}%;"><i></i><b>${name}</b></span>`).join("")}
      </div>
    </div>
  `;
}

function renderLoadouts() {
  renderMode();
  renderWeaponCompare();
  renderMaps();
  renderCamos();
  renderModeInfo();
  renderUpdateMode();

  const visibleLoadouts = getVisibleLoadouts();
  const modeTotal = getModeLoadouts().length;
  resultCount.textContent = `${visibleLoadouts.length} von ${modeTotal} Builds angezeigt`;

  if (!visibleLoadouts.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Kein Build gefunden</h3>
        <p>Versuch einen anderen Suchbegriff oder wechsel den Rollenfilter.</p>
      </div>
    `;
    return;
  }

  const groups = [...new Set(visibleLoadouts.map((loadout) => loadout.tierGroup))]
    .sort((a, b) => getTierOrder(a) - getTierOrder(b));

  grid.innerHTML = groups
    .map((group) => {
      const items = visibleLoadouts.filter((loadout) => loadout.tierGroup === group);
      return `
        <section class="tier-group ${getTierClass(group)}">
          <div class="tier-header">
            <div>
              <span class="tier-kicker">${items.length} Builds</span>
              <h3>${group}</h3>
            </div>
            <span>Updated 12. Juni 2026</span>
          </div>
          <div class="weapon-list">
            ${items.map(renderCard).join("")}
          </div>
        </section>
      `;
    })
    .join("");
}

function getTierClass(group) {
  return `tier-${group.toLowerCase().replaceAll(" ", "-")}`;
}

function renderCard(loadout) {
  return `
    <article class="loadout-card" data-loadout-card="${loadout.name}">
      <div class="rank-badge">#${loadout.rank}<span>${loadout.tier}</span></div>
      <div class="weapon-thumb">
        <img class="${loadout.imageClass || ""}" src="${loadout.imageUrl}" alt="${loadout.name} aus Black Ops 7" loading="lazy">
      </div>
      <div class="card-main">
        <div class="card-top">
          <div>
            <span class="mode-pill">${loadout.weaponClass}</span>
            <h3 class="weapon-name">${loadout.name}</h3>
          </div>
        </div>
        <p class="role">${loadout.role}</p>
        ${loadout.patchImpact ? renderPatchImpact(loadout.patchImpact) : ""}
        <div class="stat-strip">
          ${renderStat("Score", loadout.score, loadout.score)}
          ${renderStat("Pick-Rate", loadout.pickRate ? `${loadout.pickRate}%` : "-", Math.min(100, loadout.pickRate * 4))}
          ${renderStat("Handhabung", loadout.ease, loadout.ease * 10)}
        </div>
        <div class="tag-row">
          ${loadout.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <div class="card-details">
          <div class="attachment-columns">
          <ul class="attachment-list">
            ${loadout.attachments.map((item) => `<li>${item}</li>`).join("")}
          </ul>
          <ul class="perk-list">
            <li>Code: ${loadout.buildCode}</li>
            <li>Pair: ${loadout.secondary}</li>
            ${loadout.perks.map((item, index) => `<li>Extra ${index + 1}: ${item}</li>`).join("")}
          </ul>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <span class="range">${loadout.range}</span>
        <button class="expand-button" type="button" aria-expanded="false" aria-label="${loadout.name} Infos anzeigen">
          <span>Details</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6 1.4-1.4Z"></path>
          </svg>
        </button>
        <button class="copy-button" type="button" data-loadout="${loadout.name}">Code kopieren</button>
      </footer>
    </article>
  `;
}

function renderPatchImpact(impact) {
  return `
    <div class="patch-impact patch-${impact.type}">
      <span>${impact.label}</span>
      <p>${impact.text}</p>
    </div>
  `;
}

function renderStat(label, value, percent) {
  return `
    <span>
      <strong>${value}</strong>
      ${label}
      <i style="--stat-value: ${percent}%;"></i>
    </span>
  `;
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    if (button.dataset.mode === "updates") {
      contentTabsWrap.hidden = true;
      setContentTab("updates");
      tierTitle.textContent = "Offizielle Call of Duty Updates";
      tierDescription.textContent = "Aktuelle und kommende Meldungen direkt aus offiziellen Call-of-Duty-Quellen.";
      renderUpdateMode();
      return;
    }

    if (button.dataset.mode === "camos") {
      contentTabsWrap.hidden = true;
      setContentTab("camos");
      tierTitle.textContent = "Tarnungen & Mastery";
      tierDescription.textContent = "Alle Tarnungs-Kategorien für Warzone, Multiplayer, Zombies und Endgame mit Bildern und Freischalt-Herausforderungen.";
      renderCamos();
      return;
    }

    if (button.dataset.mode === "mw4-info") {
      contentTabsWrap.hidden = true;
      state.modeInfo = "mw4";
      setContentTab("mode-info");
      tierTitle.textContent = modeInfoData[state.modeInfo].title;
      tierDescription.textContent = modeInfoData[state.modeInfo].description;
      renderModeInfo();
      return;
    }

    contentTabsWrap.hidden = false;
    state.mode = button.dataset.mode;
    state.filter = "all";
    if (state.mode === "warzone-ranked") state.map = "Rebirth Island";
    if (["updates", "camos", "mode-info"].includes(document.querySelector(".tab-panel.active")?.dataset.panel)) setContentTab("weapons");
    renderLoadouts();
  });
});

function setContentTab(tab) {
  contentTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === tab;
    panel.hidden = !isActive;
    panel.classList.toggle("active", isActive);
  });
}

contentTabs.forEach((button) => {
  button.addEventListener("click", () => {
    setContentTab(button.dataset.tab);
  });
});

camoFilter.addEventListener("click", (event) => {
  const button = event.target.closest("[data-camo]");
  if (!button) return;

  state.camo = button.dataset.camo;
  camoFilter.querySelectorAll("[data-camo]").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  renderCamos();
});

camoCategoryFilter.addEventListener("click", (event) => {
  const button = event.target.closest("[data-camo-category]");
  if (!button) return;

  state.camoCategory = button.dataset.camoCategory;
  camoCategoryFilter.querySelectorAll("[data-camo-category]").forEach((item) => {
    item.classList.toggle("active", item === button);
  });
  renderCamos();
});

modeInfoTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode-info]");
  if (!button) return;

  state.modeInfo = button.dataset.modeInfo;
  renderModeInfo();
});

updateModeTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-update-view]");
  if (!button) return;

  state.updateView = button.dataset.updateView;
  renderUpdateMode();
});

document.querySelector('a[href="#maps"]')?.addEventListener("click", () => {
  contentTabsWrap.hidden = false;
  modeButtons.forEach((item) => item.classList.toggle("active", item.dataset.mode === state.mode));
  setContentTab("maps");
});

document.querySelector('a[href="#loadouts"]')?.addEventListener("click", () => {
  contentTabsWrap.hidden = false;
  modeButtons.forEach((item) => item.classList.toggle("active", item.dataset.mode === state.mode));
  setContentTab("weapons");
});

document.querySelector('a[href="#updates"]')?.addEventListener("click", (event) => {
  event.preventDefault();
  modeButtons.forEach((item) => item.classList.toggle("active", item.dataset.mode === "updates"));
  contentTabsWrap.hidden = true;
  setContentTab("updates");
  tierTitle.textContent = "Offizielle Call of Duty Updates";
  tierDescription.textContent = "Aktuelle und kommende Meldungen direkt aus offiziellen Call-of-Duty-Quellen.";
  document.querySelector("#loadouts")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

mapTabs.addEventListener("click", (event) => {
  const button = event.target.closest(".map-tab");
  if (!button) return;

  state.map = button.dataset.map;
  renderMaps();
});

filterToolbar.addEventListener("click", (event) => {
  const button = event.target.closest(".filter-button");
  if (!button) return;

  state.filter = button.dataset.filter;
  renderLoadouts();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderLoadouts();
});

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderLoadouts();
});

grid.addEventListener("click", async (event) => {
  const expandButton = event.target.closest(".expand-button");
  const card = event.target.closest(".loadout-card");

  if (card && !event.target.closest(".copy-button")) {
    const shouldExpand = !card.classList.contains("expanded");
    card.classList.toggle("expanded", shouldExpand);
    const button = card.querySelector(".expand-button");
    if (button) {
      button.setAttribute("aria-expanded", String(shouldExpand));
      button.setAttribute("aria-label", shouldExpand ? "Infos ausblenden" : "Infos anzeigen");
    }
    if (expandButton) return;
  }

  const button = event.target.closest(".copy-button");
  if (!button) return;

  const loadout = getModeLoadouts().find((item) => item.name === button.dataset.loadout);
  const text = `${loadout.name} ${loadout.buildCode}: ${loadout.attachments.join(", ")}`;

  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Kopiert";
    setTimeout(() => {
      button.textContent = "Code kopieren";
    }, 1400);
  } catch {
    button.textContent = "Bereit";
    setTimeout(() => {
      button.textContent = "Code kopieren";
    }, 1400);
  }
});

renderLoadouts();

if (window.location.hash === "#updates") {
  modeButtons.forEach((item) => item.classList.toggle("active", item.dataset.mode === "updates"));
  contentTabsWrap.hidden = true;
  setContentTab("updates");
  tierTitle.textContent = "Offizielle Call of Duty Updates";
  tierDescription.textContent = "Aktuelle und kommende Meldungen direkt aus offiziellen Call-of-Duty-Quellen.";
}

