## ADDED Requirements

### Requirement: Horario de atención en Soporte
Soporte SHALL mostrar antes del panel «Contacto directo» un panel con el título «Horario de atención» y el texto «Lunes a viernes, de 8:30 a 18:00 (hora de Santiago).».

#### Scenario: Consultar horario antes del contacto directo
- **GIVEN** una persona abre la página Soporte
- **WHEN** se muestran sus paneles
- **THEN** ve un panel «Horario de atención» con el texto «Lunes a viernes, de 8:30 a 18:00 (hora de Santiago).»
- **AND** ese panel aparece antes del panel «Contacto directo»
