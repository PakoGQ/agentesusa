# Base de Datos — Marco (Contadores)

> Schema completo de las tablas y storage que Marco usa para almacenar y enriquecer la operación contable del despacho. Esto es lo que construye stickiness real (ver [estrategia](../base-de-datos-y-stickiness.md)).

---

## Tablas en Supabase

### Tabla 1 — `clients` (clientes finales del despacho)

Cada cliente individual o empresa que el despacho atiende.

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  despacho_id UUID NOT NULL REFERENCES despachos(id),

  -- Identidad
  client_type TEXT CHECK (client_type IN ('individual', 'business')),
  full_name TEXT NOT NULL,
  business_name TEXT,
  ein TEXT,                          -- para business
  ssn_last4 TEXT,                    -- para individual (NUNCA full SSN)
  itin_last4 TEXT,
  date_of_birth DATE,                -- para individual
  date_incorporated DATE,            -- para business

  -- Contacto
  email TEXT,
  phone TEXT,
  preferred_channel TEXT CHECK (preferred_channel IN ('whatsapp', 'email', 'phone', 'sms')),
  language_preference TEXT CHECK (language_preference IN ('es', 'en')),

  -- Dirección
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,

  -- Para individual
  filing_status TEXT CHECK (filing_status IN ('single', 'married_jointly', 'married_separately', 'head_of_household', 'qualifying_widow')),
  marital_status TEXT,
  num_dependents INT DEFAULT 0,
  spouse_name TEXT,
  spouse_ssn_last4 TEXT,

  -- Para business
  entity_type TEXT CHECK (entity_type IN ('llc', 'c_corp', 's_corp', 'sole_prop', 'partnership', 'nonprofit')),
  industry TEXT,
  fiscal_year_end DATE,
  state_of_incorporation TEXT,
  doing_business_as TEXT,

  -- Servicios contratados (qué hace el despacho con este cliente)
  services_active TEXT[],            -- ['individual_returns', 'bookkeeping_monthly', 'payroll', 'irs_representation', 'estimated_taxes']

  -- Status
  status TEXT CHECK (status IN ('lead', 'active', 'inactive', 'churned')),
  onboarded_at TIMESTAMP,
  last_interaction TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  notes_summary TEXT                 -- resumen actualizado por Marco automáticamente
);

CREATE INDEX idx_clients_despacho ON clients(despacho_id);
CREATE INDEX idx_clients_status ON clients(status);
```

---

### Tabla 2 — `dependents` (dependientes de clientes individuales)

```sql
CREATE TABLE dependents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  ssn_last4 TEXT,
  itin_last4 TEXT,
  date_of_birth DATE,
  relationship TEXT CHECK (relationship IN ('child', 'spouse', 'parent', 'other')),
  is_qualifying_child BOOLEAN,
  has_disability BOOLEAN DEFAULT FALSE,
  attended_college BOOLEAN DEFAULT FALSE,
  custodial_parent BOOLEAN,
  active_tax_year_eligible INT[],    -- años fiscales en los que aplicó como dependiente
  notes TEXT
);
```

---

### Tabla 3 — `tax_years` (información fiscal por año)

Una entrada por cliente por año fiscal. Permite trackear toda la historia fiscal.

```sql
CREATE TABLE tax_years (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  tax_year INT NOT NULL,             -- 2024, 2025, etc.

  -- Estado del expediente
  status TEXT CHECK (status IN ('not_started', 'collecting_docs', 'in_preparation', 'awaiting_signature', 'filed', 'amended', 'audited')),
  completion_pct INT DEFAULT 0,      -- 0-100
  expected_filing_date DATE,
  actual_filing_date DATE,

  -- Forms presentados
  forms_filed TEXT[],                -- ['1040', '1120-S', 'Schedule C', 'Schedule E']
  filing_method TEXT CHECK (filing_method IN ('e_file', 'paper')),
  extension_filed BOOLEAN DEFAULT FALSE,
  extension_date DATE,

  -- Resultado
  refund_amount DECIMAL(10,2),
  balance_due DECIMAL(10,2),
  refund_status TEXT,                -- 'pending', 'approved', 'sent', 'received'
  refund_received_date DATE,

  -- IRS y estados
  irs_acceptance_date DATE,
  state_returns_filed TEXT[],        -- ['CA', 'TX']
  pending_irs_correspondence BOOLEAN DEFAULT FALSE,

  -- Documentos
  docs_required TEXT[],              -- lo que se le pidió al cliente
  docs_received TEXT[],              -- lo que llegó
  docs_pending TEXT[],

  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(client_id, tax_year)
);

