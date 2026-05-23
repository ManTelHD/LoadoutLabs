(function () {
  const seasonCopy = {
    title: "Season 4",
    description: "Sammelpunkt fuer Season-4-News, Patchnotes, Meta-Aenderungen und neue Inhalte.",
    kicker: "Season 4",
    updateTime: "Season 4 Watchlist",
    updateSummary: "Offizielle Patchnotes, neue Waffen, Maps, Events und Balance-Aenderungen werden hier gesammelt, sobald sie bestaetigt sind.",
    stats: [
      ["Status", "Watchlist"],
      ["Fokus", "Patchnotes"],
      ["Meta", "Balance"],
      ["Content", "Waffen & Events"],
    ],
    cards: [
      ["Patchnotes", "Sobald offizielle Season-4-Patchnotes erscheinen, landen die wichtigsten Balance-Aenderungen hier."],
      ["Neue Inhalte", "Neue Waffen, Maps, Modi, Events und Rewards werden gesammelt, sobald sie bestaetigt sind."],
      ["Meta-Ausblick", "Loadout-Aenderungen und wichtige Nerfs/Buffs werden fuer Warzone und Black Ops 7 getrennt eingeordnet."],
      ["Regel", "Geruechte bleiben Kontext. Als Fakt zaehlen nur offizielle Call-of-Duty-Quellen."],
    ],
    tips: [
      "Season 4 bekommt einen eigenen Schnellzugriff neben Updates und MW4.",
      "Offizielle Patchnotes haben Vorrang vor Leaks oder Geruechten.",
      "Meta-Aenderungen werden erst nach bestaetigten Zahlen als Empfehlung markiert.",
      "Neue Waffen und Events werden hier sichtbar gebuendelt.",
    ],
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function injectStyle() {
    if (document.querySelector("#final-ui-patch-style")) return;
    const style = document.createElement("style");
    style.id = "final-ui-patch-style";
    style.textContent = `
      .primary-mode-switch {
        grid-template-columns: repeat(3, minmax(9rem, 1fr)) !important;
        max-width: min(48rem, 100%) !important;
      }

      .primary-mode-switch .mw4-mode-button::before {
        content: "Geruechte" !important;
      }

      .primary-mode-switch .season-mode-button::before {
        content: "Neu";
        display: block;
        margin-bottom: 0.16rem;
        color: var(--amber);
        font-size: 0.66rem;
        font-weight: 950;
        text-transform: uppercase;
      }

      @media (max-width: 720px) {
        .primary-mode-switch {
          grid-template-columns: 1fr !important;
        }
      }
    `;
    document.head.append(style);
  }

  function patchTabs() {
    const switcher = document.querySelector(".primary-mode-switch");
    const mw4Button = switcher?.querySelector(".mw4-mode-button");
    if (!switcher || !mw4Button) return;

    mw4Button.textContent = "MW4";

    if (!switcher.querySelector(".season-mode-button")) {
      const seasonButton = document.createElement("button");
      seasonButton.className = "mode-button season-mode-button";
      seasonButton.dataset.mode = "season-4-info";
      seasonButton.type = "button";
      seasonButton.textContent = "Season 4";
      switcher.append(seasonButton);
    }
  }

  function activateModeInfoPanel() {
    const contentTabs = document.querySelector("#contentTabs");
    if (contentTabs) contentTabs.hidden = true;

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      const active = panel.dataset.panel === "mode-info";
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
  }

  function setText(id, value) {
    const element = document.querySelector(`#${id}`);
    if (element) element.textContent = value;
  }

  function renderSeason4() {
    setText("tierTitle", seasonCopy.title);
    setText("tierDescription", seasonCopy.description);
    setText("modeInfoTitle", seasonCopy.title);
    setText("modeInfoDescription", seasonCopy.description);
    setText("modeInfoKicker", seasonCopy.kicker);
    setText("modeInfoUpdateTime", seasonCopy.updateTime);
    setText("modeInfoUpdateSummary", seasonCopy.updateSummary);

    const image = document.querySelector("#modeInfoImage");
    if (image) {
      image.src = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/bo7/bo7-s03-reloaded/BO7-S03-RELOADED-ANNOUNCEMENT-001.webp";
      image.alt = "Call of Duty Season Watch";
    }

    const stats = document.querySelector("#modeInfoStats");
    if (stats) {
      stats.innerHTML = seasonCopy.stats
        .map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
        .join("");
    }

    const cards = document.querySelector("#modeInfoCards");
    if (cards) {
      cards.innerHTML = seasonCopy.cards
        .map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`)
        .join("");
    }

    const tips = document.querySelector("#modeInfoTips");
    if (tips) {
      tips.innerHTML = seasonCopy.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
    }

    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) gallery.innerHTML = "";
  }

  function patchSeasonClick() {
    if (document.documentElement.dataset.seasonPatchReady === "true") return;
    document.documentElement.dataset.seasonPatchReady = "true";

    document.addEventListener("click", (event) => {
      const button = event.target.closest(".season-mode-button");
      if (!button) return;

      document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => {
        item.classList.toggle("active", item === button);
      });

      activateModeInfoPanel();
      renderSeason4();
    });
  }

  function patchAll() {
    injectStyle();
    patchTabs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patchAll);
  } else {
    patchAll();
  }

  patchSeasonClick();
  setTimeout(patchAll, 100);
  setTimeout(patchAll, 500);
  setTimeout(patchAll, 1200);
  document.addEventListener("click", () => setTimeout(patchAll, 80));
}());
