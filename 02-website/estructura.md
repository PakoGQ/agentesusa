# Estructura de la Página Web

**Herramienta:** Framer (plan gratuito al inicio, $14/mes con dominio propio)
**Idioma principal:** Inglés con toggle a español
**Tono:** Profesional, directo, confiado

---

## Las 10 secciones (en orden)

| # | Sección | Objetivo | Conversión |
|---|---------|----------|------------|
| 1 | Hero | Que se entienda en 5 seg qué hacemos y para quién | CTA → Demo / llamada |
| 2 | El problema | Que el visitante se sienta identificado | Empatía |
| 3 | Solución — 3 capas | Que entienda el diferencial | Educación |
| 4 | Demo en vivo | Que pruebe el agente ahora mismo | **MÁXIMA conversión** |
| 5 | Verticales | Que se reconozca por sector | Click profundo |
| 6 | Cómo funciona | Que vea los 4 pasos | Reduce fricción |
| 7 | Precios | Que sepa el rango | Filtra unfit |
| 8 | Diferenciadores | Que entienda por qué nosotros | Cierre racional |
| 9 | CTA final | Conversión | Agenda llamada |
| 10 | Footer | Navegación + legal | — |

---

## Notas de diseño

### Identidad visual

- **Colores:** Dark navy + blanco + accent azul eléctrico o teal
- **Fuente:** Sans-serif moderna (Inter, Outfit)
- **Estilo:** Limpio, generoso en whitespace, sin stock photos

### El elemento más importante

**El chat demo embebido (Sección 4) es el componente que más convierte.** Debe estar visible tanto en desktop como en mobile, sin scroll excesivo.

### Idioma

- Default: inglés
- Toggle visible en header arriba a la derecha
- Si el visitante selecciona español, todo el sitio cambia (incluyendo el chat demo)

### Mobile-first

LinkedIn outreach manda tráfico al móvil. El sitio debe verse perfecto en pantalla de 375px de ancho.

---

## Páginas

| Página | Ruta | Prioridad |
|--------|------|-----------|
| Home (10 secciones) | `/` | Mes 1 |
| For Immigration Law Firms | `/attorneys` | Mes 2 |
| For Accounting Practices | `/accountants` | Mes 2 |
| For Logistics Companies | `/logistics` | Mes 4 |
| Privacy Policy | `/privacy` | Mes 1 (legal) |
| Terms of Service | `/terms` | Mes 1 (legal) |

> **Las páginas por vertical son variantes del home:** mismas 10 secciones pero con copy y ejemplos específicos del sector. El demo de la sección 4 carga el system prompt correspondiente al sector.

---

## CTAs y eventos a trackear

| CTA | Destino | Evento |
|-----|---------|--------|
| "See it work for your business" | Demo embebido | `demo_started` |
| "Watch a 2-minute demo" | Modal con video | `video_played` |
| "Book your call with Francisco" | Calendly | `calendar_opened` |
| Vertical card click | Página vertical | `vertical_clicked` |
| Pricing tab | Cambia tabla | `pricing_viewed` |

> Tracking inicial con Plausible o Fathom (no Google Analytics — sobrecarga la página y no aporta vs estos en B2B de bajo volumen).

---

## Copy completo

Todo el copy listo para pegar en Framer está en [copy-secciones.md](copy-secciones.md).
