# orders-date-sorting Specification

## Purpose
Esta capacidad permite consultar el historial de Pedidos desde el registro más reciente hasta el más antiguo, conservando intactos el contenido y la presentación de cada fila.

## Requirements

### Requirement: Historial de pedidos del más reciente al más antiguo
La tabla de Pedidos SHALL mostrar sus filas en orden descendente por fecha, desde la más reciente hasta la más antigua, sin cambiar las columnas, los formatos ni los datos de ejemplo.

#### Scenario: Mostrar los pedidos en orden cronológico descendente
- **GIVEN** los pedidos de ejemplo tienen las fechas `PED-2041` del 28/09/2026, `PED-2037` del 21/09/2026, `PED-2029` del 12/09/2026, `PED-2018` del 30/08/2026 y `PED-2003` del 14/08/2026
- **WHEN** se muestra la tabla de Pedidos
- **THEN** las filas aparecen en el orden `PED-2041`, `PED-2037`, `PED-2029`, `PED-2018`, `PED-2003`
- **AND** `PED-2041` es la primera fila y `PED-2003` es la última

#### Scenario: Conservar el contenido y la presentación de la tabla
- **GIVEN** la tabla de Pedidos usa los datos de ejemplo existentes
- **WHEN** se muestra con las filas ordenadas por fecha descendente
- **THEN** conserva las columnas «N°», «Fecha», «Detalle», «Total» y «Estado», el formato de fecha `DD/MM/AAAA` y los valores de ejemplo de cada pedido
