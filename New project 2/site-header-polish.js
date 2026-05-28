(function () {
  function installStyle() {
    if (document.querySelector("#site-header-polish-style")) return;
    const style = document.createElement("style");
    style.id = "site-header-polish-style";
    style.textContent = `
      body .site-header {
        min-height: 4.1rem !important;
        padding: 0.62rem max(clamp(1rem, 3vw, 2.25rem), calc((100vw - 82rem) / 2)) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        background:
          radial-gradient(circle at 12% 0%, rgba(185, 255, 61, 0.12), transparent 16rem),
          linear-gradient(180deg, rgba(9, 13, 17, 0.96), rgba(5, 8, 11, 0.92)) !important;
        box-shadow: 0 0.85rem 2rem rgba(0, 0, 0, 0.24), inset 0 -1px 0 rgba(185, 255, 61, 0.05) !important;
        backdrop-filter: blur(18px) saturate(1.12) !important;
      }

      body .brand {
        gap: 0.68rem !important;
        min-width: max-content !important;
        color: rgba(246, 250, 244, 0.94) !important;
        font-size: 1.05rem !important;
        letter-spacing: 0 !important;
      }

      body .brand-mark {
        width: 2.25rem !important;
        height: 2.25rem !important;
        border: 1px solid rgba(185, 255, 61, 0.36) !important;
        border-radius: 0.5rem !important;
        background: linear-gradient(135deg, #b9ff3d, #28e070) !important;
        color: #061008 !important;
        box-shadow: 0 0 0 0.25rem rgba(185, 255, 61, 0.07), 0 0 1.3rem rgba(65, 239, 113, 0.22) !important;
        font-family: Rajdhani, Inter, sans-serif !important;
        font-size: 0.98rem !important;
        font-weight: 950 !important;
      }

      body .top-nav {
        align-items: center !important;
        gap: 0.28rem !important;
        padding: 0.18rem !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 999px !important;
        background: rgba(7, 10, 14, 0.58) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04) !important;
      }

      body .top-nav a {
        min-height: 2rem !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0.42rem 0.78rem !important;
        border-radius: 999px !important;
        color: rgba(218, 226, 236, 0.72) !important;
        font-size: 0.82rem !important;
        font-weight: 800 !important;
        line-height: 1 !important;
        transition: color 160ms ease, background 160ms ease, border-color 160ms ease !important;
      }

      body .top-nav a:hover,
      body .top-nav a:focus-visible {
        border-color: rgba(185, 255, 61, 0.22) !important;
        background: rgba(185, 255, 61, 0.08) !important;
        color: #f6ffe2 !important;
      }

      @media (max-width: 720px) {
        body .site-header {
          min-height: auto !important;
          align-items: stretch !important;
          flex-direction: column !important;
          gap: 0.7rem !important;
          padding-inline: 0.75rem !important;
        }

        body .top-nav {
          width: 100% !important;
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          border-radius: 0.55rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installStyle, { once: true });
  } else {
    installStyle();
  }
})();
