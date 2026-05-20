# Configuración por Despacho — Sofia (Modular)

> Este formulario se llena con cada nuevo cliente abogado. Los datos aquí recopilados llenan los placeholders del system prompt unificado (base + ramas + estructura).

---

## PARTE A — Identificación del despacho

### A.1. Datos básicos

- **Nombre legal del despacho:**
- **Nombre comercial:**
- **Sitio web:**
- **Logo y branding** (link a archivos):
- **Nombre que tendrá el agente** (default: Sofia, personalizable):

### A.2. Idioma principal

- [ ] Español dominante
- [ ] Inglés dominante
- [ ] 50/50

---

## PARTE B — Selección de ramas (módulos a incluir)

Marca todas las que aplican. **Ramas disponibles hoy:**

- [ ] **Migratorio** → incluir [ramas/migratorio.md](ramas/migratorio.md)
- [ ] **Personal Injury** → incluir [ramas/personal-injury.md](ramas/personal-injury.md)
- [ ] **Familiar** → incluir [ramas/familiar.md](ramas/familiar.md)
- [ ] **Laboral** → incluir [ramas/laboral.md](ramas/laboral.md)
- [ ] **Mercantil / Corporativo** → incluir [ramas/mercantil.md](ramas/mercantil.md)

**Ramas pendientes (fase 2 — pedir si el cliente lo necesita):**
- [ ] Penal / DUI
- [ ] Bankruptcy
- [ ] Civil
- [ ] Bienes raíces

### B.1. Tipos de caso específicos que SÍ maneja (dentro de la rama)

Por cada rama marcada, validar qué tipos específicos maneja. Ejemplo:

**Si marcaste Migratorio:**
- [ ] Visas no inmigrante
- [ ] Green card / Ajuste de estatus
- [ ] Naturalización
- [ ] DACA
- [ ] Asilo
- [ ] TPS
- [ ] Defensa contra deportación
- [ ] VAWA / Visa U / Visa T
- [ ] Otros: _______________

**Si marcaste Personal Injury:**
- [ ] Auto accidents
- [ ] Slip and fall
- [ ] Medical malpractice
- [ ] Wrongful death
- [ ] Mordidas de perro
- [ ] Product liability
- [ ] Otros: _______________

**Si marcaste Familiar:**
- [ ] Divorcio
- [ ] Custodia y visitación
- [ ] Manutención (child y/o spousal)
- [ ] Adopción
- [ ] Restraining orders / DV
- [ ] Tutela / Guardianship
- [ ] Modificaciones de órdenes
- [ ] Otros: _______________

**Si marcaste Laboral:**
- [ ] Wage theft
- [ ] Workers' Comp
- [ ] Discriminación
- [ ] Acoso (incluyendo sexual)
- [ ] Despido injustificado
- [ ] Retaliación
- [ ] FMLA / CFRA
- [ ] Misclassification
- [ ] Otros: _______________

**Si marcaste Mercantil:**
- [ ] Formación de empresas (LLC, Corp)
- [ ] Operating Agreements / Bylaws
- [ ] Revisión y redacción de contratos
- [ ] Disputas contractuales (breach of contract)
- [ ] Disputas entre socios / shareholders
- [ ] Buy-sell agreements
- [ ] M&A pequeñas
- [ ] Compliance corporativo
- [ ] NDAs / non-competes
- [ ] Leases comerciales
- [ ] Cobranza B2B
- [ ] Disolución de empresas
- [ ] Trademark filings básicos
- [ ] Asesoría general (general counsel externo)
- [ ] Operación bicultural MX-USA
- [ ] Otros: _______________

### B.2. Casos que NO maneja (importante para que Sofia rechace correctamente)

[Listar lo que está fuera del alcance del despacho]

---

## PARTE C — Selección de estructura

Marca **una sola opción**:

- [ ] **Abogado unitario** (1 abogado, 0–2 personas de apoyo) → [estructura-despacho/abogado-unitario.md](estructura-despacho/abogado-unitario.md)
- [ ] **Despacho pequeño** (2–5 abogados) → [estructura-despacho/despacho-pequeno.md](estructura-despacho/despacho-pequeno.md)
- [ ] **Despacho mediano** (5–20 abogados) → [estructura-despacho/despacho-mediano.md](estructura-despacho/despacho-mediano.md)

---

## PARTE D — Variables del despacho (para system prompt)

### D.1. Universales (siempre se llenan)

| Variable | Tu valor |
|----------|----------|
| `[NOMBRE_DESPACHO]` | |
| `[DURACION_CONSULTA]` | (30 / 45 / 60 minutos) |
| `[PRECIO_CONSULTA]` | (en USD, o "GRATIS") |
| `[HORARIOS_DESPACHO]` | (ej: "L–V 9am–6pm, sábados 10am–2pm") |

### D.2. Si elegiste "Abogado unitario"

| Variable | Tu valor |
|----------|----------|
| `[NOMBRE_ABOGADO_PRINCIPAL]` | |
| `[STAFF_DE_APOYO]` | ("ninguno" / "1 asistente: nombre" / etc.) |
| `[CONTACTO_ESCALACION_URGENTE]` | |
| `[CANAL_PREFERIDO_URGENCIAS_HORARIO]` | |
| `[CANAL_FUERA_DE_HORARIO]` | |
| `[PLAN_B]` | |
| `[EMAIL_ABOGADO]` | |
| `[WA_ABOGADO]` | |

