## Why
IP-689 pide mejorar la lectura de las tablas de Pedidos y Facturas, cuyas filas actuales comparten el mismo fondo. Alternar el fondo de las filas del cuerpo y resaltar la fila bajo el cursor permite distinguir los registros sin alterar los datos ni la estructura de las páginas.

## What Changes
- Aplicar fondos alternos a las filas pares del cuerpo de las tablas de Pedidos y Facturas.
- Resaltar la fila de una tabla cuando el cursor esté sobre ella, con un fondo más marcado que el alterno.

## Capabilities
### New Capabilities
- `table-row-highlighting`: distingue visualmente las filas de las tablas de Pedidos y Facturas.

### Modified Capabilities
- Ninguna.

## Impact
El cambio afecta únicamente los estilos globales de las tablas con clase `table` en `src/styles/global.css`; no modifica componentes ni datos de ejemplo. En el repositorio no existe `--color-surface-alt`, así que se asume `#f7f9fa` como fondo claro alterno de reserva. Se asume `#eaf1f4` para el resaltado al pasar el cursor, suficientemente distinto del fondo alterno y del fondo normal. Quedan fuera de alcance otras tablas y elementos, así como pruebas automatizadas de diseño; se conserva la verificación de lint y build indicada en el ticket.
