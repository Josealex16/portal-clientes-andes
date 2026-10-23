# date-formatting Specification

## Purpose
Esta capacidad define cómo se presentan las fechas de facturas y pedidos para facilitar su lectura en el portal.

## Requirements

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

### Requirement: Aviso de vencimiento próximo en Facturas
En la tabla de Facturas, el portal SHALL mostrar junto a la fecha de vencimiento el aviso `Vence en N días` para cada factura «Pendiente» cuya fecha de vencimiento esté entre hoy y los tres días calendario siguientes, inclusive; N SHALL ser la diferencia de días calendario. El portal SHALL limitar este aviso a dicha tabla.

#### Scenario: Factura pendiente que vence dentro de tres días
- **GIVEN** hoy es el 23/10/2026 y una factura pendiente vence el 26/10/2026
- **WHEN** se muestra la tabla de Facturas
- **THEN** junto a `26/10/2026` se muestra el aviso `Vence en 3 días`

#### Scenario: Vencimiento en la fecha actual
- **GIVEN** hoy es el 23/10/2026 y una factura pendiente vence el 23/10/2026
- **WHEN** se muestra la tabla de Facturas
- **THEN** junto a `23/10/2026` se muestra el aviso `Vence en 0 días`

#### Scenario: Vencimiento fuera del plazo o ya pasado
- **GIVEN** hoy es el 23/10/2026 y hay facturas pendientes que vencen el 27/10/2026 y el 22/10/2026
- **WHEN** se muestra la tabla de Facturas
- **THEN** no se muestra el aviso `Vence en N días` junto a ninguna de esas fechas

#### Scenario: Factura no pendiente dentro del plazo
- **GIVEN** hoy es el 23/10/2026 y una factura «Pagada» vence el 26/10/2026
- **WHEN** se muestra la tabla de Facturas
- **THEN** no se muestra el aviso `Vence en N días` junto a su fecha de vencimiento

#### Scenario: Aviso limitado a la tabla de Facturas
- **GIVEN** una factura pendiente vence dentro de los próximos tres días calendario
- **WHEN** se muestra esa factura fuera de la tabla de Facturas
- **THEN** el portal no muestra el aviso `Vence en N días`
