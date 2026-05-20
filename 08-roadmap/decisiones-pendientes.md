# Decisiones Pendientes

> Lista viva de decisiones que están bloqueadas hasta que tú decidas. Cada decisión tiene contexto, opciones, recomendación y deadline.

---

## 1. Nombre definitivo de la empresa

**Estado:** Provisional → **"Nexus"** en uso. Decisión final pendiente.
**Bloqueo:** ya no bloquea el desarrollo del proyecto (todo se construye bajo "Nexus" provisionalmente). **Sí bloquea** la constitución formal de la LLC, compra de dominio definitivo y handles de redes sociales.
**Deadline sugerido:** Antes de iniciar el trámite de LLC.

### Opciones actuales

#### Opción A — Nexus AI

**Pros:**
- Moderno, tecnológico
- Sugerido conexión, hub
- Funciona en inglés y español
- Fácil de recordar

**Contras:**
- Genérico — hay muchas empresas con "nexus" en su nombre
- No comunica el ángulo bicultural
- Buscar conflictos: existe `nexus.ai`, `nexusai.com`, etc. — verificar disponibilidad real

#### Opción B — Puente AI

**Pros:**
- Diferencial bicultural explícito
- Narrativa fuerte: "el puente entre dos mundos"
- Memorable en cliente latino
- Probablemente más disponible como dominio

**Contras:**
- Cliente angloparlante puede no entenderlo (puente = bridge)
- Si decides escalar a otros mercados (Brasil, etc.), pierde sentido
- Puede sonar pequeño

### Otras opciones a considerar

- **Bridge AI** — versión inglesa de Puente. Pero "bridge" muy usado.
- **Cruce AI** — bicultural pero menos elegante
- **Frontera AI** — fuerte para corredor MX-USA, débil para abogados/contadores
- **Latitud AI** — neutro, sugiere mercado USA-MX
- **Atlas AI** — sólido pero usado
- **Origen AI** — interesante con narrativa de raíces

### Criterio de decisión recomendado

Pregúntate:
1. ¿En 5 años atiendo solo USA-LATAM o quiero escalar a Europa/Asia?
2. ¿Mi cliente angloparlante tiene problema con un nombre en español?
3. ¿Cómo se ve este nombre en 5 años en mi material institucional?

**Mi recomendación:** Si decides quedarte en el mercado USA con foco bicultural, **Puente AI** es más fuerte. Si planeas escalar global, **Nexus AI** o algo nuevo más neutro.

### Una vez decidido

