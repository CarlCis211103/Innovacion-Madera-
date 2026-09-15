// main.js — punto de entrada, compartido por todas las páginas del sitio.

const CONTACT = {
  phoneDisplay: "(555) 123-4567",
  phoneE164: "+15551234567",
  whatsappNumber: "15551234567", // sin '+', formato requerido por wa.me
};

document.addEventListener("DOMContentLoaded", () => {
  wireContactNumbers();
  wireHeaderScroll();
  wireMobileNav();
  wireServiceCardsToForm();
  wireWhatsappMessage();
  wireLeadForm();
  wireCoverageCheck();
});

/**
 * Rellena todos los enlaces tel:/número visibles con los datos de CONTACT,
 * para que solo haya que actualizar un lugar cuando cambie el teléfono real.
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
 * En páginas sin hero oscuro (ej. futuras subpáginas), marcar el header
 * con data-force-solid="true" para que se muestre sólido desde el inicio.
 */
function wireHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  if (header.dataset.forceSolid === "true") {
    header.classList.add("is-scrolled");
    return;
  }

  const toggle = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
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
 * Al hacer clic en una tarjeta/servicio, se preselecciona esa opción
 * en el formulario del hero y se hace scroll hacia él.
 */
function wireServiceCardsToForm() {
  const serviceSelect = document.getElementById("servicio");
  if (!serviceSelect) return;

  document.querySelectorAll("[data-service-value]").forEach((card) => {
    card.addEventListener("click", () => {
      serviceSelect.value = card.dataset.serviceValue;
      document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("nombre")?.focus({ preventScroll: true });
    });
  });
}

/**
 * Construye el enlace de WhatsApp con un mensaje pre-armado, incluyendo
 * el servicio seleccionado en el formulario si ya se eligió uno.
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
 * Manejo del formulario de consulta del hero.
 * NOTA: por ahora simula el envío en el navegador. Para producción,
 * reemplazar el bloque marcado con la llamada real (fetch a tu backend,
 * Formspree, Netlify Forms, etc.).
 */
function wireLeadForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const zipInput = form.querySelector("#zipcode");
    if (zipInput && !/^\d{5}$/.test(zipInput.value.trim())) {
      zipInput.setCustomValidity("Ingresa un código postal válido de 5 dígitos.");
      form.reportValidity();
      zipInput.setCustomValidity("");
      return;
    }

    // ----- Reemplazar este bloque por el envío real -----
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Consulta capturada:", data);
    // ------------------------------------------------------

    showFormSuccess(form);
  });
}

function showFormSuccess(form) {
  const card = form.closest(".lead-card");
  if (!card) return;

  card.innerHTML = `
    <h3 class="lead-card__title">¡Gracias! Ya recibimos tu solicitud.</h3>
    <p class="lead-card__subtitle">
      Un especialista de Innovación Maderas te contactará en menos de 24 horas
      para agendar tu consulta de diseño sin costo.
    </p>
  `;
}

/**
 * Validación simple del campo de código postal en la sección "Zona de cobertura".
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
      ? "¡Buenas noticias! Damos servicio en tu zona. Completa el formulario de arriba para tu consulta de diseño."
      : "Ingresa un código postal válido de 5 dígitos.";
    result.hidden = false;
  });
}
