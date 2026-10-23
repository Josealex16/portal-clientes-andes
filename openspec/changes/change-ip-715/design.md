## Context

El cambio precisa el requisito de la página de registro (`/registro`): mostrar el texto exacto «Tus datos se usan solo para gestionar tu cuenta.» inmediatamente debajo del subtítulo y mantener los controles actuales del formulario. La implementación ya presenta el párrafo en esa posición y contiene los controles especificados; la decisión es conservar ese comportamiento, sin modificar otras páginas ni el flujo de registro. El repositorio es una extranet de demostración en React, sin servidor ni base de datos (README.md; openspec/config.yaml). No se encontraron ADR aplicables en `docs/adr/`, `adr/` ni `docs/decisions/`.

## Goals / Non-Goals

- Cubrir explícitamente los escenarios «Consultar el uso de los datos al registrarse» y «Conservar los controles del formulario de registro» de la especificación del cambio.
- Conservar el párrafo, su texto y su posición, así como los campos «Nombre completo», «Correo electrónico», «Contraseña» y «Confirmar contraseña», la casilla de términos y el botón «Crear cuenta».
- No cambiar validaciones, manejo de cuentas, rutas, otras páginas, ni añadir capas, dependencias o estilos que la especificación no requiere.

## Decisions

### 1. Conservar la aclaración como párrafo inmediatamente posterior al subtítulo de Registro

Para el escenario «Consultar el uso de los datos al registrarse», se conserva el párrafo exacto como el siguiente elemento después del subtítulo en la página existente `/registro`. `src/pages/RegisterPage.tsx` ya implementa ese orden y `src/pages/RegisterPage.test.tsx` comprueba el texto exacto y que sea el elemento hermano siguiente; `src/App.tsx` asigna esa página a `/registro`. Se reutilizan la página y el estilo de autenticación existentes, sin componente ni capa nuevos (`src/styles/auth.css`). Esto sigue las convenciones de contenido en español y estilos en hojas CSS de `AGENTS.md`, y el stack y la estructura del proyecto descritos en `README.md` y `openspec/config.yaml`; `docs/auth-page-disclosures.md` documenta la misma aclaración. No hay un ADR aplicable. Se descarta mover el texto a una abstracción compartida o introducir estilos nuevos, porque no se necesitan para el requisito.

### 2. Mantener intactos los controles y el comportamiento del formulario existente

Para el escenario «Conservar los controles del formulario de registro», se mantienen los cuatro campos con sus etiquetas, la casilla «Acepto los términos y condiciones del servicio» y el botón «Crear cuenta», sin alterar la validación ni el envío existentes. `src/pages/RegisterPage.tsx` contiene esos controles y su manejo; `src/components/FormField.tsx` define el patrón de campos; `src/pages/RegisterPage.test.tsx` cubre el registro correcto y el rechazo de contraseñas distintas. La decisión sigue la convención de pruebas unitarias para cambios de comportamiento de `AGENTS.md` y el stack y comandos de verificación descritos en `openspec/config.yaml` (`npm run lint`, `npm test -- --run`, `npm run build`); también conserva el alcance documentado en `docs/auth-page-disclosures.md`. No hay un ADR aplicable. Se descarta reconstruir o envolver el formulario, pues agregaría cambios innecesarios y arriesgaría alterar los controles que la especificación pide conservar.

## Risks / Trade-offs

- Una persona podría interpretar la frase como una política de privacidad completa para un servicio real, aunque el portal está descrito como demostración sin servidor ni base de datos (README.md). Mitigación: conservar exclusivamente el texto exigido y no ampliar su significado ni cambiar el manejo de cuentas; no se incorporan nuevos datos, almacenamiento ni afirmaciones sobre otros usos.

## Migration Plan

Sin migración de datos: el cambio afecta la especificación de presentación y no modifica esquemas, datos persistidos ni formatos almacenados. No se requiere paso de despliegue de datos. Si se retira el cambio, se revierte el commit de especificación y diseño; no hay estado de aplicación o datos que restaurar, y el comportamiento runtime existente permanece intacto.
