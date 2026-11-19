## Why
IP-737 solicita que las personas que consultan Facturas puedan leer con precisión el total de cada documento. Actualmente la página muestra montos en CLP sin decimales, por lo que no representa importes fraccionarios y no cumple el formato español solicitado con agrupación de miles y dos decimales.

## What Changes
- Mostrar cada total de Facturas con punto como separador de miles cuando corresponda y exactamente dos decimales separados por coma.
- Mantener la indicación de moneda CLP existente y limitar el cambio de formato a los totales de Facturas.

## Capabilities
### New Capabilities
- `invoice-amount-formatting`: presenta los totales de Facturas con separadores españoles y dos decimales.

### Modified Capabilities
- Ninguna.

## Impact
Impacta la presentación de los importes en la tabla de `src/pages/InvoicesPage.tsx` y el formato monetario usado por esa página. Se asume que se conserva la indicación existente de pesos chilenos (CLP), que la regla afecta solo los totales de Facturas y que otros importes que reutilizan el formato actual no cambian. No se modifican los valores de factura, las columnas, la ordenación ni otros datos de la tabla.
