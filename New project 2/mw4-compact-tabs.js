(function () {
  const STYLE_ID = "mw4-compact-tabs-20260601";
  const groups = [
    { id: "overview", label: "Überblick", panels: ["overview"] },
    { id: "gameplay", label: "Gameplay", panels: ["campaign", "multiplayer", "dmz"] },
    { id: "release", label: "Release", panels: ["warzone", "editions"] },
  ];

  function installStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      document.head.append(style);
    }

    style.textContent = `
      body .mw4-watch-panel .mw4-tabs[data-compact-tabs="true"] {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        width: min(28rem, 100%) !important;
        border-radius: 0.62rem !important;
      }

      body .mw4-watch-panel .mw4-tabs[data-compact-tabs="true"] .mw4-tab {
        min-width: 0 !important;
        width: 100% !important;
        white-space: nowrap !important;
      }

      body .mw4-watch-panel .mw4-panel[hidden] {
        display: none !important;
      }

      body .mw4-watch-panel .mw4-panel.active + .mw4-panel.active {
        margin-top: 0.72rem !important;
      }

      @media (max-width: 640px) {
        body .mw4-watch-panel .mw4-tabs[data-compact-tabs="true"] {
          grid-template-columns: 1fr !important;
          width: 100% !important;
        }
      }
    `;
  }

  function getWrapper() {
    return document.querySelector("#mw4LivePanel");
  }

  function setGroup(groupId) {
    const wrapper = getWrapper();
    if (!wrapper) return;

    const group = groups.find((item) => item.id === groupId) || groups[0];
    const panelSet = new Set(group.panels);

    wrapper.querySelectorAll("[data-mw4-compact-tab]").forEach((button) => {
      button.classList.toggle("active", button.dataset.mw4CompactTab === group.id);
    });

    wrapper.querySelectorAll("[data-mw4-panel]").forEach((panel) => {
      const isActive = panelSet.has(panel.dataset.mw4Panel);
      panel.hidden = !isActive;
      panel.classList.toggle("active", isActive);
    });
  }

  function compactTabs() {
    installStyle();

    const wrapper = getWrapper();
    const tabBar = wrapper?.querySelector(".mw4-tabs");
    if (!wrapper || !tabBar) return;

    if (tabBar.dataset.compactTabs !== "true") {
      tabBar.dataset.compactTabs = "true";
      tabBar.setAttribute("aria-label", "MW4 Bereiche");
      tabBar.innerHTML = groups
        .map((group) => `<button class="mw4-tab" data-mw4-compact-tab="${group.id}" type="button">${group.label}</button>`)
        .join("");
      tabBar.addEventListener("click", (event) => {
        const button = event.target.closest("[data-mw4-compact-tab]");
        if (!button) return;
        event.preventDefault();
        event.stopPropagation();
        setGroup(button.dataset.mw4CompactTab);
      });
    }

    const activeButton = tabBar.querySelector("[data-mw4-compact-tab].active");
    setGroup(activeButton?.dataset.mw4CompactTab || groups[0].id);
  }

  function scheduleCompact() {
    requestAnimationFrame(compactTabs);
    window.setTimeout(compactTabs, 80);
  }

  window.addEventListener("loadoutlab:lite-render", scheduleCompact);
  document.addEventListener("click", scheduleCompact, true);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scheduleCompact, { once: true });
  else scheduleCompact();

  window.setTimeout(compactTabs, 350);
  window.setTimeout(compactTabs, 1000);
}());
