# Base de Datos y Stickiness — Estrategia del Moat

> Este es el documento estratégico más importante del proyecto. La diferencia entre una agencia de chatbots descartable y una empresa con stickiness real está aquí: **el cliente no se va porque no puede irse fácilmente**. Esto es lo que justifica el ticket premium y la mensualidad recurrente.

---

## El concepto de stickiness (apego al sistema)

**Stickiness** = costo de cambio que el cliente percibe al considerar irse a un competidor.

| Sin stickiness | Con stickiness alto |
|----------------|---------------------|
| Cliente puede irse en 2 semanas | Cliente tarda 3–6 meses en migrar |
| El competidor más barato gana | El precio es secundario |
| Renegocia precio cada renovación | Renueva sin discutir |
| Ticket bajo posible | Ticket premium justificado |
| Ej: chatbots genéricos ($150–400/mes) | Ej: nuestro modelo ($2,200–$7,500/mes) |

**Lo que NO funciona:**
- Contratos con cláusulas penales abusivas (lo cancelan + nos demandan)
- Bloquear export de datos (ilegal en legal/contable, ético cuestionable)
- Esconder credenciales (genera resentimiento, lo gritan en redes)

**Lo que SÍ funciona — las 4 capas de lock-in:**

---

## Las 4 capas de lock-in (todas legítimas, todas valiosas)

### Capa 1 — Lock-in por VOLUMEN

> "Tengo 8,000 documentos clasificados aquí. Migrarlos a otro sistema es un proyecto de 4 meses."

**Mecánica:** cada cliente acumula gigabytes de documentos organizados, etiquetados, indexados. Cada archivo tiene metadata (fecha, tipo, categoría, cliente final, monto, palabras clave extraídas).

**Cómo se construye:**
- Cada documento que entra se procesa con Capa 2 del agente
- Se almacena en Supabase Storage con backup en S3
- Se le pone metadata estructurada
- Se enlaza a cliente final, caso/declaración, año, tipo

**Costo de cambio que genera:**
- Mes 6 con cliente: ~3,000 documentos
- Mes 12: ~8,000 documentos
- Mes 24: ~20,000 documentos
- Re-procesarlos en otro sistema = meses + miles de USD

---

### Capa 2 — Lock-in por CONTEXTO

> "Marco/Sofia conoce a mis clientes mejor que mi asistente humana. Migrar es empezar de cero."

**Mecánica:** el agente acumula memoria sobre cada cliente final del despacho:
- Idioma preferido
- Patrones de comunicación (ej: "Carlos siempre manda W-2 el 15 de febrero")
- Situación familiar / del caso (cambios relevantes históricos)
- Personalidad del cliente (paciente, ansioso, técnico, novato)
- Documentos típicos que sube
- Preguntas recurrentes
- Eventos importantes del histórico

**Cómo se construye:**
- Tabla `client_profile` en Supabase con campos estructurados
- Tabla `client_notes` con observaciones generadas por el agente automáticamente
- Cada conversación actualiza el perfil con lo aprendido
- Reportes mensuales hacen "summarization" del cliente

**Costo de cambio que genera:**
- Un sistema nuevo no sabe que el cliente Pérez tuvo un divorcio el año pasado (relevante para su declaración)
- No sabe que Lopez prefiere comunicación corta vs García que pide explicaciones largas
- Esa memoria se construye en 12+ meses de operación — no se exporta a un PDF

---

### Capa 3 — Lock-in por WORKFLOW

> "Mi día empieza abriendo el dashboard. Cambiar de sistema = re-entrenar a mi equipo entero."

**Mecánica:** el dashboard que el abogado/CPA usa diariamente se vuelve parte de su rutina. Empleados (asistentes, paralegals) están entrenados en él. El CRM físico-mental del despacho vive ahí.

**Cómo se construye:**
- Dashboard custom (Retool, Bubble, o app web propia) que muestra:
  - Vista de todos los clientes del despacho
  - Bandeja de "lo que necesita atención" diaria
  - Calendario unificado de citas y deadlines
  - Buscador full-text sobre toda la documentación
  - Reportes y métricas
  - Detalle de cualquier cliente con su historial completo
- El abogado/CPA lo usa 1–3 horas/día
- Sus empleados lo usan también
- Genera muscle memory operativa

**Costo de cambio que genera:**
- Cambiar = retraining de 4–10 personas
- Pérdida de productividad 30+ días durante transición
- Riesgo operativo en la transición (cliente importante se cae entre los dos sistemas)

---

### Capa 4 — Lock-in por INTEGRACIONES

