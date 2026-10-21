## Context

El cambio corrige la presentación de las fechas de Emisión y Vencimiento de Facturas y de Fecha de Pedidos al formato `DD/MM/AAAA`, sin modificar los valores ISO. La implementación actual centraliza el formato en `formatDate` en `src/data/sampleData.ts`; las dos tablas ya usan ese helper. La propuesta limita el alcance al helper y a una prueba unitaria. La aplicación es una SPA de Vite, React y TypeScript y usa Vitest; no hay `AGENTS.md` ni ADR en las ubicaciones del repositorio exploradas.

## Goals / Non-Goals

- Mostrar día/mes/año con día y mes de dos dígitos en las tres columnas de fechas indicadas.
- Mantener sin cambios las fechas ISO almacenadas y cubrir el formato del helper con una prueba unitaria.
- No cambiar estilos, rutas, otras pantallas, datos de ejemplo ni exportaciones, ni ampliar el contrato de entrada más allá de fechas ISO `AAAA-MM-DD`.

## Decisions

### 1. Mantener `formatDate` como punto único de presentación de fechas

Las tablas de Facturas y Pedidos ya delegan su representación en `formatDate`, mientras que los datos de `src/data/sampleData.ts` están expresados como fechas ISO. Se cambia únicamente el orden de los componentes del resultado del helper a día/mes/año y se conserva el relleno de día y mes a dos dígitos; el helper no modifica el valor de entrada. Así, para el escenario «Mostrar fechas de Facturas y Pedidos», `2026-09-30`, `2026-10-30` y `2026-09-28` se presentan como `30/09/2026`, `30/10/2026` y `28/09/2026`, manteniéndose los valores originales ISO. Para «Completar con cero inicial un día de un dígito», `2026-09-03` produce `03/09/2026`; para «Completar con cero inicial un mes de un dígito», `2026-03-03` produce `03/03/2026`. Se sigue la organización documentada de `src/data/` para datos compartidos y los comandos y stack descritos en `README.md` y `openspec/config.yaml`; `src/pages/InvoicesPage.tsx` y `src/pages/OrdersPage.tsx` confirman el uso del helper. Se descarta formatear cada tabla por separado porque duplicaría la misma regla.

### 2. Añadir el caso de formato en la prueba unitaria existente de datos

La prueba unitaria del contrato se agrega a `src/data/sampleData.test.ts`, junto a las pruebas existentes del módulo, y comprueba que llamar a `formatDate('2026-09-30')` devuelve exactamente `30/09/2026`, cubriendo el escenario «La prueba fija el formato de una fecha ISO». Esto fija de forma directa el resultado requerido sin introducir otro archivo o dependencia. Sigue el uso de Vitest mostrado por `src/data/sampleData.test.ts` y el comando `npm test -- --run` documentado en `README.md` y `openspec/config.yaml`. Se descarta probar el mismo helper a través de una pantalla porque no es necesario para establecer su contrato de formato.

## Risks / Trade-offs

- Si en el futuro se pasa al helper una cadena que no sea una fecha ISO `AAAA-MM-DD`, el resultado no está definido por este cambio. La propuesta y las entradas actuales establecen ISO como contrato; se conserva ese alcance y no se añade validación ni se cambia la representación de otros datos.

## Migration Plan

Sin migración de datos: las fechas de ejemplo y los valores ISO se mantienen intactos, y no hay esquema ni almacenamiento persistente que modificar (README.md describe que el portal no tiene servidor ni base de datos). El despliegue solo cambia la representación calculada en pantalla. Para revertirlo basta con restaurar el orden de salida anterior de `formatDate`; no se requiere restaurar ni transformar datos.
