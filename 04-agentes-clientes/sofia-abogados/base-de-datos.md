# Base de Datos — Sofia (Abogados)

> Schema completo de las tablas y storage que Sofia usa para almacenar la operación legal del despacho. Es modular igual que el system prompt — algunas tablas son universales, otras se activan según las ramas que ejerce el despacho.

> Ver estrategia general en [base-de-datos-y-stickiness.md](../base-de-datos-y-stickiness.md).

---

## Schema universal (siempre se usa)

### Tabla 1 — `clients` (clientes finales del despacho)

```sql
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  despacho_id UUID NOT NULL REFERENCES despachos(id),

  -- Identidad
  full_name TEXT NOT NULL,
  preferred_name TEXT,
  date_of_birth DATE,
  ssn_last4 TEXT,                    -- NUNCA full SSN
  itin_last4 TEXT,
  alien_number TEXT,                 -- A-number, para casos migratorios
  driver_license TEXT,

  -- Contacto
  email TEXT,
  phone_primary TEXT,
  phone_secondary TEXT,
  preferred_channel TEXT CHECK (preferred_channel IN ('whatsapp', 'email', 'phone', 'sms', 'in_person')),
  language_preference TEXT CHECK (language_preference IN ('es', 'en', 'bilingual')),
  best_contact_time TEXT,            -- 'mornings', 'evenings', 'weekends'

  -- Dirección
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  is_safe_to_send_mail BOOLEAN DEFAULT TRUE,  -- crítico en casos de DV

  -- Demografía relevante por rama
  country_of_origin TEXT,            -- migratorio
  years_in_usa INT,                  -- migratorio
  marital_status TEXT,
  num_dependents INT DEFAULT 0,
  occupation TEXT,
  employer TEXT,

  -- Origen del lead
  referral_source TEXT,              -- 'google', 'facebook_ad', 'word_of_mouth', 'referral_lawyer'
  referrer_name TEXT,
  first_contact_at TIMESTAMP,

  -- Status
  status TEXT CHECK (status IN ('lead_new', 'lead_qualified', 'consult_scheduled', 'active_client', 'inactive', 'former_client', 'rejected')),
  lead_priority TEXT CHECK (lead_priority IN ('urgent', 'normal', 'low')),
  rejected_reason TEXT,

  -- Servicios (qué ramas aplican a este cliente)
  active_ramas TEXT[],               -- ['migratorio', 'familiar']

  -- Comunicación segura (DV)
  safe_communication_only BOOLEAN DEFAULT FALSE,
  safe_words JSONB,                  -- {"warning_word": "código de auxilio si está en peligro"}

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_interaction TIMESTAMP
);

CREATE INDEX idx_clients_despacho ON clients(despacho_id);
CREATE INDEX idx_clients_status ON clients(status);
```

---

### Tabla 2 — `cases` (casos / matters del cliente)

Un cliente puede tener múltiples casos.