> "Está conectado a mi QuickBooks, mi calendario y mi software de casos. Si me voy, todo eso se rompe."

**Mecánica:** integraciones bidireccionales con sistemas del cliente:
- **Contadores:** QuickBooks Online, Xero, Drake Software, sistemas de payroll (Gusto, ADP)
- **Abogados:** Clio, MyCase, PracticePanther, CASEpeer, Google Calendar, DocuSign
- **Universal:** Calendly, Stripe (cobranza), banco (importación de transacciones)

**Cómo se construye:**
- Cada integración es código real (no Make.com puro)
- Sync bidireccional: el dashboard refleja QuickBooks y vice versa
- Datos enriquecidos: lo que entra por el agente se complementa con lo que ya está en QuickBooks

**Costo de cambio que genera:**
- Migrar = romper todas las integraciones
- Re-configurar en sistema nuevo = $5,000–20,000 + 2–3 meses
- Esto solo se ofrece en paquete **Elite** (justifica el ticket alto)

---

## La tabla del moat por nivel de paquete

| Capa | Essential | Pro | Elite |
|------|-----------|-----|-------|
| **1 — Volumen** | ✅ Documentos almacenados (300/mes incluido) | ✅ + Indexación + búsqueda | ✅ + Backup automático S3 + retention 7 años |
| **2 — Contexto** | ✅ Perfil básico de cliente | ✅ + Memoria evolutiva + insights | ✅ + Análisis predictivo + detección de churn |
| **3 — Workflow** | ❌ (solo agente) | ✅ Dashboard básico | ✅ Dashboard avanzado + multi-usuario + roles |
| **4 — Integraciones** | ❌ | ❌ | ✅ Integración con software del cliente |

> **Cada capa que sube, sube el ticket Y la dificultad de migrar.** Esa es la fórmula.

---

## La regla ética inviolable: data ownership

**EL CLIENTE SIEMPRE PUEDE EXPORTAR SU DATA.** Esto va por escrito en el contrato.

Por dos razones:

### Razón 1 — Es legal y ético

- **Abogados:** ABA Model Rule 1.16(d) obliga a entregar archivos al cliente al terminar representación. Si bloqueamos export, exponemos al despacho a sanciones disciplinarias.
- **Contadores:** AICPA Code of Conduct y rules estatales de CPA exigen entrega de records del cliente. Bloquear = cliente nos demanda + AICPA investiga.
- **GDPR/CCPA:** aunque operemos USA, si tenemos data de personas en estados con privacy laws estrictos, el right to portability aplica.

### Razón 2 — Es estratégicamente correcto

Un cliente que **sabe que puede irse** se queda más tiempo. Genera confianza. Reduce ansiedad de la decisión de compra. Reduce objeción de "y si me arrepiento".

Cuando lo intentan exportar (raramente sucede), ven que tienen 8,000 archivos + miles de notas + workflow integrado, y deciden quedarse.

### Implementación del export

- Función "Export All" en el dashboard
- Genera ZIP con: todos los documentos, JSON estructurado de clientes, notas, calendario
- Tarda 6–24 horas en procesarse (no instantáneo, da tiempo a hablar con el cliente para entender por qué se va)
- Llega por email + WhatsApp con link de descarga
- **NO** se cobra por exportar (sería ilegal y mala publicidad)

---

## Arquitectura técnica del sistema

```
┌─────────────────────────────────────────────────────────┐
│                  DASHBOARD WEB                          │
│  (Lo que el abogado/CPA y staff usan diariamente)       │
│  Tech: Retool / Bubble / React custom                   │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ Read/Write API
                        │
┌───────────────────────▼─────────────────────────────────┐
│              SUPABASE (Postgres + Storage)              │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Tablas: clients, cases, documents, conversations,│   │
│  │ messages, appointments, deadlines, vendors,      │   │
│  │ tax_returns, contracts, client_notes, audit_log  │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Storage: PDFs, imágenes, documentos originales   │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Full-text search: PostgreSQL native              │   │
│  └──────────────────────────────────────────────────┘   │
└──────────┬─────────────────────┬────────────────────────┘
           │                     │
           │                     │
┌──────────▼──────────┐  ┌───────▼─────────────────────────┐
│  Make.com           │  │  Integraciones Elite (código)   │
│  (Orquestación de   │  │  - QuickBooks Online API        │
│  agentes y flujos)  │  │  - Clio API                     │
│                     │  │  - MyCase API                   │
│  Sofia / Marco /    │  │  - Google Calendar API          │
│  Logística          │  │  - Stripe API                   │
└─────────────────────┘  └─────────────────────────────────┘
           ▲
           │
           │  Conversaciones, documentos
           │
┌──────────┴──────────┐
│  Clientes finales   │
│  (WhatsApp / Web /  │
│  Email)             │
└─────────────────────┘
```

