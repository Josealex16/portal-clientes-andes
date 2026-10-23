## Context

La página Pedidos ya anuncia el orden descendente, pero `src/pages/OrdersPage.tsx` ordena las fechas ISO de forma ascendente. La propuesta y la especificación modificada requieren ordenar las filas por fecha calendario descendente incluso si los pedidos llegan en orden inverso, manteniendo las columnas, los formatos y los datos de ejemplo (`openspec/changes/change-ip-712/proposal.md`, `openspec/changes/change-ip-712/specs/orders-date-sorting/spec.md`). El repositorio es una aplicación Vite/React/TypeScript sin servidor ni base de datos (`README.md`, `openspec/config.yaml`). No se encontraron ADR aplicables.

## Goals / Non-Goals

- Mostrar los pedidos desde la fecha más reciente hasta la más antigua, con independencia del orden de entrada.
- Conservar el contenido, las columnas y la presentación existentes de cada fila.
- No cambiar textos, datos de ejemplo, otras pantallas ni persistencia.

## Decisions

### 1. Ordenar las filas por fecha ISO descendente

El escenario «Mostrar los pedidos en orden cronológico descendente» exige que `PED-2041` sea la primera fila y `PED-2003` la última. Decisión: invertir el comparador existente en `src/pages/OrdersPage.tsx` para ordenar una copia de los pedidos por `date` descendente; los valores `YYYY-MM-DD` usados por los pedidos de ejemplo (`src/data/sampleData.ts`) conservan el orden calendario al compararse como texto. Así se sigue la estructura sencilla de página y datos del repositorio, sus reglas de `AGENTS.md` y la verificación de `openspec/config.yaml`; `src/pages/OrdersPage.test.tsx` contiene la cobertura unitaria actual del orden. No hay ADR aplicable. Alternativa descartada: comparar las fechas ya formateadas `DD/MM/AAAA`, porque el orden textual de ese formato no representa el orden cronológico.

### 2. El resultado no dependerá del orden de llegada

El escenario «Ordenar por fecha cuando los pedidos llegan en orden inverso» requiere el mismo resultado cuando la entrada va de `PED-2003` a `PED-2041`. Decisión: aplicar el orden descendente al conjunto recibido en la página, sin asumir que `orders` ya está ordenado; ordenar una copia evita mutar el arreglo compartido importado desde `src/data/sampleData.ts`. Esto mantiene la separación actual de presentación y datos (`src/pages/OrdersPage.tsx`, `src/data/sampleData.ts`) y respeta `AGENTS.md`, que requiere una prueba unitaria por cambio de comportamiento; `src/pages/OrdersPage.test.tsx` ya verifica el orden y que el arreglo no se mute. No hay ADR aplicable. Alternativa descartada: reordenar los datos fuente, porque no garantizaría el comportamiento ante otro orden de entrada y modificaría datos fuera del alcance.

### 3. Mantener intactos los datos y la presentación de la tabla

El escenario «Conservar el contenido y la presentación de la tabla» requiere las columnas «N°», «Fecha», «Detalle», «Total» y «Estado», fechas `DD/MM/AAAA` y los valores de ejemplo actuales. Decisión: limitar el cambio al orden de las filas y reutilizar `formatDate`, `formatCurrency` y la representación existente de estado; la estructura y mapeo actuales están en `src/pages/OrdersPage.tsx`, los datos/formateadores en `src/data/sampleData.ts` y la cobertura de columnas, valores y formato en `src/pages/OrdersPage.test.tsx`. Es coherente con `AGENTS.md` y `openspec/config.yaml`; no hay ADR aplicable. Alternativa descartada: cambiar columnas, textos, formato o datos de origen, expresamente fuera del alcance de la propuesta y la especificación.

## Risks / Trade-offs

- Si en el futuro las fechas de los pedidos dejan de usar `YYYY-MM-DD`, la comparación textual podría no reflejar el orden calendario. Mitigación: mantener el formato ISO existente de los datos (`src/data/sampleData.ts`), que es el formato asumido por la propuesta; esta modificación no añade ni altera datos.

## Migration Plan

Sin migración de datos: el cambio solo modifica el orden de presentación en el cliente, no altera almacenamiento ni formato de datos. Despliegue del cambio de página; para revertirlo basta con restaurar el comparador ascendente previo. No se requiere backfill ni cambio de esquema.
