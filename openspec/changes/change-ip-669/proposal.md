## Why
IP-669 solicita exportar los pagos del mes anterior desde el portal, pero actualmente no existe una página de pagos ni una descarga que permita obtener ese historial. Añadir una página autenticada y un CSV con fecha, monto y estado por pago da a las personas una forma concreta de consultar y conservar esos registros.

## What Changes
- Incorporar una página autenticada de Pagos con una acción para descargar el CSV del mes calendario anterior.
- Exportar una fila por pago con fecha, monto y estado; excluir pagos fuera del período y admitir el período sin pagos.

## Capabilities
### New Capabilities
- `payments-export`: ofrece la página de pagos y la descarga CSV mensual.

### Modified Capabilities
- Ninguna.

## Impact
Impacta las rutas y navegación autenticadas del portal, la página de pagos y el origen de sus registros. El repositorio solo contiene datos de ejemplo de pedidos y facturas, no pagos ni una API de pagos; se asume que la página consume los pagos disponibles para la cuenta autenticada y que cada registro ya proporciona fecha, monto en CLP y estado. Para que el resultado sea verificable sin más decisiones, se asume CSV UTF-8 separado por comas, encabezados `fecha,monto,estado`, fechas ISO `AAAA-MM-DD`, montos en pesos enteros sin separadores ni símbolo, estados en español y período según la fecha calendario del pago en el mes anterior a la descarga. Cuando no hay pagos del período, se descarga el encabezado sin filas de datos. No se amplía el alcance a filtros por período, facturas ni transacciones no registradas como pagos.
