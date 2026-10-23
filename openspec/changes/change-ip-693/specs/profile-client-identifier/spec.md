## ADDED Requirements

### Requirement: Identificador de cliente en el título de Mi perfil
La página Mi perfil SHALL mostrar en su encabezado el texto «Mi perfil» seguido del identificador del usuario autenticado entre paréntesis.

#### Scenario: Título de perfil con el identificador del usuario de ejemplo
- **GIVEN** la persona autenticada tiene el identificador `u-1001`
- **WHEN** consulta la página Mi perfil
- **THEN** el encabezado muestra exactamente «Mi perfil (u-1001)»
