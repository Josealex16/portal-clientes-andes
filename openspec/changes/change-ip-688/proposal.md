## Why
IP-688 aborda la dificultad de identificar en la página Facturas cuáles facturas pendientes están próximas a vencer. Mostrar junto a su vencimiento un aviso con los días restantes, limitado a los tres días calendario próximos, permite reconocerlas sin alterar la consulta de facturas en otras pantallas.

## What Changes
- Mostrar en la tabla de Facturas un aviso con los días restantes para las facturas pendientes que vencen dentro de los próximos tres días calendario.
- Mantener el aviso limitado a la tabla de Facturas y no mostrarlo para facturas no pendientes, vencidas o fuera del plazo.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `date-formatting`: añade un aviso de vencimiento próximo junto a la fecha de vencimiento en la tabla de Facturas.

## Impact
Impacta la presentación de vencimientos en la página Facturas y la capacidad existente de formato de fechas; no cambia los datos de las facturas ni otras pantallas. Se asume que el plazo de tres días calendario incluye la fecha actual (N puede ser 0) y que el cálculo compara fechas calendario, no horas. Solo las facturas con estado «Pendiente» reciben el aviso.
