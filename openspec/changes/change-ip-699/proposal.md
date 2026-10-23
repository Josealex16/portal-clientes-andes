## Why
IP-699 solicita corregir el historial de Pedidos, que actualmente muestra primero los registros más antiguos aunque la sección se presenta como historial reciente. Ordenar las filas desde la fecha más nueva hasta la más antigua permite encontrar de inmediato el pedido reciente sin alterar la información que contiene la tabla.

## What Changes
- Ordenar las filas de la tabla de Pedidos por fecha descendente, de la más reciente a la más antigua.
- Conservar las columnas, los formatos y los datos de ejemplo actuales.

## Capabilities
### New Capabilities
- `orders-date-sorting`: presenta el historial de pedidos desde el más reciente hasta el más antiguo.

### Modified Capabilities
- Ninguna.

## Impact
El alcance se limita al orden de las filas de la tabla de Pedidos en `src/pages/OrdersPage.tsx`; no se modifican las columnas, los formatos, los datos de ejemplo ni otras pantallas. Se asume que los pedidos con la misma fecha conservan su orden de origen, ya que el ticket no define otro desempate y los datos actuales tienen fechas distintas.
