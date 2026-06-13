# Guía completa de instalación y operación del sistema
## Para los primeros 5-6 clientes — Francisco solo con Claude (sin asistencia técnica)

> Documento de referencia operativo. Ningún paso requiere código — todo es Make.com visual + system prompts.

---

## PARTE 1 — Cuentas que Francisco debe tener listas ANTES de vender

Se abren una sola vez y sirven para todos los clientes.

| Cuenta | Plan / Costo | Para qué |
|--------|--------------|----------|
| **Make.com** | Core $16/mes | Orquestador de todos los flujos. Cada cliente = sus propios "Scenarios" dentro de la cuenta |
| **Anthropic (Claude API)** | Tarjeta + $20 crédito inicial | Cerebro de los agentes. console.anthropic.com → API Keys (se muestra una sola vez, guardar). Costo real $20-25/cliente/mes |
| **Supabase** | Gratis para empezar | Memoria del agente: historial de conversaciones + datos de clientes. Un proyecto por cliente o tablas separadas |
| **360dialog** | ~$5/mes por número | Conector WhatsApp Business API ↔ Make.com (el más confiable). Alternativa: Twilio (más caro, más estable) |

**CRÍTICO:** La aprobación de WhatsApp Business API tarda **1-3 semanas**. Hay que iniciarla ANTES de cerrar al cliente, no después.

---

## PARTE 2 — Diagnóstico (lo que hay que sacar del cliente)

> DECISIÓN TOMADA: el diagnóstico NO lo hace Francisco por llamada. Lo hace **Axel en modo onboarding por WhatsApp** (ver memoria/flujo de Axel onboarding).

Datos a recopilar:

**Operación actual:**
- Número de clientes activos
- Cuántas personas responden mensajes
- Canales actuales (WhatsApp personal, email, teléfono)
- % español vs inglés
- Las 5 preguntas más frecuentes de sus clientes

**Herramientas actuales:**
- CRM/software (Clio, MyCase, QuickBooks, CONTPAQi, Excel, nada)
- Google Workspace o Microsoft 365
- Google Calendar o Calendly
- ¿WhatsApp Business separado del personal?

**Documentos:**
- Canal por el que llegan (WhatsApp, email, ambos)
- Dónde los guarda (Drive, Dropbox, físico)
- Volumen semanal aproximado

**Expectativas:**
- Qué quiere resolver primero
- Qué NO quiere que el agente maneje
- ¿Quiere ver todo o solo alertas urgentes?

---

## PARTE 3 — Las 5 situaciones reales de cliente

### Situación A — El más común: WhatsApp personal + Excel/Sheets, sin software
- Necesita **número de WhatsApp dedicado** (no el personal — el agente toma control de respuestas)
- Opción recomendada: SIM prepago T-Mobile/AT&T (~$10/mes). Google Voice tiene limitaciones con WhatsApp
- Registrar ese número con 360dialog
- Data de clientes se captura **manualmente en Supabase** durante onboarding
- Sin migración técnica — empieza limpio, aprende con los mensajes
- **Contratiempo:** querrá seguir respondiendo desde su personal. Explicar: si lo hace, hay dos conversaciones paralelas y se rompe todo

### Situación B — Abogado con Clio o MyCase
- Make.com tiene integración nativa con Clio
- Pedir acceso de **lectura** a Clio (no escritura al inicio)
- Sofia responde estatus real del caso sin que el abogado toque nada
- **Contratiempo:** Clio plan básico puede no tener API. Si no hay API → empezar sin integración, abogado actualiza estatus manual cada semana

### Situación C — Contador con QuickBooks
- Make.com integra con QuickBooks → exportar lista de clientes activos a Supabase (nombre, últimos 4 de SSN/RFC, tipo de declaración, estatus)
- Marco consulta Supabase y sabe qué documentos faltan
- Documentos llegan por WhatsApp → indexar en Drive con nombre estructurado: `ClienteNombre_W2_2025.pdf`
- **Contratiempo:** querrá que el agente vea montos/balances reales = Layer 3, segunda fase. Empezar con comunicación + documentos, no acceso financiero

### Situación D — Sistema propio o legacy (el más complicado)
- NO integrar con ese sistema en los primeros clientes
- Agente opera EN PARALELO. Supabase = fuente de verdad
- Equipo del cliente actualiza Supabase manual o vía Google Sheet sincronizado con Make.com
- Si insisten en integración inmediata → cobrar setup Elite + buscar socio técnico
- **Regla de oro:** si no se conecta con módulo nativo de Make.com, no se conecta todavía

### Situación E — Sin WhatsApp, clientes le escriben por email
- Make.com integra Gmail/Outlook — el agente responde emails (trigger = email nuevo)
- Responde desde `sofia@sudespacho.com` o similar
- Si solo tiene `@gmail.com` → se ve poco profesional, empujar a WhatsApp

---

## PARTE 4 — Construcción (días 1-14)

### Días 1-3: Setup y estructura base
- **Día 1:** Proyecto Supabase. Tablas: `clientes` (nombre, telefono, tipo_caso, estatus, idioma_preferido), `conversaciones` (cliente_id, mensaje, remitente, timestamp), `documentos` (cliente_id, tipo_doc, recibido, fecha). Scenario base en Make.com
- **Día 2:** Iniciar aprobación WhatsApp con 360dialog. Personalizar system prompt (Sofia/Marco) con: nombre despacho, profesional principal, horarios, tipos de caso, precio consulta, 5 FAQ con respuestas
- **Día 3:** Cargar datos iniciales de clientes (Excel del cliente → Supabase). Teléfonos en formato +1XXXXXXXXXX. Primeras pruebas con módulo HTTP a Claude API

