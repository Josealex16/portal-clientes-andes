## Why
IP-701 solicita aclarar dos datos que hoy no se explicitan en el portal: el orden del historial de Pedidos y la moneda de los montos de Facturas. Mostrar una breve aclaración bajo la introducción de cada página permitirá que las personas entiendan cómo interpretar sus listas y montos sin modificar su contenido ni presentación.

## What Changes
- Agregar en Pedidos el párrafo «Los pedidos se ordenan del más reciente al más antiguo.» debajo de la introducción.
- Agregar en Facturas el párrafo «Los montos están expresados en pesos chilenos (CLP).» debajo de la introducción.

## Capabilities
### New Capabilities
- `orders-sorting-disclosure`: informa el orden cronológico descendente de los pedidos.
- `invoice-currency-disclosure`: informa la moneda de los montos de las facturas.

### Modified Capabilities
- Ninguna.

## Impact
El alcance se limita al contenido informativo de `src/pages/OrdersPage.tsx` y `src/pages/InvoicesPage.tsx`. Se asume que cada párrafo se coloca inmediatamente después de la frase de introducción y antes de la tabla, conservando literalmente los textos indicados. No se modifican tablas, estilos, datos, ni el comportamiento de ordenamiento existente; las dos aclaraciones son independientes.
