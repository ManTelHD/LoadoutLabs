(function () {
  const builds = {
    mk78: ["Optic: Greaves AccuSpot 3x (Stufe 22)", "Barrel: 22\" Impulse HB-762 Barrel (Stufe 36)", "Underbarrel: Bowen Sentry Foregrip (Stufe 24)", "Rear Grip: Fleet-G2 Grip (Stufe 39)", "Fire Mods: Accelerated Recoil System (Stufe 34)"],
    "kogot-7": ["Muzzle: Hawker Series 45 (Stufe 18)", "Barrel: 8.5\" Targil Hock-XR Barrel (Stufe 7)", "Underbarrel: EAM Steady-90 Grip (Stufe 31)", "Magazine: Vex Expanse Mag (Stufe 32)", "Fire Mods: Buffer Spring (Stufe 28)"],
    "ds20-mirage": ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 18)", "Barrel: 17.1\" Abdicator Barrel (Stufe 29)", "Magazine: Griffon Reserve Extended II (Stufe 27)", "Rear Grip: A1-C Control Grip (Stufe 33)"],
    "carbon-57": ["Barrel: 14\" Rockleigh Barrel (Stufe 27)", "Underbarrel: Vitalize Handstop (Stufe 16)", "Magazine: Compact-246 Fast Mag (Stufe 20)", "Rear Grip: Bombus Quick Grip (Stufe 8)", "Fire Mods: Accelerated Recoil System (Stufe 3)"],
    "voyak-kt-3": ["Optic: Redwell 30-S 2x (Stufe 22)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: 17.6\" LTI Grav-4 Barrel (Stufe 34)", "Stock: V-Last Control Pad (Stufe 33)", "Magazine: SK-Garrison Drum (Stufe 40)"],
    vst: ["Muzzle: H-9mm Precision Comp (Stufe 15)", "Barrel: Longshot Vector Barrel (Stufe 38)", "Underbarrel: Zero Shift Handstop (Stufe 4)", "Magazine: Extended Mag II (Stufe 28)", "Fire Mods: MF 5.56 Defense Conversion (Prestige)"],
    "mxr-17": ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 43)", "Barrel: 17\" Greaves Scourge Barrel (Stufe 35)", "Magazine: Rhodes Drum Mag (Stufe 30)", "Stock: Winch Stock (Stufe 17)"],
    "dravec-45": ["Muzzle: Compensator (Stufe 4)", "Barrel: Ranger Barrel (Stufe 11)", "Underbarrel: Lightweight Handstop (Stufe 3)", "Magazine: Fast Mag (Prestige)", "Stock: Raider Stock (Stufe 4)"],

    "mk35-isr": ["Optic: FANG HoverPoint ELO (Stufe 1)", "Muzzle: Monolithic Suppressor (Stufe 39)", "Barrel: 16.5\" Greaves Bellum Barrel (Stufe 14)", "Underbarrel: VAS Convergence Foregrip (Stufe 1)", "Magazine: Bowen Siren Drum (Stufe 29)"],
    "peacekeeper-mk1": ["Muzzle: Ported Compensator (Stufe 31)", "Barrel: Balanced Barrel (Stufe 6)", "Underbarrel: Precision Foregrip (Stufe 17)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Stock: Agile Stock (Stufe 4)"],
    "ak-27": ["Muzzle: EMT3 Compensator (Stufe 3)", "Barrel: 18.2\" Vostok Extended Barrel (Stufe 27)", "Underbarrel: Ironhold Angled Grip (Stufe 10)", "Rear Grip: Garin Advanced Grip (Stufe 39)", "Fire Mods: 7.62 Soviet Overpressured (Stufe 18)"],
    "ryden-45k": ["Muzzle: Compensator (Stufe 4)", "Barrel: Long Barrel (Stufe 12)", "Underbarrel: Lightweight Handstop (Stufe 3)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 9)"],
    "sturmwolf-45": ["Muzzle: Suppressor (Stufe 9)", "Barrel: Reinforced Barrel (Stufe 14)", "Underbarrel: Vitalize Handstop (Stufe 16)", "Magazine: Extended Mag II (Stufe 28)", "Stock: Combat Stock (Stufe 20)"],
    "egrt-17": ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Reinforced Long Barrel (Stufe 17)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"],
    "mpc-25": ["Muzzle: K&S Compensator (Stufe 20)", "Barrel: 14.5\" VAS Ashe Barrel (Stufe 15)", "Underbarrel: Zero Shift Handstop (Stufe 16)", "Magazine: MPC Overload Drum (Stufe 35)", "Fire Mods: Recoil Sync Unit (Stufe 19)"],
    "m15-mod-0": ["Optic: Reflex ELO (Stufe 1)", "Muzzle: Compensator (Stufe 13)", "Barrel: Reinforced Long Barrel (Stufe 11)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 1)"],
    "rev-46": ["Muzzle: Compensator (Stufe 4)", "Barrel: Long Barrel (Stufe 12)", "Underbarrel: Vitalize Handstop (Stufe 16)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Ergonomic Grip (Stufe 19)"],
    "razor-9mm": ["Optic: Lethal Tools ELO (Stufe 5)", "Muzzle: H-9mm Precision Comp (Stufe 2)", "Barrel: 12\" MFS Sidewinder Barrel (Prestige)", "Magazine: Zealot Extended Mag II (Stufe 37)", "Stock: Serpent Pad (Stufe 39)"],
    "maddox-rfb": ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 18)", "Barrel: Reinforced Barrel (Stufe 14)", "Magazine: Extended Mag II (Stufe 30)", "Rear Grip: Control Grip (Stufe 33)"],
    "x9-maverick": ["Optic: Reflex ELO (Stufe 1)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Long Barrel (Stufe 12)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"],
    m8a1: ["Optic: Variable Zoom Scope (Stufe 8)", "Muzzle: Suppressor (Stufe 9)", "Barrel: Marksman Barrel (Stufe 18)", "Magazine: Fast Mag (Prestige)", "Fire Mods: Overpressured (Stufe 24)"],
    "hawker-hx": ["Muzzle: Suppressor (Stufe 9)", "Barrel: Reinforced Barrel (Stufe 14)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: High Velocity (Stufe 24)"],
    "vs-recon": ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Ergonomic Grip (Stufe 19)", "Fire Mods: High Velocity (Stufe 24)"],
    "strider-300": ["Muzzle: Monolithic Suppressor (Stufe 33)", "Barrel: 25\" Bowen Grooved Barrel (Stufe 21)", "Magazine: Carnation Fast Mag (Stufe 20)", "Rear Grip: Hatch Quick Grip (Stufe 23)", "Fire Mods: .300 WM Overpressured (Stufe 24)"],

    "swordfish-a1": ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Marksman Barrel (Stufe 18)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"],
    "sokol-545": ["Optic: Greaves AccuSpot 3x (Stufe 22)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Reinforced Barrel (Stufe 14)", "Underbarrel: Bowen Sentry Foregrip (Stufe 24)", "Magazine: Extended Mag II (Stufe 30)"],
    "rk-9": ["Muzzle: Compensator (Stufe 4)", "Barrel: Long Barrel (Stufe 12)", "Underbarrel: Lightweight Handstop (Stufe 3)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 9)"],
    xm325: ["Optic: Greaves AccuSpot 3x (Stufe 22)", "Muzzle: Suppressor (Stufe 9)", "Barrel: Reinforced Barrel (Stufe 14)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"],
    "xr-3-ion": ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: High Velocity (Stufe 24)"],

    "shadow-sk": ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: High Velocity (Stufe 24)"],
    "m34-novaline": ["Optic: Variable Zoom Scope (Stufe 8)", "Muzzle: Suppressor (Stufe 9)", "Barrel: Marksman Barrel (Stufe 18)", "Magazine: Fast Mag (Prestige)", "Fire Mods: Overpressured (Stufe 24)"],
    "warden-308": ["Optic: EAM XL Reflex (Stufe 12)", "Muzzle: Monolithic Suppressor (Stufe 28)", "Barrel: Marksman Barrel (Stufe 18)", "Underbarrel: Vertical Foregrip (Stufe 28)", "Magazine: Extended Mag II (Stufe 30)"],
    "1911": ["Muzzle: Compensator (Stufe 4)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: Overpressured (Stufe 24)"],
    "coda-9": ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Ergonomic Grip (Stufe 19)", "Fire Mods: Overpressured (Stufe 24)"],
    "velox-57": ["Muzzle: Compensator (Stufe 4)", "Barrel: Reinforced Barrel (Stufe 14)", "Magazine: Fast Mag (Prestige)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: High Velocity (Stufe 24)"],
    "jager-45": ["Muzzle: Suppressor (Stufe 9)", "Barrel: Long Barrel (Stufe 12)", "Magazine: Extended Mag II (Stufe 28)", "Rear Grip: Quickdraw Grip (Stufe 9)", "Fire Mods: Overpressured (Stufe 24)"],
  };

  const noAttachmentTypes = /launcher|melee|special/i;
  const slug = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/mk\./g, "mk").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const isPlaceholder = (text) => /keine gepr|quelle:\s*wzstats|pick-rate:|rolle:/i.test(text || "");

  function fillCard(card) {
    const key = slug(card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent);
    const weaponClass = card.querySelector(".mode-pill")?.textContent || "";
    const list = card.querySelector(".attachment-list");
    if (!list) return;

    const items = [...list.querySelectorAll("li")];
    const hasRealAttachment = items.some((item) => !isPlaceholder(item.textContent));
    if (hasRealAttachment) return;

    const attachments = builds[key];
    if (attachments?.length) {
      list.innerHTML = attachments.map((attachment) => `<li>${attachment}</li>`).join("");
      return;
    }

    if (noAttachmentTypes.test(weaponClass)) {
      list.innerHTML = "<li>Keine Waffenaufsätze verfügbar</li>";
    }
  }

  function run() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach(fillCard);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();

  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("click", () => setTimeout(run, 80));
  document.addEventListener("input", () => setTimeout(run, 80));
  window.setTimeout(run, 120);
  window.setTimeout(run, 600);
  window.setTimeout(run, 1600);
}());
