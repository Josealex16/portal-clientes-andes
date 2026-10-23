## ADDED Requirements

### Requirement: Correo de contacto directo enlazado
La página Soporte SHALL presentar la dirección `soporte@andes.example` del panel «Contacto directo» como un enlace cuyo destino sea `mailto:soporte@andes.example`, conservando la dirección como texto visible.

#### Scenario: Abrir el correo de contacto desde Soporte
- **GIVEN** una persona abre la página Soporte
- **WHEN** consulta el panel «Contacto directo»
- **THEN** ve `soporte@andes.example` como texto visible de un enlace
- **AND** el destino del enlace es `mailto:soporte@andes.example`