```sql
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  despacho_id UUID NOT NULL REFERENCES despachos(id),

  -- Identificación
  case_number TEXT,                  -- número interno del despacho
  matter_name TEXT NOT NULL,
  rama TEXT NOT NULL CHECK (rama IN ('migratorio', 'personal_injury', 'familiar', 'laboral', 'mercantil')),
  case_type TEXT NOT NULL,           -- subtipo (ej: 'green_card_marriage', 'auto_accident', 'divorce_with_children')

  -- Asignación
  lead_lawyer_id UUID,               -- partner / senior responsable
  associate_lawyer_id UUID,
  paralegal_id UUID,

  -- Status
  status TEXT CHECK (status IN ('intake', 'engagement_signed', 'in_progress', 'awaiting_response', 'in_court', 'closed_won', 'closed_lost', 'withdrawn')),
  phase TEXT,                        -- fase actual del caso
  open_date DATE NOT NULL,
  close_date DATE,

  -- Court info
  court_name TEXT,
  court_case_number TEXT,            -- número oficial del tribunal
  judge_assigned TEXT,
  jurisdiction TEXT,

  -- Counterparty
  opposing_party TEXT,
  opposing_counsel TEXT,
  opposing_counsel_contact TEXT,

  -- Financial
  fee_arrangement TEXT CHECK (fee_arrangement IN ('flat_fee', 'hourly', 'contingency', 'hybrid', 'retainer')),
  flat_fee_amount DECIMAL(10,2),
  hourly_rate DECIMAL(10,2),
  contingency_pct DECIMAL(5,2),
  retainer_amount DECIMAL(10,2),
  retainer_balance DECIMAL(10,2),
  total_billed DECIMAL(10,2),
  total_collected DECIMAL(10,2),

  -- Settlement (si aplica)
  settlement_offered DECIMAL(12,2),
  settlement_offered_date DATE,
  settlement_accepted DECIMAL(12,2),
  settlement_accepted_date DATE,

  -- Statute of limitations
  sol_date DATE,                     -- fecha límite de prescripción
  sol_warning_threshold INT DEFAULT 60,  -- días antes para empezar a alertar

  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_cases_client ON cases(client_id);
CREATE INDEX idx_cases_lead_lawyer ON cases(lead_lawyer_id);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_sol ON cases(sol_date);
```

---

### Tabla 3 — `documents` (documentación del caso)

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  case_id UUID REFERENCES cases(id),

  -- Storage
  storage_path TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_type TEXT,
  file_size_bytes BIGINT,
  storage_bucket TEXT DEFAULT 'legal-docs',

  -- Categorización
  doc_category TEXT NOT NULL CHECK (doc_category IN (
    -- Universal
    'identification', 'engagement_letter', 'fee_agreement', 'retainer_agreement',
    'correspondence_client', 'correspondence_opposing', 'court_filing', 'court_order',
    'evidence', 'medical_record', 'financial_record', 'photograph',
    -- Migratorio
    'uscis_notice', 'i130', 'i140', 'i485', 'i589', 'i765', 'i129f', 'i751', 'n400',
    'passport', 'i94', 'birth_certificate', 'marriage_certificate', 'divorce_decree',
    'asylum_evidence', 'criminal_record_check', 'employment_verification',
    -- Personal Injury
    'police_report', 'incident_report', 'medical_bill', 'medical_record',
    'insurance_letter', 'demand_letter', 'lien_notice', 'wage_loss_verification',
    'photos_accident', 'photos_injuries', 'witness_statement',
    -- Familiar
    'petition_dissolution', 'response', 'declaration', 'income_statement',
    'custody_evaluation', 'restraining_order', 'parenting_plan', 'support_calculation',
    -- Laboral
    'paystub', 'w2', 'employment_contract', 'offer_letter', 'termination_letter',
    'severance_agreement', 'employee_handbook', 'right_to_sue_letter', 'dwc1', 'eeoc_charge',
    -- Mercantil
    'articles_incorporation', 'operating_agreement', 'bylaws', 'shareholder_agreement',
    'commercial_contract', 'lease_commercial', 'nda', 'non_compete', 'promissory_note',
    'cease_desist_letter', 'demand_letter_business', 'lawsuit_complaint',
    -- Other
    'other'
  )),
  doc_subcategory TEXT,

  -- Metadata
  document_date DATE,
  signed_by TEXT[],                  -- partes que firmaron
  parties_involved TEXT[],
  amount_involved DECIMAL(12,2),
  filing_date DATE,                  -- si se presentó en corte
  important_deadlines DATE[],

  -- Datos extraídos (variable por rama)
  extracted_data JSONB,
  searchable_text TEXT,
  tags TEXT[],

  -- Status
  status TEXT CHECK (status IN ('processing', 'analyzed', 'verified', 'flagged', 'archived', 'expired')),
  is_evidence BOOLEAN DEFAULT FALSE,
  chain_of_custody JSONB,            -- crítico para evidencia legal
  privileged BOOLEAN DEFAULT TRUE,    -- attorney-client privilege

  -- Origen
  uploaded_by TEXT,
  uploaded_via TEXT,
  source_authentic BOOLEAN,
  authentication_notes TEXT,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_legal_docs_client ON documents(client_id);
