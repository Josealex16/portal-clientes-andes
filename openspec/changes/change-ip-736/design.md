## Context

La página Facturas presenta actualmente el contador `Facturas (N)` y la tabla aun cuando la lista no tiene elementos. La especificación modificada mantiene el contador basado en las filas visibles y requiere que, con lista vacía, se muestre «Todavía no hay facturas.» en lugar de la tabla. La aplicación es una interfaz React con datos de ejemplo locales, sin servidor ni base de datos (`README.md`, `src/data/sampleData.ts`).

## Goals / Non-Goals

- Conservar `Facturas (N)` basado en la misma lista que se presenta.
- Cuando la lista esté vacía, mostrar «Todavía no hay facturas.» y omitir la tabla.
- Conservar la tabla actual cuando hay facturas y no alterar el resto del contenido de Facturas.
- No cambiar el origen de datos, autenticación, persistencia, estilos ni otras páginas.

## Decisions

### 1. Mostrar el estado vacío según la misma lista que determina el contador

Contexto: la página ya obtiene sus facturas y el contador desde `invoices`; la especificación `openspec/changes/change-ip-736/specs/invoices-list-count/spec.md` exige el mismo resultado de lista para el título y la presentación. Decisión: en `src/pages/InvoicesPage.tsx`, mantener `invoices.length` en el título y condicionar la sección de tabla con esa misma longitud: con elementos se conserva la tabla completa; sin elementos se muestra en su lugar el texto exacto «Todavía no hay facturas.» y no se renderiza una tabla. Así, el escenario IP-723 con FAC-8812 y FAC-8790 conserva `Facturas (2)` y esas dos filas; el escenario IP-723 de empresa sin facturas muestra `Facturas (0)`, el mensaje requerido y ninguna tabla. Se conserva el contenido informativo restante de la página. Alternativa descartada: dejar una tabla con encabezados y cuerpo vacío, porque contradice explícitamente el escenario sin facturas.

La decisión sigue el patrón de estado vacío existente en `src/pages/OrdersPage.tsx`, donde el contador y la presentación dependen de la misma lista. `src/data/sampleData.ts` confirma el origen local de las facturas; `src/pages/InvoicesPage.test.tsx` cubre contador y listado, y `src/pages/OrdersPage.test.tsx` documenta el patrón equivalente para lista vacía. `AGENTS.md` exige una prueba unitaria por cambio de comportamiento y textos visibles en español; `openspec/config.yaml`, `package.json` y `README.md` definen las comprobaciones del repositorio (`npm run lint`, `npm test -- --run` y `npm run build`) y su stack de interfaz. No se encontró un ADR aplicable en `docs/adr/`, `adr/` o `docs/decisions/`.

## Risks / Trade-offs

- Si el contador y la condición del mensaje llegaran a calcularse desde listas distintas, podrían no coincidir. Mitigación: ambos dependen de `invoices.length`, conservando una única fuente de verdad, de acuerdo con `src/pages/InvoicesPage.tsx` y el requisito `invoices-list-count`.
- No se añade riesgo material de seguridad: el cambio solo presenta el estado de una lista de datos de ejemplo y no incorpora entradas, permisos, datos personales, secretos, almacenamiento ni nuevas dependencias (`README.md`, `src/data/sampleData.ts`). La separación entre el mensaje vacío y la tabla se limita al renderizado de la página (`src/pages/InvoicesPage.tsx`).

## Migration Plan

No hay migración de datos: el cambio solo modifica la presentación; no altera esquemas, datos persistidos ni formatos almacenados (`README.md`, `src/data/sampleData.ts`). Para revertirlo, se revierte el cambio de renderizado en `src/pages/InvoicesPage.tsx` y se restaura la presentación previa de la tabla vacía; no se requiere restauración de datos.
