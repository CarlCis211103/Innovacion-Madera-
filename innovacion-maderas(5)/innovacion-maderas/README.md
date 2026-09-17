# Innovación Maderas — Sitio web

Landing page de ebanistería especializada en maderas finas, orientada al
cliente residencial premium (B2C). HTML, CSS y JavaScript puro, sin
frameworks ni build step.

## Estructura de carpetas

```
innovacion-maderas/
├── index.html                  → Landing page principal (B2C)
├── sitemap.xml                 → Mapa del sitio para Google Search Console
├── robots.txt                  → Reglas de rastreo
├── pages/
│   └── profesionales.html      → Placeholder para B2B (arquitectos, contratistas, diseñadores)
├── assets/
│   ├── css/
│   │   ├── variables.css       → Tokens de diseño (color, tipografía, espaciado)
│   │   ├── reset.css           → Reset base del navegador
│   │   ├── main.css            → Header integrado, menú móvil, botones flotantes (compartido)
│   │   └── pages/home.css      → Estilos exclusivos de la landing page
│   ├── js/
│   │   ├── main.js             → Header al hacer scroll, formulario, WhatsApp, menú móvil
│   │   └── modules/            → Para futuros scripts (animaciones adicionales)
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

## SEO técnico

Implementado a partir de la auditoría SEO adaptada (originalmente hecha para
un sitio de roofing en el mismo mercado — Brownsville/RGV — y traducida al
rubro de ebanistería/millwork):

- **Title y meta description** con fórmula servicio + ciudad en `index.html`
  y `pages/profesionales.html`.
- **H1 con señal geográfica** en el hero (`Ebanistería a la Medida en
  Brownsville y el Valle del Río Grande`); el copy emocional original se
  conservó como texto de apoyo (`lede`).
- **Jerarquía H2** revisada en cada sección para incluir el servicio o la
  zona, sin perder el tono editorial del sitio.
- **`LocalBusiness` schema** (`HomeAndConstructionBusiness`) en `index.html`,
  con `areaServed` para las 5 ciudades que cubre la marca.
- **Imagen renombrada** de `hero-kitchen.jpg` a
  `cocina-a-la-medida-matamoros-brownsville-tx.jpg`, con `alt` descriptivo
  y geolocalizado en sus 3 usos (poster del hero, servicios, portafolio).
- **`sitemap.xml`** y **`robots.txt`** en la raíz del proyecto.

### Pendiente para que el SEO técnico esté completo (requiere datos reales)

- **Dominio profesional**: todas las URLs (`canonical`, `sitemap.xml`,
  `robots.txt`, `url`/`logo`/`image` del schema) usan
  `https://www.innovacionmaderas.com/` como placeholder — están marcadas con
  `TODO` en el código. Reemplazar en cuanto el dominio esté conectado y
  enviar el sitemap actualizado en Google Search Console.
- **Dirección física o área de servicio formal** para el schema
  (`address` no se incluyó por no tener un dato real todavía).
- **Google Business Profile**, consistencia NAP en directorios y redes
  (`sameAs` del schema quedó vacío).
- **Páginas de servicio dedicadas** (`/cocinas-a-la-medida-brownsville-tx/`,
  etc.) — quedaron fuera de este pase porque el catálogo de servicios va a
  actualizarse antes; se retoman cuando eso esté definido.

## Próximos pasos sugeridos
1. Sustituir placeholders visuales por fotografía/renders reales.
2. Conectar el formulario a un sistema real de captación de leads.
3. Construir `pages/profesionales.html` como experiencia B2B completa.
4. Considerar version en inglés dado el mercado bilingüe (RGV).
5. Conectar dominio profesional y actualizar los `TODO` de SEO (canonical,
   sitemap, schema), luego enviar el sitemap en Google Search Console.
