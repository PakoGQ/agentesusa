# Módulos de Canal

> Estos módulos se concatenan al system prompt de cualquier agente (Sofia, Marco, logística) para activar comportamiento específico por canal de comunicación. Funcionan igual que las ramas de Sofia: se incluyen solo cuando el cliente contrata ese canal.

---

## Canales disponibles

### Default (incluidos en todos los paquetes desde Essential)

Estos canales ya están cubiertos por el comportamiento base del system prompt — no requieren módulo separado:

- **WhatsApp Business** — canal principal, idioma natural, soporta documentos y multimedia
- **Email** — formato más largo, soporta firma profesional
- **Web chat** — embebido en sitio del despacho, sesiones cortas

### Add-on disponibles desde Pro+

Estos requieren módulo específico porque cambian el comportamiento del agente:

| Módulo | Para qué | Requiere |
|--------|----------|----------|
| [canal-sms.md](canal-sms.md) | Comunicación por SMS estándar | Twilio + A2P 10DLC registration (3 semanas) |
| [canal-voz.md](canal-voz.md) | Llamadas de voz inbound | VAPI o Retell.ai + número telefónico |

### Pendiente de desarrollo (fase 2)

- **canal-instagram-dm.md** — DMs de Instagram (Meta Business Suite)
- **canal-facebook-messenger.md** — Messenger
- **canal-iMessage.md** — para clientes anglo en USA (requiere Apple Business Chat — alta barrera)

---

## Cómo se combinan

Cuando un despacho contrata un canal add-on, su system prompt se construye así:

```
system-prompt-base.md
  +
ramas/[la-rama].md (si aplica — solo Sofia)
  +
estructura-despacho/[el-tipo].md (si aplica — solo Sofia)
  +
canales/[canal-extra-1].md  ← NUEVO
  +
canales/[canal-extra-2].md  ← NUEVO (si aplica)
  +
config-despacho.md variables
```

Los módulos de canal van **al final** porque pueden sobrescribir comportamientos del system prompt base (ej: en voz, se prohíbe formato markdown).

---

## Detección automática del canal en cada conversación

Make.com pasa al system prompt del agente, en cada llamada, una variable `<active_channel>` con uno de estos valores:

```
whatsapp | email | web_chat | sms | voice_call
```

El agente detecta esta variable y aplica las reglas del canal correspondiente. Si el módulo de canal no está incluido en el system prompt y el cliente contacta por ese canal, Make.com debe rechazar el mensaje con un mensaje genérico ("Este canal no está activo, contáctanos por WhatsApp").

---

## Pricing y empaquetado

Los canales add-on se venden como **upgrades mensuales**, no incluidos en los paquetes base:

| Add-on | Precio cliente | Incluye |
|--------|----------------|---------|
| **SMS Add-on** | $50/mes | 200 SMS/mes, +$0.05/SMS extra |
| **Voice Add-on** | $150/mes | 100 min/mes voice inbound, +$0.30/min extra |
| **Bundle SMS + Voice** | $175/mes | 12% descuento |

Lanzamiento sugerido: **mes 4–5** después del primer cliente piloto operativo. Ver [05-ventas/precios-paquetes.md](../../05-ventas/precios-paquetes.md) para integración con paquetes existentes.

---

## Implementación técnica resumida

### SMS
- Twilio (o Telnyx) provee número y API
- A2P 10DLC registration ante carriers (3 semanas)
- Make.com webhook recibe mensajes entrantes
- Mismo flujo que WhatsApp con `<active_channel>=sms`

### Voz
- VAPI.ai o Retell.ai (recomendado — empaqueta TTS + STT + Claude)
- Twilio número de voz
- Configuración del agente en VAPI con system prompt unificado
- Webhook a Make.com cuando termina llamada para guardar transcripción y metadata
