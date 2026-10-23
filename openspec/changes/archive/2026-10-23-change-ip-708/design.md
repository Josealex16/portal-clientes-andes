## Context

La página Facturas ya presenta una introducción, la aclaración de moneda y luego la tabla que se construye con los datos de muestra. El cambio agrega únicamente la orientación textual para facturas no encontradas; la propuesta excluye cambios a la tabla, sus datos y otras páginas. No se encontró un ADR aplicable en `docs/adr/`, `adr/` ni `docs/decisions/`.

## Goals / Non-Goals

- Mostrar el texto exacto solicitado tras la aclaración de moneda y antes de la tabla.
- Mantener las columnas y los cinco registros actuales de facturas sin cambios.
- No cambiar estilos, rutas, autenticación, persistencia ni otras páginas.

## Decisions

### 1. Agregar el párrafo de orientación en la página Facturas, antes de la tabla

La ubicación debe conservar la aclaración de moneda inmediatamente después de la introducción y el párrafo nuevo inmediatamente después de esa aclaración. Decisión: añadir en `InvoicesPage` un párrafo con el texto exacto «Si una factura no aparece, escribe a soporte@andes.example.» entre la aclaración y el contenedor de la tabla, sin alterar el contenido ni el orden de la tabla. Esto sigue la estructura de párrafos existente en `src/pages/InvoicesPage.tsx` y la presentación de texto de soporte ya usada en `src/pages/ProfilePage.tsx`; `docs/invoice-currency-disclosure.md` documenta la posición de la aclaración existente. `src/pages/InvoicesPage.test.tsx` muestra el patrón de pruebas unitarias de esa página. Se basa en el texto visible en español y en el requisito de prueba unitaria de `AGENTS.md`, y en el stack React/TypeScript y los comandos de verificación descritos en `openspec/config.yaml` y `package.json`. No hay un ADR aplicable identificado. Se descarta modificar la aclaración o incorporar el mensaje a la tabla porque incumpliría el orden y alcance requeridos.

### 2. Conservar la tabla y los datos de facturación

El párrafo es contenido de presentación y no necesita alterar la fuente de datos ni la lógica de renderizado de filas. Decisión: mantener intactos las columnas, el mapeo de facturas y los datos existentes; `src/pages/InvoicesPage.tsx` implementa actualmente la tabla y `src/data/sampleData.ts` contiene los cinco registros FAC-8812, FAC-8790, FAC-8741, FAC-8702 y FAC-8655 especificados. `src/pages/InvoicesPage.test.tsx` respalda la convención de pruebas unitarias de la página. Se basa en el límite de alcance de `AGENTS.md`, en el stack y verificación descritos en `openspec/config.yaml` y `package.json`; no se encontró un ADR aplicable. Se descarta cualquier cambio en columnas, registros o datos porque no es necesario para mostrar la orientación.

## Risks / Trade-offs

- No se añade un riesgo de seguridad significativo: el cambio solo presenta texto estático y el correo de soporte ya aparece en otras superficies del portal (`src/pages/ProfilePage.tsx`); no introduce entradas de usuario, almacenamiento ni una nueva operación de contacto. Se mantiene el texto literal solicitado y no se exponen datos de facturas adicionales.

## Migration Plan

Sin migración de datos: no cambia el formato ni el contenido persistido; las facturas permanecen en `src/data/sampleData.ts`. La reversión consiste en retirar el nuevo párrafo de `src/pages/InvoicesPage.tsx`; la tabla y sus datos no requieren restauración.
