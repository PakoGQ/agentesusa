# Reporte Semanal — Sofia (Abogados Migratorios)

> Plantilla del reporte que Sofia envía cada lunes a las 8am al abogado. Ya viene generado automáticamente desde Make.com — esta plantilla es la referencia para personalizarlo por despacho.

---

## Plantilla del reporte (versión email + WhatsApp resumido)

### Asunto del email
```
[Sofia] Reporte semanal · [Nombre Despacho] · Semana del [DD] al [DD] de [Mes]
```

### Cuerpo del reporte

```
Buenos días [Nombre Abogado],

Aquí está el resumen de la semana en tu despacho.

═══════════════════════════════════════
RESUMEN DE LA SEMANA
═══════════════════════════════════════

📊 Actividad
• Nuevos leads recibidos: [N]
• Consultas agendadas: [N]
• Consultas realizadas: [N]
• Documentos analizados: [N]
• Alertas urgentes atendidas: [N]

📥 Distribución de leads por canal
• WhatsApp: [N]
• Sitio web: [N]
• Email: [N]
• Referidos: [N]

🏷️ Tipos de caso de leads nuevos
• [Tipo]: [N]
• [Tipo]: [N]

═══════════════════════════════════════
LEADS NUEVOS PENDIENTES DE ACCIÓN
═══════════════════════════════════════

[Si hay leads sin confirmar cita, listar:]

1. [Nombre] — [Tipo de caso] — [Canal]
   Urgencia: [URGENTE / NORMAL]
   Último contacto: [fecha y hora]
   Estado: [Esperando confirmación de cita / Sin responder hace X días]

═══════════════════════════════════════
CLIENTES CON DOCUMENTOS PENDIENTES
═══════════════════════════════════════

[Si hay clientes que no han enviado documentos solicitados:]

1. [Nombre] — [Caso] — Pendiente: [documentos faltantes]
   Días desde último recordatorio: [N]
   Recomendación: [Llamar / Mandar 3er recordatorio / Cerrar caso]

═══════════════════════════════════════
CLIENTES SIN ACTIVIDAD (+7 días)
═══════════════════════════════════════

[Lista de clientes que no han interactuado:]

1. [Nombre] — [Caso] — Última interacción: [fecha]

═══════════════════════════════════════
PRÓXIMA SEMANA — CITAS AGENDADAS
═══════════════════════════════════════

LUNES [fecha]
• [Hora] — [Nombre cliente] — [Modalidad: presencial/video] — [Tipo de caso]

MARTES [fecha]
• [Hora] — [Nombre cliente] — [Modalidad] — [Tipo de caso]

[continuar con cada día]

═══════════════════════════════════════
INSIGHTS DE LA SEMANA
═══════════════════════════════════════

[Sofia genera 1–3 observaciones útiles cada semana, ejemplos:]

• El 60% de los leads nuevos esta semana fueron sobre Green Card por matrimonio.
  Considera crear contenido específico sobre ese tipo de caso.

• Los clientes con casos de asilo están tomando en promedio 4 días en enviar
  documentos solicitados, vs 1.5 días en otros tipos de caso. Recomendación:
  ajustar protocolo de seguimiento para asilo.

• 3 clientes preguntaron por el costo de "ajuste de estatus" esta semana —
  considera incluir el rango en el sitio web para pre-calificar mejor.

═══════════════════════════════════════
ALERTAS DE LA SEMANA (LO URGENTE)
═══════════════════════════════════════

[Si hubo escalaciones urgentes esta semana, listar:]

⚠️ [Día] — [Nombre]: [Motivo]. Resuelto: [Sí/No/En proceso]

═══════════════════════════════════════

Cualquier pregunta sobre el reporte, respondes a este email y yo lo veo.

— Sofia
Asistente virtual de [Nombre Despacho]
```

---

## Versión WhatsApp (resumida, llega 5 min después del email)

```
Buenos días [Nombre]. Resumen rápido de la semana 👇

🔥 Lo más urgente:
[Si hay algo crítico, una línea]

📊 Números:
• [N] leads nuevos · [N] consultas realizadas
• [N] documentos analizados
• [N] alertas urgentes (todas atendidas)

📋 Pendiente de tu atención:
• [N] leads sin cita confirmada
• [N] clientes con documentos pendientes
• [N] sin actividad +7 días

📅 Esta semana: [N] consultas agendadas

Detalle completo en tu correo.
```

---

## Reportes adicionales según paquete

### Pro y Elite — incluye Capa 3 (mensual)

Primer lunes de cada mes, además del semanal:

```
═══════════════════════════════════════
DASHBOARD MENSUAL — [Mes Año]
═══════════════════════════════════════

📈 Tendencias del mes vs mes anterior
• Leads totales: [N] (vs [N] el mes anterior — variación %)
• Tasa de conversión lead → consulta: [X%]
• Tasa de conversión consulta → cliente: [X%]
• Tiempo promedio lead → primera consulta: [X días]

🎯 Por tipo de caso (ranking)
1. [Tipo]: [N] casos nuevos · [X%] conversión
2. [Tipo]: [N] casos nuevos · [X%] conversión

⚠️ Cuellos de botella detectados
• [Detección automática]

💰 Análisis de rentabilidad por tipo de caso
[Solo Elite]

🔮 Proyección próximo mes
• Leads esperados: [rango]
• Carga esperada: [rango de horas]
```

---

## Cómo configurar en Make.com

1. **Trigger:** Cron lunes 8:00 AM (zona PST)
2. **Step 1:** Query a Supabase para obtener métricas de la semana (rango: lunes anterior 00:00 a domingo 23:59)
3. **Step 2:** Llamar a Claude API con el system prompt de Sofia + datos crudos + instrucción "genera el reporte semanal con este formato"
4. **Step 3:** Render del email con HTML template
5. **Step 4a:** Enviar email vía Mailgun/Postmark al abogado
6. **Step 4b:** Enviar mensaje WhatsApp resumido 5 min después
7. **Step 5:** Marcar reporte como enviado en Supabase
