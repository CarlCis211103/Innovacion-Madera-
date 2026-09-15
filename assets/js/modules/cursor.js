// modules/cursor.js — cursor personalizado (punto + anillo con inercia).
// Se desactiva en pantallas táctiles y con prefers-reduced-motion.

export function initCustomCursor() {
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isCoarsePointer || prefersReducedMotion) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  document.body.append(dot, ring);
  document.body.classList.add("has-custom-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    },
    { passive: true }
  );

  const HOVER_TARGETS = "a, button, input, select, textarea, summary, .compare, .compare__range";

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest(HOVER_TARGETS)) ring.classList.add("is-active");
  });
  document.addEventListener("mouseout", (event) => {
    if (event.target.closest(HOVER_TARGETS)) ring.classList.remove("is-active");
  });

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "";
  });

  function loop() {
    // el anillo persigue al punto con retardo, para dar sensación de inercia
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
