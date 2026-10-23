## Why
IP-708 señala que una persona que no encuentra una factura no sabe a quién contactar desde Facturas. Incorporar la orientación solicitada ofrece un canal claro para ese caso y conserva la aclaración de moneda, la tabla y los datos de facturación existentes.

## What Changes
- Agregar el párrafo «Si una factura no aparece, escribe a soporte@andes.example.» en la página Facturas, debajo de la introducción y antes de la tabla.
- Mantener sin cambios la tabla de facturas y sus datos.

## Capabilities
### New Capabilities
- `invoice-missing-document-support`: indica cómo contactar a soporte cuando falta una factura.

### Modified Capabilities
- Ninguna.

## Impact
El cambio afecta `src/pages/InvoicesPage.tsx` y añade el comportamiento a la capacidad `invoice-missing-document-support`. Se asume que el nuevo párrafo aparece después de la aclaración de moneda existente y antes de la tabla, para conservar la aclaración inmediatamente después de la introducción. No se modifican la tabla, sus datos ni otras páginas.
