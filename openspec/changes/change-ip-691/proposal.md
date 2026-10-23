## Why
IP-691 solicita que las personas que consultan Pedidos puedan ver el valor acumulado de todos los pedidos junto a la tabla, sin tener que sumar individualmente los montos de cada fila. Actualmente la página solo muestra el total de cada pedido por separado y no presenta el monto agregado.

## What Changes
- Mostrar al pie de la tabla de Pedidos una fila «Total de pedidos» con la suma de los montos de todos los pedidos de `sampleData`, usando el formato de pesos chilenos existente.
- Añadir una prueba unitaria de la página que compruebe el monto agregado mostrado.

## Capabilities
### New Capabilities
- `orders-total`: presenta el monto acumulado de los pedidos al pie de la tabla de Pedidos.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita a la página `src/pages/OrdersPage.tsx` y su cobertura unitaria. Se reutiliza `orders` y `formatCurrency` de `src/data/sampleData.ts`; se asume que la suma incluye cada pedido disponible en `orders`, sin filtros, y conserva el formato CLP que ya aplica `formatCurrency`. No se modifican otras pantallas ni estilos.
