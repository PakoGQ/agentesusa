# Onboarding de Cliente Nuevo

> Proceso estructurado desde la firma del contrato hasta el go-live. **Total:** 14 días desde firma a agente operativo.

---

## Día 0 — Firma del contrato

**Acciones de Francisco:**
- [ ] Mandar contrato por DocuSign
- [ ] Mandar invoice del 50% del setup vía Stripe
- [ ] Confirmar recepción de pago en 48h
- [ ] Mandar email de bienvenida con link al calendario para agendar onboarding call

**Mensaje de bienvenida (template):**
```
Asunto: Bienvenido — siguientes pasos para arrancar tu agente

Hola [Nombre],

Gracias por confiar en nosotros. Tu agente para [despacho] es ahora
nuestra prioridad #1.

Próximos pasos:

1. Pago del 50% del setup ($[X]) — invoice enviada por Stripe
2. Llamada de onboarding (90 min) — agenda aquí: [Calendly]
3. Construcción del agente (7–14 días desde la llamada)
4. Una semana de tuning conmigo monitoreando todo
5. Go-live

Antes de la llamada, te pido preparar:
• Lista de preguntas más frecuentes que recibes de clientes
• 5–10 documentos típicos (con datos reales) que el agente debe procesar
• Acceso al calendario que usas para citas
• Lista de tus clientes activos (CSV o exportable)

Cualquier pregunta antes de la llamada, respondes este email y yo lo veo.

— Francisco
```

---

## Día 1–3 — Llamada de onboarding (90 min)

**Estructura de la llamada:**

### Parte 1 — Identidad (15 min)
- Confirmar nombre del agente (default: Sofia/Marco/[neutro])
- Validar tono y personalidad deseada
- Branding: logos, colores, firma de email

### Parte 2 — Operación (30 min)
- Llenar [config-despacho.md](../04-agentes-clientes/[vertical]/config-despacho.md) en vivo
- Mapear procesos actuales paso a paso
- Identificar canales activos (WhatsApp, email, web)
- Identificar qué se considera "urgente"

### Parte 3 — Documentos (20 min)
- Revisar 5–10 documentos típicos juntos
- Validar qué datos extraer
- Identificar formatos comunes (PDF texto, escaneado, foto, etc.)

### Parte 4 — Integraciones (15 min)
- Confirmar herramientas existentes
- Determinar qué integraciones aplican (paquete contratado)
- Recopilar accesos necesarios (read-only inicialmente)

### Parte 5 — Cierre (10 min)
- Confirmar fecha de go-live (Día 14 desde hoy)
- Confirmar próximos check-ins
- Mandar resumen escrito en 24h

---

## Día 4 — Resumen de onboarding al cliente

**Email con resumen:**
```
Asunto: Resumen de onboarding y plan de construcción

Hola [Nombre],

Resumiendo lo que acordamos ayer:

CONFIGURACIÓN DEL AGENTE
• Nombre: [Sofia / Marco / X]
• Canales: [WhatsApp / Web / Email]
• Idiomas: Español + Inglés (auto-detect)
• Horario de atención de tu despacho: [horario]

TU EQUIPO ESTÁ ESPERANDO
• [Nombre del staff que recibe alertas urgentes]
• Vía: [WhatsApp / Email]

DOCUMENTOS QUE EL AGENTE VA A PROCESAR
• [Listar tipos]

FECHAS CLAVE
• Hoy → Día 4: validación final del system prompt
• Día 5 → Día 12: construcción y tests internos
• Día 13: revisión contigo en pantalla compartida (60 min)
• Día 14: go-live

ACCESOS QUE NECESITO DE TI
• [Lista específica]

Cualquier corrección, respondes este email hoy mismo.

— Francisco
```

---

## Día 4–12 — Construcción técnica (sin involucramiento del cliente)

**Acciones del equipo (Francisco + Claude):**

- [ ] Llenar el system prompt con todas las variables del cliente
- [ ] Crear cuenta dedicada en Supabase para este cliente
- [ ] Configurar webhook de WhatsApp Business API
- [ ] Construir flujos de Make.com:
  - [ ] Recepción de mensajes
  - [ ] Procesamiento de documentos
  - [ ] Agendamiento
  - [ ] Reportes
  - [ ] Escalación urgente