CREATE INDEX idx_legal_docs_case ON documents(case_id);
CREATE INDEX idx_legal_docs_category ON documents(doc_category);
CREATE INDEX idx_legal_docs_search ON documents USING gin(to_tsvector('english', searchable_text));
```

---

### Tabla 4 — `deadlines` (todas las fechas críticas)

```sql
CREATE TABLE deadlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  case_id UUID REFERENCES cases(id),

  deadline_type TEXT NOT NULL CHECK (deadline_type IN (
    'statute_of_limitations',
    'court_hearing',
    'response_to_motion',
    'discovery_due',
    'document_submission',
    'visa_expiration',
    'audience_uscis',
    'master_calendar_hearing',
    'merits_hearing',
    'response_to_demand',
    'response_to_lawsuit',
    'mediation',
    'arbitration',
    'settlement_deadline',
    'ada_request',
    'workers_comp_filing',
    'eeoc_deadline',
    'extension_filing',
    'other'
  )),
  deadline_date DATE NOT NULL,

  description TEXT NOT NULL,
  consequences_if_missed TEXT,
  related_document_id UUID REFERENCES documents(id),

  -- Reminders
  reminder_30d_sent BOOLEAN DEFAULT FALSE,
  reminder_14d_sent BOOLEAN DEFAULT FALSE,
  reminder_7d_sent BOOLEAN DEFAULT FALSE,
  reminder_3d_sent BOOLEAN DEFAULT FALSE,
  reminder_1d_sent BOOLEAN DEFAULT FALSE,

  -- Status
  status TEXT CHECK (status IN ('upcoming', 'imminent', 'completed', 'extended', 'missed')),
  completed_date DATE,
  notes TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_deadlines_date ON deadlines(deadline_date);
CREATE INDEX idx_deadlines_status ON deadlines(status);
CREATE INDEX idx_deadlines_case ON deadlines(case_id);
```

---

### Tabla 5 — `appointments` (citas)

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  case_id UUID REFERENCES cases(id),
  lawyer_id UUID,

  appointment_type TEXT CHECK (appointment_type IN ('initial_consultation', 'case_review', 'document_signing', 'court_prep', 'other')),
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 45,
  modality TEXT CHECK (modality IN ('in_person', 'video', 'phone')),
  location TEXT,
  video_link TEXT,

  status TEXT CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show', 'rescheduled')),
  reminder_24h_sent BOOLEAN DEFAULT FALSE,
  reminder_1h_sent BOOLEAN DEFAULT FALSE,

  pre_appointment_brief TEXT,        -- generado por Sofia con contexto del caso
  post_appointment_notes TEXT,

  fee_charged DECIMAL(10,2),
  fee_paid BOOLEAN DEFAULT FALSE,
  fee_paid_date DATE,

  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Tabla 6 — `urgent_alerts` (escalaciones urgentes históricas)

```sql
CREATE TABLE urgent_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id),
  case_id UUID REFERENCES cases(id),

  alert_type TEXT CHECK (alert_type IN (
    -- Migratorio
    'ice_mention', 'deportation_order', 'visa_expiring_soon', 'minor_unaccompanied', 'detention_family',
    -- PI
    'recent_accident', 'insurance_pressuring', 'sol_approaching', 'wrongful_death',
    -- Familiar
    'domestic_violence_active', 'child_abduction', 'court_hearing_imminent', 'served_with_papers',
    -- Laboral
    'severance_pressure', 'retaliation', 'ice_threat_employer', 'sol_approaching_eeoc',
    -- Mercantil
    'served_with_lawsuit', 'cease_desist_received', 'partnership_blocking_ops',
    -- Universal
    'client_in_crisis', 'media_contact', 'opposing_counsel_contact', 'complaint', 'refund_request',
    'sol_critical'
  )),
  severity TEXT CHECK (severity IN ('high', 'critical')),

  trigger_message TEXT,              -- el mensaje que disparó la alerta
  channel_received TEXT,
  description TEXT,

  -- Notification tracking
  notified_to TEXT[],
  notified_at TIMESTAMP,
  acknowledged_by UUID,
  acknowledged_at TIMESTAMP,
  response_time_minutes INT,

  -- Resolution
  status TEXT CHECK (status IN ('triggered', 'notified', 'acknowledged', 'in_progress', 'resolved', 'escalated_further')),
  resolution TEXT,
  resolved_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Tabla 7 — `client_profile` (memoria evolutiva — Capa 2 lock-in)

