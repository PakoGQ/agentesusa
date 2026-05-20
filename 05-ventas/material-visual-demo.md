# Material Visual para Demo — Specs Completas

> Este documento es el **brief para Figma/Retool**. Cada elemento tiene contenido exacto, dimensiones, colores y notas de implementación. Un diseñador puede hacer todo en 4–8 horas. Tú mismo lo puedes hacer en Retool/Figma con templates en 10–15 horas.

---

## Identidad visual base (aplica a todo)

### Paleta de colores

| Uso | Color | Hex |
|-----|-------|-----|
| Background principal | Dark navy | `#0F172A` |
| Background secundario | Navy claro | `#1E293B` |
| Background card | Blanco | `#FFFFFF` |
| Texto principal sobre dark | Blanco | `#FFFFFF` |
| Texto principal sobre claro | Navy | `#0F172A` |
| Texto secundario | Gris medio | `#64748B` |
| **Accent primario** | Electric blue | `#3B82F6` |
| **Accent secundario** | Teal | `#14B8A6` |
| Alerta urgente | Red | `#EF4444` |
| Alerta tibia | Amber | `#F59E0B` |
| Success | Green | `#10B981` |
| Border | Gris claro | `#E2E8F0` |

### Tipografía

- **Headlines:** Inter Bold, 32–48px
- **Subheadings:** Inter Semibold, 18–24px
- **Body:** Inter Regular, 14–16px
- **Caption:** Inter Regular, 12px
- **Datos numéricos:** Inter Bold, tamaño según contexto

### Espaciado

- Padding card: 24px
- Gap entre cards: 16px
- Border radius: 12px (cards), 8px (botones)

---

# SLIDE 1 — Las 4 Capas del Moat

**Formato:** 16:9 (1920 × 1080 px) — para Keynote/PowerPoint en pantalla compartida
**Background:** Dark navy `#0F172A`

## Layout

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Headline (centrado, top, 60px desde arriba)                     │
│  "Why your clients won't leave"                                  │
│                                                                  │
│  Subheadline (centrado, 16px debajo del headline)                │
│  "4 layers that compound over time"                              │
│                                                                  │
│  ────────────────────────────────────────────────────────────    │
│                                                                  │
│  [Diagrama central — ver detalle abajo]                          │
│                                                                  │
│  ────────────────────────────────────────────────────────────    │
│                                                                  │
│  Footer (centrado, bottom, 40px desde abajo)                     │
│  "Your data is always yours. Export anytime, by contract."       │
│  (en gris claro, italic)                                         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## El diagrama central (lo más importante)

**Concepto:** 4 barras horizontales apiladas que **crecen** con el tiempo. Eje X = tiempo (de izquierda a derecha: Día 1 → Mes 6 → Mes 12 → Mes 24). Eje Y implícito = capas acumulándose.

```
                  Día 1      Mes 6      Mes 12     Mes 24
                  ─────────────────────────────────────────
Layer 4           ░░░░░░░░░░░░░░░░░░░░░ Integrations active (Elite)
INTEGRATIONS      Connected to QuickBooks, Clio, calendar, banking
                  ─────────────────────────────────────────
Layer 3           ░░░░░░░░░░░░░░░░░░░░░░░░░░░ Dashboard daily routine
WORKFLOW          Your team uses our dashboard 1-3 hrs/day
                  ─────────────────────────────────────────
Layer 2           ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Memory built
CONTEXT           AI knows each client (patterns, history, language)
                  ─────────────────────────────────────────
Layer 1           ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Documents
VOLUME            8,000+ tagged, indexed, searchable docs
                  ─────────────────────────────────────────
                                                  →
                                            Switching cost grows
```

### Especificaciones del diagrama

- **4 barras horizontales** apiladas verticalmente, cada una con altura 80px
- Cada barra arranca en X=0 (Día 1) y se extiende según cuándo se activa esa capa:
  - **Layer 1 (VOLUME):** arranca al Día 1, llega al final (color gradiente teal claro → teal oscuro)
  - **Layer 2 (CONTEXT):** arranca al Mes 1, llega al final (color azul claro → azul oscuro)
  - **Layer 3 (WORKFLOW):** arranca al Mes 2, llega al final (color púrpura claro → oscuro)
  - **Layer 4 (INTEGRATIONS):** arranca al Mes 4 (Elite), llega al final (color naranja claro → oscuro)
