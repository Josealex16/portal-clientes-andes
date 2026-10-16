## Context

`payments-export` agrega la página autenticada `/pagos` y la descarga de los pagos del mes calendario anterior de la cuenta en sesión, con columnas `fecha,monto,estado` en CSV UTF-8. La especificación fija formato, alcance por cuenta y período, y el comportamiento cuando no hay filas; la propuesta aclara que el portal es una demostración sin API de pagos y que la fuente son los datos de ejemplo existentes (`openspec/changes/change-ip-678/proposal.md`, `openspec/changes/change-ip-678/specs/payments-export/spec.md`).

El repositorio es una aplicación Vite/React/TypeScript con React Router, separación sencilla entre páginas, componentes, contexto de autenticación y datos de ejemplo; no tiene servidor ni base de datos. La sesión ficticia se guarda en `localStorage` (`README.md`, `openspec/config.yaml`, `src/App.tsx`, `src/context/AuthContext.tsx`, `src/services/authService.ts`). No se encontraron `AGENTS.md` ni ADR del repositorio en `docs/adr/`, `adr/` o `docs/decisions/`.

## Goals / Non-Goals

**Goals**
- Hacer que una persona con sesión llegue a Pagos desde la navegación autenticada y pueda descargar el CSV especificado.
- Restringir el contenido al mes anterior y a los pagos asociados al identificador de la cuenta en sesión, sin excluir estados.
- Mantener la solución dentro de las páginas, componentes y datos de demostración existentes.

**Non-Goals**
- Crear una API de pagos, persistencia, filtros de períodos o exportación de pagos de otras cuentas.
- Cambiar el mecanismo ficticio de autenticación del portal o convertirlo en una barrera de seguridad de producción.

## Decisions

### 1. Incorporar `/pagos` dentro del layout autenticado y la navegación existente

La página debe ser accesible desde la navegación autenticada y la ruta directa debe respetar el control de sesión ya aplicado al resto del portal. Decisión: registrar Pagos como ruta hija del `AppLayout` y agregar su enlace al `Sidebar`, usando los componentes y patrones actuales; sin sesión, el layout redirige a `/login` y la página ni su acción de descarga se renderizan. Así se cubren explícitamente los escenarios **«Abrir Pagos con sesión»** (mostrar `/pagos` con «Exportar») y **«Abrir Pagos sin sesión»** (redirigir a `/login` sin permitir la página ni el CSV). Se conserva el mecanismo de navegación y autenticación del proyecto; no se añade una capa de autorización nueva. Convenciones y evidencia: `README.md`, `openspec/config.yaml`, `src/App.tsx`, `src/components/AppLayout.tsx`, `src/components/Sidebar.tsx`, `src/context/AuthContext.tsx`, `src/services/authService.ts`, `src/components/AppLayout.test.tsx` y `package.json`; no hay ADR aplicable ni `AGENTS.md` en el repositorio.

### 2. Generar y descargar el CSV en el cliente a partir de los pagos de ejemplo de la cuenta

La propuesta indica que no hay API y que los pagos disponibles están en `src/data/sampleData.ts`; por ello no se introduce un servicio remoto ni una dependencia. Decisión: la página obtiene el identificador de la cuenta desde `useAuth`, entrega ese identificador y los pagos al generador ya presente (ajustándolo solo si hace falta para cumplir la especificación), y descarga su resultado como CSV UTF-8. El período se determina a partir de la fecha de la descarga y contiene desde el primer hasta el último día calendario del mes anterior, inclusive, también al cambiar de año. Se mantienen el encabezado exacto `fecha,monto,estado`, fechas ISO `AAAA-MM-DD`, montos enteros CLP sin símbolo ni separadores y etiquetas de estado en español; cada pago coincidente aporta una fila independientemente del estado. Sin coincidencias se descarga únicamente el encabezado. Esto cubre explícitamente **«Exportar pagos del mes anterior de la cuenta»** (incluidos Pagado y Pendiente), **«Incluir los días extremos y excluir fechas fuera del mes»**, **«Excluir pagos de otra cuenta»**, **«Mes anterior sin pagos»** y **«Mes anterior al cambiar de año»**. La selección por `accountId` del usuario evita incorporar filas de cuentas ajenas en este conjunto de datos; la autenticación sigue siendo la simulación local existente. Convenciones y evidencia: `README.md`, `openspec/config.yaml`, `openspec/changes/change-ip-678/proposal.md`, `openspec/changes/change-ip-678/specs/payments-export/spec.md`, `src/data/sampleData.ts`, `src/data/sampleData.test.ts`, `src/context/AuthContext.tsx`, `src/services/authService.ts` y `package.json`; no hay ADR aplicable ni `AGENTS.md` en el repositorio.

## Risks / Trade-offs

- La sesión en `localStorage` y el filtrado en el cliente no son controles de autorización aptos para datos reales; una persona que manipule el cliente podría inspeccionar los datos de demostración disponibles. Mitigación: mantener la función limitada a los datos ficticios del repositorio y no cargar pagos sensibles en esta implementación; antes de usar datos reales, la autenticación, autorización por cuenta y selección de filas deben hacerse y verificarse en un servidor. Evidencia del límite actual: `README.md` y `src/services/authService.ts`.
- La selección del mes usa la fecha calendario del navegador, pues el portal no tiene un servidor que proporcione una zona horaria de referencia. Mitigación: usar de forma consistente la fecha de ejecución del navegador para determinar el mes anterior, como requiere la especificación; si se incorpora un backend o una zona horaria de negocio, acordar ese criterio antes de cambiar la fuente de fecha. Evidencia: `src/data/sampleData.ts` y `openspec/changes/change-ip-678/specs/payments-export/spec.md`.

## Migration Plan

Sin migración de datos: el cambio usa pagos declarados en `src/data/sampleData.ts`, no altera un esquema ni escribe nuevas formas de datos persistentes; el único almacenamiento del proyecto descrito en `README.md` corresponde a usuarios y sesión ficticios, que no cambian. La reversión consiste en retirar la ruta, el enlace, la página y cualquier ajuste al generador incorporado por el cambio; no requiere restaurar datos ni ejecutar una migración inversa.