```sql
CREATE TABLE client_profile (
  client_id UUID PRIMARY KEY REFERENCES clients(id),

  -- Estilo de comunicación
  communication_style TEXT,          -- 'short_direct', 'detailed_explanations', 'visual_examples'
  emotional_state_baseline TEXT,     -- 'calm', 'anxious', 'distrustful', 'hopeful'
  tech_savviness INT,
  preferred_meeting_format TEXT,

  -- Contexto vital relevante
  major_life_events JSONB,           -- divorce, death, immigration, accidents
  ongoing_legal_situations JSONB,
  family_dynamics JSONB,             -- crítico para familiar y migratorio
  financial_situation JSONB,         -- crítico para PI y laboral
  prior_legal_history JSONB,

  -- Particular por rama
  migration_history JSONB,           -- entradas/salidas, visas previas, casos previos
  injury_history JSONB,              -- para PI: lesiones previas relevantes
  employment_history JSONB,          -- para laboral
  business_relationships JSONB,      -- para mercantil

  -- Comportamiento con el despacho
  responsiveness_score INT,          -- 1-10
  doc_completion_avg_days DECIMAL,
  reschedule_count INT DEFAULT 0,
  no_show_count INT DEFAULT 0,
  payment_reliability TEXT,          -- 'always_on_time', 'sometimes_late', 'frequently_late'

  -- Riesgos y atenciones especiales
  trauma_triggers TEXT[],            -- temas a evitar
  safety_concerns TEXT[],            -- DV, gang, ICE-related
  language_complexity_pref TEXT,     -- 'simple_lay', 'medium', 'technical_legal'

  -- Sofia notes
  sofia_notes TEXT,                  -- narrativa actualizada
  sofia_alerts TEXT[],

  last_updated_by_agent TIMESTAMP,
  last_updated_by_lawyer TIMESTAMP
);
```

---

## Schema específico por rama

Estos campos se llenan solo si el cliente tiene un caso de la rama correspondiente.

### Migratorio — `case_migratorio_details`

```sql
CREATE TABLE case_migratorio_details (
  case_id UUID PRIMARY KEY REFERENCES cases(id),

  immigration_status_current TEXT,   -- 'undocumented', 'TPS', 'asylum_pending', 'lpr', 'citizen', etc.
  immigration_status_target TEXT,
  visa_type_current TEXT,
  visa_expiration DATE,
  i94_admission_class TEXT,
  i94_expiration DATE,

  forms_to_file TEXT[],              -- ['I-130', 'I-485']
  forms_filed JSONB,                 -- {'I-130': {'filed': '2024-03-15', 'receipt': 'MSC...', 'status': 'pending'}}

  uscis_receipt_numbers TEXT[],
  uscis_office TEXT,
  national_visa_center_case INT,

  has_criminal_history BOOLEAN,
  prior_immigration_violations BOOLEAN,
  prior_deportation_order BOOLEAN,
  in_removal_proceedings BOOLEAN,
  master_calendar_date DATE,
  individual_hearing_date DATE,

  petitioner_relationship TEXT,      -- para family-based
  beneficiary_country TEXT,
  qualifying_us_relative TEXT,
  asylum_country_persecution TEXT,
  vawa_qualifying_relationship TEXT,

  notes TEXT
);
```

