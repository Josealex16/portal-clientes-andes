## MODIFIED Requirements

### Requirement: Horario visible en Contacto directo
La página Soporte SHALL mostrar en el bloque «Contacto directo» la línea «Horario de atención: lunes a viernes de 09:00 a 18:00» y la línea «Tiempo de respuesta: hasta 24 horas hábiles.». SHALL conservar sin cambios las demás líneas existentes del bloque y su orden.

#### Scenario: Consultar el horario de atención en Contacto directo
- **GIVEN** una persona abre la página Soporte
- **WHEN** consulta el bloque «Contacto directo»
- **THEN** ve la línea «Horario de atención: lunes a viernes de 09:00 a 18:00» en ese bloque

#### Scenario: Consultar tiempo de respuesta sin alterar las otras líneas
- **GIVEN** una persona abre la página Soporte
- **WHEN** consulta el bloque «Contacto directo»
- **THEN** ve la línea «Tiempo de respuesta: hasta 24 horas hábiles.» después de la línea de horario
- **AND** las líneas «Correo: soporte@andes.example», «Correo de facturación: facturacion@andes.example», «Teléfono: +56 2 2555 0100», «Oficina: Av. Providencia 1234, Santiago» y «Horario de atención: lunes a viernes de 09:00 a 18:00» se mantienen sin cambios y en su orden previo