- **Texto en cada barra** (en blanco):
  - Lado izquierdo (60px padding): número + nombre de la capa en mayúsculas
  - Centro: descripción corta
  - Lado derecho: ícono representativo
- **Eje X con marcadores:** Día 1, Mes 3, Mes 6, Mes 12, Mes 24 (en gris claro debajo de las barras)
- **Flecha al final** apuntando a la derecha con texto "Switching cost grows" en accent color

### Íconos por capa

- Layer 1: 📄 (documento) o ícono custom de "documento apilado"
- Layer 2: 🧠 (cerebro) o ícono custom de "memoria"
- Layer 3: 📊 (dashboard) o ícono custom de "panel de control"
- Layer 4: 🔗 (enlaces) o ícono custom de "integración"

> Si usas íconos custom: Lucide icons o Heroicons funcionan bien con esta estética.

## Versión en español del mismo slide

Headline: "Por qué tus clientes no se van"
Subheadline: "4 capas que se construyen con el tiempo"

| Layer | Nombre ES | Descripción ES |
|-------|-----------|---------------|
| 1 | VOLUMEN | 8,000+ documentos clasificados e indexados |
| 2 | CONTEXTO | El agente conoce a cada cliente (patrones, historial, idioma) |
| 3 | WORKFLOW | Tu equipo usa nuestro dashboard 1–3 hrs/día |
| 4 | INTEGRACIONES | Conectado a QuickBooks, Clio, calendario, banco (Elite) |

Footer: "Tu data siempre es tuya. Export garantizado por contrato."

---

# MOCKUP 1 — Dashboard del Lunes en la Mañana

**Formato:** 1440 × 900 px (laptop estándar)
**Background:** Gris muy claro `#F8FAFC`
**Audiencia:** Esto es lo que el abogado/CPA ve al abrir el sistema cada lunes

## Layout (top a bottom, left a right)

```
┌────────────────────────────────────────────────────────────────────┐
│ ┌──────────┐  Welcome back, Carlos     [🔔 2]  [Avatar] [Settings] │
│ │ Logo     │  Monday, March 11, 2026                                │
│ │ Nexus    │                                                        │
│ └──────────┘                                                        │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ NEEDS    │  │ DOCS     │  │ DEADLINES│  │ NEW      │           │
│  │ ATTENTION│  │ PENDING  │  │ <7 DAYS  │  │ LEADS    │           │
│  │   5      │  │   12     │  │    3     │  │    2     │           │
│  │ clients  │  │ from 8   │  │ critical │  │ this week│           │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘           │
│                                                                    │
│  ┌──────────────────────────────────────┐  ┌────────────────────┐ │
│  │ 🔥 PRIORITY INBOX                    │  │ 📅 THIS WEEK       │ │
│  ├──────────────────────────────────────┤  ├────────────────────┤ │
│  │ 🔴 María Rodríguez                   │  │ TUE Mar 12         │ │
│  │    USCIS deadline in 4 days          │  │ 10:00 AM           │ │
│  │    Last contact: 8 days ago          │  │ José L. consultation│ │
│  │    [Review] [Contact]                │  │                    │ │
│  ├──────────────────────────────────────┤  │ WED Mar 13         │ │
│  │ 🟡 Roberto Méndez                    │  │ 2:30 PM            │ │
│  │    Missing 3 docs for tax return     │  │ Court hearing      │ │
│  │    Sofia has reminded 2x             │  │ García case        │ │
│  │    [Review] [Override reminder]      │  │                    │ │
│  ├──────────────────────────────────────┤  │ THU Mar 14         │ │
│  │ 🟡 Ana López                         │  │ 9:00 AM            │ │
│  │    Severance offer expires in 6 days │  │ Initial consult    │ │
│  │    [Review urgent]                   │  │ New lead - Mendoza │ │
│  ├──────────────────────────────────────┤  │                    │ │
│  │ 🟢 Carlos Hernández                  │  │ FRI Mar 15         │ │
│  │    Asked status 3x, response sent    │  │ S-Corp deadline 🚨 │ │
│  │    [View conversation]               │  │ 4 returns to file  │ │
│  ├──────────────────────────────────────┤  │                    │ │
│  │ 🟢 Patricia Ruiz                     │  └────────────────────┘ │
│  │    Document received: W-2 ✓         │                          │
│  │    [Approve & process]               │                          │
│  └──────────────────────────────────────┘                          │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ 📈 RECENT ACTIVITY (Sofia/Marco automated)                    │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │ 6:42 AM  Marco analyzed 3 receipts from Mendoza Construction │ │
│  │          Found: 1 duplicate, 1 vendor missing W-9 (alert sent)│ │
│  │ 5:18 AM  Marco sent reminder to Roberto M. (3rd time)        │ │
│  │ 11:32 PM Sofia answered status question from Ana López        │ │
│  │          Bilingual: Spanish (ES detected from message)        │ │
│  │ 8:50 PM  Sofia rescheduled García meeting (client requested) │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### Especificaciones detalladas

**Header (altura 64px):**
- Background: blanco con sombra sutil bottom
- Logo Nexus a la izquierda (32px alto)
- Centro: saludo + fecha
- Derecha: campana de notificaciones (con badge `2` en rojo), avatar circular, ícono settings

**KPI cards (4 cards horizontales, height 120px cada uno):**
- Background: blanco
- Borde sutil `#E2E8F0`
- Border radius 12px
- Padding 24px
- Layout interno:
  - Top: Label en gris (`#64748B`), 12px uppercase
  - Centro: número grande (48px Bold) en navy
  - Bottom: descripción 14px gris

