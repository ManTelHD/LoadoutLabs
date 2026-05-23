(function () {
  const mw4Copy = {
    title: "MW4 Infos & Gerüchte",
    description: "Aktueller Stand zu Call of Duty 2026: Infinity Ward hat am 21. Mai 2026 offiziell bestätigt, dass das Studio am „definitive Modern Warfare“ arbeitet. Der Name MW4 ist noch nicht offiziell veröffentlicht, bleibt aber die wahrscheinlichste Bezeichnung in Berichten und Leaks.",
    kicker: "Call of Duty 2026",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=82",
    imageAlt: "Dunkles taktisches Gaming-Setup als Platzhalter für Modern Warfare 2026",
    updateTime: "Aktualisiert: 23. Mai 2026 um 18:05 MESZ",
    updateSummary: "Neu: Infinity Ward spricht jetzt offiziell von einem neuen Modern-Warfare-Projekt. Bestätigt sind Studio und Modern-Warfare-Richtung. Nicht bestätigt sind der finale Name MW4, Release-Datum, Trailer, Plattformliste, Kampagnen-Setting, Multiplayer-Features, DMZ und Warzone-Integration.",
    stats: [
      ["Offiziell", "Neues Modern Warfare"],
      ["Studio", "Infinity Ward"],
      ["Reveal", "erwartet Sommer 2026"],
      ["Release", "Okt./Nov. 2026 erwartet"],
    ],
    cards: [
      ["Offiziell bestätigt", "Infinity Ward hat am 21. Mai 2026 bestätigt, dass das nächste Projekt ein neues Modern Warfare wird. Das Studio nennt es das „definitive Modern Warfare“ und spricht von einem neuen Kapitel für Infinity Ward."],
      ["Name MW4", "Der Name Modern Warfare 4 ist noch nicht offiziell angekündigt. Mehrere Berichte und Leaks nutzen MW4 als wahrscheinlichsten Namen, weil es nach MW2019, MWII und MWIII der nächste Reboot-Teil der Reihe wäre."],
      ["Reveal-Fenster", "Ein Reveal wirkt jetzt deutlich näher. Berichte erwarten neue Infos in den kommenden Wochen, besonders rund um große Juni-Showcases. Einen offiziellen Trailer oder Blogpost gibt es am 23. Mai 2026 aber noch nicht."],
      ["Release & Plattformen", "Ein konkretes Release-Datum ist nicht offiziell. Das klassische Call-of-Duty-Fenster bleibt Oktober oder November 2026. Activision hat außerdem Gerüchte über eine PS4-Version zurückgewiesen: das nächste Call of Duty wird nicht für PS4 entwickelt."],
      ["Kampagne & Setting", "Gerüchte sprechen weiter von Task Force 141, Makarov-Folgen und einem Korea-Fokus. Das bleibt unbestätigt. Auf der Seite steht es deshalb als Leak/Gerücht und nicht als Fakt."],
      ["Gameplay & Multiplayer", "Leaks behaupten, Infinity Ward könne viele Black-Ops-6/BO7-Änderungen zurückdrehen und stärker auf ein geerdetes Modern-Warfare-Gefühl setzen. Offiziell bestätigt sind Movement, Maps, Gunsmith und Perks noch nicht."],
      ["DMZ & Warzone", "DMZ wird in der Community stark erwartet, vor allem weil Infinity Ward zuletzt wieder mit MW-Themen verbunden wird. Eine Rückkehr von DMZ oder eine konkrete Warzone-Integration ist aktuell nicht bestätigt."],
      ["Loadout-Lab Watchlist", "Sobald der Reveal kommt, müssen Name, Key-Art, Plattformen, Waffenliste, Movement, Gunsmith, Warzone-Anbindung und mögliche Beta-Termine sofort aktualisiert werden."],
    ],
    images: [
      ["Infinity-Ward-Phase", "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=82"],
      ["Modern Warfare Stimmung", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=82"],
      ["Taktischer Fokus", "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=1200&q=82"],
      ["Reveal Watch", "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=82"],
    ],
    tips: [
      "Fakt: Infinity Ward arbeitet offiziell an einem neuen Modern Warfare.",
      "Noch kein Fakt: finaler Name MW4, Release-Datum, Trailer, Kampagne, DMZ und Multiplayer-Details.",
      "Gerüchte zu Korea, Task Force 141 und Makarov bleiben als Leak markiert, bis Activision oder Infinity Ward sie bestätigt.",
      "Die alten MWIII-Bilder wurden durch neutralere, dunklere Modern-Warfare-/Reveal-Bilder ersetzt, solange es kein offizielles MW4-Key-Art gibt.",
      "Sobald offizielles Key-Art oder ein Trailer erscheint, sollten die Platzhalterbilder sofort ersetzt werden.",
    ],
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

  function renderMW4() {
    setText("tierTitle", mw4Copy.title);
    setText("tierDescription", mw4Copy.description);
    setText("modeInfoTitle", mw4Copy.title);
    setText("modeInfoDescription", mw4Copy.description);
    setText("modeInfoKicker", mw4Copy.kicker);
    setText("modeInfoUpdateTime", mw4Copy.updateTime);
    setText("modeInfoUpdateSummary", mw4Copy.updateSummary);

    const image = document.querySelector("#modeInfoImage");
    if (image) {
      image.src = mw4Copy.imageUrl;
      image.alt = mw4Copy.imageAlt;
    }

    const stats = document.querySelector("#modeInfoStats");
    if (stats) {
      stats.innerHTML = mw4Copy.stats
        .map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`)
        .join("");
    }

    const cards = document.querySelector("#modeInfoCards");
    if (cards) {
      cards.innerHTML = mw4Copy.cards
        .map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`)
        .join("");
    }

    const tips = document.querySelector("#modeInfoTips");
    if (tips) {
      tips.innerHTML = mw4Copy.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
    }

    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      gallery.innerHTML = mw4Copy.images
        .map(([label, src]) => `<figure><img src="${escapeHtml(src)}" alt="${escapeHtml(label)}" loading="lazy"><figcaption>${escapeHtml(label)}</figcaption></figure>`)
        .join("");
    }
  }

  function bindMW4Tab() {
    if (document.documentElement.dataset.mw4UpdateReady === "true") return;
    document.documentElement.dataset.mw4UpdateReady = "true";

    document.addEventListener("click", (event) => {
      const button = event.target.closest(".mw4-mode-button, [data-mode='mw4-info']");
      if (!button) return;
      setTimeout(() => {
        document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => {
          item.classList.toggle("active", item === button);
        });
        document.querySelectorAll(".secondary-mode-switch .mode-button").forEach((item) => item.classList.remove("active"));
        activateModeInfoPanel();
        renderMW4();
      }, 0);
    });
  }

  function run() {
    bindMW4Tab();
    if (document.querySelector(".mw4-mode-button.active, [data-mode='mw4-info'].active")) renderMW4();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();

  setTimeout(run, 100);
  setTimeout(run, 500);
  setTimeout(run, 1200);
}());
