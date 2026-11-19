## Purpose

Esta capacidad define cómo la página Facturas presenta los totales con separadores españoles y conserva la identificación de la moneda CLP.

## ADDED Requirements

### Requirement: Formato español de los totales de Facturas
La página Facturas SHALL mostrar la parte numérica del total de cada factura con punto como separador de miles cuando corresponda y exactamente dos decimales separados por coma, conservando la indicación existente de moneda CLP.

#### Scenario: Formatear varios totales de Facturas
- **GIVEN** la tabla de Facturas contiene importes de 1280000 y 864000
- **WHEN** se muestran los totales de esas facturas
- **THEN** la parte numérica de cada total es «1.280.000,00» y «864.000,00», respectivamente
- **AND** la indicación de moneda CLP se conserva

#### Scenario: Formatear un importe con fracción decimal
- **GIVEN** una factura tiene el importe 1234.5
- **WHEN** se muestra su total en Facturas
- **THEN** la parte numérica es «1.234,50»
- **AND** la indicación de moneda CLP se conserva
