// modules/beforeAfter.js — comparador antes/después.
// Controla cualquier elemento .compare que contenga un .compare__range:
// arrastre desde cualquier punto del componente, además del control
// nativo por teclado (flechas) que ya trae el <input type="range">.

export function initCompareSliders() {
  document.querySelectorAll(".compare").forEach((compare) => {
    const range = compare.querySelector(".compare__range");
    if (!range) return;

    const setPosition = (value) => {
      compare.style.setProperty("--compare-pos", `${value}%`);
    };
    setPosition(range.value);

    range.addEventListener("input", () => setPosition(range.value));

    let dragging = false;
    const setFromClientX = (clientX) => {
      const rect = compare.getBoundingClientRect();
      const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
      range.value = String(Math.round(pct));
      setPosition(range.value);
    };

    compare.addEventListener("pointerdown", (event) => {
      dragging = true;
      compare.setPointerCapture(event.pointerId);
      setFromClientX(event.clientX);
    });
    compare.addEventListener("pointermove", (event) => {
      if (dragging) setFromClientX(event.clientX);
    });
    compare.addEventListener("pointerup", (event) => {
      dragging = false;
      compare.releasePointerCapture(event.pointerId);
    });
    compare.addEventListener("pointercancel", () => {
      dragging = false;
    });
  });
}
