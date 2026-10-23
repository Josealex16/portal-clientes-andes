## Why
IP-713 identifica que las personas que llegan a Inicio no saben dónde pedir ayuda. Añadiremos la indicación solicitada inmediatamente después de la frase introductoria para orientarles hacia Soporte sin modificar los demás bloques de la página.

## What Changes
- Añadir en Inicio el párrafo exacto «Para pedir ayuda, entra a Soporte desde el menú.» debajo de la frase introductoria.

## Capabilities
### New Capabilities
- `home-support-guidance`: indica en Inicio cómo encontrar Soporte desde el menú.

### Modified Capabilities
- Ninguna.

## Impact
El cambio corresponde a `src/pages/HomePage.tsx` y a su cobertura unitaria. Se mantienen las tarjetas, sus enlaces y la lista de Novedades. Se asume que la indicación es un párrafo de texto, sin añadir un enlace directo ni cambiar el menú o la navegación.
