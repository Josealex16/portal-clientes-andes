## Why
IP-687 reporta que las facturas «Vencida» se presentan con una insignia verde y se confunden visualmente con las facturas «Pagada». Diferenciar el estado vencido con el tono de peligro devuelve una distinción visual clara en la sección Facturas sin alterar los datos ni los estilos compartidos del portal.

## What Changes
- Asignar el tono de peligro a las insignias «Vencida», manteniendo «Pagada» en éxito y «Pendiente» en advertencia.
- Añadir una prueba unitaria que fije el tono de cada estado de factura y pedido.

## Capabilities
### New Capabilities
- `invoice-order-status-badges`: define los tonos visuales de los estados de facturas y pedidos.

### Modified Capabilities
- Ninguna.

## Impact
El cambio afecta el mapa de tonos en `src/components/StatusBadge.tsx` y las pruebas unitarias asociadas a sus estados. No modifica `src/styles/global.css`, las rutas, otras pantallas ni los datos de ejemplo. Se asume que los tonos actuales de los estados de pedidos («En preparación» en advertencia, «En camino» informativo y «Entregado» en éxito) se conservan; «Pagada» sigue en éxito y «Pendiente» en advertencia. El alcance se limita a corregir «Vencida» para usar peligro y a fijar en pruebas unitarias los tonos de cada estado existente de factura y pedido.