**Priority Inbox (60% del ancho):**
- Background: blanco
- Header con ícono 🔥 + título "PRIORITY INBOX"
- 5 filas con divisores horizontales sutiles
- Cada fila:
  - Indicador circular a la izquierda (rojo/amber/verde según urgencia)
  - Nombre del cliente (Bold, 16px)
  - Razón de la alerta (gris, 14px)
  - Detalle adicional (gris claro, 12px)
  - 2 botones de acción a la derecha (estilo outline)

**This Week panel (40% del ancho):**
- Background: blanco
- Header con 📅 + "THIS WEEK"
- Lista de eventos por día con divisores
- Día en uppercase Bold (TUE), fecha debajo
- Hora destacada
- Tipo de evento + nombre

**Recent Activity feed (full width, bottom):**
- Background: blanco
- Lista cronológica reversa (más reciente arriba)
- Cada entrada:
  - Hora a la izquierda (gris, monospace)
  - Texto descriptivo de la acción
  - Texto en gris medio para acciones automatizadas

### Datos demo a usar

> **Importante:** estos nombres son ficticios pero realistas. Si el dashboard se construye con data real de un cliente, anonimizar antes de mostrar a otros prospectos.

Nombres latinos diversos (Carlos, María, José, Ana, Patricia, Roberto, Diego, Lucía).

---

# MOCKUP 2 — Vista Profunda de Cliente

**Formato:** 1440 × 900 px
**Audiencia:** Esto demuestra el lock-in por contexto (Capa 2). Es el más impactante para el demo.

## Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  [← Back to inbox]                                                 │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ 👤 María Rodríguez                                          │   │
│  │ Client since: March 2024 (24 months)  •  Status: Active     │   │
│  │ Language: Spanish  •  WhatsApp +1 213-XXX-1234              │   │
│  │                                                              │   │
│  │ [📞 Call] [✉ Message] [📅 Schedule] [📁 Documents] [Export] │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                    │
│  [Overview] [Documents (87)] [Communications (243)] [Cases] [Notes]│
│  ──────────                                                        │
│                                                                    │
│  ┌─────────────────────────┐  ┌──────────────────────────────────┐│
│  │ 📋 ACTIVE CASE           │  │ 🧠 SOFIA KNOWS ABOUT MARÍA      ││
│  ├─────────────────────────┤  ├──────────────────────────────────┤│
│  │ Type: I-130 Family       │  │ • Spanish-only communication     ││
│  │ Filed: Jan 2025          │  │ • Prefers WhatsApp over email    ││
│  │ Priority Date: Aug 2024  │  │ • Single mother, 2 children      ││
│  │ Status: Awaiting USCIS   │  │ • Husband died 2023              ││
│  │ Deadline: Mar 15 (4 days)│  │ • Anxiety: needs reassurance     ││
│  │                          │  │ • Always sends docs same day      ││
│  │ Last update: Receipt     │  │ • Asks status weekly              ││
│  │ notice received Feb 28   │  │ • Daughter is qualifying child    ││
│  │                          │  │   for asylum claim                ││
│  │ [View full case]         │  │ • Works as housekeeper, cash pay  ││
│  └─────────────────────────┘  └──────────────────────────────────┘│
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ 📅 KEY MOMENTS TIMELINE                                       │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │                                                                │ │
│  │  Mar 2024  ─●─  Initial consultation                          │ │
│  │  Apr 2024  ─●─  I-130 prepared                                │ │
│  │  Jun 2024  ─●─  Documents from Mexico received                │ │
│  │  Aug 2024  ─●─  I-130 filed (Priority Date set)              │ │
│  │  Oct 2024  ─●─  Initial receipt notice                        │ │
│  │  Dec 2024  ─●─  Husband passed (case adjusted to widow)      │ │
│  │  Jan 2025  ─●─  I-360 filed (VAWA path explored)             │ │
│  │  Feb 2025  ─●─  Latest update from USCIS                     │ │
│  │  Today    ─🔴─  Response due in 4 days                        │ │
│  │                                                                │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │ 📂 RECENT DOCUMENTS                                           │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │ [📄 USCIS Receipt Notice - 02/28/2026]    [View] [Download]  │ │
│  │ [📄 I-360 Application - 01/15/2025]       [View] [Download]  │ │
│  │ [📄 Death certificate - 12/03/2024]       [View] [Download]  │ │
│  │ [📄 Marriage certificate - 06/12/2024]    [View] [Download]  │ │
│  │ [📄 Birth certificate (daughter) - 06/12] [View] [Download]  │ │
│  │ ... 82 more documents                                          │ │
│  └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### Especificaciones detalladas

**Client header card (altura 140px):**
- Background: blanco con borde
- Avatar grande circular (64px) izquierda
- Nombre 28px Bold
- Metadata en línea separada por bullets centrados
- Botones de acción horizontales en una fila

**Tabs (altura 48px):**
- Subrayado en accent color para tab activa
- Counts en paréntesis para Documents, Communications

**Active Case card (50% width):**
- Background blanco
- Header con ícono + título uppercase
- Lista label/value compacta
- Status con color (azul para "awaiting", rojo para "deadline approaching")
- Botón "View full case" estilo primary

**🧠 SOFIA KNOWS card (50% width):** ← **ESTE ES EL MOMENTO MÁGICO DEL DEMO**
- Background blanco con **borde teal sutil** (highlight)
- Título "SOFIA KNOWS ABOUT MARÍA" — uppercase, accent color
- Lista de bullets con detalles ESPECÍFICOS y PERSONALES
- **Esto es lo que prueba que el agente conoce al cliente**
- Cuando muestres esto en demo, di: "esto es lo que un sistema nuevo NO sabría"

**Timeline (full width):**
- Línea horizontal con puntos
- Cada punto con fecha y descripción
- Punto actual destacado (rojo si hay urgencia)
- Las dates compactas, las descripciones más largas

**Recent Documents (full width):**
- Lista compacta
- Ícono PDF + nombre + fecha
- Botones View/Download alineados a la derecha
- "... XX more documents" link al final

### Datos demo a usar

Cliente ficticia con un caso real, con DEPTH:
- Detalles personales: nombre, situación familiar, idioma, pago en cash
- Detalles emocionales: anxiety, needs reassurance, asks weekly
- Detalles operativos: prefiere WhatsApp, manda docs same day
- Eventos vitales: viuda, hijos, cambio de path legal

> **Por qué este mockup es el más importante:** Cuando un prospecto ve la columna "SOFIA KNOWS", entiende inmediatamente que NO se puede migrar fácilmente. Esa columna es el switching cost made visible.

---

# MOCKUP 3 — Búsqueda Global de Documentos

**Formato:** 1440 × 900 px
**Audiencia:** Demuestra el lock-in por volumen (Capa 1). Convierte "tengo PDFs en Drive" a "tengo una base inteligente".

## Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ 🔍 [Search across 8,247 documents...                      ]│   │
│  └────────────────────────────────────────────────────────────┘   │
│  Searched: "medical bills 2024"                                    │
│  Found 47 results in 0.3s                                          │
│                                                                    │
│  ┌─────────────────┐  ┌─────────────────────────────────────────┐ │
│  │ FILTERS         │  │ RESULTS                                 │ │
│  ├─────────────────┤  ├─────────────────────────────────────────┤ │
│  │                 │  │                                         │ │
│  │ Type ▾          │  │ ┌─────────────────────────────────────┐│ │
│  │ ☐ Invoice (23)  │  │ │ [📄 PDF preview]                    ││ │
│  │ ☑ Medical (47)  │  │ │ Cedars-Sinai_Bill_2024-08-15.pdf    ││ │
│  │ ☐ W-2 (8)       │  │ │ ─────────────────────────────────── ││ │
│  │ ☐ 1099 (12)     │  │ │ Client: María Rodríguez             ││ │
│  │ ☐ IRS notice (3)│  │ │ Date: Aug 15, 2024                  ││ │
│  │                 │  │ │ Amount: $12,450.00                  ││ │
│  │ Year ▾          │  │ │ Type: Hospital invoice              ││ │
│  │ ☐ 2025          │  │ │ Tags: [PI case] [Auto accident]    ││ │
│  │ ☑ 2024          │  │ │                                     ││ │
│  │ ☐ 2023          │  │ │ Extracted by Sofia:                 ││ │
│  │                 │  │ │ • CPT codes: 99284, 73721           ││ │
│  │ Client ▾        │  │ │ • Treatment: ER + MRI               ││ │
│  │ ☐ All clients   │  │ │ • Insurance billed: $8,450          ││ │
│  │ ☑ Active cases  │  │ │ • Patient responsibility: $4,000    ││ │
│  │ ☐ Closed cases  │  │ │                                     ││ │
│  │                 │  │ │ [Open] [Download] [Add to lien tracker] ││
│  │ Tag ▾           │  │ └─────────────────────────────────────┘│ │
│  │ ☐ Auto accident │  │                                         │ │
│  │ ☐ Slip & fall   │  │ ┌─────────────────────────────────────┐│ │
│  │ ☑ PI case (47)  │  │ │ [📄 PDF preview]                    ││ │
│  │ ☐ Tax return    │  │ │ UCLA_Med_Center_2024-09-22.pdf      ││ │
│  │ ☐ Audit         │  │ │ ─────────────────────────────────── ││ │
│  │                 │  │ │ Client: Roberto Méndez              ││ │
│  │ Source ▾        │  │ │ Date: Sep 22, 2024                  ││ │
│  │ ☐ WhatsApp      │  │ │ Amount: $3,890.00                   ││ │
│  │ ☐ Email         │  │ │ Type: Outpatient visit              ││ │
│  │ ☐ Web upload    │  │ │ Tags: [PI case] [Slip & fall]      ││ │
│  │                 │  │ │ ...                                  ││ │
│  │ [Reset filters] │  │ └─────────────────────────────────────┘│ │
│  │                 │  │                                         │ │
│  └─────────────────┘  │ Showing 2 of 47. Load more →           │ │
│                       └─────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### Especificaciones detalladas

**Search bar (altura 56px, full width al top):**
- Background blanco con sombra sutil
- Ícono lupa a la izquierda
- Placeholder en gris
- Cuando hay resultados, muestra contador y tiempo de búsqueda debajo

**Filters sidebar (250px width, izquierda):**
- Background blanco
- Padding 24px
- Cada categoría como dropdown expandible
- Checkboxes con counts en paréntesis
- Botón "Reset filters" al final
- Filtros activos se muestran en accent color

**Results panel (full width remaining):**
- Cards de resultados verticales
- Cada card altura ~280px
- Layout interno:
  - Thumbnail del PDF a la izquierda (120×160px)
  - Metadata a la derecha
  - Sección "Extracted by Sofia/Marco" en accent teal — DEMUESTRA INTELIGENCIA
  - Botones de acción al bottom

### Por qué este mockup vende

El demo cuenta esta historia:

> "Buscas 'medical bills 2024' y aparecen las 47 facturas médicas de TODOS tus clientes con caso activo. Pero mira el bloque azul: 'Extracted by Sofia'. **El sistema ya leyó las facturas, sacó los CPT codes, calculó el monto del lien**. No es buscar en una carpeta de Drive. Es buscar en una base que ya entendió el contenido."

---

# MOCKUP 4 (BONUS) — Reporte Semanal en WhatsApp

**Formato:** 375 × 812 px (iPhone screen)
**Audiencia:** Demuestra que el output llega donde el cliente vive — su WhatsApp, no un email perdido.