### Personal Injury — `case_pi_details`

```sql
CREATE TABLE case_pi_details (
  case_id UUID PRIMARY KEY REFERENCES cases(id),

  accident_date DATE NOT NULL,
  accident_time TIME,
  accident_location TEXT,
  accident_type TEXT,                -- 'auto', 'slip_fall', 'medical_malpractice', etc.
  police_report_number TEXT,
  fault_admitted_by TEXT,            -- 'opposing_party', 'unclear', 'disputed'

  injuries_initial TEXT[],
  injuries_diagnosed TEXT[],
  treatment_facilities TEXT[],
  treating_doctors TEXT[],

  medical_bills_total DECIMAL(12,2) DEFAULT 0,
  medical_bills_unpaid DECIMAL(12,2) DEFAULT 0,
  liens_total DECIMAL(12,2) DEFAULT 0,
  lien_doctors_used BOOLEAN,

  lost_wages DECIMAL(12,2) DEFAULT 0,
  property_damage DECIMAL(12,2) DEFAULT 0,
  pain_and_suffering_estimate DECIMAL(12,2),

  client_insurance_carrier TEXT,
  client_policy_number TEXT,
  client_coverage_pip BOOLEAN,
  client_coverage_um BOOLEAN,
  client_coverage_um_amount DECIMAL(10,2),

  opposing_insurance_carrier TEXT,
  opposing_policy_number TEXT,
  opposing_adjuster TEXT,
  opposing_claim_number TEXT,
  opposing_coverage_amount DECIMAL(12,2),

  demand_amount DECIMAL(12,2),
  demand_sent_date DATE,
  offers_received JSONB,

  treating_status TEXT,              -- 'in_treatment', 'mmi', 'discharged'
  mmi_date DATE,                     -- maximum medical improvement

  notes TEXT
);
```

### Familiar — `case_familiar_details`

```sql
CREATE TABLE case_familiar_details (
  case_id UUID PRIMARY KEY REFERENCES cases(id),

  case_subtype TEXT,                 -- 'divorce', 'custody', 'support', 'restraining_order', 'adoption'

  -- Marriage
  marriage_date DATE,
  marriage_location TEXT,
  date_of_separation DATE,
  date_filed DATE,
  date_finalized DATE,

  -- Children
  children JSONB,                    -- array of {name, dob, ssn_last4, current_custody}
  custody_type_requested TEXT,
  custody_type_current TEXT,
  visitation_schedule_current TEXT,

  -- Support
  child_support_amount DECIMAL(10,2),
  child_support_payor TEXT,
  spousal_support_amount DECIMAL(10,2),
  spousal_support_duration TEXT,
  spousal_support_payor TEXT,

  -- Property
  community_property_total DECIMAL(12,2),
  separate_property_client DECIMAL(12,2),
  separate_property_spouse DECIMAL(12,2),
  real_estate_involved BOOLEAN,
  retirement_accounts_involved BOOLEAN,
  business_interests_involved BOOLEAN,

  -- DV / Safety
  dv_history BOOLEAN,
  active_restraining_order BOOLEAN,
  restraining_order_against TEXT,
  restraining_order_expires DATE,
  protective_services_involved BOOLEAN,

  -- Counterparty
  spouse_has_counsel BOOLEAN,
  spouse_counsel_name TEXT,

  notes TEXT
);
```

### Laboral — `case_laboral_details`

