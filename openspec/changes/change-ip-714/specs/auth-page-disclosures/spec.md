## MODIFIED Requirements

### Requirement: Aclaración de ayuda en ingreso
La página de ingreso SHALL mostrar el párrafo exacto «Si olvidaste tu contraseña, escribe a soporte@andes.example.» inmediatamente debajo de su subtítulo. La página SHALL conservar el formulario de ingreso con los campos «Correo electrónico» y «Contraseña» y el botón «Ingresar».

#### Scenario: Consultar la ayuda para recuperar la contraseña
- **GIVEN** una persona abre la página de ingreso (`/login`)
- **WHEN** consulta el contenido debajo del subtítulo «Ingresa con tu cuenta para revisar tus pedidos y facturas.»
- **THEN** ve el párrafo «Si olvidaste tu contraseña, escribe a soporte@andes.example.» inmediatamente después del subtítulo

#### Scenario: Conservar los controles del formulario de ingreso
- **GIVEN** una persona abre la página de ingreso (`/login`)
- **WHEN** consulta el formulario
- **THEN** ve los campos «Correo electrónico» y «Contraseña» y el botón «Ingresar»
