# Roadmap — Semanas 1 a 4

> Las primeras 4 semanas son las más críticas. Objetivo: tener LLC, banco, primer cliente piloto y agente funcional.

---

## Semana 1 — Foundation sin código

### Acciones de Francisco (lo indispensable)

- [ ] Decidir nombre definitivo de la empresa (ver [decisiones-pendientes.md](decisiones-pendientes.md))
- [ ] Verificar disponibilidad del nombre en Wyoming + dominio + LinkedIn
- [ ] Contratar Northwest Registered Agent → empezar trámite LLC
- [ ] Comprar dominio `.com`
- [ ] Identificar 5 prospectos en red personal:
  - 3 contadores bilingües en LA (LinkedIn)
  - 2 abogados migratorios bilingües en LA
- [ ] Mandar primer toque manual de LinkedIn (ver [03-axel-ventas/plantillas-mensajes.md](../03-axel-ventas/plantillas-mensajes.md) sección A)

### Acciones técnicas (Francisco + Claude)

- [ ] Probar los 3 system prompts (Axel, Sofia, Marco) en Claude.ai abriendo conversaciones nuevas
- [ ] Crear cuenta gratuita de Make.com
- [ ] Familiarizarse con la interfaz visual de Make.com
- [ ] Crear cuenta Anthropic Console + obtener API key
- [ ] Crear cuenta gratuita Supabase

### Outputs de la semana
- ✅ Nombre decidido y dominio comprado
- ✅ LLC en proceso
- ✅ 5 conversaciones abiertas en LinkedIn
- ✅ Stack de cuentas listas

---

## Semana 2 — Primer flujo funcional + LLC activa

### Acciones de Francisco

- [ ] Confirmar EIN emitido (debe llegar al final de semana 1 o inicio de 2)
- [ ] Abrir Mercury Bank (24–72h una vez tengas EIN)
- [ ] Continuar conversaciones de LinkedIn — Axel toma desde la respuesta
- [ ] Programar 2–3 llamadas de diagnóstico (30 min cada una)
- [ ] Si alguien muestra alto interés: ofrecer paquete piloto (50% setup descuento, condiciones de [casos-de-exito](../05-ventas/casos-de-exito/README.md))

### Acciones técnicas

- [ ] Construir Flujo 1 de Make.com (recepción de mensajes — solo WhatsApp inicialmente)
- [ ] Conectar Claude API al flujo
- [ ] Conectar Supabase al flujo (tabla básica `messages`)
- [ ] Test end-to-end: mensaje WhatsApp → Claude responde → guardar en Supabase
- [ ] Empezar cuenta Framer + estructura inicial del sitio web (sección 1: Hero + sección 2: Problema)

### Outputs de la semana
- ✅ LLC + EIN + Mercury Bank funcionales
- ✅ Primer flujo de Make.com respondiendo en WhatsApp
- ✅ 2–3 llamadas de diagnóstico realizadas
- ✅ 1–2 prospectos en negociación de piloto

---

## Semana 3 — Cierre de primer cliente + Web

### Acciones de Francisco

- [ ] Cerrar primer cliente piloto (ideal: contador por ciclo de venta corto)
- [ ] Firmar contrato + cobrar 50% setup
- [ ] Agendar onboarding call (90 min) para semana 4
- [ ] Preparar materiales de onboarding ([06-onboarding/checklist-cliente-nuevo.md](../06-onboarding/checklist-cliente-nuevo.md))
- [ ] Continuar prospección — meta: 2–3 conversaciones nuevas por semana

### Acciones técnicas

- [ ] Configurar Stripe vinculado a Mercury
- [ ] Configurar Wave Accounting
- [ ] Construir página web — secciones 3, 4 y 7 (Soluciones, Demo, Precios)
- [ ] Subir versión draft del sitio para revisión
- [ ] Configurar WhatsApp Business API (este es el paso técnico más complejo — puede tomar 3–5 días de aprobación de Meta)

