# home-amounts-disclosure Specification

## Purpose
Esta capacidad informa a las personas que consultan Inicio que los montos del resumen de su cuenta incluyen IVA.

## Requirements

### Requirement: Aclaración de IVA en el resumen de Inicio
Inicio SHALL mostrar en su frase de introducción el texto exacto «Este es el resumen de tu cuenta al día de hoy. Los montos incluyen IVA.».

#### Scenario: Consultar la aclaración de IVA en Inicio
- **GIVEN** una persona abre Inicio
- **WHEN** se muestra el resumen de su cuenta
- **THEN** ve la frase «Este es el resumen de tu cuenta al día de hoy. Los montos incluyen IVA.»

#### Scenario: Conservar las tarjetas y enlaces de Inicio
- **GIVEN** Inicio muestra las tarjetas «Pedidos abiertos», «Facturas por pagar» y «Saldo pendiente» con los enlaces «Ver pedidos» a `/pedidos`, «Ver facturas» a `/facturas` y «¿Dudas con tu saldo?» a `/soporte`
- **WHEN** se muestra la nueva frase de introducción
- **THEN** las tres tarjetas conservan sus etiquetas y los enlaces permanecen disponibles con los mismos destinos

### Requirement: Destacar el saldo pendiente en Inicio
Inicio MUST mostrar en rojo el importe de la tarjeta «Saldo pendiente» aplicando `style={{ color: 'red' }}` directamente al elemento `<p className="card__value">`, sin cambiar hojas de estilo.

#### Scenario: Destacar solo el importe de saldo pendiente
- **GIVEN** Inicio muestra las tarjetas «Pedidos abiertos», «Facturas por pagar» y «Saldo pendiente»
- **WHEN** se muestra el importe de cada tarjeta
- **THEN** el importe de «Saldo pendiente» aparece en rojo con `style={{ color: 'red' }}` aplicado directamente a su elemento `<p className="card__value">`
- **AND** las tarjetas «Pedidos abiertos» y «Facturas por pagar» conservan sus valores y los enlaces actuales «Ver pedidos» a `/pedidos` y «Ver facturas» a `/facturas`
