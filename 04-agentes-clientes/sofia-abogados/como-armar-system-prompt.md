# Cómo Armar el System Prompt de Sofia para un Cliente

> Paso a paso para combinar las piezas modulares en un solo system prompt unificado, listo para pegar en Make.com.

---

## Pasos en orden

### Paso 1 — Identifica las piezas que aplican al cliente

Después de la llamada de onboarding, ya sabes:

- Qué **rama(s)** ejerce el despacho (mig, PI, familiar, laboral, etc.)
- Qué **estructura** tiene (unitario, pequeño 2–5, mediano 5–20)
- Las **variables del despacho** (nombre, abogado, horarios, precios)

### Paso 2 — Concatena los archivos en este orden estricto

```
1. system-prompt-base.md                   (la parte universal)
   +
2. ramas/[rama1].md                        (módulo de la primera rama)
   +
2b. ramas/[rama2].md                       (si aplica una segunda rama)
   +
3. estructura-despacho/[estructura].md     (módulo de la estructura)
   +
4. ../canales/canal-sms.md                 (si tiene SMS Add-on)
   +
4b. ../canales/canal-voz.md                (si tiene Voice Add-on)
```

### Paso 3 — Reemplaza variables

Buscar y reemplazar en TODO el texto unificado:

| Placeholder | Reemplazar con |
|-------------|----------------|
| `[NOMBRE_DESPACHO]` | El nombre comercial del despacho |
| `[DURACION_CONSULTA]` | "30 minutos" / "45 minutos" / "60 minutos" |
| `[PRECIO_CONSULTA]` | "150" / "200" / "GRATIS" según el cliente |
| `[HORARIOS_DESPACHO]` | "L–V 9am–6pm, sábados 10am–2pm" |
| `[NOMBRE_ABOGADO_PRINCIPAL]` | Nombre del abogado o partner principal |
| `[ABOGADOS_DEL_DESPACHO]` | Lista (solo para despacho pequeño/mediano) |
| `[CONTACTO_ESCALACION_URGENTE]` | Teléfono o canal del designado |

### Paso 4 — Valida el resultado

Antes de pegarlo en Make.com:

- [ ] ¿Quedaron placeholders sin reemplazar? (buscar `[` en todo el texto)
- [ ] ¿Hay contradicciones entre módulos? (raro pero posible si combinas 2+ ramas)
- [ ] ¿El tono es coherente?
- [ ] ¿Las urgencias específicas de la rama están claramente listadas?

### Paso 5 — Pegar en Make.com

En el módulo HTTP que llama a Claude API:
- **Campo `system`:** pegar el system prompt unificado completo
- **Campo `model`:** `claude-sonnet-4-6`
- **Campo `temperature`:** `0.5`
- **Campo `max_tokens`:** `1500`

### Paso 6 — Test antes de go-live

Pruebas mínimas en Claude.ai antes de Make.com:

1. **Conversación cliente nuevo** — ¿hace las preguntas correctas según la rama?
2. **Conversación cliente con caso activo** — ¿da estatus, recuerda documentos?
3. **Caso urgente específico de la rama** — ¿escala correctamente?
4. **Documento típico de la rama** — ¿extrae lo correcto, detecta lo urgente?
5. **Caso fuera del área de práctica** — ¿lo rechaza educadamente?

---

## Ejemplo concreto: Despacho de Personal Injury con 4 abogados

### Piezas a combinar
- ✅ `system-prompt-base.md`
- ✅ `ramas/personal-injury.md`
- ✅ `estructura-despacho/despacho-pequeno.md`

### Variables del cliente (ejemplo ficticio)
- `[NOMBRE_DESPACHO]`: "Hernández Injury Law"
- `[DURACION_CONSULTA]`: "30 minutos"
- `[PRECIO_CONSULTA]`: "GRATIS"
- `[HORARIOS_DESPACHO]`: "L–V 8:30am–6pm, sábados con cita"
- `[NOMBRE_ABOGADO_PRINCIPAL]`: "Carlos Hernández"
- `[ABOGADOS_DEL_DESPACHO]`: "Carlos Hernández (managing), Ana López (associate), Diego Vargas (associate), Patricia Ruiz (paralegal senior)"
- `[CONTACTO_ESCALACION_URGENTE]`: "+1-310-XXX-XXXX (WhatsApp directo a Carlos)"

### Resultado
Un solo bloque de texto que tiene:
- Toda la base universal (idioma, escalación, agendamiento, límites legales)
- Conocimiento específico de PI (tipos de accidente, statute of limitations, médicos preferidos, lien doctors, etc.)
- Lógica de ruteo entre los 4 abogados (qué casos a Carlos vs associates)

---

## Ejemplo concreto: Abogada unitaria que ejerce migratorio + familiar

### Piezas a combinar
- ✅ `system-prompt-base.md`
- ✅ `ramas/migratorio.md`
- ✅ `ramas/familiar.md`
- ✅ `estructura-despacho/abogado-unitario.md`

### Lo crítico de combinar 2 ramas

Cuando un despacho ejerce **dos ramas**, Sofia debe poder:
1. **Detectar de qué rama es cada lead** desde el primer mensaje
2. **Aplicar las urgencias correctas** de cada rama
3. **No confundir vocabularios** (ej: "custodia" en familiar vs "custodia" migratoria/ICE)

El módulo de `ramas/familiar.md` y `ramas/migratorio.md` incluyen instrucciones específicas para coexistir cuando se usan juntos.

---

## Tabla de combinaciones recomendadas

| Tipo de cliente | Combinación |
|-----------------|-------------|
| Abogada migratoria (1 persona) | base + migratorio + abogado-unitario |
| Despacho de PI con 4 abogados | base + personal-injury + despacho-pequeno |
| Abogado familiar + laboral (unitario) | base + familiar + laboral + abogado-unitario |
| Firma migratoria con 8 abogados | base + migratorio + despacho-mediano |
| Despacho mixto (mig + fam + PI) | base + 3 ramas + despacho-mediano |
| Bufete laboral grande | base + laboral + despacho-mediano |
| Despacho corporativo bicultural | base + mercantil + despacho-pequeno |
| Mercantil + laboral (small business) | base + mercantil + laboral + abogado-unitario |

---

## Tamaño del system prompt resultante

Estimado de tokens (input al modelo):

| Combinación | Tokens aprox |
|-------------|--------------|
| Solo base + 1 rama + unitario | ~2,500 |
| Base + 1 rama + despacho mediano | ~3,200 |
| Base + 2 ramas + despacho mediano | ~4,000 |
| Base + 3 ramas + despacho mediano | ~5,500 |

> El máximo recomendado por system prompt es **8,000 tokens**. Más allá afecta calidad y costo. Si un despacho ejerce 4+ ramas, considerar dividir en agentes separados por rama.

---

## Versionamiento

Cada vez que actualices el system prompt de un cliente:

1. **No editar directamente** — duplicar el archivo con sufijo de fecha (`hernandez-2026-05-12.md`)
2. **Anotar el cambio** en un changelog dentro del archivo del cliente
3. **Test antes de subir a producción** — al menos las 5 pruebas básicas
4. **Backup del prompt anterior** por si hay que rollback

Esto se vuelve crítico cuando tengas 5+ clientes activos.
