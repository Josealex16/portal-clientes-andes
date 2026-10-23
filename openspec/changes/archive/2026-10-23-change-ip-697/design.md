## Context

La ruta comodín de `src/App.tsx` muestra `NotFoundPage`, que ya ofrece «Volver al inicio» y «Ir a Soporte»; la página actualmente no identifica cuál fue la dirección solicitada. El cambio agrega debajo del título «No encontramos <ruta>», tomando `<ruta>` del `pathname` actual, sin tocar rutas ni estilos. La propuesta excluye parámetros de búsqueda y fragmentos.

La aplicación ya proporciona el contexto del router a sus páginas mediante `BrowserRouter` en `src/main.tsx`; la prueba existente renderiza la aplicación bajo `MemoryRouter` mediante `src/test/renderApp.tsx`. El stack y las convenciones documentadas son React 18, TypeScript y React Router 6 (`README.md`, `openspec/config.yaml`, `package.json`). No hay `AGENTS.md` ni ADR aplicables en las ubicaciones del repositorio inspeccionadas.

## Goals / Non-Goals

- Mostrar el `pathname` solicitado debajo del título para que la persona reconozca la ruta que produjo el 404.
- Conservar el texto introductorio, los enlaces y su orden actuales.
- No cambiar el catálogo de rutas, estilos, otras páginas, ni mostrar la query o el fragmento.
- No añadir capas, dependencias, persistencia ni configuración.

## Decisions

### 1. Leer el pathname en la página 404 existente

El requisito pertenece a la página ya asociada con la ruta comodín, no a una nueva capa de routing. Decisión: dentro de `src/pages/NotFoundPage.tsx`, obtener la ubicación con `useLocation` de `react-router-dom` e insertar debajo de `<h1>` el texto «No encontramos {pathname}»; mostrar solo `pathname`. Para el escenario de la ruta inexistente `/facturas-viejas`, debajo del título debe verse exactamente «No encontramos /facturas-viejas». El párrafo introductorio y los enlaces «Volver al inicio» y «Ir a Soporte» permanecen sin cambios.

Se sigue el enrutamiento ya dispuesto en `src/App.tsx` y `src/main.tsx`, y el uso de React Router 6 documentado en `openspec/config.yaml`, `README.md` y `package.json`. El patrón del acceso de Soporte que se conserva está documentado en `docs/not-found-support-link.md` e implementado actualmente en `src/pages/NotFoundPage.tsx`; `src/pages/NotFoundPage.test.tsx` cubre ese contrato existente y es el archivo asociado a la nueva cobertura indicada por la propuesta. No se añade un componente genérico ni se modifica `App`. No hay ADR que contradiga o extienda esta decisión, por lo que no se requiere proponer uno.

### 2. Mostrar la ruta como texto, sin interpretarla como marcado

La dirección solicitada es entrada controlada por quien navega. Decisión: interpolar el `pathname` como hijo de texto React dentro del párrafo de presentación, sin tratarlo como HTML ni alterar o guardar la dirección. Esto mantiene la visualización solicitada como texto literal y evita introducir un punto de interpretación de marcado. La elección encaja con el componente funcional existente en `src/pages/NotFoundPage.tsx` y no necesita validación adicional, nueva biblioteca ni servicio. No se añaden registros ni almacenamiento; los datos de routing ya los provee React Router como muestran `src/main.tsx` y `src/test/renderApp.tsx`.

## Risks / Trade-offs

- Una persona puede abrir una ruta con caracteres que parezcan marcado y esperar que se interpreten -> al renderizar el `pathname` como texto React, el contenido permanece texto y no se ejecuta como HTML; no se debe usar una inserción de HTML sin escapar. Esto conserva el alcance de mostrar la ruta literalmente.

## Migration Plan

Sin migración de datos: el `pathname` procede del estado de navegación actual y no se añade ni cambia ningún dato persistido, formato, ruta ni configuración. Desplegar el cambio de componente junto con la cobertura asociada. Para revertirlo, retirar la lectura del `pathname` y la línea de presentación, y revertir la cobertura añadida; los enlaces y rutas preexistentes permanecen intactos.
