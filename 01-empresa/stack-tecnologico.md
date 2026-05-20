# Stack Tecnológico

## Herramientas core

| Herramienta | Rol | Costo | Cuándo usar |
|-------------|-----|-------|-------------|
| **Claude API (Anthropic)** | Cerebro de todos los agentes | ~$20–40/cliente/mes | Día 1 |
| **Make.com** | Orquestador visual de flujos | $16/mes | Día 1 |
| **WhatsApp Business API** | Canal principal de comunicación | ~$8–10/cliente/mes | Mes 2 |
| **Framer** | Página web de la empresa | $14/mes | Mes 1–2 |
| **Supabase** | Memoria persistente de los agentes | $0–25/mes | Cuando aplique |
| **Wave Accounting** | Contabilidad de la empresa | Gratis | Día 1 |
| **Mercury Bank** | Cuenta business USA | Gratis | Mes 1 |

---

## Cómo se conectan las piezas

```
Cliente (WhatsApp / Web / Email)
        ↓
   Make.com (recibe el mensaje, orquesta el flujo)
        ↓
   Claude API (lee el contexto + system prompt, genera respuesta)
        ↓
   Supabase (consulta/actualiza memoria del cliente)
        ↓
   Make.com (envía respuesta por el canal correcto)
        ↓
Cliente recibe respuesta
```

---

## Cómo lee documentos la Capa 2

1. **El documento entra:** Cliente sube PDF, imagen o archivo por WhatsApp/email/web.
2. **Make.com lo procesa:** Convierte PDF de texto a formato legible. PDFs escaneados requieren OCR (Adobe PDF API o AWS Textract).
3. **Claude API lo lee:** El system prompt define exactamente qué extraer. Claude devuelve la información estructurada en segundos.
4. **El resultado va donde debe ir:** Make.com toma la extracción y la manda al lugar correcto (Google Sheets, WhatsApp del profesional, CRM, QuickBooks).

---

## Costo operativo total estimado

| Concepto | Costo fijo | Variable por cliente |
|----------|-----------|---------------------|
| Make.com | $16/mes | — |
| Claude API | — | ~$20–25/cliente/mes |
| WhatsApp API | — | ~$8–10/cliente/mes |
| Framer + dominio | $14/mes | — |
| Registered Agent USA | $4/mes | — |
| Prospección/tools | $30/mes | — |
| Contingencia | $20/mes | — |
| **TOTAL** | **$84/mes fijo** | **~$30–35/cliente variable** |

---

## Decisiones técnicas tomadas

- **Make.com sobre Zapier:** mejor para flujos complejos con menor costo por operación.
- **Make.com sobre código propio (al inicio):** velocidad de iteración mientras no hay socio técnico full-time. Claude Code puede complementar después.
- **Wyoming LLC sobre Delaware:** menor costo, mayor privacidad, sin desventaja para B2B SaaS.
- **Mercury Bank sobre banco tradicional:** gratis, 100% online, optimizado para LLCs operando desde fuera de USA.

---

## Cuándo migrar a stack más técnico

Indicadores para evaluar incorporar código propio (no antes de tener al socio técnico activo):

- 10+ clientes activos
- Operaciones de Make.com superando 40,000/mes (límite del plan)
- Necesidad de integraciones que Make no soporta nativamente (TMS de logística, software contable mexicano)
- Latencia de respuestas creciendo por encima de 3–4 segundos
