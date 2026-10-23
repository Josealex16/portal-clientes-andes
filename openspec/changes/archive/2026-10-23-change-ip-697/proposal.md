## Why
IP-697 describe que quienes llegan a una dirección inexistente no pueden reconocer qué ruta escribieron porque la página 404 solo indica que no existe o fue movida. Mostrar la ruta solicitada debajo del título ayuda a identificar el error sin cambiar las rutas disponibles ni el diseño existente.

## What Changes
- Mostrar en la página 404 la ruta solicitada, con el texto «No encontramos <ruta>» debajo del título.
- Añadir cobertura unitaria para que una ruta inexistente muestre su dirección solicitada.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `not-found-support-link`: especifica la ruta solicitada que la página 404 muestra junto al acceso existente a Soporte.

## Impact
El alcance toca `src/pages/NotFoundPage.tsx` y su cobertura unitaria en `src/pages/NotFoundPage.test.tsx`; no requiere cambiar rutas existentes ni estilos. Se asume que la ruta visible corresponde a `pathname` de `useLocation`, por lo que no incluye parámetros de búsqueda ni fragmentos de URL. No se amplía el cambio a otras páginas de error ni al texto introductorio existente.