```sql
CREATE TABLE case_laboral_details (
  case_id UUID PRIMARY KEY REFERENCES cases(id),

  case_subtype TEXT,                 -- 'wage_theft', 'workers_comp', 'discrimination', 'wrongful_termination'

  employer_name TEXT NOT NULL,
  employer_size TEXT,                -- '<15', '15-99', '100+', '500+'
  employer_industry TEXT,

  employment_start DATE,
  employment_end DATE,
  position TEXT,
  hourly_rate DECIMAL(10,2),
  annual_salary DECIMAL(10,2),

  immigration_status_relevant BOOLEAN,
  immigration_status TEXT,           -- relevante NO el caso pero sí protección

  -- Wage theft
  unpaid_wages_estimate DECIMAL(12,2),
  unpaid_overtime_estimate DECIMAL(12,2),
  meal_break_violations BOOLEAN,
  rest_break_violations BOOLEAN,

  -- Discrimination / harassment
  protected_class TEXT[],            -- ['race', 'gender', 'age', 'disability']
  discrimination_acts JSONB,
  harassment_history JSONB,

  -- Workers comp
  injury_date DATE,
  injury_body_part TEXT[],
  reported_to_employer BOOLEAN,
  reported_date DATE,
  doctor_assigned TEXT,
  qme_evaluation BOOLEAN,
  ttd_received BOOLEAN,
  ppd_rating INT,

  -- Termination
  termination_date DATE,
  termination_reason_stated TEXT,
  severance_offered BOOLEAN,
  severance_amount DECIMAL(12,2),
  severance_signed BOOLEAN,
  severance_deadline DATE,

  -- Filings
  eeoc_charge_filed BOOLEAN,
  eeoc_charge_number TEXT,
  dfeh_complaint_filed BOOLEAN,
  dfeh_complaint_number TEXT,
  right_to_sue_received BOOLEAN,
  right_to_sue_date DATE,
  dlse_claim_filed BOOLEAN,

  retaliation_alleged BOOLEAN,
  retaliation_acts JSONB,

  notes TEXT
);
```

### Mercantil — `case_mercantil_details`

```sql
CREATE TABLE case_mercantil_details (
  case_id UUID PRIMARY KEY REFERENCES cases(id),

  case_subtype TEXT,                 -- 'formation', 'contract_review', 'dispute', 'm_a', 'compliance'

  client_business_name TEXT,
  client_entity_type TEXT,
  client_industry TEXT,

  -- Counterparty
  opposing_business_name TEXT,
  opposing_entity_type TEXT,
  relationship_to_client TEXT,       -- 'vendor', 'customer', 'partner', 'employee', 'competitor'

  -- Contract specifics
  contract_type TEXT,
  contract_value DECIMAL(12,2),
  contract_term TEXT,
  governing_law_state TEXT,
  has_personal_guaranty BOOLEAN,
  has_arbitration_clause BOOLEAN,

  -- Dispute specifics
  alleged_breach TEXT,
  damages_claimed DECIMAL(12,2),
  damages_proven DECIMAL(12,2),

  -- M&A
  transaction_type TEXT,             -- 'asset_purchase', 'stock_purchase', 'merger'
  transaction_value DECIMAL(12,2),
  due_diligence_status TEXT,
  closing_target_date DATE,

  -- Cross-border (relevante para Nexus)
  has_mexico_operations BOOLEAN,
  mexico_entity_type TEXT,
  bilingual_documents_required BOOLEAN,

  notes TEXT
);
```

---

## Storage Buckets

```
legal-docs/
├── {despacho_id}/
│   ├── {client_id}/
│   │   ├── identity/
│   │   ├── cases/
│   │   │   ├── {case_id}/
│   │   │   │   ├── pleadings/
│   │   │   │   ├── correspondence/
│   │   │   │   ├── evidence/
│   │   │   │   ├── medical/ (si PI)
│   │   │   │   ├── financial/
│   │   │   │   ├── court_orders/
│   │   │   │   └── settlement/
│   │   ├── permanent/ (passport, birth certs, etc.)
│   │   └── communications/
```

