## Why
IP-694 solicita que las personas que llegan a una dirección inexistente puedan acceder a Soporte directamente desde «Página no encontrada». Actualmente esa página solo ofrece «Volver al inicio», por lo que no proporciona el acceso directo de ayuda requerido.

## What Changes
- Añadir debajo de «Volver al inicio» un enlace «Ir a Soporte» cuyo destino sea `/soporte`, sin cambiar rutas existentes ni estilos.
- Añadir una prueba unitaria que renderice la página para una ruta inexistente y compruebe el destino del enlace.

## Capabilities
### New Capabilities
- `not-found-support-link`: proporciona desde la página 404 un enlace directo a Soporte.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita a la página `src/pages/NotFoundPage.tsx` y a su cobertura unitaria; reutiliza la ruta existente `/soporte`. Se asume que el enlace conserva la presentación y navegación nativas de los enlaces ya usados por el portal. No se modifican rutas, estilos, ni otras páginas.
