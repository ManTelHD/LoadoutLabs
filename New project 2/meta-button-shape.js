(function () {
  const STYLE_ID = "loadout-lab-meta-button-shape";

  const css = `
    html body .tier-first .loadout-subnav-row{align-items:stretch!important;gap:.65rem!important;margin:.18rem 0 .85rem!important}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch,html body .tier-first .loadout-subnav-row .content-tabs{display:grid!important;align-items:stretch!important;gap:.5rem!important;border:1px solid rgba(245,242,233,.14)!important;border-radius:.6rem!important;background:linear-gradient(180deg,rgba(16,21,27,.88),rgba(7,9,11,.96))!important;padding:.28rem!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)!important}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch{grid-template-columns:repeat(2,minmax(0,1fr))!important}
    html body .tier-first .loadout-subnav-row .content-tabs{grid-template-columns:repeat(2,minmax(5rem,1fr))!important;min-width:14rem}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch .mode-button,html body .tier-first .loadout-subnav-row .content-tab{min-height:2.95rem!important;border:1px solid rgba(245,242,233,.13)!important;border-radius:.42rem!important;background:linear-gradient(180deg,rgba(20,27,34,.94),rgba(11,15,19,.98))!important;color:var(--text)!important;font-weight:950!important;box-shadow:none!important}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch .mode-button.active,html body .tier-first .loadout-subnav-row .content-tab.active{border-color:transparent!important;background:linear-gradient(135deg,var(--amber),#39ed6b 55%,var(--cyan))!important;color:#081008!important;box-shadow:0 0 0 1px rgba(175,255,62,.24),0 12px 28px rgba(85,255,72,.16)!important}
    html body .tier-first .loadout-subnav-row .secondary-mode-switch .mode-button:hover,html body .tier-first .loadout-subnav-row .secondary-mode-switch .mode-button:focus-visible,html body .tier-first .loadout-subnav-row .content-tab:hover,html body .tier-first .loadout-subnav-row .content-tab:focus-visible{border-color:rgba(240,173,55,.42)!important;color:var(--text)!important}
    html body .meta-side-ad{isolation:isolate;display:grid!important;grid-template-rows:auto auto 1fr auto;gap:.85rem!important;border-radius:.78rem!important;box-shadow:0 20px 54px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.045)!important;padding:.85rem!important}
    html body .meta-side-ad.left{background:radial-gradient(circle at 40% 0,rgba(240,173,55,.24),transparent 10rem),linear-gradient(180deg,rgba(29,23,9,.97),rgba(8,10,10,.985))!important}
    html body .meta-side-ad.right{background:radial-gradient(circle at 60% 0,rgba(95,199,200,.24),transparent 10rem),linear-gradient(180deg,rgba(8,29,30,.97),rgba(8,10,10,.985))!important}
    html body .meta-side-ad span{border-radius:999px!important;font-size:.66rem!important;letter-spacing:.06em!important}
    html body .meta-side-ad strong{display:grid!important;gap:.8rem!important;font-size:clamp(1.35rem,2vw,1.9rem)!important;line-height:.92!important}
    html body .meta-side-ad strong:before{content:"AUD";display:grid;place-items:center;min-height:7rem;border:1px solid rgba(245,242,233,.11);border-radius:.58rem;background:linear-gradient(135deg,rgba(245,242,233,.1),transparent 48%),rgba(0,0,0,.25);color:var(--text);font-family:Rajdhani,Inter,sans-serif;font-size:clamp(2rem,3vw,2.7rem);letter-spacing:.04em}
    html body .meta-side-ad.right strong:before{content:"AD";color:var(--cyan)}
    html body .meta-side-ad small{font-size:.88rem!important;line-height:1.42!important}
    html body .meta-side-ad em{display:flex!important;min-height:2.55rem;align-items:center;justify-content:center;border-radius:.45rem;background:linear-gradient(135deg,var(--amber),var(--cyan));color:#10130e!important;font-size:.8rem!important;font-style:normal!important;font-weight:950!important;letter-spacing:.04em!important;text-transform:uppercase!important}
    html body .meta-side-ad.left em:before{content:"Gear ansehen"}
    html body .meta-side-ad.right em:before{content:"Infos ansehen"}
    html body .meta-side-ad em{font-size:0!important}
    @media(max-width:720px){html body .tier-first .loadout-subnav-row,html body .tier-first .loadout-subnav-row .secondary-mode-switch,html body .tier-first .loadout-subnav-row .content-tabs{grid-template-columns:1fr!important}html body .tier-first .loadout-subnav-row .content-tabs{min-width:0}}
    @media(max-width:1180px){html body .meta-side-ad strong:before{min-height:5.5rem}html body .meta-side-ad small{font-size:.8rem!important}}
    @media(max-width:920px){html body .meta-side-ad{grid-template-rows:auto auto auto!important;min-height:auto!important}html body .meta-side-ad strong:before{display:none!important}}
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