### Días 4-7: Flujo principal en Make.com
```
TRIGGER: Webhook de 360dialog (mensaje WhatsApp)
  → MÓDULO 1: Extraer número + mensaje
  → MÓDULO 2: Buscar cliente en Supabase por teléfono
  → MÓDULO 3: Obtener últimas 10 conversaciones (memoria)
  → MÓDULO 4: HTTP POST a https://api.anthropic.com/v1/messages
       Headers: x-api-key + anthropic-version + content-type
       Body: system prompt + historial + mensaje nuevo
  → MÓDULO 5: Guardar respuesta en Supabase
  → MÓDULO 6: Enviar respuesta por WhatsApp (360dialog)
  → MÓDULO 7 (condicional): si hay palabras de urgencia → notificar al profesional
```

### Días 8-10: Pruebas con casos reales
- 20 conversaciones típicas (Claude las provee)
- Español, inglés, mezclado
- Casos urgentes → verificar notificación
- Flujo de documentos → mandar PDF, verificar confirmación
- Preguntas fuera de scope → verificar que escala

### Días 11-14: Ajuste y capacitación
- Corregir system prompt según pruebas
- Llamada 45 min con cliente: qué hace/no hace el agente, cómo llegan alertas, dónde ve el reporte semanal, cómo escalar info nueva

---

## PARTE 5 — Cómo opera el cliente día a día

**Cada mañana (5 min):** revisa alertas urgentes nocturnas + resumen de conversaciones nuevas (opcional)
**Cada semana (10 min):** reporte automático lunes 8am, leads calificados, actualizar estatus de casos (único trabajo manual)

**El cliente NO tiene que:** responder preguntas de estatus, perseguir documentos, confirmar citas, responder fuera de horario

**El cliente DEBE entender desde día 1:**
- El agente no es perfecto al inicio — semana 1 debe revisar respuestas, reportar errores a Francisco para ajustar prompt
- El agente no reemplaza juicio profesional (Sofia nunca da consejo legal, Marco nunca da cifras fiscales — siempre escalan)
- El número dedicado es sagrado — si responde desde el personal, se rompe el sistema

---

## PARTE 6 — Contratiempos frecuentes y solución

| Problema | Causa | Solución |
|----------|-------|----------|
| WhatsApp rechazó verificación | Meta requiere negocio verificado (web, dominio, docs) | El sitio web sirve para esto. Sin dominio: Namecheap $10/año. Si sigue: usar Twilio (3-7 días extra) |
| Agente respondió mal | System prompt incompleto o pregunta fuera de scope | Cliente manda screenshot → ajustar prompt → probar antes de publicar. Regla: agente dice "déjame consultarlo" antes que inventar |
| Cliente quiere memoria de hace 3 meses | Claude API no tiene memoria por defecto | Supabase guarda todo. Ajustar cuántos mensajes se mandan. Para histórico viejo: módulo Make.com busca y resume |
| Agente lento | Latencia normal 3-8s en la cadena | Log de Make.com dice dónde. Reducir historial (10→5). Revisar status de 360dialog. Verificar límite de operaciones del plan |
| Quiere contactar a 2,000 contactos | Entiende mal el agente como outreach masivo | WhatsApp PROHIBE envío masivo (ban permanente). Agente solo responde entrantes + recordatorios a quien ya inició. Dejar claro en contrato |
| Quiere pausar (vacaciones) | Miedo a no supervisar | Make.com pausa el Scenario con 1 clic, o "modo vacaciones" con mensaje automático |
| Quiere segundo agente (otro depto) | — | Segundo Scenario con prompt distinto. Mismo número: enrutar por palabras clave. Número distinto: proceso limpio con 360dialog |

---

## PARTE 7 — Qué incluye el setup que se cobra

Ejemplo: setup de $2,500 (contadores Pro) = ~21 horas de trabajo:

| Entregable | Horas |
|-----------|-------|
| Diagnóstico (vía Axel onboarding) | 1.5 |
| Configuración de cuentas | 3 |
| System prompt personalizado + pruebas | 4 |
| Carga de datos iniciales | 2 |
| Construcción del flujo en Make.com | 5 |
| Pruebas con 20 escenarios | 3 |
| Capacitación al equipo (45 min) | 1 |
| Ajustes post-lanzamiento semana 1 | 2 |
| **Total** | **~21 hrs** |

A $120/hr de valor de mercado = $2,520 → el precio de $2,500 es exacto. Con los primeros 2 clientes ya quedan los Scenarios base reutilizables → el tercer cliente toma la mitad del tiempo.

---

## Orden exacto para el primer cliente
```
Semana -2 (antes de cerrar): iniciar proceso WhatsApp con 360dialog
Semana -1: diagnóstico (Axel onboarding), definir system prompt base
Día 1:     Make.com + Supabase + conexión Claude API
Día 2-3:   carga de datos, pruebas internas
Día 4-7:   flujo completo
Día 8-10:  pruebas con casos reales
Día 11-12: ajustes al system prompt
Día 13:    capacitación al equipo
Día 14:    lanzamiento
Semana 3:  monitoreo diario + ajustes
```
