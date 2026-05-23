(function () {
  const seasonCopy = {
    title: "Season 4",
    description: "Alle aktuellen Infos, Erwartungen und Geruechte zu Black Ops 7 und Warzone Season 4: Start, Blogpost-Fenster, Content-Drop, Meta, Ranked, Zombies und Warzone-Ausblick.",
    kicker: "Season 4 Watch",
    updateTime: "Start erwartet: 4. Juni 2026 um 18:00 MESZ",
    updateSummary: "Season 4 wird nach Battle-Pass-Timer und mehreren News-Berichten fuer Donnerstag, 4. Juni 2026 erwartet. Der uebliche COD-Rollout ist 9AM PT / 12PM ET, also 18:00 Uhr MESZ. Ein offizieller Season-4-Blogpost ist am 23. Mai 2026 noch nicht live; nach dem Muster von Season 03 und Season 03 Reloaded ist der grosse Blog realistisch etwa 7 bis 8 Tage vorher zu erwarten, also grob zwischen 27. und 29. Mai.",
    stats: [
      ["Start", "4. Juni 2026"],
      ["Uhrzeit", "18:00 MESZ"],
      ["Blogpost", "27.-29. Mai erwartet"],
      ["Status", "Timer/News, nicht Reveal-Blog"],
    ],
    cards: [
      ["Start & Download", "Season 4 soll am Donnerstag, 4. Juni 2026 starten. Erwartete Uhrzeit: 18:00 Uhr MESZ. News-Seiten nennen grob 20 bis 50 GB je nach Plattform; sicherheitshalber vorher Speicher frei machen und Season-3-Battle-Pass abschliessen."],
      ["Wann kommt der Blogpost?", "Offiziell ist der Season-4-Blog noch nicht live. Season 03 wurde etwa 8 Tage vor Start gebloggt, Season 03 Reloaded etwa 7 Tage vor Start. Wenn Activision dem Muster folgt, ist der grosse Season-4-Blog realistisch zwischen 27. und 29. Mai 2026. Patchnotes kommen meistens kurz vor oder zum Launch."],
      ["Battle Pass & Rewards", "Erwartet werden wieder ueber 100 Battle-Pass-Items: neue Waffen, Operator-Skins, Camos, Blueprints, XP-Token und woechentliche Challenges. Welche Waffen genau kommen, ist bis zum offiziellen Blog noch nicht bestaetigt."],
      ["Multiplayer", "Zu erwarten sind neue 6v6-Maps, neue Modi oder Playlist-Rotationen und frische Events. Mehrere Berichte sprechen ausserdem von moeglichen Black-Ops-4-Remastern. Das bleibt Geruecht, bis Treyarch/Call of Duty die Map-Liste nennt."],
      ["Warzone", "Warzone-Spieler achten vor allem auf Fortune's Keep: Berichte und Rumor-Roundups erwarten eine Rueckkehr oder einen Refresh in Season 4. Dazu passen neue POIs, Resurgence-Fokus, Ranked-Anpassungen und ein neues Loot-/Utility-Meta. Offiziell bestaetigt ist die genaue Warzone-Liste noch nicht."],
      ["Zombies & Endgame", "Leaks deuten auf eine neue rundenbasierte Zombies-Map zur Midseason hin, also eher Season 4 Reloaded als Launch. Endgame duerfte neue Events, Challenges, Balancing und moegliche LTM-Rotationen bekommen. Alles bis zum Blog als Erwartung behandeln."],
      ["Meta & Ranked", "Zum Season-Start sind Buffs und Nerfs sehr wahrscheinlich. Wichtig fuer Loadout Lab: neue Waffen koennen die Meta in der ersten Woche kippen, alte Top-Picks koennen durch Recoil-, Damage-Range- oder Attachment-Aenderungen fallen."],
      ["MW4-Reveal-Geruecht", "Einige Warzone-Rumors spekulieren ueber Teaser, Easter Eggs oder ein Ingame-Event Richtung MW4. Das ist aktuell der weichste Teil der Geruechte. Als Fakt erst anzeigen, wenn Call of Duty, Activision oder Infinity Ward es offiziell posten."],
      ["Quellenlage", "Harte Basis: Season-3-Battle-Pass-Timer und mehrere News-Berichte nennen den 4. Juni. Offizieller Season-4-Reveal-Blog: noch ausstehend. Content-Details: teils erwartbares COD-Season-Muster, teils Leaks/Rumors."],
    ],
    tips: [
      "Bis 4. Juni: Season-3-Battle-Pass, Events und wichtige Waffen-Level abschliessen.",
      "Blogpost im Blick behalten: realistisch 27.-29. Mai 2026, falls Activision beim 7-8-Tage-Muster bleibt.",
      "Warzone-Fokus: Fortune's Keep/Resurgence, Ranked-Tweaks, neue POIs und Utility-Meta beobachten.",
      "Multiplayer-Fokus: neue 6v6-Maps, BO4-Remaster-Geruechte, neue Modi und Ranked-Regeln pruefen.",
      "Zombies-Fokus: Midseason/Reloaded fuer eine neue Round-Based-Map beobachten.",
      "Meta-Fokus: neue Waffen nicht sofort als Meta markieren; erste Patchnotes und Live-Daten abwarten.",
      "MW4-Teaser bleiben Geruecht, bis offizielle COD-/Infinity-Ward-Posts erscheinen.",
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
      image.alt = "Call of Duty Season 4 Watch";
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
