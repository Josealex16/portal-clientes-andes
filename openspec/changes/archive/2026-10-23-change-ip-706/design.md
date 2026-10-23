## Context

El cambio añade el contacto de Soporte especificado, exactamente como una única línea centrada debajo del contenido de cada página autenticada. Las rutas públicas de ingreso y registro quedan excluidas. `AppLayout` ya agrupa las rutas autenticadas y rechaza la ausencia de sesión; la aplicación no tiene persistencia de servidor ni datos que modificar. No se encontraron ADR aplicables en `docs/adr/`, `adr/`, `docs/decisions/` ni `**/adr/`.

## Goals / Non-Goals

- Mostrar «Soporte: soporte@andes.example · Lunes a viernes de 09:00 a 18:00» en Inicio, Pedidos, Facturas, Soporte, Mi perfil y rutas autenticadas inexistentes.
- No mostrar el pie en `/login` ni `/registro` y no modificar su contenido ni la autenticación.
- No añadir persistencia, dependencias, capas ni configuración.

## Decisions

### 1. Ubicar el pie en el layout compartido de las rutas autenticadas

La especificación exige que el pie aparezca en todas las páginas con sesión y excluye las rutas públicas. Se renderizará una sola vez dentro de `AppLayout`, después del bloque de contenido que contiene `Outlet`; así abarca también la ruta autenticada comodín sin insertarlo en las páginas públicas, que son rutas hermanas del layout.

Decisión coherente con la estructura descrita en `README.md` y `openspec/config.yaml`; `App.tsx` coloca las páginas autenticadas y el comodín bajo `AppLayout`, mientras `/login` y `/registro` se definen fuera de él; `src/components/AppLayout.tsx` comprueba la sesión antes de renderizar el layout. La prueba de layout existente está en `src/components/AppLayout.test.tsx`. Se siguen `AGENTS.md` (un cambio de comportamiento debe tener prueba unitaria) y `openspec/config.yaml` (verificación del repositorio con lint, pruebas unitarias en modo de una pasada y build). No se encontró un ADR aplicable que esta decisión contradiga.

### 2. Mantener el texto exacto y sus estilos en la hoja existente de layout

El pie mostrará una sola línea centrada con el texto exacto de la spec: «Soporte: soporte@andes.example · Lunes a viernes de 09:00 a 18:00». Se aplicará una clase de presentación definida en `src/styles/layout.css`, sin estilos en línea ni nuevas hojas o componentes; no se alteran el encabezado, menú ni contenido de las páginas.

La spec `openspec/changes/change-ip-706/specs/support-footer/spec.md` fija contenido y alineación; `src/components/AppLayout.tsx` ya importa `src/styles/layout.css`, y esa hoja contiene las reglas del contenedor y del contenido. Esto sigue `AGENTS.md` (hojas CSS en `src/styles/*.css`, texto visible en español y prueba unitaria para cada cambio de comportamiento), `README.md` y `openspec/config.yaml` (estructura y verificación: lint, pruebas unitarias y build). `src/components/AppLayout.test.tsx` documenta la prueba unitaria ya asociada al layout, y `package.json` confirma los scripts y el framework de pruebas existentes. No hay ADR aplicables ni se añade una convención nueva.

## Risks / Trade-offs

- Una modificación futura que saque una página autenticada de `AppLayout` podría dejarla sin el contacto requerido. Mantener el pie en el layout común y conservar las páginas autenticadas, incluido el comodín, bajo ese layout evita duplicaciones y mantiene la cobertura en el punto compartido (`src/App.tsx`, `src/components/AppLayout.tsx`).
- El dato de contacto será visible para las personas con sesión, como exige la spec. No se incorporan datos de usuario ni secretos; se conserva el control de sesión existente en `AppLayout` y las rutas públicas siguen separadas (`src/components/AppLayout.tsx`, `src/App.tsx`).

## Migration Plan

Sin migración de datos: el cambio solo añade presentación estática en React/CSS y no modifica almacenamiento, esquemas ni formatos persistidos. Se despliega junto con la aplicación existente. Para revertirlo, se elimina el pie del layout y su regla CSS; no hay datos que restaurar ni migraciones inversas que ejecutar.
