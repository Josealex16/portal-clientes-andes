## Context

La spec `specs/invoice-download-format-disclosure/spec.md` requiere que la página Facturas muestre exactamente «Los documentos se descargan en formato PDF.» inmediatamente después de la tabla, manteniendo sus cinco columnas y los cinco registros existentes. La propuesta acota el cambio al contenido visible: no altera la descarga ni el contenido de la tabla.

El repositorio es una aplicación de interfaz React 18 y TypeScript organizada por páginas (`README.md`, `package.json`); `src/pages/InvoicesPage.tsx` ya compone el contenido y la tabla de Facturas. `AGENTS.md` establece que los textos visibles estén en español, que los estilos residan en `src/styles/*.css` y que cada cambio de comportamiento tenga prueba unitaria. La configuración OpenSpec documenta `npm run lint`, `npm test -- --run` y `npm run build` como verificaciones. No se encontraron ADR aplicables en `docs/adr/`, `adr/` ni `docs/decisions/`.

## Goals / Non-Goals

**Goals**
- Mostrar la nota requerida al final del contenido de Facturas, después de la tabla.
- Mantener exactamente la estructura de columnas y los datos existentes de las facturas.

**Non-Goals**
- Implementar o modificar la descarga o el formato real de los documentos.
- Cambiar datos, estilos, persistencia, autenticación o servicios.

## Decisions

### 1. Añadir la nota especificada como párrafo inmediatamente después de la tabla

La spec exige el texto exacto «Los documentos se descargan en formato PDF.» después de la tabla. Decisión: añadirlo como párrafo visible al final de la sección existente de `src/pages/InvoicesPage.tsx`, después del panel que contiene la tabla; no requiere nueva capa, dependencia ni estilo. Sigue la organización por páginas del `README.md`, el texto en español y la ubicación de estilos de `AGENTS.md`, y la composición React existente en `src/pages/InvoicesPage.tsx`; `src/pages/InvoicesPage.test.tsx` y `src/pages/InvoicesPage.content.test.tsx` documentan la estructura de contenido actual. No hay ADR aplicable. Alternativa descartada: ubicar la nota antes o dentro de la tabla, lo que no satisface que aparezca inmediatamente después.

Escenario cubierto: al consultar la página Facturas, el párrafo exacto aparece inmediatamente después de la tabla.

### 2. Conservar sin cambios las columnas y los cinco registros

La spec exige conservar N°, Emisión, Vencimiento, Monto y Estado, así como los registros FAC-8812, FAC-8790, FAC-8741, FAC-8702 y FAC-8655 con sus datos. Decisión: mantener sin cambios el marcado de la tabla y la fuente de datos `invoices`; la nota es contenido aditivo fuera del panel. Se basa en `src/pages/InvoicesPage.tsx`, `src/data/sampleData.ts` y en la comprobación del contenido existente documentada en `src/pages/InvoicesPage.content.test.tsx`. Sigue la organización de la interfaz descrita en `README.md` y las convenciones de `AGENTS.md`; para este proyecto `package.json` declara React y TypeScript y OpenSpec configura `npm run lint`, `npm test -- --run` y `npm run build`. No hay ADR aplicable. Alternativa descartada: reutilizar o reestructurar filas o columnas para presentar la aclaración, porque introduciría cambios a la tabla fuera del alcance.

Escenario cubierto: cuando se muestra la nota, la tabla sigue teniendo las mismas cinco columnas y los mismos cinco registros con los datos especificados.

## Risks / Trade-offs

- La nota informa que los documentos se descargan en PDF, pero este cambio no implementa ni modifica esa descarga, conforme al alcance de la propuesta. Mitigación: limitarse al texto literal requerido y no representar la nota como una nueva acción o mecanismo de descarga; cualquier cambio futuro del formato real deberá mantener alineada esta información.
- No se introducen entradas, permisos, datos persistidos, servicios ni secretos nuevos; por tanto, no cambia la superficie de seguridad ni se requiere un control adicional de autorización o validación.

## Migration Plan

Sin migración de datos: el cambio solo añade texto estático a la interfaz y no modifica almacenamiento, esquema, eventos ni archivos persistidos. La reversión consiste en retirar el párrafo añadido; la tabla y sus datos permanecen intactos.
