(function () {
  if (document.querySelector("#hero-polish-style")) return;

  const style = document.createElement("style");
  style.id = "hero-polish-style";
  style.textContent = `
    body .tier-first {
      padding-top: clamp(1rem, 2vw, 1.65rem) !important;
    }

    body .tier-first .section-heading {
      position: relative !important;
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto !important;
      align-items: end !important;
      gap: 0.85rem 1.25rem !important;
      max-width: min(58rem, 100%) !important;
      margin: 0 0 0.85rem !important;
      padding: 1.1rem 1.25rem !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-left: 0.36rem solid rgba(185, 255, 61, 0.72) !important;
      border-radius: 0.48rem !important;
      background:
        linear-gradient(135deg, rgba(185, 255, 61, 0.095), rgba(13, 18, 25, 0.86) 38%, rgba(8, 11, 15, 0.92)),
        #0a0f15 !important;
      box-shadow: 0 1.15rem 2.4rem rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.045) !important;
    }

    body .tier-first .section-heading::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      background: radial-gradient(circle at 82% 18%, rgba(255, 216, 106, 0.11), transparent 17rem) !important;
      pointer-events: none !important;
    }

    body .tier-first .section-heading .eyebrow {
      position: relative !important;
      grid-column: 1 / -1 !important;
      width: fit-content !important;
      margin: 0 !important;
      padding: 0.22rem 0.5rem !important;
      border: 1px solid rgba(185, 255, 61, 0.26) !important;
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
      max-width: 38rem !important;
      margin: 0 !important;
      color: #f4f7fb !important;
      font-size: clamp(2.05rem, 4.1vw, 3.55rem) !important;
      line-height: 0.94 !important;
      letter-spacing: 0 !important;
      text-wrap: balance !important;
      text-shadow: 0 0.9rem 2.2rem rgba(0, 0, 0, 0.3) !important;
      z-index: 1 !important;
    }

    body .tier-first .updated-note {
      position: relative !important;
      grid-column: 2 !important;
      grid-row: 2 !important;
      justify-self: end !important;
      align-self: end !important;
      margin: 0 !important;
      min-height: 2.05rem !important;
      border-color: rgba(255, 216, 106, 0.22) !important;
      background: rgba(9, 13, 18, 0.78) !important;
      color: #d7dee8 !important;
      white-space: nowrap !important;
      z-index: 1 !important;
    }

    body .primary-mode-switch {
      grid-template-columns: repeat(3, minmax(10rem, 1fr)) !important;
      max-width: min(58rem, 100%) !important;
      gap: 0.45rem !important;
      margin: 0 0 0.45rem !important;
      padding: 0.35rem !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 0.55rem !important;
      background: rgba(7, 10, 14, 0.58) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
    }

    body .primary-mode-switch .mode-button {
      min-height: 3rem !important;
      border-radius: 0.38rem !important;
      padding: 0.5rem 0.8rem !important;
      font-size: 1.02rem !important;
    }

    body .primary-mode-switch .mode-button::before {
      font-size: 0.58rem !important;
      opacity: 0.95 !important;
    }

    body .secondary-mode-switch,
    body .content-tabs {
      min-height: 2.55rem !important;
      margin-top: 0 !important;
      margin-bottom: 0.48rem !important;
      padding: 0.22rem !important;
      border: 1px solid rgba(255, 255, 255, 0.09) !important;
      background: rgba(7, 10, 14, 0.62) !important;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035) !important;
    }

    body .secondary-mode-switch {
      display: inline-grid !important;
      grid-template-columns: repeat(2, minmax(10rem, 1fr)) !important;
      width: min(32rem, 100%) !important;
    }

    body .secondary-mode-switch .camo-mode-button {
      display: none !important;
    }

    body .secondary-mode-switch .mode-button,
    body .content-tab {
      min-height: 2.18rem !important;
      padding: 0.38rem 0.82rem !important;
      font-size: 0.9rem !important;
    }

    body .content-tabs {
      width: fit-content !important;
      margin-left: 0 !important;
      transform: translateY(-0.02rem) !important;
    }

    body .tab-panel.active {
      margin-top: 0.35rem !important;
    }

    @media (max-width: 820px) {
      body .tier-first .section-heading {
        grid-template-columns: 1fr !important;
        padding: 0.95rem !important;
      }

      body .tier-first .updated-note {
        grid-column: 1 !important;
        grid-row: auto !important;
        justify-self: start !important;
        white-space: normal !important;
      }

      body .primary-mode-switch,
      body .secondary-mode-switch {
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
