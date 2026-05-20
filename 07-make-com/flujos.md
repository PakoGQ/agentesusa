# Flujos de Make.com

> Make.com es el orquestador. Cada flujo (en Make se llama "scenario") es una pieza independiente. Esta es la documentación de los 7 flujos core que necesita cada cliente. Un cliente nuevo se construye duplicando estos templates.

---

## Estructura general

```
[Trigger] → [Lógica de Make] → [Claude API] → [Lógica de Make] → [Salida]
```

Cada flujo tiene:
- **Trigger:** qué lo dispara (mensaje entrante, cron, webhook, etc.)
- **Steps:** módulos en orden
- **Output:** dónde llega el resultado
- **Error handling:** qué pasa si falla

---

## Flujo 1 — Recepción de mensajes (WhatsApp / Web / Email)

**Trigger:** Webhook de WhatsApp Business API / formulario web / email entrante

**Steps:**

1. **Webhook receptor** (entrada del mensaje)
2. **Router por canal**
   - Si WhatsApp → Path A
   - Si Web chat → Path B
   - Si Email → Path C
3. **Identificar al remitente** (lookup en Supabase)
   - Si existe: cargar contexto del cliente (historial, casos activos, paquete)
   - Si nuevo: crear registro en Supabase con `lead_status = new`
4. **Cargar conversación previa** (últimos 10 mensajes)
5. **Llamar a Claude API**
   - System prompt: el del agente correspondiente al despacho
   - Messages: historial + mensaje nuevo
   - Tools: si aplica (consultar calendario, buscar caso, etc.)
6. **Parsear respuesta de Claude**
   - Texto a enviar al cliente
   - Bloque `<axel_meta>` o `<sofia_meta>` con metadata interna
7. **Decisiones según metadata**
   - Si `urgent: true` → disparar Flujo 5 (escalación)
   - Si `appointment_requested: true` → disparar Flujo 3 (agendamiento)
   - Si `document_attached: true` → disparar Flujo 2 (procesamiento de documentos)
8. **Enviar respuesta al cliente** por el canal de origen
9. **Guardar mensaje + respuesta en Supabase**
10. **Actualizar last_interaction** del cliente

**Error handling:**
- Si Claude API falla 3 veces → mensaje de fallback al cliente: "Estoy procesando tu mensaje, te respondo en unos minutos." + alerta a Francisco
- Si WhatsApp API falla → reintento exponencial 3 veces, luego email al staff

---

## Flujo 2 — Procesamiento de documentos

**Trigger:** Detección de archivo adjunto en mensaje entrante

**Steps:**

1. **Recibir archivo** (URL temporal de WhatsApp / Drive / email)
2. **Detectar tipo** (PDF texto, PDF escaneado, imagen, Excel, Word)
3. **Convertir a texto procesable**
   - PDF texto: extraer directamente
   - PDF escaneado: enviar a Adobe PDF API o AWS Textract (OCR)
   - Imagen: AWS Textract o Claude Vision
   - Excel/Word: parser nativo de Make
4. **Enviar texto a Claude API** con system prompt específico de extracción para el sector
5. **Parsear respuesta estructurada** (JSON con campos extraídos)
6. **Validar consistencia**
   - ¿Suma de subtotal + sales tax = total?
   - ¿TIN/EIN válido (formato: 9 dígitos, XX-XXXXXXX para EIN)?
   - ¿Fechas razonables?
   - ¿Vendor con W-9 en archivo si pago acumulado >$600/año?
7. **Guardar resultado en Supabase**
8. **Notificar al cliente** ("Recibí tu W-2, lo procesé correctamente")
9. **Si hay inconsistencias o documento urgente:**
   - Inconsistencia menor → incluir en reporte semanal
   - Inconsistencia mayor o documento crítico → alerta inmediata al profesional
10. **Actualizar dashboard del cliente** (paquete Pro+)

**Error handling:**
- OCR falla → notificar al cliente "no pude leer este documento, ¿puedes mandarlo en mejor calidad o en otro formato?"
- Claude no logra extraer → escalar al staff con el documento para procesamiento manual

---

## Flujo 3 — Agendamiento de citas

**Trigger:** Llamada desde Flujo 1 cuando Claude detecta intención de agendar

**Steps:**

