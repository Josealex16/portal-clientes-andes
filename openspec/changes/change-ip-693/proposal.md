## Why
IP-693 solicita que las personas que consultan Mi perfil identifiquen su cuenta directamente desde el encabezado. Actualmente el título solo muestra «Mi perfil», aunque la página ya dispone del identificador de cliente de la sesión.

## What Changes
- Mostrar en el título de Mi perfil el identificador de cliente de la persona autenticada entre paréntesis después de «Mi perfil».
- Añadir una prueba unitaria de `ProfilePage` que compruebe el título con el usuario de ejemplo.

## Capabilities
### New Capabilities
- `profile-client-identifier`: muestra el identificador de cliente en el título de Mi perfil.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita al título de `src/pages/ProfilePage.tsx` y a la prueba unitaria de esa página. Se asume que el identificador mostrado es el `id` del usuario autenticado, disponible en el contexto de autenticación (por ejemplo, `u-1001`). No se cambian otras pantallas, el resto del contenido de Perfil ni los estilos.
