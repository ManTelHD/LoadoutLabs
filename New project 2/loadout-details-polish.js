(function () {
  if (document.querySelector("#loadout-details-polish-style")) return;

  const slotLabels = {
    optic: "Visier",
    muzzle: "Mündung",
    barrel: "Lauf",
    underbarrel: "Unterlauf",
    magazine: "Magazin",
    "rear grip": "Griff",
    stock: "Schaft",
    "fire mods": "Mod",
  };

  const escapeHtml = (value) => String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  function parseAttachment(text) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return null;

    const levelMatch = clean.match(/\((Stufe [^)]+|Prestige)\)\s*$/i);
    const level = levelMatch ? levelMatch[1] : "";
    const withoutLevel = levelMatch ? clean.slice(0, levelMatch.index).trim() : clean;
    const parts = withoutLevel.split(":");
    const rawSlot = parts.length > 1 ? parts.shift().trim() : "Aufsatz";
    const name = parts.join(":").trim() || withoutLevel;
    const slotKey = rawSlot.toLowerCase();

    return {
      slot: slotLabels[slotKey] || rawSlot,
      name,
      level,
    };
  }

  function parsePerk(text) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (!clean) return null;
    const match = clean.match(/^Extra\s*(\d+)\s*:\s*(.+)$/i);
    if (!match) return null;
    return { number: match[1], name: match[2] };
  }

  function buildDetails(card) {
    const details = card.querySelector(".card-details, .meta-card-details");
    if (!details || details.dataset.polishedDetails === "true") return;

    const attachments = [...details.querySelectorAll(".attachment-list li")]
      .map((item) => parseAttachment(item.textContent))
      .filter(Boolean);
    const perkItems = [...details.querySelectorAll(".perk-list li")]
      .map((item) => item.textContent || "");
    const code = (perkItems.find((item) => /^\s*Code\s*:/i.test(item)) || "")
      .replace(/^\s*Code\s*:\s*/i, "")
      .trim();
    const perks = perkItems.map(parsePerk).filter(Boolean);

    if (!attachments.length && !perks.length && !code) return;

    const attachmentHtml = attachments.map((item) => `
      <li class="loadout-slot">
        <span class="slot-type">${escapeHtml(item.slot)}</span>
        <strong>${escapeHtml(item.name)}</strong>
        ${item.level ? `<em>${escapeHtml(item.level)}</em>` : ""}
      </li>
    `).join("");

    const perkHtml = perks.map((item) => `
      <li class="perk-chip">
        <span>${escapeHtml(item.number)}</span>
        <strong>${escapeHtml(item.name)}</strong>
      </li>
    `).join("");

    details.innerHTML = `
      <div class="premium-details-grid">
        <section class="detail-panel attachments-panel" aria-label="Aufsätze">
          <div class="detail-panel-title">
            <span>Aufsätze</span>
            <strong>${attachments.length || 0}/5</strong>
          </div>
          <ul class="premium-attachment-list">${attachmentHtml}</ul>
        </section>
        <section class="detail-panel setup-panel" aria-label="Setup">
          ${code ? `
            <div class="build-code-box">
              <span>Build Code</span>
              <strong>${escapeHtml(code)}</strong>
            </div>
          ` : ""}
          ${perks.length ? `
            <div class="detail-panel-title compact-title">
              <span>Extras</span>
              <strong>${perks.length}</strong>
            </div>
            <ul class="premium-perk-list">${perkHtml}</ul>
          ` : ""}
        </section>
      </div>
    `;
    details.dataset.polishedDetails = "true";
  }

  function run() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach(buildDetails);
  }

  function scheduleRun() {
    window.requestAnimationFrame(run);
  }

  const style = document.createElement("style");
  style.id = "loadout-details-polish-style";
  style.textContent = `
    body #loadoutGrid .card-details,
    body #loadoutGrid .meta-card-details {
      padding-top: 0.85rem !important;
    }

    body #loadoutGrid .premium-details-grid {
      display: grid !important;
      grid-template-columns: minmax(0, 1.35fr) minmax(14rem, 0.85fr) !important;
      gap: 0.85rem !important;
      align-items: stretch !important;
    }

    body #loadoutGrid .detail-panel {
      position: relative !important;
      overflow: hidden !important;
      border: 1px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.2) !important;
      border-radius: 0.48rem !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent 62%),
        rgba(6, 9, 12, 0.48) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
    }

    body #loadoutGrid .detail-panel::before {
      content: "" !important;
      position: absolute !important;
      inset: 0 auto 0 0 !important;
      width: 0.18rem !important;
      background: rgba(var(--tier-card-rgb, 185, 255, 61), 0.85) !important;
      pointer-events: none !important;
    }

    body #loadoutGrid .detail-panel-title {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 0.8rem !important;
      padding: 0.72rem 0.82rem 0.55rem 1rem !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
      color: rgba(255, 255, 255, 0.72) !important;
      font-size: 0.72rem !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .detail-panel-title strong {
      color: rgb(var(--tier-card-rgb, 185, 255, 61)) !important;
      font-size: 0.78rem !important;
    }

    body #loadoutGrid .premium-attachment-list,
    body #loadoutGrid .premium-perk-list {
      display: grid !important;
      gap: 0.42rem !important;
      margin: 0 !important;
      padding: 0.74rem !important;
      list-style: none !important;
    }

    body #loadoutGrid .premium-attachment-list {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }

    body #loadoutGrid .loadout-slot {
      display: grid !important;
      grid-template-columns: minmax(4.4rem, auto) minmax(0, 1fr) auto !important;
      align-items: center !important;
      gap: 0.55rem !important;
      min-height: 2.45rem !important;
      padding: 0.48rem 0.56rem !important;
      border: 1px solid rgba(255, 255, 255, 0.075) !important;
      border-radius: 0.38rem !important;
      background: rgba(255, 255, 255, 0.035) !important;
    }

    body #loadoutGrid .slot-type {
      color: rgb(var(--tier-card-rgb, 185, 255, 61)) !important;
      font-size: 0.67rem !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .loadout-slot strong {
      min-width: 0 !important;
      color: #f7f9fc !important;
      font-size: 0.86rem !important;
      line-height: 1.12 !important;
    }

    body #loadoutGrid .loadout-slot em {
      justify-self: end !important;
      border: 1px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.28) !important;
      border-radius: 999px !important;
      padding: 0.16rem 0.42rem !important;
      background: rgba(var(--tier-card-rgb, 185, 255, 61), 0.08) !important;
      color: rgba(255, 255, 255, 0.8) !important;
      font-size: 0.66rem !important;
      font-style: normal !important;
      font-weight: 800 !important;
      white-space: nowrap !important;
    }

    body #loadoutGrid .setup-panel {
      display: grid !important;
      align-content: start !important;
    }

    body #loadoutGrid .build-code-box {
      margin: 0.74rem 0.74rem 0 !important;
      padding: 0.72rem !important;
      border: 1px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.34) !important;
      border-radius: 0.42rem !important;
      background:
        linear-gradient(135deg, rgba(var(--tier-card-rgb, 185, 255, 61), 0.16), transparent 64%),
        rgba(0, 0, 0, 0.22) !important;
    }

    body #loadoutGrid .build-code-box span {
      display: block !important;
      margin-bottom: 0.24rem !important;
      color: rgba(255, 255, 255, 0.62) !important;
      font-size: 0.68rem !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .build-code-box strong {
      display: block !important;
      color: #fff !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: 1.05rem !important;
      line-height: 1.05 !important;
      word-break: break-word !important;
    }

    body #loadoutGrid .compact-title {
      margin-top: 0.2rem !important;
      border-bottom: 0 !important;
      padding-bottom: 0.2rem !important;
    }

    body #loadoutGrid .premium-perk-list {
      padding-top: 0.25rem !important;
    }

    body #loadoutGrid .perk-chip {
      display: grid !important;
      grid-template-columns: 1.55rem minmax(0, 1fr) !important;
      align-items: center !important;
      gap: 0.48rem !important;
      min-height: 2.2rem !important;
      padding: 0.4rem 0.52rem !important;
      border: 1px solid rgba(255, 255, 255, 0.075) !important;
      border-radius: 0.38rem !important;
      background: rgba(255, 255, 255, 0.035) !important;
    }

    body #loadoutGrid .perk-chip span {
      display: grid !important;
      width: 1.42rem !important;
      height: 1.42rem !important;
      place-items: center !important;
      border-radius: 999px !important;
      background: rgb(var(--tier-card-rgb, 185, 255, 61)) !important;
      color: #060809 !important;
      font-size: 0.76rem !important;
      font-weight: 900 !important;
    }

    body #loadoutGrid .perk-chip strong {
      color: #f7f9fc !important;
      font-size: 0.86rem !important;
      line-height: 1.12 !important;
    }

    @media (max-width: 980px) {
      body #loadoutGrid .premium-details-grid,
      body #loadoutGrid .premium-attachment-list {
        grid-template-columns: 1fr !important;
      }

      body #loadoutGrid .loadout-slot {
        grid-template-columns: minmax(4rem, auto) minmax(0, 1fr) !important;
      }

      body #loadoutGrid .loadout-slot em {
        grid-column: 2 !important;
        justify-self: start !important;
      }
    }
  `;

  document.head.appendChild(style);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();

  const grid = document.querySelector("#loadoutGrid");
  if (grid) new MutationObserver(scheduleRun).observe(grid, { childList: true, subtree: true });
  window.setTimeout(run, 160);
  window.setTimeout(run, 900);
}());
