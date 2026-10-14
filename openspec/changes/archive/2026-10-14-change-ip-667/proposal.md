## Why
IP-667 reporta que el menú lateral del Portal de Clientes Andes recorta los nombres de las secciones, desplaza visualmente el estado activo y se superpone al contenido en pantallas estrechas. Asegurar que las cinco opciones sean legibles, que el indicador activo coincida con su opción y que el menú se disponga sin obstruir el contenido restablece una navegación clara en escritorio y móvil.

## What Changes
- Ajustar el menú lateral para mostrar completos los cinco nombres y alinear los iconos y textos en una columna coherente.
- Alinear el fondo y la barra indicadora del enlace activo con el elemento de navegación.
- Reorganizar el menú en pantallas de menos de 900 px para que no cubra el contenido.
- Verificar los resultados del menú mediante pruebas y mantener lint, tests y build pasando.

## Capabilities
### New Capabilities
- `client-navigation`: establece el comportamiento visual y adaptable del menú principal autenticado.

### Modified Capabilities
- Ninguna.

## Impact
Impacta el componente Sidebar, sus estilos y los estilos del layout autenticado, además de las pruebas de interfaz asociadas. No cambia las rutas, etiquetas, permisos ni destinos de navegación. Se asume que a 900 px exactos se mantiene el diseño de escritorio y que el modo compacto aplica solo por debajo de ese ancho, tal como indica el ticket; el menú puede mostrarse sobre el contenido en una fila superior. Se conservan las etiquetas actuales: Inicio, Pedidos, Facturas, Soporte y Mi perfil. La verificación del repositorio debe incluir `npm run lint`, `npm test -- --run` y `npm run build`.
