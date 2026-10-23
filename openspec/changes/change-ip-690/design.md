## Context

IP-690 añade dos mejoras visuales aisladas a un portal de demostración sin servidor ni base de datos: el resumen de facturas vencidas en Inicio y un panel de horario en Soporte. La propuesta limita el alcance a esas páginas y a la cobertura unitaria correspondiente; las specs fijan tanto el estado exacto que cuenta como el texto y orden requeridos (`proposal.md`, `specs/home-overdue-invoices/spec.md`, `specs/support-hours/spec.md`).

El repositorio usa Vite, React 18, TypeScript y React Router 6; organiza las páginas en `src/pages`, los datos de demostración en `src/data` y estilos compartidos en `src/styles`. `openspec/config.yaml` define la verificación habitual (`npm run lint`, `npm test -- --run`, `npm run build`). No hay `AGENTS.md` ni archivos ADR en el repositorio.

## Goals / Non-Goals

- Mostrar en Inicio una tarjeta «Facturas vencidas» con el recuento exacto de facturas de ejemplo cuyo estado es «Vencida» y un enlace «Ver facturas» a `/facturas`.
- Mostrar en Soporte, antes del panel «Contacto directo», un panel con el título y el texto exactos especificados.
- Mantener intactos el resto de Inicio, las preguntas frecuentes y el contacto directo; no introducir estilos globales ni cambiar otras pantallas.
- No añadir persistencia, servicios, dependencias, rutas ni cambios de autenticación.

## Decisions

### 1. Derivar la tarjeta de vencidas de los datos de ejemplo existentes

La tarjeta pertenece a las tarjetas de resumen existentes en Inicio y debe contar únicamente el estado literal «Vencida», no todas las facturas pendientes ni las facturas vencidas por fecha. Se calculará en `HomePage` con un filtro sobre `invoices` y `status === 'Vencida'`; su valor será la longitud de ese resultado (1 con los datos actuales) y su enlace usará el componente `Link` existente hacia `/facturas`. Se reutilizan la estructura `.cards`/`.card` y el estilo ya aplicado allí, sin añadir CSS. La ruta está declarada en `App.tsx` y el catálogo con estados tipados está en `src/data/sampleData.ts`. Esto sigue la estructura y los comandos documentados en `README.md` y `openspec/config.yaml`; los ejemplos de página y enrutamiento de pruebas están en `src/pages/InvoicesPage.test.tsx`, `src/pages/LoginPage.test.tsx` y `src/test/renderApp.tsx`. No hay ADR aplicable ni se crea una capa o fuente de datos nueva.

Escenario «Contar solo las facturas vencidas»: al mostrar Inicio con una factura «Vencida», dos «Pendiente» y dos «Pagada», la tarjeta «Facturas vencidas» muestra `1` e incluye «Ver facturas» enlazado a `/facturas` (`specs/home-overdue-invoices/spec.md`).

### 2. Añadir el horario como panel estático antes de Contacto directo

Soporte ya compone sus secciones mediante elementos `.panel` con encabezados `.panel__title`. Se añadirá entre el panel de preguntas frecuentes y el panel de contacto directo un panel cuyo título sea exactamente «Horario de atención» y cuyo texto sea exactamente «Lunes a viernes, de 8:30 a 18:00 (hora de Santiago).». Se conserva la FAQ existente, aunque incluya una respuesta relacionada, y no se modifica el contacto directo. Se sigue el patrón presente en `src/pages/SupportPage.tsx`, los estilos de panel de `src/styles/global.css` y los datos FAQ de `src/data/sampleData.ts`; `src/pages/LoginPage.test.tsx` y `src/test/renderApp.tsx` documentan los patrones existentes de pruebas unitarias de páginas. La decisión respeta `README.md` y `openspec/config.yaml`; no hay ADR aplicable.

Escenario «Consultar horario antes del contacto directo»: quien abre Soporte ve ese panel con el texto exacto y el panel aparece antes de «Contacto directo» (`specs/support-hours/spec.md`).

## Risks / Trade-offs

- El recuento refleja los datos de demostración, no saldos o facturas personales: si cambian los datos, cambia el valor mostrado. Mitigación: derivarlo del catálogo `invoices` usando solo la igualdad exacta de estado que define la spec, sin mantener un total duplicado. `README.md` confirma que el portal es demostrativo y no tiene servidor ni base de datos.
- El horario se representa como texto estático y puede quedar desactualizado si cambia la atención. Mitigación: mantener el contenido como el literal requerido por la spec y actualizarlo en esa página cuando el requisito del horario cambie.
- No se introducen nuevas entradas externas, permisos, datos persistidos ni secretos; por tanto, no cambian las fronteras de seguridad existentes descritas por `README.md` y `src/components/AppLayout.tsx`.

## Migration Plan

Sin migración de datos: ambos cambios solo presentan datos existentes o texto fijo, y no alteran tablas, formatos persistidos, eventos ni archivos. Despliegue como actualización normal de la aplicación. Reversión: retirar la tarjeta de `HomePage` y el panel de `SupportPage`; los datos de ejemplo, las rutas y el resto del estado permanecen sin cambios.
