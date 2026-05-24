(function () {
  const season4Image = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/wz/s03r/BO7-S03R_PATCHNOTES-WZ.jpg";

  const season4 = {
    title: "Season 4",
    description: "Watchlist für Black Ops 7 und Warzone Season 4: erwarteter Start, Blogpost-Fenster, mögliche Inhalte und offene Punkte. Offizielle Season-4-Details sind noch nicht vollständig bestätigt.",
    kicker: "BO7 & Warzone",
    updateTime: "Stand: 24. Mai 2026",
    updateSummary: "Season 4 ist noch nicht vollständig offiziell enthüllt. Der Start wird nach dem Season-03-Reloaded-Fenster erwartet; der große Blogpost dürfte kurz vor dem Start erscheinen.",
    stats: [
      ["Status", "Watchlist"],
      ["Start", "erwartet Anfang Juni"],
      ["Blogpost", "kurz vor Start erwartet"],
      ["Fokus", "WZ · MP · Zombies · Endgame"],
    ],
    cards: [
      ["Startfenster", "Season 4 wird nach dem Season-03-Reloaded-Zyklus erwartet. Solange Activision keinen finalen Termin nennt, bleibt Anfang Juni 2026 die wahrscheinlichste Einordnung."],
      ["Blogpost-Erwartung", "Der große Season-4-Blogpost kommt normalerweise wenige Tage vor dem Season-Start. Sobald er live ist, sollten Startzeit, Roadmap, Battle Pass, Waffen und Events hier ersetzt werden."],
      ["Warzone", "Zu erwarten sind Playlist-Updates, Balance-Änderungen, Events und neue oder zurückkehrende Items. Konkrete Warzone-Inhalte sind noch als offen zu behandeln."],
      ["Multiplayer", "Wahrscheinlich sind neue Maps, Modi und saisonale Events. Namen, Layouts und Ranked-Änderungen bleiben bis zur offiziellen Roadmap unbestätigt."],
      ["Zombies", "Falls Season 4 Zombies-Inhalte bringt, sind neue Challenges, Events, Field-Upgrades oder Quest-Erweiterungen die wichtigsten Punkte für die Watchlist."],
      ["Battle Pass & Waffen", "Neue Waffen, BlackCell, Operator-Skins und Aftermarket-/Attachment-Inhalte sind typische Season-Bausteine. Exakte Namen erst nach offizieller Bestätigung übernehmen."],
      ["Meta-Auswirkung", "Direkt zum Season-Start sollten Waffen-Buffs, Nerfs, Attachments und Pickrates geprüft werden, weil sich die WZ META schnell verschieben kann."],
      ["To-do für Loadout Lab", "Sobald die Roadmap erscheint: Datum aktualisieren, offizielle Bilder tauschen, neue Waffen einpflegen, Meta-Hinweise prüfen und Update-Karten neu sortieren."],
    ],
    tips: [
      "Noch keine vollständige offizielle Season-4-Roadmap im Tab hinterlegen, solange der Blogpost fehlt.",
      "Start, Waffen, Maps und Events klar als erwartet markieren, bis Activision sie bestätigt.",
      "Nach dem Blogpost zuerst Warzone-Balance und neue Waffen aktualisieren.",
      "Danach Battle Pass, Events, Zombies und Endgame sauber nachziehen.",
    ],
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function injectSeason4Style() {
    if (document.querySelector("#season4-polish-style")) return;

    const style = document.createElement("style");
    style.id = "season4-polish-style";
    style.textContent = `
      body .season4-watch-panel {
        --s4-green: #b9ff3d;
        --s4-green-rgb: 185, 255, 61;
        --s4-gold: #d8b457;
        --s4-gold-rgb: 216, 180, 87;
      }

      body .season4-watch-panel .mode-info-hero {
        position: relative !important;
        overflow: hidden !important;
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.34) !important;
        background:
          radial-gradient(circle at 78% 16%, rgba(var(--s4-green-rgb), 0.2), transparent 20rem),
          linear-gradient(135deg, rgba(var(--s4-green-rgb), 0.11), rgba(9, 14, 17, 0.92) 42%, rgba(5, 8, 11, 0.96)) !important;
        box-shadow: 0 0 2.2rem rgba(var(--s4-green-rgb), 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
      }

      body .season4-watch-panel #modeInfoKicker {
        color: #e8ffb4 !important;
        border-color: rgba(var(--s4-green-rgb), 0.5) !important;
        background: rgba(var(--s4-green-rgb), 0.1) !important;
        box-shadow: 0 0 1rem rgba(var(--s4-green-rgb), 0.12) !important;
      }

      body .season4-watch-panel #modeInfoTitle {
        color: #f4ffd8 !important;
        text-shadow: 0 0 1.1rem rgba(var(--s4-green-rgb), 0.18) !important;
      }

      body .season4-watch-panel .mode-info-layout {
        align-items: start !important;
        gap: clamp(1.1rem, 2vw, 1.75rem) !important;
      }

      body .season4-watch-panel .mode-info-main,
      body .season4-watch-panel .mode-info-side {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.2) !important;
        background:
          radial-gradient(circle at 15% 0%, rgba(var(--s4-green-rgb), 0.13), transparent 22rem),
          linear-gradient(145deg, rgba(15, 22, 20, 0.94), rgba(6, 9, 12, 0.96)) !important;
        box-shadow: 0 1.4rem 3rem rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      }

      body .season4-watch-panel .mode-info-main {
        overflow: hidden !important;
      }

      body .season4-watch-panel #modeInfoImage {
        width: 100% !important;
        aspect-ratio: 16 / 9 !important;
        object-fit: cover !important;
        object-position: center center !important;
        border-radius: 8px 8px 0 0 !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(var(--s4-green-rgb), 0.3) !important;
        box-shadow: 0 1.1rem 2.4rem rgba(0, 0, 0, 0.36) !important;
      }

      body .season4-watch-panel .mode-info-body {
        padding: clamp(1rem, 1.6vw, 1.35rem) !important;
      }

      body .season4-watch-panel #modeInfoStats,
      body .season4-watch-panel #modeInfoCards,
      body .season4-watch-panel #modeInfoTips {
        gap: 0.75rem !important;
      }

      body .season4-watch-panel #modeInfoStats > div {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.24) !important;
        background: linear-gradient(145deg, rgba(var(--s4-green-rgb), 0.11), rgba(7, 10, 13, 0.88)) !important;
      }

      body .season4-watch-panel #modeInfoStats strong,
      body .season4-watch-panel #modeInfoCards h3 {
        color: #dfff91 !important;
      }

      body .season4-watch-panel .mode-update-box {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-gold-rgb), 0.3) !important;
        background:
          linear-gradient(90deg, rgba(var(--s4-gold-rgb), 0.14), rgba(var(--s4-green-rgb), 0.055)),
          rgba(8, 12, 15, 0.9) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      }

      body .season4-watch-panel #modeInfoCards article {
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.18) !important;
        border-left: 0.32rem solid rgba(var(--s4-green-rgb), 0.82) !important;
        background:
          linear-gradient(135deg, rgba(var(--s4-green-rgb), 0.075), rgba(10, 14, 18, 0.92)),
          #090d11 !important;
        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease !important;
      }

      body .season4-watch-panel #modeInfoCards article:hover {
        transform: translateY(-0.06rem);
        border-color: rgba(var(--s4-green-rgb), 0.34) !important;
        box-shadow: 0 0.9rem 1.8rem rgba(0, 0, 0, 0.24), 0 0 1.1rem rgba(var(--s4-green-rgb), 0.1) !important;
      }

      body .season4-watch-panel .mode-info-side {
        padding: clamp(1rem, 1.5vw, 1.35rem) !important;
        position: sticky !important;
        top: 1rem !important;
        overflow: hidden !important;
      }

      body .season4-watch-panel .mode-info-side::before {
        content: "" !important;
        position: absolute !important;
        inset: 0 0 auto 0 !important;
        height: 0.22rem !important;
        background: linear-gradient(90deg, var(--s4-green), rgba(var(--s4-green-rgb), 0.18)) !important;
        pointer-events: none !important;
      }

      body .season4-watch-panel .mode-info-side h3 {
        margin: 0 0 0.95rem !important;
        color: #f4ffd8 !important;
        font-size: clamp(1.35rem, 1.7vw, 1.8rem) !important;
        line-height: 1 !important;
        text-shadow: 0 0 1.1rem rgba(var(--s4-green-rgb), 0.18) !important;
      }

      body .season4-watch-panel #modeInfoTips {
        display: grid !important;
        padding: 0 !important;
        margin: 0 !important;
        list-style: none !important;
      }

      body .season4-watch-panel #modeInfoTips li {
        position: relative !important;
        margin: 0 !important;
        padding: 0.78rem 0.85rem 0.78rem 2.35rem !important;
        border-radius: 8px !important;
        border: 1px solid rgba(var(--s4-green-rgb), 0.18) !important;
        background:
          linear-gradient(135deg, rgba(var(--s4-green-rgb), 0.085), rgba(8, 12, 15, 0.92)),
          #090d11 !important;
        color: rgba(255, 255, 255, 0.9) !important;
        line-height: 1.45 !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
      }

      body .season4-watch-panel #modeInfoTips li::before {
        content: "" !important;
        position: absolute !important;
        left: 0.82rem !important;
        top: 0.96rem !important;
        width: 0.68rem !important;
        height: 0.68rem !important;
        border-radius: 999px !important;
        background: var(--s4-green) !important;
        box-shadow: 0 0 0 0.22rem rgba(var(--s4-green-rgb), 0.13), 0 0 1rem rgba(var(--s4-green-rgb), 0.24) !important;
      }

      body .season4-watch-panel #modeInfoGallery,
      body .season4-watch-panel .official-note {
        display: none !important;
      }

      @media (max-width: 900px) {
        body .season4-watch-panel .mode-info-side {
          position: relative !important;
          top: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getSeason4Button() {
    const buttons = Array.from(document.querySelectorAll(".primary-mode-switch .mode-button, .primary-mode-switch button"));
    return buttons.find((button) => {
      const label = (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      const mode = String(button.dataset.mode || "").toLowerCase();
      return mode === "season4-info" || label.includes("season 4");
    });
  }

  function prepareSeason4Button() {
    const button = getSeason4Button();
    if (!button) return null;
    button.classList.add("mode-button", "season-mode-button", "season4-mode-button");
    button.dataset.mode = "season4-info";
    button.type = "button";
    return button;
  }

  function activateSeason4Panel(button) {
    injectSeason4Style();
    document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".secondary-mode-switch .mode-button").forEach((item) => item.classList.remove("active"));

    const tabs = document.querySelector("#contentTabs");
    if (tabs) tabs.hidden = true;

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      const active = panel.dataset.panel === "mode-info";
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });

    const panel = document.querySelector('[data-panel="mode-info"]');
    if (panel) {
      panel.classList.add("season4-watch-panel");
      panel.classList.remove("mw4-watch-panel");
    }

    document.querySelector("#tierTitle") && (document.querySelector("#tierTitle").textContent = season4.title);
    document.querySelector("#tierDescription") && (document.querySelector("#tierDescription").textContent = season4.description);
    document.querySelector("#modeInfoTitle") && (document.querySelector("#modeInfoTitle").textContent = season4.title);
    document.querySelector("#modeInfoDescription") && (document.querySelector("#modeInfoDescription").textContent = season4.description);
    document.querySelector("#modeInfoKicker") && (document.querySelector("#modeInfoKicker").textContent = season4.kicker);
    document.querySelector("#modeInfoUpdateTime") && (document.querySelector("#modeInfoUpdateTime").textContent = season4.updateTime);
    document.querySelector("#modeInfoUpdateSummary") && (document.querySelector("#modeInfoUpdateSummary").textContent = season4.updateSummary);

    const image = document.querySelector("#modeInfoImage");
    if (image) {
      image.src = season4Image;
      image.alt = "Season 4 Watchlist für Black Ops 7 und Warzone";
    }

    const stats = document.querySelector("#modeInfoStats");
    if (stats) {
      stats.innerHTML = season4.stats.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
    }

    const cards = document.querySelector("#modeInfoCards");
    if (cards) {
      cards.innerHTML = season4.cards.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("");
    }

    const tips = document.querySelector("#modeInfoTips");
    if (tips) {
      tips.innerHTML = season4.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
    }

    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      gallery.innerHTML = "";
      gallery.hidden = true;
      gallery.style.display = "none";
    }

    document.querySelectorAll(".season4-watch-panel .official-note").forEach((note) => {
      note.hidden = true;
      note.style.display = "none";
    });
  }

  function bindSeason4() {
    const button = prepareSeason4Button();
    injectSeason4Style();
    if (!button || button.dataset.season4Bound === "true") return;

    button.dataset.season4Bound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      activateSeason4Panel(button);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindSeason4, { once: true });
  } else {
    bindSeason4();
  }

  window.setTimeout(bindSeason4, 300);
})();
