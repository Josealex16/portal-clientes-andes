## Why
IP-686 reporta que las fechas de Facturas y Pedidos se muestran con el mes antes del día, un orden que no corresponde a la convención esperada por los clientes chilenos. Presentar día/mes/año con ambos componentes de dos dígitos evita la lectura ambigua sin alterar las fechas ISO que usan los datos del portal.

## What Changes
- Mostrar las fechas de Emisión y Vencimiento de Facturas y Fecha de Pedidos como `DD/MM/AAAA`, con día y mes de dos dígitos.
- Fijar el formato de salida del helper de fechas mediante una prueba unitaria.

## Capabilities
### New Capabilities
- `date-formatting`: define la presentación día/mes/año para las fechas de Facturas y Pedidos.

### Modified Capabilities
- Ninguna.

## Impact
Impacta el helper `formatDate` de `src/data/sampleData.ts`, sus consumidores en las tablas de Facturas y Pedidos, y la prueba unitaria de datos. Se asume que el helper recibe fechas ISO `AAAA-MM-DD`, como los datos existentes. No se cambian los datos ISO, estilos, rutas ni otras pantallas; tampoco se amplía el alcance a validación de entradas con formatos distintos.
