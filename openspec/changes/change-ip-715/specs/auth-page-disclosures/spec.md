## MODIFIED Requirements

### Requirement: Aclaración sobre los datos en registro
La página de registro SHALL mostrar el párrafo exacto «Tus datos se usan solo para gestionar tu cuenta.» inmediatamente debajo de su subtítulo y SHALL conservar sin cambios el formulario de registro existente.

#### Scenario: Consultar el uso de los datos al registrarse
- **GIVEN** una persona abre la página de registro (`/registro`)
- **WHEN** consulta el contenido debajo del subtítulo «Registra a tu empresa en el Portal de Clientes Andes.»
- **THEN** ve el párrafo «Tus datos se usan solo para gestionar tu cuenta.» inmediatamente después del subtítulo

#### Scenario: Conservar los controles del formulario de registro
- **GIVEN** una persona abre la página de registro (`/registro`)
- **WHEN** consulta el formulario junto con la aclaración sobre el uso de sus datos
- **THEN** el formulario conserva los campos «Nombre completo», «Correo electrónico», «Contraseña» y «Confirmar contraseña»
- **AND** conserva la casilla «Acepto los términos y condiciones del servicio» y el botón «Crear cuenta»