---

## Vistas críticas

### Vista — Bandeja de prioridad del despacho

```sql
CREATE VIEW lawyer_priority_inbox AS

-- Statute of limitations próximo a vencer
SELECT
  c.full_name as client_name,
  cs.matter_name as case_name,
  'SOL approaching' as alert_type,
  cs.sol_date - CURRENT_DATE as days_remaining,
  cs.lead_lawyer_id
FROM cases cs
JOIN clients c ON c.id = cs.client_id
WHERE cs.status NOT IN ('closed_won', 'closed_lost', 'withdrawn')
  AND cs.sol_date IS NOT NULL
  AND cs.sol_date - CURRENT_DATE <= 60

UNION ALL

-- Audiencias próximas
SELECT
  c.full_name, cs.matter_name,
  CONCAT('Hearing: ', d.deadline_type),
  d.deadline_date - CURRENT_DATE,
  cs.lead_lawyer_id
FROM deadlines d
JOIN cases cs ON cs.id = d.case_id
JOIN clients c ON c.id = cs.client_id
WHERE d.status = 'upcoming'
  AND d.deadline_type IN ('court_hearing', 'master_calendar_hearing', 'individual_hearing', 'mediation', 'arbitration')
  AND d.deadline_date - CURRENT_DATE <= 14

UNION ALL

-- Alertas urgentes sin resolver
SELECT
  c.full_name, COALESCE(cs.matter_name, 'No case'),
  CONCAT('URGENT: ', a.alert_type),
  EXTRACT(EPOCH FROM (NOW() - a.created_at))/3600 as hours_open,
  cs.lead_lawyer_id
FROM urgent_alerts a
JOIN clients c ON c.id = a.client_id
LEFT JOIN cases cs ON cs.id = a.case_id
WHERE a.status NOT IN ('resolved')

ORDER BY days_remaining ASC NULLS LAST;
```

---

## Cómo Sofia interactúa con la BD

### Al recibir mensaje de cliente:
1. Buscar cliente → cargar `clients` + `client_profile` + `cases` activos
2. Si hay safety concerns flagged: aplicar protocolo seguro
3. Cargar últimas conversations
4. Generar respuesta contextualizada con la rama activa del caso

### Al recibir documento:
1. OCR + Claude extraction según rama
2. Clasificar `doc_category` automáticamente
3. Si es court order o pleading: extraer deadlines → insertar en `deadlines`
4. Si es USCIS notice: extraer receipt + status → actualizar `case_migratorio_details`
5. Si es severance offer: alerta inmediata + crear deadline para deciding
6. Insertar en `documents` con metadata completa
7. Confirmar al cliente

### Mensualmente (post-conversaciones):
1. Actualizar `client_profile` con observaciones
2. Detectar si responsiveness score bajó → flag al lawyer
3. Si caso se acerca a SOL: alerta proactiva

---

## Reglas de retention

| Tipo | Retención mínima | Por qué |
|------|------------------|---------|
| Case files | 5–10 años post-cierre | Bar association rules (varía por estado) |
| Court filings | Permanente | Reference futura |
| Client communications | 5+ años | Disputas / malpractice claims |
| Privileged documents | Permanente o hasta cliente solicita destrucción | Privilege management |
| DV-related (con permiso del cliente) | Según wishes del cliente | Safety |

---

## Export del cliente

```
export_{despacho}_{client}_{timestamp}.zip
├── README.md
├── client_profile.json
├── cases/
│   ├── {case_id}/
│   │   ├── case_summary.json
│   │   ├── timeline.json
│   │   ├── pleadings/
│   │   ├── correspondence/
│   │   ├── evidence/
│   │   └── settlement_docs/
├── permanent_documents/
├── conversations_history.json
└── deadlines_calendar.ics
```
