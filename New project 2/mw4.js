(function () {
  const STYLE_ID = "mw4-20260601-style";
  const revealTrailerId = "jLbst85USN8";
  const officialHero = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-TOUT.jpg";
  const officialImages = [
    "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-001.webp",
    "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-002.webp",
    "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-003.webp",
    "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-012.webp",
  ];

  const sources = [
    ["Offizieller Reveal-Blog", "https://www.callofduty.com/ca/en/blog/2026/05/call-of-duty-modern-warfare-4-announcement"],
    ["Offizieller MW4 Intel-Hub", "https://www.callofduty.com/blog/2026/05/modernwarfare4-fob"],
    ["Pre-Order & Editionen", "https://www.callofduty.com/blog/2026/05/call-of-duty-modern-warfare-4-preorder-benefits-game-editions-details"],
    ["Offizielle MW4-Seite", "https://www.callofduty.com/modernwarfare4"],
    ["Xbox Wire Kampagnen-Details", "https://news.xbox.com/en-us/2026/05/28/call-of-duty-modern-warfare-4-first-details-campaign/"],
  ];

  const facts = {
    title: "MW4",
    description: "Call of Duty: Modern Warfare 4 ist offiziell enthüllt: Release am 23. Oktober 2026, Entwicklung unter Infinity Ward, Korea-Kampagne, präziseres Gunplay, DMZ-Rückkehr und Warzone-Integration ab Season 1.",
    updateTime: "Aktualisiert: 1. Juni 2026",
    updateSummary: "Neu strukturiert: Übersicht, Kampagne, Multiplayer, DMZ, Warzone/Plattformen und Editionen sind jetzt eigene MW4-Untertabs.",
    stats: [
      ["Release", "23. Okt. 2026"],
      ["Studio", "Infinity Ward"],
      ["Kampagne", "Korea / Price"],
      ["Modi", "MP + DMZ"],
      ["Warzone", "ab Season 1"],
      ["Old Gen", "kein PS4/Xbox One"],
    ],
  };

  const sections = [
    {
      id: "overview",
      label: "Übersicht",
      eyebrow: "Offiziell bestätigt",
      title: "Modern Warfare 4 ist kein Gerücht mehr",
      text: "Activision und Infinity Ward haben MW4 am 28. Mai 2026 offiziell vorgestellt. Der Shooter erscheint am Freitag, 23. Oktober 2026, für PS5, Xbox Series X|S, PC und Nintendo Switch 2.",
      bullets: [
        "Kein PS4- oder Xbox-One-Release; MW4 ist auf Current-Gen, PC und Switch 2 ausgerichtet.",
        "Preorders sind für PS5, Xbox Series X|S, Xbox on PC, Battle.net und Steam live; Switch-2-Preorder folgt später.",
        "Warzone bindet MW4-Inhalte und Progression ab Season 1 ein.",
        "Die offizielle Kommunikationslinie läuft jetzt über den MW4 Forward Operating Blog.",
      ],
      cards: [
        ["Nächster Fixpunkt", "DMZ First Look am 7. Juni"],
        ["Open Beta", "Early Access über Preorder; Datum folgt"],
        ["Game Pass", "nicht zum Launch enthalten"],
      ],
    },
    {
      id: "campaign",
      label: "Kampagne",
      eyebrow: "No line holds forever",
      title: "Korea, Price und ein global eskalierender Krieg",
      text: "Die Kampagne startet auf der koreanischen Halbinsel: Nordkorea beginnt eine groß angelegte Invasion, während ein junger südkoreanischer Soldat namens Private Park an der Front überleben muss. Parallel führt Captain Price abseits offizieller Strukturen seine Jagd fort.",
      bullets: [
        "Schauplätze: Korea, New York, Paris, Mumbai und weitere internationale Einsatzorte.",
        "Captain Price agiert nach den Ereignissen von MWIII als gejagter Outlaw mit persönlicher Agenda.",
        "Neue Squad-Mitglieder wie Park, Jay, Cho und Moon sollen die Korea-Perspektive stärker tragen.",
        "Xbox Wire betont Sprache, Kulturberatung und realistischere Squad-Dynamik für die Korea-Missionen.",
      ],
      cards: [
        ["Ton", "düsterer, persönlicher, näher an Frontsoldaten"],
        ["Setpieces", "Gräben, Stadtangriffe, Nacht-Raids, Verfolgungen"],
        ["Story-Fokus", "Price kollidiert mit den Kräften hinter der Invasion"],
      ],
    },
    {
      id: "multiplayer",
      label: "Multiplayer",
      eyebrow: "Gunplay & Progression",
      title: "Mehr Kontrolle, weniger Bloom, neue Build-Systeme",
      text: "MW4 setzt offiziell auf ein Waffen-zuerst-Technikpaket namens Ballistic Authority. Ziel: präzisere Trefferbilder, glaubwürdigeres Handling, bessere Sichtbarkeit und weniger Ratespiel im Gunfight.",
      bullets: [
        "Launch-Plan: 12 Core-Maps plus eigene Gunfight-Maps und Big-War-Maps.",
        "Ballistic Authority richtet Bullet Trajectory, Weapon Motion, Operator-Stance, Kamera, Audio, FOV und Sichtbarkeit stärker aufeinander aus.",
        "Gunsmith kehrt zurück; Gunny kann auf Basis deiner Unlocks schnelle Close-, Mid- oder Long-Range-Builds vorschlagen.",
        "Apex Attachments werden über voll gelevelte Waffen freigeschaltet und können Handling, Feuerverhalten, Utility, Stealth oder Rolle deutlich verändern.",
        "Zwei Prestige-Wege: Classic Prestige mit Reset und Regular Prestige ohne Create-a-Class-Reset.",
      ],
      cards: [
        ["Kill Block", "Trainingsanlage mit über 500 Konfigurationen"],
        ["Kompetitiv", "Settings für hohe FPS und Reaktionsfähigkeit"],
        ["Deep Dive", "weitere MP-Details über From the Ward"],
      ],
    },
    {
      id: "dmz",
      label: "DMZ",
      eyebrow: "Extraction kehrt zurück",
      title: "DMZ wird wieder ein eigener Schwerpunkt",
      text: "DMZ ist offiziell zurück und wird als lebendige Extraction-Sandbox beschrieben. Solo oder im Squad gehst du als inoffizieller Asset in umkämpfte Zonen, sicherst Technologie und entscheidest, wann du extrahierst.",
      bullets: [
        "Die Zone soll mit Wetter, militärischen Zielen und feindlichen Kräften dynamischer reagieren.",
        "Der Fokus liegt auf Looten, Kämpfen, Verhandeln, Verrat und Extraktion mit begrenztem Risiko-Budget.",
        "Vault-Edition-Besitzer bekommen einen DMZ Deployment Bonus zum Launch; genaue Inhalte folgen noch.",
        "Der erste offizielle DMZ-Blick ist für den 7. Juni angekündigt.",
      ],
      cards: [
        ["Spielstil", "Solo oder Squad"],
        ["Risiko", "je tiefer du gehst, desto härter schlägt die Zone zurück"],
        ["Status", "mehr Gameplay-Details stehen noch aus"],
      ],
    },
    {
      id: "warzone",
      label: "Warzone & Plattformen",
      eyebrow: "Season-1-Anbindung",
      title: "MW4 zieht Warzone in die Current-Gen-Phase",
      text: "Modern Warfare 4 startet am 23. Oktober; kurz danach beginnt Season 1 als gemeinsame Content-Phase für MW4 und Warzone. Ab dann werden MW4-Inhalte und Progression mit Warzone verbunden.",
      bullets: [
        "Warzone auf PS4 und Xbox One ist ab MW4 Season 1 nicht mehr spielbar.",
        "Neue Downloads für Warzone auf PS4/Xbox One enden am 4. Juni; der Ingame-Store dort wird am 25. Juni entfernt.",
        "MW4 erscheint für PS5, Xbox Series X|S, PC und Nintendo Switch 2.",
        "PC-Version: Battle.net, Steam und Xbox on PC; High-End-Features wie DLSS 4.5 und erweitertes Raytracing sind offiziell genannt.",
        "Switch 2 wird nativ mit Digital Legends entwickelt; Preorder-Details kommen später im Sommer.",
      ],
      cards: [
        ["Warzone Cutoff", "PS4/Xbox One endet mit Season 1"],
        ["PC", "Beenox optimiert die PC-Version"],
        ["Xbox", "Xbox Play Anywhere für Xbox/PC-Kauf"],
      ],
    },
    {
      id: "editions",
      label: "Editionen",
      eyebrow: "Preorder & Boni",
      title: "Standard, Vault und Loyalty Discount",
      text: "Zum Start der Preorders gibt es Digital Standard, Digital Vault und Physical Standard auf Konsolen. Alle Preorders sichern Open-Beta-Early-Access; digitale Preorders liefern zusätzlich sofort den Hunter Killer Skin für Black Ops 7 und Warzone.",
      bullets: [
        "Vault Edition: Hostile Alliance Operator Pack mit Price, Valeria, Ghost und Blix.",
        "Special Forces Operator Pack: COM SFT, KSK Amphibious, South Korean Special Forces und SAS.",
        "Signature Weapon Collection: fünf Waffen/Blueprints inklusive Apex-Attachment-Bezug.",
        "BlackCell für eine Season ist enthalten; erster möglicher Einsatz ist Season 1.",
        "Loyalty Discount: 10% auf die Vault Edition für berechtigte Besitzer/Spieler früherer Premium-CoDs, gültig bis 23. Oktober 2026 und nur für digitale Preorders/Prepurchases.",
      ],
      cards: [
        ["Digital Standard", "Spiel + Beta Early Access + Hunter Killer"],
        ["Digital Vault", "Premium-Packs + BlackCell + DMZ Bonus"],
        ["Upgrade", "$30 SRP regional angepasst"],
      ],
    },
  ];

  let activeMw4Tab = "overview";

  function html(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }

    style.textContent = `
      body .mw4-watch-panel {
        --mw4-gold: #d8b457;
        --mw4-gold-rgb: 216, 180, 87;
        --mw4-ink: #070b0e;
      }

      body .mw4-watch-panel .mode-info-hero,
      body .mw4-watch-panel .mode-info-side,
      body .mw4-watch-panel .mode-update-box,
      body .mw4-watch-panel #modeInfoCards,
      body .mw4-watch-panel #modeInfoTips,
      body .mw4-watch-panel #modeInfoGallery,
      body .mw4-watch-panel .official-note,
      body .mw4-watch-panel #modeInfoTabs {
        display: none !important;
      }

      body .mw4-watch-panel .mode-info-layout {
        display: block !important;
      }

      body .mw4-watch-panel .mode-info-main {
        overflow: hidden !important;
        width: 100% !important;
        max-width: none !important;
        border-color: rgba(var(--mw4-gold-rgb), 0.28) !important;
        border-radius: 10px !important;
        background: #070b0e !important;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28) !important;
      }

      body .mw4-watch-panel #modeInfoImage {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        object-fit: contain !important;
        object-position: center !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(var(--mw4-gold-rgb), 0.32) !important;
        border-radius: 10px 10px 0 0 !important;
        background: #05070a !important;
      }

      body .mw4-watch-panel .mode-info-body {
        padding: clamp(1rem, 1.8vw, 1.55rem) !important;
      }

      body .mw4-watch-panel #modeInfoStats {
        display: grid !important;
        grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
        gap: 0.55rem !important;
        margin-bottom: 0.8rem !important;
      }

      body .mw4-watch-panel #modeInfoStats > div,
      body .mw4-mini-card {
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.24) !important;
        border-radius: 8px !important;
        padding: 0.72rem 0.8rem !important;
        background: linear-gradient(145deg, rgba(var(--mw4-gold-rgb), 0.12), rgba(8, 12, 16, 0.92)) !important;
        box-shadow: none !important;
      }

      body .mw4-watch-panel #modeInfoStats span,
      body .mw4-mini-card span,
      body .mw4-kicker {
        display: block !important;
        color: rgba(255, 244, 207, 0.72) !important;
        font-size: 0.72rem !important;
        font-weight: 950 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.045em !important;
      }

      body .mw4-watch-panel #modeInfoStats strong,
      body .mw4-mini-card strong {
        color: #ffe08a !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: 1.08rem !important;
        line-height: 1 !important;
      }

      body .mw4-dashboard {
        display: grid !important;
        gap: 1rem !important;
      }

      body .mw4-topline {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 0.7rem !important;
        margin-bottom: 0.15rem !important;
      }

      body .mw4-updated-pill {
        display: inline-flex !important;
        padding: 0.34rem 0.62rem !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.3) !important;
        border-radius: 999px !important;
        color: rgba(255, 244, 207, 0.84) !important;
        background: rgba(5, 8, 11, 0.72) !important;
        font-size: 0.75rem !important;
        font-weight: 850 !important;
      }

      body .mw4-tabs {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 0.42rem !important;
        padding: 0.25rem !important;
        border: 1px solid rgba(255, 255, 255, 0.09) !important;
        border-radius: 999px !important;
        background: rgba(5, 8, 11, 0.78) !important;
      }

      body .mw4-tab {
        min-height: 2.05rem !important;
        padding: 0.38rem 0.72rem !important;
        border: 1px solid transparent !important;
        border-radius: 999px !important;
        background: transparent !important;
        color: rgba(238, 232, 214, 0.78) !important;
        font-weight: 900 !important;
        cursor: pointer !important;
      }

      body .mw4-tab.active,
      body .mw4-tab:hover,
      body .mw4-tab:focus-visible {
        border-color: rgba(var(--mw4-gold-rgb), 0.72) !important;
        background: linear-gradient(135deg, #ffe08a, #d8b457) !important;
        color: #120e04 !important;
        outline: none !important;
      }

      body .mw4-panel {
        display: none !important;
      }

      body .mw4-panel.active {
        display: grid !important;
        grid-template-columns: minmax(0, 1.08fr) minmax(17rem, 0.92fr) !important;
        gap: 1rem !important;
        align-items: start !important;
      }

      body .mw4-official-card {
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.22) !important;
        border-radius: 10px !important;
        background: linear-gradient(145deg, rgba(var(--mw4-gold-rgb), 0.1), rgba(7, 11, 14, 0.96)) !important;
        padding: clamp(1rem, 1.65vw, 1.35rem) !important;
        box-shadow: none !important;
      }

      body .mw4-official-card h3 {
        margin: 0 0 0.7rem !important;
        color: #ffe08a !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.55rem, 2.3vw, 2.25rem) !important;
        line-height: 0.98 !important;
      }

      body .mw4-official-card p {
        margin: 0 0 0.78rem !important;
        color: rgba(242, 236, 220, 0.9) !important;
        line-height: 1.62 !important;
      }

      body .mw4-official-card ul {
        display: grid !important;
        gap: 0.44rem !important;
        margin: 0.35rem 0 0 !important;
        padding: 0 !important;
        list-style: none !important;
      }

      body .mw4-official-card li {
        position: relative !important;
        padding-left: 1.05rem !important;
        color: rgba(242, 236, 220, 0.9) !important;
        line-height: 1.48 !important;
      }

      body .mw4-official-card li::before {
        content: "" !important;
        position: absolute !important;
        left: 0 !important;
        top: 0.62em !important;
        width: 0.36rem !important;
        height: 0.36rem !important;
        border-radius: 999px !important;
        background: #d8b457 !important;
      }

      body .mw4-side-stack {
        display: grid !important;
        gap: 0.65rem !important;
      }

      body .mw4-video-frame {
        position: relative !important;
        width: 100% !important;
        aspect-ratio: 16 / 9 !important;
        overflow: hidden !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.22) !important;
        border-radius: 10px !important;
        background: #05070a !important;
      }

      body .mw4-video-frame iframe {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border: 0 !important;
      }

      body .mw4-mini-grid {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 0.55rem !important;
      }

      body .mw4-gallery {
        display: grid !important;
        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        gap: 0.55rem !important;
      }

      body .mw4-gallery img {
        display: block !important;
        width: 100% !important;
        aspect-ratio: 16 / 9 !important;
        object-fit: cover !important;
        border-radius: 8px !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.2) !important;
        background: #05070a !important;
      }

      body .mw4-source-list a {
        color: #ffe08a !important;
        text-decoration: none !important;
        font-weight: 850 !important;
      }

      @media (max-width: 1040px) {
        body .mw4-watch-panel #modeInfoStats {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }

        body .mw4-panel.active,
        body .mw4-mini-grid {
          grid-template-columns: 1fr !important;
        }
      }

      @media (max-width: 640px) {
        body .mw4-watch-panel #modeInfoStats,
        body .mw4-gallery {
          grid-template-columns: 1fr !important;
        }

        body .mw4-tabs {
          border-radius: 10px !important;
        }

        body .mw4-tab {
          flex: 1 1 100% !important;
        }
      }
    `;
  }

  function getMw4Button() {
    return Array.from(document.querySelectorAll(".primary-mode-switch .mode-button, .primary-mode-switch button"))
      .find((button) => String(button.dataset.mode || "").toLowerCase() === "mw4-info" || (button.textContent || "").trim().toLowerCase() === "mw4") || null;
  }

  function prepareMw4Button() {
    const button = getMw4Button();
    if (!button) return null;
    button.classList.add("mode-button", "mw4-mode-button");
    button.dataset.mode = "mw4-info";
    button.type = "button";
    return button;
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function renderStats() {
    const stats = document.querySelector(".mw4-watch-panel #modeInfoStats");
    if (!stats) return;
    stats.innerHTML = facts.stats.map(([label, value]) => `<div><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("");
  }

  function cleanupModeInfoBody() {
    document.querySelectorAll("#mw4LivePanel, .mw4-dashboard, .mw4-prose, .mw4-updated-pill, .season4-prose, .season4-updated-pill, #season4TrailerPanel, #season4KeyArtPanel").forEach((node) => node.remove());
    const cards = document.querySelector("#modeInfoCards");
    if (cards) {
      cards.innerHTML = "";
      cards.hidden = true;
      cards.style.display = "none";
    }
    const tips = document.querySelector("#modeInfoTips");
    if (tips) tips.innerHTML = "";
    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      gallery.innerHTML = "";
      gallery.hidden = true;
      gallery.style.display = "none";
    }
  }

  function renderSection(section) {
    const isOverview = section.id === "overview";
    return `
      <section class="mw4-panel${section.id === activeMw4Tab ? " active" : ""}" data-mw4-panel="${html(section.id)}">
        <article class="mw4-official-card">
          <span class="mw4-kicker">${html(section.eyebrow)}</span>
          <h3>${html(section.title)}</h3>
          <p>${html(section.text)}</p>
          <ul>${section.bullets.map((item) => `<li>${html(item)}</li>`).join("")}</ul>
        </article>
        <aside class="mw4-side-stack">
          ${isOverview ? `<div class="mw4-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${revealTrailerId}" title="Call of Duty: Modern Warfare 4 Reveal Trailer" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` : ""}
          <div class="mw4-mini-grid">${section.cards.map(([label, value]) => `<div class="mw4-mini-card"><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("")}</div>
        </aside>
      </section>
    `;
  }

  function renderMw4Dashboard() {
    const body = document.querySelector(".mw4-watch-panel .mode-info-body");
    if (!body) return;

    const wrapper = document.createElement("div");
    wrapper.className = "mw4-dashboard";
    wrapper.id = "mw4LivePanel";
    wrapper.innerHTML = `
      <div class="mw4-topline">
        <span class="mw4-updated-pill">${html(facts.updateTime)}</span>
        <nav class="mw4-tabs" aria-label="MW4-Unterbereiche">
          ${sections.map((section) => `<button class="mw4-tab${section.id === activeMw4Tab ? " active" : ""}" data-mw4-tab="${html(section.id)}" type="button">${html(section.label)}</button>`).join("")}
        </nav>
      </div>
      ${sections.map(renderSection).join("")}
      <section class="mw4-official-card">
        <h3>Offizielle Bilder</h3>
        <p>Die Galerie nutzt offizielles Reveal-Material; sie ist keine separate Gameplay-Bestätigung über die oben gelisteten Fakten hinaus.</p>
        <div class="mw4-gallery">${officialImages.map((src, index) => `<img src="${src}" alt="Modern Warfare 4 offizielles Reveal-Bild ${index + 1}" loading="lazy" decoding="async">`).join("")}</div>
      </section>
      <section class="mw4-official-card mw4-source-list">
        <h3>Quellen</h3>
        <ul>${sources.map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noreferrer">${html(label)}</a></li>`).join("")}</ul>
      </section>
    `;

    wrapper.addEventListener("click", (event) => {
      const button = event.target.closest("[data-mw4-tab]");
      if (!button) return;
      activeMw4Tab = button.dataset.mw4Tab;
      wrapper.querySelectorAll("[data-mw4-tab]").forEach((item) => item.classList.toggle("active", item === button));
      wrapper.querySelectorAll("[data-mw4-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.mw4Panel === activeMw4Tab));
    });

    body.appendChild(wrapper);
  }

  function activateMw4(button = prepareMw4Button()) {
    if (!button) return;
    installStyle();

    document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".secondary-mode-switch .mode-button").forEach((item) => item.classList.remove("active"));

    const contentTabs = document.querySelector("#contentTabs");
    if (contentTabs) contentTabs.hidden = true;
    const modeInfoTabs = document.querySelector("#modeInfoTabs");
    if (modeInfoTabs) {
      modeInfoTabs.hidden = true;
      modeInfoTabs.style.display = "none";
    }

    document.querySelectorAll(".tab-panel").forEach((panel) => {
      const active = panel.dataset.panel === "mode-info";
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });

    const panel = document.querySelector('[data-panel="mode-info"]');
    if (panel) {
      panel.classList.add("mw4-watch-panel");
      panel.classList.remove("season4-watch-panel");
    }

    setText("#tierTitle", facts.title);
    setText("#tierDescription", facts.description);
    setText("#modeInfoTitle", facts.title);
    setText("#modeInfoDescription", facts.description);
    setText("#modeInfoKicker", "Offiziell enthüllt");
    setText("#modeInfoUpdateTime", facts.updateTime);
    setText("#modeInfoUpdateSummary", facts.updateSummary);

    const image = document.querySelector("#modeInfoImage");
    if (image) {
      image.src = officialHero;
      image.alt = "Offizielles Modern Warfare 4 Reveal Key Art";
      image.loading = "eager";
      image.decoding = "async";
    }

    cleanupModeInfoBody();
    renderStats();
    renderMw4Dashboard();
    window.dispatchEvent(new CustomEvent("loadoutlab:lite-render", { detail: { panel: "mw4" } }));
  }

  function bindMw4() {
    installStyle();
    const button = prepareMw4Button();
    if (!button || button.dataset.mw4Bound === "true") return;
    button.dataset.mw4Bound = "true";
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".mw4-mode-button, [data-mode='mw4-info']");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    activateMw4(button);
  }, true);

  function init() {
    bindMw4();
    const shouldOpenMw4 = ["#mw4", "#intel"].includes(window.location.hash) || getMw4Button()?.classList.contains("active");
    if (shouldOpenMw4) activateMw4();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();

  window.setTimeout(bindMw4, 300);
}());
