## Why
IP-727 solicita que las personas que llegan a una ruta inexistente tengan un enlace «Back to home» para volver al inicio. La página 404 ya ofrece «Volver al inicio»; se añadirá el enlace solicitado como una acción adicional y se conservarán todos los textos y destinos existentes.

## What Changes
- Agregar el enlace «Back to home» con destino `/` a la página «Página no encontrada».
- Conservar sin cambios el texto y los destinos existentes de la página.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `not-found-support-link`: añadir el nuevo enlace de inicio a la página 404 sin alterar su contenido existente.

## Impact
El cambio afecta la interfaz de `src/pages/NotFoundPage.tsx`, la cobertura unitaria de la página conforme a `AGENTS.md` y la especificación `not-found-support-link`. Se asume que, por ser un enlace adicional y conservarse el texto existente, «Back to home» aparece después de «Ir a Soporte» y antes del párrafo de contacto. No se cambian las rutas ni otras páginas.