### Outputs de la semana
- ✅ Primer cliente firmado y pagado (50%)
- ✅ Página web 70% lista
- ✅ Stripe activo
- ✅ WhatsApp Business API en proceso o ya aprobada

---

## Semana 4 — Onboarding + Construcción del primer agente

### Acciones de Francisco

- [ ] Onboarding call de 90 min con primer cliente
- [ ] Llenar [config-despacho.md](../04-agentes-clientes/[vertical]/config-despacho.md) en vivo
- [ ] Recopilar 5–10 documentos típicos del cliente
- [ ] Mandar resumen escrito al cliente al día siguiente
- [ ] Cerrar 1–2 leads adicionales (segundo y tercer cliente)

### Acciones técnicas

- [ ] Personalizar system prompt para el primer cliente (variables reemplazadas)
- [ ] Pre-cargar clientes existentes del despacho en Supabase
- [ ] Construir Flujo 2 (procesamiento de documentos) — al menos en versión beta
- [ ] Configurar OCR (Adobe PDF API o AWS Textract)
- [ ] Página web completa y publicada
- [ ] Configurar Calendly para agendar llamadas con Francisco

### Outputs de la semana
- ✅ Primer cliente en construcción de agente (día 14 de su onboarding)
- ✅ Página web live
- ✅ Pipeline con 2–3 prospectos calificados adicionales
- ✅ Primera versión de los 2 flujos core de Make.com funcionando

---

## Métricas de éxito al final de la semana 4

| Métrica | Target |
|---------|--------|
| LLC + EIN + banco | ✅ Activo |
| Página web | ✅ Live |
| WhatsApp Business API | ✅ Aprobada |
| Clientes firmados | ≥ 1 (idealmente 2) |
| Conversaciones activas con prospectos | ≥ 5 |
| Flujos de Make.com funcionando | 2 (recepción + documentos) |
| MRR proyectado próximos 30 días | $2,200+ (1 cliente Pro contadores) |

---

## Riesgos y plan de contingencia

### Riesgo: LLC tarda más de 2 semanas
**Acción:** Continuar prospección y demos. Cobrar primer setup en la cuenta personal de Mercury (USA) si es necesario, transferir a la business cuando esté lista.

### Riesgo: WhatsApp Business API no aprobada
**Acción:** Arrancar primer cliente solo con web chat + email. Migrar a WhatsApp cuando se apruebe.

### Riesgo: Ningún cliente cierra en 4 semanas
**Acción:** Pivot a outreach más agresivo (email frío con Instantly.ai). Considerar bajar precio del primer piloto a 30% del setup como incentivo final.

### Riesgo: Primer cliente piloto no es buen fit
**Acción:** Ser explícito en la llamada de diagnóstico: si no encaja con el perfil objetivo, decir que no. Mejor cerrar 0 clientes que un cliente malo en el mes 1.

---

## Lo que NO hay que hacer en estas 4 semanas

- ❌ Construir agente de logística (es fase 2)
- ❌ Construir integraciones Elite (Clio, QuickBooks, TMS)
- ❌ Pagar publicidad (LinkedIn ads, Facebook ads) — el ROI es bajo en B2B sin marca aún
- ❌ Contratar a alguien — es todavía operación de un fundador
- ❌ Sobre-construir Make.com — basta con los flujos 1 y 2 funcionando, los demás se agregan al cliente real

---

## Cadencia operativa diaria

**Lunes** — Outreach (LinkedIn, email): 5–10 nuevos toques manuales
**Martes** — Llamadas de diagnóstico agendadas
**Miércoles** — Construcción técnica (Make.com, página web, system prompts)
**Jueves** — Llamadas de diagnóstico + seguimientos
**Viernes** — Construcción técnica + revisión de la semana
**Sábado** — Off (recargar para no quemarse)
**Domingo** — Planificación de la semana siguiente (1 hora)
