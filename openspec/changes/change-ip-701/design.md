## Context

El cambio agrega dos aclaraciones textuales independientes a las páginas existentes, sin alterar tablas, estilos, datos ni el ordenamiento: Pedidos informa el orden cronológico descendente y Facturas informa que los montos están expresados en CLP. La propuesta limita el alcance a `src/pages/OrdersPage.tsx` y `src/pages/InvoicesPage.tsx`; las specs precisan el texto literal y su ubicación respecto de la introducción y la tabla.

## Goals / Non-Goals

- Mostrar en Pedidos la aclaración exacta de orden inmediatamente después de «Historial reciente de pedidos de tu empresa.» y antes de la tabla.
- Mostrar en Facturas la aclaración exacta de moneda inmediatamente después de «Documentos emitidos a tu empresa y su estado de pago.» y antes de la tabla.
- No cambiar el ordenamiento, las filas, las columnas, los datos, los estilos ni ninguna otra conducta de las páginas.

## Decisions

### 1. Añadir la aclaración de orden dentro de la página Pedidos

La especificación `openspec/changes/change-ip-701/specs/orders-sorting-disclosure/spec.md` requiere que el párrafo «Los pedidos se ordenan del más reciente al más antiguo.» aparezca inmediatamente después de la introducción y antes de la tabla.
Decisión: agregar ese párrafo como contenido de `OrdersPage`, entre el `page__lead` existente y el panel de la tabla, conservando el texto literalmente. Esto sigue la organización actual de la página y su orden de renderizado en `src/pages/OrdersPage.tsx`; `src/pages/OrdersPage.test.tsx` respalda que el orden descendente y las columnas actuales son comportamiento existente que se conserva. Las convenciones de interfaz y verificación consultadas están en `openspec/config.yaml`, `README.md` y `package.json`. No hay `AGENTS.md` ni ADR aplicable en el repositorio.
Alternativas: modificar los datos o el mecanismo de ordenamiento sería innecesario y excedería el alcance textual aprobado.

### 2. Añadir la aclaración de moneda dentro de la página Facturas

La especificación `openspec/changes/change-ip-701/specs/invoice-currency-disclosure/spec.md` requiere que el párrafo «Los montos están expresados en pesos chilenos (CLP).» aparezca inmediatamente después de la introducción y antes de la tabla.
Decisión: agregar ese párrafo como contenido de `InvoicesPage`, entre el `page__lead` existente y el panel de la tabla, conservando el texto literalmente. La ubicación sigue la estructura actual de `src/pages/InvoicesPage.tsx`; `src/pages/InvoicesPage.test.tsx` documenta los datos y el contenido de facturas existente, que no se altera. Las convenciones de interfaz y verificación consultadas están en `openspec/config.yaml`, `README.md` y `package.json`. No hay `AGENTS.md` ni ADR aplicable en el repositorio.
Alternativas: cambiar la presentación de los montos o los datos de las facturas no es necesario para informar la moneda y excedería la spec.

## Risks / Trade-offs

- La divulgación de moneda es informativa y no convierte ni valida importes; esto es intencional, pues la propuesta y la spec limitan el cambio a texto y prohíben alterar los datos o la tabla.

## Migration Plan

Sin migración de datos: el cambio solo agrega texto estático a dos páginas React y no modifica almacenamiento, esquema, formato persistido ni datos de ejemplo (`src/pages/OrdersPage.tsx`, `src/pages/InvoicesPage.tsx`, `README.md`). Reversión: quitar los dos párrafos insertados; no hace falta una migración inversa ni una transformación de datos.
