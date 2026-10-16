## Context

El cambio agrega `/pagos` y la exportación CSV especificada en `openspec/changes/change-ip-669/specs/payments-export/spec.md`. La aplicación ya agrupa las páginas protegidas bajo `AppLayout`, que redirige a `/login` cuando `useAuth` no devuelve una sesión (`src/App.tsx`, `src/components/AppLayout.tsx`, `src/context/AuthContext.tsx`), y construye la navegación autenticada desde `Sidebar` (`src/components/Sidebar.tsx`). El repositorio es una demostración cliente sin servidor ni base de datos; `src/data/sampleData.ts` contiene pedidos y facturas, pero no pagos ni un origen de pagos. Para cumplir el requisito en este alcance de demostración, los pagos se modelan en ese módulo con vínculo a la cuenta de la sesión, sin derivarlos de facturas.

No se encontró `AGENTS.md` ni ningún ADR en las ubicaciones exploradas. Se siguen la estructura y tecnología descritas en `README.md`, la configuración del proyecto en `openspec/config.yaml` y los scripts existentes en `package.json`; el patrón de rutas, sesión y navegación está en `src/App.tsx`, `src/components/AppLayout.tsx` y `src/components/Sidebar.tsx`. Las pruebas de interfaz existentes emplean Vitest y Testing Library con `renderApp` (`src/components/AppLayout.test.tsx`, `src/test/renderApp.tsx`, `vite.config.ts`); la pila disponible incluye unit, build y lint, no e2e de navegador (`.aipods/input/pod_stack.json`).

## Goals / Non-Goals

- Ofrecer la página `/pagos` dentro del área autenticada y enlazarla desde la navegación.
- Descargar el CSV UTF-8 del mes calendario anterior con las columnas y formatos de la especificación, incluyendo pagos de cualquier estado y una fila por pago de la cuenta.
- Descargar solo el encabezado cuando la cuenta no tiene pagos en ese período.
- No crear una API, persistencia, filtros de período, exportación de facturas ni una nueva dependencia; no modificar el mecanismo de autenticación existente.

## Decisions

### 1. Integrar Pagos en las rutas y navegación autenticadas existentes

La especificación exige `/pagos`, acceso desde la navegación autenticada y bloqueo de página y descarga sin sesión. Se añade la ruta y su enlace dentro del `AppLayout` y del `Sidebar` actuales; así la ruta sin sesión usa la redirección existente a `/login` antes de renderizar la página o su acción. Alternativa descartada: crear una ruta o control de autenticación separado, que duplicaría el mecanismo del portal. Evidencia del código y patrón de navegación: `src/App.tsx`, `src/components/AppLayout.tsx`, `src/components/Sidebar.tsx`, `src/components/AppLayout.test.tsx` y `src/test/renderApp.tsx`. Convenciones: `README.md`, `openspec/config.yaml`, `package.json` (React 18, React Router 6 y scripts `npm run lint`, `npm test -- --run` y `npm run build`); no existe `AGENTS.md` ni ADR aplicable.

### 2. Mantener los pagos de demostración asociados a la cuenta autenticada

El export debe contener exclusivamente pagos de la cuenta y el repositorio no dispone de API ni de registros de pagos. Se añade al módulo de datos existente la forma mínima de pago —identificador de cuenta, fecha calendario, monto CLP entero y etiqueta de estado— y la página selecciona por el `id` del usuario autenticado antes de exportar; los datos ficticios no se infieren del estado de facturas. Esto encaja en la estructura simple de datos y páginas que ya usan `src/data/sampleData.ts`, `src/pages/InvoicesPage.tsx` y `src/pages/OrdersPage.tsx`, y usa el `User.id` ya expuesto por `src/services/authService.ts` y `src/context/AuthContext.tsx`, sin introducir capas de dominio o repositorios. Alternativa descartada: añadir un servicio/API o reutilizar facturas como pagos, pues el primero excede el repositorio y el segundo confunde registros distintos. Evidencia y patrón autenticado: `src/data/sampleData.ts`, `src/services/authService.ts`, `src/context/AuthContext.tsx`, `src/components/AppLayout.test.tsx`; convenciones: `README.md`, `openspec/config.yaml`, `package.json`; no existe `AGENTS.md` ni ADR aplicable.

### 3. Generar el CSV mensual desde la página con fechas calendario inclusivas

El escenario «Exportar todos los pagos del mes anterior» requiere incluir todos los estados; «Incluir los extremos del mes anterior y excluir fechas adyacentes» requiere el intervalo desde el primer hasta el último día calendario, ambos inclusive; «Mes anterior sin pagos» requiere descargar solo `fecha,monto,estado`. La acción proyecta cada pago seleccionado a fecha `AAAA-MM-DD`, monto entero sin formato y estado español, en UTF-8 y separado por comas, con el encabezado exacto. El período se calcula respecto de la fecha calendario de la descarga y se compara con las fechas calendario almacenadas, sin convertirlas a fechas de emisión ni a instantes. La página sigue el patrón visual de las páginas existentes (`src/pages/InvoicesPage.tsx`, `src/pages/OrdersPage.tsx`) y puede formatear la representación CSV desde el módulo de datos existente (`src/data/sampleData.ts`); la descarga se inicia en el cliente sin dependencia nueva. Alternativa descartada: limitar a pagos «Pagado» o exportar facturas, expresamente incompatibles con la especificación. Evidencia del patrón y capacidades presentes: `src/pages/InvoicesPage.tsx`, `src/data/sampleData.ts`, `src/components/AppLayout.test.tsx`, `src/test/renderApp.tsx`, `vite.config.ts`; convenciones: `README.md`, `openspec/config.yaml`, `package.json`; no existe `AGENTS.md` ni ADR aplicable.

## Risks / Trade-offs

- El repositorio no tiene una fuente real de pagos ni backend, por lo que los registros de demostración no representan un historial financiero real. Mitigación: mantenerlos como datos ficticios separados de las facturas y ligados al `User.id`; no presentar la exportación cliente como acceso a datos reales. La incorporación de una fuente real queda fuera de las capacidades actuales del repositorio.
- La autenticación y el filtrado de datos son de demostración en el navegador: el estado se guarda en `localStorage` y no constituye autorización frente a quien controla el cliente (`README.md`, `src/services/authService.ts`). Mitigación: proteger la página con el `AppLayout` existente y filtrar los registros por usuario en la selección; no almacenar ni agregar datos financieros reales a este cliente sin una futura autorización en servidor.
- Un desplazamiento de zona horaria al interpretar fechas puede incluir o excluir un día limítrofe. Mitigación: conservar y comparar fechas de pago como fechas calendario ISO `AAAA-MM-DD`, calcular los límites del mes calendario anterior y aplicar ambos límites inclusive, sin convertir la fecha del registro a un instante UTC.

## Migration Plan

Sin migración de datos persistidos: la aplicación no tiene servidor ni base de datos y los registros de pago propuestos son datos ficticios estáticos en el módulo de datos del cliente; no cambia el formato existente de usuarios o sesiones en `localStorage` (`README.md`, `src/services/authService.ts`). Desplegar los cambios de página, navegación y datos juntos. Para revertir, retirar la ruta, el enlace, la página y los datos de pago añadidos; no se requiere restauración ni transformación de datos persistidos.
