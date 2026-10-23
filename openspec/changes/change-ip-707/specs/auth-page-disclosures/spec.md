## ADDED Requirements

### Requirement: Aclaración de ayuda en ingreso
La página de ingreso SHALL mostrar el párrafo exacto «Si olvidaste tu contraseña, escribe a soporte@andes.example.» inmediatamente debajo de su subtítulo.

#### Scenario: Consultar la ayuda para recuperar la contraseña
- **GIVEN** una persona abre la página de ingreso (`/login`)
- **WHEN** consulta el contenido debajo del subtítulo «Ingresa con tu cuenta para revisar tus pedidos y facturas.»
- **THEN** ve el párrafo «Si olvidaste tu contraseña, escribe a soporte@andes.example.» inmediatamente después del subtítulo

### Requirement: Aclaración sobre los datos en registro
La página de registro SHALL mostrar el párrafo exacto «Tus datos se usan solo para gestionar tu cuenta.» inmediatamente debajo de su subtítulo.

#### Scenario: Consultar el uso de los datos al registrarse
- **GIVEN** una persona abre la página de registro (`/registro`)
- **WHEN** consulta el contenido debajo del subtítulo «Registra a tu empresa en el Portal de Clientes Andes.»
- **THEN** ve el párrafo «Tus datos se usan solo para gestionar tu cuenta.» inmediatamente después del subtítulo
