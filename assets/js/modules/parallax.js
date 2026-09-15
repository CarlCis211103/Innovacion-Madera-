// modules/parallax.js — parallax sutil del árbol de fondo del hero,
// combinando posición del mouse (leve desplazamiento) y scroll (deriva
// vertical al salir de la vista). Se desactiva con prefers-reduced-motion.

export function initHeroParallax() {
  const hero = document.querySelector(".hero");
  const tree = document.querySelector(".hero__tree");
  if (!hero || !tree) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  hero.addEventListener(
    "mousemove",
    (event) => {
      const rect = hero.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    },
    { passive: true }
  );

  hero.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function render() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    const scrollDrift = Math.min(window.scrollY * 0.08, 40);
    tree.style.transform = `translate3d(${currentX * -14}px, ${currentY * -10 + scrollDrift}px, 0) scale(1.04)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
