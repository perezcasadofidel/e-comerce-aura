# E-commerce de moda Aura

Tienda online de moda sostenible para mujer y hombre, fabricada con materiales reciclados y orgánicos. SPA 100% client-side: sin backend, con datos de productos simulados y estado global en React Context.

## Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (vía `@tailwindcss/vite`, tokens en `src/styles/theme.css`)
- **react-router 7** (`BrowserRouter`)
- **motion** (`motion/react`) para animaciones
- **lucide-react** para iconos
- Gestor de paquetes: **pnpm**

## Características

- Rutas reales con scroll-to-top en cada navegación.
- Carrito (bolsa): añadir desde cards y ficha de producto, cantidades, borrado y totales.
- Favoritos con drawer propio (quitar, añadir al carrito, ir al producto).
- Búsqueda en overlay con resultados en vivo sobre todo el catálogo.
- Filtros de tallas en los catálogos (sidebar en desktop, overlay inferior en mobile).
- Ficha de producto dinámica por slug con JSON-LD de tipo Product.
- Header transparente sobre el hero y menú hamburguesa en mobile.
- SEO: metadatos por ruta (`src/app/components/SEO.tsx`), Open Graph, canonical, `robots.txt`, `sitemap.xml` y JSON-LD (ClothingStore + WebSite).
- Responsive en todas las páginas y formulario de contacto (demo).

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/nueva` | Colección nueva |
| `/mujer` | Catálogo mujer |
| `/hombre` | Catálogo hombre |
| `/sostenibilidad` | Sostenibilidad |
| `/producto/:slug` | Ficha de producto |
| `/privacidad` | Política de privacidad |
| `/terminos` | Términos y condiciones |
| `/contacto` | Contacto |

Cualquier otra ruta redirige a `/`.

## Ejecución

```bash
pnpm install
pnpm dev
```

Servidor de desarrollo en Vite.

## Build

```bash
pnpm build
```

Genera el build estático en `dist/`. Es la única verificación disponible: no hay lint, typecheck ni tests, y no existe `tsconfig.json`, así que los errores de tipos solo aparecen en runtime.

## Estructura

```
src/
├── main.tsx              # Entry point
├── app/
│   ├── App.tsx           # Router + shell (header, drawers, main)
│   ├── store.tsx         # Estado global: carrito, favoritos, búsqueda
│   ├── data/products.ts  # Única fuente de datos (19 productos)
│   ├── pages/            # Una página por ruta
│   └── components/       # Header, Footer, drawers, ProductCard, SEO…
└── styles/               # theme.css (tokens) e index.css (imports)
public/                   # favicon.svg, robots.txt, sitemap.xml
```

## Convenciones

- Imports: `motion/react` (no framer-motion), `react-router` (no react-router-dom), iconos de `lucide-react`.
- Copy de la UI en español.
- No usar el alias `@/` (no está configurado).
- `pnpm-lock.yaml` es la fuente de verdad; no usar npm ni yarn.

## Notas

- `src/styles/globals.css` es código muerto: no se importa en ningún lado.
- `pnpm-workspace.yaml` impone `minimumReleaseAge: 10080` (rechaza paquetes publicados hace menos de 7 días).
