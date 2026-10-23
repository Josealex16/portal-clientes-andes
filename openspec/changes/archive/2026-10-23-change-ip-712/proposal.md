## Why
IP-712 reporta que la página Pedidos anuncia un orden del más reciente al más antiguo, pero la tabla presenta primero el pedido más antiguo. La implementación actual ordena las fechas de forma ascendente, contradiciendo el criterio visible y la especificación vigente. El cambio hará que las filas se muestren realmente en orden cronológico descendente.

## What Changes
- Corregir el orden de las filas de Pedidos para mostrarlas de la fecha más reciente a la más antigua, sin cambiar el texto, las columnas ni los datos.
- Conservar la cobertura unitaria del orden cronológico y del contenido existente de la tabla.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `orders-date-sorting`: precisa que el orden descendente se aplica por fecha, aunque los pedidos se reciban en otro orden.

## Impact
El cambio afecta el orden de presentación en `src/pages/OrdersPage.tsx` y la cobertura unitaria existente en `src/pages/OrdersPage.test.tsx`. Se reutilizan las fechas ISO `YYYY-MM-DD` de `src/data/sampleData.ts`, cuyo formato permite compararlas cronológicamente. Se asume que las columnas, los formatos, los valores de los pedidos y el texto informativo permanecen intactos; no se modifican datos ni otras pantallas.
