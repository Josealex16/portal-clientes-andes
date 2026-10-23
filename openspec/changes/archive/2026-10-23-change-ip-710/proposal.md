## Why
IP-710 señala que las personas que llegan a una dirección inexistente no reciben una indicación para regresar al inicio desde el menú lateral. La página 404 ya muestra la frase introductoria y los enlaces de navegación; añadir el párrafo solicitado debajo de esa frase comunica la opción existente sin cambiar el título ni el resto de la página.

## What Changes
- Añadir debajo de la frase introductoria de la página 404 el párrafo «Vuelve al inicio desde el menú lateral.».
- Conservar el título y el resto del contenido y comportamiento actual de la página no encontrada.
- Añadir cobertura unitaria que compruebe el texto, su posición y la conservación del contenido existente.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `not-found-support-link`: añade la indicación para volver al inicio en la página 404, manteniendo el contenido existente.

## Impact
El alcance se limita a `src/pages/NotFoundPage.tsx` y a su cobertura unitaria en `src/pages/NotFoundPage.test.tsx`, junto con la especificación de `not-found-support-link`. Se asume que «debajo de la frase de introducción» significa inmediatamente después de «La dirección que buscas no existe o fue movida.»; el nuevo texto es un párrafo informativo y no añade una acción ni altera los enlaces existentes. No se modifican el título, las rutas ni otras páginas.
