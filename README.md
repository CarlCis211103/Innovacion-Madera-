# Innovación Maderas — Sitio web

Estructura base para el sitio (landing page ahora, multipágina más adelante).
Tecnología: HTML, CSS y JavaScript puro. Sin frameworks ni build step, para
poder subir directo a GitHub Pages / Netlify / hosting estático cuando esté listo.

## Estructura de carpetas

```
innovacion-maderas/
├── index.html                 → Landing page (página de inicio)
├── pages/                     → Futuras páginas internas (nosotros, productos, contacto, etc.)
├── assets/
│   ├── css/
│   │   ├── variables.css      → Tokens de diseño (color, tipografía, espaciado)
│   │   ├── reset.css          → Reset base del navegador
│   │   ├── main.css           → Estilos globales compartidos
│   │   └── pages/             → Un archivo CSS por página (ej. home.css)
│   ├── js/
│   │   ├── main.js            → Punto de entrada JS
│   │   └── modules/           → Módulos futuros (animaciones, navegación, etc.)
│   ├── images/
│   │   ├── logo/              → Logotipo en sus distintas versiones
│   │   └── content/           → Fotografías de producto/proyectos
│   └── fonts/                 → Tipografías auto-hospedadas (si se decide no usar Google Fonts)
└── README.md
```

## Dirección visual (a partir del logotipo)

El logo es una silueta de árbol en negro sobre metal cepillado bronce/dorado.
Los tokens en `assets/css/variables.css` parten de ahí:

- **Negro cálido** `#0d0b09` — silueta, texto principal.
- **Bronce/dorado** `#a67c4e`, `#c9a86a`, `#e6cd9a` — degradado del metal, acentos.
- **Marfil** `#f4efe4` — fondo de secciones de lectura.
- **Tipografía**: `Fraunces` (display, con textura orgánica que evoca el grano
  de la madera) + `Work Sans` (texto, limpia y legible).
- Radios de borde casi nulos: materiales sólidos, cortes limpios, sin
  redondeos genéricos de "tarjeta SaaS".

## Próximos pasos

1. Construir el hero y las secciones de la landing page en `index.html`
   dentro de `home.css`, usando los tokens ya definidos.
2. Diseñar copy real (quiénes son, qué hacen, productos/servicios, contacto).
3. Agregar fotografías reales de producto en `assets/images/content/`.
4. Convertir `pages/` en páginas reales (ej. `pages/nosotros.html`,
   `pages/productos.html`, `pages/contacto.html`) reutilizando header/footer.
5. Incorporar animaciones (scroll reveal, micro-interacciones) en
   `assets/js/modules/` una vez esté el contenido base.
