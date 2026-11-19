## Context

La especificación `invoice-amount-formatting` requiere que todos los totales de Facturas muestren la parte numérica en formato `es-CL`, con agrupación de miles y exactamente dos decimales, y que se conserve la indicación CLP existente. La propuesta limita el cambio a Facturas: actualmente `src/pages/InvoicesPage.tsx` llama a `formatCurrency` al mostrar cada importe, mientras `src/data/sampleData.ts` implementa ese formateador compartido con cero decimales. Pedidos e Inicio también reutilizan esa función (`src/pages/OrdersPage.tsx`, `src/pages/HomePage.tsx`), así que cambiarla globalmente ampliaría el alcance.

El repositorio usa Vite, React 18, TypeScript y React Router 6 (`openspec/config.yaml`). `AGENTS.md` exige que los textos visibles estén en español, que los estilos permanezcan en hojas CSS y que cada cambio de comportamiento tenga prueba unitaria. La página y sus pruebas relacionadas están en `src/pages/InvoicesPage.tsx`, `src/pages/InvoicesPage.test.tsx` y `src/pages/InvoicesPage.content.test.tsx`; los comandos de verificación son `npm run lint`, `npm test -- --run` y `npm run build` (`openspec/config.yaml`, scripts de `package.json`). No se encontraron ADR en `docs/adr/`, `adr/` o `docs/decisions/`.

## Goals / Non-Goals

**Goals**
- Presentar cada total de Facturas con separador de miles de punto y dos decimales separados por coma.
- Conservar la indicación existente de pesos chilenos (CLP) y mantener los demás usos del formato actual.
- Verificar los dos escenarios descritos en la especificación mediante la cobertura unitaria de Facturas.

**Non-Goals**
- No cambiar los valores de factura, su ordenación, las columnas ni otras pantallas o importes.
- No modificar la indicación informativa de CLP ni añadir estilos, dependencias, persistencia o servicios.

## Decisions

### 1. Aplicar formato CLP con dos decimales solo a los totales de Facturas

La página Facturas ya es responsable de presentar `invoice.amount` en la celda «Monto» y el formato compartido actual no cumple el número de decimales requerido (`src/pages/InvoicesPage.tsx`, `src/data/sampleData.ts`). Se utilizará para esa presentación un formateador localizado en `es-CL`, con moneda CLP y mínimo y máximo de dos posiciones decimales, sin cambiar `formatCurrency`. Así, para los importes `1.280.000` y `864.000` la parte numérica será «1.280.000,00» y «864.000,00»; para `1234.5` será «1.234,50». Se mantiene el texto existente que identifica los montos como pesos chilenos en la página (`src/pages/InvoicesPage.tsx`). Esta separación sigue el alcance limitado a Facturas de la propuesta y evita cambiar los formatos que usan Pedidos e Inicio (`src/pages/OrdersPage.tsx`, `src/pages/HomePage.tsx`). No se reutiliza el formateador compartido con una modificación global porque afectaría importes ajenos a los requisitos. La implementación sigue la organización actual de páginas y datos indicada por `openspec/config.yaml` y `AGENTS.md`; no hay ADR aplicable que modificar ni decisión que requiera un ADR nuevo.

### 2. Cubrir explícitamente ambos escenarios en la unidad de Facturas

La regla de `AGENTS.md` requiere una prueba unitaria para cada cambio de comportamiento. Se ampliará la cobertura existente de la tabla de Facturas para comprobar los dos montos enteros del escenario múltiple, el valor fraccionario y que la indicación CLP siga presente; las pruebas de contenido y de página ya verifican las filas y esa indicación (`src/pages/InvoicesPage.content.test.tsx`, `src/pages/InvoicesPage.test.tsx`). Se conserva la infraestructura existente de Vitest y Testing Library (`package.json`, archivos de prueba citados) y la verificación del proyecto continúa con los comandos establecidos (`openspec/config.yaml`). No se agrega una abstracción de formato compartida ni otra dependencia.

## Risks / Trade-offs

- **La localización del entorno podría producir separadores distintos si no se fija explícitamente.** Mitigación: usar la locale `es-CL` y fijar tanto el mínimo como el máximo de decimales a dos para la presentación de Facturas; los escenarios especificados fijan los resultados visibles requeridos.
- **Modificar el formateador común podría alterar montos fuera de Facturas.** Mitigación: mantener intacto `formatCurrency` y usar el formato de dos decimales exclusivamente en la página Facturas, donde el cambio está solicitado (`src/data/sampleData.ts`, `src/pages/OrdersPage.tsx`, `src/pages/HomePage.tsx`).

No se incorporan entradas externas, datos personales, permisos ni almacenamiento nuevos; el cambio aplica formato a valores numéricos ya presentes en la colección de facturas (`src/data/sampleData.ts`).

## Migration Plan

No hay migración de datos: solo cambia la presentación de importes en la interfaz; no se alteran valores, esquemas, archivos persistidos ni formatos almacenados (`src/pages/InvoicesPage.tsx`, `src/data/sampleData.ts`). Para revertir, se restaura la presentación previa en Facturas y se retira la cobertura unitaria asociada. No se requiere restaurar ni transformar datos.
