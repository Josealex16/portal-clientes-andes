## Why
IP-706 solicita incorporar un pie de página útil al Portal de Clientes Andes. Hoy las páginas con sesión iniciada terminan sin una línea de contacto común; mostrar debajo de su contenido el dato de Soporte definido por el reportero permite encontrar el canal y horario de atención desde cualquier sección autenticada.

## What Changes
- Mostrar debajo del contenido de todas las páginas con sesión iniciada una única línea centrada con el contacto de Soporte indicado.
- Definir los estilos del pie en una hoja de `src/styles`.

## Capabilities
### New Capabilities
- `support-footer`: muestra una línea de contacto de Soporte debajo de las páginas autenticadas.

### Modified Capabilities
- Ninguna.

## Impact
El cambio afecta el layout compartido de las rutas autenticadas (`src/components/AppLayout.tsx`), una hoja de estilos de `src/styles` y su prueba unitaria existente (`src/components/AppLayout.test.tsx`). El texto será exactamente el indicado en la respuesta de aclaración y aparecerá en Inicio, Pedidos, Facturas, Soporte, Mi perfil y la página autenticada de ruta inexistente. Las rutas públicas de ingreso y registro permanecen fuera del alcance y no cambian su contenido ni la autenticación.
