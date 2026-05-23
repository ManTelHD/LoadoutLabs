(function () {
  function svgText(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function makeMW4Visual(label, title, subtitle, accent, scene) {
    const color = accent || "#d8b457";
    const sceneName = scene || "intel";
    const titleText = svgText(title);
    const subtitleText = svgText(subtitle);
    const labelText = svgText(label);
    const sceneArt = {
      intel: `
        <g transform="translate(682 118) rotate(-4)">
          <rect x="0" y="0" width="348" height="430" rx="18" fill="#10161b" stroke="${color}" stroke-opacity="0.38" stroke-width="2"/>
          <rect x="28" y="34" width="164" height="18" rx="4" fill="${color}" opacity="0.68"/>
          <rect x="28" y="82" width="288" height="2" fill="#ffffff" opacity="0.15"/>
          <rect x="28" y="120" width="220" height="14" rx="3" fill="#dce5ee" opacity="0.22"/>
          <rect x="28" y="151" width="278" height="14" rx="3" fill="#dce5ee" opacity="0.14"/>
          <rect x="28" y="182" width="188" height="14" rx="3" fill="#dce5ee" opacity="0.18"/>
          <g transform="translate(52 244)" fill="none" stroke="${color}" stroke-opacity="0.7">
            <circle cx="96" cy="70" r="62" stroke-width="2"/>
            <circle cx="96" cy="70" r="34" stroke-width="2" opacity="0.55"/>
            <path d="M96 8 V132 M34 70 H158" stroke-width="1.5" opacity="0.45"/>
            <path d="M96 70 L142 44" stroke-width="5" stroke-linecap="round" filter="url(#hotGlow)"/>
          </g>
          <path d="M248 22 L318 22 L318 92" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" opacity="0.42"/>
        </g>`,
      map: `
        <g transform="translate(635 110)">
          <path d="M22 126 C74 62 134 70 190 100 C252 133 286 98 340 56 C392 16 450 44 493 95 C538 148 516 214 468 252 C414 296 356 260 302 296 C236 340 174 338 112 295 C52 254 -24 236 22 126 Z" fill="${color}" opacity="0.14"/>
          <path d="M88 192 C166 136 235 216 324 152 C395 101 456 139 508 190" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="3"/>
          <path d="M60 286 C154 238 226 280 306 242 C392 201 436 230 516 256" fill="none" stroke="${color}" stroke-opacity="0.42" stroke-width="3"/>
          <g stroke="${color}" stroke-width="2" fill="none" opacity="0.62">
            <circle cx="336" cy="174" r="92"/>
            <circle cx="336" cy="174" r="48" opacity="0.58"/>
            <path d="M336 82 V266 M244 174 H428" opacity="0.42"/>
          </g>
          <g fill="${color}" filter="url(#hotGlow)">
            <circle cx="336" cy="174" r="7"/>
            <circle cx="158" cy="229" r="5" opacity="0.72"/>
            <circle cx="454" cy="142" r="5" opacity="0.72"/>
          </g>
        </g>`,
      signal: `
        <g transform="translate(650 94)" fill="none" stroke="${color}">
          <circle cx="230" cy="230" r="166" stroke-width="2" opacity="0.32"/>
          <circle cx="230" cy="230" r="112" stroke-width="2" opacity="0.44"/>
          <circle cx="230" cy="230" r="58" stroke-width="2" opacity="0.58"/>
          <path d="M230 64 V396 M64 230 H396" stroke-width="1.5" opacity="0.24"/>
          <path d="M230 230 L344 158" stroke-width="8" stroke-linecap="round" filter="url(#hotGlow)"/>
          <path d="M96 362 L390 68" stroke="#ffffff" stroke-opacity="0.11" stroke-width="20"/>
          <rect x="112" y="334" width="236" height="56" rx="8" fill="#06090d" stroke="${color}" stroke-opacity="0.48"/>
          <path d="M145 362 H318" stroke="#ffffff" stroke-opacity="0.24" stroke-width="8" stroke-linecap="round"/>
        </g>`,
      classified: `
        <g transform="translate(670 126)">
          <rect x="0" y="0" width="418" height="286" rx="14" fill="#0c1116" stroke="${color}" stroke-opacity="0.34" stroke-width="2"/>
          <path d="M34 66 H296" stroke="${color}" stroke-width="10" stroke-linecap="round" opacity="0.68"/>
          <path d="M34 112 H356 M34 154 H258 M34 196 H326" stroke="#ffffff" stroke-width="13" stroke-linecap="round" opacity="0.12"/>
          <g transform="translate(250 68) rotate(-14)">
            <rect x="0" y="0" width="178" height="78" rx="8" fill="none" stroke="#ff6f8a" stroke-width="5" opacity="0.86"/>
            <text x="25" y="50" fill="#ff8ea4" font-family="Arial Black, Arial, sans-serif" font-size="23">RUMOR</text>
          </g>
          <path d="M38 242 H378" stroke="${color}" stroke-width="2" stroke-dasharray="10 12" opacity="0.48"/>
        </g>`,
    }[sceneName];

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${labelText} ${titleText}">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#030405"/>
            <stop offset="0.48" stop-color="#10171c"/>
            <stop offset="1" stop-color="#030405"/>
          </linearGradient>
          <radialGradient id="flare" cx="74%" cy="35%" r="52%">
            <stop offset="0" stop-color="${color}" stop-opacity="0.34"/>
            <stop offset="0.42" stop-color="${color}" stop-opacity="0.1"/>
            <stop offset="1" stop-color="${color}" stop-opacity="0"/>
          </radialGradient>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.18"/>
            </feComponentTransfer>
          </filter>
          <filter id="hotGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="microgrid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0V44" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
          </pattern>
          <clipPath id="slash"><path d="M0 0H1200V675H0Z M735 0H1200V675H560Z" fill-rule="evenodd"/></clipPath>
        </defs>
        <rect width="1200" height="675" fill="url(#bg)"/>
        <rect width="1200" height="675" fill="url(#microgrid)"/>
        <rect width="1200" height="675" fill="url(#flare)"/>
        <rect width="1200" height="675" filter="url(#grain)" opacity="0.3"/>
        <path d="M0 516 C150 442 284 494 428 448 C620 386 700 428 826 354 C962 276 1054 258 1200 310 V675 H0 Z" fill="${color}" opacity="0.07"/>
        <path d="M740 0H1200V675H570Z" fill="#ffffff" opacity="0.035" clip-path="url(#slash)"/>
        ${sceneArt}
        <g transform="translate(78 92)">
          <rect x="0" y="0" width="178" height="38" rx="7" fill="${color}" opacity="0.92"/>
          <text x="18" y="26" fill="#050608" font-family="Arial Black, Arial, sans-serif" font-size="18">${labelText}</text>
          <text x="0" y="142" fill="#fff7d7" font-family="Arial Black, Impact, sans-serif" font-size="74">${titleText}</text>
          <text x="3" y="195" fill="#e5edf3" font-family="Arial, sans-serif" font-size="30" font-weight="700">${subtitleText}</text>
          <path d="M0 248 H470" stroke="${color}" stroke-width="4" stroke-linecap="round" opacity="0.72" filter="url(#hotGlow)"/>
          <text x="0" y="330" fill="#aeb8c2" font-family="Arial, sans-serif" font-size="23">LOADOUTLAB INTEL BOARD</text>
          <text x="0" y="368" fill="#69737d" font-family="Arial, sans-serif" font-size="19">Statusgrafik bis offizielles MW4-Key-Art erscheint</text>
        </g>
        <rect x="22" y="22" width="1156" height="631" rx="8" fill="none" stroke="${color}" stroke-opacity="0.42" stroke-width="2"/>
        <rect x="36" y="36" width="1128" height="603" rx="6" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  const mw4Visuals = {
    hero: makeMW4Visual("OFFIZIELL", "MODERN WARFARE", "Infinity Ward bestätigt neues Projekt", "#d8b457", "intel"),
    name: makeMW4Visual("NOCH OFFEN", "MW4", "Finaler Name noch nicht offiziell", "#d8b457", "classified"),
    reveal: makeMW4Visual("REVEAL WATCH", "SOMMER 2026", "Trailer oder Blogpost erwartet", "#35d4ff", "signal"),
    rumors: makeMW4Visual("GERÜCHTE", "KOREA / DMZ", "Leaks bleiben markiert", "#b98cff", "map"),
  };

  const mw4Copy = {
    title: "MW4 Infos & Gerüchte",
    description: "Aktueller Stand zu Call of Duty 2026: Infinity Ward hat am 21. Mai 2026 offiziell bestätigt, dass das Studio am „definitive Modern Warfare“ arbeitet. Der Name MW4 ist noch nicht offiziell veröffentlicht, bleibt aber die wahrscheinlichste Bezeichnung in Berichten und Leaks.",
    kicker: "Call of Duty 2026",
    imageUrl: mw4Visuals.hero,
    imageAlt: "MW4 Watch Statusgrafik: Infinity Ward bestätigt ein neues Modern Warfare",
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
      ["LoadoutLab Watchlist", "Sobald der Reveal kommt, müssen Name, Key-Art, Plattformen, Waffenliste, Movement, Gunsmith, Warzone-Anbindung und mögliche Beta-Termine sofort aktualisiert werden."],
    ],
    images: [
      ["Offiziell: Infinity Ward", mw4Visuals.hero],
      ["Noch offen: Name MW4", mw4Visuals.name],
      ["Reveal Watch", mw4Visuals.reveal],
      ["Gerüchte: DMZ / Korea", mw4Visuals.rumors],
    ],
    tips: [
      "Fakt: Infinity Ward arbeitet offiziell an einem neuen Modern Warfare.",
      "Noch kein Fakt: finaler Name MW4, Release-Datum, Trailer, Kampagne, DMZ und Multiplayer-Details.",
      "Gerüchte zu Korea, Task Force 141 und Makarov bleiben als Leak markiert, bis Activision oder Infinity Ward sie bestätigt.",
      "Die Bilder sind jetzt eigene MW4-Intel-Grafiken und keine zufälligen Stock-Fotos oder angeblichen Screenshots.",
      "Sobald offizielles Key-Art oder ein Trailer erscheint, sollten die Statusgrafiken durch echte offizielle Assets ersetzt werden.",
    ],
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function injectMW4Style() {
    if (document.querySelector("#mw4-watch-style")) return;
    const style = document.createElement("style");
    style.id = "mw4-watch-style";
    style.textContent = `
      .mw4-watch-panel {
        --mw4-gold: #d8b457;
        --mw4-gold-soft: rgba(216, 180, 87, 0.18);
        --mw4-panel: rgba(9, 13, 17, 0.92);
      }

      .mw4-watch-panel .mode-info-hero {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(216, 180, 87, 0.46);
        border-radius: 8px;
        background:
          linear-gradient(135deg, rgba(216, 180, 87, 0.13), rgba(8, 13, 17, 0.88) 42%, rgba(5, 8, 11, 0.96)),
          radial-gradient(circle at 78% 24%, rgba(216, 180, 87, 0.22), transparent 34%);
        box-shadow: 0 0 34px rgba(216, 180, 87, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      }

      .mw4-watch-panel .mode-info-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(0deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: linear-gradient(135deg, rgba(0, 0, 0, 0.58), transparent 74%);
      }

      .mw4-watch-panel #modeInfoKicker {
        color: #efd27c;
        border-color: rgba(216, 180, 87, 0.58);
        background: rgba(216, 180, 87, 0.12);
        box-shadow: 0 0 18px rgba(216, 180, 87, 0.16);
      }

      .mw4-watch-panel #modeInfoTitle {
        color: #fff4cf;
        text-shadow: 0 0 18px rgba(216, 180, 87, 0.24);
      }

      .mw4-watch-panel #modeInfoImage {
        border-radius: 8px;
        border: 1px solid rgba(216, 180, 87, 0.54);
        box-shadow: 0 18px 46px rgba(0, 0, 0, 0.48), 0 0 34px rgba(216, 180, 87, 0.18);
        background: #05070a;
      }

      .mw4-watch-panel #modeInfoStats > div,
      .mw4-watch-panel #modeInfoCards article,
      .mw4-watch-panel #modeInfoTips li,
      .mw4-watch-panel #modeInfoGallery figure {
        border-color: rgba(216, 180, 87, 0.28);
        background: linear-gradient(135deg, rgba(216, 180, 87, 0.095), rgba(8, 13, 17, 0.9));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }

      .mw4-watch-panel #modeInfoStats strong,
      .mw4-watch-panel #modeInfoCards h3,
      .mw4-watch-panel #modeInfoGallery figcaption {
        color: #efd27c;
      }

      .mw4-watch-panel #modeInfoCards article {
        border-left: 4px solid var(--mw4-gold);
      }

      .mw4-watch-panel #modeInfoGallery img {
        aspect-ratio: 16 / 9;
        object-fit: cover;
        filter: saturate(1.04) contrast(1.08);
        transition: transform 180ms ease, filter 180ms ease;
      }

      .mw4-watch-panel #modeInfoGallery figure:hover img {
        transform: scale(1.025);
        filter: saturate(1.12) contrast(1.12) brightness(1.04);
      }
    `;
    document.head.appendChild(style);
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
    const modePanel = document.querySelector('[data-panel="mode-info"]');
    if (modePanel) modePanel.classList.add("mw4-watch-panel");

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
      const anyPrimaryButton = event.target.closest(".primary-mode-switch .mode-button");
      const button = event.target.closest(".mw4-mode-button, [data-mode='mw4-info']");
      if (anyPrimaryButton && !button) {
        const modePanel = document.querySelector('[data-panel="mode-info"]');
        if (modePanel) modePanel.classList.remove("mw4-watch-panel");
      }
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
