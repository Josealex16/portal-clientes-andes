## Context

El cambio requiere `/pagos` en el área autenticada y una descarga CSV de los pagos de la cuenta durante el mes calendario anterior, con el encabezado, columnas y formatos definidos en `openspec/changes/change-ip-679/specs/payments-export/spec.md`. El repositorio ya incluye datos de demostración vinculados por `accountId` y `generatePaymentsCsv`, que filtra por cuenta y por los límites inclusivos del mes (`src/data/sampleData.ts`); la identidad de sesión expone `User.id` (`src/context/AuthContext.tsx`, `src/services/authService.ts`). Las rutas internas se renderizan bajo `AppLayout`, que redirige a `/login` sin sesión (`src/App.tsx`, `src/components/AppLayout.tsx`), y el menú autenticado se define en `src/components/Sidebar.tsx`.

El portal es una demostración cliente sin servidor ni base de datos, y la sesión se guarda en `localStorage` (`README.md`, `src/services/authService.ts`). No se encontró `AGENTS.md` ni ADR en las ubicaciones del repositorio; se siguen su estructura y comandos descritos en `README.md`, `openspec/config.yaml` y `package.json`.

## Goals / Non-Goals

- Incorporar la página `/pagos` y su enlace en la navegación autenticada, con la acción de descarga.
- Descargar los pagos de la cuenta autenticada del mes calendario anterior como CSV UTF-8 separado por comas, conservando encabezados, formatos, estados y el caso sin filas según la especificación.
- No añadir un backend, almacenamiento persistente, selección de períodos, nuevos formatos ni dependencias.

## Decisions

### 1. Añadir Pagos a las rutas y navegación protegidas existentes

Para el escenario «Acceso autenticado a Pagos», registrar `/pagos` como ruta hija de `AppLayout` y añadir «Pagos» al menú de `Sidebar`; la página mostrará la acción de descarga. Para «Acceso a Pagos sin sesión», conservar la protección de `AppLayout`: sin usuario, redirige a `/login` antes de mostrar la página o su acción. Esto reutiliza el límite de autenticación y el patrón de navegación existentes, en vez de duplicar la protección en una ruta independiente. Evidencia: `src/App.tsx`, `src/components/AppLayout.tsx`, `src/components/Sidebar.tsx`, `src/context/AuthContext.tsx`, `src/components/AppLayout.test.tsx` y `src/test/renderApp.tsx`. Convenciones: `README.md`, `openspec/config.yaml` y `package.json` (React, React Router y comandos `npm run lint`, `npm test -- --run` y `npm run build`); no se encontró `AGENTS.md` ni ADR aplicable.

### 2. Generar la descarga con los pagos de la cuenta y el helper CSV existente

Para «Exportar todos los pagos del mes anterior», la página toma `user.id` de `useAuth` y lo usa como cuenta al invocar `generatePaymentsCsv`; así se excluyen pagos de otras cuentas y se incluyen las filas de todos los estados. Para «Incluir los extremos del mes anterior y excluir fechas adyacentes», se conserva el filtrado por fechas calendario ISO entre el primer y último día inclusivos que ya realiza el helper. Para «Mes anterior sin pagos», el resultado del helper mantiene únicamente `fecha,monto,estado`. La descarga desde la página usa el CSV producido por este helper, que también conserva fecha `AAAA-MM-DD`, monto CLP entero sin formato y etiqueta española, según el contrato. Se evita crear otra capa de datos o derivar pagos de facturas. Evidencia: `src/data/sampleData.ts`, `src/data/sampleData.test.ts`, `src/services/authService.ts`, `src/context/AuthContext.tsx`, `src/pages/InvoicesPage.tsx` y `src/pages/OrdersPage.tsx`. Convenciones: `README.md`, `openspec/config.yaml` y `package.json`; no se encontró `AGENTS.md` ni ADR aplicable.

## Risks / Trade-offs

- Los pagos y la identidad de sesión residen en el cliente de demostración; una persona que controle el navegador puede alterar los datos o la sesión y el filtro local no constituye autorización de servidor. Mitigación: limitar la exportación al `user.id` de la sesión y mantener estos registros como datos ficticios; no presentar el cliente como control de acceso para pagos reales (`README.md`, `src/services/authService.ts`, `src/context/AuthContext.tsx`, `src/data/sampleData.ts`).
- Interpretar una fecha de pago como instante y convertirla de zona horaria podría desplazar un límite diario e incluir o excluir registros incorrectamente. Mitigación: conservar las fechas como cadenas de fecha calendario ISO y usar los límites inclusivos del helper existente (`src/data/sampleData.ts`, `src/data/sampleData.test.ts`).

## Migration Plan

Sin migración de datos: el cambio consume datos estáticos de demostración y no introduce ni modifica almacenamiento persistente, tablas, sesiones o formatos guardados (`README.md`, `src/data/sampleData.ts`, `src/services/authService.ts`). Desplegar la ruta, el enlace y la página de descarga juntos. Para revertir, retirar la ruta `/pagos`, el enlace de navegación y la página/acción añadida; no se requiere restauración ni transformación de datos persistidos.
