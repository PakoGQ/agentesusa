# Configuración por Despacho — Marco (Contadores)

> Este es el formulario que se llena con cada nuevo cliente contador. Una vez completado, sus datos reemplazan los placeholders en el [system-prompt.md](system-prompt.md).

---

## Datos a recopilar en la llamada de onboarding (90 min)

### Sección 1 — Identidad del despacho

- **Nombre legal del despacho:**
- **Nombre comercial:**
- **Nombre del CPA principal:**
- **Otros contadores del equipo:**
- **Nombre que tendrá el agente** (default: Marco):
- **Sitio web:**

### Sección 2 — Servicios que ofrece

- [ ] Declaraciones individuales (Form 1040)
- [ ] Declaraciones de empresa (Form 1120, 1120-S, 1065)
- [ ] Contabilidad mensual / bookkeeping
- [ ] Nómina (payroll)
- [ ] Formación de empresas (LLC, S-Corp)
- [ ] ITIN — solicitud y renovación
- [ ] Representación ante el IRS (Form 2848)
- [ ] Planeación fiscal
- [ ] Auditorías
- [ ] Otro: __________

### Sección 3 — Software contable

- [ ] QuickBooks Online (más común)
- [ ] QuickBooks Desktop
- [ ] Xero
- [ ] Wave
- [ ] FreshBooks
- [ ] Sage 50 / Sage Intacct
- [ ] NetSuite
- [ ] Drake Software (tax prep)
- [ ] Lacerte (tax prep)
- [ ] ProSeries (tax prep)
- [ ] UltraTax CS
- [ ] Otro: __________

**¿Necesita integración con el software?** (Elite package)
  - [ ] Sí — qué necesita exportar:
  - [ ] No — Marco entrega resúmenes en Google Sheets

### Sección 3.1 — Software de payroll (si maneja nómina)

- [ ] Gusto
- [ ] ADP
- [ ] Paychex
- [ ] QuickBooks Payroll
- [ ] OnPay
- [ ] No maneja payroll directamente

### Sección 4 — Operación

- **Horario de atención** (zona Pacífico):
  - Temporada (ene–abr):
  - Fuera de temporada:
- **Idioma principal de comunicación:**
  - [ ] Español dominante
  - [ ] Inglés dominante
  - [ ] 50/50
- **Canales activos:**
  - [ ] WhatsApp Business — Número:
  - [ ] Email — Dirección:
  - [ ] Sitio web — Chat embebido
  - [ ] Teléfono fijo:

### Sección 5 — Consulta inicial

- **Duración:** ⌐ 20 min ⌐ 30 min ⌐ 60 min
- **Costo de consulta inicial:** $______ (default: gratis primeros 20 min)
- **Modalidades:**
  - [ ] Presencial
  - [ ] Videollamada
  - [ ] Telefónica
- **Política de pago:**

### Sección 6 — Volumen de operación

Crítico para dimensionar el agente y la tarifa por volumen:

- **Número de clientes activos individuales:**
- **Número de clientes activos empresariales:**
- **Estimado de facturas procesadas al mes (fuera de temporada):**
- **Estimado de facturas procesadas al mes (en temporada — abril):**
- **Cartas del IRS recibidas en el último año:**
- **Auditorías manejadas en el último año:**

### Sección 7 — Fechas clave del año fiscal

Estas las debe confirmar el CPA porque varían por estado y tipo de cliente:

- **Federales que aplican:**
  - 31 enero — W-2 enviados
  - 15 abril — Federal individuales
  - 15 marzo — Sociedades (S-Corp, partnerships)
  - 15 abril — C-Corp
  - 15 octubre — Extensiones
- **Estatales relevantes** (California por default):
  - 15 abril — California individuales
  - Otros: __________

### Sección 8 — Protocolo de cartas del IRS

- **Quién recibe alertas urgentes (cartas IRS, audits):**
- **Cómo prefiere recibirlas:**
  - [ ] WhatsApp directo al CPA
  - [ ] Llamada telefónica
  - [ ] Email + WhatsApp
- **Qué considera "urgente" para este despacho:**
- **Tiempo de respuesta esperado:**

### Sección 9 — CRM y herramientas existentes

- **¿Usa algún CRM?**
  - [ ] No — solo email + Excel
  - [ ] Sí: __________
- **¿Usa herramienta para recolectar documentos?**
  - [ ] TaxDome
  - [ ] SmartVault
  - [ ] Drake Documents
  - [ ] Solo email/Drive
  - [ ] Otro: __________

### Sección 10 — Reportes

- **Día y hora del reporte semanal en temporada:** (default: lunes 7am)
- **Día del reporte mensual fuera de temporada:** (default: primer lunes)
- **A qué emails llega:**
- **Qué prefiere ver primero** (priorización del reporte):
  - [ ] Lo urgente (alertas)
  - [ ] Los números (métricas)
  - [ ] Los pendientes (clientes sin documentos)

---

## Datos para inyectar al system prompt

| Placeholder | Valor para este despacho |
|-------------|--------------------------|
| `[NOMBRE_DESPACHO]` | |
| `[NOMBRE_CPA]` | |

---

## Documentos a entregar al despacho post-onboarding

- [ ] Resumen de configuración firmado
- [ ] Demo en video del agente respondiendo casos típicos
- [ ] Cuenta Supabase (read-only) para ver conversaciones y métricas
- [ ] Plantilla de email para anunciar el agente a sus clientes
- [ ] Manual de usuario (cómo interpretar reportes)
- [ ] Lista de FAQs que Marco responde automáticamente vs las que escala

---

## Checklist técnico previo al go-live

- [ ] WhatsApp Business API configurada y verificada
- [ ] Webhook Make.com recibiendo correctamente
- [ ] System prompt con variables reemplazadas y testeado
- [ ] Base de datos con clientes existentes pre-cargados
- [ ] OCR configurado (Adobe PDF API o AWS Textract) para facturas escaneadas
- [ ] Categorías fiscales locales del despacho cargadas en Marco
- [ ] Lista de proveedores recurrentes pre-cargada (acelera clasificación)
- [ ] Calendario fiscal del año cargado
- [ ] Plantillas de email saliente configuradas
- [ ] Reporte semanal y mensual configurados (cron)
- [ ] Test end-to-end: cliente sube W-2 → Marco lo extrae → confirma recibido
- [ ] Test end-to-end: cliente sube factura → Marco clasifica → resumen al CPA
- [ ] Test escalación: carta IRS → notificación inmediata al CPA
- [ ] Test temporada: simular fecha 1 de abril → todos los recordatorios disparan

---

## Período de tuning

**Semana 1 post-launch:** Francisco revisa cada conversación 2x al día.
**Semana 2:** revisión 1x al día + ajustes al system prompt.
**Mes 1:** reunión de 60 min con el CPA, métricas reales vs expectativa.
**Pre-temporada (1 dic):** ensayo completo del modo temporada antes de enero.
