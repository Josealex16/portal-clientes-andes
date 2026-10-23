## ADDED Requirements

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
