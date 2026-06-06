(function () {
  const closeRangeExtras = ["Mountaineer", "Quick Fix", "Stim Shot"];
  const sniperExtras = ["Survivor", "Smoke Grenade", "Fast Hands"];
  const utilityExtras = ["Mountaineer", "Quick Fix", "Survivor"];

  const supplementalBuilds = {
    "cbrs-3": {
      code: "LL-CBRS3-A10",
      extras: closeRangeExtras,
      attachments: [
        "Muzzle: Compensator (Stufe 4)",
        "Barrel: Long Barrel (Stufe 12)",
        "Underbarrel: Lightweight Handstop (Stufe 3)",
        "Magazine: Extended Mag II (Stufe 28)",
        "Rear Grip: Quickdraw Grip (Stufe 9)",
      ],
    },
    "krs-762": {
      code: "LL-KRS762-B7",
      extras: sniperExtras,
      attachments: [
        "Optic: Variable Zoom Scope (Stufe 8)",
        "Muzzle: Suppressor (Stufe 9)",
        "Barrel: Marksman Barrel (Stufe 18)",
        "Magazine: Fast Mag (Prestige)",
        "Fire Mods: High Velocity (Stufe 24)",
      ],
    },
    grimhawk: {
      code: "LL-GRIMHAWK-D11",
      extras: utilityExtras,
      attachments: ["Keine Waffenaufsätze verfügbar"],
    },
  };

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/mk\./g, "mk")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function itemsHtml(items) {
    return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function applyBuild(card) {
    const key = slug(card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent);
    const build = supplementalBuilds[key];
    if (!build) return;

    const signature = `supplement:${build.code}|${build.attachments.join("|")}|${build.extras.join("|")}`;
    if (card.dataset.supplementalBuildSignature === signature) return;

    const attachmentList = card.querySelector(".attachment-list");
    const perkList = card.querySelector(".perk-list");

    if (attachmentList) attachmentList.innerHTML = itemsHtml(build.attachments);
    if (perkList) {
      perkList.innerHTML = itemsHtml([
        `Code: ${build.code}`,
        ...build.extras.map((extra, index) => `Extra ${index + 1}: ${extra}`),
      ]);
    }

    card.dataset.supplementalBuildSignature = signature;
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
    if (!grid || grid.dataset.supplementalBuildsWatched === "true") return;
    grid.dataset.supplementalBuildsWatched = "true";
    new MutationObserver(scheduleRun).observe(grid, { childList: true, subtree: true });
  }

  function init() {
    scheduleRun();
    watchGrid();
    window.__loadoutSupplementalBuilds = supplementalBuilds;
    window.__loadoutBuildSupplementsReady = true;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(init, 120);
  window.setTimeout(init, 900);
}());
