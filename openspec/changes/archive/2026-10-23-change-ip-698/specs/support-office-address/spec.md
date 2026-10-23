## Purpose

La capacidad informa a quienes consultan Soporte dónde se encuentra la oficina de atención presencial.

## ADDED Requirements

### Requirement: Dirección de la oficina visible en Contacto directo
La página Soporte SHALL mostrar en el bloque «Contacto directo» la línea «Oficina: Av. Providencia 1234, Santiago».

#### Scenario: Consultar la dirección de la oficina en Contacto directo
- **GIVEN** una persona abre la página Soporte
- **WHEN** consulta el bloque «Contacto directo»
- **THEN** ve en ese bloque la línea «Oficina: Av. Providencia 1234, Santiago»
