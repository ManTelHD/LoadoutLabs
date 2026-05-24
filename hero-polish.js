(function () {
  if (document.querySelector("#hero-polish-style")) return;

  const style = document.createElement("style");
  style.id = "hero-polish-style";
  style.textContent = `
    body .tier-first {
      max-width: min(98.5rem, calc(100vw - clamp(1rem, 2.4vw, 2.75rem))) !important;
      padding-top: clamp(0.85rem, 1.7vw, 1.35rem) !important;
      margin-inline: auto !important;
    }

    body .tier-first .section-heading {
      position: relative !important;
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      grid-template-areas:
        "kicker date"
        "title title" !important;
      align-items: center !important;
      gap: 0.72rem 1rem !important;
      max-width: min(82rem, 100%) !important;
      margin: 0 0 0.7rem !important;
      padding: 0.95rem 1.08rem 1.08rem !important;
      border: 1px solid rgba(255, 255, 255, 0.105) !important;
      border-left: 0.34rem solid rgba(185, 255, 61, 0.74) !important;
      border-radius: 0.46rem !important;
      background:
        radial-gradient(circle at 88% 18%, rgba(255, 216, 106, 0.1), transparent 20rem),
        linear-gradient(135deg, rgba(185, 255, 61, 0.08), rgba(13, 18, 25, 0.88) 34%, rgba(8, 11, 15, 0.94)),
        #0a0f15 !important;
      box-shadow: 0 1rem 2.15rem rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.045) !important;
    }

    body .tier-first .section-heading::before {
      content: "" !important;
      position: absolute !important;
      inset: 0 auto 0 0 !important;
      width: 0.18rem !important;
      background: linear-gradient(180deg, #b9ff3d, rgba(41, 230, 129, 0.45)) !important;
      pointer-events: none !important;
    }

    body .tier-first .section-heading::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.055), transparent 54%) !important;
      pointer-events: none !important;
    }

    body .tier-first .section-heading .eyebrow {
      position: relative !important;
      grid-area: kicker !important;
      width: fit-content !important;
      margin: 0 !important;
      padding: 0.22rem 0.52rem !important;
      border: 1px solid rgba(185, 255, 61, 0.28) !important;
      border-radius: 999px !important;
      background: rgba(185, 255, 61, 0.08) !important;
      color: #b9ff3d !important;
      font-size: 0.68rem !important;
      letter-spacing: 0 !important;
      line-height: 1 !important;
      z-index: 1 !important;
    }

    body .tier-first h1 {
      position: relative !important;
      grid-area: title !important;
      max-width: 100% !important;
      margin: 0 !important;
      color: #f4f7fb !important;
      font-size: clamp(2.15rem, 3.75vw, 3.65rem) !important;
      line-height: 0.96 !important;
      letter-spacing: 0 !important;
      text-wrap: balance !important;
      text-shadow: 0 0.75rem 1.9rem rgba(0, 0, 0, 0.32) !important;
      z-index: 1 !important;
    }

    body .tier-first .updated-note {
      position: relative !important;
      grid-area: date !important;
      justify-self: end !important;
      align-self: center !important;
      margin: 0 !important;
      min-height: 1.95rem !important;
      border-color: rgba(255, 216, 106, 0.24) !important;
      background: rgba(9, 13, 18, 0.76) !important;
      color: #d7dee8 !important;
      white-space: nowrap !important;
      z-index: 1 !important;
    }

    body .primary-mode-switch {
      grid-template-columns: repeat(3, minmax(10rem, 1fr)) !important;
      max-width: min(82rem, 100%) !important;
      gap: 0.38rem !important;
      margin: 0 0 0.38rem !important;
      padding: 0.3rem !important;
      border: 1px solid rgba(255, 255, 255, 0.095) !important;
      border-radius: 0.5rem !important;
      background: rgba(7, 10, 14, 0.62) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body .primary-mode-switch .mode-button {
      min-height: 2.95rem !important;
      border-radius: 0.34rem !important;
      padding: 0.46rem 0.78rem !important;
      font-size: 1rem !important;
    }

    body .primary-mode-switch .mode-button::before {
      font-size: 0.57rem !important;
      opacity: 0.95 !important;
    }

    body .secondary-mode-switch,
    body .content-tabs {
      min-height: 2.5rem !important;
      margin-top: 0 !important;
      margin-bottom: 0.48rem !important;
      padding: 0.2rem !important;
      border: 1px solid rgba(255, 255, 255, 0.09) !important;
      background: rgba(7, 10, 14, 0.62) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
      vertical-align: top !important;
    }

    body .secondary-mode-switch {
      display: inline-grid !important;
      grid-template-columns: repeat(2, minmax(10rem, 1fr)) !important;
      width: min(39rem, calc(100% - 13rem)) !important;
      min-width: min(100%, 24rem) !important;
      margin-right: 0.45rem !important;
    }

    body .secondary-mode-switch .camo-mode-button {
      display: none !important;
    }

    body .secondary-mode-switch .mode-button,
    body .content-tab {
      min-height: 2.12rem !important;
      padding: 0.36rem 0.78rem !important;
      font-size: 0.9rem !important;
    }

    body .content-tabs {
      display: inline-flex !important;
      width: fit-content !important;
      margin-left: 0 !important;
      transform: translateY(0) !important;
    }

    body .controls {
      grid-template-columns: minmax(18rem, 1fr) minmax(12rem, 18rem) !important;
      max-width: min(82rem, 100%) !important;
      gap: 0.55rem !important;
      margin: 0.18rem 0 0.55rem !important;
      padding: 0.38rem !important;
      border: 1px solid rgba(255, 255, 255, 0.095) !important;
      border-radius: 0.5rem !important;
      background: rgba(7, 10, 14, 0.58) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
    }

    body .search-box,
    body .select-box {
      gap: 0.25rem !important;
    }

    body .search-box span,
    body .select-box span {
      padding-left: 0.12rem !important;
      color: #8e98a8 !important;
      font-size: 0.66rem !important;
    }

    body .search-box input,
    body .select-box select {
      min-height: 2.75rem !important;
      border-radius: 0.34rem !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 70%),
        rgba(12, 17, 24, 0.9) !important;
    }

    body .toolbar {
      max-width: min(82rem, 100%) !important;
      margin-top: 0 !important;
      margin-bottom: 0.55rem !important;
    }

    body .tab-panel.active {
      margin-top: 0.25rem !important;
    }

    @media (max-width: 820px) {
      body .tier-first {
        max-width: calc(100vw - 1rem) !important;
      }

      body .tier-first .section-heading {
        grid-template-columns: 1fr !important;
        grid-template-areas:
          "kicker"
          "title"
          "date" !important;
        padding: 0.95rem !important;
      }

      body .tier-first .updated-note {
        justify-self: start !important;
        white-space: normal !important;
      }

      body .primary-mode-switch,
      body .secondary-mode-switch,
      body .controls {
        grid-template-columns: 1fr !important;
        width: 100% !important;
      }

      body .content-tabs {
        width: 100% !important;
      }
    }
  `;
  document.head.appendChild(style);
}());
