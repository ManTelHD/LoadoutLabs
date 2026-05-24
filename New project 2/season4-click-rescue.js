(function () {
  const season4Image = "https://assets.games.gg/cod_warzone_fortunes_keep_map_easter_29200c5157.webp";
  const season4 = {
    title: "Season 4",
    description: "Aktueller Season-4-Überblick für Black Ops 7 und Warzone: Starttermin, Blogpost-Erwartung, bestätigte technische Änderungen und die wichtigsten Gerüchte zu Maps, Warzone, Zombies, Battle Pass und Meta.",
    kicker: "BO7 & Warzone",
    updateTime: "Stand: 24. Mai 2026",
    updateSummary: "Season 4 wird aktuell für Donnerstag, 4. Juni 2026 erwartet. Der Rollout wird wie üblich gegen 18:00 Uhr MESZ erwartet. Die vollständige Roadmap und der große Blogpost sind noch nicht live, sollten aber in den Tagen vor dem Start erscheinen.",
    stats: [["Start", "4. Juni 2026"], ["Uhrzeit", "ca. 18:00 MESZ"], ["Blogpost", "kurz vor Start erwartet"], ["Status", "Mix aus Fakt & Leak"]],
    cards: [
      ["Start & Preload", "Mehrere aktuelle Berichte leiten den Season-4-Start aus dem Battle-Pass-Timer ab: Donnerstag, 4. Juni 2026. Erwartet wird der normale Call-of-Duty-Rollout um 9 AM PT / 18:00 Uhr MESZ. Download-Größen werden je nach Plattform grob im Bereich 20 bis 50 GB erwartet."],
      ["Blogpost & Roadmap", "Der offizielle Season-4-Blogpost ist Stand 24. Mai noch nicht erschienen. Der große Overview-Post kommt normalerweise wenige Tage vor dem Season-Start. Sobald er live ist, sollten Roadmap, Startzeit, Waffen, Events, Maps und Battle-Pass-Inhalte hier gegen bestätigte Fakten getauscht werden."],
      ["Offiziell: PC-Sicherheit", "In den offiziellen BO7 Season-03-Patchnotes steht bereits eine Änderung für Season 04: Microsoft Azure Attestation wird auf PC für die meisten Playlists Pflicht. Dafür müssen TPM und Secure Boot aktiv sein; bei fehlender Attestation droht eingeschränktes Matchmaking."],
      ["Warzone-Gerüchte", "Für Warzone wird mit Playlist-Updates, Balance-Änderungen und Ranked-Anpassungen gerechnet. Mehrere Berichte nennen außerdem Fortune's Keep als möglichen Rückkehrer, was vor allem Resurgence-Spieler und aggressive Ranked-Strategien betreffen würde. Noch als Gerücht markieren."],
      ["Multiplayer-Erwartung", "Typisch für einen großen Season-Start sind neue 6v6-Maps, Modi, Events und mindestens ein Remaster. Aktuelle Berichte sprechen von möglichen Black-Ops-4-Remaster-Anleihen, aber ohne offizielle Roadmap bleibt das unbestätigt."],
      ["Zombies & Mid-Season", "Mehrere Seiten erwarten eine neue round-based Zombies-Map zur Mid-Season beziehungsweise Season 4 Reloaded. Das würde an Season 3 mit Grief/Totenreich anschließen. Bis Treyarch den Namen und die Features bestätigt, bleibt das eine Watchlist-Info."],
      ["Battle Pass & Waffen", "Erwartet werden wieder 100+ Battle-Pass-Inhalte mit neuen Waffen, Operator-Skins, Camos, Blueprints und BlackCell. Weekly Challenges dürften erneut Attachments, XP und saisonale Rewards liefern."],
      ["Meta-Auswirkung", "Zum Season-Start sind Buffs und Nerfs sehr wahrscheinlich. Für Loadout Lab heißt das: WZ META direkt nach Patchnotes neu prüfen, neue Waffen einordnen, Pickrates beobachten und Score-Werte der Meta-Kacheln aktualisieren."],
      ["Was sofort aktualisiert werden muss", "Sobald der offizielle Blogpost live ist: Datum/Uhrzeit bestätigen, Roadmap-Bild setzen, neue Waffen und Maps übernehmen, Zombies-Inhalte trennen nach Launch und Reloaded, Warzone-Playlist/Ranked prüfen und Meta-Waffen neu sortieren."],
    ],
    tips: [
      "Bestätigt: Season 04 bringt auf PC neue MAA-/TPM-/Secure-Boot-Anforderungen für die meisten Playlists.",
      "Sehr wahrscheinlich: Start am 4. Juni 2026 gegen 18:00 Uhr MESZ, abgeleitet aus Battle-Pass-Timer und üblichen Rollout-Zeiten.",
      "Noch Gerücht: Fortune's Keep, BO4-Remaster-Maps und eine neue Zombies-Map zur Mid-Season.",
      "Nach dem offiziellen Blogpost müssen Bilder, Waffen, Roadmap, Events und Meta-Hinweise sofort ersetzt werden.",
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
