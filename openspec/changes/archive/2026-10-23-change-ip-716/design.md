## Context

El cambio precisa `auth-page-disclosures`: en `/login` debe mostrarse el párrafo exacto «Si olvidaste tu contraseña, escribe a soporte@andes.example.» inmediatamente debajo del subtítulo y conservarse los campos «Correo electrónico» y «Contraseña» y el botón «Ingresar». `src/pages/LoginPage.tsx` ya presenta el párrafo en esa posición y mantiene esos controles; `src/pages/LoginPage.test.tsx` ya cubre ambos escenarios. Por tanto, se conserva la implementación existente sin alterar el formulario, la autenticación ni el flujo de ayuda. El proyecto usa React 18, TypeScript y React Router 6, según `openspec/config.yaml`, y sus dependencias y comandos están en `package.json`. No se encontraron ADR aplicables en las ubicaciones de ADR del repositorio.

## Goals / Non-Goals

- Hacer explícitos en el requisito y en el diseño los escenarios «Consultar la ayuda para recuperar la contraseña» y «Conservar los controles del formulario de ingreso».
- Mantener literalmente la aclaración después del subtítulo y preservar los controles especificados.
- No cambiar validación, autenticación, rutas ni estilos, ni añadir un enlace o flujo de recuperación; el alcance es la aclaración y la conservación del formulario.

## Decisions

### 1. Conservar la ayuda exacta inmediatamente después del subtítulo de ingreso

Para el escenario «Consultar la ayuda para recuperar la contraseña», la página `/login` mantiene «Si olvidaste tu contraseña, escribe a soporte@andes.example.» como párrafo inmediatamente después de «Ingresa con tu cuenta para revisar tus pedidos y facturas.». `src/pages/LoginPage.tsx` ya establece ese orden y `src/pages/LoginPage.test.tsx` cubre el texto exacto y su posición. Se conserva el componente existente, en lugar de añadir abstracciones o estilos no requeridos. Esto sigue las convenciones de español y de estilos en hojas CSS de `AGENTS.md`; la estructura React/TypeScript y React Router y los comandos de verificación del proyecto constan en `openspec/config.yaml` y `package.json`. `docs/auth-page-disclosures.md` documenta la misma aclaración y que no añade un flujo de recuperación. No hay un ADR aplicable. Se descarta convertir el contacto en un enlace o crear un proceso para restablecer contraseñas porque la especificación solo pide el párrafo.

### 2. Mantener intactos los controles del formulario de ingreso

Para el escenario «Conservar los controles del formulario de ingreso», se mantienen los campos «Correo electrónico» y «Contraseña» y el botón «Ingresar», sin modificar la validación ni el envío. `src/pages/LoginPage.tsx` contiene esos controles y `src/pages/LoginPage.test.tsx` comprueba su presencia junto con el escenario de la ayuda. La decisión sigue la convención de pruebas unitarias para cambios de comportamiento de `AGENTS.md` y el stack y los comandos del proyecto descritos en `openspec/config.yaml` y `package.json`; `docs/auth-page-disclosures.md` también aclara que los formularios no cambian. No hay un ADR aplicable. Se descarta reconstruir o envolver el formulario porque no es necesario y podría alterar los controles fuera de alcance.

## Risks / Trade-offs

- Una persona podría interpretar el texto como una garantía de un proceso de recuperación de contraseña, más allá de contactar a soporte. Mitigación: conservar solo la instrucción y el contacto exactos exigidos, sin añadir un enlace, solicitar credenciales ni introducir otro flujo (`src/pages/LoginPage.tsx`, `docs/auth-page-disclosures.md`).

## Migration Plan

Sin migración de datos: el cambio solo precisa una especificación de presentación; no altera esquemas, datos persistidos ni formatos almacenados. No requiere pasos de despliegue de datos. Para revertirlo, se revierte este cambio de especificación y diseño; no hay datos ni estado de aplicación que restaurar, y la implementación existente permanece sin modificación.
