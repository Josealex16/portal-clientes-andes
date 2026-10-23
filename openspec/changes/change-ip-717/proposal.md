## Why
IP-717 solicita que las personas que se registran sepan para qué se usan sus datos y precisa que el formulario no debe cambiar. El párrafo indicado ya está presente debajo del subtítulo de Registro; este cambio deja especificado ese contenido y la conservación de los controles actuales.

## What Changes
- Precisar que Registro muestra el párrafo exacto solicitado inmediatamente después del subtítulo.
- Especificar que el formulario de registro conserva sus campos, aceptación de términos y botón actuales.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `auth-page-disclosures`: aclarar el uso de los datos al registrarse y preservar el formulario existente.

## Impact
El alcance es la página `/registro` (`src/pages/RegisterPage.tsx`) y su cobertura unitaria. El párrafo solicitado ya está implementado en la posición indicada, así que no se propone cambiar su texto ni la lógica de registro. Se asume que «No cambia el formulario» significa conservar los campos Nombre completo, Correo electrónico, Contraseña y Confirmar contraseña, la casilla de términos y el botón Crear cuenta.
