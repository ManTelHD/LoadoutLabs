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
          <radialGradient id="searchLight" cx="22%" cy="18%" r="38%">
            <stop offset="0" stop-color="#dfe9ea" stop-opacity="0.32"/>
            <stop offset="1" stop-color="#dfe9ea" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="wetRoad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stop-color="#101511"/>
            <stop offset="1" stop-color="#030404"/>
          </linearGradient>
          <filter id="blur"><feGaussianBlur stdDeviation="10"/></filter>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feComponentTransfer><feFuncA type="table" tableValues="0 0.2"/></feComponentTransfer>
          </filter>
          <filter id="logoGlow" x="-35%" y="-45%" width="170%" height="190%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="haze"><rect width="1600" height="900" rx="0"/></clipPath>
        </defs>

        <rect width="1600" height="900" fill="url(#sky)"/>
        <rect width="1600" height="900" fill="url(#cityGlow)"/>
        <rect width="1600" height="900" fill="url(#searchLight)" opacity="0.72"/>

        <g opacity="0.55" filter="url(#blur)">
          <ellipse cx="775" cy="420" rx="760" ry="160" fill="#202820"/>
          <ellipse cx="920" cy="520" rx="680" ry="180" fill="#050807"/>
        </g>

        <path d="M0 514 C174 448 290 472 438 434 C600 392 696 312 846 344 C994 376 1122 312 1600 390 V900 H0 Z" fill="#080b09" opacity="0.88"/>
        <path d="M0 535 C168 486 312 508 448 463 C602 411 690 374 846 397 C990 418 1135 370 1600 430 V900 H0 Z" fill="#131912" opacity="0.72"/>

        <g opacity="0.92">
          <rect x="118" y="374" width="44" height="188" fill="#171f1b"/>
          <rect x="182" y="330" width="54" height="230" fill="#101614"/>
          <rect x="258" y="360" width="40" height="200" fill="#151c18"/>
          <rect x="334" y="292" width="66" height="272" fill="#111816"/>
          <rect x="438" y="342" width="50" height="222" fill="#111714"/>
          <rect x="520" y="252" width="74" height="314" fill="#151d19"/>
          <rect x="636" y="298" width="56" height="268" fill="#101614"/>
          <rect x="736" y="218" width="70" height="348" fill="#18201c"/>
          <rect x="846" y="274" width="52" height="292" fill="#121915"/>
          <rect x="944" y="196" width="78" height="372" fill="#151d19"/>
          <rect x="1064" y="284" width="52" height="282" fill="#111714"/>
          <rect x="1160" y="226" width="82" height="340" fill="#17201b"/>
          <rect x="1280" y="316" width="66" height="250" fill="#101614"/>
          <rect x="1384" y="264" width="72" height="304" fill="#151d19"/>
        </g>

        <g fill="#c9d1c2" opacity="0.58">
          <rect x="536" y="276" width="10" height="4"/><rect x="566" y="292" width="8" height="4"/><rect x="752" y="246" width="10" height="4"/>
          <rect x="782" y="294" width="9" height="4"/><rect x="962" y="220" width="10" height="4"/><rect x="990" y="262" width="9" height="4"/>
          <rect x="1182" y="252" width="10" height="4"/><rect x="1214" y="304" width="8" height="4"/><rect x="1408" y="296" width="9" height="4"/>
          <rect x="212" y="362" width="8" height="4"/><rect x="356" y="326" width="9" height="4"/><rect x="462" y="382" width="8" height="4"/>
        </g>

        <g transform="translate(805 286)" opacity="0.94">
          <path d="M0 140 H252 L218 160 H34 Z" fill="#0b0d0b"/>
          <path d="M18 140 C34 98 58 72 126 20 C194 72 218 98 234 140 Z" fill="#181f18" stroke="#a58d51" stroke-opacity="0.62" stroke-width="3"/>
          <path d="M52 118 H200 M72 92 H180 M94 66 H158" stroke="#c2aa68" stroke-opacity="0.58" stroke-width="4"/>
          <path d="M126 18 V-52" stroke="#b8c0b0" stroke-opacity="0.54" stroke-width="3"/>
        </g>

        <g transform="translate(904 130)" opacity="0.9">
          <path d="M54 0 L70 138 H38 Z" fill="#121715"/>
          <circle cx="54" cy="28" r="18" fill="#151c19" stroke="#c0c6b6" stroke-opacity="0.38" stroke-width="3"/>
          <path d="M54 -32 V12" stroke="#d2d8ce" stroke-opacity="0.48" stroke-width="3"/>
          <circle cx="54" cy="-38" r="5" fill="#d1b86a" opacity="0.9"/>
        </g>

        <g opacity="0.85">
          <path d="M0 675 C250 610 382 626 548 664 C746 710 916 674 1088 626 C1268 576 1410 590 1600 634 V900 H0 Z" fill="url(#wetRoad)"/>
          <path d="M640 626 L420 900 M874 626 L1090 900" stroke="#2e352d" stroke-width="4" opacity="0.45"/>
          <path d="M776 638 C742 710 706 802 678 900 M838 636 C870 722 904 808 928 900" stroke="#8f7b45" stroke-width="3" opacity="0.35"/>
        </g>

        <g opacity="0.62" filter="url(#blur)">
          <ellipse cx="744" cy="748" rx="210" ry="36" fill="#d5c690" opacity="0.16"/>
          <ellipse cx="1172" cy="748" rx="260" ry="40" fill="#e0dfd8" opacity="0.1"/>
          <ellipse cx="410" cy="748" rx="240" ry="42" fill="#cad9cd" opacity="0.08"/>
        </g>

        <g fill="#030404" opacity="0.96">
          <path d="M210 522 c38 0 70 38 70 88 v130 h-144 v-130 c0-50 32-88 74-88z"/>
          <path d="M154 628 h122 l56 150 h-230z"/>
          <path d="M186 512 c0-30 52-30 52 0 v30 h-52z"/>
          <path d="M246 642 l178 44 -8 22 -184-26z"/>
          <path d="M1180 548 c34 0 62 32 62 76 v116 h-126 v-116 c0-44 28-76 64-76z"/>
          <path d="M1132 648 h122 l44 130 h-204z"/>
          <path d="M1158 538 c0-26 46-26 46 0 v28 h-46z"/>
          <path d="M1124 664 l-142 58 -10-22 138-74z"/>
          <path d="M764 574 c28 0 50 27 50 64 v94 h-102 v-94 c0-37 22-64 52-64z" opacity="0.9"/>
          <path d="M884 586 c24 0 44 24 44 56 v86 h-90 v-86 c0-32 20-56 46-56z" opacity="0.86"/>
        </g>

        <g transform="translate(68 108)" opacity="0.78">
          <path d="M0 18 L138 0 L178 18 L136 32 L0 30 Z" fill="#030404"/>
          <path d="M84 20 L110 92 H94 L62 22 Z" fill="#030404"/>
          <path d="M-20 18 H48 M150 16 H226" stroke="#030404" stroke-width="8" stroke-linecap="round"/>
          <path d="M66 92 L182 410" stroke="#e6eeee" stroke-opacity="0.18" stroke-width="24" stroke-linecap="round"/>
        </g>
        <g transform="translate(1288 134) scale(.74)" opacity="0.62">
          <path d="M0 18 L138 0 L178 18 L136 32 L0 30 Z" fill="#030404"/>
          <path d="M84 20 L110 92 H94 L62 22 Z" fill="#030404"/>
          <path d="M-20 18 H48 M150 16 H226" stroke="#030404" stroke-width="8" stroke-linecap="round"/>
          <path d="M58 92 L-48 390" stroke="#e6eeee" stroke-opacity="0.13" stroke-width="24" stroke-linecap="round"/>
        </g>

        <g stroke="#cfd8d0" stroke-width="2" stroke-linecap="round" opacity="0.2">
          <path d="M120 0 L104 900 M254 0 L222 900 M402 0 L360 900 M548 0 L494 900 M710 0 L654 900 M886 0 L822 900 M1034 0 L970 900 M1210 0 L1140 900 M1390 0 L1320 900"/>
        </g>

        <g transform="translate(1004 674)" filter="url(#logoGlow)">
          <path d="M0 0 H72 L114 66 L156 0 H230 L230 112 H178 V45 L134 112 H94 L52 45 V112 H0 Z" fill="#f4f4f0"/>
          <path d="M250 0 H310 L345 64 L382 0 H442 L377 112 H318 Z" fill="#f4f4f0"/>
          <path d="M520 0 H582 V70 H620 V112 H582 V146 H530 V112 H438 V72 Z M530 70 V28 L484 70 Z" fill="#f4f4f0"/>
          <path d="M0 128 H620" stroke="#9d8950" stroke-width="5" opacity="0.72"/>
        </g>

        <rect width="1600" height="900" fill="url(#cityGlow)" opacity="0.18"/>
        <rect width="1600" height="900" filter="url(#grain)" opacity="0.26"/>
        <rect x="0" y="0" width="1600" height="900" fill="none" stroke="#b9a15b" stroke-opacity="0.18" stroke-width="3"/>
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
    images: [["MW4 Korea Key Art", mw4KeyArt]],
    tips: [
      "Fakt: Infinity Ward arbeitet offiziell an einem neuen Modern Warfare.",
      "Noch kein Fakt: finaler Name MW4, Release-Datum, Trailer, Kampagne, DMZ und Multiplayer-Details.",
      "Gerüchte zu Korea, Task Force 141 und Makarov bleiben als Leak markiert, bis Activision oder Infinity Ward sie bestätigt.",
      "Das Bild ist ein fan-made MW4-Key-Art für LoadoutLab und kein offizielles Activision-Asset.",
      "Sobald offizielles Key-Art oder ein Trailer erscheint, sollte das Fan-Art durch echte offizielle Assets ersetzt werden.",
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
        background: linear-gradient(120deg, rgba(216, 180, 87, 0.12), transparent 34%, rgba(255,255,255,0.04));
        opacity: 0.6;
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
      .mw4-watch-panel #modeInfoCards h3 {
        color: #efd27c;
      }

      .mw4-watch-panel #modeInfoCards article {
        border-left: 4px solid var(--mw4-gold);
      }

      .mw4-watch-panel #modeInfoGallery {
        grid-template-columns: 1fr;
      }

      .mw4-watch-panel #modeInfoGallery img {
        aspect-ratio: 16 / 9;
        width: 100%;
        object-fit: cover;
        filter: saturate(1.06) contrast(1.1);
        transition: transform 180ms ease, filter 180ms ease;
      }

      .mw4-watch-panel #modeInfoGallery figcaption {
        display: none;
      }

      .mw4-watch-panel #modeInfoGallery figure:hover img {
        transform: scale(1.015);
        filter: saturate(1.12) contrast(1.13) brightness(1.03);
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
