## ADDED Requirements

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
