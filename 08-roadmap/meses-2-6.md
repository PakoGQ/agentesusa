# Roadmap — Meses 2 a 6

> Fase de crecimiento y consolidación. Objetivo al cierre del mes 6: **13 clientes activos, MRR $38,200**.

---

## Mes 2 — Primer agente en producción + 2do cliente

### Objetivos
- Primer cliente piloto en producción (semana 5–6)
- Segundo cliente firmado y en construcción
- Tercer cliente en negociación

### Hitos de Francisco
- [ ] Go-live del primer agente (semana 5)
- [ ] Tuning intensivo durante la primera semana en vivo
- [ ] Llamada de revisión 30 días con el primer cliente
- [ ] Cerrar segundo cliente
- [ ] Onboarding del segundo cliente
- [ ] Iniciar prospección activa en sector legal (abogados migratorios)

### Hitos técnicos
- [ ] Documentar el proceso de construcción del primer agente paso a paso
- [ ] Crear templates de Make.com replicables
- [ ] Construir Flujos 3, 4 y 5 (agendamiento, recordatorios, escalación)
- [ ] Implementar primer reporte semanal real (Flujo 6)

### Métricas
- 1 agente en producción
- 1 cliente en construcción
- MRR: $2,200
- Conversaciones nuevas con prospectos: 8–10

---

## Mes 3 — Validación del modelo

### Objetivos
- Primer mes con 3 clientes activos
- Caso de éxito documentado del primer cliente
- Sistema replicable validado

### Hitos de Francisco
- [ ] Solicitar quote y testimonio al primer cliente
- [ ] Documentar primer caso de éxito formalmente
- [ ] Agendar 5–7 llamadas de diagnóstico nuevas/semana
- [ ] Cerrar 3er y 4to cliente
- [ ] Definir y validar el system prompt completo del agente de logística (preparación para mes 4+)

### Hitos técnicos
- [ ] Construir Flujo 7 (seguimiento proactivo)
- [ ] Implementar dashboard de Capa 3 para clientes Pro
- [ ] Optimización del consumo de Claude API (cache de respuestas frecuentes)
- [ ] Migrar Make.com a plan Pro si las operations >10K/mes

### Métricas
- 3 clientes activos (2 contadores + 1 abogado)
- MRR: $7,600 (2x $2,200 + 1x $3,200)
- 1 caso de éxito publicable
- Conversaciones nuevas: 12–15

---

## Mes 4 — Aceleración + Logística entra al pipeline

### Objetivos
- 5 clientes activos
- Primer cliente piloto de logística (en negociación, no necesariamente cerrado)
- Empezar a invertir en marketing de contenido

### Hitos de Francisco
- [ ] Cerrar 5to cliente (contador o abogado)
- [ ] Comenzar prospección activa en logística
- [ ] Asistir a 1 evento de comercio internacional (red presencial)
- [ ] Publicar 4 posts en LinkedIn con casos reales (con permisos)
- [ ] Caso de éxito completo del segundo cliente

### Hitos técnicos
- [ ] Página vertical específica para logística publicada
- [ ] Primer borrador del system prompt de logística (basado en investigación de cliente piloto)
- [ ] Mejoras al pipeline de procesamiento de documentos (más tipos)
- [ ] Implementar autenticación 2FA para los dashboards de clientes

### Métricas
- 5 clientes activos
- MRR: ~$13,000–14,000
- 2 casos de éxito documentados
- Pipeline logística: 3–5 conversaciones activas

---

## Mes 5 — Consolidación y refinamiento

### Objetivos
- 10 clientes activos
- Primer cliente Elite (upgrade de existente o nuevo)
- Operación más automatizada (menos toque manual de Francisco)

### Hitos de Francisco
- [ ] Convertir un cliente Pro a Elite con upgrade
- [ ] Cerrar primer cliente piloto de logística (ofrecer 30–40% descuento setup)
- [ ] Empezar a delegar onboarding técnico al socio técnico (si está disponible)
- [ ] Definir métricas operativas y revisar mensualmente con un dashboard propio
- [ ] Caso de éxito del cliente que upgrade a Elite

### Hitos técnicos
- [ ] Implementar integraciones Elite: QuickBooks (contadores), Clio (abogados)
- [ ] Refinar OCR — target 95%+ accuracy en documentos típicos
- [ ] Implementar versioning del system prompt (seguir cambios)
- [ ] Sistema de A/B testing para variantes del agente

