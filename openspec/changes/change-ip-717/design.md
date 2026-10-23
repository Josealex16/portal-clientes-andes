## Context

El cambio modifica la capacidad `auth-page-disclosures` para que Registro comunique el uso de los datos y conserve intactos sus controles. La propuesta especifica que el párrafo ya está presente. En el código, `src/pages/RegisterPage.tsx` muestra el subtítulo y, justo después, «Tus datos se usan solo para gestionar tu cuenta.»; `src/pages/RegisterPage.test.tsx` ya cubre esa posición y los controles de registro.

## Goals / Non-Goals

- Cumplir los dos escenarios de la especificación: mostrar el texto exacto inmediatamente después del subtítulo y mantener todos los campos, la aceptación de términos y el botón actuales.
- No cambiar la validación, el envío, la persistencia ni la navegación del registro.
- No añadir componentes, estilos, dependencias, servicios ni almacenamiento.

## Decisions

### 1. Mantener la aclaración como párrafo inmediatamente posterior al subtítulo

Contexto: el escenario «Consultar el uso de los datos al registrarse» exige el texto literal y su posición inmediatamente después del subtítulo. Decisión: mantener en `src/pages/RegisterPage.tsx` el párrafo con el texto exacto como hermano siguiente de `p.auth__subtitle`; el código actual ya cumple la especificación, y `src/pages/RegisterPage.test.tsx` documenta esa relación. No se añade una abstracción ni una regla de estilo, dado que el requisito solo precisa contenido y orden. Convenciones: `AGENTS.md` (textos visibles en español y estilos en hojas CSS), `openspec/config.yaml` y `package.json` (verificación del repositorio: `npm run lint`, `npm test -- --run` y `npm run build`). No se encontró un ADR aplicable en las ubicaciones convencionales examinadas (`docs/adr/`, `adr/`, `docs/decisions/`).

### 2. Conservar sin cambios los controles y el flujo existentes del registro

Contexto: el escenario «Conservar los controles del formulario de registro» enumera cuatro campos, la casilla de términos y el botón de creación. Decisión: mantener esos controles y su comportamiento en el formulario existente de `src/pages/RegisterPage.tsx`; no modificar su validación, su registro ni su navegación. `src/pages/RegisterPage.test.tsx` muestra los controles y el flujo ya cubiertos. Esto sigue el alcance acotado de la propuesta y las convenciones de `AGENTS.md` y `openspec/config.yaml`; `README.md` confirma que el portal es una demostración sin servidor ni base de datos. Los comandos de verificación definidos por el repositorio constan en `openspec/config.yaml` y `package.json`. No se encontró un ADR aplicable en `docs/adr/`, `adr/` o `docs/decisions/`.

## Risks / Trade-offs

- La frase sobre el uso de los datos puede entenderse como una garantía de privacidad para datos reales, aunque el portal se describe como demostración y guarda usuarios y sesión en `localStorage` (`README.md`). Mitigación: limitar este cambio al texto exacto requerido y no presentarlo como cambio de tratamiento o almacenamiento; antes de usar el portal con datos reales, confirmar que la frase coincide con las prácticas de privacidad aplicables. No se altera la autenticación ficticia ni se incorporan nuevos datos o permisos.

## Migration Plan

Sin migración de datos: el alcance es contenido estático de la página, sin cambios de esquema ni de persistencia; `README.md` documenta que no existe una base de datos. Si se revierte la implementación, se restaura la versión anterior de la página y su cobertura, sin restaurar ni transformar datos.
