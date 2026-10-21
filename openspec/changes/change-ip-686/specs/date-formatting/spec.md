## ADDED Requirements

### Requirement: Fechas de Facturas y Pedidos en formato día/mes/año
El portal SHALL mostrar las fechas de Emisión y Vencimiento de Facturas y Fecha de Pedidos en formato `DD/MM/AAAA`, con dos dígitos para el día y el mes. La presentación SHALL conservar sin cambios las fechas ISO almacenadas en los datos.

#### Scenario: Mostrar fechas de Facturas y Pedidos
- **GIVEN** una factura tiene Emisión `2026-09-30` y Vencimiento `2026-10-30`, y un pedido tiene Fecha `2026-09-28`
- **WHEN** se muestran las tablas de Facturas y Pedidos
- **THEN** se muestran respectivamente `30/09/2026`, `30/10/2026` y `28/09/2026`
- **AND** las fechas originales permanecen como `2026-09-30`, `2026-10-30` y `2026-09-28`

#### Scenario: Completar con cero inicial un día de un dígito
- **GIVEN** la fecha ISO `2026-09-03`
- **WHEN** se formatea la fecha
- **THEN** el resultado es `03/09/2026`

#### Scenario: Completar con cero inicial un mes de un dígito
- **GIVEN** la fecha ISO `2026-03-03`
- **WHEN** se formatea la fecha
- **THEN** el resultado es `03/03/2026`

### Requirement: Prueba unitaria del formato de fecha
El proyecto SHALL incluir una prueba unitaria que fije el resultado de `formatDate` para una fecha ISO y compruebe el formato día/mes/año con día y mes de dos dígitos.

#### Scenario: La prueba fija el formato de una fecha ISO
- **GIVEN** la prueba unitaria llama a `formatDate` con `2026-09-30`
- **WHEN** se comprueba el resultado
- **THEN** el resultado esperado es `30/09/2026`