1. **Consultar calendario** (Google Calendar API o Calendly)
2. **Obtener slots disponibles** próximos 7 días
3. **Filtrar según preferencias** del cliente (modalidad, horario)
4. **Construir 2–3 opciones** y mandar a Claude para que las redacte naturalmente
5. **Enviar opciones al cliente**
6. **Esperar selección** (espera asíncrona, hasta 4 horas)
7. **Si responde:**
   - Crear evento en calendario
   - Enviar confirmación al cliente
   - Programar recordatorio 24h antes (Flujo 4)
   - Programar recordatorio 1h antes (Flujo 4)
   - Notificar al staff
8. **Si no responde en 4h:** mandar follow-up
9. **Si no responde en 12h:** escalar al staff

**Error handling:**
- Calendario sin slots disponibles → ofrecer agendamiento personalizado por staff
- Conflicto de horario → mostrar nuevas opciones automáticamente

---

## Flujo 4 — Recordatorios automáticos

**Trigger:** Cron cada 5 minutos

**Steps:**

1. **Query a Supabase:** ¿hay citas programadas en las próximas 24h o 1h?
2. **Para cada cita encontrada:**
   - Si es recordatorio de 24h: mandar mensaje + lista de documentos requeridos
   - Si es recordatorio de 1h: mandar mensaje + link/dirección
3. **Marcar como "recordatorio enviado"** en Supabase
4. **Si cliente responde con cancelación:** disparar flujo de re-agendamiento

**Plantillas:**

**24h antes:**
```
Hola [Nombre], te recuerdo tu cita mañana [día] a las [hora] con
[NOMBRE_PROFESIONAL] (modalidad: [presencial/video]).

Por favor lleva contigo:
• [Lista de documentos relevantes al tipo de caso]

Si por alguna razón no puedes asistir, avísame para reagendar.
```

**1h antes:**
```
[Nombre], te conectas con [NOMBRE_PROFESIONAL] en una hora.

[Si presencial:] Dirección: [dirección]
[Si video:] Link: [link de la videollamada]

Cualquier última pregunta, escríbeme aquí.
```

---

## Flujo 5 — Escalación urgente

**Trigger:** Llamada desde Flujo 1 cuando Claude marca `urgent: true`

**Steps:**

1. **Construir mensaje de alerta** con plantilla:
```
⚠️ URGENTE — [Cliente]
Motivo: [extracción]
Canal: [WhatsApp/Web/Email]
Hora: [timestamp]
Tel: [si aplica]
Conversación: [link a Supabase]
```
2. **Enviar por WhatsApp directo** al staff designado
3. **Enviar duplicado por email** (backup)
4. **Marcar conversación como `escalated_urgent`** en Supabase
5. **Esperar acuse de recibo** del staff (15 min)
6. **Si no hay acuse:** segunda alerta + llamada telefónica automática (Twilio)

**Categorías de urgencia:**

| Vertical | Categorías que disparan urgencia |
|----------|----------------------------------|
| Abogados | Audiencia <30 días, ICE, deportación, miedo extremo, queja, reembolso |
| Contadores | Carta IRS, audit, embargo, deuda fiscal cliente nuevo, queja, reembolso |
| Logística | Carga retenida, daño detectado, cliente furioso, queja formal |

---

## Flujo 6 — Reporte semanal

**Trigger:** Cron lunes 7:00 AM PST (8:00 AM para abogados)

**Steps:**

1. **Verificar paquete del cliente** (qué reporte generar)
2. **Query a Supabase:** métricas de la semana (lunes 00:00 a domingo 23:59)
3. **Construir contexto crudo:**
   - Conversaciones totales
   - Documentos procesados
   - Citas agendadas/realizadas
   - Alertas urgentes
   - Clientes con pendientes
4. **Llamar a Claude API** con system prompt + datos crudos + plantilla del reporte
5. **Renderizar email HTML**
6. **Enviar email** al staff designado
7. **Esperar 5 minutos**
8. **Construir versión WhatsApp resumida** (con Claude)
9. **Enviar WhatsApp resumido**
10. **Marcar reporte como entregado** en Supabase

**Variantes:**
- Modo temporada (contadores): reporte semanal más detallado, formato distinto
- Capa 3 mensual (Pro+): trigger adicional el primer lunes del mes
- Trimestral Elite: trigger adicional el primer lunes de cada trimestre

---

## Flujo 7 — Seguimiento proactivo

**Trigger:** Cron diario 10:00 AM PST

**Steps:**