## Layout

Captura de WhatsApp con el reporte semanal de Sofia o Marco. Esto se muestra en demo para enfatizar que **no necesitas abrir un dashboard si no quieres** — el resumen llega a donde estás.

```
┌──────────────────────────────────────┐
│  ← Sofia (Nexus AI)         📞  ⓘ   │
├──────────────────────────────────────┤
│                                      │
│  ┌─────────────────────────────────┐│
│  │ 📊 Weekly summary - Mar 4-10    ││
│  │                                 ││
│  │ 🔥 Need your attention today:  ││
│  │ • María R. - USCIS deadline    ││
│  │   in 4 days                    ││
│  │ • Roberto M. - Severance       ││
│  │   expires in 6 days            ││
│  │ • Ana L. - Asks for status     ││
│  │   3rd time                     ││
│  │                                 ││
│  │ 📈 This week:                  ││
│  │ • 23 new messages handled      ││
│  │ • 12 documents processed       ││
│  │ • 3 consultations scheduled    ││
│  │ • 0 leads lost                 ││
│  │                                 ││
│  │ 📅 Coming up:                  ││
│  │ Tue 10am - José L. consult     ││
│  │ Wed 2:30pm - García hearing   ││
│  │ Thu 9am - Mendoza intake       ││
│  │                                 ││
│  │ Full report → [link]            ││
│  │                                 ││
│  │  Sent by Sofia • 8:00 AM PST   ││
│  └─────────────────────────────────┘│
│                                      │
└──────────────────────────────────────┘
```

---

# Implementación recomendada

## Opción A — Diseñador en Figma (4–8 horas, $200–400)

Llevar este documento a un diseñador (Behance, Dribbble, Fiverr Top Rated) con brief:

> "Necesito 4 mockups de SaaS B2B para un dashboard. Tengo specs detalladas con paleta de colores, layout, contenido textual exacto y notas de implementación. Solo necesito traducir esto a Figma con visual quality alta. Iconos: usar Lucide o Heroicons. Tipografía: Inter."

Tiempo del diseñador: 1 día.

## Opción B — Tú mismo en Figma (10–15 horas)

Si quieres ahorrar:
- Empezar con templates gratis de Figma Community ("dashboard SaaS")
- Ajustar paleta y tipografía a la guía de arriba
- Reemplazar contenido textual con el de este documento
- Los mockups no necesitan ser perfectos — la prospección los ve 30 segundos cada uno

## Opción C — Retool real (12–20 horas)

Si quieres dashboards funcionales con data demo en lugar de imágenes:
- Crear Retool app con Supabase de prueba
- Poblar Supabase con ~15 clientes ficticios + 80 documentos demo
- Construir las 3 vistas como pages de Retool

**Ventaja:** durante demo puedes hacer click en cosas reales en lugar de explicar imágenes. Mucho más impactante.

## Opción D — Empezar simple, evolucionar

**Semana 1–2:** Slide 1 (las 4 capas) + 1 mockup estático del dashboard home (en Figma).
**Mes 2–3:** Los otros 2 mockups.
**Mes 4+:** Migrar a Retool funcional con data del primer cliente piloto (anonimizada).

> Mi recomendación: **Opción D**. No esperes a tener todo perfecto. Con el slide y 1 mockup ya puedes dar tu primer demo el lunes. Los demás los agregas según vas cerrando clientes.

---

# Cómo usarlos en el demo (recordatorio)

Ver flujo completo en [demo-stickiness.md](demo-stickiness.md). Resumen:

1. **Después del demo del agente respondiendo** (Etapa 4 de Axel), pivotar:
   > "Eso es solo una pieza. Lo que más importa es lo que se construye detrás."
2. **Mostrar Slide 1** (las 4 capas) — 1 minuto
3. **Mostrar Mockup 1** (Dashboard home) — 1.5 minutos
4. **Mostrar Mockup 2** (Vista de cliente) — 2 minutos, **enfatizar el bloque "SOFIA KNOWS"**
5. **Mostrar Mockup 3** (Búsqueda) — 1 minuto
6. **Cerrar con la frase ética** sobre export
7. **Pivotar al precio** conectando: "esto es lo que vale Pro a $X/mes"

Total tiempo: 5–7 minutos de demo visual.
