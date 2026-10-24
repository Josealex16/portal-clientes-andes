## Why
IP-718 señala que la página Facturas no informa en qué formato se descargan los documentos. Agregar al final de la página el texto «Los documentos se descargan en formato PDF.» aclara este dato a las personas sin cambiar el contenido ni los datos de la tabla de facturas.

## What Changes
- Agregar al final de Facturas el párrafo «Los documentos se descargan en formato PDF.».
- Mantener sin cambios la tabla y los datos de facturas existentes.

## Capabilities
### New Capabilities
- `invoice-download-format-disclosure`: informa el formato PDF de descarga de los documentos de Facturas.

### Modified Capabilities
- Ninguna.

## Impact
El cambio especifica el contenido visible de `src/pages/InvoicesPage.tsx` y la conservación de su tabla de facturas. Se asume que «al final de la página» significa después de la tabla. No se modifica el comportamiento de descarga, el formato real de los archivos, la tabla ni sus datos.
