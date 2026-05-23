(function () {
  function makeMW4Visual(label, title, subtitle, accent) {
    const color = accent || "#f5c84c";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img">
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#05070a"/>
            <stop offset="0.52" stop-color="#111920"/>
            <stop offset="1" stop-color="#05070a"/>
          </linearGradient>
          <radialGradient id="glow" cx="68%" cy="38%" r="48%">
            <stop offset="0" stop-color="${color}" stop-opacity="0.42"/>
            <stop offset="0.45" stop-color="${color}" stop-opacity="0.12"/>
            <stop offset="1" stop-color="${color}" stop-opacity="0"/>
          </radialGradient>
          <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="grid" width="58" height="58" patternUnits="userSpaceOnUse">
            <path d="M 58 0 L 0 0 0 58" fill="none" stroke="#ffffff" stroke-opacity="0.055" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="1200" height="675" fill="url(#bg)"/>
        <rect width="1200" height="675" fill="url(#grid)"/>
        <rect width="1200" height="675" fill="url(#glow)"/>
        <path d="M-70 540 C210 445 365 635 670 502 C842 427 950 442 1270 310 L1270 675 L-70 675 Z" fill="${color}" opacity="0.1"/>
        <path d="M780 92 L1100 92 L1040 145 L718 145 Z" fill="${color}" opacity="0.85"/>
        <path d="M785 560 L1060 560" stroke="${color}" stroke-width="5" stroke-linecap="round" opacity="0.72"/>
        <g opacity="0.65" stroke="${color}" fill="none">
          <circle cx="925" cy="340" r="118" stroke-width="3" opacity="0.8"/>
          <circle cx="925" cy="340" r="74" stroke-width="2" opacity="0.65"/>
          <path d="M925 198 V482 M783 340 H1067" stroke-width="2" opacity="0.5"/>
          <path d="M925 340 L1014 292" stroke-width="5" stroke-linecap="round" filter="url(#softGlow)"/>
        </g>
        <g transform="translate(80 84)">
          <text x="0" y="0" fill="${color}" font-family="Arial Black, Impact, sans-serif" font-size="28" letter-spacing="3">MW4 WATCH</text>
          <text x="0" y="98" fill="#ffffff" font-family="Arial Black, Impact, sans-serif" font-size="88">${title}</text>
          <text x="3" y="155" fill="#d9e2ea" font-family="Arial, sans-serif" font-size="34" font-weight="700">${subtitle}</text>
          <rect x="0" y="212" width="250" height="54" rx="8" fill="#080d12" stroke="${color}" stroke-width="2"/>
          <text x="24" y="248" fill="${color}" font-family="Arial Black, Arial, sans-serif" font-size="22">${label}</text>
          <text x="0" y="420" fill="#7d8790" font-family="Arial, sans-serif" font-size="24">Keine offiziellen MW4-Screenshots - Statusgrafik für LoadoutLab</text>
        </g>
        <rect x="24" y="24" width="1152" height="627" rx="16" fill="none" stroke="${color}" stroke-opacity="0.46" stroke-width="3"/>
      </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  const mw4Visuals = {
    hero: makeMW4Visual("OFFIZIELL", "MODERN WARFARE", "Infinity Ward bestätigt neues Projekt", "#f5c84c"),
    name: makeMW4Visual("NOCH OFFEN", "MW4?", "Name noch nicht offiziell", "#f5c84c"),
    reveal: makeMW4Visual("REVEAL WATCH", "SOMMER 2026", "Trailer oder Blogpost erwartet", "#35d4ff"),
    rumors: makeMW4Visual("GERÜCHTE", "KOREA / DMZ", "Leaks bleiben markiert", "#b98cff"),
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
      "Die Bilder sind jetzt eigene MW4-Watch-Statusgrafiken und keine zufälligen Stock-Fotos oder angeblichen Screenshots.",
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
        --mw4-gold: #f5c84c;
        --mw4-gold-soft: rgba(245, 200, 76, 0.18);
        --mw4-panel: rgba(9, 13, 17, 0.92);
      }

      .mw4-watch-panel .mode-info-hero {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(245, 200, 76, 0.44);
        border-radius: 8px;
        background:
          linear-gradient(135deg, rgba(245, 200, 76, 0.16), rgba(8, 13, 17, 0.84) 42%, rgba(5, 8, 11, 0.95)),
          radial-gradient(circle at 78% 24%, rgba(245, 200, 76, 0.28), transparent 34%);
        box-shadow: 0 0 30px rgba(245, 200, 76, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.06);
      }

      .mw4-watch-panel .mode-info-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        background:
          linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px),
          linear-gradient(0deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
        background-size: 42px 42px;
        mask-image: linear-gradient(135deg, rgba(0, 0, 0, 0.6), transparent 74%);
      }

      .mw4-watch-panel #modeInfoKicker {
        color: var(--mw4-gold);
        border-color: rgba(245, 200, 76, 0.55);
        background: rgba(245, 200, 76, 0.12);
        box-shadow: 0 0 18px rgba(245, 200, 76, 0.16);
      }

      .mw4-watch-panel #modeInfoTitle {
        color: #fff7cf;
        text-shadow: 0 0 18px rgba(245, 200, 76, 0.22);
      }

      .mw4-watch-panel #modeInfoImage {
        border-radius: 8px;
        border: 1px solid rgba(245, 200, 76, 0.5);
        box-shadow: 0 16px 42px rgba(0, 0, 0, 0.42), 0 0 30px rgba(245, 200, 76, 0.16);
        background: #05070a;
      }

      .mw4-watch-panel #modeInfoStats > div,
      .mw4-watch-panel #modeInfoCards article,
      .mw4-watch-panel #modeInfoTips li,
      .mw4-watch-panel #modeInfoGallery figure {
        border-color: rgba(245, 200, 76, 0.28);
        background: linear-gradient(135deg, rgba(245, 200, 76, 0.11), rgba(8, 13, 17, 0.88));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }

      .mw4-watch-panel #modeInfoStats strong,
      .mw4-watch-panel #modeInfoCards h3,
      .mw4-watch-panel #modeInfoGallery figcaption {
        color: #ffe08a;
      }

      .mw4-watch-panel #modeInfoCards article {
        border-left: 4px solid var(--mw4-gold);
      }

      .mw4-watch-panel #modeInfoGallery img {
        filter: saturate(1.08) contrast(1.06);
        transition: transform 180ms ease, filter 180ms ease;
      }

      .mw4-watch-panel #modeInfoGallery figure:hover img {
        transform: scale(1.03);
        filter: saturate(1.18) contrast(1.12) brightness(1.04);
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
