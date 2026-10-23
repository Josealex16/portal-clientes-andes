## Why
IP-715 pide explicar a las personas que se registran que sus datos se usan solo para gestionar su cuenta. La página y la especificación vigente ya incluyen el párrafo exacto debajo del subtítulo; este cambio deja explícito que esa aclaración no altera el formulario existente.

## What Changes
- Precisar en el requisito vigente de registro que se conserva el formulario actual junto con la aclaración solicitada.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `auth-page-disclosures`: explicita que añadir la aclaración no cambia el formulario de registro.

## Impact
El alcance corresponde a la especificación de `auth-page-disclosures` para `src/pages/RegisterPage.tsx`. El párrafo solicitado ya está presente, por lo que se documenta la conservación de los controles actuales sin cambiar el formulario ni otras páginas; se asume que conservar el formulario significa mantener sus campos, la aceptación de términos y la acción «Crear cuenta» existentes.
