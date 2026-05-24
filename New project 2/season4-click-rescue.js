(function () {
  const season4Image = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/patchnotes/body/bo7/wz/s03r/BO7-S03R_PATCHNOTES-WZ.jpg";
  const season4 = {
    title: "Season 4",
    description: "Watchlist für Black Ops 7 und Warzone Season 4: erwarteter Start, Blogpost-Fenster, mögliche Inhalte und offene Punkte. Offizielle Season-4-Details sind noch nicht vollständig bestätigt.",
    kicker: "BO7 & Warzone",
    updateTime: "Stand: 24. Mai 2026",
    updateSummary: "Season 4 ist noch nicht vollständig offiziell enthüllt. Der Start wird nach dem Season-03-Reloaded-Fenster erwartet; der große Blogpost dürfte kurz vor dem Start erscheinen.",
    stats: [["Status", "Watchlist"], ["Start", "erwartet Anfang Juni"], ["Blogpost", "kurz vor Start erwartet"], ["Fokus", "WZ · MP · Zombies · Endgame"]],
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

  function html(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function activateSeason4(button) {
    document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".secondary-mode-switch .mode-button").forEach((item) => item.classList.remove("active"));

    const contentTabs = document.querySelector("#contentTabs");
    if (contentTabs) contentTabs.hidden = true;

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

    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    };

    setText("#tierTitle", season4.title);
    setText("#tierDescription", season4.description);
    setText("#modeInfoTitle", season4.title);
    setText("#modeInfoDescription", season4.description);
    setText("#modeInfoKicker", season4.kicker);
    setText("#modeInfoUpdateTime", season4.updateTime);
    setText("#modeInfoUpdateSummary", season4.updateSummary);

    const image = document.querySelector("#modeInfoImage");
    if (image) {
      image.src = season4Image;
      image.alt = "Season 4 Watchlist für Black Ops 7 und Warzone";
    }

    const stats = document.querySelector("#modeInfoStats");
    if (stats) stats.innerHTML = season4.stats.map(([label, value]) => `<div><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("");

    const cards = document.querySelector("#modeInfoCards");
    if (cards) cards.innerHTML = season4.cards.map(([title, text]) => `<article><h3>${html(title)}</h3><p>${html(text)}</p></article>`).join("");

    const tips = document.querySelector("#modeInfoTips");
    if (tips) tips.innerHTML = season4.tips.map((tip, index) => `<li><span>${index + 1}</span>${html(tip)}</li>`).join("");

    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      gallery.innerHTML = "";
      gallery.hidden = true;
      gallery.style.display = "none";
    }
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".season4-mode-button, [data-mode='season4-info']");
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    activateSeason4(button);
  }, true);
})();