### Métricas
- 10 clientes activos
- MRR: ~$24,000–28,000
- 1 cliente Elite
- 3 casos de éxito documentados

---

## Mes 6 — Cierre del semestre + 2 clientes logística

### Objetivos
- 13 clientes activos según proyección
- 2 clientes activos en logística (primero en producción, segundo en construcción)
- MRR objetivo: $38,200

### Hitos de Francisco
- [ ] Cerrar 2 clientes adicionales
- [ ] Cerrar segundo cliente de logística
- [ ] Revisión estratégica de los próximos 6 meses
- [ ] Decisión sobre primer hire (¿customer success? ¿developer?)
- [ ] Renegociación de contratos cumpliendo 6 meses (asegurar continuidad anual)

### Hitos técnicos
- [ ] Primer agente de logística en producción
- [ ] Sistema robusto de migración de un nuevo cliente a Make.com en <8 horas
- [ ] Dashboard interno de salud de la operación (errores, latencia, satisfacción)
- [ ] Evaluación: ¿migrar a infraestructura propia con código, o seguir con Make.com?

### Métricas
- 13 clientes activos
- MRR: $38,200
- 2 clientes en logística
- 5+ casos de éxito documentados

---

## Distribución esperada de clientes por vertical

| Mes | Contadores | Abogados | Logística | Total | MRR estimado |
|-----|-----------|----------|-----------|-------|--------------|
| 2 | 2 | 0 | 0 | 2 | $4,400 |
| 3 | 2 | 1 | 0 | 3 | $7,600 |
| 4 | 3 | 2 | 0 | 5 | $13,000 |
| 5 | 4 | 3 | 1 | 8 | $24,000 |
| 5.5 | 5 | 4 | 1 | 10 | $30,000 |
| 6 | 6 | 5 | 2 | 13 | $38,200 |

---

## Inversiones esperadas durante el semestre

| Concepto | Mes | Costo | Por qué |
|----------|-----|-------|---------|
| Make.com upgrade a Pro | 3 | $32/mes | Mayor volumen de operations |
| Make.com upgrade a Teams | 6 | $96/mes | 13 clientes activos |
| Adobe PDF API / AWS Textract | 2 | ~$50/mes | OCR documentos |
| Plausible Analytics | 1 | $9/mes | Tracking sitio web |
| LinkedIn Sales Navigator | 3 | $80/mes | Mejor prospección |
| Eventos / networking | 4–6 | ~$200/mes | Acceso a logística |
| Diseño profesional de un caso de éxito | 4 | $300 one-time | Material de venta |

**Total adicional al final del semestre:** ~$700/mes operativo + $300 one-time

---

## Decisiones críticas a tomar en el semestre

### Mes 3 — Decisión sobre socio técnico
Si el socio técnico no se incorpora full-time o part-time significativo en mes 3, considerar:
- Contratar developer freelance para construcción de integraciones
- Mantener Make.com como única plataforma indefinidamente

### Mes 4 — Decisión de marketing
Con 2 casos de éxito en mano, evaluar:
- Inversión en contenido (LinkedIn, blog) — orgánico
- Inversión en LinkedIn ads — pagado, dirigido a perfil exacto
- Pago a outbound agency — entre $2K–4K/mes

### Mes 6 — Decisión arquitectónica
Con 13 clientes:
- ¿Migrar a infraestructura propia con código?
- ¿Seguir 100% en Make.com hasta mes 9?
- ¿Modelo híbrido: Make.com para los simples, código para los Elite?

### Mes 6 — Primer hire
Con MRR de $38K y operación creciendo:
- ¿Customer success bilingüe en LA?
- ¿Developer en México?
- ¿Sales rep para acelerar prospección?

---

## Reglas que se mantienen durante todo el semestre

1. **Diagnóstico antes de propuesta** — siempre.
2. **Anclar en Pro** — siempre.
3. **Setup pagado upfront** — sin excepciones (excepto piloto #1 por vertical).
4. **El primer cliente por vertical es piloto** con descuento del 50% del setup a cambio de quote, caso de éxito y referidos.
5. **El cliente paga en USD** — sin excepciones.
6. **Tarifa por volumen incluida** — siempre.
7. **No invertir tiempo en clientes fuera de las 3 verticales** — Axel los cierra educadamente.
