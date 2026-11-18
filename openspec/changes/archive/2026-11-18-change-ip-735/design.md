## Context

La página Pedidos calcula actualmente el título a partir de `ordersToDisplay.length` y siempre representa la tabla, incluso cuando la lista está vacía. IP-735 requiere conservar el contador y el contenido informativo de la página, pero sustituir la tabla por un mensaje cuando la lista visible tiene cero filas. El alcance cubre las tres capacidades modificadas: `orders-list-count`, `orders-sorting-disclosure` y `orders-shipment-tracking-disclosure`.

La implementación relevante está en `src/pages/OrdersPage.tsx`; su prueba unitaria está en `src/pages/OrdersPage.test.tsx`. `AGENTS.md` establece que los textos visibles sean en español, los estilos vivan en hojas CSS y cada cambio de comportamiento tenga prueba unitaria. `openspec/config.yaml` define lint, pruebas y build como verificaciones del repositorio. No se encontraron ADR ni documentos de arquitectura aplicables en las ubicaciones habituales (`docs/adr/`, `adr/`, `docs/decisions/` o archivos de arquitectura); por tanto, no hay una decisión aceptada que requiera excepción ni un nuevo ADR para este cambio local.

## Goals / Non-Goals

**Goals**
- Mostrar «Todavía no hay pedidos.» en lugar de la tabla cuando la lista visible que recibe la página está vacía, sin quitar el título ni su contador cero.
- Mantener la aclaración del orden antes del contenido condicional y la nota de seguimiento al final, respetando sus posiciones especificadas en los estados con y sin pedidos.
- Conservar la tabla, sus filas visibles, su orden y sus datos cuando haya pedidos.
- Actualizar la cobertura unitaria del estado vacío conforme a la convención del repositorio.

**Non-Goals**
- Cambiar el origen o los criterios de filtrado/búsqueda, los datos de pedidos, el ordenamiento, las columnas, la autenticación o cualquier otra parte de la página.
- Distinguir entre una empresa sin pedidos y un filtro que no devuelve resultados: la propuesta define ambos casos a partir de una lista visible vacía.
- Agregar estilos, dependencias, persistencia, endpoints o nuevas capas.

## Decisions

### 1. Sustituir la tabla por el mensaje cuando la lista visible está vacía

El componente ya recibe `ordersToDisplay` (por defecto, los pedidos de ejemplo) y el título cuenta esa lista. Se usará su longitud para elegir entre la tabla existente y el párrafo «Todavía no hay pedidos.»; el encabezado mostrará `Pedidos (0)` para la lista vacía. El título, la introducción y la aclaración «Los pedidos se ordenan del más reciente al más antiguo.» se mantienen. En vacío, la aclaración queda inmediatamente después de la introducción y antes del mensaje; la nota «Para consultar un envío, escribe a soporte@andes.example.» se mantiene después del mensaje y como último contenido. Esto cubre los escenarios vacíos de las tres especificaciones, incluidos `IP-722 El título muestra cero cuando no hay pedidos`, `Mantener la aclaración del orden cuando no hay pedidos` y `Conservar la nota de seguimiento cuando no hay pedidos`. Se sigue el contenido y la estructura actuales del componente y las convenciones de texto y estilos de `AGENTS.md`; no se añade estilo en línea. Evidencia: `src/pages/OrdersPage.tsx`, `src/pages/OrdersPage.test.tsx`, `openspec/changes/change-ip-735/specs/orders-list-count/spec.md`, `openspec/changes/change-ip-735/specs/orders-sorting-disclosure/spec.md`, `openspec/changes/change-ip-735/specs/orders-shipment-tracking-disclosure/spec.md` y `AGENTS.md`.

Alternativa descartada: conservar una tabla sin filas junto al mensaje. Contradice el requisito explícito de mostrar el mensaje en lugar de la tabla.

### 2. No alterar el contador ni la representación de pedidos existentes

Para una lista no vacía se conserva la tabla actual y se cuentan las filas que la página recibe, que son las visibles tras el filtro o búsqueda aplicados aguas arriba. Se mantienen el orden cronológico descendente, las columnas y los valores; la aclaración sigue inmediatamente después de la introducción y antes de la tabla, y la nota de seguimiento permanece después de la tabla como último contenido. Así se cubren `IP-722 El contador corresponde a las filas visibles`, `IP-722 El filtro limita el contador a los pedidos resultantes`, `Consultar la aclaración del orden en Pedidos`, `Consultar cómo obtener el estado de un envío` y el escenario de conservación de columnas, orden y datos existente. No se modifica `ordersToDisplay` ni se introduce una segunda fuente de conteo. Evidencia: `src/pages/OrdersPage.tsx`, `src/pages/OrdersPage.test.tsx`, `openspec/changes/change-ip-735/proposal.md`, las tres especificaciones de `openspec/changes/change-ip-735/specs/` y `AGENTS.md`.

Alternativa descartada: mover filtrado o conteo al componente. El contrato actual cuenta la lista que recibe la página, y ese cambio excedería el alcance.

### 3. Actualizar la prueba unitaria del estado vacío

La prueba existente `muestra cero y ninguna fila de pedido cuando la lista está vacía` actualmente exige que exista una tabla con solo su fila de encabezado, lo que ya no corresponde al requisito. Se actualizará en `src/pages/OrdersPage.test.tsx` para comprobar el título `Pedidos (0)`, el texto exacto «Todavía no hay pedidos.» y la ausencia de la tabla; las pruebas de los escenarios con pedidos seguirán cubriendo el contador de visibles, el orden, la aclaración, la nota y la conservación de las columnas y datos. Esto cumple `AGENTS.md`, `openspec/config.yaml` y el patrón de pruebas unitarias de `src/pages/OrdersPage.test.tsx`. La verificación del repositorio usa `npm run lint`, `npm test -- --run` y `npm run build` según `openspec/config.yaml` (el manifiesto `package.json` define los scripts correspondientes); el pod también dispone de capacidad unitaria, lint y build.

Alternativa descartada: considerar suficiente la prueba actual de cero filas. No afirma el mensaje exigido ni que la tabla esté ausente, como señala `src/pages/OrdersPage.test.tsx` en la prueba actual del estado vacío.

## Risks / Trade-offs

- Una lista vacía producida por un filtro mostrará «Todavía no hay pedidos.» aunque existan pedidos fuera de los resultados visibles. La propuesta y el contrato del contador definen el estado vacío por la lista visible recibida; se conservará esa semántica sin inferir datos ajenos a la lista. Una distinción entre “sin pedidos” y “sin coincidencias” requeriría otro requisito.
- El cambio no añade puntos de entrada, datos personales, persistencia ni dependencias, por lo que no introduce una nueva superficie de autorización, manejo de secretos o aislamiento de datos. No aplica migración de datos.

## Migration Plan

No hay migración de datos: el cambio solo altera la presentación de la lista ya recibida por `OrdersPage` y no modifica esquemas, formatos persistidos ni datos. Desplegar la actualización del componente junto con su prueba; verificar con los comandos establecidos en `openspec/config.yaml`. Para revertir, restaurar la representación previa del componente y la prueba correspondiente; no hay datos que revertir ni pasos de migración incompatibles.