CREATE INDEX idx_tax_years_status ON tax_years(status);
CREATE INDEX idx_tax_years_year ON tax_years(tax_year);
```

---

### Tabla 4 — `documents` (todos los documentos del cliente)

El corazón del lock-in por volumen.

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  tax_year_id UUID REFERENCES tax_years(id),

  -- Storage
  storage_path TEXT NOT NULL,        -- ruta en Supabase Storage
  original_filename TEXT NOT NULL,
  file_type TEXT,                    -- 'pdf', 'jpg', 'xlsx', etc.
  file_size_bytes BIGINT,
  storage_bucket TEXT DEFAULT 'client-docs',

  -- Categorización (lock-in capa 1)
  doc_type TEXT NOT NULL CHECK (doc_type IN (
    -- Income forms
    'w2', '1099_nec', '1099_misc', '1099_int', '1099_div', '1099_r', '1099_g', '1099_k',
    -- Deduction forms
    '1098', '1098_t', '1098_e', '1099_sa', '5498_sa',
    -- Business
    'invoice', 'receipt', 'bank_statement', 'credit_card_statement',
    'payroll_report', '941', '940', 'de_9', 'de_9c',
    -- Returns
    'tax_return', 'amended_return',
    -- IRS / State correspondence
    'irs_notice', 'state_notice', 'audit_letter',
    -- Setup / Compliance
    'w9', 'ein_letter', 'articles_incorporation', 'operating_agreement',
    -- Other
    'identification', 'voided_check', 'engagement_letter', 'other'
  )),
  doc_subtype TEXT,                  -- ej: para 'irs_notice' → 'CP14', 'CP2000', 'CP501'

  -- Metadata extraída por Marco
  document_date DATE,                -- fecha del documento
  tax_year INT,                      -- año fiscal al que aplica
  extracted_data JSONB,              -- todos los campos extraídos por OCR/Claude
  vendor_name TEXT,                  -- para invoices y W-9s
  vendor_ein TEXT,
  amount_total DECIMAL(12,2),
  is_deductible BOOLEAN,
  deductible_pct INT,                -- 100, 50, 0
  expense_category TEXT,             -- 'office', 'travel', 'meals', etc.

  -- Búsqueda
  searchable_text TEXT,              -- texto extraído full-text (PostgreSQL tsvector)
  tags TEXT[],

  -- Estado
  status TEXT CHECK (status IN ('processing', 'analyzed', 'verified', 'flagged', 'archived')),
  processing_errors TEXT[],
  verified_by_cpa BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  flagged_reason TEXT,               -- si tiene inconsistencias

  -- Origen
  uploaded_by TEXT CHECK (uploaded_by IN ('client', 'cpa', 'marco_agent', 'office_staff')),
  uploaded_via TEXT CHECK (uploaded_via IN ('whatsapp', 'email', 'web_upload', 'api', 'physical_scan')),

  -- Auditoría
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_client ON documents(client_id);
CREATE INDEX idx_documents_tax_year ON documents(tax_year_id);
CREATE INDEX idx_documents_doc_type ON documents(doc_type);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_search ON documents USING gin(to_tsvector('english', searchable_text));
CREATE INDEX idx_documents_extracted ON documents USING gin(extracted_data);
```

---

### Tabla 5 — `vendors` (proveedores del cliente, para 1099 tracking)

Crítico para clientes empresariales — Marco trackea quién requiere W-9 y 1099.

