## MODIFIED Requirements

### Requirement: Horario visible en Contacto directo
La página Soporte SHALL mostrar en el bloque «Contacto directo» la línea «Horario de atención: lunes a viernes de 09:00 a 18:00». La página Soporte SHALL mostrar además, inmediatamente debajo de la frase de introducción y antes del bloque «Preguntas frecuentes», el párrafo «Horario de atención: lunes a viernes, de 9:00 a 18:00.».

#### Scenario: Consultar el horario de atención en Contacto directo
- **GIVEN** una persona abre la página Soporte
- **WHEN** consulta el bloque «Contacto directo»
- **THEN** ve la línea «Horario de atención: lunes a viernes de 09:00 a 18:00» en ese bloque

#### Scenario: Consultar el horario debajo de la introducción
- **GIVEN** una persona abre la página Soporte
- **WHEN** consulta la introducción de la página
- **THEN** ve inmediatamente debajo de la frase «Resolvemos tus dudas sobre pedidos, facturas y tu cuenta.» el párrafo «Horario de atención: lunes a viernes, de 9:00 a 18:00.»
- **AND** ve el bloque «Preguntas frecuentes» después de ese párrafo

#### Scenario: Se conservan los demás bloques de Soporte
- **GIVEN** una persona abre la página Soporte
- **WHEN** consulta los bloques de la página
- **THEN** el bloque «Preguntas frecuentes» conserva su contenido y posición relativa respecto a «Contacto directo»
- **AND** el bloque «Contacto directo» conserva sus datos existentes, incluida la línea «Horario de atención: lunes a viernes de 09:00 a 18:00»
