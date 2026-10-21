# invoice-order-status-badges Specification

## Purpose
Define the semantic visual tones used to distinguish invoice and order statuses in the customer portal.

## Requirements

### Requirement: Tonos de las insignias de facturas y pedidos
El portal SHALL mostrar cada estado de factura y pedido con su tono correspondiente: «Pagada» en éxito, «Pendiente» en advertencia, «Vencida» en peligro, «En preparación» en advertencia, «En camino» en informativo y «Entregado» en éxito.

#### Scenario: Factura vencida en tono de peligro
- **GIVEN** una factura tiene el estado «Vencida»
- **WHEN** se muestra su insignia en Facturas
- **THEN** la insignia tiene la clase `badge--danger`

#### Scenario: Factura pagada en tono de éxito
- **GIVEN** una factura tiene el estado «Pagada»
- **WHEN** se muestra su insignia en Facturas
- **THEN** la insignia tiene la clase `badge--success`

#### Scenario: Factura pendiente en tono de advertencia
- **GIVEN** una factura tiene el estado «Pendiente»
- **WHEN** se muestra su insignia en Facturas
- **THEN** la insignia tiene la clase `badge--warning`

#### Scenario: Pedido en preparación en tono de advertencia
- **GIVEN** un pedido tiene el estado «En preparación»
- **WHEN** se muestra su insignia en Pedidos
- **THEN** la insignia tiene la clase `badge--warning`

#### Scenario: Pedido en camino en tono informativo
- **GIVEN** un pedido tiene el estado «En camino»
- **WHEN** se muestra su insignia en Pedidos
- **THEN** la insignia tiene la clase `badge--info`

#### Scenario: Pedido entregado en tono de éxito
- **GIVEN** un pedido tiene el estado «Entregado»
- **WHEN** se muestra su insignia en Pedidos
- **THEN** la insignia tiene la clase `badge--success`