```sql
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),

  vendor_name TEXT NOT NULL,
  vendor_ein TEXT,
  vendor_ssn_last4 TEXT,             -- si es individual contractor
  vendor_address TEXT,

  -- W-9 tracking
  w9_on_file BOOLEAN DEFAULT FALSE,
  w9_document_id UUID REFERENCES documents(id),
  w9_requested_at TIMESTAMP,
  w9_received_at TIMESTAMP,

  -- 1099 logic
  is_1099_eligible BOOLEAN,          -- determinado por categoría de pago + tipo de vendor
  total_paid_ytd DECIMAL(12,2) DEFAULT 0,
  total_paid_prior_year DECIMAL(12,2),
  needs_1099 BOOLEAN GENERATED ALWAYS AS (total_paid_ytd >= 600 AND is_1099_eligible) STORED,
  form_1099_type TEXT,               -- 'NEC', 'MISC', 'INT', etc.
  form_1099_filed BOOLEAN DEFAULT FALSE,
  form_1099_filed_at TIMESTAMP,

  -- Categoría
  vendor_type TEXT CHECK (vendor_type IN ('contractor', 'service_provider', 'goods_supplier', 'utility', 'rent', 'other')),

  status TEXT CHECK (status IN ('active', 'inactive')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Tabla 6 — `irs_notices` (correspondencia IRS y estatal)

Trackeo crítico — todas las cartas se loguean y siguen.

```sql
CREATE TABLE irs_notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  tax_year_id UUID REFERENCES tax_years(id),
  document_id UUID REFERENCES documents(id),

  notice_type TEXT NOT NULL,         -- 'CP14', 'CP90', 'CP2000', 'Letter 525', etc.
  notice_authority TEXT CHECK (notice_authority IN ('irs', 'ftb_ca', 'cdtfa_ca', 'edd_ca', 'other_state')),
  received_date DATE NOT NULL,
  deadline_date DATE,

  -- Contenido
  amount_in_dispute DECIMAL(12,2),
  brief_description TEXT,
  action_required TEXT,

  -- Estado
  status TEXT CHECK (status IN ('received', 'in_review', 'response_drafted', 'responded', 'resolved', 'escalated')),
  resolution TEXT,
  resolved_date DATE,

  -- CPA tracking
  assigned_to_cpa UUID,
  cpa_notes TEXT,
  power_of_attorney_filed BOOLEAN DEFAULT FALSE,
  poa_form_2848_id UUID REFERENCES documents(id),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### Tabla 7 — `bookkeeping_periods` (clientes empresariales con bookkeeping mensual)

```sql
CREATE TABLE bookkeeping_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),

  period_year INT NOT NULL,
  period_month INT NOT NULL,         -- 1-12

  -- Estado
  status TEXT CHECK (status IN ('open', 'collecting', 'in_progress', 'reviewed', 'closed', 'reopened')),

  -- Métricas del mes
  total_revenue DECIMAL(12,2),
  total_expenses DECIMAL(12,2),
  total_payroll DECIMAL(12,2),
  net_income DECIMAL(12,2),

  -- Documentos del mes
  bank_statements_received BOOLEAN DEFAULT FALSE,
  cc_statements_received BOOLEAN DEFAULT FALSE,
  receipts_count INT DEFAULT 0,
  reconciled BOOLEAN DEFAULT FALSE,
  reconciled_date DATE,

  -- Sales tax
  sales_tax_collected DECIMAL(10,2),
  sales_tax_filed BOOLEAN DEFAULT FALSE,
  sales_tax_filing_date DATE,

  -- Payroll
  payroll_filed BOOLEAN DEFAULT FALSE,
  form_941_filed BOOLEAN DEFAULT FALSE,

  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(client_id, period_year, period_month)
);
```

---

### Tabla 8 — `client_profile` (memoria evolutiva del cliente — Capa 2 lock-in)

El alma del lock-in por contexto. Marco actualiza esto automáticamente con cada interacción.

