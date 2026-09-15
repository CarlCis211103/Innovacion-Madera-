// main.js — punto de entrada, compartido por todas las páginas del sitio.

const CONTACT = {
  phoneDisplay: "(555) 123-4567",
  phoneE164: "+15551234567",
  whatsappNumber: "15551234567", // sin '+', formato requerido por wa.me
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  wireContactNumbers();
  wireHeaderScroll();
  wireMobileNav();
  wirePageTransitions();
  wireMagneticButtons();
  wireServiceCardsToForm();
  wireWhatsappMessage();
  wireMultiStepForm();
  wireCoverageCheck();
  wireStatsCountUp();
  wireProcessReveal();
});

/**
 * Rellena todos los enlaces tel:/número visibles con los datos de CONTACT.
 */
function wireContactNumbers() {
  document.querySelectorAll("[data-phone-link]").forEach((el) => {
    el.setAttribute("href", `tel:${CONTACT.phoneE164}`);
  });
  document.querySelectorAll("[data-phone-display]").forEach((el) => {
    el.textContent = CONTACT.phoneDisplay;
  });
}

/**
 * Header integrado: transparente sobre el hero, sólido al hacer scroll.
 * En páginas sin hero oscuro, usar data-force-solid="true" en el header.
 */
function wireHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  if (header.dataset.forceSolid === "true") {
    header.classList.add("is-scrolled");
    return;
  }

  const toggle = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/**
 * Menú móvil de pantalla completa.
 */
function wireMobileNav() {
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".mobile-nav");
  if (!toggleBtn || !nav) return;

  const close = () => {
    nav.classList.remove("is-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
}

/**
 * Transición entre páginas: un velo cubre la pantalla antes de navegar,
 * y se descubre al llegar, para que cambiar de página se sienta continuo.
 */
function wirePageTransitions() {
  const overlay = document.querySelector(".page-transition");
  if (!overlay) return;

  if (prefersReducedMotion()) {
    overlay.classList.add("is-hidden");
    return;
  }

  requestAnimationFrame(() => overlay.classList.add("is-hidden"));

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    const isExternal = /^https?:\/\//i.test(href || "");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") ||
        href.startsWith("tel:") || link.target === "_blank" || isExternal) return;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      overlay.classList.remove("is-hidden");
      setTimeout(() => { window.location.href = href; }, 420);
    });
  });
}

/**
 * Botones "magnéticos": los CTAs principales se desplazan levemente
 * hacia el cursor. Solo en dispositivos con mouse y sin preferencia
 * de movimiento reducido.
 */
