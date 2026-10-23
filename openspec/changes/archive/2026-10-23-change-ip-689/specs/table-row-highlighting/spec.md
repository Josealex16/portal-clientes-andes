## Purpose

Esta capacidad permite distinguir visualmente las filas de datos y reconocer la fila activa al pasar el cursor en las tablas de Pedidos y Facturas.

## ADDED Requirements

### Requirement: Fondos alternos y resaltado de filas de tabla
El portal SHALL distinguir las filas de datos de las tablas con clase `table` en Pedidos y Facturas: las filas pares de `tbody` SHALL usar `--color-surface-alt` cuando esté definido o `#f7f9fa` en su ausencia, y la fila bajo el cursor SHALL usar `#eaf1f4`, por encima del fondo alterno.

#### Scenario: Filas pares con fondo alterno en Pedidos y Facturas
- **GIVEN** las tablas de Pedidos y Facturas tienen cuatro filas de datos cada una
- **WHEN** se muestran las tablas
- **THEN** las filas de datos 1 y 3 conservan el fondo normal y las filas 2 y 4 usan `--color-surface-alt` o, si no está definido, `#f7f9fa`
- **AND** las filas del encabezado no reciben el fondo alterno de `tbody`

#### Scenario: Resaltar una fila par y restaurar su fondo
- **GIVEN** la segunda fila de datos de una tabla con clase `table` usa el fondo alterno
- **WHEN** el cursor pasa sobre esa fila y después sale de ella
- **THEN** mientras el cursor está encima, la fila usa el fondo `#eaf1f4`, más marcado que el fondo alterno
- **AND** al salir el cursor la fila recupera su fondo alterno

#### Scenario: Resaltar una fila impar y restaurar su fondo
- **GIVEN** la primera fila de datos de una tabla con clase `table` usa el fondo normal
- **WHEN** el cursor pasa sobre esa fila y después sale de ella
- **THEN** mientras el cursor está encima, la fila usa el fondo `#eaf1f4`
- **AND** al salir el cursor la fila recupera su fondo normal
