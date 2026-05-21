# Nexus — Sitio Web Completo

> Esta es la **identidad oficial de la empresa**. Un sitio funcional, moderno, bilingüe y construido para comunicar filosofía y posicionamiento, no solo features.

---

## Cómo abrirlo

**Doble click en `index.html`** o desde terminal:

```bash
open /Users/pakogq/AgentesUSA/02-website/site/index.html
```

---

## Arquitectura del sitio (12 secciones)

| # | Sección | Mensaje |
|---|---------|---------|
| 1 | **Hero** | "La ventaja de IA que tu despacho merece" — gancho emocional con stats |
| 2 | **Misión** | Por qué existimos — democratizar IA enterprise para PyMEs |
| 3 | **Filosofía de Alianza** | No vendemos, construimos aliados. Long-term partnerships |
| 4 | **Lo que construimos** | Las 3 capas de inteligencia (Comunicación + Automatización + Inteligencia) |
| 5 | **Industrias** | Solo 3 verticales — abogados, contadores, logística |
| 6 | **Visión futura** | Timeline 2026-2030 — por qué construir ahora importa |
| 7 | **Diferenciadores** | 6 razones por qué Nexus (bicultural, founder-led, etc.) |
| 8 | **Demo en vivo** | Cards que linkean a los 4 mockups que ya construimos |
| 9 | **Precios** | Tabs por vertical (contadores/abogados/logística) con Essential/Pro/Elite |
| 10 | **Fundador** | Tu historia bicultural LA-Guadalajara |
| 11 | **CTA final** | Agenda llamada estratégica |
| 12 | **Footer** | Navegación + legal + contacto |

---

## Características técnicas

### Toggle bilingüe completo (EN/ES)
- Todos los textos están en `script.js` con clave `data-i18n`
- Switch instantáneo sin recargar
- Recuerda la preferencia en localStorage

### Pricing dinámico
- Tabs cambian entre Contadores / Abogados / Logística
- Los precios y nombre de integración Elite cambian automáticamente

### Animaciones
- Reveal on scroll con IntersectionObserver
- Orbs animados de fondo (CSS only — sin libs)
- Grid pattern sutil
- Smooth scroll entre secciones
- Nav transparente que se vuelve glass al scroll

### Responsive
- Funciona en desktop, tablet y mobile
- Tipografía y spacing se ajustan automáticamente

### Performance
- Sin frameworks pesados (vanilla JS + Tailwind CDN)
- Sin imágenes (todo SVG/CSS)
- Carga en <1 segundo en conexión decente

---

## Cómo modificar los textos

Todos los textos están centralizados en `script.js` dentro del objeto `translations`. Por ejemplo, para cambiar el hero:

```js
'hero.headline': {
  en: 'The AI advantage<br>your firm <span class="gradient-text">deserves.</span>',
  es: 'La ventaja de IA<br>que tu despacho <span class="gradient-text">merece.</span>'
}
```

Edita los strings, refresca el browser, listo.

---

## Cómo modificar precios

En `script.js`, busca `pricingData` y cambia los números:

```js
accountants: {
  essential: { monthly: '$1,200', setup: '$1,500' },
  pro: { monthly: '$2,200', setup: '$2,500' },
  elite: { monthly: '$3,800', setup: '$4,000' }
}
```

---

## Cómo agregar una sección nueva

1. Agrega el `<section>` en `index.html` siguiendo el patrón:
   ```html
   <section id="nueva-seccion" class="relative py-32 px-6 z-10">
     <div class="max-w-6xl mx-auto">
       <!-- contenido -->
     </div>
   </section>
   ```
2. Agrega los textos en `script.js` con claves nuevas
3. Agrega link en el nav si quieres

---

## Cómo cambiar la paleta de colores

En `index.html` dentro del `<style>` al inicio:

```css
:root {
  --bg: #0A0E1A;        /* fondo principal */
  --accent-1: #14B8A6;  /* teal */
  --accent-2: #3B82F6;  /* azul */
}
```

Más cambios en las clases de Tailwind a lo largo del HTML.

---

## La sección de Demo

La sección 8 (Demo en vivo) tiene **4 cards** que linkean directo a los mockups del producto:

- **Slide 4 Capas** → `../../05-ventas/material-visual-demo/slide-4-capas.html`
- **Dashboard Home** → `../../05-ventas/material-visual-demo/dashboard-home.html`
- **Client Detail** → `../../05-ventas/material-visual-demo/client-detail.html` (marcado como ⭐ Most impactful)
- **Document Search** → `../../05-ventas/material-visual-demo/document-search.html`

Cada card tiene un preview visual simplificado + link "Open demo →" que abre el mockup en nueva pestaña.

---

## Deploy a URL pública (cuando quieras compartir)

### Opción 1 — Netlify Drop (30 segundos)
1. Ve a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra **la carpeta `site/`** (no el archivo solo)
3. Te da URL `https://random-name.netlify.app`

### Opción 2 — Vercel (2 minutos)
1. Ve a [vercel.com/new](https://vercel.com/new)
2. Conecta GitHub o sube la carpeta directamente
3. URL: `https://nexus-site-xyz.vercel.app`

### Opción 3 — Dominio propio (cuando se decida nombre)
Una vez compres `nexus.ai` (o el nombre definitivo):
1. Apuntas el DNS a Netlify/Vercel
2. URL: `https://[tudominio].com`

---

## Tracking analytics (recomendado)

Cuando deployes, agrega Plausible o Fathom (privacy-friendly, no Google Analytics):

```html
<script defer data-domain="tudominio.com" src="https://plausible.io/js/script.js"></script>
```

Trackeo automático de:
- Visitas por página
- Clics en CTAs
- Conversión a "Book a call"
- Tiempo en cada sección

Costo: $9/mes Plausible (vale la pena).

---

## Migración futura a Framer (opcional)

Cuando hayas validado el sitio con clientes reales, puedes:

1. **Mantener este HTML** indefinidamente (es production-ready)
2. **O migrar a Framer** para tener panel de edición visual

**Mi recomendación:** mantén este HTML. Framer cobra $14-30/mes por algo que tú puedes hacer con este código + Vercel free. La única razón para migrar es si necesitas editar a diario sin tocar código — improbable.

---

## Diferencias vs. el copy original (`copy-secciones.md`)

| Aspecto | Copy original | Sitio nuevo |
|---------|---------------|-------------|
| Estructura | 10 secciones | 12 secciones |
| Mensaje central | Features y beneficios | Filosofía + visión + alianza |
| Tono | Profesional informativo | Premium + visionario |
| Sección de Misión | No existía | Sección dedicada |
| Filosofía de Alianza | No existía | Sección dedicada |
| Visión Futura | No existía | Sección con timeline 2026-2030 |
| Diferenciadores | 5 puntos | 6 puntos con narrativa más fuerte |
| Fundador | No existía | Sección dedicada con foto/cita |
| Demo | Chat embebido (no implementado) | Cards a mockups reales |
| Toggle EN/ES | Mencionado pero no implementado | Funcional |
| Pricing por vertical | Tabs (planeado) | Funcional |

---

## Próximos pasos sugeridos

1. **Abrir y revisar:** abre `index.html`, navega todo, toma notas de ajustes
2. **Refinar textos:** edita los strings en `script.js` según lo que sientas que falta
3. **Ajustar foto del fundador:** la sección "Fundador" tiene texto pero falta foto — agrega una de Francisco profesional
4. **Comprar dominio:** una vez decidas el nombre definitivo
5. **Deploy a Netlify:** para tener URL pública compartible con prospectos
6. **Calendly real:** cambia el href del CTA "Book a call" a tu link real de Calendly
7. **Email real:** cambia `contact@nexus.ai` por el real una vez tengas dominio + Mercury Bank

---

## Mockups del producto vs Sitio web

**Importante distinguir:**

- **Sitio web (esta carpeta):** la cara pública de Nexus para prospectos. URL futura: `nexus.ai` o equivalente.
- **Mockups del producto (`05-ventas/material-visual-demo/`):** lo que muestras durante la llamada de demo. NO es público — es interno para ventas.

El sitio LINKEA a los mockups en la sección de demo. Los prospectos los ven en pestaña nueva cuando hacen click.
