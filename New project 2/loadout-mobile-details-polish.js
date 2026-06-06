(function () {
  const STYLE_ID = "loadout-mobile-details-polish-style";
  const FILTER_SHELL_CLASS = "mobile-filter-shell";
  const FILTER_TOOLBAR_CLASS = "mobile-filter-toolbar";

  const css = `
    body .${FILTER_SHELL_CLASS} {
      max-width: min(82rem, 100%) !important;
      margin: 0 0 0.85rem !important;
    }

    body .mobile-filter-toggle {
      display: none !important;
    }

    body #filterToolbar.${FILTER_TOOLBAR_CLASS} {
      display: flex !important;
      flex-wrap: wrap !important;
      align-items: center !important;
      gap: 0.45rem !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
    }

    body #filterToolbar.${FILTER_TOOLBAR_CLASS} .filter-button {
      min-height: 2.25rem !important;
      padding: 0.48rem 0.72rem !important;
      border-radius: 999px !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      background: #101821 !important;
      color: #dce6f2 !important;
      font-size: 0.82rem !important;
      font-weight: 900 !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
      box-shadow: none !important;
      transition: border-color 160ms ease, background 160ms ease, color 160ms ease, transform 160ms ease !important;
    }

    body #filterToolbar.${FILTER_TOOLBAR_CLASS} .filter-button:hover {
      border-color: rgba(185, 255, 61, 0.35) !important;
      transform: translateY(-1px) !important;
    }

    body #filterToolbar.${FILTER_TOOLBAR_CLASS} .filter-button.active {
      border-color: transparent !important;
      background: linear-gradient(135deg, #b9ff3d, #24e574) !important;
      color: #061008 !important;
      box-shadow: 0 0.7rem 1.55rem rgba(86, 255, 86, 0.16) !important;
      text-shadow: none !important;
    }

    body #loadoutGrid .loadout-card.expanded .meta-card-details,
    body #loadoutGrid .loadout-card.expanded .card-details {
      padding: 0.95rem !important;
      border: 1px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.2) !important;
      border-radius: 0.72rem !important;
      background: linear-gradient(180deg, rgba(12, 18, 26, 0.96), rgba(6, 10, 15, 0.94)) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.055), 0 1rem 2rem rgba(0, 0, 0, 0.28) !important;
      overflow: visible !important;
    }

    body #loadoutGrid .loadout-card.expanded .expand-button {
      border-color: rgba(var(--tier-card-rgb, 185, 255, 61), 0.42) !important;
      background: rgba(var(--tier-card-rgb, 185, 255, 61), 0.14) !important;
      color: #ffffff !important;
    }

    body #loadoutGrid .detail-source-row {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(8.8rem, 1fr)) !important;
      gap: 0.48rem !important;
      margin: 0 0 0.82rem !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
    }

    body #loadoutGrid .detail-source-chip {
      display: grid !important;
      grid-template-columns: 1fr !important;
      align-content: center !important;
      gap: 0.18rem !important;
      min-height: 3.1rem !important;
      padding: 0.55rem 0.65rem !important;
      border: 1px solid rgba(var(--tier-card-rgb, 185, 255, 61), 0.17) !important;
      border-left: 3px solid var(--tier-card-color, #b9ff3d) !important;
      border-radius: 0.5rem !important;
      background: rgba(255, 255, 255, 0.035) !important;
      white-space: normal !important;
    }

    body #loadoutGrid .detail-source-chip span {
      color: #7d8896 !important;
      font-size: 0.63rem !important;
      font-weight: 950 !important;
      letter-spacing: 0.06em !important;
      line-height: 1 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .detail-source-chip strong,
    body #loadoutGrid .detail-source-chip a {
      color: #f5f8fc !important;
      font-size: 0.88rem !important;
      font-weight: 950 !important;
      line-height: 1.1 !important;
      text-decoration: none !important;
    }

    body #loadoutGrid .attachment-columns,
    body #loadoutGrid .details-columns,
    body #loadoutGrid .loadout-details-grid {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(15.5rem, 1fr)) !important;
      gap: 0.72rem !important;
      align-items: stretch !important;
    }

    body #loadoutGrid .attachments-panel,
    body #loadoutGrid .perks-panel,
    body #loadoutGrid .detail-panel,
    body #loadoutGrid .loadout-panel,
    body #loadoutGrid .build-code-box {
      border: 1px solid rgba(255, 255, 255, 0.085) !important;
      border-radius: 0.62rem !important;
      background: rgba(5, 9, 14, 0.62) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body #loadoutGrid .attachments-panel,
    body #loadoutGrid .perks-panel,
    body #loadoutGrid .detail-panel,
    body #loadoutGrid .loadout-panel {
      padding: 0.74rem !important;
    }

    body #loadoutGrid .detail-panel-title,
    body #loadoutGrid .attachments-panel h4,
    body #loadoutGrid .perks-panel h4 {
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 0.5rem !important;
      margin: 0 0 0.58rem !important;
      color: #f4f7fb !important;
      font-size: 0.78rem !important;
      font-weight: 950 !important;
      letter-spacing: 0.04em !important;
      line-height: 1 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .premium-attachment-list,
    body #loadoutGrid .attachment-list,
    body #loadoutGrid .perk-list {
      display: grid !important;
      gap: 0.42rem !important;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
    }

    body #loadoutGrid .loadout-slot,
    body #loadoutGrid .attachment-item,
    body #loadoutGrid .perk-list li {
      min-height: 2.8rem !important;
      padding: 0.55rem 0.64rem !important;
      border: 1px solid rgba(255, 255, 255, 0.075) !important;
      border-radius: 0.48rem !important;
      background: rgba(255, 255, 255, 0.035) !important;
      color: #dce6f2 !important;
    }

    body #loadoutGrid .loadout-slot strong,
    body #loadoutGrid .attachment-item strong,
    body #loadoutGrid .perk-list strong {
      color: var(--tier-card-color, #b9ff3d) !important;
      font-weight: 950 !important;
    }

    body #loadoutGrid .loadout-slot span,
    body #loadoutGrid .attachment-item span,
    body #loadoutGrid .perk-list span {
      color: #b8c2cf !important;
      font-size: 0.82rem !important;
      line-height: 1.25 !important;
    }

    body #loadoutGrid .build-code-box {
      margin-top: 0.72rem !important;
      padding: 0.72rem !important;
    }

    body #loadoutGrid .build-code-box.no-code {
      background: rgba(255, 255, 255, 0.025) !important;
    }

    @media (max-width: 760px) {
      body .${FILTER_SHELL_CLASS} {
        position: sticky !important;
        top: 0.45rem !important;
        z-index: 18 !important;
        margin: 0 0 0.72rem !important;
        padding: 0.52rem !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 0.72rem !important;
        background: rgba(5, 8, 12, 0.94) !important;
        box-shadow: 0 0.9rem 1.8rem rgba(0, 0, 0, 0.34) !important;
        backdrop-filter: blur(10px) !important;
      }

      body .mobile-filter-toggle {
        display: grid !important;
        grid-template-columns: auto minmax(0, 1fr) auto !important;
        align-items: center !important;
        gap: 0.55rem !important;
        width: 100% !important;
        min-height: 2.6rem !important;
        padding: 0.48rem 0.62rem !important;
        border: 1px solid rgba(185, 255, 61, 0.22) !important;
        border-radius: 0.56rem !important;
        background: #101821 !important;
        color: #f5f8fc !important;
        font-weight: 950 !important;
        letter-spacing: 0 !important;
        line-height: 1 !important;
      }

      body .mobile-filter-toggle-label {
        color: #b9ff3d !important;
        font-size: 0.78rem !important;
        text-transform: uppercase !important;
      }

      body .mobile-filter-toggle-active {
        min-width: 0 !important;
        overflow: hidden !important;
        color: #f5f8fc !important;
        font-size: 0.92rem !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
      }

      body .mobile-filter-toggle-count {
        color: #8f9baa !important;
        font-size: 0.72rem !important;
        white-space: nowrap !important;
      }

      body .mobile-filter-toggle-icon {
        display: inline-grid !important;
        place-items: center !important;
        width: 1.45rem !important;
        height: 1.45rem !important;
        border-radius: 999px !important;
        background: rgba(185, 255, 61, 0.1) !important;
        color: #b9ff3d !important;
        transition: transform 160ms ease !important;
      }

      body .${FILTER_SHELL_CLASS}.filters-open .mobile-filter-toggle-icon {
        transform: rotate(180deg) !important;
      }

      body #filterToolbar.${FILTER_TOOLBAR_CLASS} {
        display: grid !important;
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 0.42rem !important;
        max-height: 0 !important;
        margin-top: 0 !important;
        overflow: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transition: max-height 220ms ease, margin-top 220ms ease, opacity 160ms ease !important;
      }

      body .${FILTER_SHELL_CLASS}.filters-open #filterToolbar.${FILTER_TOOLBAR_CLASS} {
        max-height: 32rem !important;
        margin-top: 0.5rem !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }

      body #filterToolbar.${FILTER_TOOLBAR_CLASS} .filter-button {
        width: 100% !important;
        min-height: 2.18rem !important;
        padding: 0.42rem 0.34rem !important;
        font-size: 0.75rem !important;
        text-align: center !important;
        white-space: nowrap !important;
      }

      body #loadoutGrid .loadout-card.expanded .meta-card-details,
      body #loadoutGrid .loadout-card.expanded .card-details {
        padding: 0.72rem !important;
      }

      body #loadoutGrid .detail-source-row {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        gap: 0.42rem !important;
      }

      body #loadoutGrid .detail-source-chip {
        min-height: 2.95rem !important;
        padding: 0.5rem !important;
      }

      body #loadoutGrid .detail-source-chip strong,
      body #loadoutGrid .detail-source-chip a {
        font-size: 0.78rem !important;
      }

      body #loadoutGrid .attachment-columns,
      body #loadoutGrid .details-columns,
      body #loadoutGrid .loadout-details-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;

  function text(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = css;
  }

  function toolbar() {
    return document.getElementById("filterToolbar") || document.querySelector(".filter-toolbar") || document.querySelector(".filter-button[data-smart-filter]")?.parentElement || null;
  }

  function filterLabel(button) {
    const raw = text(button?.textContent);
    if (!raw) return "Alle";
    return raw.replace("Aufsätzen", "Aufsaetzen");
  }

  function countLabel() {
    const count = document.getElementById("resultCount");
    const raw = text(count?.dataset?.filterCount || count?.textContent || "");
    const match = raw.match(/^(\d+)\s+(?:von|of)\s+(\d+)/i);
    if (match) return `${match[1]}/${match[2]}`;
    return "";
  }

  function updateToggle(shell, bar) {
    const active = bar.querySelector(".filter-button.active") || bar.querySelector(".filter-button");
    const toggle = shell.querySelector(".mobile-filter-toggle");
    if (!toggle) return;
    toggle.querySelector(".mobile-filter-toggle-active").textContent = filterLabel(active);
    toggle.querySelector(".mobile-filter-toggle-count").textContent = countLabel();
    toggle.setAttribute("aria-expanded", shell.classList.contains("filters-open") ? "true" : "false");
  }

  function ensureMobileFilters() {
    const bar = toolbar();
    if (!bar || bar.dataset.mobileDetailsPolished === "true") {
      const shell = bar?.closest(`.${FILTER_SHELL_CLASS}`);
      if (shell) updateToggle(shell, bar);
      return;
    }

    bar.dataset.mobileDetailsPolished = "true";
    if (!bar.id) bar.id = "filterToolbar";
    bar.classList.add(FILTER_TOOLBAR_CLASS);

    const parent = bar.parentElement;
    if (!parent) return;

    let shell = bar.closest(`.${FILTER_SHELL_CLASS}`);
    if (!shell) {
      shell = document.createElement("section");
      shell.className = FILTER_SHELL_CLASS;
      shell.setAttribute("aria-label", "Meta Filter");
      parent.insertBefore(shell, bar);
      shell.append(bar);
    }

    let toggle = shell.querySelector(".mobile-filter-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "mobile-filter-toggle";
      toggle.innerHTML = `
        <span class="mobile-filter-toggle-label">Filter</span>
        <span class="mobile-filter-toggle-active">Alle</span>
        <span class="mobile-filter-toggle-count"></span>
        <span class="mobile-filter-toggle-icon" aria-hidden="true">v</span>
      `;
      shell.insertBefore(toggle, bar);
      toggle.addEventListener("click", () => {
        shell.classList.toggle("filters-open");
        updateToggle(shell, bar);
      });
    }

    bar.querySelectorAll(".filter-button").forEach((button) => {
      if (button.dataset.mobileDetailsBound === "true") return;
      button.dataset.mobileDetailsBound = "true";
      button.addEventListener("click", () => {
        window.setTimeout(() => {
          updateToggle(shell, bar);
          if (window.matchMedia("(max-width: 760px)").matches) shell.classList.remove("filters-open");
          updateToggle(shell, bar);
        }, 180);
      });
    });

    updateToggle(shell, bar);
  }

  function markDetails() {
    document.querySelectorAll("#loadoutGrid .loadout-card").forEach((card) => {
      const panel = card.querySelector(".meta-card-details, .card-details");
      if (!panel) return;
      card.classList.add("details-polished-card");
      panel.classList.add("details-polished-panel");
    });
  }

  function refresh() {
    installStyle();
    ensureMobileFilters();
    markDetails();
    window.__loadoutMobileDetailsPolishReady = true;
  }

  function init() {
    refresh();
    window.setTimeout(refresh, 250);
    window.setTimeout(refresh, 900);
    window.setTimeout(refresh, 1800);
    document.addEventListener("click", () => {
      window.setTimeout(refresh, 80);
      window.setTimeout(refresh, 360);
    }, true);

    const observer = new MutationObserver(() => window.setTimeout(refresh, 80));
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
