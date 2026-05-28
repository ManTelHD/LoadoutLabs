(function () {
  const tabOrder = ["mw4-info", "season4-info", "updates"];
  const tabLabels = {
    "mw4-info": { text: "MW4", kicker: "Gerüchte" },
    "season4-info": { text: "Season 4", kicker: "Neu" },
    updates: { text: "Updates", kicker: "News" },
  };

  function installStyle() {
    if (document.querySelector("#header-tabs-cleanup-style")) return;
    const style = document.createElement("style");
    style.id = "header-tabs-cleanup-style";
    style.textContent = `
      body .tier-first {
        padding-top: clamp(0.65rem, 1.2vw, 1rem) !important;
      }

      body .tier-first .section-heading {
        grid-template-columns: minmax(0, 1fr) auto !important;
        grid-template-areas:
          "kicker date"
          "title date" !important;
        gap: 0.45rem 1rem !important;
        max-width: min(78rem, 100%) !important;
        margin-bottom: 0.6rem !important;
        padding: 0.78rem 0.95rem !important;
        border-left-width: 0.26rem !important;
        background:
          radial-gradient(circle at 86% 14%, rgba(255, 216, 106, 0.08), transparent 18rem),
          linear-gradient(135deg, rgba(185, 255, 61, 0.07), rgba(10, 14, 19, 0.9) 40%, rgba(6, 9, 12, 0.96)) !important;
      }

      body .tier-first .section-heading .eyebrow {
        padding: 0.18rem 0.48rem !important;
        font-size: 0.62rem !important;
      }

      body .tier-first .section-heading #tierDescription {
        display: none !important;
      }

      body .tier-first h1 {
        max-width: 62rem !important;
        font-size: clamp(2rem, 3.05vw, 3.05rem) !important;
        line-height: 0.96 !important;
      }

      body .tier-first .updated-note {
        align-self: center !important;
        min-height: 1.75rem !important;
        padding: 0.32rem 0.62rem !important;
        font-size: 0.72rem !important;
      }

      body .primary-mode-switch {
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        max-width: min(78rem, 100%) !important;
        gap: 0.32rem !important;
        margin-bottom: 0.42rem !important;
        padding: 0.25rem !important;
      }

      body .primary-mode-switch .mode-button {
        min-height: 2.72rem !important;
        padding: 0.4rem 0.7rem !important;
        border-radius: 0.36rem !important;
        font-size: 0.98rem !important;
        letter-spacing: 0 !important;
      }

      body .primary-mode-switch .mode-button::before {
        content: attr(data-kicker) !important;
        display: block !important;
        margin-bottom: 0.12rem !important;
        color: #b9ff3d !important;
        font-size: 0.58rem !important;
        font-weight: 950 !important;
        line-height: 1 !important;
        opacity: 0.95 !important;
      }

      body .primary-mode-switch .mode-button.active::before {
        color: #07100a !important;
      }

      body .secondary-mode-switch {
        width: min(37rem, calc(100% - 13rem)) !important;
        max-width: min(37rem, 100%) !important;
      }

      body .secondary-mode-switch,
      body .content-tabs {
        margin-bottom: 0.42rem !important;
      }

      @media (max-width: 820px) {
        body .tier-first .section-heading {
          grid-template-columns: 1fr !important;
          grid-template-areas:
            "kicker"
            "title"
            "date" !important;
        }

        body .primary-mode-switch {
          grid-template-columns: 1fr !important;
        }

        body .tier-first h1 {
          font-size: clamp(1.95rem, 12vw, 2.55rem) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function reorderPrimaryTabs() {
    const switcher = document.querySelector(".primary-mode-switch");
    if (!switcher) return false;
    const buttons = new Map(Array.from(switcher.querySelectorAll(".mode-button[data-mode]")).map((button) => [button.dataset.mode, button]));
    tabOrder.forEach((mode) => {
      const button = buttons.get(mode);
      if (!button) return;
      const label = tabLabels[mode];
      button.textContent = label.text;
      button.dataset.kicker = label.kicker;
      switcher.appendChild(button);
    });
    return true;
  }

  function cleanupHeaderTabs() {
    installStyle();
    reorderPrimaryTabs();
  }

  document.addEventListener("click", () => window.setTimeout(cleanupHeaderTabs, 30), true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanupHeaderTabs, { once: true });
  } else {
    cleanupHeaderTabs();
  }
})();
