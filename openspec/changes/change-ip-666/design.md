## Context

El formulario de registro mantiene los valores y validaciones en `RegisterPage`; el error de confirmación lee `passwordConfirm` en vez del campo controlado `confirmPassword`, por lo que el caso exitoso falla antes de completar el flujo. `register` persiste la nueva cuenta mediante el servicio ficticio de `localStorage`. La propuesta exige respetar ese servicio, mostrar éxito en `/login` y probar el éxito y el rechazo de contraseñas distintas. No hay `AGENTS.md` ni ADR en el repositorio. Se sigue la estructura de páginas, servicios y utilidades existente descrita en `README.md`; la verificación documentada en `openspec/config.yaml` es `npm run lint`, `npm test -- --run` y `npm run build`.

## Goals / Non-Goals

- Corregir la comparación y el momento de validación de la confirmación; no llamar al servicio cuando no coincida.
- Registrar los datos válidos aceptados y navegar a `/login` con aviso de éxito, sin errores JavaScript causados por el flujo.
- Añadir pruebas automatizadas para éxito y discrepancia de contraseña.
- No modificar el servicio de ingreso, añadir backend, cambiar el almacenamiento de demostración ni ampliar reglas de validación más allá de las especificadas.

## Decisions

### 1. Validar la confirmación antes de invocar el registro

La condición actual depende de un nombre de propiedad que no existe en el estado del formulario. Se corregirá la validación para comparar `password` con `confirmPassword` y reportar exactamente «Las contraseñas no coinciden.» en el error de ese campo antes de llamar a `register`. Así se reutiliza el estado, el `FormField` y el patrón de validación del formulario actual, sin introducir una abstracción adicional. Alternativa descartada: delegar esta regla al servicio de autenticación, porque la confirmación es entrada de interfaz y el servicio solo recibe los datos de cuenta. Evidencia: `src/pages/RegisterPage.tsx`, `src/components/FormField.tsx`, `src/services/authService.ts`; convenciones: `README.md`, `openspec/config.yaml`; no hay `AGENTS.md` ni ADR.

### 2. Mantener el flujo de éxito local y comunicarlo en `/login`

Tras pasar la validación se invoca el `register` existente y se navega a `/login` presentando un aviso de registro exitoso, conforme a la propuesta y al requisito. El mensaje se transportará con el mecanismo de navegación de React Router y se mostrará en la página de ingreso sin cambiar autenticación, crear sesión ni alterar el servicio; conservará el comportamiento de acceso explícito que existe actualmente. Alternativa descartada: iniciar sesión automáticamente o añadir persistencia global para el aviso, ya que ambas amplían el comportamiento requerido. Evidencia: `src/pages/RegisterPage.tsx`, `src/pages/LoginPage.tsx`, `src/App.tsx`, `src/services/authService.ts`; convenciones: `README.md`, `openspec/config.yaml`; no hay `AGENTS.md` ni ADR.

### 3. Cubrir el comportamiento con la suite de componentes existente

Agregar pruebas de página bajo `src/pages/` con Vitest, Testing Library y `renderApp`, siguiendo las pruebas existentes: éxito comprueba registro en almacenamiento limpio, `/login` y aviso; discrepancia comprueba el texto junto a la confirmación y que ningún usuario se haya agregado. Se verificará además que el flujo exitoso no produzca errores JavaScript. Alternativa descartada: probar únicamente funciones aisladas, pues no comprueba navegación ni presentación de errores en el formulario real. Evidencia: `src/pages/LoginPage.test.tsx`, `src/test/renderApp.tsx`, `src/test/setup.ts`, `src/services/authService.ts`; convenciones: `package.json`, `README.md`, `openspec/config.yaml`; no hay `AGENTS.md` ni ADR.

## Risks / Trade-offs

- El servicio de demostración guarda contraseñas sin cifrar en `localStorage` y no es apto para credenciales reales; no se amplía su uso a ningún backend ni se deben introducir credenciales reales. Esta limitación preexistente está expresamente documentada en `README.md` y `src/services/authService.ts`; mitigación: mantener el alcance de demostración y validar que las pruebas usen almacenamiento local aislado/limpio.
- La prueba de registro puede contaminarse con estado de `localStorage` entre casos y generar falsos resultados; mitigación: limpiar las claves de autenticación antes de cada escenario y verificar directamente el usuario persistido con la interfaz de servicio existente.

## Migration Plan

Sin migración de datos: el cambio solo corrige el flujo de una página y añade estado de navegación temporal; conserva las claves y estructura existentes en `localStorage` y no transforma registros guardados. Reversión: revertir el cambio de página de registro, el aviso en ingreso y sus pruebas; los usuarios creados previamente permanecen intactos y siguen siendo legibles por el servicio actual. Verificar con `npm run lint`, `npm test -- --run` y `npm run build`.
