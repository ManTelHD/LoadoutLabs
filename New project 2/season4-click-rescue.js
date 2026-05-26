(function () {
  const season4Image = "https://assets.games.gg/cod_warzone_fortunes_keep_map_easter_29200c5157.webp";
  const season4 = {
    title: "Season 4",
    description: "Aktueller Season-4-Überblick für Black Ops 7 und Warzone: bestätigter Start, offizieller Story-Cinematic-Trailer, bekannte PC-Sicherheitsänderung, Blogpost-Status und die wichtigsten offenen Punkte für Warzone, Multiplayer, Zombies, Battle Pass und Meta.",
    kicker: "BO7 & Warzone",
    updateTime: "Stand: 26. Mai 2026",
    updateSummary: "Neu: Der offizielle Season-4-Story-Cinematic-Trailer ist draußen. Season 4 startet am Donnerstag, 4. Juni 2026. Die große Roadmap/der vollständige Call-of-Duty-Blogpost ist noch nicht live; der Season-04-Hub verweist aktuell noch nicht sauber auf den vollständigen Season-4-Overview.",
    stats: [["Start", "4. Juni 2026"], ["Trailer", "Story Cinematic live"], ["Blogpost", "noch ausstehend"], ["Status", "Fakt + Watchlist"]],
    cards: [
      ["Neu: Story-Cinematic-Trailer", "Am 26. Mai ist der offizielle Season-4-Story-Cinematic-Trailer aufgetaucht. Inhaltlich dreht sich der Teaser um den Konflikt Karma gegen Dorne und einen Guild-killing virus, der kurz vor dem Einsatz steht. Das ist jetzt der wichtigste neue Season-4-Aufhänger."],
      ["Start bestätigt", "Season 4 startet am Donnerstag, 4. Juni 2026. Erwartet wird der übliche Call-of-Duty-Rollout am Abend deutscher Zeit. Auf der Seite bleibt der Start deshalb nicht mehr als reines Gerücht, sondern als bestätigtes Startdatum geführt."],
      ["Plattformen", "Der Trailer-/Release-Hinweis nennt PlayStation 4, PlayStation 5, Xbox One, Xbox Series X|S und PC via Steam. Das ist wichtig, weil damit Season 4 weiter auf Last-Gen-Konsolen auftaucht, während die MW4-Gerüchte bereits über einen möglichen Generationenwechsel sprechen."],
      ["Blogpost & Roadmap", "Der große offizielle Season-4-Overview-Blogpost ist Stand 26. Mai noch nicht sauber live. Sobald Activision die vollständige Roadmap veröffentlicht, müssen Waffen, Maps, Events, Battle Pass, Zombies und Warzone-Änderungen sofort gegen bestätigte Angaben ersetzt werden."],
      ["Offiziell: PC-Sicherheit", "Bereits in den offiziellen BO7-Season-03-Patchnotes wurde für Season 04 eine PC-Änderung angekündigt: Microsoft Azure Attestation wird für die meisten Playlists Pflicht. TPM und Secure Boot müssen aktiv sein, sonst kann Matchmaking eingeschränkt werden."],
      ["Warzone Watchlist", "Weiter beobachten: Playlist-Updates, Ranked-Anpassungen, Balance-Änderungen und mögliche Resurgence-/Map-Rotation. Fortune's Keep bleibt bis zur offiziellen Roadmap als Gerücht markiert."],
      ["Multiplayer Watchlist", "Zu erwarten sind neue 6v6-Maps, Modi und Events. Berichte sprechen weiter über mögliche Remaster-Anleihen, aber ohne Roadmap bleiben konkrete Map-Namen unbestätigt."],
      ["Zombies Watchlist", "Die Mid-Season bleibt für Zombies spannend. Aktuell wird weiterhin über eine neue round-based Map bzw. größere Story-Fortsetzung spekuliert. Nach dem Trailer ist die Story-Spannung höher, aber Features bleiben offen."],
      ["Battle Pass & Waffen", "Neue Waffen, Operator, BlackCell, Blueprints und Event-Rewards sind praktisch sicher für einen Season-Start, aber konkrete Namen gehören erst nach offizieller Roadmap auf die Seite."],
      ["Meta-Auswirkung", "Zum Season-Start müssen WZ META und BO7 META neu geprüft werden: neue Waffen, Buffs/Nerfs, Attachments, Pickrates und Score-Werte können sich direkt am 4. Juni verschieben."],
    ],
    tips: [
      "Neu und wichtig: offizieller Season-4-Story-Cinematic-Trailer mit Karma, Dorne und Guild-killing virus.",
      "Bestätigt: Season 4 startet am 4. Juni 2026 für PlayStation, Xbox und PC.",
      "Noch offen: vollständige Roadmap, neue Waffen, Maps, Events, Battle Pass und Warzone-Playlistdetails.",
      "Automatik repariert: GitHub Actions prüft Season-4-Quellen jetzt regelmäßig und deployed bei Änderungen automatisch.",
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
