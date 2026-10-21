## Context

La propuesta y la especificación `invoice-order-status-badges` requieren que cada estado de factura y pedido mantenga el tono semántico indicado, y en particular que «Vencida» deje de compartir el tono de éxito con «Pagada». Las páginas de Facturas y Pedidos ya delegan la presentación del estado en `StatusBadge`; el mapa de tonos y las clases visuales correspondientes existen en `src/components/StatusBadge.tsx` y `src/styles/global.css`. El repositorio es una aplicación React/TypeScript sin backend ni base de datos, según `README.md`; no se encontraron ADR ni archivos `AGENTS.md` en el repositorio.

## Goals / Non-Goals

**Goals**
- Asignar peligro a «Vencida», preservando el tono especificado para los otros cinco estados.
- Añadir cobertura unitaria que fije el tono de cada estado de factura y pedido.

**Non-Goals**
- Cambiar estilos, rutas, pantallas, datos de ejemplo, estados o el tratamiento de otros valores.
- Añadir capas, dependencias, servicios o persistencia.

## Decisions

### 1. Corregir únicamente el mapa centralizado de tonos

El mapa centralizado ya es el punto que consume la insignia tanto en Facturas como en Pedidos; cambiar estilos o duplicar reglas en las páginas ampliaría el alcance sin necesidad. Decisión: cambiar la asignación de «Vencida» a peligro en `src/components/StatusBadge.tsx` y conservar el resto del mapa, de modo que los escenarios de la especificación quedan explícitamente así: «Factura vencida en tono de peligro» → `badge--danger`; «Factura pagada en tono de éxito» → `badge--success`; «Factura pendiente en tono de advertencia» → `badge--warning`; «Pedido en preparación en tono de advertencia» → `badge--warning`; «Pedido en camino en tono informativo» → `badge--info`; «Pedido entregado en tono de éxito» → `badge--success`. Esto sigue el alcance de `openspec/changes/change-ip-687/proposal.md` y `openspec/changes/change-ip-687/specs/invoice-order-status-badges/spec.md`, la organización descrita en `README.md` y la verificación de `openspec/config.yaml`. Se apoya en `src/components/StatusBadge.tsx`, `src/pages/InvoicesPage.tsx`, `src/pages/OrdersPage.tsx`, `src/data/sampleData.ts` y las clases ya definidas en `src/styles/global.css`; `src/components/AppLayout.test.tsx` muestra el patrón de pruebas de componentes. Alternativa descartada: decidir el tono desde cada página o modificar CSS, porque duplicaría la decisión o alteraría un estilo compartido cuando la corrección requerida está en el mapeo.

### 2. Fijar los seis tonos con una prueba unitaria junto al componente

La propuesta exige prevenir regresiones para todos los estados, no solo para «Vencida». Decisión: añadir una prueba unitaria del componente `StatusBadge` junto a su módulo, con un caso por cada uno de los seis estados y su clase exacta enumerada en la decisión 1. Se usan Vitest y Testing Library que el repositorio ya tiene (`package.json`); `src/components/AppLayout.test.tsx` y `src/test/setup.ts` respaldan el patrón y la configuración existente. Esta decisión sigue el alcance de la propuesta y la verificación definida en `openspec/config.yaml`, sin introducir dependencias. Alternativa descartada: probar únicamente el mapa mediante una prueba aislada de datos, porque el requisito especifica el tono de la insignia renderizada.

## Risks / Trade-offs

- Una modificación posterior podría volver a asignar a un estado un tono semánticamente incorrecto; la prueba unitaria cubre cada uno de los seis estados y fija su clase correspondiente, protegiendo el mapa centralizado.
- No se identifican riesgos de seguridad: el cambio solo afecta una clase visual estática, sin nuevas entradas, datos, autorización, almacenamiento ni secretos.

## Migration Plan

No hay migración de datos: no se modifican esquemas, formatos persistidos ni datos de ejemplo. Desplegar la corrección del mapa y la prueba junto con la aplicación. Para revertir, restaurar el valor anterior de «Vencida» en el mapa y retirar o actualizar los casos unitarios correspondientes; no se requiere restauración de datos.