---

## Qué guarda cada vertical

Detalle técnico en archivos específicos:

- **Contadores (Marco):** ver [marco-contadores/base-de-datos.md](marco-contadores/base-de-datos.md)
- **Abogados (Sofia):** ver [sofia-abogados/base-de-datos.md](sofia-abogados/base-de-datos.md)
- **Logística:** se desarrolla en fase 2

---

## Roadmap de implementación

### Fase 0 (mes 1) — Cliente piloto: MVP funcional
- Tablas básicas en Supabase (las 6 mínimas del flujos.md)
- Storage para documentos sin organización avanzada
- Sin dashboard custom (usar Supabase Studio directamente)
- Lock-in real: ninguno aún. Esto es para validar el flujo

### Fase 1 (mes 2–3) — Schema completo + dashboard MVP
- Schemas extendidos por vertical (10–15 tablas)
- Document tagging automático por el agente
- Dashboard MVP en Retool ($10/mes user) — vistas básicas
- Lock-in: empieza a generarse (Capa 1 + parcial Capa 2)

### Fase 2 (mes 4–5) — Memoria evolutiva + búsqueda
- `client_profile` estructurado, actualizado por agente
- `client_notes` automáticas
- Full-text search sobre documentos
- Dashboard refinado con vistas operativas
- Lock-in: Capa 1 + Capa 2 + parcial Capa 3

### Fase 3 (mes 6–8) — Integraciones Elite
- Primera integración real: QuickBooks (contadores) o Clio (abogados)
- Sync bidireccional
- Dashboard con vista unificada
- Lock-in: las 4 capas activas para clientes Elite

### Fase 4 (mes 9–12) — Optimización
- Migración progresiva de Make.com a código propio para flujos críticos
- Dashboard custom (React app) reemplazando Retool
- Análisis predictivo (Capa 3 avanzada)
- Multi-tenant security (cada cliente ve solo su data)

---

## Costos asociados

| Fase | Tools adicionales | Costo/mes |
|------|-------------------|-----------|
| 0 | Supabase free tier | $0 |
| 1 | Supabase Pro + Retool | $25 + $10/usuario |
| 2 | + AWS S3 backup | + $5/cliente |
| 3 | + APIs específicas (QuickBooks, Clio) | $50–200/mes según volumen |
| 4 | Hosting custom dashboard (Vercel/Railway) | $20–100/mes |

**Costo total a escala (mes 12, 13 clientes activos):** ~$400–600/mes infraestructura. Despreciable vs MRR de $38K+.

---

## Argumento de venta basado en stickiness

Cuando un prospecto pregunte "¿qué los hace diferentes?":

> "Otros agentes responden mensajes. Nosotros construimos el cerebro de tu despacho. Cada documento, cada conversación, cada deadline se almacena en una base que **es tuya** — pero está organizada de una forma que ningún otro sistema ofrece. En 6 meses, [Sofia/Marco] conoce a tus clientes mejor que tu asistente nuevo. En 12 meses, tu día empieza con nuestro dashboard. **No te encadenamos — pero la mayoría no se va porque no quiere empezar de cero**."

Esa es la frase. Sin disfraz, sin trampa.

---

## Los 3 errores que matan la stickiness

1. **No tagear documentos al ingresar** → en mes 6 tienes 5,000 PDFs sin organizar = inútil = el cliente se va
2. **No actualizar `client_profile` con cada conversación** → la memoria se pierde = capa 2 nunca se construye
3. **Hacer el export imposible o caro** → cliente furioso = bad reviews = competidores te destruyen

Las 3 son evitables con disciplina técnica desde el día 1.

---

## Resumen ejecutivo

**El moat se construye con código + disciplina técnica, no con contratos.**

- Cliente que entra al mes 1 paga $2,500 setup + $2,200/mes
- Cliente que está en mes 12 tiene 10K documentos + 24 meses de contexto + workflow integrado
- **Ese cliente del mes 12 vale 5x el del mes 1** — y se cuida 5x más
- Tu negocio se vuelve **anti-frágil**: pierdes pocos clientes y los que tienes generan más cada año

Esta es la diferencia entre $38K MRR (si hay churn alto) y $80K MRR al mes 12 (si no hay churn). El stickiness no es un nice-to-have — es la diferencia entre un negocio promedio y uno excelente.
