## Context

La capacidad `orders-date-sorting` pide mostrar los pedidos por fecha descendente y conservar los datos y la presentación actuales. `src/pages/OrdersPage.tsx` ya renderiza la tabla de Pedidos y ordena una copia de `orders` actualmente en sentido ascendente; `src/data/sampleData.ts` contiene las fechas ISO y los datos de ejemplo indicados por la especificación. La página usa `formatDate` para mostrar fechas como `DD/MM/AAAA`.

El repositorio organiza esta funcionalidad en páginas React y datos de ejemplo, según `README.md`; el alcance de capas descrito allí y en `openspec/config.yaml` no requiere una capa adicional. `package.json` confirma React, TypeScript y Vitest/Testing Library; `openspec/config.yaml` fija los comandos de verificación del proyecto. No hay `AGENTS.md` ni ADR en las ubicaciones habituales del repositorio (`adr/`, `docs/adr/`, `docs/decisions/`), por lo que no hay reglas ni decisiones arquitectónicas que este cambio deba ampliar o contradecir.

## Goals / Non-Goals

- Mostrar primero el pedido con la fecha más reciente y terminar con el más antiguo, de acuerdo con la especificación `specs/orders-date-sorting/spec.md`.
- Conservar columnas, formatos y valores de ejemplo de cada pedido.
- No modificar datos de origen, otras pantallas, servicios, persistencia ni dependencias.

## Decisions

### 1. Ordenar la tabla de Pedidos por fecha descendente

Para el escenario **«Mostrar los pedidos en orden cronológico descendente»**, se invertirá el comparador aplicado actualmente en `src/pages/OrdersPage.tsx` para que `b.date.localeCompare(a.date)` ordene los valores ISO de más reciente a más antiguo. Con las fechas de `src/data/sampleData.ts`, la tabla presentará `PED-2041`, `PED-2037`, `PED-2029`, `PED-2018`, `PED-2003`, con `PED-2041` primero y `PED-2003` al final, tal como exige `specs/orders-date-sorting/spec.md`. Se mantiene el ordenamiento en la página, que ya es propietaria de la presentación; no hace falta añadir lógica a los datos compartidos ni una capa nueva. Esto sigue la organización de `README.md` y el contexto técnico de `openspec/config.yaml`; `src/pages/InvoicesPage.tsx` muestra el patrón existente de páginas que consumen datos compartidos.

### 2. Conservar las columnas, los formatos y los datos de ejemplo

Para el escenario **«Conservar el contenido y la presentación de la tabla»**, se conserva el encabezado «N°», «Fecha», «Detalle», «Total» y «Estado», junto con `formatDate`, `formatCurrency`, `StatusBadge` y los valores originales de los pedidos. Solo cambia la secuencia de renderizado: la copia `[...orders]` evita mutar el arreglo compartido mientras se ordena. Esto se corresponde con `src/pages/OrdersPage.tsx` y `src/data/sampleData.ts`; `src/data/sampleData.test.ts` documenta la representación `DD/MM/AAAA` sin alterar las fechas ISO, y `src/pages/InvoicesPage.test.tsx` ejemplifica el uso existente de Vitest y Testing Library para páginas. Los formatos establecidos también constan en `README.md`; los comandos de verificación del repositorio se describen en `openspec/config.yaml` y `package.json`.

## Risks / Trade-offs

- **Riesgo de alterar el orden de origen compartido al ordenar:** `orders` se importa como dato compartido y también se usa en `src/pages/HomePage.tsx`. La mitigación es ordenar una copia en `src/pages/OrdersPage.tsx`, no modificar `orders`; así se limita el cambio a la tabla de Pedidos. No se añaden entradas externas, autorización, almacenamiento ni datos sensibles, por lo que el cambio no introduce una nueva superficie de seguridad.

## Migration Plan

No hay migración de datos: `README.md` describe la aplicación como una demostración sin servidor ni base de datos, y los pedidos afectados son valores estáticos de `src/data/sampleData.ts`. No cambia el esquema ni el formato persistido. Para revertir el cambio, se restaura en `src/pages/OrdersPage.tsx` el comparador ascendente anterior; los datos de ejemplo permanecen intactos.
