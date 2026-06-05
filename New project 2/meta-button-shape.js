(function () {
  const STYLE_ID = "loadout-lab-meta-button-shape";

  const css = `
    .tier-first .loadout-subnav-row{align-items:stretch!important;gap:.55rem!important;margin:.15rem 0 .75rem!important}
    .tier-first .secondary-mode-switch,.tier-first .content-tabs{display:grid!important;align-items:stretch!important;gap:.45rem!important;border:1px solid rgba(245,242,233,.13)!important;border-radius:.55rem!important;background:rgba(245,242,233,.045)!important;padding:.25rem!important;box-shadow:none!important}
    .tier-first .secondary-mode-switch{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    .tier-first .content-tabs{grid-template-columns:repeat(2,minmax(5rem,1fr))!important;min-width:14rem}
    .tier-first .secondary-mode-switch .mode-button,.tier-first .content-tab{min-height:2.85rem!important;border:1px solid rgba(245,242,233,.12)!important;border-radius:.38rem!important;background:linear-gradient(180deg,rgba(18,24,30,.92),rgba(12,16,20,.98))!important;color:var(--text)!important;font-weight:950!important;box-shadow:none!important}
    .tier-first .secondary-mode-switch .mode-button.active,.tier-first .content-tab.active{border-color:transparent!important;background:linear-gradient(135deg,var(--amber),var(--cyan))!important;color:#10130e!important}
    .tier-first .secondary-mode-switch .mode-button:hover,.tier-first .secondary-mode-switch .mode-button:focus-visible,.tier-first .content-tab:hover,.tier-first .content-tab:focus-visible{border-color:rgba(240,173,55,.42)!important;color:var(--text)!important}
    @media(max-width:720px){.tier-first .loadout-subnav-row,.tier-first .secondary-mode-switch,.tier-first .content-tabs{grid-template-columns:1fr!important}.tier-first .content-tabs{min-width:0}}
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installStyle, { once: true });
  } else {
    installStyle();
  }
  window.setTimeout(installStyle, 250);
  window.setTimeout(installStyle, 1000);
}());
