## Context

Las tablas de Pedidos y Facturas ya comparten la clase `table` y separan encabezado y datos mediante `thead` y `tbody`; sus estilos compartidos están en `src/styles/global.css`. La propuesta limita el cambio a esos estilos, sin modificar componentes ni datos de ejemplo, y la especificación exige fondo alterno para filas pares de `tbody` y un resaltado hover que prevalezca sobre ambos fondos normales. El repositorio no define `--color-surface-alt` actualmente. (Evidencia: `openspec/changes/change-ip-689/proposal.md`, `openspec/changes/change-ip-689/specs/table-row-highlighting/spec.md`, `src/pages/OrdersPage.tsx`, `src/pages/InvoicesPage.tsx`, `src/styles/global.css`.)

## Goals / Non-Goals

- Distinguir mediante fondo las filas pares del cuerpo y la fila bajo el cursor, en las tablas indicadas.
- Excluir del alternado las filas de encabezado y restaurar el fondo correspondiente al retirar el cursor.
- No cambiar JSX, datos, otras áreas de estilo ni incorporar dependencias.
- No agregar persistencia ni cambios de comportamiento de negocio.

## Decisions

### 1. Aplicar el alternado y el hover en las reglas globales existentes de `.table`

La especificación exige que las filas de datos 1 y 3 conserven su fondo normal, que las filas 2 y 4 reciban el alterno, que el encabezado no se alterne, y que tanto una fila par como una impar usen `#eaf1f4` durante hover y recuperen al salir su fondo previo. Se definirán reglas CSS para `.table tbody tr:nth-child(even)` con `background: var(--color-surface-alt, #f7f9fa)` y para `.table tbody tr:hover` con `background: #eaf1f4`; se colocará la regla hover después de la regla alterna para que prevalezca. Al seleccionar dentro de `tbody`, los encabezados quedan excluidos y la alternancia se cuenta desde la primera fila de datos. Esto sigue el estilo compartido ya ubicado junto a las reglas `.table` en `src/styles/global.css`; las páginas ya usan esa clase y estructura (`src/pages/OrdersPage.tsx`, `src/pages/InvoicesPage.tsx`). La convención de aplicación Vite/React y sus comandos constan en `openspec/config.yaml`, `README.md` y `package.json`; el test existente de Facturas usa Vitest y Testing Library y cubre comportamiento de fechas, no constituye una convención de estilos (`src/pages/InvoicesPage.test.tsx`). No se encontró `AGENTS.md` ni ADR en las ubicaciones exploradas. Alternativa descartada: añadir clases o lógica a los componentes, porque la estructura actual ya permite expresar todos los escenarios con CSS en el archivo prescrito por la propuesta.

## Risks / Trade-offs

- Las reglas `.table` son compartidas; cualquier tabla futura que reutilice esa clase también recibiría estos estilos. Mitigación: mantener los selectores limitados a `tbody` y a las filas dentro de `.table`; al diseñar el cambio se constató que sus usos actuales son únicamente las tablas de Pedidos y Facturas (`src/pages/OrdersPage.tsx`, `src/pages/InvoicesPage.tsx`).

## Migration Plan

Sin migración de datos: el cambio solo añade reglas de presentación CSS y no modifica almacenamiento, formatos persistidos ni datos de ejemplo. Reversión: retirar las dos reglas añadidas en `src/styles/global.css`; no se requiere restaurar datos ni desplegar una migración inversa.
