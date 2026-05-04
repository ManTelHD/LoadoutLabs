(function () {
  const rolePicks = {
    "warzone-ranked": {
      heading: "Warzone Meta",
      description: "Sofort sehen, was Pflichtpick ist und welche Waffe zu welcher Rolle passt.",
      kicker: "Top Picks nach Rolle",
      title: "Long Range und Close Range getrennt",
      note: "MK.78 und Kogot-7 sind keine direkten Konkurrenten. Eine ist dein Long-Range-Pick, die andere dein Close-Range-Pairing.",
      cards: [
        ["Long Range", "MK.78", "Pflichtpick", "Alternative: DS20 Mirage"],
        ["Close Range", "Kogot-7", "Pflichtpick", "Alternative: VST"],
        ["Sniper", "Strider 300", "Situativ", "Pairing: Carbon 57"],
        ["A-Tier", "MXR-17", "Spielbar", "Nicht absolute Meta"],
      ],
    },
    "bo7-ranked": {
      heading: "Black Ops 7 Meta",
      description: "Ranked-Picks nach Aufgabe: AR, SMG und Flex werden getrennt bewertet.",
      kicker: "Top Picks nach Rolle",
      title: "AR und SMG getrennt",
      note: "Ranked-Picks werden nach Aufgabe bewertet: Anchor-AR, Entry-SMG und Flex-Waffen haben unterschiedliche Rollen.",
      cards: [
        ["Main AR", "M15 MOD 0", "Pflichtpick", "Anchor und Kontrolle"],
        ["Main SMG", "Dravec 45", "Pflichtpick", "Entry und Tempo"],
        ["Flex", "Peacekeeper MK1", "Sehr stark", "Hybrid-Rolle"],
        ["AR Alternative", "MXR-17", "Sehr stark", "Stabiler Anchor"],
      ],
    },
  };

  function getMode() {
    const activeMode = document.querySelector(".secondary-mode-switch .mode-button.active");
    return activeMode?.dataset.mode || "warzone-ranked";
  }

  function applyHeading(data) {
    const title = document.querySelector("#tierTitle");
    const description = document.querySelector("#tierDescription");
    if (title) title.textContent = data.heading;
    if (description) description.textContent = data.description;
  }

  function renderRolePicks() {
    const panel = document.querySelector("#weaponComparePanel");
    if (!panel || panel.dataset.rolePicks === "true") return;

    const data = rolePicks[getMode()] || rolePicks["warzone-ranked"];
    applyHeading(data);
    panel.dataset.rolePicks = "true";
    panel.innerHTML = `
      <div class="weapon-compare-copy">
        <span>${data.kicker}</span>
        <strong>${data.title}</strong>
        <p>${data.note}</p>
      </div>
      <div class="weapon-compare-stats role-pick-stats">
        ${data.cards.map(([role, weapon, status, detail]) => `
          <article>
            <span>${role}</span>
            <strong>${weapon}</strong>
            <p>${status} · ${detail}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  function scheduleRender() {
    requestAnimationFrame(renderRolePicks);
  }

  document.addEventListener("DOMContentLoaded", () => {
    scheduleRender();
    document.querySelectorAll(".mode-button, .filter-button, .content-tab").forEach((button) => {
      button.addEventListener("click", () => {
        const panel = document.querySelector("#weaponComparePanel");
        if (panel) panel.dataset.rolePicks = "";
        scheduleRender();
      });
    });

    const panel = document.querySelector("#weaponComparePanel");
    if (!panel) return;
    new MutationObserver(() => {
      if (panel.dataset.rolePicks !== "true") scheduleRender();
    }).observe(panel, { childList: true });
  });
}());
