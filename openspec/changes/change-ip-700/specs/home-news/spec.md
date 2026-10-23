## ADDED Requirements

### Requirement: Aviso de atención presencial en Novedades
Inicio SHALL mostrar al final de la lista «Novedades» el aviso exacto «Atención presencial en la oficina de Providencia, de lunes a viernes.» y conservar las tarjetas, enlaces y avisos existentes.

#### Scenario: Ver el aviso de Providencia después de las novedades existentes
- **GIVEN** Inicio presenta los avisos «Nuevo horario de despachos: martes y jueves por la mañana.», «Ya puedes solicitar copias de tus facturas desde la sección Soporte.» y «Mantención programada del portal el sábado de 02:00 a 04:00.»
- **WHEN** una persona consulta «Novedades» en Inicio
- **THEN** ve esos tres avisos en el mismo orden, seguidos del aviso «Atención presencial en la oficina de Providencia, de lunes a viernes.»

#### Scenario: Conservar las tarjetas y enlaces de Inicio
- **GIVEN** Inicio muestra las tarjetas «Pedidos abiertos», «Facturas por pagar» y «Saldo pendiente» con los enlaces «Ver pedidos» a `/pedidos`, «Ver facturas» a `/facturas` y «¿Dudas con tu saldo?» a `/soporte`
- **WHEN** se muestra la lista «Novedades» con el nuevo aviso de Providencia
- **THEN** las tres tarjetas y sus enlaces siguen disponibles con las mismas etiquetas y destinos