```sql
CREATE TABLE client_profile (
  client_id UUID PRIMARY KEY REFERENCES clients(id),

  -- Patrones aprendidos
  typical_doc_arrival JSONB,         -- {"w2": "mid-feb", "1099_nec": "early-feb"}
  preferred_response_time TEXT,      -- 'immediate', 'within_24h', 'within_week'
  communication_style TEXT,          -- 'short_direct', 'detailed_explanation', 'visual_examples'
  tech_savviness INT,                -- 1-5
  prefers_video_call BOOLEAN,

  -- Contexto vital relevante para impuestos
  major_life_events JSONB,           -- [{"event": "divorce", "year": 2024, "impact": "filing_status_change"}]
  ongoing_situations JSONB,          -- [{"type": "purchased_home", "year": 2024, "interest_paid": 15000}]
  business_changes JSONB,            -- [{"event": "added_partner", "date": "2025-03-01"}]

  -- Patrones financieros (de bookkeeping mensual)
  avg_monthly_revenue DECIMAL(12,2),
  avg_monthly_expenses DECIMAL(12,2),
  seasonal_patterns JSONB,           -- {"q4_higher": true, "summer_slower": true}
  recurring_vendors TEXT[],

  -- Riesgos detectados
  irs_risk_factors TEXT[],           -- ['high_cash_deposits', 'home_office_high_pct']
  audit_history JSONB,
  late_payment_history JSONB,

  -- Comportamiento con el despacho
  responsiveness_score INT,          -- 1-10
  doc_completion_avg_days DECIMAL,   -- promedio histórico
  last_3_seasons_completion JSONB,   -- ['on_time', 'late', 'on_time']

  -- Notas estructuradas que Marco mantiene
  marco_notes TEXT,                  -- resumen narrativo actualizado mensualmente
  marco_alerts TEXT[],               -- ['client_threatened_to_leave', 'asks_for_extension_every_year']

  last_updated_by_agent TIMESTAMP,
  last_updated_by_cpa TIMESTAMP
);
```

---

### Tabla 9 — `client_notes` (notas cronológicas del cliente)

```sql
CREATE TABLE client_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),

  note_type TEXT CHECK (note_type IN ('agent_observation', 'cpa_note', 'system_alert', 'tax_planning', 'meeting_summary')),
  content TEXT NOT NULL,
  related_tax_year INT,
  related_document_id UUID REFERENCES documents(id),

  created_by TEXT,                   -- 'marco_agent', 'cpa_jane_smith', etc.
  created_at TIMESTAMP DEFAULT NOW(),

  importance TEXT CHECK (importance IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium'
);

CREATE INDEX idx_notes_client ON client_notes(client_id);
CREATE INDEX idx_notes_importance ON client_notes(importance);
```

---

### Tabla 10 — `quarterly_payments` (pagos trimestrales estimados)

```sql
CREATE TABLE quarterly_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),

  tax_year INT NOT NULL,
  quarter INT NOT NULL CHECK (quarter IN (1, 2, 3, 4)),
  due_date DATE NOT NULL,

  estimated_amount DECIMAL(10,2),
  paid_amount DECIMAL(10,2),
  paid_date DATE,
  payment_method TEXT,
  confirmation_number TEXT,

  reminder_sent_30d BOOLEAN DEFAULT FALSE,
  reminder_sent_10d BOOLEAN DEFAULT FALSE,
  reminder_sent_2d BOOLEAN DEFAULT FALSE,

  status TEXT CHECK (status IN ('upcoming', 'reminder_sent', 'paid', 'late', 'skipped')),
  notes TEXT
);
```

---

## Storage Buckets

```
client-docs/
├── {despacho_id}/
│   ├── {client_id}/
│   │   ├── 2024/
│   │   │   ├── income/
│   │   │   │   ├── w2_employer_xyz_2024.pdf
│   │   │   │   └── 1099_nec_payer_abc_2024.pdf
│   │   │   ├── deductions/
│   │   │   ├── correspondence/
│   │   │   │   └── irs_cp2000_received_2024-08-15.pdf
│   │   │   └── return/
│   │   │       └── 1040_filed_2024-04-10.pdf
│   │   ├── 2025/
│   │   ├── permanent/
│   │   │   ├── ein_letter.pdf
│   │   │   ├── articles_organization.pdf
│   │   │   └── voided_check.pdf
│   │   └── vendors/
│   │       └── w9_vendor_name.pdf
```

**Permisos:**
- Despacho: read-write a su carpeta
- Sofia/Marco agentes: read-write a través de service role
- Cliente final: NO acceso directo (solo a través del agente)
- Auditor externo: read-only temporal con expiry

---

## Vistas para el dashboard

### Vista 1 — Dashboard del CPA

