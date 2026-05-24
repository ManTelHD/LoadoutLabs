(function () {
  const unlockLevels = {
    "mk35-isr|Optic: FANG HoverPoint ELO": "Stufe 1",
    "mk35-isr|Muzzle: Monolithic Suppressor": "Stufe 39",
    "mk35-isr|Barrel: 16.5\" Greaves Bellum Barrel": "Stufe 14",
    "mk35-isr|Underbarrel: VAS Convergence Foregrip": "Stufe 1",
    "mk35-isr|Magazine: Bowen Siren Drum": "Stufe 29",
    "razor-9mm|Optic: Lethal Tools ELO": "Stufe 5",
    "razor-9mm|Muzzle: H-9mm Precision Comp": "Stufe 2",
    "razor-9mm|Barrel: 12\" MFS Sidewinder Barrel": "Prestige",
    "razor-9mm|Magazine: Zealot Extended Mag II": "Stufe 37",
    "razor-9mm|Stock: Serpent Pad": "Stufe 39",
    "vst|Muzzle: H-9mm Precision Comp": "Stufe 15",
    "vst|Barrel: Longshot Vector Barrel": "Stufe 38",
    "vst|Underbarrel: Zero Shift Handstop": "Stufe 4",
    "vst|Magazine: Extended Mag II": "Stufe 28",
    "vst|Fire Mods: MF 5.56 Defense Conversion": "Prestige",
    "strider-300|Muzzle: Monolithic Suppressor": "Stufe 33",
    "strider-300|Barrel: 25\" Bowen Grooved Barrel": "Stufe 21",
    "strider-300|Magazine: Carnation Fast Mag": "Stufe 20",
    "strider-300|Rear Grip: Hatch Quick Grip": "Stufe 23",
    "strider-300|Fire Mods: .300 WM Overpressured": "Stufe 24",
    "mpc-25|Muzzle: K&S Compensator": "Stufe 20",
    "mpc-25|Barrel: 14.5\" VAS Ashe Barrel": "Stufe 15",
    "mpc-25|Underbarrel: Zero Shift Handstop": "Stufe 16",
    "mpc-25|Magazine: MPC Overload Drum": "Stufe 35",
    "mpc-25|Fire Mods: Recoil Sync Unit": "Stufe 19",
    "mk35-isr-support|Barrel: 19\" MFS Nightfall Suppressed Barrel": "Prestige",
    "mk35-isr-support|Underbarrel: VAS Convergence Foregrip": "Stufe 1",
    "mk35-isr-support|Magazine: Gen-X04 Extended Mag": "Stufe 13",
    "mk35-isr-support|Rear Grip: Verdugo Brigand Grip": "Stufe 36",
    "mk35-isr-support|Stock: Bowen ST-Move Stock": "Stufe 38",
    "mk78|Optic: Greaves AccuSpot 3x": "Stufe 22",
    "mk78|Barrel: 22\" Impulse HB-762 Barrel": "Stufe 36",
    "mk78|Underbarrel: Bowen Sentry Foregrip": "Stufe 24",
    "mk78|Rear Grip: Fleet-G2 Grip": "Stufe 39",
    "mk78|Fire Mods: Accelerated Recoil System": "Stufe 34",
    "mxr-17|Optic: EAM XL Reflex": "Stufe 12",
    "mxr-17|Muzzle: Monolithic Suppressor": "Stufe 43",
    "mxr-17|Barrel: 17\" Greaves Scourge Barrel": "Stufe 35",
    "mxr-17|Magazine: Rhodes Drum Mag": "Stufe 30",
    "mxr-17|Stock: Winch Stock": "Stufe 17",
    "ds20-mirage|Optic: EAM XL Reflex": "Stufe 12",
    "ds20-mirage|Muzzle: Monolithic Suppressor": "Stufe 18",
    "ds20-mirage|Barrel: 17.1\" Abdicator Barrel": "Stufe 29",
    "ds20-mirage|Magazine: Griffon Reserve Extended II": "Stufe 27",
    "ds20-mirage|Rear Grip: A1-C Control Grip": "Stufe 33",
    "kogot-7|Muzzle: Hawker Series 45": "Stufe 18",
    "kogot-7|Barrel: 8.5\" Targil Hock-XR Barrel": "Stufe 7",
    "kogot-7|Underbarrel: EAM Steady-90 Grip": "Stufe 31",
    "kogot-7|Magazine: Vex Expanse Mag": "Stufe 32",
    "kogot-7|Fire Mods: Buffer Spring": "Stufe 28",
    "carbon-57|Barrel: 14\" Rockleigh Barrel": "Stufe 27",
    "carbon-57|Underbarrel: Vitalize Handstop": "Stufe 16",
    "carbon-57|Magazine: Compact-246 Fast Mag": "Stufe 20",
    "carbon-57|Rear Grip: Bombus Quick Grip": "Stufe 8",
    "carbon-57|Fire Mods: Accelerated Recoil System": "Stufe 3",
    "ak-27|Muzzle: EMT3 Compensator": "Stufe 3",
    "ak-27|Barrel: 18.2\" Vostok Extended Barrel": "Stufe 27",
    "ak-27|Underbarrel: Ironhold Angled Grip": "Stufe 10",
    "ak-27|Rear Grip: Garin Advanced Grip": "Stufe 39",
    "ak-27|Fire Mods: 7.62 Soviet Overpressured": "Stufe 18",
    "m15-mod-0|Optic: Reflex ELO": "Stufe 1",
    "m15-mod-0|Muzzle: Compensator": "Stufe 13",
    "m15-mod-0|Barrel: Reinforced Long Barrel": "Stufe 11",
    "m15-mod-0|Underbarrel: Vertical Foregrip": "Stufe 28",
    "m15-mod-0|Rear Grip: Quickdraw Grip": "Stufe 1",
    "dravec-45|Muzzle: Compensator": "Stufe 4",
    "dravec-45|Barrel: Ranger Barrel": "Stufe 11",
    "dravec-45|Underbarrel: Lightweight Handstop": "Stufe 3",
    "dravec-45|Magazine: Fast Mag": "Prestige",
    "dravec-45|Stock: Raider Stock": "Stufe 4",
    "peacekeeper-mk1|Muzzle: Ported Compensator": "Stufe 31",
    "peacekeeper-mk1|Barrel: Balanced Barrel": "Stufe 6",
    "peacekeeper-mk1|Underbarrel: Precision Foregrip": "Stufe 17",
    "peacekeeper-mk1|Rear Grip: Quickdraw Grip": "Stufe 9",
    "peacekeeper-mk1|Stock: Agile Stock": "Stufe 4",
    "mxr-17|Optic: Reflex ELO": "Stufe 1",
    "mxr-17|Muzzle: Compensator": "Stufe 23",
    "mxr-17|Barrel: Reinforced Barrel": "Stufe 14",
    "mxr-17|Underbarrel: Precision Foregrip": "Stufe 2",
    "mxr-17|Rear Grip: Ergonomic Grip": "Stufe 19",
    "ak-27|Muzzle: Compensator": "Stufe 3",
    "ak-27|Barrel: Extended Barrel": "Stufe 27",
    "ak-27|Underbarrel: Angled Foregrip": "Stufe 2",
    "ak-27|Rear Grip: Advanced Grip": "Stufe 39",
    "ak-27|Fire Mods: Overpressured": "Stufe 18",
    "kogot-7|Barrel: 13.5\" Canis-05 Barrel": "Stufe 13",
    "kogot-7|Magazine: Fortune Extended Mag": "Stufe 16",
    "voyak-kt-3|Optic: Redwell 30-S 2x": "Stufe 22",
    "voyak-kt-3|Muzzle: Monolithic Suppressor": "Stufe 28",
    "voyak-kt-3|Barrel: 17.6\" LTI Grav-4 Barrel": "Stufe 34",
    "voyak-kt-3|Stock: V-Last Control Pad": "Stufe 33",
    "voyak-kt-3|Magazine: SK-Garrison Drum": "Stufe 40"
  };

  const levelPattern = /\s+\((?:Stufe \d+|Prestige|Standard|Waffenkammer)\)$/;

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/mk\./g, "mk")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function cleanAttachment(value) {
    return String(value || "").replace(levelPattern, "").trim();
  }

  function weaponKey(card) {
    return slug(card?.dataset?.loadoutCard || card?.querySelector(".weapon-name")?.textContent || "");
  }

  function lookupLevel(card, attachment) {
    const weapon = weaponKey(card);
    const clean = cleanAttachment(attachment);
    return unlockLevels[`${weapon}|${clean}`] || unlockLevels[`${weapon.replace(/-support$/, "")}|${clean}`] || "";
  }

  function annotateAttachmentList(root = document) {
    root.querySelectorAll?.("#loadoutGrid .loadout-card .attachment-list li").forEach((item) => {
      const card = item.closest(".loadout-card");
      const clean = cleanAttachment(item.textContent);
      const level = lookupLevel(card, clean);
      if (!level) return;
      item.textContent = `${clean} (${level})`;
    });
  }

  function injectStyle() {
    if (document.querySelector("#attachment-level-style")) return;
    const style = document.createElement("style");
    style.id = "attachment-level-style";
    style.textContent = `
      body #loadoutGrid .attachment-list li {
        color: rgba(245, 247, 251, 0.92) !important;
      }

      body #loadoutGrid .attachment-list li::marker {
        color: var(--tier-accent, #ffcf4a) !important;
      }
    `;
    document.head.append(style);
  }

  function run() {
    injectStyle();
    annotateAttachmentList();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();

  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => annotateAttachmentList(node));
    }
  }).observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener("click", () => setTimeout(run, 80));
  document.addEventListener("input", () => setTimeout(run, 80));
  window.setTimeout(run, 200);
  window.setTimeout(run, 900);
  window.setTimeout(run, 1800);
}());
