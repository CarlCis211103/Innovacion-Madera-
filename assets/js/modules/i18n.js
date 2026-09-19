// i18n.js — sistema de traducción ES/EN para el sitio.
// El español es el idioma base (coincide con el HTML estático, lo que ven
// los buscadores). El botón ES/EN solo cambia el texto en pantalla del
// lado del cliente — no crea URLs separadas por idioma.

const STORAGE_KEY = "im-lang";

export const translations = {
  es: {
    // Navegación
    nav_servicios: "Servicios",
    nav_proceso: "Proceso",
    nav_proyectos: "Proyectos",
    nav_preguntas: "Preguntas frecuentes",
    nav_pro: "Para arquitectos y contratistas",
    nav_toggle_aria: "Abrir menú",
    lang_toggle_aria: "Cambiar idioma",

    // Hero
    hero_eyebrow: "Ebanistería especializada en maderas finas",
    hero_h1: "Ebanistería a la Medida en Brownsville y el Valle del Río Grande",
    hero_lede: "Piezas de ebanistería hechas para espacios que merecen ser únicos. Diseñamos, fabricamos e instalamos cocinas a la medida, revestimientos de madera y centros de entretenimiento en maderas finas — de principio a fin, con un solo equipo.",
    hero_cta: "Agendar consulta de diseño",
    hero_hint: "Sin costo · Respuesta en menos de 24 horas",
    hero_pro_q: "¿Eres arquitecto, diseñador de interiores o contratista?",
    link_work_with_you: "Conoce cómo trabajamos contigo",
    scroll_cue: "Descubre más",

    // Credenciales
    stats_lead: "proyectos entregados en el Valle del Río Grande Valley y Matamoros",
    stats_years: "años de experiencia especializada",
    stats_ownwork: "diseño, fabricación e instalación propia",
    stats_bilingual: "atención bilingüe",

    // Formulario (compartido por las 2 instancias)
    form_eyebrow: "Empecemos",
    form_h2: "Agenda tu consulta de diseño",
    form_sub: "Sin costo. Cuéntanos tu proyecto y un especialista te contacta en menos de 24 horas.",
    form_progress_label2: "Consulta de diseño",
    step1_title: "Tu proyecto",
    zipcode_label: "Código postal",
    servicio_label: "Servicio requerido",
    opt_placeholder: "Selecciona un servicio",
    opt_cocinas: "Cocinas a la Medida",
    opt_closets: "Walk-in Closets",
    opt_entretenimiento: "Centros de Entretenimiento",
    opt_puertas: "Puertas y Molduras",
    opt_escaleras: "Escaleras",
    opt_revestimientos: "Revestimientos de Madera",
    opt_otro: "Otro proyecto de ebanistería",
    btn_continuar: "Continuar",
    step2_title: "Acerca de ti",
    nombre_label: "Nombre completo",
    telefono_label: "Teléfono",
    email_label: "Correo electrónico",
    btn_atras: "Atrás",
    btn_solicitar: "Solicitar consulta de diseño",
    form_note: "No compartimos tu información con terceros.",
    form_divider: "o si prefieres",
    btn_whatsapp: "Escríbenos por WhatsApp",

    // Servicios
    services_eyebrow: "Nuestra especialidad",
    services_h2: "Cocinas a la medida, revestimientos de madera y centros de entretenimiento",
    srv_cocina_h3: "Cocinas a la Medida",
    srv_cocina_p: "Gabinetes, islas y acabados diseñados y fabricados a la medida exacta de tu espacio, en maderas finas seleccionadas.",
    srv_cocina_cta: "Agendar consulta para mi cocina",
    srv_revest_h3: "Revestimientos de Madera",
    srv_revest_p: "Paneles y lambrín de madera para paredes, recepciones y muebles empotrados: calidez arquitectónica que distingue el espacio.",
    srv_revest_cta: "Agendar consulta para mi revestimiento",
    srv_entret_h3: "Centros de Entretenimiento",
    srv_entret_p: "Muebles integrados a la arquitectura de tu sala, con soluciones de cableado y almacenamiento resueltas desde el diseño.",
    srv_entret_cta: "Agendar consulta para mi sala",
    catalog_h4: "También fabricamos",
    catalog_puertas: "Puertas y molduras a medida",
    catalog_escaleras: "Escaleras en madera",
    catalog_closets: "Walk-in closets",
    catalog_otro: "Otro proyecto de ebanistería",

    // Proceso
    process_eyebrow: "Cómo trabajamos",
    process_h2: "Nuestro proceso: de la consulta a la instalación",
    proc1_h3: "Consulta de diseño",
    proc1_p: "Platicamos tu proyecto, tu espacio y tu estilo. Sin costo ni compromiso.",
    proc2_h3: "Diseño y render 3D",
    proc2_p: "Visualizas tu cocina, revestimiento o centro de entretenimiento terminado antes de que empecemos a fabricarlo, y ajustamos cada detalle contigo.",
    proc3_h3: "Fabricación propia",
    proc3_p: "Construimos tu proyecto en nuestro taller, con maderas finas y procesos de tratamiento especializados.",
    proc4_h3: "Instalación y garantía",
    proc4_p: "Instalamos con nuestro propio equipo y respaldamos el trabajo con garantía por escrito.",

    // Portafolio
    portfolio_eyebrow: "Portafolio",
    portfolio_h2: "Proyectos recientes en el Valle del Río Grande",
    portfolio_note: "Estamos documentando cada proyecto entregado. Pasa el cursor sobre los que ya tienen fotografía.",
    port1_name: "Cocina a la Medida",
    port1_meta: "Proyecto residencial — McAllen, TX",
    port2_name: "Revestimientos de Madera",
    port2_meta: "Recepción comercial — McAllen, TX",
    port3_name: "Centro de Entretenimiento",
    port3_meta: "Proyecto residencial — McAllen, TX",
    port4_name: "Molduras y Paneles de Pared",
    port4_meta: "Proyecto residencial — Brownsville, TX",

    // Cobertura
    coverage_eyebrow: "Área de servicio",
    coverage_h2: "Zonas que atendemos en el Valle del Río Grande",
    coverage_p: "¿Trabajamos en tu zona? Damos servicio en Matamoros, Brownsville, Harlingen, McAllen, San Juan y todo el Valle del Río Grande.",
    coverage_zip_placeholder: "Tu código postal",
    coverage_zip_aria: "Código postal",
    coverage_btn: "Verificar cobertura",
    coverage_valid: "¡Buenas noticias! Damos servicio en tu zona. Completa el formulario para tu consulta de diseño.",

    // Testimonios
    testimonials_eyebrow: "Clientes",
    testimonials_h2: "Lo que dicen nuestros clientes",
    test1_quote: "\u201cDiseñaron e instalaron la cocina completa de nuestra casa. El nivel de detalle en los acabados fue exactamente lo que buscábamos.\u201d",
    test2_quote: "\u201cEl walk-in closet quedó como un mueble de diseño, no como una simple repisa. Superó lo que imaginamos en el render.\u201d",
    test3_quote: "\u201cEl centro de entretenimiento se integró perfecto con la arquitectura de la sala; parece que siempre estuvo ahí.\u201d",
    testimonial_client_label: "Cliente residencial",

    // FAQ
    faq_eyebrow: "Preguntas frecuentes",
    faq_h2: "Preguntas frecuentes sobre ebanistería a la medida",
    faq1_q: "¿Cuánto cuesta un proyecto de ebanistería a medida?",
    faq1_a: "Cada proyecto es distinto: depende del tamaño, la madera y el nivel de detalle. En tu consulta de diseño, sin costo, te damos una cotización precisa basada en tu proyecto real, no un estimado genérico.",
    faq2_q: "¿Cuánto tiempo toma diseñar y fabricar mi proyecto?",
    faq2_a: "Después de aprobar el diseño y el render, la fabricación e instalación suele tomar varias semanas, dependiendo de la complejidad. Te damos un tiempo estimado exacto en tu cotización.",
    faq3_q: "¿Qué significa trabajar con \"maderas finas\"?",
    faq3_a: "Seleccionamos especies y procesos de tratamiento pensados para durabilidad, estabilidad y un acabado que no se consigue con materiales genéricos de carpintería de construcción.",
    faq4_q: "¿Trabajan con arquitectos, diseñadores o contratistas?",
    faq4_a_pre: "Sí. Además de proyectos residenciales, somos proveedor especializado de ebanistería para arquitectos, diseñadores de interiores, contratistas y constructores. ",
    faq5_q: "¿En qué ciudades dan servicio?",
    faq5_a: "Damos servicio en Matamoros, Brownsville, Harlingen, McAllen, San Juan y el resto del Valle del Río Grande.",
    faq6_q: "¿Ofrecen garantía?",
    faq6_a: "Sí. Todo proyecto incluye garantía por escrito sobre materiales y mano de obra, con los términos detallados en tu contrato.",

    // CTA final
    final_h2: "Solicita tu consulta de diseño gratuita",
    final_p: "Diseñemos juntos tu próxima pieza de ebanistería. Agenda tu consulta de diseño sin costo y recibe respuesta en menos de 24 horas.",

    // Footer
    footer_tagline: "Ebanistería especializada en maderas finas. Diseñamos, fabricamos e instalamos cocinas, revestimientos de madera y centros de entretenimiento a la medida, con garantía por escrito y equipo propio.",
    footer_company_h4: "Compañía",
    footer_link_proceso: "Nuestro proceso",
    footer_contact_h4: "Contacto",
    footer_call_prefix: "Llamar: ",
    footer_rights: "© 2026 Innovación Maderas. Todos los derechos reservados.",
    footer_bottom_tagline: "Ebanistería especializada · Diseño, fabricación e instalación propia",

    // Botones flotantes
    floating_whatsapp_aria: "Escribir por WhatsApp",
    floating_call_aria: "Llamar ahora a Innovación Maderas",
    floating_call_label: "Llamar ahora",

    // Generado por JS (main.js)
    step_of: "Paso {step} de {total}",
    sending: "Enviando…",
    zip_invalid: "Ingresa un código postal válido de 5 dígitos.",
    form_error_text: "No pudimos enviar tu solicitud. Intenta de nuevo o ",
    form_error_link: "escríbenos por correo",
    form_success_title: "¡Gracias! Ya recibimos tu solicitud.",
    form_success_subtitle: "Un especialista de Innovación Maderas te contactará en menos de 24 horas para agendar tu consulta de diseño sin costo.",

    // <title> / meta description
    meta_title: "Ebanistería a la Medida en Brownsville TX | Innovación Maderas",
    meta_description: "Cocinas, revestimientos de madera y centros de entretenimiento en madera fina, diseñados y fabricados por Innovación Maderas. Servimos Matamoros, Brownsville, Harlingen y todo el Valle del Río Grande. Consulta de diseño sin costo.",
  },

  en: {
    nav_servicios: "Services",
    nav_proceso: "Process",
    nav_proyectos: "Projects",
    nav_preguntas: "FAQ",
    nav_pro: "For Architects & Contractors",
    nav_toggle_aria: "Open menu",
    lang_toggle_aria: "Change language",

    hero_eyebrow: "Specialized fine-wood cabinetry",
    hero_h1: "Custom Cabinetry in Brownsville & the Rio Grande Valley",
    hero_lede: "Cabinetry made for spaces that deserve to be one of a kind. We design, build, and install custom kitchens, wood paneling, and entertainment centers in fine woods — start to finish, with a single team.",
    hero_cta: "Book a Design Consultation",
    hero_hint: "No cost · Response within 24 hours",
    hero_pro_q: "Are you an architect, interior designer, or contractor?",
    link_work_with_you: "See how we work with you",
    scroll_cue: "Discover more",

    stats_lead: "projects delivered across the Rio Grande Valley and Matamoros",
    stats_years: "years of specialized experience",
    stats_ownwork: "in-house design, fabrication & installation",
    stats_bilingual: "bilingual service",

    form_eyebrow: "Let's Get Started",
    form_h2: "Book Your Design Consultation",
    form_sub: "No cost. Tell us about your project and a specialist will reach out within 24 hours.",
    form_progress_label2: "Design Consultation",
    step1_title: "Your Project",
    zipcode_label: "ZIP Code",
    servicio_label: "Service Needed",
    opt_placeholder: "Select a service",
    opt_cocinas: "Custom Kitchens",
    opt_closets: "Walk-in Closets",
    opt_entretenimiento: "Entertainment Centers",
    opt_puertas: "Doors & Molding",
    opt_escaleras: "Staircases",
    opt_revestimientos: "Wood Paneling",
    opt_otro: "Other Woodworking Project",
    btn_continuar: "Continue",
    step2_title: "About You",
    nombre_label: "Full Name",
    telefono_label: "Phone",
    email_label: "Email",
    btn_atras: "Back",
    btn_solicitar: "Request Design Consultation",
    form_note: "We never share your information with third parties.",
    form_divider: "or if you prefer",
    btn_whatsapp: "Message Us on WhatsApp",

    services_eyebrow: "Our Specialty",
    services_h2: "Custom Kitchens, Wood Paneling & Entertainment Centers",
    srv_cocina_h3: "Custom Kitchens",
    srv_cocina_p: "Cabinets, islands, and finishes designed and built to the exact measurements of your space, in select fine woods.",
    srv_cocina_cta: "Book a Consultation for My Kitchen",
    srv_revest_h3: "Wood Paneling",
    srv_revest_p: "Wood panels and wainscoting for walls, receptions, and built-ins — architectural warmth that sets a space apart.",
    srv_revest_cta: "Book a Consultation for My Paneling",
    srv_entret_h3: "Entertainment Centers",
    srv_entret_p: "Built-ins integrated into your living room's architecture, with wiring and storage solved from the design stage.",
    srv_entret_cta: "Book a Consultation for My Living Room",
    catalog_h4: "We Also Build",
    catalog_puertas: "Custom Doors & Molding",
    catalog_escaleras: "Wood Staircases",
    catalog_closets: "Walk-in Closets",
    catalog_otro: "Other Woodworking Project",

    process_eyebrow: "How We Work",
    process_h2: "Our Process: From Consultation to Installation",
    proc1_h3: "Design Consultation",
    proc1_p: "We talk through your project, your space, and your style. No cost, no commitment.",
    proc2_h3: "Design & 3D Rendering",
    proc2_p: "You see your finished kitchen, paneling, or entertainment center before we start building it, and we fine-tune every detail with you.",
    proc3_h3: "In-House Fabrication",
    proc3_p: "We build your project in our own workshop, using fine woods and specialized treatment processes.",
    proc4_h3: "Installation & Warranty",
    proc4_p: "We install with our own team and back the work with a written warranty.",

    portfolio_eyebrow: "Portfolio",
    portfolio_h2: "Recent Projects in the Rio Grande Valley",
    portfolio_note: "We're documenting every project we deliver. Hover over the ones that already have photos.",
    port1_name: "Custom Kitchen",
    port1_meta: "Residential project — McAllen, TX",
    port2_name: "Wood Paneling",
    port2_meta: "Commercial reception — McAllen, TX",
    port3_name: "Entertainment Center",
    port3_meta: "Residential project — McAllen, TX",
    port4_name: "Molding & Wall Panels",
    port4_meta: "Residential project — Brownsville, TX",

    coverage_eyebrow: "Service Area",
    coverage_h2: "Areas We Serve in the Rio Grande Valley",
    coverage_p: "Do we serve your area? We work in Matamoros, Brownsville, Harlingen, McAllen, San Juan, and the entire Rio Grande Valley.",
    coverage_zip_placeholder: "Your ZIP code",
    coverage_zip_aria: "ZIP code",
    coverage_btn: "Check Coverage",
    coverage_valid: "Good news! We serve your area. Fill out the form for your design consultation.",

    testimonials_eyebrow: "Clients",
    testimonials_h2: "What Our Clients Say",
    test1_quote: "\u201cThey designed and installed our entire kitchen. The level of detail in the finishes was exactly what we were looking for.\u201d",
    test2_quote: "\u201cThe walk-in closet turned out like a designer piece of furniture, not just a shelf. It exceeded what we imagined in the render.\u201d",
    test3_quote: "\u201cThe entertainment center blended perfectly with the living room's architecture — it feels like it was always there.\u201d",
    testimonial_client_label: "Residential Client",

    faq_eyebrow: "FAQ",
    faq_h2: "Frequently Asked Questions About Custom Cabinetry",
    faq1_q: "How much does a custom cabinetry project cost?",
    faq1_a: "Every project is different — it depends on size, wood species, and level of detail. In your free design consultation, we give you a precise quote based on your actual project, not a generic estimate.",
    faq2_q: "How long does it take to design and build my project?",
    faq2_a: "Once the design and render are approved, fabrication and installation usually take several weeks, depending on complexity. We give you an exact estimated timeline in your quote.",
    faq3_q: "What does it mean to work with \"fine woods\"?",
    faq3_a: "We select species and treatment processes chosen for durability, stability, and a finish you can't get with generic construction-grade materials.",
    faq4_q: "Do you work with architects, designers, or contractors?",
    faq4_a_pre: "Yes. Beyond residential projects, we're a specialized cabinetry supplier for architects, interior designers, contractors, and builders. ",
    faq5_q: "What cities do you serve?",
    faq5_a: "We serve Matamoros, Brownsville, Harlingen, McAllen, San Juan, and the rest of the Rio Grande Valley.",
    faq6_q: "Do you offer a warranty?",
    faq6_a: "Yes. Every project includes a written warranty on materials and workmanship, with terms detailed in your contract.",

    final_h2: "Request Your Free Design Consultation",
    final_p: "Let's design your next cabinetry piece together. Book your free design consultation and get a response within 24 hours.",

    footer_tagline: "Specialized fine-wood cabinetry. We design, build, and install custom kitchens, wood paneling, and entertainment centers, backed by a written warranty and our own team.",
    footer_company_h4: "Company",
    footer_link_proceso: "Our Process",
    footer_contact_h4: "Contact",
    footer_call_prefix: "Call: ",
    footer_rights: "© 2026 Innovación Maderas. All rights reserved.",
    footer_bottom_tagline: "Specialized Cabinetry · In-house Design, Fabrication & Installation",

    floating_whatsapp_aria: "Message on WhatsApp",
    floating_call_aria: "Call Innovación Maderas now",
    floating_call_label: "Call Now",

    step_of: "Step {step} of {total}",
    sending: "Sending…",
    zip_invalid: "Enter a valid 5-digit ZIP code.",
    form_error_text: "We couldn't send your request. Try again or ",
    form_error_link: "email us",
    form_success_title: "Thank you! We've received your request.",
    form_success_subtitle: "A specialist from Innovación Maderas will contact you within 24 hours to schedule your free design consultation.",

    meta_title: "Custom Cabinetry in Brownsville TX | Innovación Maderas",
    meta_description: "Custom kitchens, wood paneling, and entertainment centers in fine wood, designed and built by Innovación Maderas. Serving Matamoros, Brownsville, Harlingen, and the entire Rio Grande Valley. Free design consultation.",
  },
};

let currentLang = localStorage.getItem(STORAGE_KEY) || "es";

/** Idioma activo actual ("es" | "en"). */
export function getLang() {
  return currentLang;
}

/** Traduce una clave, con reemplazo opcional de variables {nombre}. */
export function t(key, vars) {
  const dict = translations[currentLang] || translations.es;
  let str = dict[key] ?? translations.es[key] ?? key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      str = str.replaceAll(`{${k}}`, vars[k]);
    });
  }
  return str;
}

/** Aplica el idioma activo a todo el DOM marcado con data-i18n*. */
export function applyTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
  });

  document.title = t("meta_title");
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", t("meta_description"));

  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.querySelectorAll("[data-lang-option]").forEach((opt) => {
      opt.classList.toggle("is-active", opt.dataset.langOption === currentLang);
    });
  });
}

/** Cambia el idioma activo, lo guarda, y vuelve a aplicar las traducciones. */
export function setLang(lang) {
  if (lang !== "es" && lang !== "en") return;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations();
}

/** Conecta el/los botón(es) ES/EN de la página y aplica el idioma guardado. */
export function initLangToggle() {
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLang(currentLang === "es" ? "en" : "es");
    });
  });
  applyTranslations();
}
