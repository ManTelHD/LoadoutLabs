(function () {
  const STYLE_ID = "loadout-card-finalizer-style";

  const css = `
    body #loadoutGrid .loadout-card {
      display: grid !important;
      grid-template-columns: clamp(12rem, 16vw, 14.8rem) minmax(0, 1fr) clamp(5.6rem, 7vw, 6.7rem) !important;
      grid-template-rows: auto auto auto !important;
      align-items: start !important;
      gap: 1rem 1.25rem !important;
      min-height: 10.8rem !important;
      padding: 1.15rem 1.35rem 1rem !important;
      border-radius: 0.56rem !important;
      overflow: clip !important;
    }

    body #loadoutGrid .loadout-card .weapon-art,
    body .loadout-grid .loadout-card .weapon-art,
    body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
      grid-column: 1 !important;
      grid-row: 1 !important;
      width: 100% !important;
      max-width: none !important;
      height: 7.05rem !important;
      margin: 0 !important;
      border: 1px solid rgba(var(--tier-card-rgb, 255, 211, 90), 0.18) !important;
      border-radius: 0.46rem !important;
      background: rgba(3, 5, 9, 0.82) !important;
      transform: none !important;
      overflow: hidden !important;
    }

    body #loadoutGrid .loadout-card .weapon-art img,
    body .loadout-grid .loadout-card .weapon-art img,
    body #loadoutGrid .loadout-card:hover .weapon-art img {
      display: block !important;
      width: 100% !important;
      height: 100% !important;
      max-width: none !important;
      max-height: none !important;
      object-fit: contain !important;
      object-position: center center !important;
      padding: 0.08rem !important;
      transform: none !important;
      filter: brightness(1.08) contrast(1.06) saturate(1.08) drop-shadow(0 0.45rem 0.55rem rgba(0,0,0,0.38)) !important;
      transition: none !important;
      animation: none !important;
    }

    body #loadoutGrid .loadout-card .card-body {
      grid-column: 2 !important;
      grid-row: 1 !important;
      min-width: 0 !important;
      padding-right: 0 !important;
      align-self: start !important;
    }

    body #loadoutGrid .loadout-card .rank-badge,
    body .loadout-grid .loadout-card .rank-badge,
    body .tier-group .loadout-card .rank-badge,
    body #loadoutGrid > .loadout-card:nth-child(-n + 3) .rank-badge {
      position: static !important;
      top: auto !important;
      right: auto !important;
      grid-column: 3 !important;
      grid-row: 1 !important;
      justify-self: end !important;
      align-self: start !important;
      width: 6.35rem !important;
      min-width: 6.35rem !important;
      height: 6.35rem !important;
      min-height: 6.35rem !important;
      border-radius: 0.48rem !important;
      font-size: 2.55rem !important;
    }

    body #loadoutGrid .loadout-card .card-details,
    body #loadoutGrid .loadout-card .meta-card-details {
      grid-column: 1 / -1 !important;
      grid-row: 2 !important;
      width: 100% !important;
    }

    body #loadoutGrid .loadout-card .card-footer {
      grid-column: 1 / -1 !important;
      grid-row: 3 !important;
      display: flex !important;
      align-items: center !important;
      gap: 0.72rem !important;
      margin: 0 !important;
      padding-top: 0.92rem !important;
      border-top: 1px solid rgba(255,255,255,0.075) !important;
    }

    body #loadoutGrid .loadout-card .weapon-name {
      font-size: 2.35rem !important;
      line-height: 0.95 !important;
      letter-spacing: 0 !important;
      overflow-wrap: anywhere !important;
    }

    body #loadoutGrid .loadout-card.tier-card-a {
      --tier-card-color: #35d7ff;
      --tier-card-rgb: 53, 215, 255;
    }

    body #loadoutGrid .loadout-card.tier-card-b {
      --tier-card-color: #ffcf4a;
      --tier-card-rgb: 255, 207, 74;
    }

    body #loadoutGrid .loadout-card.tier-card-c {
      --tier-card-color: #b08cff;
      --tier-card-rgb: 176, 140, 255;
    }

    body #loadoutGrid .loadout-card.tier-card-d {
      --tier-card-color: #ff6f91;
      --tier-card-rgb: 255, 111, 145;
    }

    @media (max-width: 980px) {
      body #loadoutGrid .loadout-card {
        grid-template-columns: minmax(10.5rem, 13rem) minmax(0, 1fr) auto !important;
      }

      body #loadoutGrid .loadout-card .weapon-name {
        font-size: 2.05rem !important;
      }
    }

    @media (max-width: 760px) {
      body #loadoutGrid .loadout-card {
        grid-template-columns: minmax(0, 1fr) !important;
        grid-template-rows: auto auto auto auto !important;
        min-height: 0 !important;
        padding: 0.95rem !important;
      }

      body #loadoutGrid .loadout-card .weapon-art,
      body .loadout-grid .loadout-card .weapon-art,
      body #loadoutGrid > .loadout-card.tier-absolute-meta .weapon-art {
        grid-column: 1 !important;
        grid-row: 1 !important;
        width: 100% !important;
        height: 8.2rem !important;
        padding-right: 5.25rem !important;
      }

      body #loadoutGrid .loadout-card .card-body {
        grid-column: 1 !important;
        grid-row: 2 !important;
      }

      body #loadoutGrid .loadout-card .card-details,
      body #loadoutGrid .loadout-card .meta-card-details {
        grid-column: 1 !important;
        grid-row: 3 !important;
      }

      body #loadoutGrid .loadout-card .card-footer {
        grid-column: 1 !important;
        grid-row: 4 !important;
      }

      body #loadoutGrid .loadout-card .rank-badge,
      body .loadout-grid .loadout-card .rank-badge,
      body .tier-group .loadout-card .rank-badge,
      body #loadoutGrid > .loadout-card:nth-child(-n + 3) .rank-badge {
        position: absolute !important;
        top: 1rem !important;
        right: 1rem !important;
        width: 4.75rem !important;
        min-width: 4.75rem !important;
        height: 4.75rem !important;
        min-height: 4.75rem !important;
        font-size: 2rem !important;
      }

      body #loadoutGrid .loadout-card .weapon-name {
        font-size: 1.9rem !important;
      }
    }
  `;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = css;
    window.__loadoutCardFinalizerReady = true;
    window.__loadoutCardPolishReady = true;
  }

  function setExpanded(card, expanded) {
    const button = card && card.querySelector(".expand-button");
    if (!card || !button) return;
    const label = button.querySelector("span");
    card.classList.toggle("expanded", expanded);
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (label) label.textContent = expanded ? "Schliessen" : "Details";
  }

  function bindDetailsFallback() {
    if (window.__loadoutCardFinalizerClickReady) return;
    window.__loadoutCardFinalizerClickReady = true;
    document.addEventListener("click", (event) => {
      const button = event.target.closest("#loadoutGrid .expand-button");
      if (!button) return;
      const card = button.closest(".loadout-card");
      const intended = !(card?.classList.contains("expanded") || button.getAttribute("aria-expanded") === "true");
      window.setTimeout(() => setExpanded(card, intended), 70);
    }, true);
  }

  function init() {
    installStyle();
    bindDetailsFallback();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
