// i18n.js — Sistema de idioma ES/EN.
// - Detecta el idioma del navegador en la primera visita.
// - Si el usuario ya eligió un idioma manualmente (botón ES/EN), esa
//   elección se guarda en localStorage y tiene prioridad siempre.
// - Aplica las traducciones a todo el DOM vía atributos data-i18n*.

import { TRANSLATIONS } from "./translations.js";

const STORAGE_KEY = "im_lang";
const SUPPORTED = ["es", "en"];

let currentLang = "es";
const listeners = new Set();

/**
 * Determina el idioma inicial:
 * 1. Preferencia manual guardada (localStorage) — máxima prioridad.
 * 2. Idioma nativo del navegador (navigator.language / languages).
 * 3. Español por defecto.
 */
function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch (err) {
    /* localStorage puede no estar disponible (modo privado, etc.) */
  }

  const browserLangs = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || navigator.userLanguage || "es"];

  for (const lang of browserLangs) {
    const code = (lang || "").toLowerCase();
    if (code.startsWith("en")) return "en";
    if (code.startsWith("es")) return "es";
  }

  return "es";
}

/**
 * Traduce una clave al idioma actual. Si falta la traducción, cae de
 * vuelta al español, y si tampoco existe, devuelve la clave misma para
 * hacer visible el faltante en desarrollo.
 */
export function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || (TRANSLATIONS.es && TRANSLATIONS.es[key])
    || key;
}

export function getLang() {
  return currentLang;
}

/**
 * Recorre el DOM aplicando las traducciones vigentes:
 * - data-i18n: reemplaza el texto (textContent) del elemento.
 * - data-i18n-html: reemplaza el HTML interno (para textos con enlaces).
 * - data-i18n-placeholder: atributo placeholder.
 * - data-i18n-aria-label: atributo aria-label.
 * - data-i18n-content: atributo content (usado en <meta>).
 * - data-i18n-title: usado en <title>, actualiza además document.title.
 */
function applyTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
  });

  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    el.setAttribute("content", t(el.getAttribute("data-i18n-content")));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const value = t(el.getAttribute("data-i18n-title"));
    el.textContent = value;
    if (el.tagName === "TITLE") document.title = value;
  });

  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.setAttribute("aria-label", t("nav.langToggle"));
    btn.querySelectorAll("[data-lang-option]").forEach((opt) => {
      opt.classList.toggle("is-active", opt.dataset.langOption === currentLang);
    });
  });

  // Avisa a otros módulos (main.js) para que regeneren texto dinámico
  // (mensajes de éxito/error, enlaces de WhatsApp, etc.).
  listeners.forEach((fn) => fn(currentLang));
  document.dispatchEvent(new CustomEvent("languagechange:im", { detail: { lang: currentLang } }));
}

/**
 * Suscribe una función que se ejecuta cada vez que cambia el idioma
 * (y una vez de inmediato con el idioma actual).
 */
export function onLanguageChange(fn) {
  listeners.add(fn);
  fn(currentLang);
}

export function setLanguage(lang, { persist = true } = {}) {
  if (!SUPPORTED.includes(lang) || lang === currentLang) {
    if (SUPPORTED.includes(lang)) return;
  }
  currentLang = SUPPORTED.includes(lang) ? lang : "es";

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, currentLang);
    } catch (err) {
      /* almacenamiento no disponible: la preferencia solo dura la sesión */
    }
  }

  applyTranslations();
}

function wireLangToggle() {
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(currentLang === "es" ? "en" : "es");
    });
  });
}

/**
 * Punto de entrada: detecta el idioma inicial, traduce el DOM y conecta
 * el botón ES/EN. Debe llamarse una vez, al cargar cada página.
 */
export function initI18n() {
  currentLang = detectInitialLanguage();
  applyTranslations();
  wireLangToggle();
}
