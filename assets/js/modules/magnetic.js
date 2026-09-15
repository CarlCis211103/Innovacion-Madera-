// modules/magnetic.js — leve atracción magnética en botones principales
// y botones flotantes. Se desactiva en táctil y con prefers-reduced-motion.

export function initMagneticButtons() {
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isCoarsePointer || prefersReducedMotion) return;

  const targets = document.querySelectorAll(".btn, .floating-btn");

  targets.forEach((el) => {
    const isFloating = el.classList.contains("floating-btn");
    const strength = isFloating ? 0.35 : 0.25;

    el.addEventListener("mousemove", (event) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      el.style.transition = "transform 90ms linear";
      el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform 320ms var(--ease-standard)";
      el.style.transform = "translate(0, 0)";
    });
  });
}
