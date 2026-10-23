## ADDED Requirements

### Requirement: Destacar el saldo pendiente en Inicio
Inicio MUST mostrar en rojo el importe de la tarjeta «Saldo pendiente» aplicando `style={{ color: 'red' }}` directamente al elemento `<p className="card__value">`, sin cambiar hojas de estilo.

#### Scenario: Destacar solo el importe de saldo pendiente
- **GIVEN** Inicio muestra las tarjetas «Pedidos abiertos», «Facturas por pagar» y «Saldo pendiente»
- **WHEN** se muestra el importe de cada tarjeta
- **THEN** el importe de «Saldo pendiente» aparece en rojo con `style={{ color: 'red' }}` aplicado directamente a su elemento `<p className="card__value">`
- **AND** las tarjetas «Pedidos abiertos» y «Facturas por pagar» conservan sus valores y los enlaces actuales «Ver pedidos» a `/pedidos` y «Ver facturas» a `/facturas`
