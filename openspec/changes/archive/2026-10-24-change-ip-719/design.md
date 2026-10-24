## Context

La página Pedidos muestra actualmente el historial y su tabla, pero no informa cómo consultar el estado de un envío. La spec `openspec/changes/change-ip-719/specs/orders-shipment-tracking-disclosure/spec.md` exige el párrafo literal «Para consultar un envío, escribe a soporte@andes.example.» después de la tabla y como último contenido, además de conservar columnas, orden y valores existentes. La página se implementa en `src/pages/OrdersPage.tsx`; los cinco pedidos y sus valores están en `src/data/sampleData.ts`, y `src/pages/OrdersPage.test.tsx` documenta las columnas, el orden y los datos visibles.

El repositorio usa React y TypeScript y mantiene textos de interfaz en español (`openspec/config.yaml`, `README.md`); `AGENTS.md` restringe los estilos a hojas CSS y pide pruebas unitarias para cambios de comportamiento. No se encontraron ADR en `docs/adr/`, `adr/` ni `docs/decisions/`. El cambio solo agrega contenido estático a la página: no introduce entrada del usuario, servicios, persistencia ni cambios de datos.

## Goals / Non-Goals

**Goals**
- Mostrar la nota de seguimiento exactamente como la define la spec, después de la tabla y como último contenido de Pedidos.
- Mantener intactas las columnas, el orden cronológico descendente y todos los valores visibles de los pedidos existentes.

**Non-Goals**
- Implementar seguimiento del envío, enlaces, llamadas a soporte o nuevas interacciones.
- Cambiar la tabla, los datos de ejemplo, el formato de sus valores, la autenticación o la persistencia.

## Decisions

### 1. Agregar el párrafo literal al final de la página Pedidos

La spec requiere que la persona vea «Para consultar un envío, escribe a soporte@andes.example.» después de la tabla y como último contenido. Se agrega un párrafo estático inmediatamente después del contenedor de la tabla en `src/pages/OrdersPage.tsx`, sin introducir estilos en línea ni nuevas capas; el texto sigue la convención de interfaz en español de `AGENTS.md`, `openspec/config.yaml` y `README.md`. La estructura actual de la página está en `src/pages/OrdersPage.tsx` y su orden de contenido está reflejado en `src/pages/OrdersPage.test.tsx`. No hay ADR aplicable en las ubicaciones de ADR inspeccionadas. Se descarta añadir un enlace o flujo de seguimiento porque la spec solo solicita informar el contacto.

### 2. Dejar inalterada la tabla y su fuente de datos

La spec exige conservar las columnas «N°», «Fecha», «Detalle», «Total» y «Estado», el orden cronológico descendente y los valores de cada pedido. Se conserva sin cambios el renderizado y ordenamiento ya presentes en `src/pages/OrdersPage.tsx` y los registros en `src/data/sampleData.ts`; `src/pages/OrdersPage.test.tsx` refleja esos encabezados, orden y valores. Esta decisión respeta `AGENTS.md`, `openspec/config.yaml` y `README.md`; no se encontró un ADR aplicable. Se descarta modificar los datos o la lógica de la tabla porque no son necesarios para incorporar la nota.

## Risks / Trade-offs

- No se identifican riesgos materiales de seguridad: el cambio solo presenta texto fijo y no incorpora entrada, acceso a datos ni nuevas operaciones; la mitigación es mantener la dirección como contenido literal de presentación y no convertirla en un destino o flujo adicional, coherente con la spec y con la implementación de `src/pages/OrdersPage.tsx`.
- No hay riesgo de migración o pérdida de datos: el cambio no modifica almacenamiento ni los registros de ejemplo, según `README.md`, `src/data/sampleData.ts` y `src/pages/OrdersPage.tsx`.

## Migration Plan

Sin migración de datos: no hay base de datos ni formato persistido afectado por este cambio (`README.md`). Se despliega la modificación de presentación en la página Pedidos. Para revertirla, se elimina el párrafo agregado después de la tabla; la tabla y sus datos permanecen sin cambios.