- [ ] Verificar disponibilidad en [Wyoming Business Search](https://wyobiz.wyo.gov)
- [ ] Verificar disponibilidad de dominio `.com`
- [ ] Verificar handles disponibles: LinkedIn, Instagram, X
- [ ] Comprar dominio
- [ ] Iniciar trámite LLC con el nombre definitivo

---

## 2. ¿System prompt único de logística o variantes por subsegmento?

**Estado:** Pendiente, no bloqueante hasta mes 4.

### Contexto

Logística no es uniforme:
- **Importadores/exportadores** — flujo: factura comercial → B/L → pedimento
- **Brokers / agentes aduanales** — manejan despacho aduanal puro
- **Transportistas** — operan camiones, comunicación con choferes
- **3PL (third-party logistics)** — almacenaje + distribución

### Opciones

**A. System prompt único genérico**
- Un solo agente que cubre todo
- Más fácil de mantener
- Menos preciso para cada caso

**B. 3 system prompts por subsegmento (importador, broker, transportista)**
- Más preciso
- Mayor complejidad de operación
- Mayor calidad para el cliente

**Recomendación:** Empezar con un único system prompt para el primer cliente piloto de logística (mes 5–7). Si los siguientes clientes tienen perfiles distintos y notamos calidad bajando, especializar en B.

---

## 3. ¿Claude Code complementa Make.com cuándo?

**Estado:** No bloqueante hasta mes 6.

### Contexto

Make.com es perfecto para:
- Flujos visuales y simples
- Iteración rápida
- Configurar sin código

Make.com es limitado para:
- Lógica condicional compleja con muchos branches
- Procesamiento de grandes volúmenes
- Integraciones custom con software del cliente
- Agentes con múltiples tools y memoria persistente avanzada

### Decisión recomendada

- **Hasta mes 6:** 100% Make.com
- **Mes 6+:** evaluar si Claude Code (vía Claude API directamente) ayuda en clientes Elite o casos específicos
- **Nunca:** abandonar Make.com completamente — sigue siendo el orquestador de mensajes

---

## 4. ¿Modelo de pricing de tarifa por volumen — facturar diariamente o mensualmente?

**Estado:** Bloqueante para configuración de Stripe.

### Contexto

La tarifa por volumen (ej: $0.35/doc arriba de 300/mes) puede facturarse:
- **Mensualmente al final del ciclo:** suma todos los docs procesados, factura el excedente
- **Tiempo real (metered billing):** cada documento procesado dispara una unidad de cobro

### Recomendación

**Mensualmente al final del ciclo.** Razones:
- Más simple operativamente
- El cliente entiende mejor "tu cuenta de este mes incluye 50 documentos extra: $X adicionales"
- Stripe Subscriptions permite "metered" pero requiere config más compleja

Configurar en Stripe Subscriptions con un item de "metered usage" reportado al final del ciclo vía API.

---

## 5. ¿Quién maneja el primer cliente de logística — Francisco solo o con socio técnico?

**Estado:** Crítico para timing del lanzamiento de logística.

### Opciones

**A. Francisco solo**
- Más control y aprendizaje propio
- Más lento — Francisco aún cierra contadores y abogados
- Posible burnout

**B. Esperar al socio técnico**
- Más rápido cuando arranca
- Riesgo: si el socio no se incorpora pronto, logística se atrasa indefinidamente

**Recomendación:** A si el socio técnico no se compromete a part-time mínimo en mes 4. Si para mes 4 el socio confirma 20+ horas/semana, B.

---

## 6. ¿Renta de oficina en LA?

**Estado:** No urgente.

### Contexto

Operar 100% remoto desde Guadalajara funciona técnicamente, pero:
- Algunos prospectos prefieren proveedor con presencia física
- Eventos en LA ayudan a la marca
- Tener dirección USA real (no solo registered agent) genera credibilidad

### Opciones

**A. Solo registered agent (actual)**
- Costo: $50/año
- Suficiente para arrancar
- Limitado en credibilidad

**B. Coworking en LA (mes 6+)**
- Costo: $300–600/mes
- Dirección real
- Espacio para reuniones cuando viajes

**C. Oficina dedicada (mes 12+)**
- Solo si hay equipo en LA
- Costo: $1,500–3,000/mes

**Recomendación:** A hasta mes 6, evaluar B en mes 6 con MRR de $38K.

---

## 7. ¿Cuándo lanzar Capa 3 (inteligencia) en serio?

**Estado:** Definido en system prompts pero no implementado en producción.

### Contexto

Capa 3 (dashboards, insights, predicciones) es el diferencial para upsell de Pro a Elite. Pero requiere:
- Tener data acumulada (al menos 90 días por cliente)
- Sistema de visualización (Supabase + dashboard custom o Retool)
- Lógica de detección de patrones

### Decisión

- **Mes 3:** primera versión simple (reporte mensual con texto generado por Claude — incluido en Pro)
- **Mes 5:** dashboard visual primer cliente Elite
- **Mes 7+:** Capa 3 robusta con predicciones para todos los Elite

---

## 8. ¿Idioma del primer cliente piloto — español o inglés primero?

**Estado:** Decisión menor.

### Contexto

El agente debe ser bilingüe desde día 1 (auto-detect). Pero el primer cliente probablemente atiende mayoría en uno u otro idioma.

### Recomendación

Lanzar bilingüe full desde día 1. No diferenciar por cliente. Si un cliente atiende 100% en inglés, el agente nunca usará español pero está disponible.

---

## Cómo actualizar este archivo

Cada vez que tomes una decisión:
1. Marcar como `**Estado: DECIDIDO**`
2. Documentar qué se eligió y por qué
3. Eliminar el resto de las opciones para no confundir luego
4. Mover decisiones tomadas a una sección "Decisiones cerradas" al final

---

## Decisiones cerradas

(vacío por ahora — se llena conforme se vayan tomando)