1. **Query Supabase:** clientes sin actividad >7 días (configurable por vertical)
2. **Para cada cliente:**
   - Determinar contexto (caso activo, esperando documentos, post-cita, etc.)
   - Generar mensaje proactivo personalizado con Claude
3. **Validar:** ¿este cliente ya recibió follow-up en los últimos 3 días? Si sí, skip
4. **Enviar mensaje proactivo**
5. **Marcar `last_proactive_followup`** en Supabase
6. **Si responde:** continuar conversación normal vía Flujo 1
7. **Si no responde en 3 días:** segundo follow-up con tono más directo
8. **Si no responde después del segundo:** marcar como `dormant` y notificar al staff

---

## Cómo construir todo esto en Make.com (paso a paso)

### Pre-requisitos
1. Cuenta Make.com plan Core ($16/mes) — alcanza para 2–3 clientes
2. Cuenta Anthropic con API key activa
3. Cuenta WhatsApp Business API (vía Meta Business Suite)
4. Cuenta Supabase con base de datos creada
5. Cuenta Google Workspace para Calendar API

### Paso 1 — Crear escenario "Recepción de mensajes" (Flujo 1)
1. New scenario → Webhook → Custom webhook
2. Copiar URL del webhook (ahí apunta WhatsApp Business)
3. Agregar módulo HTTP → Make a request (a Claude API)
4. Agregar módulo Supabase → SELECT
5. Agregar módulo Router para los caminos
6. ... (continuar)

> **Recomendación:** Empezar por Flujo 1 funcionando solo con respuestas de Claude (sin documentos, sin escalación, sin reportes). Solo cuando ese flujo esté 100% operativo, agregar Flujo 2, etc.

### Paso 2 — Estructura de datos en Supabase

Tablas mínimas:

```sql
-- Clientes del despacho (los clientes finales del despacho)
CREATE TABLE clients (
  id UUID PRIMARY KEY,
  despacho_id UUID,  -- a qué despacho pertenece
  full_name TEXT,
  phone TEXT,
  email TEXT,
  language_preference TEXT,
  case_type TEXT,
  status TEXT,
  created_at TIMESTAMP,
  last_interaction TIMESTAMP
);

-- Conversaciones
CREATE TABLE conversations (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  channel TEXT,  -- whatsapp / web / email
  started_at TIMESTAMP,
  status TEXT
);

-- Mensajes
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id),
  direction TEXT,  -- inbound / outbound
  content TEXT,
  metadata JSONB,
  created_at TIMESTAMP
);

-- Documentos procesados
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  type TEXT,
  extracted_data JSONB,
  status TEXT,
  created_at TIMESTAMP
);

-- Citas
CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  scheduled_at TIMESTAMP,
  modality TEXT,
  status TEXT,  -- scheduled / confirmed / completed / cancelled
  reminder_24h_sent BOOLEAN,
  reminder_1h_sent BOOLEAN
);

-- Despachos (clientes nuestros)
CREATE TABLE despachos (
  id UUID PRIMARY KEY,
  name TEXT,
  vertical TEXT,  -- abogados / contadores / logistica
  package TEXT,  -- essential / pro / elite
  agent_name TEXT,
  config JSONB,  -- todo lo de config-despacho.md
  created_at TIMESTAMP
);
```

---

## Templates a guardar en Make.com

Cuando un cliente nuevo entra, en lugar de construir desde cero:

1. Duplicar los 7 escenarios de la cuenta "templates"
2. Renombrarlos con el nombre del cliente
3. Reemplazar variables (despacho_id, agent_name, system_prompt, número WA, etc.)
4. Test end-to-end

**Tiempo estimado para clonar a un cliente nuevo:** 4–6 horas (vs 30+ horas construyendo desde cero).

---

## Costos esperados de operaciones de Make.com

- **Plan Core:** 10,000 operations/mes — $16
- **Plan Pro:** 40,000 operations/mes — $32
- **Plan Teams:** 200,000 operations/mes — $96

**Estimación por cliente:**
- Despacho típico (200 clientes finales, 50 mensajes/día): ~3,000 operations/mes
- 3 clientes despacho → 9,000 ops → plan Core suficiente
- 7 clientes despacho → 21,000 ops → upgrade a Pro
- 13 clientes despacho (mes 6 según proyección) → ~39,000 ops → Pro al límite

> **Decisión a evaluar al mes 6:** migrar de Make.com a infraestructura propia con código (con socio técnico) si los costos por cliente vs operaciones se vuelven menos competitivos.
