## Why
IP-720 identifica que las personas que llegan a una dirección inexistente no tienen una indicación de contacto cuando el enlace falla. La página 404 debe añadir el párrafo de contacto solicitado sin alterar los demás elementos que ya muestra.

## What Changes
- Agregar al final de la página «Página no encontrada» el párrafo «Si el enlace falla, escribe a soporte@andes.example.».
- Conservar sin cambios el resto del contenido existente de la página 404.

## Capabilities
### New Capabilities

### Modified Capabilities
- `not-found-support-link`: agregar la indicación de contacto al final de la página 404.

## Impact
- Interfaz de `src/pages/NotFoundPage.tsx` y su comportamiento cubierto por pruebas unitarias.
- No se modifican otros elementos de la página ni otras capacidades.
- Supuesto: «al final de la página» significa después del último elemento actual, el enlace «Ir a Soporte».
