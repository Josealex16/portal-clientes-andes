## Why
IP-678 necesita que las personas puedan descargar desde la página de pagos un registro del mes anterior con la fecha, el monto y el estado de cada pago. Actualmente el portal no ofrece esa página ni una descarga accesible, por lo que no se puede obtener el historial mensual solicitado.

## What Changes
- Ofrecer la página autenticada de Pagos con un botón «Exportar» que descargue los pagos del mes calendario anterior en CSV.
- Incluir una fila por pago de la cuenta, con fecha, monto y estado, y no incluir pagos de otros meses ni de otras cuentas.

## Capabilities
### New Capabilities
- `payments-export`: página de Pagos y descarga CSV del mes anterior.

### Modified Capabilities
- Ninguna.

## Impact
Impacta la ruta y navegación autenticadas, la nueva página de Pagos y los datos de pagos existentes en `src/data/sampleData.ts`. El repositorio muestra pagos asociados a una cuenta y una sesión ficticia, pero no una API de pagos. Se asume que se exportan los registros disponibles para la cuenta autenticada y que la fecha de descarga determina el mes calendario anterior. Para concretar el CSV se asume UTF-8 separado por comas, encabezados `fecha,monto,estado`, fechas `AAAA-MM-DD`, montos enteros en CLP sin separadores ni símbolo y etiquetas de estado en español; si el período no contiene pagos, se descarga solo el encabezado. Quedan fuera filtros por otros períodos y pagos de cuentas ajenas.
