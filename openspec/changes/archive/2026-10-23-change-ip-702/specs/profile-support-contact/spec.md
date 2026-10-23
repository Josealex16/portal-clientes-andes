## ADDED Requirements

### Requirement: Indicación de contacto para cambiar datos del perfil
Mi perfil SHALL mostrar debajo del panel de datos el párrafo «Para cambiar tus datos escribe a soporte@andes.example.» y SHALL conservar sin cambios los datos de cuenta mostrados.

#### Scenario: Consultar cómo cambiar los datos del perfil
- **GIVEN** la cuenta muestra el nombre «Ana Pérez», el correo «ana@andes.example», la empresa «Andes» y el identificador «C-204»
- **WHEN** la persona abre Mi perfil
- **THEN** ve debajo del panel de datos el párrafo «Para cambiar tus datos escribe a soporte@andes.example.»
- **AND** los datos del panel siguen mostrando «Ana Pérez», «ana@andes.example», «Andes» y «C-204»
