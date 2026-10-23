## Context

La especificación `specs/support-office-address/spec.md` pide que quien consulta Soporte vea exactamente «Oficina: Av. Providencia 1234, Santiago» dentro de «Contacto directo». `src/pages/SupportPage.tsx` ya renderiza ese bloque y la ruta `soporte` ya apunta a `SupportPage` en `src/App.tsx`. La propuesta limita el cambio a esa página y a su prueba unitaria.

## Goals / Non-Goals

- **Goals:** mostrar la línea con el texto exacto dentro del bloque «Contacto directo» y cubrir su presencia en la prueba de la página.
- **Non-Goals:** cambiar rutas, estilos, datos de ejemplo, otros contactos o cualquier otro contenido de Soporte.

## Decisions

### 1. Añadir la dirección como una línea de texto en el bloque existente

El requisito es una dirección estática dentro de «Contacto directo»; la página ya presenta allí sus datos como párrafos. Decisión: agregar un párrafo con el texto exacto «Oficina: Av. Providencia 1234, Santiago» en el panel existente, conservando sus demás líneas y sin crear datos, componentes ni estilos nuevos. Sigue la estructura simple descrita en `README.md` y el contexto de `openspec/config.yaml`; se basa en el panel actual de `src/pages/SupportPage.tsx` y en la ruta ya existente de `src/App.tsx`. No hay `AGENTS.md` ni archivos ADR en el repositorio. Alternativa descartada: introducir un componente o una fuente de datos separada, innecesarios para una sola línea fija.

### 2. Extender la cobertura unitaria existente de SupportPage

La propuesta requiere una prueba unitaria que compruebe la línea en el bloque correcto. Decisión: añadir esa comprobación a `src/pages/SupportPage.test.tsx`, siguiendo el patrón existente que localiza «Contacto directo» y verifica que sus líneas pertenecen a ese panel. `package.json` y `README.md` documentan Vitest/Testing Library y el comando `npm test`; el `pod_stack.json` de esta ejecución ofrece capacidad unitaria. No hay `AGENTS.md` ni ADR aplicables que impongan otra convención. Alternativa descartada: crear una suite o configuración de pruebas aparte, porque ya existe una suite de la página con el patrón requerido.

## Risks / Trade-offs

- Riesgo: una futura actualización de la dirección podría dejar obsoleta la línea visible. Mitigación: mantener el texto mostrado alineado con la especificación de esta capacidad cuando se actualice la dirección. No se introducen entradas de usuario, datos personales, secretos ni nuevas comprobaciones de autorización: el cambio solo muestra el texto estático solicitado.

## Migration Plan

Sin migración de datos: el cambio solo añade texto a la interfaz y no modifica almacenamiento ni formatos persistidos. Para revertirlo, retirar el párrafo de `src/pages/SupportPage.tsx` y su comprobación de `src/pages/SupportPage.test.tsx`; no hace falta restaurar datos.
