## Why
IP-703 solicita aclarar a las personas que consultan Inicio que los montos del resumen de su cuenta incluyen IVA. La frase introductoria actual no ofrece esa información, por lo que se actualizará con la aclaración exacta solicitada.

## What Changes
- Actualizar la frase de introducción de Inicio para indicar que los montos incluyen IVA.
- Conservar sin cambios las tarjetas y sus enlaces de Inicio.

## Capabilities
### New Capabilities
- `home-amounts-disclosure`: aclara que los montos del resumen de cuenta en Inicio incluyen IVA.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita al texto de introducción de Inicio en `src/pages/HomePage.tsx` y a su comportamiento visible. Se asume que la frase existente se conserva completa y que «Los montos incluyen IVA.» se agrega a continuación; no cambian las tarjetas, sus etiquetas ni sus enlaces.
