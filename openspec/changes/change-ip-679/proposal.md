## Why
IP-679 solicita exportar los pagos del mes, pero el portal no ofrece una página ni una acción accesible para que la persona obtenga esos registros como archivo. Una sección autenticada de Pagos con una descarga mensual permite consultar y conservar los pagos correspondientes a su cuenta.

## What Changes
- Añadir una página autenticada de Pagos con una acción para descargar la exportación del mes calendario anterior.
- Descargar un CSV por cuenta con fecha, monto y estado de cada pago del período, incluyendo el caso sin pagos.

## Capabilities
### New Capabilities
- `payments-export`: permite descargar como CSV los pagos de la cuenta del mes anterior.

### Modified Capabilities
- Ninguna.

## Impact
Impacta las rutas autenticadas, la navegación y la presentación de pagos; el repositorio ya tiene datos de ejemplo y una función que genera el CSV del mes calendario anterior filtrado por cuenta. Se asume que el archivo conserva el formato que produce esa función: UTF-8 separado por comas, encabezados `fecha,monto,estado`, fecha ISO `AAAA-MM-DD`, monto entero en pesos chilenos sin formato adicional y estado en español. El período se determina por la fecha calendario del pago en el mes anterior al momento de la descarga, sin filtrar por estado; si no hay pagos de la cuenta en ese período, se descarga solo el encabezado. No se amplía el alcance a selección de períodos ni a otros documentos.
