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
    "krs-7-62": {
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

  function parseAttachment(value) {
    const clean = String(value || "").replace(/\s+/g, " ").trim();
    const levelMatch = clean.match(/\((Stufe [^)]+|Prestige)\)\s*$/i);
    const level = levelMatch ? levelMatch[1] : "";
    const withoutLevel = levelMatch ? clean.slice(0, levelMatch.index).trim() : clean;
    const parts = withoutLevel.split(":");
    const slot = parts.length > 1 ? parts.shift().trim() : "Aufsatz";
    const name = parts.join(":").trim() || withoutLevel;
    return { slot, name, level };
  }

  function legacyItemsHtml(items) {
    return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function premiumAttachmentHtml(items) {
    return items.map((item) => {
      const attachment = parseAttachment(item);
      return `<li class="loadout-slot"><span class="slot-type">${escapeHtml(attachment.slot)}</span><strong>${escapeHtml(attachment.name)}</strong>${attachment.level ? `<em>${escapeHtml(attachment.level)}</em>` : ""}</li>`;
    }).join("");
  }

  function premiumPerkHtml(items) {
    return items.map((item, index) => `<li class="perk-chip"><span>${index + 1}</span><strong>${escapeHtml(item)}</strong></li>`).join("");
  }

  function ensureBuildCode(card, build) {
    const setupPanel = card.querySelector(".setup-panel");
    if (!setupPanel || !build.code) return;

    let codeBox = setupPanel.querySelector(".build-code-box");
    if (!codeBox) {
      setupPanel.insertAdjacentHTML("afterbegin", `<div class="build-code-box"><span>Klassen-Code</span><strong></strong></div>`);
      codeBox = setupPanel.querySelector(".build-code-box");
    }

    const value = codeBox.querySelector("strong");
    if (value) value.textContent = build.code;
  }

  function updatePanelCounters(card, build) {
    const attachmentCount = card.querySelector(".attachments-panel .detail-panel-title strong");
    const extrasCount = card.querySelector(".setup-panel .detail-panel-title strong");
    if (attachmentCount) attachmentCount.textContent = `${build.attachments.length}/5`;
    if (extrasCount) extrasCount.textContent = String(build.extras.length);
  }

  function applyBuild(card) {
    const key = slug(card.dataset.loadoutCard || card.querySelector(".weapon-name")?.textContent);
    const build = supplementalBuilds[key];
    if (!build) return;

    const signature = `supplement:${build.code}|${build.attachments.join("|")}|${build.extras.join("|")}`;
    if (card.dataset.supplementalBuildSignature === signature) return;

    const premiumAttachments = card.querySelector(".premium-attachment-list");
    const premiumPerks = card.querySelector(".premium-perk-list");
    const legacyAttachments = card.querySelector(".attachment-list");
    const legacyPerks = card.querySelector(".perk-list");

    if (premiumAttachments) premiumAttachments.innerHTML = premiumAttachmentHtml(build.attachments);
    else if (legacyAttachments) legacyAttachments.innerHTML = legacyItemsHtml(build.attachments);

    if (premiumPerks) premiumPerks.innerHTML = premiumPerkHtml(build.extras);
    else if (legacyPerks) {
      legacyPerks.innerHTML = legacyItemsHtml([
        `Code: ${build.code}`,
        ...build.extras.map((extra, index) => `Extra ${index + 1}: ${extra}`),
      ]);
    }

    ensureBuildCode(card, build);
    updatePanelCounters(card, build);
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
