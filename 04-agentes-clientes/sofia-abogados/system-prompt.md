# Sofia — System Prompt (Modular)

> ⚠️ **Este archivo ya no contiene el system prompt completo.** Sofia ahora es modular.

## Cómo armar el system prompt

El system prompt de Sofia se construye combinando piezas:

```
system-prompt-base.md
        +
ramas/[la-rama-del-despacho].md
        +
estructura-despacho/[el-tipo-del-despacho].md
        +
variables específicas de config-despacho.md
```

Ver el paso a paso completo en [como-armar-system-prompt.md](como-armar-system-prompt.md).

## Componentes disponibles

- **Base universal:** [system-prompt-base.md](system-prompt-base.md)
- **Ramas del derecho:** [ramas/](ramas/) (migratorio, personal-injury, familiar, laboral)
- **Estructuras de despacho:** [estructura-despacho/](estructura-despacho/) (unitario, pequeño, mediano)
- **Configuración por cliente:** [config-despacho.md](config-despacho.md)

## Por qué modular

Originalmente Sofia era un solo system prompt para abogados migratorios. Al expandir a más ramas (PI, familiar, laboral, etc.) y diferentes estructuras de despacho (unitario vs despacho de 10 abogados), un solo prompt monolítico se volvió impracticable.

La estructura modular permite:
- Cobertura de múltiples ramas legales sin duplicar código
- Reusar la lógica universal entre todos los clientes
- Personalizar por estructura organizacional del cliente
- Agregar nuevas ramas sin afectar las existentes
