## Why
IP-698 solicita que las personas que consultan Soporte conozcan la ubicación de la oficina de atención presencial. Actualmente, el bloque «Contacto directo» presenta otros datos de contacto, pero no indica la dirección de la oficina.

## What Changes
- Agregar al bloque «Contacto directo» la línea «Oficina: Av. Providencia 1234, Santiago».
- Añadir una prueba unitaria de `SupportPage` que compruebe que la línea de la oficina se muestra.

## Capabilities
### New Capabilities
- `support-office-address`: muestra la dirección de la oficina de atención presencial en Soporte.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita a `src/pages/SupportPage.tsx` y a la prueba unitaria existente de esa página. Se asume que la línea se agrega dentro del bloque «Contacto directo» y conserva exactamente el texto indicado en el ticket. No se cambian rutas, estilos, datos de ejemplo ni el contenido existente de Soporte.