### D.3. Si elegiste "Despacho pequeño"

| Variable | Tu valor |
|----------|----------|
| `[ABOGADOS_DEL_DESPACHO]` | (lista detallada) |
| `[STAFF_DE_APOYO]` | |
| `[NOMBRE_MANAGING]` | |
| `[UMBRAL_VALOR_PARTNER]` | (ej: "$500,000") |
| `[TABLA_RUTEO_CASOS]` | (tabla completa abajo) |
| `[CANAL_URGENCIAS_CRITICAS]` | |
| `[CANAL_URGENCIAS_NORMALES]` | |

**Tabla de ruteo de casos:**

| Sub-tipo de caso | Abogado asignado |
|------------------|------------------|
| | |
| | |

### D.4. Si elegiste "Despacho mediano"

| Variable | Tu valor |
|----------|----------|
| `[PARTNERS_DEL_DESPACHO]` | |
| `[SENIOR_ASSOCIATES]` | |
| `[ASSOCIATES]` | |
| `[PARALEGALS_Y_STAFF]` | |
| `[ASSOCIATE_INTAKE]` | (quién hace intake inicial) |
| `[OFFICE_MANAGER]` | |
| `[CANAL_URGENCIAS_CRITICAS]` | |
| `[CANAL_URGENCIAS_ALTAS]` | |
| `[TABLA_RUTEO_DETALLADA]` | (tabla detallada abajo) |

**Tabla de ruteo detallada:**

| Sub-tipo de caso | Quién lo toma |
|------------------|---------------|
| | |
| | |
| | |

---

## PARTE E — Documentación específica por rama

Por cada rama marcada en B, documentar:

### Documentos que recibe del cliente
[Lista por tipo de caso. Ejemplo: para PI, qué documentos típicamente sube el cliente]

### Médicos / Proveedores recomendados (solo PI)
Si el despacho tiene relación con proveedores:

- Chiropractors:
- Physical therapists:
- Orthopedic doctors:
- MRI centers:
- Lien doctors:

### Mediadores / evaluadores recomendados (solo Familiar)
- Custody evaluators:
- Mediators:

### Cortes donde ejerce
- Condado(s):
- Court houses específicos:

---

## PARTE F — CRM / Sistema existente

- **¿Usa algún CRM o sistema de casos?**
  - [ ] Clio
  - [ ] MyCase
  - [ ] PracticePanther
  - [ ] CASEpeer (común en PI)
  - [ ] Otro: __________
  - [ ] Solo Excel / Google Sheets
- **¿Necesita integración con ese sistema?** (Elite package)
  - [ ] Sí
  - [ ] No

---

## PARTE G — Reportes

- **Día y hora del reporte semanal:** (default: lunes 8am)
- **¿Reportes individualizados por abogado?** (Solo aplica para despacho pequeño/mediano)
  - [ ] Sí
  - [ ] No, solo reporte general
- **A qué emails llega el reporte general:**
- **Métricas adicionales a incluir:**

---

## PARTE H — Onboarding técnico

### H.1. Documentos a entregar al despacho post-onboarding

- [ ] Resumen de configuración firmado
- [ ] Demo en video del agente respondiendo casos típicos de cada rama
- [ ] Cuenta Supabase (read-only) para ver conversaciones
- [ ] Plantilla de email para anunciar el agente a sus clientes
- [ ] Manual de usuario de 2 páginas (cómo interpretar reportes)

### H.2. Checklist técnico previo al go-live

- [ ] System prompt unificado generado (base + ramas + estructura + variables)
- [ ] System prompt validado en Claude.ai con casos típicos
- [ ] WhatsApp Business API configurada y verificada
- [ ] Webhook Make.com recibiendo mensajes correctamente
- [ ] Base de datos Supabase con clientes existentes pre-cargados (si aplica)
- [ ] Calendario sincronizado (Google Calendar o Calendly)
- [ ] Plantillas de email saliente configuradas
- [ ] Reporte semanal configurado (cron lunes 8am)
- [ ] Reportes individualizados (si aplica)

### H.3. Tests por rama (mínimo, antes de go-live)

Por cada rama incluida:
- [ ] Conversación de cliente nuevo (calificación correcta)
- [ ] Conversación de cliente con caso activo (estatus, documentos)
- [ ] Caso urgente específico de la rama (escalación correcta)
- [ ] Documento típico de la rama (extracción correcta)
- [ ] Caso fuera del área (rechazo educado)

### H.4. Tests adicionales si hay 2+ ramas

- [ ] Detección correcta de rama desde el primer mensaje del cliente
- [ ] Vocabulario aplicado correctamente según el contexto (ej: "custodia" en familiar vs migratorio)

### H.5. Período de tuning

- **Semana 1 post-launch:** Francisco revisa cada conversación 2x al día
- **Semana 2:** revisión 1x al día + ajustes al system prompt
- **Día 30:** reunión de 60 min con el cliente, métricas reales vs expectativa
