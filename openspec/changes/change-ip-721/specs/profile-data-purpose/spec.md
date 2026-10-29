## MODIFIED Requirements

### Requirement: Propósito de los datos del perfil
Mi perfil SHALL mostrar el párrafo «Estos datos se usan para emitir tus facturas.» inmediatamente después de su frase de introducción y conservar los datos de la cuenta mostrados. Mi perfil SHALL mostrar debajo del valor de «Correo electrónico» el texto «El correo electrónico se usa para iniciar sesión y recibir avisos sobre pedidos y facturas.»; el valor de ese campo SHALL referenciar el texto auxiliar mediante `aria-describedby` y ningún otro campo SHALL mostrar ese texto.

#### Scenario: Consultar para qué se usan los datos del perfil
- **GIVEN** una persona abre Mi perfil
- **WHEN** se muestra el contenido de la página
- **THEN** ve el párrafo «Estos datos se usan para emitir tus facturas.» inmediatamente después de «Datos de tu cuenta en el portal.» y antes del panel de datos

#### Scenario: Conservar los datos mostrados en Mi perfil
- **GIVEN** la cuenta del cliente muestra el nombre «Ana Pérez», el correo «ana@andes.example», la empresa «Andes» y el identificador «C-204»
- **WHEN** se muestra el nuevo párrafo explicativo en Mi perfil
- **THEN** los mismos cuatro datos de la cuenta permanecen visibles sin cambios

#### Scenario: IP-724 Explicar el uso del correo y asociar la ayuda
- **GIVEN** Mi perfil muestra el correo «ana@andes.example» y los campos Nombre, Empresa e Identificador de cliente
- **WHEN** una persona consulta Mi perfil
- **THEN** ve debajo del valor de «Correo electrónico» el texto «El correo electrónico se usa para iniciar sesión y recibir avisos sobre pedidos y facturas.»
- **AND** el valor de «Correo electrónico» referencia ese texto con `aria-describedby`
- **AND** los campos Nombre, Empresa e Identificador de cliente no muestran ese texto auxiliar
