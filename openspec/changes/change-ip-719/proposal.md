## Why
IP-719 señala que la página Pedidos no indica cómo consultar el estado de un envío. Agregar la nota de contacto solicitada orienta a las personas que necesitan seguimiento, sin cambiar la tabla ni los datos de pedidos.

## What Changes
- Agregar al final de Pedidos el párrafo «Para consultar un envío, escribe a soporte@andes.example.».
- Conservar la tabla y los datos existentes de pedidos sin cambios.

## Capabilities
### New Capabilities
- `orders-shipment-tracking-disclosure`: informa cómo consultar el estado de un envío desde Pedidos.

### Modified Capabilities
- Ninguna.

## Impact
El cambio especifica el contenido visible de `src/pages/OrdersPage.tsx` y la conservación de la tabla de pedidos existente. Se asume que «al final de la página» significa después de la tabla. No se modifican las columnas, el orden ni los datos de los pedidos, ni se agrega funcionalidad de seguimiento del envío.
