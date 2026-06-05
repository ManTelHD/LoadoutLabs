(function () {
  const STYLE_ID = "loadout-lab-meta-button-shape";

  const css = `
    html body .tier-first .loadout-subnav-row{align-items:stretch!important;gap:.55rem!important;margin:.15rem 0 .75rem!important}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch,html body .tier-first .loadout-subnav-row .content-tabs{display:grid!important;align-items:stretch!important;gap:.45rem!important;border:1px solid rgba(245,242,233,.13)!important;border-radius:.55rem!important;background:rgba(245,242,233,.045)!important;padding:.25rem!important;box-shadow:none!important}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    html body .tier-first .loadout-subnav-row .content-tabs{grid-template-columns:repeat(2,minmax(5rem,1fr))!important;min-width:14rem}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch .mode-button,html body .tier-first .loadout-subnav-row .content-tab{min-height:2.85rem!important;border:1px solid rgba(245,242,233,.12)!important;border-radius:.38rem!important;background:linear-gradient(180deg,rgba(18,24,30,.92),rgba(12,16,20,.98))!important;color:var(--text)!important;font-weight:950!important;box-shadow:none!important}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch .mode-button.active,html body .tier-first .loadout-subnav-row .content-tab.active{border-color:transparent!important;background:linear-gradient(135deg,var(--amber),var(--cyan))!important;color:#10130e!important}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch .mode-button:hover,html body .tier-first .loadout-subnav-row .secondary-mode-switch .mode-button:focus-visible,html body .tier-first .loadout-subnav-row .content-tab:hover,html body .tier-first .loadout-subnav-row .content-tab:focus-visible{border-color:rgba(240,173,55,.42)!important;color:var(--text)!important}
    @media(max-width:720px){html body .tier-first .loadout-subnav-row,html body .tier-first .loadout-subnav-row .secondary-mode-switch,html body .tier-first .loadout-subnav-row .content-tabs{grid-template-columns:1fr!important}html body .tier-first .loadout-subnav-row .content-tabs{min-width:0}}
  `;

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
    }
    document.head.append(style);
    style.textContent = css;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installStyle, { once: true });
  } else {
    installStyle();
  }
  window.setTimeout(installStyle, 250);
  window.setTimeout(installStyle, 1000);
  window.setTimeout(installStyle, 2000);
  window.setTimeout(installStyle, 4000);
}());
