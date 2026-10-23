## Why
IP-716 solicita que la página de ingreso explique qué hacer si se olvida la contraseña. El párrafo exacto ya aparece debajo del subtítulo en la página y en la especificación vigente; este cambio deja explícito que se mantiene esa ayuda sin alterar el formulario de ingreso.

## What Changes
- Precisar en el requisito de ayuda en ingreso que el texto exacto sigue inmediatamente debajo del subtítulo.
- Dejar explícito que la aclaración no cambia los campos ni el botón del formulario de ingreso.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `auth-page-disclosures`: explicita la conservación del formulario existente junto con la ayuda para recuperar la contraseña.

## Impact
El cambio afecta la especificación de `auth-page-disclosures` correspondiente a `src/pages/LoginPage.tsx`. La implementación y las pruebas unitarias actuales ya muestran el párrafo exacto en la ubicación solicitada y los campos «Correo electrónico» y «Contraseña» con el botón «Ingresar», por lo que se asume que no se requieren cambios de interfaz. Quedan fuera de alcance la validación y el flujo de autenticación.