function wireMagneticButtons() {
  if (prefersReducedMotion()) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const targets = document.querySelectorAll(
    ".btn--primary, .btn--outline, .btn--gold, .floating-btn"
  );

  targets.forEach((el) => {
    el.style.willChange = "transform";
    el.addEventListener("mousemove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

/**
 * Al hacer clic en una fila de servicio, se preselecciona esa opción
 * en el formulario, se reinicia al paso 1 y se hace scroll hacia él.
 */
function wireServiceCardsToForm() {
  const serviceSelect = document.getElementById("servicio");

  document.querySelectorAll("[data-service-value]").forEach((card) => {
    card.addEventListener("click", () => {
      if (serviceSelect) serviceSelect.value = card.dataset.serviceValue;
      document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      goToFormStep(1);
      document.getElementById("nombre")?.focus({ preventScroll: true });
    });
  });
}

/**
 * Construye el enlace de WhatsApp con un mensaje pre-armado.
 */
function wireWhatsappMessage() {
  const waLinks = document.querySelectorAll("[data-whatsapp-link]");
  const serviceSelect = document.getElementById("servicio");

  const buildLink = () => {
    const servicio = serviceSelect && serviceSelect.value ? serviceSelect.value : "";
    const base = "Hola, me gustaría agendar una consulta de diseño con Innovación Maderas.";
    const texto = servicio ? `${base} Estoy interesado en: ${servicio}.` : base;
    return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(texto)}`;
  };

  waLinks.forEach((link) => link.setAttribute("href", buildLink()));
  serviceSelect?.addEventListener("change", () => {
    waLinks.forEach((link) => link.setAttribute("href", buildLink()));
  });
}

/**
 * Formulario de consulta en 3 pasos, con barra de progreso.
 * Paso 1: datos de contacto. Paso 2: proyecto. Paso 3: confirmación y envío.
 * NOTA: el envío es simulado (ver bloque marcado). Conectar a un backend
 * real (Formspree, Netlify Forms, etc.) antes de publicar.
 */
let currentStep = 1;
const TOTAL_STEPS = 3;

function goToFormStep(step) {
  const form = document.getElementById("lead-form");
  if (!form) return;
  currentStep = step;

  form.querySelectorAll(".form-step").forEach((panel) => {
    panel.classList.toggle("is-active", Number(panel.dataset.step) === step);
  });

  const fill = document.querySelector(".form-progress__fill");
  if (fill) fill.style.width = `${(step / TOTAL_STEPS) * 100}%`;

  const label = document.querySelector("[data-progress-label]");
  if (label) label.textContent = `Paso ${step} de ${TOTAL_STEPS}`;

  if (step === TOTAL_STEPS) fillFormSummary();
}

function currentStepIsValid() {
  const form = document.getElementById("lead-form");
  const activePanel = form.querySelector(`.form-step[data-step="${currentStep}"]`);
  if (!activePanel) return true;

  const fields = activePanel.querySelectorAll("input, select");
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }

  if (currentStep === 2) {
    const zipInput = document.getElementById("zipcode");
    if (zipInput && !/^\d{5}$/.test(zipInput.value.trim())) {
      zipInput.setCustomValidity("Ingresa un código postal válido de 5 dígitos.");
      zipInput.reportValidity();
      zipInput.setCustomValidity("");
      return false;
    }
  }

  return true;
}

function fillFormSummary() {
  const get = (id) => document.getElementById(id)?.value || "—";
  const map = {
    "summary-nombre": get("nombre"),
    "summary-telefono": get("telefono"),
    "summary-email": get("email"),
    "summary-zip": get("zipcode"),
    "summary-servicio": get("servicio"),
  };
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

function wireMultiStepForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.querySelectorAll("[data-step-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStepIsValid()) goToFormStep(currentStep + 1);
    });
  });

  form.querySelectorAll("[data-step-back]").forEach((btn) => {
    btn.addEventListener("click", () => goToFormStep(currentStep - 1));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!currentStepIsValid()) return;

    // ----- Reemplazar este bloque por el envío real -----
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Consulta capturada:", data);
    // ------------------------------------------------------

    showFormSuccess(form);
  });

  goToFormStep(1);
}

function showFormSuccess(form) {
  const card = form.closest(".lead-card");
  if (!card) return;

  card.innerHTML = `
    <h3 class="form-step__title">¡Gracias! Ya recibimos tu solicitud.</h3>
    <p class="lead-card__subtitle">
      Un especialista de Innovación Maderas te contactará en menos de 24 horas
      para agendar tu consulta de diseño sin costo.
    </p>
  `;
}

/**
 * Validación simple del campo de código postal en "Zona de cobertura".
 */
function wireCoverageCheck() {
  const form = document.getElementById("coverage-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    const result = form.querySelector("[data-coverage-result]");
    if (!input || !result) return;

    const isValidZip = /^\d{5}$/.test(input.value.trim());
    result.textContent = isValidZip
      ? "¡Buenas noticias! Damos servicio en tu zona. Completa el formulario para tu consulta de diseño."
      : "Ingresa un código postal válido de 5 dígitos.";
    result.hidden = false;
  });
}

/**
 * Contador animado para la franja de credenciales: los números suben
 * desde 0 cuando la sección entra en pantalla (una sola vez).
 */
function wireStatsCountUp() {
  const targets = document.querySelectorAll("[data-count-to]");
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    targets.forEach((el) => {
      el.textContent = `${el.dataset.countTo}${el.dataset.suffix || ""}`;
    });
    return;
  }

  const animate = (el) => {
    const target = parseInt(el.dataset.countTo, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  targets.forEach((el) => observer.observe(el));
}

/**
 * Revela cada paso del proceso a medida que entra en pantalla —
 * es la única sección con "scroll storytelling" de la página.
 */
function wireProcessReveal() {
  const steps = document.querySelectorAll(".process-step");
  if (!steps.length) return;

  if (prefersReducedMotion()) {
    steps.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  steps.forEach((el) => observer.observe(el));
}
