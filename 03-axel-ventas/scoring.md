# Sistema de Scoring de Axel

> El score es **interno**. Nunca se menciona al prospecto, nunca aparece en mensajes salientes.

---

## Tabla de criterios

| Criterio | Puntos | Cómo lo detecta |
|----------|--------|-----------------|
| Sector objetivo (legal, contable, logística) | **+3** | Pregunta directa en Etapa 2 |
| Negocio establecido con clientes activos | **+3** | Menciona número de clientes o años de operación |
| Opera en USA o tiene clientes en USA | **+2** | Geografía explícita |
| Más de 5 empleados o 50+ clientes | **+2** | Números mencionados |
| Menciona dolor operativo claro | **+2** | Lenguaje tipo "pierdo tiempo", "es un caos", "no doy abasto" |
| Pregunta por precio o siguientes pasos | **+2** | Señal de intención |
| Reacciona positivo a la demo | **+2** | "wow", "interesante", "exactamente eso", emoji positivo |
| Negocio muy pequeño o sin presupuesto | **−3** | Solopreneur sin clientes, side hustle, "estoy empezando" |

**Score máximo posible:** 16
**Mínimo:** −3

---

## Acciones por rango de score

### 🔥 Score 10+ — Prospecto caliente

**Mensaje al prospecto:**
> Me da gusto que esto resuene contigo. Francisco, el fundador, tiene 2 espacios disponibles esta semana para una llamada de 30 min donde te mostraría exactamente cómo sería el agente para [su empresa]. ¿El martes o el jueves te funciona mejor?

**Notificación a Francisco** (vía WhatsApp):
```
🔥 PROSPECTO CALIENTE
Nombre: [Nombre]
Sector: [sector]
Canal: [LinkedIn / Web / WhatsApp / Email]
Score: [X]/16

Resumen del negocio:
[2 líneas con: tipo de negocio, tamaño, dolor principal]

Pregunta clave que hizo:
[Su demo example]

Listo para llamada. Calendly: [link]
```

### 👀 Score 6–9 — Prospecto tibio

**Mensaje al prospecto:**
> Te mando un caso de un [sector similar] que ya está usando algo parecido a lo que construiríamos para ti. Lo lees con calma y te escribo en un par de días para ver qué piensas.

**Acción de Axel:**
- Envía caso de éxito relevante (PDF o link a página)
- Programa follow-up en 48 horas
- Si responde positivo al caso de éxito → reevaluar score, probable salto a 10+

**Notificación a Francisco:**
```
👀 PROSPECTO TIBIO
Nombre: [Nombre]
Sector: [sector]
Score: [X]/16
Estado: caso de éxito enviado, follow-up en 48h
```

### 📚 Score 1–5 — Prospecto frío pero válido

**Mensaje al prospecto:**
> Te mando más información sobre cómo otros negocios están usando la IA. ¿Puedo enviarte un caso de éxito de alguien en tu mismo sector?

**Acción de Axel:**
- Agrega a lista de nutrición mensual
- Una vez al mes Francisco (o Axel automatizado) manda contenido relevante: nuevo caso, post de blog, video corto

### ❌ Score 0 o negativo — Cierre educado

**Mensaje al prospecto:**
> Entiendo, quizás no es el momento ideal. Si en algún momento tu operación crece y quieres explorar la IA, aquí estaremos.

**Acción de Axel:**
- Marca como `closed_unfit` en CRM
- No follow-ups automáticos
- (Posible re-contacto manual de Francisco en 6+ meses)

---

## Cómo Axel reporta el score internamente

En cada llamada a Claude API, el system prompt incluye instrucciones para que al final de la respuesta Axel devuelva un bloque JSON oculto que Make.com parsea:

```json
{
  "stage": 4,
  "score": 12,
  "lead_status": "hot",
  "next_action": "schedule_call",
  "summary": "Despacho contable LA, 80 clientes, dolor en temporada de impuestos",
  "language": "es"
}
```

Este bloque va al final del response, dentro de tags `<axel_meta>...</axel_meta>` que Make.com extrae y NO envía al prospecto.

---

## Reglas de actualización del score

- **El score solo sube** dentro de la misma conversación. Nunca baja.
- **Un score fijado se "congela"** después de la Etapa 5 — no se reevalúa salvo que el prospecto vuelva a contactar.
- **Si pasan 30 días sin respuesta**, el lead vuelve a entrar como "frío" en cualquier nueva conversación.
- **Si el prospecto pregunta directo el precio sin pasar por las etapas**, sube su score automáticamente +2 (señal fuerte de intención).
