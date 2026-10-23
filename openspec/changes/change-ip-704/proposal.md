## Why
IP-704 solicita informar el tiempo de respuesta en el bloque «Contacto directo» de Soporte. Actualmente se muestran los canales de contacto y el horario, pero no cuánto tarda la respuesta; añadir el plazo indicado permite que las personas conozcan esa expectativa sin alterar la información que ya aparece.

## What Changes
- Añadir al bloque «Contacto directo» de Soporte la línea «Tiempo de respuesta: hasta 24 horas hábiles.».
- Mantener sin cambios las demás líneas de ese bloque.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `support-contact-hours`: agrega el tiempo de respuesta al bloque de contacto directo y conserva su contenido existente.

## Impact
El cambio afecta `src/pages/SupportPage.tsx` y la capacidad vigente `support-contact-hours`. Se asume que la nueva línea se agrega al final de las líneas actuales del bloque «Contacto directo», después del horario; las demás líneas conservan su texto y orden. No se modifica el resto de la página Soporte ni otras páginas.
