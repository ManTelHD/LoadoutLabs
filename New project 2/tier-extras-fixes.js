(function () {
  const extrasByWeapon = {
    mk78: ["Scavenger", "Quick Fix", "Survivor"],
    "ds20-mirage": ["Scavenger", "Quick Fix", "Survivor"],
    "voyak-kt-3": ["Scavenger", "Quick Fix", "Survivor"],
    "mxr-17": ["Scavenger", "Quick Fix", "Survivor"],
    "mk35-isr": ["Quick Fix", "Survivor", "Smoke Grenade"],
    "peacekeeper-mk1": ["Scavenger", "Quick Fix", "Survivor"],
    "ak-27": ["Scavenger", "Quick Fix", "Survivor"],
    "egrt-17": ["Scavenger", "Quick Fix", "Survivor"],
    "m15-mod-0": ["Scavenger", "Quick Fix", "Survivor"],
    "maddox-rfb": ["Scavenger", "Quick Fix", "Survivor"],
    "x9-maverick": ["Scavenger", "Quick Fix", "Survivor"],
    "swordfish-a1": ["Scavenger", "Quick Fix", "Survivor"],
    "sokol-545": ["Scavenger", "Quick Fix", "Survivor"],
    xm325: ["Scavenger", "Quick Fix", "Survivor"],
    "warden-308": ["Scavenger", "Quick Fix", "Survivor"],

    "kogot-7": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "carbon-57": ["Mountaineer", "Quick Fix", "Stim Shot"],
    vst: ["Mountaineer", "Quick Fix", "Stim Shot"],
    "dravec-45": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "ryden-45k": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "sturmwolf-45": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "mpc-25": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "rev-46": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "razor-9mm": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "rk-9": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "1911": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "coda-9": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "velox-57": ["Mountaineer", "Quick Fix", "Stim Shot"],
    "jager-45": ["Mountaineer", "Quick Fix", "Stim Shot"],

    m8a1: ["Survivor", "Smoke Grenade", "Fast Hands"],
    "hawker-hx": ["Survivor", "Smoke Grenade", "Fast Hands"],
    "vs-recon": ["Survivor", "Smoke Grenade", "Fast Hands"],
    "strider-300": ["Survivor", "Smoke Grenade", "Fast Hands"],
    "xr-3-ion": ["Survivor", "Smoke Grenade", "Fast Hands"],
    "shadow-sk": ["Survivor", "Smoke Grenade", "Fast Hands"],
    "m34-novaline": ["Survivor", "Smoke Grenade", "Fast Hands"],
  };

  const slug = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/mk\./g, "mk").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const placeholderPattern = /^\s*(Pair|Quelle|Rolle|Pick-Rate|Pick)\s*:/i;

  function addExtras(card) {
    const key = slug(card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent);
    const extras = extrasByWeapon[key];
    if (!extras?.length) return;

    const list = card.querySelector(".perk-list");
    if (!list) return;

    [...list.querySelectorAll("li")].forEach((item) => {
      if (placeholderPattern.test(item.textContent || "")) item.remove();
    });

    const hasExtras = [...list.querySelectorAll("li")].some((item) => /^\s*Extra\s+\d+\s*:/i.test(item.textContent || ""));
    if (hasExtras) return;

    list.insertAdjacentHTML("beforeend", extras.map((extra, index) => `<li>Extra ${index + 1}: ${extra}</li>`).join(""));
  }

  function run() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach(addExtras);
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
