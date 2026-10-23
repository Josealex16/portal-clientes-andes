## Context

La página Soporte ya presenta «Contacto directo» en `src/pages/SupportPage.tsx`, con el correo general, teléfono y horario. El cambio añade ahí el canal solicitado para consultas de facturación, sin alterar las demás líneas ni el contenido de ejemplo. La capacidad existente de horario confirma el patrón de contenido visible en ese bloque (`openspec/specs/support-contact-hours/spec.md`, `docs/support-contact-hours.md`). La propuesta limita el alcance a la página y su prueba (`openspec/changes/change-ip-696/proposal.md`).

El repositorio organiza la interfaz en páginas y usa Vite, React y TypeScript (`README.md`, `openspec/config.yaml`). No se encontró `AGENTS.md` ni un ADR aplicable en las ubicaciones de convenciones revisadas.

## Goals / Non-Goals

- Mostrar en «Contacto directo» la línea exacta «Correo de facturación: facturacion@andes.example».
- Añadir la cobertura unitaria de `SupportPage` solicitada.
- No cambiar rutas, estilos, datos de ejemplo ni los contactos existentes; no crear persistencia ni servicios.

## Decisions

### 1. Añadir el correo de facturación al bloque existente «Contacto directo»

El escenario «Consultar el correo de facturación en Contacto directo» queda cubierto al renderizar la línea solicitada dentro del panel existente, conservando sin cambios el correo general, el teléfono y el horario. Se sigue la organización actual por páginas y el patrón existente de contacto en `src/pages/SupportPage.tsx`; es coherente con `README.md` y `openspec/config.yaml`. La ubicación requerida está respaldada por `openspec/changes/change-ip-696/proposal.md` y la estructura y contenido esperados por `openspec/changes/change-ip-696/specs/support-billing-email/spec.md`, en continuidad con `openspec/specs/support-contact-hours/spec.md` y `docs/support-contact-hours.md`. Alternativa descartada: extraer el contacto a un componente o configuración nuevos, pues no se necesitan para este único texto ni los requieren las specs.

### 2. Extender la prueba unitaria existente de SupportPage

La prueba cubrirá el escenario nombrado comprobando que la línea exacta aparece dentro del bloque «Contacto directo». Se reutiliza el patrón ya establecido en `src/pages/SupportPage.test.tsx` y las herramientas y comando de pruebas declarados en `package.json` (Vitest y Testing Library; `npm test`), de acuerdo con la verificación indicada por `openspec/config.yaml`. Alternativa descartada: crear una suite o configuración aparte, ya que la página ya cuenta con una prueba unitaria local.

## Risks / Trade-offs

- La nueva línea podría omitirse, escribirse de forma distinta o quedar fuera del bloque de contacto, impidiendo que el usuario encuentre el canal correcto. Mitigación: conservar el texto literal de la spec y comprobar en la prueba de `SupportPage` que aparece dentro de «Contacto directo», siguiendo el patrón de `src/pages/SupportPage.test.tsx`.

La dirección se muestra como contenido de contacto previsto para el usuario; este cambio no incorpora autenticación, datos personales, almacenamiento, registros ni secretos. Por ello no añade una nueva frontera de seguridad que requiera controles distintos.

## Migration Plan

Sin migración de datos: el correo se representa como texto estático de la página (`src/pages/SupportPage.tsx`); la aplicación no usa base de datos para este contenido (`README.md`). Reversión: retirar la línea y su comprobación unitaria, restaurando los dos archivos modificados; no hay datos persistidos que revertir.
