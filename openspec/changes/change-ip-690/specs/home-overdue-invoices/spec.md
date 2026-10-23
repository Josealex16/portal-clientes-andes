## ADDED Requirements

### Requirement: Resumen de facturas vencidas en Inicio
Inicio SHALL mostrar junto a las tarjetas de resumen una tarjeta «Facturas vencidas» cuyo número sea el total de facturas de ejemplo con estado «Vencida», y SHALL incluir en ella un enlace «Ver facturas» que navegue a `/facturas`.

#### Scenario: Contar solo las facturas vencidas
- **GIVEN** los datos de ejemplo contienen una factura «Vencida», dos «Pendiente» y dos «Pagada»
- **WHEN** se muestra Inicio
- **THEN** la tarjeta «Facturas vencidas» muestra `1`
- **AND** la tarjeta incluye «Ver facturas» enlazado a `/facturas`
