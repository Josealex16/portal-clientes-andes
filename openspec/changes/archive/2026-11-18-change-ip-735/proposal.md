## Why
IP-735 aborda que la página Pedidos no explica su estado cuando una empresa todavía no tiene pedidos. Mostrar un mensaje claro en lugar de una tabla vacía mejora esa consulta, mientras se mantienen el contador y el resto del contenido de la página.

## What Changes
- Mostrar «Todavía no hay pedidos.» en lugar de la tabla cuando la lista visible de Pedidos está vacía.
- Conservar el título, la introducción, la aclaración del orden y la nota de seguimiento en el estado vacío, ajustando sus referencias de posición.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `orders-list-count`: definir el mensaje de estado vacío sin perder el contador cero.
- `orders-sorting-disclosure`: conservar la aclaración del orden y ubicarla antes del mensaje cuando no se muestra la tabla.
- `orders-shipment-tracking-disclosure`: conservar la nota de seguimiento después del mensaje en el estado vacío.

## Impact
El cambio afecta la presentación de `src/pages/OrdersPage.tsx` y sus especificaciones de pedidos. Se asume que el estado vacío ocurre cuando la lista que recibe la página está vacía, incluso si no hay resultados visibles por un filtro, según el contrato existente del contador. El repositorio exige una prueba unitaria por cambio de comportamiento; la implementación debe cubrir el estado vacío. No se cambian los datos, el orden ni las columnas de la tabla cuando hay pedidos.
