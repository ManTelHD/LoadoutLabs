(function () {
  const STYLE_ID = "loadout-lab-partner-gear-style";
  const SECTION_SELECTOR = "#monetarisierung";
  const NOTE_ID = "partnerPlaceholderNote";
  const META_AD_LAYOUT_ID = "metaWeaponAdLayout";
  const LEGACY_TOP_AD_ID = "topAdSlots";

  const css = `
    .support-section .partner-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
    .partner-card small{color:var(--dim);font-weight:800;line-height:1.45}
    .partner-note{margin:.85rem 0 0;color:var(--dim);font-size:.95rem;line-height:1.6}
    .partner-note strong{color:var(--amber)}
    .meta-ad-layout{display:grid;grid-template-columns:minmax(8.5rem,12rem) minmax(0,1fr) minmax(8.5rem,12rem);gap:1rem;align-items:start;width:100%;margin-top:.7rem}
    .meta-ad-layout>.weapon-dashboard{grid-column:2;min-width:0}
    .meta-side-ad{position:sticky;top:5rem;overflow:hidden;display:grid;align-content:space-between;gap:.85rem;min-height:clamp(24rem,58vh,42rem);border:1px solid rgba(240,173,55,.42);border-radius:.65rem;background:linear-gradient(160deg,rgba(240,173,55,.18),transparent 38%),rgba(10,13,12,.96);box-shadow:0 18px 48px rgba(0,0,0,.24);padding:.85rem;text-decoration:none}
    .meta-side-ad:before{content:"";position:absolute;inset:0;border-left:.24rem solid rgba(240,173,55,.84);pointer-events:none}
    .meta-side-ad.right:before{border-left:0;border-right:.24rem solid rgba(95,199,200,.78)}
    .meta-side-ad.left{grid-column:1}
    .meta-side-ad.right{grid-column:3;border-color:rgba(95,199,200,.34);background:linear-gradient(200deg,rgba(95,199,200,.15),transparent 42%),rgba(10,13,12,.96)}
    .meta-side-ad span{width:fit-content;border:1px solid rgba(240,173,55,.34);border-radius:999px;color:var(--amber);font-size:.68rem;font-weight:950;letter-spacing:.05em;padding:.22rem .52rem;text-transform:uppercase}
    .meta-side-ad.right span{border-color:rgba(95,199,200,.34);color:var(--cyan)}
    .meta-side-ad strong{color:var(--text);font-family:Rajdhani,Inter,sans-serif;font-size:clamp(1.25rem,2vw,1.75rem);line-height:.95}
    .meta-side-ad small{color:var(--muted);font-weight:800;line-height:1.4}
    .meta-side-ad em{color:var(--dim);font-size:.78rem;font-style:normal;font-weight:900;letter-spacing:.04em;text-transform:uppercase}
    @media(max-width:1040px){.support-section .partner-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:1180px){.meta-ad-layout{grid-template-columns:minmax(7rem,9rem) minmax(0,1fr) minmax(7rem,9rem);gap:.75rem}.meta-side-ad{min-height:22rem;padding:.7rem}.meta-side-ad strong{font-size:1.2rem}}
    @media(max-width:920px){.meta-ad-layout{grid-template-columns:1fr 1fr}.meta-ad-layout>.weapon-dashboard{grid-column:1/-1;order:2}.meta-side-ad{position:relative;top:auto;min-height:auto}.meta-side-ad.left,.meta-side-ad.right{grid-column:auto;order:1}}
    @media(max-width:720px){.support-section .partner-grid,.meta-ad-layout{grid-template-columns:1fr}.meta-side-ad.left,.meta-side-ad.right{grid-column:1}.meta-ad-layout>.weapon-dashboard{grid-column:1}}
  `;

  const sideAds = `
    <a class="meta-side-ad left" href="https://www.amazon.de/s?k=gaming+headset+warzone" target="_blank" rel="sponsored noreferrer" data-meta-side-ad="left">
      <span>Anzeige links</span>
      <strong>Audio-Setup fuer Ranked</strong>
      <small>Vertikaler Werbeplatz direkt links neben den Meta-Waffen.</small>
      <em>Partnerlink</em>
    </a>
    <a class="meta-side-ad right" href="werbung.html" rel="nofollow" data-meta-side-ad="right">
      <span>Anzeige rechts</span>
      <strong>Sponsorplatz frei</strong>
      <small>Vertikaler Werbeplatz direkt rechts neben den Meta-Waffen.</small>
      <em>Werbeplatz</em>
    </a>
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

  function addMetaSideAds() {
    document.getElementById(LEGACY_TOP_AD_ID)?.remove();

    const dashboard = document.querySelector('.tab-panel[data-panel="weapons"] .weapon-dashboard');
    if (!dashboard) return false;

    const existingLayout = document.getElementById(META_AD_LAYOUT_ID);
    if (existingLayout && existingLayout.contains(dashboard)) return true;

    const layout = document.createElement("div");
    layout.id = META_AD_LAYOUT_ID;
    layout.className = "meta-ad-layout";
    dashboard.insertAdjacentElement("beforebegin", layout);
    layout.insertAdjacentHTML("beforeend", sideAds);
    const rightAd = layout.querySelector('[data-meta-side-ad="right"]');
    layout.insertBefore(dashboard, rightAd);

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
      const hasSideAds = addMetaSideAds();
      const hasPartnerSection = enhancePartnerSection();
      if ((hasSideAds && hasPartnerSection) || attempts >= 30) return;
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
