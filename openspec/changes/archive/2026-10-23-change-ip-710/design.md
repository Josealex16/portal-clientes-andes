## Context

La página 404 ya muestra el título, el `pathname` solicitado, la frase introductoria y los enlaces de inicio y Soporte. El cambio agrega solo el texto informativo pedido, inmediatamente después de la frase introductoria, y conserva el resto de la página. La propuesta limita el alcance a `src/pages/NotFoundPage.tsx` y `src/pages/NotFoundPage.test.tsx` (`openspec/changes/change-ip-710/proposal.md`); la especificación define el escenario «Mostrar la indicación sin alterar el contenido existente» (`openspec/changes/change-ip-710/specs/not-found-support-link/spec.md`).

## Goals / Non-Goals

- Mostrar «Vuelve al inicio desde el menú lateral.» como párrafo inmediatamente debajo de «La dirección que buscas no existe o fue movida.».
- Conservar el título, «No encontramos /facturas-viejas» para la ruta del escenario y los enlaces «Volver al inicio» a `/` e «Ir a Soporte» a `/soporte`, en ese orden.
- No cambiar otras páginas, rutas, enlaces, autenticación ni persistencia.

## Decisions

### 1. Añadir un párrafo informativo estático en la página 404 existente

El escenario «Mostrar la indicación sin alterar el contenido existente» requiere la frase solicitada inmediatamente después de la introducción, sin otras alteraciones. Decisión: añadir un elemento `<p>` con el texto exacto a `NotFoundPage`, a continuación del párrafo con clase `page__lead`; dejar intactos el título, la interpolación actual de `pathname` y los dos enlaces. Esto sigue la estructura de página existente (`src/pages/NotFoundPage.tsx`), la ruta comodín que ya renderiza ese componente (`src/App.tsx`), la cobertura unitaria existente de su contenido y navegación (`src/pages/NotFoundPage.test.tsx`) y el renderizador compartido (`src/test/renderApp.tsx`). Sigue `AGENTS.md` (textos visibles en español, estilos solo en `src/styles/*.css` y prueba unitaria por cambio de comportamiento), `openspec/config.yaml` (React/TypeScript y verificación establecida) y la estructura y convenciones documentadas en `README.md`. No se requiere estilo nuevo para el párrafo ni una capa, dependencia o abstracción adicional. No se encontraron ADR aplicables en `adr/`, `docs/adr/`, `docs/decisions/` ni en las rutas de ADR buscadas; no hay contradicción que registrar.

## Risks / Trade-offs

- Si el párrafo se inserta en otra posición o se modifica contenido existente, se incumple el único escenario de la especificación. Mitigación: mantener el cambio limitado al markup de la página y extender la cobertura unitaria existente de `src/pages/NotFoundPage.test.tsx` para representar ese escenario completo, conforme a `AGENTS.md`.
- Una modificación colateral del renderizado de la ruta solicitada podría cambiar su tratamiento como texto de React. Mitigación: conservar intacta la interpolación existente de `pathname` y agregar únicamente el párrafo estático en JSX, sin HTML dinámico (`src/pages/NotFoundPage.tsx`). El cambio no incorpora entradas, permisos, secretos ni almacenamiento nuevos.

## Migration Plan

No hay migración de datos: el cambio es solo de presentación y no modifica formatos persistidos, como confirma el alcance del componente y la ausencia de almacenamiento en esta página (`src/pages/NotFoundPage.tsx`; `README.md`). Para revertirlo, retirar únicamente el párrafo agregado y su cobertura asociada; el título, la ruta y los enlaces existentes permanecen sin cambios.