```sql
CREATE VIEW cpa_dashboard AS
SELECT
  c.id, c.full_name, c.client_type, c.status,
  ty.tax_year, ty.status as return_status, ty.completion_pct,
  ty.docs_pending,
  COUNT(DISTINCT d.id) as docs_count,
  COUNT(DISTINCT n.id) FILTER (WHERE n.status = 'received' OR n.status = 'in_review') as open_irs_notices,
  cp.responsiveness_score,
  cp.marco_alerts
FROM clients c
LEFT JOIN tax_years ty ON ty.client_id = c.id AND ty.tax_year = EXTRACT(YEAR FROM CURRENT_DATE)
LEFT JOIN documents d ON d.client_id = c.id AND d.tax_year = ty.tax_year
LEFT JOIN irs_notices n ON n.client_id = c.id
LEFT JOIN client_profile cp ON cp.client_id = c.id
GROUP BY c.id, ty.id, cp.client_id;
```

### Vista 2 — Bandeja "necesita atención"

```sql
CREATE VIEW needs_attention AS
SELECT
  c.full_name, c.id as client_id,
  'Documents pending +10 days' as reason,
  ty.docs_pending,
  ty.expected_filing_date - CURRENT_DATE as days_to_deadline
FROM clients c
JOIN tax_years ty ON ty.client_id = c.id
WHERE ty.status = 'collecting_docs'
  AND array_length(ty.docs_pending, 1) > 0
  AND ty.updated_at < NOW() - INTERVAL '10 days'

UNION ALL

SELECT
  c.full_name, c.id, 'IRS notice unresolved',
  ARRAY[n.notice_type], n.deadline_date - CURRENT_DATE
FROM clients c
JOIN irs_notices n ON n.client_id = c.id
WHERE n.status IN ('received', 'in_review')

UNION ALL

SELECT
  c.full_name, c.id, 'Quarterly payment due in 10 days',
  ARRAY[CONCAT('Q', q.quarter::text)], q.due_date - CURRENT_DATE
FROM clients c
JOIN quarterly_payments q ON q.client_id = c.id
WHERE q.due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '10 days'
  AND q.status = 'upcoming';
```

---

## Cómo Marco interactúa con la BD

### Al recibir un mensaje de cliente:
1. Buscar cliente por phone/email → cargar `clients` + `client_profile`
2. Cargar últimas 10 conversations
3. Si pregunta sobre status: query a `tax_years` y `irs_notices`
4. Generar respuesta contextualizada

### Al recibir un documento:
1. OCR + extracción con Claude
2. Clasificar `doc_type` automáticamente
3. Insertar en `documents` con metadata completa
4. Si es invoice de business: actualizar `vendors.total_paid_ytd`
5. Si es IRS notice: insertar en `irs_notices` + alerta inmediata
6. Confirmar al cliente la recepción

### Mensualmente (post bookkeeping):
1. Generar resumen del mes en `bookkeeping_periods`
2. Actualizar `client_profile.avg_monthly_*` con últimos 12 meses
3. Detectar patrones nuevos → actualizar `seasonal_patterns`
4. Si detecta riesgo: agregar a `irs_risk_factors`

### Anualmente (post tax season):
1. Cerrar `tax_years` actual con resultados
2. Actualizar `client_profile.last_3_seasons_completion`
3. Generar narrativa para `client_profile.marco_notes`
4. Calcular `responsiveness_score` actualizado

---

## Reglas de retention

| Tipo de data | Retención mínima | Retención recomendada |
|--------------|-------------------|----------------------|
| Tax returns | 7 años (IRS) | Permanente |
| Documentos de soporte | 7 años | 7 años |
| Conversaciones / mensajes | 3 años | 7 años |
| IRS correspondence | 7 años | Permanente |
| W-9 / EIN documents | Permanente | Permanente |
| Audit-related | 7 años post-resolución | Permanente |

---

## Export del cliente (función "right to data portability")

Cuando un cliente decide irse, el sistema genera:

```
export_{despacho_id}_{client_id}_{timestamp}.zip
├── README.md (índice del export)
├── client_profile.json (datos estructurados)
├── all_clients/ (CSV de todos sus clientes finales)
├── tax_returns/ (PDFs por año)
├── documents/
│   ├── 2024/
│   ├── 2025/
│   └── permanent/
├── conversations/ (JSON con todo el histórico)
└── notes_and_alerts.json
```

Tarda 6–24 horas en generarse. Llega por email con link de descarga válido por 30 días.
