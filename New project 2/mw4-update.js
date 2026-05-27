(function () {
  const mw4Image = "https://pbs.twimg.com/media/HI3_HHtW4AAHqkg.jpg";
  const mw4Copy = {
    title: "MW4 Infos & Gerüchte",
    description: "Aktueller Stand zu Call of Duty 2026: Infinity Ward hat offiziell bestätigt, dass das Studio an einem neuen Modern Warfare arbeitet. Der Name MW4 ist noch nicht bestätigt, wird in der Community aber als wahrscheinlichste Bezeichnung gehandelt.",
    kicker: "Call of Duty 2026",
    imageUrl: mw4Image,
    imageAlt: "MW4 Community-Bild von TheGhostOfHope auf X",
    updateTime: "Aktualisiert: 27. Mai 2026",
    updateSummary: "Bestätigt ist nur das neue Modern-Warfare-Projekt von Infinity Ward. Name, Reveal, Trailer, Release, Kampagne, DMZ, Warzone-Anbindung und Multiplayer-Details bleiben bis zur offiziellen Enthüllung Gerücht beziehungsweise Watchlist.",
    stats: [["Status", "Watchlist"], ["Studio", "Infinity Ward"], ["Name", "MW4 unbestätigt"], ["Reveal", "erwartet 2026"]],
  };

  function html(value) {
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
      body .mw4-watch-panel {
        --mw4-gold: #d8b457;
        --mw4-gold-rgb: 216, 180, 87;
      }
      body [data-panel="mode-info"]:not(.mw4-watch-panel) .mw4-prose,
      body [data-panel="mode-info"]:not(.mw4-watch-panel) .mw4-updated-pill {
        display: none !important;
      }
      body .mw4-watch-panel .mode-info-layout {
        display: block !important;
      }
      body .mw4-watch-panel .mode-info-main {
        width: 100% !important;
        max-width: none !important;
      }
      body .mw4-watch-panel .mode-info-side,
      body .mw4-watch-panel .mode-update-box,
      body .mw4-watch-panel #modeInfoCards,
      body .mw4-watch-panel #modeInfoTips {
        display: none !important;
      }
      body .mw4-watch-panel .mode-info-hero {
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.44) !important;
        border-radius: 8px !important;
        background: linear-gradient(135deg, rgba(var(--mw4-gold-rgb), 0.13), rgba(8, 13, 17, 0.9) 42%, rgba(5, 8, 11, 0.96)) !important;
        box-shadow: 0 0 34px rgba(var(--mw4-gold-rgb), 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;
      }
      body .mw4-watch-panel #modeInfoKicker {
        color: #efd27c !important;
        border-color: rgba(var(--mw4-gold-rgb), 0.58) !important;
        background: rgba(var(--mw4-gold-rgb), 0.12) !important;
      }
      body .mw4-watch-panel #modeInfoTitle {
        color: #fff4cf !important;
        text-shadow: 0 0 18px rgba(var(--mw4-gold-rgb), 0.24) !important;
      }
      body .mw4-watch-panel #modeInfoImage {
        width: 100% !important;
        height: auto !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        object-fit: contain !important;
        object-position: center center !important;
        border-radius: 8px 8px 0 0 !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(var(--mw4-gold-rgb), 0.32) !important;
        background: transparent !important;
      }
      body .mw4-watch-panel #modeInfoStats > div {
        border-color: rgba(var(--mw4-gold-rgb), 0.24) !important;
        background: linear-gradient(145deg, rgba(var(--mw4-gold-rgb), 0.1), rgba(7, 10, 13, 0.88)) !important;
      }
      body .mw4-watch-panel #modeInfoStats strong {
        color: #efd27c !important;
      }
      body .mw4-watch-panel .mw4-updated-pill {
        display: inline-flex !important;
        align-items: center !important;
        width: max-content !important;
        margin-top: 0.65rem !important;
        padding: 0.3rem 0.55rem !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.32) !important;
        border-radius: 999px !important;
        background: rgba(5, 8, 11, 0.72) !important;
        color: rgba(255, 244, 207, 0.82) !important;
        font-size: 0.72rem !important;
        font-weight: 800 !important;
        line-height: 1 !important;
      }
      body .mw4-watch-panel .mw4-prose {
        display: block !important;
        margin-top: 1rem !important;
        padding: clamp(1.05rem, 1.8vw, 1.45rem) !important;
        border: 1px solid rgba(var(--mw4-gold-rgb), 0.24) !important;
        border-radius: 8px !important;
        background: linear-gradient(145deg, rgba(18, 17, 12, 0.94), rgba(5, 8, 11, 0.96)) !important;
        color: rgba(242, 236, 220, 0.9) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0.7rem 1.5rem rgba(0, 0, 0, 0.22) !important;
      }
      body .mw4-watch-panel .mw4-prose h3 {
        margin: 0 0 0.85rem !important;
        color: #ffe08a !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.55rem, 2.1vw, 2.1rem) !important;
        line-height: 1 !important;
      }
      body .mw4-watch-panel .mw4-prose h4 {
        margin: 1.15rem 0 0.45rem !important;
        color: #fff4cf !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: clamp(1.1rem, 1.35vw, 1.35rem) !important;
        line-height: 1.05 !important;
      }
      body .mw4-watch-panel .mw4-prose p {
        margin: 0 0 0.75rem !important;
        max-width: 86ch !important;
        color: rgba(242, 236, 220, 0.88) !important;
        font-size: 1rem !important;
        line-height: 1.62 !important;
      }
      body .mw4-watch-panel .mw4-prose ul {
        display: grid !important;
        gap: 0.45rem !important;
        margin: 0.35rem 0 0.9rem !important;
        padding: 0 !important;
        list-style: none !important;
      }
      body .mw4-watch-panel .mw4-prose li {
        position: relative !important;
        padding-left: 1.1rem !important;
        color: rgba(242, 236, 220, 0.9) !important;
        line-height: 1.48 !important;
      }
      body .mw4-watch-panel .mw4-prose li::before {
        content: "" !important;
        position: absolute !important;
        left: 0 !important;
        top: 0.62em !important;
        width: 0.38rem !important;
        height: 0.38rem !important;
        border-radius: 999px !important;
        background: #d8b457 !important;
      }
      body .mw4-watch-panel #modeInfoGallery,
      body .mw4-watch-panel .official-note {
        display: none !important;
      }
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
    document.querySelectorAll(".mw4-prose, .mw4-updated-pill").forEach((item) => item.remove());
  }

  function activateModeInfoPanel() {
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
  }

  function setText(id, value) {
    const element = document.querySelector(`#${id}`);
    if (element) element.textContent = value;
  }

  function renderStats() {
    const stats = document.querySelector("#modeInfoStats");
    if (!stats) return;
    stats.innerHTML = mw4Copy.stats.map(([label, value]) => `<div><span>${html(label)}</span><strong>${html(value)}</strong></div>`).join("");
  }

  function renderProse() {
    const body = document.querySelector(".mw4-watch-panel .mode-info-body");
    if (!body) return;
    const cards = body.querySelector("#modeInfoCards");
    if (cards) {
      cards.hidden = true;
      cards.style.display = "none";
    }
    const side = document.querySelector(".mw4-watch-panel .mode-info-side");
    if (side) {
      side.hidden = true;
      side.style.display = "none";
    }
    const updateBox = body.querySelector(".mode-update-box");
    if (updateBox) {
      updateBox.hidden = true;
      updateBox.style.display = "none";
    }

    const prose = document.createElement("section");
    prose.className = "mw4-prose";
    prose.innerHTML = `
      <h3>Was zu MW4 aktuell wichtig ist</h3>
      <p>Der MW4-Tab ist bewusst als Watchlist aufgebaut: Offiziell bestätigt ist, dass Infinity Ward am nächsten Modern-Warfare-Projekt arbeitet. Alles darüber hinaus bleibt bis zur Enthüllung vorsichtig eingeordnet, damit hier keine Season-4-Infos oder unbestätigte Details als Fakt landen.</p>
      <p>In der Community wird das Projekt aktuell meist MW4 genannt. Der Name passt zur Reboot-Reihe nach Modern Warfare, Modern Warfare II und Modern Warfare III, ist aber noch nicht von Activision oder Infinity Ward bestätigt. Sobald der offizielle Reveal kommt, muss dieser Bereich auf echten Namen, Trailer, Key-Art und Blogpost-Daten umgestellt werden.</p>
      <h4>Bestätigt</h4>
      <ul>
        <li>Infinity Ward arbeitet offiziell an einem neuen Modern Warfare.</li>
        <li>Das Projekt wird von der Community als Call of Duty 2026 eingeordnet.</li>
        <li>Der finale Name MW4 ist noch nicht offiziell bestätigt.</li>
        <li>Ein offizieller Trailer, eine Roadmap und ein vollständiger Blogpost stehen noch aus.</li>
      </ul>
      <h4>Gerüchte & Community-Talk</h4>
      <p>Aktuell drehen sich die meisten Gerüchte um ein stärker geerdetes Modern-Warfare-Gefühl, mögliche Task-Force-141-Bezüge und ein Setting mit Korea-Fokus. Auch DMZ wird in der Community immer wieder genannt. Diese Punkte bleiben aber Gerüchte, bis Activision oder Infinity Ward sie direkt bestätigt.</p>
      <ul>
        <li>Korea-Setting: häufig genannt, aber nicht offiziell.</li>
        <li>Task Force 141 und Makarov-Folgen: plausibel für Modern Warfare, aber unbestätigt.</li>
        <li>DMZ-Rückkehr: stark gewünscht, aktuell keine offizielle Bestätigung.</li>
        <li>Movement, Gunsmith, Perks und Maps: noch keine belastbaren offiziellen Details.</li>
      </ul>
      <h4>Worauf LoadoutLab achten muss</h4>
      <p>Sobald der Reveal live ist, sollten zuerst Name, offizielles Key-Art, Trailer, Plattformen, Beta-Termine, Kampagnen-Setting, Multiplayer-Systeme und Warzone-Anbindung geprüft werden. Für die Meta-Seite sind später vor allem neue Waffen, Attachments, TTK, Recoil, Movement und mögliche Integrationen in Warzone entscheidend.</p>
      <h4>Nächster erwarteter Schritt</h4>
      <p>Der nächste große Sprung für diesen Tab ist ein offizieller Reveal-Trailer oder ein Activision-Blogpost. Bis dahin bleibt MW4 hier als Gerüchte- und Watchlist-Bereich getrennt von Season 4, damit die Inhalte sauber auseinander bleiben.</p>
    `;
    if (cards) cards.insertAdjacentElement("afterend", prose);
    else body.appendChild(prose);
  }

  function renderUpdatedPill() {
    const heroText = document.querySelector(".mw4-watch-panel .mode-info-hero > div");
    if (!heroText) return;
    const pill = document.createElement("span");
    pill.className = "mw4-updated-pill";
    pill.textContent = mw4Copy.updateTime;
    heroText.appendChild(pill);
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
      image.style.width = "100%";
      image.style.height = "auto";
      image.style.maxHeight = "none";
      image.style.aspectRatio = "auto";
      image.style.objectFit = "contain";
      image.style.objectPosition = "center center";
      image.style.background = "transparent";
    }

    renderStats();
    renderUpdatedPill();
    renderProse();

    const gallery = document.querySelector("#modeInfoGallery");
    if (gallery) {
      gallery.innerHTML = "";
      gallery.hidden = true;
      gallery.style.display = "none";
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
