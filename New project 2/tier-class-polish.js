(function () {
  if (document.querySelector("#tier-class-polish-style")) return;

  let activeClass = "all";
  let scheduled = false;

  const classFilters = [
    ["all", "Alle Klassen"],
    ["ar", "AR"],
    ["smg", "SMG"],
    ["lmg", "LMG"],
    ["sniper", "Sniper"],
    ["marksman", "Marksman"],
    ["pistol", "Pistolen"],
    ["melee-launcher", "Nahkampf & Launcher"],
  ];

  const tierCopy = {
    "absolute meta": ["Beste Picks", "Stärkste Builds für Ranked, kaum echte Schwächen und sofort spielbar."],
    meta: ["Sehr stark", "Top-Waffen mit klarer Rolle. Meist nur minimal hinter Absolute Meta."],
    contender: ["Situativ stark", "Gute Alternativen für bestimmte Spielstile, Maps oder persönliche Vorlieben."],
    "a-tier waffen": ["Sehr stark", "Starke Meta-Alternativen mit kleinen Tradeoffs bei Handling, Range oder Konstanz."],
    "b-tier waffen": ["Solide", "Spielbar, aber meist nicht so effizient wie die oberen Tiers."],
    "c-tier waffen": ["Nische", "Nur mit gutem Aim, passender Map oder sehr speziellem Setup empfehlenswert."],
    "d-tier waffen": ["Fun Picks", "Eher Challenge-, Neben- oder Spaß-Picks statt verlässliche Ranked-Wahl."],
  };

  function normalize(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  }

  function classKey(label) {
    const value = normalize(label);
    if (value.includes("assault rifle") || value === "ar") return "ar";
    if (value.includes("submachine") || value === "smg") return "smg";
    if (value.includes("light machine") || value === "lmg") return "lmg";
    if (value.includes("sniper")) return "sniper";
    if (value.includes("marksman")) return "marksman";
    if (value.includes("pistol") || value.includes("handgun")) return "pistol";
    if (value.includes("melee") || value.includes("knife") || value.includes("launcher")) return "melee-launcher";
    return "other";
  }

  function ensureToolbar() {
    const roleToolbar = document.querySelector("#filterToolbar");
    if (!roleToolbar) return;

    let toolbar = document.querySelector("#weaponClassToolbar");
    if (!toolbar) {
      toolbar = document.createElement("div");
      toolbar.id = "weaponClassToolbar";
      toolbar.className = "weapon-class-toolbar";
      toolbar.setAttribute("aria-label", "Waffenklasse filtern");
      roleToolbar.insertAdjacentElement("afterend", toolbar);
    }

    toolbar.innerHTML = classFilters.map(([value, label]) => `
      <button class="class-filter-button${value === activeClass ? " active" : ""}" data-class-filter="${value}" type="button">${label}</button>
    `).join("");
  }

  function polishTierHeaders() {
    document.querySelectorAll("#loadoutGrid .tier-group").forEach((group) => {
      const heading = group.querySelector(".tier-header h3");
      const header = group.querySelector(".tier-header > div");
      if (!heading || !header) return;

      const key = normalize(heading.textContent);
      const copy = tierCopy[key] || tierCopy[Object.keys(tierCopy).find((item) => key.includes(item))];
      if (!copy) return;

      let note = header.querySelector(".tier-explain");
      if (!note) {
        note = document.createElement("p");
        note.className = "tier-explain";
        header.appendChild(note);
      }
      note.innerHTML = `<strong>${copy[0]}</strong><span>${copy[1]}</span>`;
    });
  }

  function applyClassFilter() {
    const cards = [...document.querySelectorAll("#loadoutGrid .loadout-card")];
    cards.forEach((card) => {
      const label = card.querySelector(".mode-pill")?.textContent || "";
      const visible = activeClass === "all" || classKey(label) === activeClass;
      card.classList.toggle("class-filter-hidden", !visible);
    });

    document.querySelectorAll("#loadoutGrid .tier-group").forEach((group) => {
      const visibleCards = [...group.querySelectorAll(".loadout-card")].filter((card) => !card.classList.contains("class-filter-hidden"));
      group.classList.toggle("class-filter-empty", visibleCards.length === 0);
      const count = group.querySelector(".tier-kicker");
      if (count) count.textContent = `${visibleCards.length} Builds`;
    });

    const resultCount = document.querySelector("#resultCount");
    if (resultCount) {
      const visibleCount = cards.filter((card) => !card.classList.contains("class-filter-hidden")).length;
      const totalText = resultCount.textContent.match(/von\s+\d+\s+Builds/i)?.[0] || `von ${cards.length} Builds`;
      resultCount.textContent = `${visibleCount} ${totalText} angezeigt`;
    }
  }

  function syncButtons() {
    document.querySelectorAll("#weaponClassToolbar [data-class-filter]").forEach((button) => {
      button.classList.toggle("active", button.dataset.classFilter === activeClass);
    });
  }

  function run() {
    scheduled = false;
    ensureToolbar();
    polishTierHeaders();
    applyClassFilter();
    syncButtons();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(run);
  }

  const style = document.createElement("style");
  style.id = "tier-class-polish-style";
  style.textContent = `
    body #weaponClassToolbar.weapon-class-toolbar {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.42rem !important;
      margin: -0.2rem 0 0.72rem !important;
      max-width: min(82rem, 100%) !important;
    }

    body .class-filter-button {
      min-height: 2.18rem !important;
      border: 1px solid rgba(255, 255, 255, 0.12) !important;
      border-radius: 999px !important;
      padding: 0 0.86rem !important;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 72%),
        rgba(11, 16, 22, 0.9) !important;
      color: #f7f9fc !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: 0.92rem !important;
      font-weight: 900 !important;
      cursor: pointer !important;
      transition: border-color 140ms ease, background-color 140ms ease, color 140ms ease !important;
    }

    body .class-filter-button:hover,
    body .class-filter-button.active {
      border-color: rgba(185, 255, 61, 0.68) !important;
      background: linear-gradient(135deg, #b9ff3d, #29e681) !important;
      color: #061008 !important;
    }

    body #loadoutGrid .loadout-card.class-filter-hidden,
    body #loadoutGrid .tier-group.class-filter-empty {
      display: none !important;
    }

    body #loadoutGrid .tier-explain {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 0.35rem 0.55rem !important;
      align-items: center !important;
      max-width: 52rem !important;
      margin: 0.32rem 0 0 !important;
      color: rgba(255, 255, 255, 0.66) !important;
      font-size: 0.92rem !important;
      line-height: 1.35 !important;
    }

    body #loadoutGrid .tier-explain strong {
      color: rgb(var(--tier-card-rgb, 185, 255, 61)) !important;
      font-family: Rajdhani, Inter, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 900 !important;
      text-transform: uppercase !important;
    }

    body #loadoutGrid .tier-explain span {
      color: rgba(255, 255, 255, 0.72) !important;
    }

    @media (max-width: 720px) {
      body #weaponClassToolbar.weapon-class-toolbar {
        gap: 0.36rem !important;
      }

      body .class-filter-button {
        flex: 1 1 auto !important;
      }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("#weaponClassToolbar [data-class-filter]");
    if (!button) return;
    activeClass = button.dataset.classFilter || "all";
    run();
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();

  const grid = document.querySelector("#loadoutGrid");
  if (grid) new MutationObserver(schedule).observe(grid, { childList: true });
  window.setTimeout(run, 200);
  window.setTimeout(run, 1000);
}());
