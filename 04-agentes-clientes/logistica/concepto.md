# Agente para Logística México-USA

> **Estado:** Vertical de fase 2. System prompt y configuración detallada se construyen en los meses 4–6, una vez consolidadas las verticales de contadores y abogados.

---

## Por qué es la joya de la corona

- **Ticket más alto** de las 3 verticales (Pro: $4,500/mes, Elite: $7,500/mes)
- **Stickiness máximo** — integrado a la operación core del cliente
- **Demanda constante** todo el año (sin estacionalidad como contadores)
- **Corredor México-USA es ventaja territorial natural de Francisco** — nadie puede comprar esa expertise

---

## Concepto general

**Nombre tentativo del agente:** A definir (sugerencias: Carlos, Valentina, o nombre neutro tipo "Tara")
**Rol:** Agente de operaciones bilingüe para corredor México-USA
**Tono:** Operativo, preciso, bilingüe nativo. El mundo de la logística tiene su propio vocabulario — el agente lo domina en ambos idiomas sin confusión.

---

## Cliente objetivo

- **Empresas que operan en el corredor México-USA**
- **Volumen:** 20–500 embarques mensuales (sweet spot)
- **Comunicación:** dos idiomas, dos zonas horarias, dos sistemas regulatorios
- **Equipo:** 5–50 personas
- **Tipo:** Importadores/exportadores, agentes aduanales, brokers, transportistas con flota mediana

### Perfil ideal

- Empresa establecida (3+ años operando)
- Ya tiene CRM o TMS pero la comunicación es fragmentada
- El despachador o customer service es cuello de botella
- Pierde negocio por demoras de respuesta o errores de documentación

---

## Pain points principales

1. **Comunicación fragmentada** entre despachadores, transportistas, agentes aduanales y clientes
2. **Documentación incompleta o inconsistente** que genera demoras en aduana
3. **Seguimiento manual** del estatus de cada embarque
4. **Coordinación compleja** entre dos idiomas y zonas horarias
5. **Cotizaciones lentas** porque requieren consultar múltiples transportistas
6. **Errores en pedimentos** que se descubren tarde

---

## Las 3 capas aplicadas a logística

### Capa 1 — Comunicación

- **Confirmación automática** de pickups y entregas (cliente, transportista, despachador)
- **Notificaciones de estatus** en tiempo real (en tránsito, en aduana, entregado)
- **Coordinación bilingüe** — clientes USA reciben en inglés, transportistas MX en español
- **Manejo de incidencias** — detección de retrasos, comunicación de causa, acción sugerida
- **Atención 24/7** — embarques no respetan horario de oficina

### Capa 2 — Trabajo interno

- **Extracción de datos** de facturas comerciales, B/L (Bill of Lading), packing lists
- **Lectura y validación** de pedimentos de importación/exportación
- **Detección de inconsistencias** entre documentos del mismo embarque (ej: factura comercial vs B/L)
- **Comparación de cotizaciones** de transportistas y recomendación de mejor opción
- **Checklist de cumplimiento aduanal** por tipo de mercancía
- **Extracción y resumen** de pólizas de seguro de carga

### Capa 3 — Inteligencia

- **Dashboard operativo:** embarques activos, en tránsito, entregados, retenidos
- **Detección de patrones:** rutas o transportistas con retrasos recurrentes
- **Reportes diarios** de operaciones (vs semanal de otras verticales)
- **Análisis de costo por ruta** — identificar dónde se está perdiendo margen
- **Predicción de demoras** por temporada o eventos (ej: revisiones aduanales reforzadas)

---

## Diferenciación vs competencia

**Competidores típicos:**
- TMS genéricos (Magaya, CargoWise) — caros, requieren training, no resuelven la comunicación
- Software bilingüe enterprise — $5,000+/mes, fuera de alcance para PyMEs
- Apps de tracking (Project44, FourKites) — solo tracking, no operación end-to-end

**Nuestra ventaja:**
- Especializado en corredor México-USA (no genérico global)
- Bilingüe nativo (no traducción automática)
- Integrado a TMS existente del cliente (no reemplaza, complementa)
- Operación desde México con costo competitivo

---

## Integraciones planeadas (paquete Elite)

| Sistema | Tipo | Prioridad |
|---------|------|-----------|
| Magaya | TMS | Alta |
| CargoWise | TMS | Alta |
| Descartes | Aduana | Media |
| Sistemas internos del cliente (API custom) | Variable | Por cliente |
| WhatsApp Business | Comunicación | Crítica |
| Email del cliente | Comunicación | Crítica |

---

## Por qué esperar al mes 7

1. **Complejidad técnica mayor:** integración con TMS, lectura de pedimentos, validaciones aduanales
2. **Ciclo de venta más largo:** decisiones de compra B2B en logística requieren más stakeholders
3. **Validación necesaria:** entrar con casos de éxito documentados de las otras 2 verticales acelera el cierre
4. **Tiempo para construir vocabulario técnico** correcto en ambos idiomas

---

## Métricas que validarán el lanzamiento

- 2 clientes piloto firmados al cierre del mes 7
- Tiempo de respuesta del agente <30 seg para queries frecuentes
- 95%+ de extracciones correctas de datos de pedimento
- Cero confusiones de idioma (cliente USA recibe inglés, transportista MX recibe español)

---

## Construcción del system prompt

El system prompt detallado se construye con las siguientes entradas (recopilar entre meses 4–6):

1. **Glosario terminológico** completo bilingüe (ver [vocabulario-tecnico.md](vocabulario-tecnico.md))
2. **Ejemplos de conversaciones reales** del cliente piloto
3. **Tipos de mercancía manejados** y sus requisitos aduanales específicos
4. **Tipos de incidencia recurrentes** y protocolo de manejo
5. **Estructura de datos del TMS** existente del cliente

El primer borrador del system prompt se desarrollará después de la primera llamada de descubrimiento profundo con el cliente piloto.
