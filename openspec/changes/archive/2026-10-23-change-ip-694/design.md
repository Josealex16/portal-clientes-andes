## Context

La página 404 actual ofrece únicamente «Volver al inicio». La spec `not-found-support-link` requiere que, en `/pagina-inexistente`, el enlace «Ir a Soporte» aparezca debajo del enlace actual y apunte exactamente a `/soporte`. La aplicación ya registra el comodín 404 y la ruta de Soporte; el cambio debe limitarse a la página y a su cobertura unitaria. El repositorio usa React 18, TypeScript y React Router 6 (`README.md`, `openspec/config.yaml`). No hay `AGENTS.md` ni ADR en las ubicaciones del repositorio exploradas.

## Goals / Non-Goals

- Mostrar «Ir a Soporte» en la página 404, en la línea visual inferior a «Volver al inicio», con destino `/soporte`.
- Conservar las rutas, el comportamiento de acceso existente y los estilos; añadir cobertura unitaria para la ruta inexistente y el enlace nuevo, según la propuesta.
- No cambiar estilos, rutas, otras páginas, autorización, dependencias ni datos persistidos.

## Decisions

### 1. Añadir el enlace mediante bloques consecutivos en la página 404

La spec exige expresamente que el enlace de Soporte esté debajo del enlace de inicio. Actualmente ambos enlaces serían elementos en línea si se colocaran juntos, y no hay una regla de estilo específica para `.notfound` en `src/styles/` que cree una nueva línea. Decisión: en `src/pages/NotFoundPage.tsx`, conservar el `Link` de inicio y colocar cada enlace en su propio contenedor de bloque consecutivo; el segundo será un `Link` de React Router con texto «Ir a Soporte» y `to="/soporte"`. Así se garantiza el orden vertical sin añadir ni alterar estilos. `src/App.tsx` ya asigna la ruta comodín a `NotFoundPage` y registra `soporte`; `src/pages/SupportPage.tsx` confirma el destino existente. Esto sigue la estructura actual de páginas y navegación descrita en `README.md` y el stack de `openspec/config.yaml`; no hay ADR aplicable. Se descarta modificar hojas de estilo o rutas porque no son necesarios para el requisito y contradirían el alcance.

Escenario «Ir a Soporte desde una ruta inexistente»: al mostrar `/pagina-inexistente`, la página conserva «Volver al inicio» y presenta inmediatamente después y debajo «Ir a Soporte»; el destino de este último es `/soporte`.

### 2. Cubrir la ruta 404 y el enlace en la prueba unitaria de la página

La propuesta limita la cobertura a una prueba unitaria y el repositorio ya proporciona `renderApp` para iniciar la aplicación bajo `MemoryRouter` (`src/test/renderApp.tsx`); sus pruebas de páginas y rutas siguen ese patrón (`src/components/AppLayout.test.tsx`, `src/pages/LoginPage.test.tsx`). Decisión: añadir cobertura junto a la página 404 que represente la ruta inexistente y compruebe que los dos enlaces aparecen en el orden especificado y que el enlace de Soporte tiene destino `/soporte`, sin alterar rutas existentes. Se mantiene el conjunto de dependencias y convenciones actuales (`package.json`, `src/test/setup.ts`, `openspec/config.yaml`), que declara lint, pruebas unitarias y build; no se introduce otra capa ni configuración. No hay ADR aplicable.

## Risks / Trade-offs

- Una persona sin sesión que siga el enlace no obtiene acceso público nuevo: `/soporte` permanece bajo `AppLayout`, que redirige a `/login` si no hay usuario (`src/App.tsx`, `src/components/AppLayout.tsx`). Se conserva el control de acceso existente y el destino requerido; no se elude la autenticación ni se cambia el alcance de la spec.

## Migration Plan

Sin migración de datos: el cambio solo afecta al marcado de una página y a su cobertura unitaria; no añade ni modifica almacenamiento. Para revertirlo, retirar el enlace y su cobertura, conservando intactas las rutas y los estilos existentes. No hay datos que transformar ni restaurar.
