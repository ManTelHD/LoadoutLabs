(function () {
  const STYLE_ID = "loadout-lab-partner-gear-style";
  const SECTION_SELECTOR = "#monetarisierung";
  const NOTE_ID = "partnerPlaceholderNote";
  const TOP_AD_ID = "topAdSlots";

  const css = `
    .support-section .partner-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
    .partner-card small{color:var(--dim);font-weight:800;line-height:1.45}
    .partner-note{margin:.85rem 0 0;color:var(--dim);font-size:.95rem;line-height:1.6}
    .partner-note strong{color:var(--amber)}
    .top-ad-slots{display:grid;grid-template-columns:minmax(0,18rem) minmax(0,1fr) minmax(0,18rem);gap:1rem;align-items:stretch;width:min(100% - 2rem,96rem);margin:.75rem auto 1rem}
    .top-ad-card{position:relative;overflow:hidden;display:grid;gap:.35rem;min-height:7.25rem;border:1px solid rgba(240,173,55,.42);border-radius:.6rem;background:linear-gradient(135deg,rgba(240,173,55,.16),transparent 42%),rgba(10,13,12,.96);box-shadow:0 18px 48px rgba(0,0,0,.22);padding:.8rem;text-decoration:none}
    .top-ad-card:before{content:"";position:absolute;inset:0;border-top:.22rem solid rgba(240,173,55,.86);pointer-events:none}
    .top-ad-card span{width:fit-content;border:1px solid rgba(240,173,55,.34);border-radius:999px;color:var(--amber);font-size:.7rem;font-weight:950;letter-spacing:.04em;padding:.2rem .52rem;text-transform:uppercase}
    .top-ad-card strong{color:var(--text);font-family:Rajdhani,Inter,sans-serif;font-size:clamp(1.15rem,2vw,1.45rem);line-height:1}
    .top-ad-card small{color:var(--muted);font-weight:800;line-height:1.35}
    .top-ad-card.right{grid-column:3}
    .top-ad-card.left{grid-column:1}
    @media(max-width:1040px){.support-section .partner-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:1040px){.top-ad-slots{grid-template-columns:repeat(2,minmax(0,1fr));width:min(100% - 1rem,46rem)}.top-ad-card.left,.top-ad-card.right{grid-column:auto}}
    @media(max-width:720px){.support-section .partner-grid,.top-ad-slots{grid-template-columns:1fr}.top-ad-slots{margin-top:.5rem}.top-ad-card{min-height:auto}}
  `;

  const topAds = `
    <section id="topAdSlots" class="top-ad-slots" aria-label="Obere Anzeigenplaetze">
      <a class="top-ad-card left" href="https://www.amazon.de/s?k=gaming+headset+warzone" target="_blank" rel="sponsored noreferrer" data-top-ad-slot="left">
        <span>Anzeige links</span>
        <strong>Audio-Setup fuer Ranked</strong>
        <small>Platzhalter fuer Partnerlink oder Sponsorbanner.</small>
      </a>
      <a class="top-ad-card right" href="werbung.html" rel="nofollow" data-top-ad-slot="right">
        <span>Anzeige rechts</span>
        <strong>Sponsorplatz frei</strong>
        <small>Direkter Werbeplatz fuer Gear, Coaching oder Creator-Angebote.</small>
      </a>
    </section>
  `;

  const cards = `
    <a class="partner-card" href="https://www.amazon.de/s?k=gaming+headset+warzone" target="_blank" rel="sponsored noreferrer" data-affiliate-slot="audio">
      <span>Partnerlink</span>
      <h3>Audio & Footsteps</h3>
      <p>Headsets und Audio-Setups fuer Spieler, die Schritte, Repositioning und Team-Calls sauberer hoeren wollen.</p>
      <small>Platzhalter-Link: spaeter durch deinen echten Affiliate-Link ersetzen.</small>
      <strong>Gear ansehen</strong>
    </a>
    <a class="partner-card" href="https://www.amazon.de/s?k=gaming+controller+paddles" target="_blank" rel="sponsored noreferrer" data-affiliate-slot="controller">
      <span>Partnerlink</span>
      <h3>Controller & Paddles</h3>
      <p>Controller, Back-Paddles und Grip-Zubehoer fuer Aim, Movement und laengere Ranked-Sessions.</p>
      <small>Passt gut fuer Amazon PartnerNet oder direkte Gear-Deals.</small>
      <strong>Setup ansehen</strong>
    </a>
    <a class="partner-card" href="https://www.amazon.de/s?k=240hz+gaming+monitor" target="_blank" rel="sponsored noreferrer" data-affiliate-slot="monitor">
      <span>Partnerlink</span>
      <h3>Monitor & FPS</h3>
      <p>High-refresh Monitore und Display-Setups fuer Spieler, die Visibility und Reaktionszeit verbessern wollen.</p>
      <small>Hoher Warenkorbwert, daher spaeter besonders interessant fuer Affiliate-Provision.</small>
      <strong>Monitore ansehen</strong>
    </a>
    <a class="partner-card" href="https://www.amazon.de/s?k=gaming+mauspad+fps" target="_blank" rel="sponsored noreferrer" data-affiliate-slot="mousepad">
      <span>Partnerlink</span>
      <h3>Mauspad & Aim</h3>
      <p>Control- und Speed-Pads fuer konstante Flicks, Tracking und saubere Low-Sens-Bewegungen.</p>
      <small>Guenstiger Einstieg fuer erste Partnerlinks ohne aggressive Werbung.</small>
      <strong>Aim-Gear ansehen</strong>
    </a>
    <a class="partner-card" href="https://www.amazon.de/s?k=lan+kabel+gaming+router" target="_blank" rel="sponsored noreferrer" data-affiliate-slot="network">
      <span>Partnerlink</span>
      <h3>Netzwerk & Latenz</h3>
      <p>LAN-Kabel, Router und Setup-Helfer fuer stabilere Verbindung, weniger Jitter und sauberere Sessions.</p>
      <small>Sinnvoll fuer Guides rund um Ping, Packet Burst und Lag-Probleme.</small>
      <strong>Netzwerk ansehen</strong>
    </a>
    <a class="partner-card sponsor-card" href="werbung.html" rel="nofollow" data-sponsor-slot="open">
      <span>Sponsor-Slot</span>
      <h3>Partnerplatz frei</h3>
      <p>Freier Platz fuer direkte Sponsoren wie Gear-Brands, Coaching, Discord-Tools oder Creator-Angebote.</p>
      <small>Keine persoenlichen Daten noetig. Kontaktdaten koennen spaeter im Impressum ergaenzt werden.</small>
      <strong>Infos ansehen</strong>
    </a>
  `;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }
    style.textContent = css;
  }

  function addTopAdSlots() {
    if (document.getElementById(TOP_AD_ID)) return true;

    const target =
      document.querySelector(".commercial-disclosure") ||
      document.querySelector(".today-strip") ||
      document.querySelector(".hero") ||
      document.querySelector("main") ||
      document.body.firstElementChild;

    if (!target) return false;

    if (target.matches && target.matches(".commercial-disclosure,.today-strip,.hero")) {
      target.insertAdjacentHTML("beforebegin", topAds);
    } else {
      target.insertAdjacentHTML("afterbegin", topAds);
    }

    return true;
  }

  function enhancePartnerSection() {
    const section = document.querySelector(SECTION_SELECTOR);
    if (!section) return false;

    const heading = section.querySelector(".section-heading h2");
    const intro = section.querySelector(".section-heading p:last-child");
    const grid = section.querySelector(".partner-grid");
    if (!grid) return false;

    if (heading) heading.textContent = "Ranked Setup & Partner-Picks";
    if (intro) {
      intro.textContent = "Unaufdringliche Partnerflaechen fuer Gear-Kategorien, die zu Warzone, Ranked und Loadout-Guides passen. Aktuell sind es Platzhalterlinks, die spaeter durch echte Affiliate- oder Sponsor-Links ersetzt werden.";
    }
    grid.innerHTML = cards;

    if (!document.getElementById(NOTE_ID)) {
      grid.insertAdjacentHTML(
        "afterend",
        '<p id="partnerPlaceholderNote" class="partner-note"><strong>Hinweis:</strong> Die Links sind vorbereitet, aber noch keine echten Affiliate-IDs. Sobald PartnerNet, Sponsoren oder AdSense bereit sind, werden nur die Ziel-URLs ersetzt.</p>'
      );
    }

    return true;
  }

  function runWithRetry() {
    installStyle();
    let attempts = 0;
    const tick = () => {
      const hasTopAds = addTopAdSlots();
      const hasPartnerSection = enhancePartnerSection();
      if ((hasTopAds && hasPartnerSection) || attempts >= 30) return;
      attempts += 1;
      window.setTimeout(tick, 150);
    };
    tick();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", runWithRetry, { once: true });
  else runWithRetry();
  window.addEventListener("load", runWithRetry, { once: true });
  window.setTimeout(runWithRetry, 1200);
}());
