## Why
IP-702 señala que, en Mi perfil, el cliente puede consultar sus datos de cuenta pero no encuentra cómo solicitar su corrección. Se añadirá una indicación visible debajo del panel de datos para que conozca el canal de soporte.

## What Changes
- Añadir debajo del panel de datos de Mi perfil el párrafo «Para cambiar tus datos escribe a soporte@andes.example.» sin alterar los datos mostrados.

## Capabilities
### New Capabilities
- `profile-support-contact`: indica en Mi perfil cómo solicitar cambios en los datos de la cuenta.

### Modified Capabilities
- Ninguna.

## Impact
El comportamiento corresponde a `src/pages/ProfilePage.tsx`; los campos de cuenta existentes se conservan sin cambios. El alcance se limita al párrafo solicitado: se asume que la dirección se presenta como texto dentro de ese párrafo, sin añadir un comportamiento de enlace ni modificar los datos de la cuenta.
