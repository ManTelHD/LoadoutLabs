(function () {
  function makeMW4KeyArt() {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="MW4 Korea key art">
        <defs>
          <linearGradient id="sky" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#050707"/>
            <stop offset="0.45" stop-color="#121916"/>
            <stop offset="1" stop-color="#020303"/>
          </linearGradient>
          <radialGradient id="cityGlow" cx="62%" cy="52%" r="48%">
            <stop offset="0" stop-color="#b8a15e" stop-opacity="0.44"/>
            <stop offset="0.42" stop-color="#435643" stop-opacity="0.16"/>
            <stop offset="1" stop-color="#000" stop-opacity="0"/>
          </radialGradient>
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 0.2"/></feComponentTransfer></filter>
        </defs>
        <rect width="1600" height="900" fill="url(#sky)"/>
        <rect width="1600" height="900" fill="url(#cityGlow)"/>
        <path d="M0 514 C174 448 290 472 438 434 C600 392 696 312 846 344 C994 376 1122 312 1600 390 V900 H0 Z" fill="#080b09" opacity="0.88"/>
        <path d="M0 535 C168 486 312 508 448 463 C602 411 690 374 846 397 C990 418 1135 370 1600 430 V900 H0 Z" fill="#131912" opacity="0.72"/>
        <g opacity="0.92">
          <rect x="118" y="374" width="44" height="188" fill="#171f1b"/><rect x="182" y="330" width="54" height="230" fill="#101614"/><rect x="334" y="292" width="66" height="272" fill="#111816"/><rect x="520" y="252" width="74" height="314" fill="#151d19"/><rect x="736" y="218" width="70" height="348" fill="#18201c"/><rect x="944" y="196" width="78" height="372" fill="#151d19"/><rect x="1160" y="226" width="82" height="340" fill="#17201b"/><rect x="1384" y="264" width="72" height="304" fill="#151d19"/>
        </g>
        <g fill="#030404" opacity="0.96">
          <path d="M210 522 c38 0 70 38 70 88 v130 h-144 v-130 c0-50 32-88 74-88z"/>
          <path d="M154 628 h122 l56 150 h-230z"/>
          <path d="M1180 548 c34 0 62 32 62 76 v116 h-126 v-116 c0-44 28-76 64-76z"/>
          <path d="M1132 648 h122 l44 130 h-204z"/>
        </g>
        <g transform="translate(1004 674)">
          <path d="M0 0 H72 L114 66 L156 0 H230 L230 112 H178 V45 L134 112 H94 L52 45 V112 H0 Z" fill="#f4f4f0"/>
          <path d="M250 0 H310 L345 64 L382 0 H442 L377 112 H318 Z" fill="#f4f4f0"/>
          <path d="M520 0 H582 V70 H620 V112 H582 V146 H530 V112 H438 V72 Z M530 70 V28 L484 70 Z" fill="#f4f4f0"/>
          <path d="M0 128 H620" stroke="#9d8950" stroke-width="5" opacity="0.72"/>
        </g>
        <rect width="1600" height="900" filter="url(#grain)" opacity="0.26"/>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  const mw4KeyArt = makeMW4KeyArt();
  const mw4Copy = {
    title: "MW4 Infos & Gerüchte",
    description: "Aktueller Stand zu Call of Duty 2026: Infinity Ward hat am 21. Mai 2026 offiziell bestätigt, dass das Studio am „definitive Modern Warfare“ arbeitet. Der Name MW4 ist noch nicht offiziell veröffentlicht, bleibt aber die wahrscheinlichste Bezeichnung in Berichten und Leaks.",
    kicker: "Call of Duty 2026",
    imageUrl: mw4KeyArt,
    imageAlt: "Fan-made MW4 Key Art mit Korea-Vibe, Operatoren, Regen und MW4-Logo",
    updateTime: "Aktualisiert: 23. Mai 2026 um 18:05 MESZ",
    updateSummary: "Neu: Infinity Ward spricht jetzt offiziell von einem neuen Modern-Warfare-Projekt. Bestätigt sind Studio und Modern-Warfare-Richtung. Nicht bestätigt sind der finale Name MW4, Release-Datum, Trailer, Plattformliste, Kampagnen-Setting, Multiplayer-Features, DMZ und Warzone-Integration.",
    stats: [["Offiziell", "Neues Modern Warfare"], ["Studio", "Infinity Ward"], ["Reveal", "erwartet Sommer 2026"], ["Release", "Okt./Nov. 2026 erwartet"]],
    cards: [
      ["Offiziell bestätigt", "Infinity Ward hat am 21. Mai 2026 bestätigt, dass das nächste Projekt ein neues Modern Warfare wird. Das Studio nennt es das „definitive Modern Warfare“ und spricht von einem neuen Kapitel für Infinity Ward."],
      ["Name MW4", "Der Name Modern Warfare 4 ist noch nicht offiziell angekündigt. Mehrere Berichte und Leaks nutzen MW4 als wahrscheinlichsten Namen, weil es nach MW2019, MWII und MWIII der nächste Reboot-Teil der Reihe wäre."],
      ["Reveal-Fenster", "Ein Reveal wirkt jetzt deutlich näher. Berichte erwarten neue Infos in den kommenden Wochen, besonders rund um große Juni-Showcases. Einen offiziellen Trailer oder Blogpost gibt es am 23. Mai 2026 aber noch nicht."],
      ["Release & Plattformen", "Ein konkretes Release-Datum ist nicht offiziell. Das klassische Call-of-Duty-Fenster bleibt Oktober oder November 2026. Activision hat außerdem Gerüchte über eine PS4-Version zurückgewiesen: das nächste Call of Duty wird nicht für PS4 entwickelt."],
      ["Kampagne & Setting", "Gerüchte sprechen weiter von Task Force 141, Makarov-Folgen und einem Korea-Fokus. Das bleibt unbestätigt. Auf der Seite steht es deshalb als Leak/Gerücht und nicht als Fakt."],
      ["Gameplay & Multiplayer", "Leaks behaupten, Infinity Ward könne viele Black-Ops-6/BO7-Änderungen zurückdrehen und stärker auf ein geerdetes Modern-Warfare-Gefühl setzen. Offiziell bestätigt sind Movement, Maps, Gunsmith und Perks noch nicht."],
      ["DMZ & Warzone", "DMZ wird in der Community stark erwartet. Eine Rückkehr von DMZ oder eine konkrete Warzone-Integration ist aktuell nicht bestätigt."],
      ["LoadoutLab Watchlist", "Sobald der Reveal kommt, müssen Name, Key-Art, Plattformen, Waffenliste, Movement, Gunsmith, Warzone-Anbindung und mögliche Beta-Termine sofort aktualisiert werden."],
    ],
    tips: [
      "Fakt: Infinity Ward arbeitet offiziell an einem neuen Modern Warfare.",
      "Noch kein Fakt: finaler Name MW4, Release-Datum, Trailer, Kampagne, DMZ und Multiplayer-Details.",
      "Gerüchte zu Korea, Task Force 141 und Makarov bleiben als Leak markiert, bis Activision oder Infinity Ward sie bestätigt.",
      "Das Bild ist ein fan-made MW4-Key-Art für LoadoutLab und kein offizielles Activision-Asset.",
    ],
  };

  function escapeHtml(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function injectMW4Style() {
    if (document.querySelector("#mw4-watch-style")) return;
    const style = document.createElement("style");
    style.id = "mw4-watch-style";
    style.textContent = `
      .mw4-watch-panel { --mw4-gold: #d8b457; --mw4-gold-rgb: 216, 180, 87; }
      .mw4-watch-panel .mode-info-hero { border: 1px solid rgba(216, 180, 87, 0.46); border-radius: 8px; background: linear-gradient(135deg, rgba(216, 180, 87, 0.13), rgba(8, 13, 17, 0.88) 42%, rgba(5, 8, 11, 0.96)); box-shadow: 0 0 34px rgba(216, 180, 87, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.06); }
      .mw4-watch-panel #modeInfoKicker { color: #efd27c; border-color: rgba(216, 180, 87, 0.58); background: rgba(216, 180, 87, 0.12); }
      .mw4-watch-panel #modeInfoTitle { color: #fff4cf; text-shadow: 0 0 18px rgba(216, 180, 87, 0.24); }
      .mw4-watch-panel #modeInfoImage { border-radius: 8px 8px 0 0 !important; border: 0 !important; border-bottom: 1px solid rgba(216, 180, 87, 0.32) !important; object-fit: cover !important; aspect-ratio: 16 / 9 !important; }
      .mw4-watch-panel #modeInfoStats > div, .mw4-watch-panel #modeInfoCards article, .mw4-watch-panel #modeInfoTips li { border-color: rgba(216, 180, 87, 0.24) !important; background: linear-gradient(145deg, rgba(216, 180, 87, 0.1), rgba(7, 10, 13, 0.88)) !important; }
      .mw4-watch-panel #modeInfoStats strong, .mw4-watch-panel #modeInfoCards h3 { color: #efd27c !important; }
      .mw4-watch-panel #modeInfoCards article { border-left: 0.32rem solid rgba(216, 180, 87, 0.8) !important; }
      .mw4-watch-panel #modeInfoGallery, .mw4-watch-panel .official-note { display: none !important; }
    `;
    document.head.appendChild(style);
  }

  function cleanupSeason4State() {
    const modePanel = document.querySelector('[data-panel="mode-info"]');
    if (modePanel) {
      modePanel.classList.remove("season4-watch-panel");
      modePanel.classList.add("mw4-watch-panel");
    }
    document.querySelector("#season4TrailerPanel")?.remove();
    document.querySelector("#season4KeyArtPanel")?.remove();
    document.querySelectorAll(".season4-prose, .season4-updated-pill").forEach((item) => item.remove());
    const cards = document.querySelector("#modeInfoCards");
    if (cards) { cards.hidden = false; cards.style.display = ""; }
    const side = document.querySelector(".mode-info-side");
    if (side) { side.hidden = false; side.style.display = ""; }
    const updateBox = document.querySelector(".mode-update-box");
    if (updateBox) { updateBox.hidden = false; updateBox.style.display = ""; }
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
    injectMW4Style();
    cleanupSeason4State();
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
      image.style.width = "";
      image.style.height = "";
      image.style.maxHeight = "";
      image.style.aspectRatio = "";
      image.style.objectFit = "";
      image.style.objectPosition = "";
      image.style.background = "";
    }

    const stats = document.querySelector("#modeInfoStats");
    if (stats) stats.innerHTML = mw4Copy.stats.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("");
    const cards = document.querySelector("#modeInfoCards");
    if (cards) cards.innerHTML = mw4Copy.cards.map(([title, text]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join("");
    const tips = document.querySelector("#modeInfoTips");
    if (tips) tips.innerHTML = mw4Copy.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("");
    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) { gallery.innerHTML = ""; gallery.hidden = true; gallery.style.display = "none"; }
  }

  function bindMW4Tab() {
    if (document.documentElement.dataset.mw4UpdateReady === "true") return;
    document.documentElement.dataset.mw4UpdateReady = "true";
    document.addEventListener("click", (event) => {
      const anyPrimaryButton = event.target.closest(".primary-mode-switch .mode-button");
      const button = event.target.closest(".mw4-mode-button, [data-mode='mw4-info']");
      if (anyPrimaryButton && !button) {
        const modePanel = document.querySelector('[data-panel="mode-info"]');
        if (modePanel) modePanel.classList.remove("mw4-watch-panel");
      }
      if (!button) return;
      setTimeout(() => {
        document.querySelectorAll(".primary-mode-switch .mode-button").forEach((item) => item.classList.toggle("active", item === button));
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

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
}());
