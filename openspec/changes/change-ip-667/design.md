## Context

El menú existente ya declara las cinco rutas y etiquetas en `src/components/Sidebar.tsx` y usa `NavLink` para marcar la ruta activa, pero `src/styles/sidebar.css` restringe el ancho, oculta el desbordamiento y desplaza el enlace activo con `top`/`left`. En anchos pequeños la barra está posicionada absolutamente sobre el contenido. `src/components/AppLayout.tsx` ubica el menú y el contenido como hermanos en el layout autenticado, por lo que el ajuste puede resolverse en los estilos actuales sin cambiar rutas ni autenticación. El cambio requiere cobertura automatizada de etiquetas, estado activo y distribución a ambos lados del umbral de 900 px. No hay `AGENTS.md` ni ADR; se siguen las convenciones de estructura y scripts de `README.md`, `package.json` y `openspec/config.yaml`.

## Goals / Non-Goals

- Mostrar completas las etiquetas Inicio, Pedidos, Facturas, Soporte y Mi perfil, con columnas de iconos y texto coherentes.
- Alinear el fondo activo y su barra indicadora dentro de los límites del enlace activo.
- Mantener el menú lateral junto al contenido a partir de 900 px y disponerlo sin superposición por debajo de 900 px.
- Probar los estados requeridos del menú y permitir que lint, pruebas y build terminen correctamente.
- No cambiar rutas, destinos, etiquetas, permisos, autenticación ni añadir dependencias o persistencia.

## Decisions

### 1. Corregir legibilidad y alineación dentro del Sidebar existente

La causa de los textos cortados es el ancho fijo y el desbordamiento oculto del estilo de etiqueta, mientras que `top` y `left` desplazan el enlace activo respecto del flujo de la lista y dejan desfasada la barra seudoelemento. Ajustar el ancho y la cuadrícula del menú para acomodar las cinco etiquetas, y retirar el desplazamiento posicional del enlace activo; el fondo ocupará el enlace y la barra indicadora se posicionará con referencia a ese mismo enlace. Se conserva la lista de `NavLink` e iconos, sin tocar la semántica de rutas. Alternativa descartada: reemplazar el componente por un nuevo sistema de navegación, innecesario para el defecto descrito. Evidencia de implementación y pruebas: `src/components/Sidebar.tsx`, `src/styles/sidebar.css`, `src/components/AppLayout.test.tsx`; convenciones: `README.md`, `openspec/config.yaml`, `package.json`; no hay `AGENTS.md` ni ADR aplicables.

### 2. Adaptar el layout con un breakpoint estricto menor a 900 px

Las reglas responsivas se definirán en los estilos existentes de Sidebar y layout para que debajo de 900 px el menú ocupe una fila superior dentro del flujo normal y el contenido permanezca visible debajo, mientras que a 900 px y más el menú siga como columna lateral junto al contenido. Usar el breakpoint inclusivo equivalente a `max-width: 899px` para respetar explícitamente el caso de 900 px exactos como escritorio. Alternativa descartada: conservar el posicionamiento absoluto u ocultar el menú en móvil, porque no evita la obstrucción con navegación visible. Evidencia: `src/components/AppLayout.tsx`, `src/styles/layout.css`, `src/styles/sidebar.css`; convenciones: `README.md`, `openspec/config.yaml`, `package.json`; pruebas existentes: `src/components/AppLayout.test.tsx`, `src/test/renderApp.tsx`, configuración Vitest en `vite.config.ts`; no hay `AGENTS.md` ni ADR aplicables.

### 3. Ampliar pruebas del layout y verificar los tres comandos definidos

Extender las pruebas de integración de `AppLayout` para abrir una sesión autenticada en `/facturas`, verificar etiquetas completas, estado activo de Facturas y ausencia de estado activo en Pedidos; añadir comprobaciones de presentación responsiva alrededor de 899, 900 y 901 px conforme a las capacidades de prueba disponibles. Mantener Vitest, Testing Library y `renderApp`; la configuración de Vitest desactiva CSS (`css: false`), por lo que no se asumirá que una prueba DOM calcula estilos: comprobar la regla responsiva mediante el mecanismo automatizado compatible con esa configuración o adaptar la prueba del CSS sin agregar dependencias. Ejecutar `npm run lint`, `npm test -- --run` y `npm run build`. Alternativa descartada: añadir un framework de navegador nuevo para un cambio de estilos pequeño. Evidencia: `src/components/AppLayout.test.tsx`, `src/test/renderApp.tsx`, `src/test/setup.ts`, `vite.config.ts`, `package.json`, `.github/workflows/ci.yml`; convenciones: `README.md`, `openspec/config.yaml`; no hay `AGENTS.md` ni ADR aplicables.

## Risks / Trade-offs

- Una fila superior en viewports angostos puede necesitar distribuir las cinco opciones sin que se solapen; mitigación: hacer que el contenedor use el ancho disponible, permitir que iconos y etiquetas mantengan sus columnas coherentes y comprobar que las etiquetas siguen completas en viewport menor al breakpoint.
- La configuración actual de Vitest no importa CSS (`vite.config.ts`, `css: false`), así que pruebas DOM no demuestran por sí solas el layout real a 899/900/901 px; mitigación: añadir una comprobación automatizada del contenido/regla CSS compatible con las herramientas presentes y verificar explícitamente los comandos requeridos, sin introducir una dependencia salvo que la implementación demuestre que es imprescindible.
- El cambio no introduce entradas de datos, nuevos permisos ni almacenamiento; no se modifica la superficie de seguridad ni se exponen datos adicionales. Mitigación: mantener intactos el gating de sesión de `src/components/AppLayout.tsx` y el enrutamiento existente.

## Migration Plan

Sin migración de datos: el cambio afecta únicamente la presentación y las pruebas del cliente; no altera almacenamiento, rutas ni forma de los datos. Desplegar junto con la versión web. Reversión: revertir los cambios de `src/styles/sidebar.css`, `src/styles/layout.css` y sus pruebas; no se requiere transformación ni restauración de datos. Comprobar `npm run lint`, `npm test -- --run` y `npm run build`.
