// main.js — punto de entrada, compartido por todas las páginas del sitio.

const CONTACT = {
  phoneDisplay: "+52 868 159 0133",
  phoneE164: "+528681590133",
  whatsappNumber: "528681590133", // sin '+', formato requerido por wa.me — asumiendo mismo número para WhatsApp
  leadEmail: "carlosgcs211103@gmail.com", // referencia informativa: el correo real de destino se configura en Formspree
  formEndpoint: "https://formspree.io/f/xwlpkvrd",
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
 * Al hacer clic en una fila de servicio, se preselecciona esa opción en
 * todos los formularios de la página (por si el usuario usa cualquiera
 * de los dos), se reinicia el más cercano al paso 1 y se hace scroll
 * hacia él.
 */
function wireServiceCardsToForm() {
  const serviceSelects = document.querySelectorAll('select[name="servicio"]');
  if (!serviceSelects.length) return;

  document.querySelectorAll("[data-service-value]").forEach((card) => {
    card.addEventListener("click", () => {
      serviceSelects.forEach((select) => { select.value = card.dataset.serviceValue; });

      const target = document.getElementById("cotizar-top") || document.getElementById("cotizar-form");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });

      const topForm = document.getElementById("lead-form-top");
      if (topForm) {
        goToFormStep(topForm, 1);
        topForm.querySelector('select[name="servicio"]')?.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * Construye el enlace de WhatsApp con un mensaje pre-armado. Si hay más
 * de un formulario en la página, mantiene el servicio seleccionado
 * sincronizado entre todos.
 */
function wireWhatsappMessage() {
  const waLinks = document.querySelectorAll("[data-whatsapp-link]");
  const serviceSelects = document.querySelectorAll('select[name="servicio"]');

  const buildLink = (servicio) => {
    const base = "Hola, me gustaría agendar una consulta de diseño con Innovación Maderas.";
    const texto = servicio ? `${base} Estoy interesado en: ${servicio}.` : base;
    return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(texto)}`;
  };

  const refreshLinks = (servicio) => {
    waLinks.forEach((link) => link.setAttribute("href", buildLink(servicio)));
  };

  refreshLinks("");

  serviceSelects.forEach((select) => {
    select.addEventListener("change", () => {
      serviceSelects.forEach((other) => { other.value = select.value; });
      refreshLinks(select.value);
    });
  });
}

/**
 * Formulario de consulta en 2 pasos, con barra de progreso.
 * Paso 1: el proyecto (código postal + servicio).
 * Paso 2: datos de contacto (nombre, teléfono, correo) y envío.
 * Soporta varias instancias del mismo formulario en la página (ej. una
 * cerca del inicio y otra al final).
 * ENVÍO: POST silencioso a CONTACT.formEndpoint (Formspree) — el visitante
 * no sale de la página ni necesita cliente de correo configurado. El
 * correo de notificación real se administra desde el dashboard de
 * Formspree, no desde este código. Si el POST falla (sin conexión, etc.),
 * se ofrece un enlace "mailto:" de respaldo con los mismos datos.
 */
const formState = new WeakMap();

function goToFormStep(form, step) {
  const card = form.closest(".lead-card");
  if (!card) return;

  const totalSteps = form.querySelectorAll(".form-step").length;
  formState.set(form, step);

  form.querySelectorAll(".form-step").forEach((panel) => {
    panel.classList.toggle("is-active", Number(panel.dataset.step) === step);
  });

  const fill = card.querySelector(".form-progress__fill");
  if (fill) fill.style.width = `${(step / totalSteps) * 100}%`;

  const label = card.querySelector("[data-progress-label]");
  if (label) label.textContent = `Paso ${step} de ${totalSteps}`;
}

function stepIsValid(form, step) {
  const activePanel = form.querySelector(`.form-step[data-step="${step}"]`);
  if (!activePanel) return true;

  const fields = activePanel.querySelectorAll("input, select");
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }

  const zipInput = activePanel.querySelector('input[name="zipcode"]');
  if (zipInput && !/^\d{5}$/.test(zipInput.value.trim())) {
    zipInput.setCustomValidity("Ingresa un código postal válido de 5 dígitos.");
    zipInput.reportValidity();
    zipInput.setCustomValidity("");
    return false;
  }

  return true;
}

function wireMultiStepForm() {
  document.querySelectorAll(".lead-form").forEach((form) => {
    formState.set(form, 1);

    form.querySelectorAll("[data-step-next]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const step = formState.get(form) || 1;
        if (stepIsValid(form, step)) goToFormStep(form, step + 1);
      });
    });

    form.querySelectorAll("[data-step-back]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const step = formState.get(form) || 1;
        goToFormStep(form, step - 1);
      });
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const step = formState.get(form) || 1;
      if (!stepIsValid(form, step)) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando…";
      }

      try {
        const response = await fetch(CONTACT.formEndpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });

        if (response.ok) {
          showFormSuccess(form);
        } else {
          showFormError(form, submitBtn, originalLabel);
        }
      } catch (error) {
        showFormError(form, submitBtn, originalLabel);
      }
    });

    goToFormStep(form, 1);
  });
}

/**
 * Respaldo si el POST a Formspree falla (sin conexión, endpoint caído,
 * etc.): re-habilita el botón y ofrece un enlace mailto: con los mismos
 * datos, dirigido a CONTACT.leadEmail, para que la consulta no se pierda.
 */
function showFormError(form, submitBtn, originalLabel) {
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }

  const activePanel = form.querySelector(".form-step.is-active");
  if (!activePanel) return;

  let errorEl = activePanel.querySelector(".form-error");
  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.className = "form-error";
    activePanel.appendChild(errorEl);
  }

  const data = Object.fromEntries(new FormData(form).entries());
  errorEl.innerHTML = `No pudimos enviar tu solicitud. Intenta de nuevo o <a href="${buildLeadMailto(data)}">escríbenos por correo</a>.`;
}

/**
 * Arma un enlace mailto: con los datos del formulario, dirigido a
 * CONTACT.leadEmail. Se usa únicamente como respaldo si el envío
 * silencioso a Formspree falla (ver showFormError).
 */
function buildLeadMailto(data) {
  const subject = `Nueva consulta de diseño — ${data.servicio || "proyecto sin especificar"}`;
  const lines = [
    `Nombre: ${data.nombre || "-"}`,
    `Teléfono: ${data.telefono || "-"}`,
    `Código postal: ${data.zipcode || "-"}`,
    `Correo: ${data.email || "-"}`,
    `Servicio: ${data.servicio || "-"}`,
  ];
  if (data.mensaje) lines.push(`Mensaje: ${data.mensaje}`);
  const body = lines.join("\n");
  return `mailto:${CONTACT.leadEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
