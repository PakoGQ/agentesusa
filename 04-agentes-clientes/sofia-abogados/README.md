# Sofia — Agente para Despachos de Abogados (modular)

> Sofia ya no es un solo agente. Es una **base universal** que se combina con módulos por **rama del derecho** y por **estructura del despacho** para crear una versión hecha a la medida de cada cliente.

---

## Cómo se arma un agente Sofia para un cliente

```
┌──────────────────────────┐
│  1. system-prompt-base   │  ← La parte universal (siempre se incluye)
└────────────┬─────────────┘
             +
┌────────────┴─────────────┐
│  2. ramas/[la-rama].md   │  ← Una o más ramas que ejerce el despacho
└────────────┬─────────────┘
             +
┌────────────┴─────────────┐
│  3. estructura-despacho/ │  ← La estructura del despacho del cliente
│     [tipo].md            │
└────────────┬─────────────┘
             +
┌────────────┴─────────────┐
│  4. config-despacho.md   │  ← Variables específicas (nombres, horarios, $)
│     llenado para cliente │
└──────────────────────────┘
```

El resultado es **un solo system prompt unificado** que se pega en Make.com.

Ver paso a paso en [como-armar-system-prompt.md](como-armar-system-prompt.md).

---

## Componentes disponibles

### Base universal
- [system-prompt-base.md](system-prompt-base.md) — Identidad, tono, idioma, agendamiento, límites legales, escalación. **Esto siempre va.**

### Módulos por rama del derecho

| Módulo | Para qué tipo de despacho |
|--------|---------------------------|
| [ramas/migratorio.md](ramas/migratorio.md) | Visa, green card, ciudadanía, deportación, asilo, DACA |
| [ramas/personal-injury.md](ramas/personal-injury.md) | Accidentes de auto, caídas, negligencia médica |
| [ramas/familiar.md](ramas/familiar.md) | Divorcio, custodia, manutención, adopción |
| [ramas/laboral.md](ramas/laboral.md) | Workers comp, wage theft, despido injustificado, EEOC |
| [ramas/mercantil.md](ramas/mercantil.md) | Formación de empresas, contratos, disputas comerciales, M&A pequeñas |

> Si un despacho ejerce **dos ramas** (común en abogados unitarios), se incluyen ambos módulos.

### Módulos por estructura del despacho

| Módulo | Para |
|--------|------|
| [estructura-despacho/abogado-unitario.md](estructura-despacho/abogado-unitario.md) | 1 abogado, sin asistente o con 1 asistente |
| [estructura-despacho/despacho-pequeno.md](estructura-despacho/despacho-pequeno.md) | 2–5 abogados |
| [estructura-despacho/despacho-mediano.md](estructura-despacho/despacho-mediano.md) | 5–20 abogados con partners y associates |

### Configuración por cliente

- [config-despacho.md](config-despacho.md) — Plantilla a llenar en la llamada de onboarding
- [reporte-semanal.md](reporte-semanal.md) — Plantilla del reporte semanal del lunes

### Base de datos y stickiness

- [base-de-datos.md](base-de-datos.md) — Schema completo de Supabase para Sofia
- [../base-de-datos-y-stickiness.md](../base-de-datos-y-stickiness.md) — Estrategia general del moat

### Canales add-on (Pro+)

- [../canales/canal-sms.md](../canales/canal-sms.md) — Módulo SMS con A2P 10DLC
- [../canales/canal-voz.md](../canales/canal-voz.md) — Módulo Voz con disclosure CA

---

## Casos de combinación frecuentes

| Tipo de cliente | Combinación |
|-----------------|-------------|
| Abogada migratoria solo | base + migratorio + abogado-unitario |
| Despacho de PI con 4 abogados | base + personal-injury + despacho-pequeno |
| Abogado familiar + laboral | base + familiar + laboral + abogado-unitario |
| Firma migratoria con 8 abogados | base + migratorio + despacho-mediano |
| Despacho mixto (mig + familiar + PI) | base + 3 ramas + despacho-mediano |
| Despacho corporativo bicultural | base + mercantil + despacho-pequeno |
| Abogado mercantil + laboral (small biz) | base + mercantil + laboral + abogado-unitario |

---

## Ramas pendientes (fase 2 — bajo demanda)

Se desarrollarán cuando llegue un cliente que la necesite:

- Penal / DUI
- Bankruptcy (quiebra)
- Civil (contratos, daños)
- Bienes raíces
- Tax law (ojo: solapa con Marco contadores)

---

## Tono y filosofía común a todas las variantes de Sofia

Independiente de la rama, Sofia siempre:

1. **Detecta idioma** (español/inglés) y mantiene el del primer mensaje
2. **Es empática y paciente** — clientes legales suelen estar en estrés
3. **NO da consejo legal** — siempre escala al abogado para la interpretación
4. **Detecta urgencias** y notifica al abogado al instante
5. **Es discreta con datos sensibles**
6. **Respeta confidencialidad** — nunca cruza información entre clientes
7. **Genera reportes semanales** al abogado/socio designado
