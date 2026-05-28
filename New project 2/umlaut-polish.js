(function () {
  const replacements = [
    [/Aufsaetze/g, "Aufsätze"],
    [/geprueft/g, "geprüft"],
    [/Geprueft/g, "Geprüft"],
    [/oeffnen/g, "öffnen"],
    [/Oeffnen/g, "Öffnen"],
    [/fuer/g, "für"],
    [/Fuer/g, "Für"],
    [/staerker/g, "stärker"],
    [/Staerker/g, "Stärker"],
    [/staerkerem/g, "stärkerem"],
    [/Rueckstoss/g, "Rückstoß"],
    [/Rueckstoß/g, "Rückstoß"],
    [/zurueck/g, "zurück"],
    [/Zurueck/g, "Zurück"],
    [/waehlen/g, "wählen"],
    [/auswaehlen/g, "auswählen"],
    [/groesser/g, "größer"],
    [/Groesser/g, "Größer"],
    [/Geruechte/g, "Gerüchte"],
    [/geruechte/g, "gerüchte"],
  ];

  const textSelector = [
    ".primary-mode-switch",
    ".secondary-mode-switch",
    ".content-tabs",
    "#filterToolbar",
    "#loadoutGrid",
    ".updates-section",
    ".mode-info-section",
    ".site-footer",
  ].join(",");

  function normalizeText(value) {
    let next = value;
    for (const [pattern, replacement] of replacements) next = next.replace(pattern, replacement);
    return next;
  }

  function normalizeTextNode(node) {
    if (!node.nodeValue || !/(ae|oe|ue|Ae|Oe|Ue|Aufsaetze|Geprueft|Rueck)/.test(node.nodeValue)) return;
    const next = normalizeText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  function normalizeAttributes(element) {
    for (const name of ["aria-label", "alt", "placeholder", "title"]) {
      if (!element.hasAttribute?.(name)) continue;
      const current = element.getAttribute(name);
      const next = normalizeText(current || "");
      if (next !== current) element.setAttribute(name, next);
    }
  }

  function walk(root) {
    if (!root) return;
    const targets = root.matches?.(textSelector) ? [root] : Array.from(root.querySelectorAll?.(textSelector) || []);
    targets.forEach((target) => {
      normalizeAttributes(target);
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
        acceptNode(node) {
          if (node.nodeType === Node.ELEMENT_NODE && /^(SCRIPT|STYLE|CODE|PRE)$/i.test(node.tagName)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeType === Node.TEXT_NODE) normalizeTextNode(node);
        else normalizeAttributes(node);
      }
    });
  }

  function cleanWeaponCards(root = document) {
    root.querySelectorAll?.("#loadoutGrid .perk-list li").forEach((item) => {
      if (/^\s*(Pair|Quelle|Rolle|Pick-Rate|Pick)\s*:/i.test(item.textContent || "")) item.remove();
    });
    root.querySelectorAll?.("#loadoutGrid .loadout-card > .role, #loadoutGrid .loadout-card .card-main > .role, #loadoutGrid .loadout-card .card-body > .role, #loadoutGrid .loadout-card .meta-card-details > .role, #loadoutGrid .loadout-card .card-details > .role").forEach((item) => item.remove());
  }

  function injectStyle() {
    if (document.querySelector("#umlaut-polish-style")) return;
    const style = document.createElement("style");
    style.id = "umlaut-polish-style";
    style.textContent = `
      body .primary-mode-switch .mw4-mode-button::before { content: "Gerüchte" !important; }
      body #loadoutGrid .loadout-card > .role,
      body #loadoutGrid .loadout-card .card-main > .role,
      body #loadoutGrid .loadout-card .card-body > .role,
      body #loadoutGrid .loadout-card .meta-card-details > .role,
      body #loadoutGrid .loadout-card .card-details > .role { display: none !important; }
    `;
    document.head.appendChild(style);
  }

  let scheduled = false;
  function run(root = document.body) {
    scheduled = false;
    injectStyle();
    walk(root);
    cleanWeaponCards(root === document.body ? document : root);
  }

  function schedule(root = document.body) {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(() => run(root));
  }

  function watchGrid() {
    const grid = document.querySelector("#loadoutGrid");
    if (!grid || grid.dataset.umlautPolishWatched === "lite") return;
    grid.dataset.umlautPolishWatched = "lite";
    new MutationObserver(() => schedule(grid)).observe(grid, { childList: true });
  }

  function init() {
    run();
    watchGrid();
    window.setTimeout(() => { run(); watchGrid(); }, 700);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
}());