- [ ] Pre-cargar lista de clientes existentes en Supabase (si aplica)
- [ ] Pre-cargar FAQs específicas del despacho
- [ ] Configurar plantillas de email/WhatsApp salientes
- [ ] Conectar calendario (Google Calendar / Calendly)
- [ ] Configurar OCR para documentos escaneados
- [ ] Cron jobs para reportes (semanal/mensual)

**Tests internos (Día 10–12):**
- [ ] Test conversacional: cliente nuevo solicita información
- [ ] Test conversacional: cliente existente pregunta estatus
- [ ] Test conversacional: agendamiento completo
- [ ] Test documental: procesar 5 documentos típicos del cliente
- [ ] Test escalación: simular situación urgente
- [ ] Test reporte semanal: trigger manual y verificar formato
- [ ] Test bilingüe: conversaciones en inglés y español

---

## Día 13 — Revisión en pantalla compartida (60 min)

**Estructura:**
1. **Demo del agente respondiendo en vivo** (15 min)
   - Mandar un WhatsApp al número de prueba
   - Mostrar respuesta del agente en tiempo real
2. **Demo de procesamiento de documento** (10 min)
   - Subir un documento típico
   - Mostrar extracción y reporte al cliente
3. **Demo de escalación** (10 min)
   - Simular caso urgente
   - Mostrar cómo llega la notificación
4. **Demo del reporte semanal** (10 min)
   - Trigger manual del reporte
   - Walkthrough del email
5. **Q&A y ajustes finales** (15 min)
   - Cliente identifica qué quiere ajustar
   - Lista de cambios para el día siguiente

---

## Día 14 — Go-live

**Acciones:**
- [ ] Implementar cambios solicitados en la revisión del día 13
- [ ] Switchear webhook a número real de WhatsApp del cliente
- [ ] Anunciar al cliente: "El agente está activo desde las [hora]"
- [ ] Mandar al cliente plantilla de email para anunciar a SUS clientes
- [ ] Mandar invoice del 50% restante del setup
- [ ] Mandar primer invoice de mensualidad (prorrateada al ciclo)

**Plantilla de anuncio del cliente a sus propios clientes:**
```
Hola [Nombre],

Tenemos buenas noticias. A partir de hoy contamos con [Sofia / Marco],
nuestra nueva asistente virtual que está disponible 24/7 por WhatsApp
y email para apoyarte en lo que necesites del despacho.

[Sofia/Marco] puede:
• Responder tus preguntas en español o inglés a cualquier hora
• Agendar tus citas
• Recordarte qué documentos necesitamos
• Confirmarte el estatus de tu caso

Si necesitas hablar conmigo directamente, sigue siendo posible —
[Sofia/Marco] me avisa cuando hay algo que requiere mi atención.

Pruébala. Solo escríbele al [número WhatsApp del despacho].

Saludos,
[Nombre del profesional]
```

---

## Días 15–21 — Semana de tuning intensivo

**Acciones de Francisco:**
- [ ] Revisar 100% de las conversaciones del agente cada día
- [ ] Ajustar system prompt según fricciones detectadas
- [ ] Detectar patrones de uso real (vs lo planeado)
- [ ] Llamada de check-in con el cliente al final del día 7
- [ ] Reporte de "primera semana" mostrando métricas y ajustes hechos

---

## Día 30 — Reunión de revisión

**Agenda (60 min):**
- Métricas reales vs expectativas
- Casos donde el agente brilló
- Casos donde el agente falló
- Ajustes mayores acordados
- Plan de próximos 60 días

**Output:** documento de "30-day review" archivado en la carpeta del cliente.

---

## Día 90 — Reunión estratégica

- Análisis de impacto: horas liberadas, documentos procesados, NPS de clientes finales
- Discusión de upgrade de paquete si aplica
- Solicitud de quote y caso de éxito formal
- Solicitud de referidos

---

## Errores comunes a evitar en onboarding

1. **No saltar la llamada de 90 min.** Es la base de un agente bueno. Si el cliente la quiere acortar, insistir.
2. **No prometer un go-live antes de 14 días.** El tuning necesita tiempo.
3. **No empezar con todos los canales activos.** Arranca con uno (WhatsApp), agrega los otros gradualmente en las primeras 2 semanas.
4. **No subestimar la pre-carga de datos.** Un agente sin contexto del cliente histórico se siente robótico.
5. **No dar acceso de admin a Make.com al cliente.** Solo lectura, dashboards.
