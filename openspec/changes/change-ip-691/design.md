## Context

La página Pedidos ya genera sus filas desde `orders` y presenta cada monto con `formatCurrency`; los cinco pedidos de ejemplo suman 5.479.000 pesos chilenos. La especificación exige una fila «Total de pedidos» después de las filas existentes, con esa suma en formato CLP; la propuesta limita el alcance a Pedidos y a su cobertura unitaria. El repositorio organiza la interfaz en `src/pages/` y los datos de ejemplo y su formato en `src/data/`, y declara que no hay servidor ni base de datos (`README.md`, `openspec/config.yaml`).

## Goals / Non-Goals

- Mostrar al pie de la tabla Pedidos el monto acumulado de todos los registros de `orders`, etiquetado «Total de pedidos» y formateado mediante `formatCurrency`.
- Añadir la cobertura unitaria de página solicitada para el monto agregado.
- No cambiar otras pantallas, los estilos, ni el origen o la persistencia de los datos.

## Decisions

### 1. Calcular y mostrar el total en la tabla existente de Pedidos

La página ya itera `orders` dentro del `tbody` y usa `formatCurrency` para los montos; los datos y el formateador pertenecen a `src/data/sampleData.ts`. Se agregará, después de las filas generadas, una fila del mismo `tbody`: la etiqueta «Total de pedidos» ocupará las primeras tres columnas, el monto sumado desde todos los `orders` se mostrará en la columna numérica con `formatCurrency`, y la última celda conservará la estructura de cinco columnas. No se filtran pedidos ni se modifica `sampleData` o el formato CLP. La ubicación sigue la separación existente entre páginas y datos (`README.md`, `openspec/config.yaml`, `src/pages/OrdersPage.tsx`, `src/data/sampleData.ts`); la presentación de montos de una tabla y el patrón de pruebas unitarias de página están ejemplificados por `src/pages/InvoicesPage.tsx` y `src/pages/InvoicesPage.test.tsx`. No hay un `AGENTS.md` ni ADR en las ubicaciones de arquitectura/decisiones consultadas; no se introduce ni contradice una decisión arquitectónica registrada.

### 2. Cubrir el monto agregado en la página Pedidos

La propuesta pide una prueba unitaria de página que compruebe el monto mostrado. Se añadirá en `src/pages/OrdersPage.test.tsx`, siguiendo el uso actual de pruebas unitarias de páginas y la configuración de limpieza compartida (`src/pages/InvoicesPage.test.tsx`, `src/test/setup.ts`, `package.json`, `README.md`). La comprobación corresponde al escenario especificado: los cinco montos disponibles producen 5.479.000 pesos chilenos, mostrados con el formato de `formatCurrency` tras las filas de pedidos.

## Risks / Trade-offs

No se identifican riesgos materiales adicionales: el agregado se deriva de la misma colección estática que ya renderiza la tabla, sin incorporar datos de usuarios, entradas externas, almacenamiento ni dependencias nuevas. Se mantiene el formato existente de CLP y el alcance queda limitado a Pedidos.

## Migration Plan

Sin migración de datos: el cambio solo presenta un cálculo sobre `orders` estático y no modifica esquemas, archivos persistidos ni formatos almacenados (`README.md`, `src/data/sampleData.ts`). Para revertirlo, se retira la fila agregada y la cobertura unitaria asociada; no se requiere restaurar ni transformar datos.
