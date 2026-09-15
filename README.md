# Innovación Maderas — Sitio web

Landing page de ebanistería especializada en maderas finas, orientada al
cliente residencial premium (B2C). HTML, CSS y JavaScript puro, sin
frameworks ni build step.

## Estructura de carpetas

```
innovacion-maderas/
├── index.html                  → Landing page principal (B2C)
├── pages/
│   └── profesionales.html      → Placeholder para B2B (arquitectos, contratistas, diseñadores)
├── assets/
│   ├── css/
│   │   ├── variables.css       → Tokens de diseño (color, tipografía, espaciado)
│   │   ├── reset.css           → Reset base del navegador
│   │   ├── main.css            → Header integrado, menú móvil, botones flotantes (compartido)
│   │   ├── effects.css         → Cursor personalizado, botones magnéticos, transición
│   │   │                          de página, microinteracciones y comparador antes/después
│   │   │                          (compartido por todas las páginas)
│   │   └── pages/home.css      → Estilos exclusivos de la landing page
│   ├── js/
│   │   ├── main.js             → Header al hacer scroll, formulario, WhatsApp, menú móvil
│   │   └── modules/
│   │       ├── cursor.js           → Cursor personalizado (punto + anillo con inercia)
│   │       ├── magnetic.js         → Atracción magnética en botones (.btn, .floating-btn)
│   │       ├── parallax.js         → Parallax sutil del árbol de fondo del hero
│   │       ├── pageTransition.js   → Cortina de transición al navegar entre páginas
│   │       └── beforeAfter.js      → Comparador antes/después (arrastre + teclado)
│   ├── images/
│   │   ├── logo/                → Logotipo
│   │   └── content/              → Fotos/renders reales de proyectos (pendiente)
│   └── fonts/
└── README.md
```

## Posicionamiento

Ebanistería especializada — no carpintería de construcción genérica.
Diseñamos, fabricamos e instalamos con equipo propio: cocinas a la medida,
walk-in closets y centros de entretenimiento en maderas finas, para clientes
residenciales de alto nivel en Matamoros, Brownsville, Harlingen, McAllen,
San Juan y el resto del Valle del Río Grande.

Esta página está centrada en el cliente B2C (propietarios). La ruta B2B
(arquitectos, diseñadores, contratistas, constructores) tendrá su propia
experiencia dedicada en `pages/profesionales.html`, que hoy es un
placeholder de "próximamente" con contacto directo.

## Dirección visual

- **Hero tipo showroom**: fondo casi negro con resplandor dorado difuso
  (`--surface-showroom`), en vez de metal brillante a pantalla completa —
  más acorde a un posicionamiento de lujo.
- **Header integrado**: transparente sobre el hero, se vuelve sólido con
  leve desenfoque al hacer scroll (`assets/js/main.js → wireHeaderScroll`).
  En páginas sin hero oscuro, agregar `data-force-solid="true"` al
  `<header class="site-header">` para que aparezca sólido desde el inicio
  (ya aplicado en `pages/profesionales.html`).
- **Paleta**: negro cálido, bronce y dorado (del logotipo), marfil para
  lectura. Tipografía `Fraunces` (display) + `Work Sans` (texto).
- **Servicios presentados de forma editorial**, no como grid de specs:
  cada tarjeta de servicio tiene una imagen protagonista + descripción.
- **Muestrario de maderas** y **franja de renders 3D** como diferenciadores
  visuales, alineados al modelo de comercialización de la marca.
- **Capa de interacción** (`effects.css` + `assets/js/modules/`): cursor
  personalizado, botones magnéticos, parallax sutil en el hero, transición
  de cortina entre páginas y un comparador antes/después interactivo en la
  franja de renders. Todo se desactiva automáticamente en pantallas
  táctiles y con `prefers-reduced-motion`, sin afectar la funcionalidad.

## Elementos de conversión

- Formulario del hero: nombre, teléfono, email, código postal, servicio.
- Botón de WhatsApp junto al formulario (mensaje pre-armado según el
  servicio seleccionado).
- Botones flotantes de **llamada** y **WhatsApp**, visibles en todo momento
  (`assets/css/main.css → .floating-actions`).
- Las tarjetas de servicio, al hacer clic, preseleccionan la opción en el
  formulario y hacen scroll hacia él.

## Pendiente antes de publicar

- **Contacto real**: editar el objeto `CONTACT` en `assets/js/main.js`
  (teléfono, WhatsApp) y el correo en el footer de `index.html` y
  `pages/profesionales.html`.
- **Envío del formulario**: hoy solo simula el envío en el navegador
  (bloque marcado con `NOTA` en `main.js`). Conectar a Formspree, Netlify
  Forms o backend propio.
- **Fotografías/renders reales**: reemplazar los placeholders de
  `.service-feature__media` y `.portfolio-card` (actualmente degradados de
  color) por fotografías o renders reales de proyectos.
- **Subpágina de profesionales**: `pages/profesionales.html` es un
  placeholder; construir la experiencia B2B completa (portafolio técnico,
  capacidades de fabricación, proceso de trabajo conjunto) como siguiente
  fase.
- Confirmar si la marca se escribe "Innovación Madera" (como en el modelo
  de comercialización) o "Innovación Maderas" (como en el sitio actual) —
  hoy el sitio usa la versión en plural.

## Próximos pasos sugeridos

1. Sustituir placeholders visuales por fotografía/renders reales.
2. Conectar el formulario a un sistema real de captación de leads.
3. Construir `pages/profesionales.html` como experiencia B2B completa.
4. Considerar version en inglés dado el mercado bilingüe (RGV).
