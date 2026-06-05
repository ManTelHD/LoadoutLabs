(function () {
  const STYLE_ID = "loadout-lab-monetization-style";
  const CONSENT_KEY = "loadoutLabConsent";

  const css = `
    .commercial-disclosure,.support-section .ad-slot,.partner-card{border:1px solid var(--line);border-radius:.6rem;background:linear-gradient(180deg,rgba(24,32,29,.96),rgba(10,13,12,.98))}
    .commercial-disclosure{display:flex;flex-wrap:wrap;gap:.35rem .55rem;align-items:center;margin:0 0 .75rem;padding:.85rem 1rem;color:var(--muted);line-height:1.5}
    .commercial-disclosure a,.partner-card strong,.footer-links a,.footer-links button{color:var(--amber);font-weight:900}
    .support-section{border-block:1px solid var(--line);background:radial-gradient(circle at 12% 28%,rgba(240,173,55,.12),transparent 24rem),radial-gradient(circle at 88% 30%,rgba(95,199,200,.1),transparent 22rem),rgba(10,13,12,.74)}
    .partner-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
    .partner-card{position:relative;overflow:hidden;display:grid;gap:.55rem;min-height:14rem;padding:1rem;box-shadow:0 18px 48px rgba(0,0,0,.24);transition:border-color .18s ease,transform .18s ease}
    .partner-card:hover,.partner-card:focus-visible{border-color:rgba(240,173,55,.68);transform:translateY(-.12rem)}
    .partner-card:before,.ad-slot:before{content:"";position:absolute;inset:0;border-top:.24rem solid rgba(240,173,55,.82);pointer-events:none}
    .partner-card span,.ad-slot span{width:fit-content;border:1px solid rgba(240,173,55,.34);border-radius:999px;color:var(--amber);font-size:.76rem;font-weight:950;letter-spacing:.04em;padding:.24rem .62rem;text-transform:uppercase}
    .partner-card h3{margin-bottom:0;font-size:clamp(1.85rem,3vw,2.55rem)}
    .partner-card p,.ad-slot p{color:var(--muted);line-height:1.6}
    .sponsor-card{border-color:rgba(95,199,200,.28);background:linear-gradient(135deg,rgba(95,199,200,.12),transparent 38%),linear-gradient(180deg,rgba(18,31,31,.98),rgba(10,13,12,.98))}
    .sponsor-card:before{border-color:rgba(95,199,200,.82)}
    .sponsor-card span,.sponsor-card strong{color:var(--cyan)}
    .ad-slot{position:relative;overflow:hidden;display:grid;gap:.5rem;place-items:center;min-height:7rem;margin-top:1rem;padding:1rem;text-align:center;box-shadow:0 18px 48px rgba(0,0,0,.24)}
    .ad-slot strong{color:var(--text);font-family:Rajdhani,Inter,sans-serif;font-size:clamp(1.65rem,3vw,2.25rem);line-height:1}
    .footer-links{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.65rem}
    .footer-links button{border:0;background:transparent;cursor:pointer;font:inherit;padding:0}
    .cookie-banner{position:fixed;right:clamp(1rem,3vw,2rem);bottom:clamp(1rem,3vw,2rem);z-index:50;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:1rem;width:min(48rem,calc(100vw - 2rem));border:1px solid rgba(240,173,55,.42);border-radius:.7rem;background:linear-gradient(135deg,rgba(240,173,55,.15),transparent 44%),rgba(8,10,10,.96);box-shadow:var(--shadow);padding:1rem;backdrop-filter:blur(16px)}
    .cookie-banner[hidden]{display:none!important}
    .cookie-banner strong{display:block;margin-bottom:.35rem;color:var(--text);font-family:Rajdhani,Inter,sans-serif;font-size:1.35rem}
    .cookie-banner p{margin-bottom:0;color:var(--muted);line-height:1.55}
    .cookie-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:.55rem}
    .cookie-button{min-height:2.75rem;border:1px solid var(--line);border-radius:.4rem;cursor:pointer;font-weight:900;padding:.65rem .9rem}
    .cookie-button.primary{border-color:transparent;background:linear-gradient(135deg,var(--amber),var(--cyan));color:#10130e}
    .cookie-button.secondary{background:rgba(245,242,233,.08);color:var(--text)}
    @media(max-width:1040px){.partner-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:720px){.partner-grid,.cookie-banner{grid-template-columns:1fr}.cookie-banner{right:1rem;bottom:1rem}.cookie-actions{justify-content:stretch}.cookie-button{flex:1 1 100%}}
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

  function addTopNavLink() {
    const nav = document.querySelector(".top-nav");
    if (!nav || nav.querySelector('a[href="#monetarisierung"]')) return;
    nav.insertAdjacentHTML("beforeend", '<a href="#monetarisierung">Werbung</a>');
  }

  function addDisclosure() {
    const todayStrip = document.querySelector(".today-strip");
    if (!todayStrip || document.querySelector(".commercial-disclosure")) return;
    todayStrip.insertAdjacentHTML("afterend", `
      <aside class="commercial-disclosure" aria-label="Werbehinweis">
        <strong>Transparenz:</strong>
        Loadout Lab kann ueber Partnerlinks, Sponsor-Slots und Anzeigen Einnahmen erzielen.
        Empfehlungen bleiben redaktionell und sind nicht offiziell mit Activision oder Call of Duty verbunden.
        <a href="werbung.html">Werbehinweise lesen</a>
      </aside>
    `);
  }

  function addSupportSection() {
    if (document.querySelector("#monetarisierung")) return;
    const anchor = document.querySelector("#intel");
    if (!anchor) return;
    anchor.insertAdjacentHTML("beforebegin", `
      <section id="monetarisierung" class="section support-section" aria-label="Support und Werbung">
        <div class="section-heading compact">
          <p class="eyebrow">Support Loadout Lab</p>
          <h2>Partner-Picks fuer Ranked-Spieler</h2>
          <p>Dezente Werbe- und Affiliate-Flaechen fuer Gear, die zum Warzone- und Ranked-Kontext passt. Bezahlte Platzierungen und Partnerlinks werden klar gekennzeichnet.</p>
        </div>
        <div class="partner-grid">
          <a class="partner-card" href="https://www.amazon.de/s?k=gaming+headset" target="_blank" rel="sponsored noreferrer" data-affiliate-slot="headset"><span>Partnerlink</span><h3>Headset fuer Footstep-Audio</h3><p>Platz fuer ein getestetes Headset oder einen Sponsor-Deal mit klarer Kennzeichnung.</p><strong>Gear ansehen</strong></a>
          <a class="partner-card" href="https://www.amazon.de/s?k=gaming+controller" target="_blank" rel="sponsored noreferrer" data-affiliate-slot="controller"><span>Partnerlink</span><h3>Controller & Paddles</h3><p>Ideal fuer Ranked-Spieler, die Movement, Aim und Komfort upgraden wollen.</p><strong>Setup ansehen</strong></a>
          <a class="partner-card sponsor-card" href="werbung.html" rel="nofollow" data-sponsor-slot="open"><span>Sponsor-Slot</span><h3>Werbeplatz frei</h3><p>Direkter Sponsorplatz fuer Gear-Brands, Coaching, Server oder Creator-Angebote.</p><strong>Infos ansehen</strong></a>
        </div>
        <div class="ad-slot" data-ad-slot="homepage-mid" aria-label="Anzeigenplatz"><span>Anzeige</span><strong>Gekennzeichneter Werbeplatz</strong><p>Dieser Bereich ist fuer direkte Sponsoren oder Display-Anzeigen vorgesehen. Marketing-Cookies werden erst nach Zustimmung geladen.</p></div>
      </section>
    `);
  }

  function addFooterLinks() {
    const footer = document.querySelector(".site-footer");
    if (!footer || footer.querySelector(".footer-links")) return;
    const topLink = footer.querySelector('a[href="#top"]');
    const nav = document.createElement("nav");
    nav.className = "footer-links";
    nav.setAttribute("aria-label", "Rechtliche Links");
    nav.innerHTML = '<a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a><a href="werbung.html">Werbung</a><button id="cookieSettings" type="button">Cookie-Einstellungen</button>';
    if (topLink) footer.insertBefore(nav, topLink);
    else footer.append(nav);
  }

  function addCookieBanner() {
    if (document.querySelector("#cookieBanner")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Cookie Hinweis" hidden>
        <div><strong>Cookie- und Werbe-Einstellungen</strong><p>Notwendige Speicherung nutzt Loadout Lab fuer diese Auswahl. Marketing- oder Anzeigen-Cookies werden erst aktiviert, wenn du zustimmst.</p></div>
        <div class="cookie-actions"><button id="cookieRejectMarketing" class="cookie-button secondary" type="button">Nur notwendig</button><button id="cookieAcceptMarketing" class="cookie-button primary" type="button">Marketing erlauben</button></div>
      </div>
    `);
  }

  function readConsent() {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  function applyConsent(consent) {
    const allowed = Boolean(consent && consent.marketing);
    document.documentElement.dataset.marketingConsent = allowed ? "granted" : "denied";
    document.querySelectorAll("[data-ad-slot]").forEach((slot) => {
      slot.dataset.consent = allowed ? "granted" : "pending";
    });
  }

  function writeConsent(marketing) {
    const consent = { necessary: true, marketing: Boolean(marketing), updatedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch {
      window.__loadoutLabConsentFallback = consent;
    }
    applyConsent(consent);
    document.querySelector("#cookieBanner")?.setAttribute("hidden", "");
  }

  function bindConsent() {
    if (window.__loadoutLabMonetizationConsentBound) return;
    window.__loadoutLabMonetizationConsentBound = true;
    document.addEventListener("click", (event) => {
      if (event.target.closest("#cookieAcceptMarketing")) writeConsent(true);
      if (event.target.closest("#cookieRejectMarketing")) writeConsent(false);
      if (event.target.closest("#cookieSettings")) {
        const banner = document.querySelector("#cookieBanner");
        if (banner) banner.hidden = false;
      }
    });
  }

  function initConsent() {
    const consent = readConsent() || window.__loadoutLabConsentFallback;
    if (consent) {
      applyConsent(consent);
      return;
    }
    applyConsent({ necessary: true, marketing: false });
    const banner = document.querySelector("#cookieBanner");
    if (banner) banner.hidden = false;
  }

  function init() {
    installStyle();
    addTopNavLink();
    addDisclosure();
    addSupportSection();
    addFooterLinks();
    addCookieBanner();
    bindConsent();
    initConsent();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
  window.setTimeout(init, 250);
  window.setTimeout(init, 1000);
}());
