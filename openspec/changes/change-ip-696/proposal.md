## Why
IP-696 solicita que las personas con consultas sobre facturas encuentren un correo específico en el bloque «Contacto directo» de Soporte. Actualmente el bloque muestra solo un correo general, por lo que no identifica el canal de facturación indicado.

## What Changes
- Agregar al bloque «Contacto directo» la línea «Correo de facturación: facturacion@andes.example».
- Añadir una prueba unitaria de `SupportPage` que compruebe que se muestra esa línea.

## Capabilities
### New Capabilities
- `support-billing-email`: identifica el correo para consultas sobre facturas en Soporte.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita a `src/pages/SupportPage.tsx` y la cobertura unitaria de esa página. Se asume que la nueva línea se agrega dentro del bloque existente «Contacto directo» y conserva exactamente el texto del ticket. No se cambian rutas, estilos, datos de ejemplo ni el contenido de contacto existente.
