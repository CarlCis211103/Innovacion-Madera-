// modules/pageTransition.js — cortina de transición entre páginas.
// Al cargar, revela la página retirando la cortina hacia arriba.
// Al hacer clic en un enlace interno (a otra página, no un ancla de la
// misma página), cubre la pantalla antes de navegar.
// Se desactiva por completo con prefers-reduced-motion.

const COVER_DURATION = 460;

export function initPageTransitions() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  revealOnLoad();
  wireOutgoingLinks();
}

function createOverlay(state) {
  const overlay = document.createElement("div");
  overlay.className = `page-transition ${state}`;
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = '<div class="page-transition__panel"></div>';
  document.body.appendChild(overlay);
  return overlay;
}

function revealOnLoad() {
  const overlay = createOverlay("is-revealing");
  overlay.addEventListener(
    "animationend",
    () => overlay.remove(),
    { once: true }
  );
}

function wireOutgoingLinks() {
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;

    const link = event.target.closest("a[href]");
    if (!link) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    const isSameOrigin = url.origin === window.location.origin;
    if (!isSameOrigin) return;

    const isSamePageAnchor = url.pathname === window.location.pathname && url.hash;
    if (isSamePageAnchor) return; // dejar el scroll suave normal para anclas internas

    event.preventDefault();
    createOverlay("is-covering");
    window.setTimeout(() => {
      window.location.href = link.href;
    }, COVER_DURATION);
  });
}
