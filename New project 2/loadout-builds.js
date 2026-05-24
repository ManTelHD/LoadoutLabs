(function () {
  const longRangeExtras = ["Scavenger", "Quick Fix", "Survivor"];
  const closeRangeExtras = ["Mountaineer", "Quick Fix", "Stim Shot"];
  const sniperExtras = ["Survivor", "Smoke Grenade", "Fast Hands"];
  const utilityExtras = ["Mountaineer", "Quick Fix", "Survivor"];

  const builds = {
    mk78: { code: "LL-MK78-META", extras: longRangeExtras, attachments: ["Optic: Greaves AccuSpot 3x (Stufe 22)", "Barrel: 22\" Impulse HB-762 Barrel (Stufe 36)", "Underbarrel: Bowen Sentry Foregrip (Stufe 24)", "Rear Grip: Fleet-G2 Grip (Stufe 39)", "Fire Mods: Accelerated Recoil System (Stufe 34)"] },
    "kogot-7": { code: "LL-KOGOT7-META", extras: closeRangeExtras, attachments: ["Muzzle: Hawker Series 45 (Stufe 18)", "Barrel: 8.5\" Targil Hock-XR Barrel (Stufe 7)", "Underbarrel: EAM Steady-90 Grip (Stufe 31)", "Magazine: Vex Expanse Mag (Stufe 32)", "Fire Mods: Buffer Spring (Stufe 28)"] },
    "ds20-mirage": { code: "LL-DS20-META", extras: longRangeExtras, attachments: ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 18)", "Barrel: 17.1\" Abdicator Barrel (Stufe 29)", "Magazine: Griffon Reserve Extended II (Stufe 27)", "Rear Grip: A1-C Control Grip (Stufe 33)"] },
    "carbon-57": { code: "LL-CARBON57-META", extras: closeRangeExtras, attachments: ["Barrel: 14\" Rockleigh Barrel (Stufe 27)", "Underbarrel: Vitalize Handstop (Stufe 16)", "Magazine: Compact-246 Fast Mag (Stufe 20)", "Rear Grip: Bombus Quick Grip (Stufe 8)", "Fire Mods: Accelerated Recoil System (Stufe 3)"] },
    "voyak-kt-3": { code: "LL-VOYAKKT3-META", extras: longRangeExtras, attachments: ["Optic: Redwell 30-S 2x (Stufe 22)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: 17.6\" LTI Grav-4 Barrel (Stufe 34)", "Stock: V-Last Control Pad (Stufe 33)", "Magazine: SK-Garrison Drum (Stufe 40)"] },
    vst: { code: "LL-VST-META", extras: closeRangeExtras, attachments: ["Muzzle: H-9mm Precision Comp (Stufe 15)", "Barrel: Longshot Vector Barrel (Stufe 38)", "Underbarrel: Zero Shift Handstop (Stufe 4)", "Magazine: Extended Mag II (Stufe 28)", "Fire Mods: MF 5.56 Defense Conversion (Prestige)"] },
    "mxr-17": { code: "LL-MXR17-META", extras: longRangeExtras, attachments: ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 43)", "Barrel: 17\" Greaves Scourge Barrel (Stufe 35)", "Magazine: Rhodes Drum Mag (Stufe 30)", "Stock: Winch Stock (Stufe 17)"] },
    "dravec-45": { code: "LL-DRAVEC45-META", extras: closeRangeExtras, attachments: ["Muzzle: Compensator (Stufe 4)", "Barrel: Ranger Barrel (Stufe 11)", "Underbarrel: Lightweight Handstop (Stufe 3)", "Magazine: Fast Mag (Prestige)", "Stock: Raider Stock (Stufe 4)"] },

    "mk35-isr": { code: "LL-MK35ISR-A1", extras: longRangeExtras, attachments: ["Optic: FANG HoverPoint ELO (Stufe 1)", "Muzzle: Monolithic Suppressor (Stufe 39)", "Barrel: 16.5\" Greaves Bellum Barrel (Stufe 14)", "Underbarrel: VAS Convergence Foregrip (Stufe 1)", "Magazine: Bowen Siren Drum (Stufe 29)"] },
    "peacekeeper-mk1": { code: "LL-PEACEKEEPER-A2", extras: longRangeExtras, attachments: ["Muzzle: Ported Compensator (Stufe 31)", "Barrel: Balanced Barrel (Stufe 6)", "Underbarrel: Precision Foregrip (Stufe 17)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Stock: Agile Stock (Stufe 4)"] },
    "ak-27": { code: "LL-AK27-A3", extras: longRangeExtras, attachments: ["Muzzle: EMT3 Compensator (Stufe 3)", "Barrel: 18.2\" Vostok Extended Barrel (Stufe 27)", "Underbarrel: Ironhold Angled Grip (Stufe 10)", "Rear Grip: Garin Advanced Grip (Stufe 39)", "Fire Mods: 7.62 Soviet Overpressured (Stufe 18)"] },
    "ryden-45k": { code: "LL-RYDEN45K-A4", extras: closeRangeExtras, attachments: ["Muzzle: Compensator (Stufe 4)", "Barrel: Long Barrel (Stufe 12)", "Underbarrel: Lightweight Handstop (Stufe 3)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 9)"] },
    "sturmwolf-45": { code: "LL-STURMWOLF45-A5", extras: closeRangeExtras, attachments: ["Muzzle: Suppressor (Stufe 9)", "Barrel: Reinforced Barrel (Stufe 14)", "Underbarrel: Vitalize Handstop (Stufe 16)", "Magazine: Extended Mag II (Stufe 28)", "Stock: Combat Stock (Stufe 20)"] },
    "egrt-17": { code: "LL-EGRT17-A6", extras: longRangeExtras, attachments: ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Reinforced Long Barrel (Stufe 17)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"] },
    "mpc-25": { code: "LL-MPC25-A7", extras: closeRangeExtras, attachments: ["Muzzle: K&S Compensator (Stufe 20)", "Barrel: 14.5\" VAS Ashe Barrel (Stufe 15)", "Underbarrel: Zero Shift Handstop (Stufe 16)", "Magazine: MPC Overload Drum (Stufe 35)", "Fire Mods: Recoil Sync Unit (Stufe 19)"] },
    "m15-mod-0": { code: "LL-M15MOD0-A8", extras: longRangeExtras, attachments: ["Optic: Reflex ELO (Stufe 1)", "Muzzle: Compensator (Stufe 13)", "Barrel: Reinforced Long Barrel (Stufe 11)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 1)"] },
    "rev-46": { code: "LL-REV46-A9", extras: closeRangeExtras, attachments: ["Muzzle: Compensator (Stufe 4)", "Barrel: Long Barrel (Stufe 12)", "Underbarrel: Vitalize Handstop (Stufe 16)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Ergonomic Grip (Stufe 19)"] },
    "razor-9mm": { code: "LL-RAZOR9MM-A10", extras: closeRangeExtras, attachments: ["Optic: Lethal Tools ELO (Stufe 5)", "Muzzle: H-9mm Precision Comp (Stufe 2)", "Barrel: 12\" MFS Sidewinder Barrel (Prestige)", "Magazine: Zealot Extended Mag II (Stufe 37)", "Stock: Serpent Pad (Stufe 39)"] },
    "maddox-rfb": { code: "LL-MADDOXRFB-A11", extras: longRangeExtras, attachments: ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 18)", "Barrel: Reinforced Barrel (Stufe 14)", "Magazine: Extended Mag II (Stufe 30)", "Rear Grip: Control Grip (Stufe 33)"] },
    "x9-maverick": { code: "LL-X9MAVERICK-A12", extras: longRangeExtras, attachments: ["Optic: Reflex ELO (Stufe 1)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Long Barrel (Stufe 12)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"] },
    m8a1: { code: "LL-M8A1-A13", extras: sniperExtras, attachments: ["Optic: Variable Zoom Scope (Stufe 8)", "Muzzle: Suppressor (Stufe 9)", "Barrel: Marksman Barrel (Stufe 18)", "Magazine: Fast Mag (Prestige)", "Fire Mods: Overpressured (Stufe 24)"] },
    "hawker-hx": { code: "LL-HAWKERHX-A14", extras: sniperExtras, attachments: ["Muzzle: Suppressor (Stufe 9)", "Barrel: Reinforced Barrel (Stufe 14)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: High Velocity (Stufe 24)"] },
    "vs-recon": { code: "LL-VSRECON-A15", extras: sniperExtras, attachments: ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Ergonomic Grip (Stufe 19)", "Fire Mods: High Velocity (Stufe 24)"] },
    "strider-300": { code: "LL-STRIDER300-A16", extras: sniperExtras, attachments: ["Muzzle: Monolithic Suppressor (Stufe 33)", "Barrel: 25\" Bowen Grooved Barrel (Stufe 21)", "Magazine: Carnation Fast Mag (Stufe 20)", "Rear Grip: Hatch Quick Grip (Stufe 23)", "Fire Mods: .300 WM Overpressured (Stufe 24)"] },

    "swordfish-a1": { code: "LL-SWORDFISHA1-B1", extras: longRangeExtras, attachments: ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Marksman Barrel (Stufe 18)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"] },
    "sokol-545": { code: "LL-SOKOL545-B2", extras: longRangeExtras, attachments: ["Optic: Greaves AccuSpot 3x (Stufe 22)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Reinforced Barrel (Stufe 14)", "Underbarrel: Bowen Sentry Foregrip (Stufe 24)", "Magazine: Extended Mag II (Stufe 30)"] },
    "rk-9": { code: "LL-RK9-B3", extras: closeRangeExtras, attachments: ["Muzzle: Compensator (Stufe 4)", "Barrel: Long Barrel (Stufe 12)", "Underbarrel: Lightweight Handstop (Stufe 3)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 9)"] },
    xm325: { code: "LL-XM325-B4", extras: longRangeExtras, attachments: ["Optic: Greaves AccuSpot 3x (Stufe 22)", "Muzzle: Suppressor (Stufe 9)", "Barrel: Reinforced Barrel (Stufe 14)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"] },
    "xr-3-ion": { code: "LL-XR3ION-B5", extras: sniperExtras, attachments: ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: High Velocity (Stufe 24)"] },

    "shadow-sk": { code: "LL-SHADOWSK-C1", extras: sniperExtras, attachments: ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: High Velocity (Stufe 24)"] },
    "m34-novaline": { code: "LL-M34NOVALINE-C2", extras: sniperExtras, attachments: ["Optic: Variable Zoom Scope (Stufe 8)", "Muzzle: Suppressor (Stufe 9)", "Barrel: Marksman Barrel (Stufe 18)", "Magazine: Fast Mag (Prestige)", "Fire Mods: Overpressured (Stufe 24)"] },
    "warden-308": { code: "LL-WARDEN308-C3", extras: longRangeExtras, attachments: ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Marksman Barrel (Stufe 18)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"] },
    "1911": { code: "LL-1911-C4", extras: closeRangeExtras, attachments: ["Muzzle: Compensator (Stufe 4)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: Overpressured (Stufe 24)"] },
    "coda-9": { code: "LL-CODA9-C5", extras: closeRangeExtras, attachments: ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Ergonomic Grip (Stufe 19)", "Fire Mods: Overpressured (Stufe 24)"] },
    "velox-57": { code: "LL-VELOX57-C6", extras: closeRangeExtras, attachments: ["Muzzle: Compensator (Stufe 4)", "Barrel: Reinforced Barrel (Stufe 14)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: High Velocity (Stufe 24)"] },
    "jager-45": { code: "LL-JAGER45-C7", extras: closeRangeExtras, attachments: ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: Overpressured (Stufe 24)"] },

    "arc-m1": { code: "LL-ARCM1-D1", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    "flatline-mkii": { code: "LL-FLATLINEMKII-D2", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    "aarow-109": { code: "LL-AAROW109-D3", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    "knife-bo7": { code: "LL-KNIFE-D4", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    "ballistic-knife": { code: "LL-BALLISTICKNIFE-D5", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    "nx-ravager": { code: "LL-NXRAVAGER-D6", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    "h311-saw": { code: "LL-H311SAW-D7", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    "gdl-havoc": { code: "LL-GDLHAVOC-D8", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    siren: { code: "LL-SIREN-D9", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
    katana: { code: "LL-KATANA-D10", extras: utilityExtras, attachments: ["Keine Waffenaufsätze verfügbar"] },
  };

  const slug = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/mk\./g, "mk").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const html = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  function itemsHtml(items) {
    return items.map((item) => `<li>${html(item)}</li>`).join("");
  }

  function applyBuild(card) {
    const key = slug(card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent);
    const build = builds[key];
    if (!build) return;

    const signature = `${build.code}|${build.attachments.join("|")}|${build.extras.join("|")}`;
    if (card.dataset.completeBuildSignature === signature) return;

    const attachmentList = card.querySelector(".attachment-list");
    const perkList = card.querySelector(".perk-list");

    if (attachmentList) attachmentList.innerHTML = itemsHtml(build.attachments);
    if (perkList) {
      perkList.innerHTML = itemsHtml([
        `Code: ${build.code}`,
        ...build.extras.map((extra, index) => `Extra ${index + 1}: ${extra}`),
      ]);
    }

    card.dataset.completeBuildSignature = signature;
  }

  let scheduled = false;
  function run() {
    scheduled = false;
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach(applyBuild);
  }

  function scheduleRun() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(run);
  }

  function watchGrid() {
    const grid = document.querySelector("#loadoutGrid");
    if (!grid || grid.dataset.completeBuildsWatched === "true") return;
    grid.dataset.completeBuildsWatched = "true";
    new MutationObserver(scheduleRun).observe(grid, { childList: true });
  }

  function init() {
    scheduleRun();
    watchGrid();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(init, 120);
  window.setTimeout(init, 900);
}());
