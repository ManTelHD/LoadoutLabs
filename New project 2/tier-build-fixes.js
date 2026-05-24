(function () {
  const builds = {
    "mk35-isr": ["Optic: FANG HoverPoint ELO", "Muzzle: Monolithic Suppressor", "Barrel: 16.5\" Greaves Bellum Barrel", "Underbarrel: VAS Convergence Foregrip", "Magazine: Bowen Siren Drum"],
    "peacekeeper-mk1": ["Muzzle: Ported Compensator", "Barrel: Balanced Barrel", "Underbarrel: Precision Foregrip", "Rear Grip: Quickdraw Grip", "Stock: Agile Stock"],
    "ak-27": ["Muzzle: EMT3 Compensator", "Barrel: 18.2\" Vostok Extended Barrel", "Underbarrel: Ironhold Angled Grip", "Rear Grip: Garin Advanced Grip", "Fire Mods: 7.62 Soviet Overpressured"],
    "ryden-45k": ["Muzzle: Compensator", "Barrel: Long Barrel", "Underbarrel: Lightweight Handstop", "Magazine: Extended Mag II", "Rear Grip: Quickdraw Grip"],
    "sturmwolf-45": ["Muzzle: Suppressor", "Barrel: Reinforced Barrel", "Underbarrel: Vitalize Handstop", "Magazine: Extended Mag II", "Stock: Combat Stock"],
    "egrt-17": ["Optic: EAM XL Reflex", "Muzzle: Monolithic Suppressor", "Barrel: Reinforced Long Barrel", "Underbarrel: Vertical Foregrip", "Magazine: Extended Mag II"],
    "mpc-25": ["Muzzle: K&S Compensator", "Barrel: 14.5\" VAS Ashe Barrel", "Underbarrel: Zero Shift Handstop", "Magazine: MPC Overload Drum", "Fire Mods: Recoil Sync Unit"],
    "m15-mod-0": ["Optic: Reflex ELO", "Muzzle: Compensator", "Barrel: Reinforced Long Barrel", "Underbarrel: Vertical Foregrip", "Rear Grip: Quickdraw Grip"],
    "rev-46": ["Muzzle: Compensator", "Barrel: Long Barrel", "Underbarrel: Vitalize Handstop", "Magazine: Extended Mag II", "Rear Grip: Ergonomic Grip"],
    "razor-9mm": ["Optic: Lethal Tools ELO", "Muzzle: H-9mm Precision Comp", "Barrel: 12\" MFS Sidewinder Barrel", "Magazine: Zealot Extended Mag II", "Stock: Serpent Pad"],
    "maddox-rfb": ["Optic: EAM XL Reflex", "Muzzle: Monolithic Suppressor", "Barrel: Reinforced Barrel", "Magazine: Extended Mag II", "Rear Grip: Control Grip"],
    "x9-maverick": ["Optic: Reflex ELO", "Muzzle: Monolithic Suppressor", "Barrel: Long Barrel", "Underbarrel: Vertical Foregrip", "Magazine: Extended Mag II"],
    "m8a1": ["Optic: Variable Zoom Scope", "Muzzle: Suppressor", "Barrel: Marksman Barrel", "Magazine: Fast Mag", "Fire Mods: Overpressured"],
    "hawker-hx": ["Muzzle: Suppressor", "Barrel: Reinforced Barrel", "Magazine: Fast Mag", "Rear Grip: Quickdraw Grip", "Fire Mods: High Velocity"],
    "vs-recon": ["Muzzle: Suppressor", "Barrel: Long Barrel", "Magazine: Fast Mag", "Rear Grip: Ergonomic Grip", "Fire Mods: High Velocity"],
    "strider-300": ["Muzzle: Monolithic Suppressor", "Barrel: 25\" Bowen Grooved Barrel", "Magazine: Carnation Fast Mag", "Rear Grip: Hatch Quick Grip", "Fire Mods: .300 WM Overpressured"],
  };

  const slug = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/mk\./g, "mk").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const isPlaceholder = (text) => /keine gepr|quelle:\s*wzstats|pick-rate:|rolle:/i.test(text || "");

  function fillCard(card) {
    const key = slug(card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent);
    const attachments = builds[key];
    if (!attachments) return;

    const list = card.querySelector(".attachment-list");
    if (!list) return;

    const items = [...list.querySelectorAll("li")];
    const hasRealAttachment = items.some((item) => !isPlaceholder(item.textContent));
    if (hasRealAttachment) return;

    list.innerHTML = attachments.map((attachment) => `<li>${attachment}</li>`).join("");
  }

  function run() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach(fillCard);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();

  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(run, 120);
  window.setTimeout(run, 600);
  window.setTimeout(run, 1600);
}());
