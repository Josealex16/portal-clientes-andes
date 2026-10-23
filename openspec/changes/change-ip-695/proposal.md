## Why
IP-695 solicita que las personas que consultan el bloque «Contacto directo» de Soporte puedan conocer el horario de atención. Actualmente ese bloque muestra el correo y el teléfono, pero no informa cuándo se atiende; la línea indicada hace visible el horario junto a esos datos.

## What Changes
- Agregar al bloque «Contacto directo» de Soporte la línea «Horario de atención: lunes a viernes de 09:00 a 18:00».
- Añadir una prueba unitaria de `SupportPage` que compruebe que la línea solicitada se muestra.

## Capabilities
### New Capabilities
- `support-contact-hours`: informa el horario de atención en el bloque «Contacto directo» de Soporte.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita a `src/pages/SupportPage.tsx` y a la cobertura unitaria de esa página. Se asume que la línea se agrega dentro del bloque «Contacto directo» y conserva exactamente el texto solicitado. No se cambian rutas, estilos, datos de ejemplo, el correo, el teléfono ni el resto del contenido de Soporte.
