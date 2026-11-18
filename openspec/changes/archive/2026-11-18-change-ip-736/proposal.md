## Why
IP-736 señala que la página Facturas deja una tabla vacía cuando la empresa no tiene facturas. Mostrar «Todavía no hay facturas.» en ese caso informa claramente el estado de la lista y evita presentar una tabla sin contenido, conservando el contador de cero definido para la página.

## What Changes
- Cuando la lista de facturas está vacía, mostrar «Todavía no hay facturas.» en lugar de la tabla.
- Conservar el título «Facturas (0)» en el estado vacío y la tabla actual cuando existen facturas.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `invoices-list-count`: mantiene el contador y define el mensaje de estado vacío en lugar de la tabla.

## Impact
El cambio afecta la presentación de `src/pages/InvoicesPage.tsx`, el requisito vigente de `invoices-list-count` y la cobertura unitaria de la página. Se asume que la lista vacía usada por la página representa una empresa sin facturas y que el título existente conserva el contador «Facturas (0)». La regla del repositorio requiere una prueba unitaria para el cambio de comportamiento. No se cambian los datos, la tabla cuando hay facturas ni el resto del contenido de Facturas.
