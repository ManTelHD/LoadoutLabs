(function () {
  const rolePicks = {
    "warzone-ranked": {
      heading: "Warzone Meta",
      description: "Sofort sehen, was Pflichtpick ist und welche Waffe zu welcher Rolle passt.",
      kicker: "Top Picks nach Rolle",
      title: "Long Range und Close Range getrennt",
      note: "MK.78 und Kogot-7 sind keine direkten Konkurrenten. Eine ist dein Long-Range-Pick, die andere dein Close-Range-Pairing.",
      cards: [
        ["Long Range", "MK.78", "Pflichtpick", "Alternative: DS20 Mirage"],
        ["Close Range", "Kogot-7", "Pflichtpick", "Alternative: VST"],
        ["Sniper", "Strider 300", "Situativ", "Pairing: Carbon 57"],
        ["A-Tier", "MXR-17", "Spielbar", "Nicht absolute Meta"],
      ],
      decisions: [
        ["Sicherer Start", "MK.78 + Kogot-7", "Beste Kombination, wenn du ohne langes Testen direkt ranked spielen willst."],
        ["Long Range", "DS20 als Backup", "Nimm DS20 Mirage, wenn dir die MK.78 zu schwerfaellig wirkt."],
        ["Nicht verwechseln", "MXR-17 ist A-Tier", "Spielbar, aber aktuell nicht als absolute Meta behandeln."],
      ],
    },
    "bo7-ranked": {
      heading: "Black Ops 7 Meta",
      description: "Ranked-Picks nach Aufgabe: AR, SMG und Flex werden getrennt bewertet.",
      kicker: "Top Picks nach Rolle",
      title: "AR und SMG getrennt",
      note: "Ranked-Picks werden nach Aufgabe bewertet: Anchor-AR, Entry-SMG und Flex-Waffen haben unterschiedliche Rollen.",
      cards: [
        ["Main AR", "M15 MOD 0", "Pflichtpick", "Anchor und Kontrolle"],
        ["Main SMG", "Dravec 45", "Pflichtpick", "Entry und Tempo"],
        ["Flex", "Peacekeeper MK1", "Sehr stark", "Hybrid-Rolle"],
        ["AR Alternative", "MXR-17", "Sehr stark", "Stabiler Anchor"],
      ],
      decisions: [
        ["Sicherer Start", "M15 + Dravec", "Stabile Standard-Kombi fuer Ranked: AR haelt Linien, SMG macht Tempo."],
        ["Flex Pick", "Peacekeeper MK1", "Gut, wenn du zwischen Kontrolle und Entry wechseln musst."],
        ["Alternative", "MXR-17", "Starker Anchor, aber nicht fuer jede Map der klare Pflichtpick."],
      ],
    },
  };

  function getMode() {
    const activeMode = document.querySelector(".secondary-mode-switch .mode-button.active");
    return activeMode?.dataset.mode || "warzone-ranked";
  }

  function ensureStylesheet(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function ensureNextStyles() {
    ensureStylesheet("meta-next.css");
    ensureStylesheet("meta-growth.css");
  }

  function applyHeading(data) {
    const title = document.querySelector("#tierTitle");
    const description = document.querySelector("#tierDescription");
    if (title) title.textContent = data.heading;
    if (description) description.textContent = data.description;
  }

  function enhanceHeader() {
    const header = document.querySelector(".site-header");
    const nav = document.querySelector(".top-nav");
    if (!header || !nav || header.querySelector(".header-cta")) return;

    nav.querySelector('a[href="#loadouts"]')?.replaceChildren(document.createTextNode("Meta"));
    nav.querySelector('a[href="#intel"]')?.replaceChildren(document.createTextNode("Analyse"));
    nav.querySelector('a[href="#updates"]')?.replaceChildren(document.createTextNode("Season 4"));

    const cta = document.createElement("a");
    cta.className = "header-cta";
    cta.href = "#loadouts";
    cta.textContent = "Top Picks";
    nav.appendChild(cta);
  }

  function renderProfessionalHero() {
    const section = document.querySelector("#loadouts");
    const heading = section?.querySelector(".section-heading");
    if (!section || !heading || section.querySelector(".pro-hero-panel")) return;

    const panel = document.createElement("div");
    panel.className = "pro-hero-panel";
    panel.innerHTML = `
      <article class="pro-hero-card pro-hero-card-primary">
        <span>Live Meta</span>
        <strong>MK.78 + Kogot-7</strong>
        <p>Aktuelles Ranked-Pairing: Long Range sauber trennen, Close Range aggressiv spielen.</p>
      </article>
      <article class="pro-hero-card pro-hero-card-next">
        <span>Update Radar</span>
        <strong>Season 4 Update</strong>
        <p>Naechster Fokus: Release-Termin, neue Waffen, Maps, Buffs und Nerfs sofort einordnen.</p>
      </article>
      <article class="pro-hero-card pro-hero-card-pro">
        <span>Demnaechst</span>
        <strong>Favoriten & Accounts</strong>
        <p>Vorbereitet fuer gespeicherte Loadouts, wenn das Backend spaeter kommt.</p>
      </article>
    `;
    heading.insertAdjacentElement("afterend", panel);

    const trust = document.createElement("div");
    trust.className = "trust-strip";
    trust.innerHTML = `
      <span><strong>12</strong> Builds</span>
      <span><strong>4</strong> Rollen</span>
      <span><strong>WZStats</strong> geprueft</span>
      <span><strong>Season 4</strong> Watchlist</span>
    `;
    panel.insertAdjacentElement("afterend", trust);

    const actions = document.createElement("div");
    actions.className = "quick-actions";
    actions.innerHTML = `
      <a class="quick-action primary" href="#loadoutGrid"><span>Start</span><strong>Meta Builds ansehen</strong></a>
      <button class="quick-action" type="button" data-action-mode="updates"><span>Radar</span><strong>Season 4 verfolgen</strong></button>
      <button class="quick-action" type="button" data-action-mode="camos"><span>Grind</span><strong>Tarnungen checken</strong></button>
    `;
    trust.insertAdjacentElement("afterend", actions);
  }

  function renderProSnapshot() {
    const section = document.querySelector("#loadouts");
    const actions = section?.querySelector(".quick-actions");
    if (!section || !actions || section.querySelector(".pro-snapshot")) return;

    const snapshot = document.createElement("section");
    snapshot.className = "pro-snapshot";
    snapshot.setAttribute("aria-label", "Meta Snapshot");
    snapshot.innerHTML = `
      <div class="snapshot-main">
        <span>Heute starten</span>
        <strong>Erst Loadout waehlen, dann Rolle checken.</strong>
        <p>Die Seite fuehrt neue Besucher direkt zu den wichtigsten Picks: Long Range, Close Range, Sniper und A-Tier sind getrennt, damit niemand falsche Waffen vergleicht.</p>
      </div>
      <div class="snapshot-grid">
        <article><span>01</span><strong>Pflichtpick</strong><p>MK.78 und Kogot-7 klar sichtbar.</p></article>
        <article><span>02</span><strong>Naechstes</strong><p>Season 4 Update bleibt im Radar.</p></article>
        <article><span>03</span><strong>Grind</strong><p>Tarnungen als eigener Einstieg.</p></article>
      </div>
    `;
    actions.insertAdjacentElement("afterend", snapshot);
  }

  function renderEditorialSignals() {
    const snapshot = document.querySelector(".pro-snapshot");
    const section = document.querySelector("#loadouts");
    if (!snapshot || !section || section.querySelector(".editorial-strip")) return;

    const strip = document.createElement("aside");
    strip.className = "editorial-strip";
    strip.setAttribute("aria-label", "Redaktionelle Hinweise");
    strip.innerHTML = `
      <div>
        <span>Einordnung</span>
        <strong>Keine Hype-Liste</strong>
        <p>Loadout Lab trennt Picks nach Rolle, Patch-Status und Spielbarkeit.</p>
      </div>
      <div>
        <span>Quelle</span>
        <strong>Patchnotes + Stats</strong>
        <p>Meta-Hinweise werden mit offiziellen Updates und WZStats abgeglichen.</p>
      </div>
      <div>
        <span>Naechstes Ziel</span>
        <strong>Season 4 Hub</strong>
        <p>Release, neue Waffen und Nerfs sollen direkt als eigener Bereich landen.</p>
      </div>
    `;
    snapshot.insertAdjacentElement("afterend", strip);
  }

  function renderRolePicks() {
    const panel = document.querySelector("#weaponComparePanel");
    if (!panel || panel.dataset.rolePicks === "true") return;

    const data = rolePicks[getMode()] || rolePicks["warzone-ranked"];
    applyHeading(data);
    panel.dataset.rolePicks = "true";
    panel.innerHTML = `
      <div class="weapon-compare-copy">
        <span>${data.kicker}</span>
        <strong>${data.title}</strong>
        <p>${data.note}</p>
      </div>
      <div class="weapon-compare-stats role-pick-stats">
        ${data.cards.map(([role, weapon, status, detail]) => `
          <article>
            <span>${role}</span>
            <strong>${weapon}</strong>
            <p>${status} · ${detail}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderDecisionDeck() {
    const mode = getMode();
    const data = rolePicks[mode] || rolePicks["warzone-ranked"];
    const dashboard = document.querySelector(".weapon-dashboard");
    const compare = document.querySelector("#weaponComparePanel");
    if (!dashboard || !compare) return;

    const oldDeck = dashboard.querySelector(".decision-deck");
    if (oldDeck && oldDeck.dataset.mode !== mode) oldDeck.remove();
    if (dashboard.querySelector(".decision-deck")) return;

    const deck = document.createElement("section");
    deck.className = "decision-deck";
    deck.dataset.mode = mode;
    deck.setAttribute("aria-label", "Meta Entscheidungshilfe");
    deck.innerHTML = `
      <div class="decision-head">
        <span>Meta Entscheidung</span>
        <strong>Was soll ich jetzt spielen?</strong>
        <p>Kurzfassung fuer neue Besucher: sofort picken, Rolle verstehen, Update im Blick behalten.</p>
      </div>
      <div class="decision-cards">
        ${data.decisions.map(([label, title, text]) => `
          <article>
            <span>${label}</span>
            <strong>${title}</strong>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
      <button class="decision-update" type="button" data-action-mode="updates">
        <span>Naechster Check</span>
        <strong>Season 4 Update beobachten</strong>
      </button>
    `;
    compare.insertAdjacentElement("afterend", deck);
  }

  function renderGrowthPanel() {
    const loadouts = document.querySelector("#loadouts");
    const intel = document.querySelector("#intel");
    if (!loadouts || loadouts.querySelector(".growth-panel")) return;

    const panel = document.createElement("section");
    panel.className = "growth-panel";
    panel.setAttribute("aria-label", "Loadout Lab Ausbau");
    panel.innerHTML = `
      <div class="growth-copy">
        <span>Ausbau geplant</span>
        <strong>Bereit fuer Community, Favoriten und Partner-Bereiche.</strong>
        <p>Die Seite bleibt jetzt bewusst schnell und kostenlos. Spaeter koennen Accounts, gespeicherte Builds und Monetarisierung sauber als eigene Funktionen dazukommen.</p>
      </div>
      <div class="growth-grid">
        <article><span>01</span><strong>Favoriten</strong><p>Builds merken, wenn ein Backend aktiv ist.</p></article>
        <article><span>02</span><strong>Season Hub</strong><p>Season 4 als eigener Update-Einstieg.</p></article>
        <article><span>03</span><strong>Partner</strong><p>Platz fuer faire Empfehlungen ohne die Meta zu stoeren.</p></article>
      </div>
    `;

    if (intel) loadouts.insertBefore(panel, intel);
    else loadouts.appendChild(panel);
  }

  function updateStaticCopy() {
    document.querySelectorAll(".timeline article").forEach((article) => {
      const title = article.querySelector("h3");
      if (title?.textContent.trim() === "MW4 Status") {
        title.textContent = "Season 4 Watch";
        const text = article.querySelector("p");
        if (text) text.textContent = "Naechstes grosses Update: Season 4. Loadout Lab trackt Termin, Waffen, Maps und Balance-Aenderungen.";
      }
    });
  }

  function activateMode(mode) {
    const button = document.querySelector(`[data-mode="${mode}"]`);
    if (button) button.click();
  }

  function bindQuickActions() {
    document.querySelectorAll("[data-action-mode]").forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => activateMode(button.dataset.actionMode));
    });
  }

  function scheduleRender() {
    requestAnimationFrame(() => {
      ensureNextStyles();
      enhanceHeader();
      renderProfessionalHero();
      renderProSnapshot();
      renderEditorialSignals();
      renderRolePicks();
      renderDecisionDeck();
      renderGrowthPanel();
      updateStaticCopy();
      bindQuickActions();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    scheduleRender();
    document.querySelectorAll(".mode-button, .filter-button, .content-tab").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = document.querySelector("#weaponComparePanel");
        if (panel) panel.dataset.rolePicks = "";
        const deck = document.querySelector(".decision-deck");
        if (deck) deck.remove();
        scheduleRender();
      });
    });

    const panel = document.querySelector("#weaponComparePanel");
    if (!panel) return;
    new MutationObserver(() => {
      if (panel.dataset.rolePicks !== "true") scheduleRender();
    }).observe(panel, { childList: true });
  });
}());
