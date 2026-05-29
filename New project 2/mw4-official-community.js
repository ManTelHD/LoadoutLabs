(function () {
  const revealTrailerId = "jLbst85USN8";
  const officialHero = "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-TOUT.jpg";
  const officialImages = [
    "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-001.webp",
    "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-002.webp",
    "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-003.webp",
    "https://imgs.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/mw4/reveal/MW4-REVEAL-012.webp",
  ];

  const sources = [
    ["Offizieller Reveal-Blog", "https://www.callofduty.com/uk/en/blog/2026/05/call-of-duty-modern-warfare-4-announcement"],
    ["Official Intel Hub", "https://www.callofduty.com/uk/en/blog/2026/05/modernwarfare4-fob"],
    ["Pre-Order & Editions", "https://www.callofduty.com/uk/en/blog/2026/05/call-of-duty-modern-warfare-4-preorder-benefits-game-editions-details"],
    ["Xbox Wire Campaign Details", "https://news.xbox.com/en-us/2026/05/28/call-of-duty-modern-warfare-4-first-details-campaign/"],
  ];

  const facts = {
    title: "MW4",
    description: "Offiziell enthüllt: Call of Duty: Modern Warfare 4 erscheint am 23. Oktober 2026. Der neue Infinity-Ward-Titel setzt auf Korea-Kampagne, überarbeitetes Gunplay, größere Current-Gen-Technik, DMZ und eine Warzone-Anbindung ab Season 1.",
    updateTime: "Aktualisiert: 29. Mai 2026",
    updateSummary: "Neu: offizieller MW4-Reveal, Release-Datum, Korea-Story, Reveal-Trailer, Multiplayer-Systeme, DMZ, Plattformen, Editions/Preorder-Infos und Warzone-Last-Gen-Update.",
    stats: [["Release", "23. Okt. 2026"], ["Studio", "Infinity Ward"], ["Kampagne", "Korea / Price"], ["Modi", "MP + DMZ"], ["Warzone", "Season 1"], ["Old Gen", "kein PS4/Xbox One"]],
  };

  function html(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function installStyle() {
    if (document.querySelector("#mw4-official-20260529-style")) return;
    const style = document.createElement("style");
    style.id = "mw4-official-20260529-style";
    style.textContent = `
      body .mw4-watch-panel { --mw4-gold: #d8b457; --mw4-gold-rgb: 216, 180, 87; }
      body .mw4-watch-panel .mode-info-hero,
      body .mw4-watch-panel .mode-info-side,
      body .mw4-watch-panel .mode-update-box,
      body .mw4-watch-panel #modeInfoCards,
      body .mw4-watch-panel #modeInfoTips,
      body .mw4-watch-panel .official-note { display: none !important; }
      body .mw4-watch-panel .mode-info-layout { display: block !important; }
      body .mw4-watch-panel .mode-info-main { overflow: hidden !important; width: 100% !important; max-width: none !important; border-color: rgba(var(--mw4-gold-rgb), 0.28) !important; background: #070b0e !important; box-shadow: 0 12px 30px rgba(0,0,0,.28) !important; }
      body .mw4-watch-panel #modeInfoImage { display: block !important; width: 100% !important; height: auto !important; max-height: none !important; aspect-ratio: auto !important; object-fit: contain !important; object-position: center !important; border: 0 !important; border-bottom: 1px solid rgba(var(--mw4-gold-rgb), .32) !important; background: #05070a !important; }
      body .mw4-watch-panel .mode-info-body { padding: clamp(1rem, 1.8vw, 1.55rem) !important; }
      body .mw4-watch-panel #modeInfoStats { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: .62rem !important; margin-bottom: 1rem !important; }
      body .mw4-watch-panel #modeInfoStats > div { border: 1px solid rgba(var(--mw4-gold-rgb), .24) !important; border-radius: 8px !important; padding: .72rem .8rem !important; background: linear-gradient(145deg, rgba(var(--mw4-gold-rgb), .12), rgba(8, 12, 16, .92)) !important; box-shadow: none !important; }
      body .mw4-watch-panel #modeInfoStats span { display: block !important; color: rgba(255,244,207,.72) !important; font-size: .72rem !important; font-weight: 900 !important; text-transform: uppercase !important; }
      body .mw4-watch-panel #modeInfoStats strong { color: #ffe08a !important; font-family: Rajdhani, Inter, sans-serif !important; font-size: 1.12rem !important; line-height: 1 !important; }
      body .mw4-official-grid { display: grid !important; grid-template-columns: minmax(0, 1.1fr) minmax(18rem, .9fr) !important; gap: 1rem !important; align-items: start !important; }
      body .mw4-official-card { border: 1px solid rgba(var(--mw4-gold-rgb), .22) !important; border-radius: 8px !important; background: linear-gradient(145deg, rgba(216,180,87,.10), rgba(7,11,14,.96)) !important; padding: clamp(1rem, 1.65vw, 1.35rem) !important; box-shadow: none !important; }
      body .mw4-official-card h3 { margin: 0 0 .7rem !important; color: #ffe08a !important; font-family: Rajdhani, Inter, sans-serif !important; font-size: clamp(1.55rem, 2.3vw, 2.25rem) !important; line-height: .98 !important; }
      body .mw4-official-card h4 { margin: 1.05rem 0 .4rem !important; color: #fff4cf !important; font-family: Rajdhani, Inter, sans-serif !important; font-size: clamp(1.1rem, 1.5vw, 1.38rem) !important; line-height: 1.05 !important; }
      body .mw4-official-card p { margin: 0 0 .75rem !important; color: rgba(242,236,220,.9) !important; line-height: 1.62 !important; }
      body .mw4-official-card ul { display: grid !important; gap: .44rem !important; margin: .35rem 0 .8rem !important; padding: 0 !important; list-style: none !important; }
      body .mw4-official-card li { position: relative !important; padding-left: 1.05rem !important; color: rgba(242,236,220,.9) !important; line-height: 1.48 !important; }
      body .mw4-official-card li::before { content: "" !important; position: absolute !important; left: 0 !important; top: .62em !important; width: .36rem !important; height: .36rem !important; border-radius: 999px !important; background: #d8b457 !important; }
      body .mw4-trailer-card { overflow: hidden !important; padding: 0 !important; }
      body .mw4-trailer-head { display: flex !important; justify-content: space-between !important; gap: .8rem !important; align-items: center !important; padding: .82rem .95rem !important; border-bottom: 1px solid rgba(255,255,255,.08) !important; }
      body .mw4-trailer-head span { color: #d8b457 !important; font-size: .72rem !important; font-weight: 950 !important; text-transform: uppercase !important; }
      body .mw4-trailer-head strong { color: #fff4cf !important; font-family: Rajdhani, Inter, sans-serif !important; font-size: 1.35rem !important; line-height: 1 !important; }
      body .mw4-video-frame { position: relative !important; width: 100% !important; aspect-ratio: 16 / 9 !important; background: #05070a !important; }
      body .mw4-video-frame iframe { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; border: 0 !important; }
      body .mw4-gallery { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: .55rem !important; margin-top: 1rem !important; }
      body .mw4-gallery img { display: block !important; width: 100% !important; aspect-ratio: 16 / 9 !important; object-fit: cover !important; border-radius: 7px !important; border: 1px solid rgba(var(--mw4-gold-rgb), .2) !important; background: #05070a !important; }
      body .mw4-source-list a { color: #ffe08a !important; text-decoration: none !important; font-weight: 800 !important; }
      body .mw4-updated-pill { display: inline-flex !important; margin: 0 0 .9rem !important; padding: .32rem .6rem !important; border: 1px solid rgba(var(--mw4-gold-rgb), .3) !important; border-radius: 999px !important; color: rgba(255,244,207,.82) !important; background: rgba(5,8,11,.72) !important; font-size: .75rem !important; font-weight: 800 !important; }
      @media (max-width: 920px) { body .mw4-official-grid { grid-template-columns: 1fr !important; } body .mw4-watch-panel #modeInfoStats { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
      @media (max-width: 560px) { body .mw4-gallery, body .mw4-watch-panel #modeInfoStats { grid-template-columns: 1fr !important; } }
    `;
    document.head.appendChild(style);
  }

  function renderStats() {
    const stats = document.querySelector(".mw4-watch-panel #modeInfoStats");
    if (!stats) return;
    stats.innerHTML = facts.stats.map(([label, value]) => `<div><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("");
  }

  function renderOfficialMW4() {
    const panel = document.querySelector('[data-panel="mode-info"]');
    if (!panel) return;
    panel.classList.remove("season4-watch-panel");
    panel.classList.add("mw4-watch-panel");
    installStyle();

    const title = document.querySelector("#tierTitle");
    if (title) title.textContent = facts.title;
    const desc = document.querySelector("#tierDescription");
    if (desc) desc.textContent = facts.description;
    const modeTitle = document.querySelector("#modeInfoTitle");
    if (modeTitle) modeTitle.textContent = facts.title;
    const modeDesc = document.querySelector("#modeInfoDescription");
    if (modeDesc) modeDesc.textContent = facts.description;
    const kicker = document.querySelector("#modeInfoKicker");
    if (kicker) kicker.textContent = "Offiziell enthüllt";
    const updateTime = document.querySelector("#modeInfoUpdateTime");
    if (updateTime) updateTime.textContent = facts.updateTime;
    const updateSummary = document.querySelector("#modeInfoUpdateSummary");
    if (updateSummary) updateSummary.textContent = facts.updateSummary;

    const image = document.querySelector("#modeInfoImage");
    if (image) {
      image.src = officialHero;
      image.alt = "Offizielles Modern Warfare 4 Reveal Key Art";
      image.loading = "eager";
      image.decoding = "async";
    }

    renderStats();
    document.querySelectorAll("#mw4LivePanel, .mw4-prose, .mw4-updated-pill, .season4-prose, .season4-updated-pill, #season4TrailerPanel, #season4KeyArtPanel").forEach((node) => node.remove());

    const body = document.querySelector(".mw4-watch-panel .mode-info-body");
    if (!body) return;
    const wrapper = document.createElement("div");
    wrapper.className = "mw4-prose";
    wrapper.innerHTML = `
      <span class="mw4-updated-pill">${html(facts.updateTime)}</span>
      <div class="mw4-official-grid">
        <section class="mw4-official-card">
          <h3>Offiziell: Modern Warfare 4</h3>
          <p>Call of Duty: Modern Warfare 4 ist jetzt offiziell angekündigt. Infinity Ward führt die Entwicklung an, der Release ist für Freitag, den 23. Oktober 2026 geplant.</p>
          <h4>Kampagne</h4>
          <p>Die Story startet mit Krieg auf der koreanischen Halbinsel: Nordkorea startet eine groß angelegte Invasion, während Captain Price abseits offizieller Strukturen eine persönliche Mission verfolgt. Die Kampagne führt unter anderem nach Korea, New York, Paris und Mumbai.</p>
          <ul>
            <li>Spielbarer Charakter: Private Park, ein junger südkoreanischer Soldat.</li>
            <li>Captain Price agiert als gejagter Outlaw im Schattenkrieg.</li>
            <li>Der Konflikt soll über Korea hinaus eskalieren.</li>
            <li>Xbox Wire nennt mehr Fokus auf koreanische Sprache, Kultur und authentische Squad-Dynamik.</li>
          </ul>
          <h4>Multiplayer</h4>
          <p>Infinity Ward spricht von geerdetem, präzisem Gunplay und mehr Kontrolle. Das neue System „Ballistic Authority“ soll Bloom entfernen, Recoil/Handling direkter machen und Sichtbarkeit sowie Waffengefühl verbessern.</p>
          <ul>
            <li>12 Core-Maps zum Launch.</li>
            <li>Dedizierte Gunfight-Maps und Big-War-Maps.</li>
            <li>Kill Block: dynamische Trainingsanlage mit über 500 möglichen Konfigurationen.</li>
            <li>Gunsmith kehrt zurück; „Gunny“ hilft beim schnellen Erstellen sinnvoller Builds.</li>
            <li>Apex Attachments verändern voll gelevelte Waffen stärker als normale Aufsätze.</li>
            <li>Zwei Prestige-Wege: Classic Prestige und Regular Prestige.</li>
          </ul>
          <h4>DMZ</h4>
          <p>DMZ ist offiziell zurück und wird als neue Extraction-Erfahrung beschrieben. Spieler gehen solo oder im Squad als inoffizieller Asset hinter feindliche Linien, sichern Technologie und müssen entscheiden, wann sie extrahieren.</p>
          <ul>
            <li>Mehr DMZ-Details und erster Blick sind offiziell für den 7. Juni angekündigt.</li>
            <li>Wetter, Ziele und feindliche Kräfte sollen sich dynamisch verändern.</li>
          </ul>
          <h4>Plattformen & Warzone</h4>
          <p>MW4 erscheint für PlayStation 5, Xbox Series X|S, PC und Nintendo Switch 2. PS4 und Xbox One sind raus. Warzone integriert MW4-Inhalte ab Season 1; ab dieser Season endet Warzone auf PS4 und Xbox One.</p>
          <ul>
            <li>Digitale Preorders: PS5, Xbox Series X|S, Xbox on PC, Battle.net und Steam.</li>
            <li>Nintendo Switch 2 Preorder folgt später im Jahr.</li>
            <li>Nicht auf Game Pass zum Launch.</li>
            <li>Warzone-Downloads auf PS4/Xbox One enden am 4. Juni; Store dort am 25. Juni.</li>
          </ul>
          <h4>Preorder & Editionen</h4>
          <p>Es gibt Digital Standard, Digital Vault Edition und Physical Standard auf Konsolen. Vorbesteller bekommen Open-Beta-Early-Access; die Vault Edition bringt zusätzliche Operator-Packs, Signature Weapon Collection, BlackCell für eine Season und einen DMZ Deployment Bonus.</p>
        </section>
        <aside class="mw4-official-card mw4-trailer-card">
          <div class="mw4-trailer-head"><div><span>Offizieller Trailer</span><strong>Reveal Trailer</strong></div><span>@CallofDuty</span></div>
          <div class="mw4-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${revealTrailerId}" title="Call of Duty: Modern Warfare 4 Reveal Trailer" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
        </aside>
      </div>
      <section class="mw4-official-card" style="margin-top:1rem">
        <h3>Offizielle Bilder</h3>
        <p>Die Bilder stammen aus dem offiziellen Call-of-Duty-Reveal-Blog und ersetzen das alte Fan-/X-Bild.</p>
        <div class="mw4-gallery">${officialImages.map((src, index) => `<img src="${src}" alt="Modern Warfare 4 offizielles Reveal-Bild ${index + 1}" loading="lazy" decoding="async">`).join("")}</div>
      </section>
      <section class="mw4-official-card mw4-source-list" style="margin-top:1rem">
        <h3>Quellen</h3>
        <ul>${sources.map(([label, href]) => `<li><a href="${href}" target="_blank" rel="noreferrer">${html(label)}</a></li>`).join("")}</ul>
      </section>
    `;
    body.appendChild(wrapper);
  }

  function scheduleApply() {
    window.setTimeout(renderOfficialMW4, 20);
    window.setTimeout(renderOfficialMW4, 160);
    window.setTimeout(renderOfficialMW4, 420);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".mw4-mode-button, [data-mode='mw4-info']")) scheduleApply();
  }, true);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleApply, { once: true });
  else scheduleApply();
})();
