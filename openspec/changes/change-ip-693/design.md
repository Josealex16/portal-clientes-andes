## Context

La propuesta limita IP-693 al encabezado de `ProfilePage` y a su prueba unitaria; la capacidad añadida requiere mostrar el identificador del usuario autenticado entre paréntesis. Actualmente la página ya consume `user` del contexto de autenticación y presenta su `id` en los detalles. El repositorio no contiene `AGENTS.md` ni ADR; las convenciones consultadas están en `openspec/config.yaml` y `README.md`.

## Goals / Non-Goals

- Cumplir el escenario de título de perfil con el identificador `u-1001`.
- No cambiar otras pantallas, el contenido restante de Perfil ni los estilos.
- No modificar autenticación, almacenamiento ni el modelo de usuario.

## Decisions

### 1. Construir el título de perfil desde el identificador del contexto de autenticación

La página autenticada mostrará en el mismo encabezado «Mi perfil» seguido del `id` del usuario entre paréntesis. Para el escenario **«Título de perfil con el identificador del usuario de ejemplo»**, cuando el usuario autenticado tenga `u-1001`, el encabezado será exactamente «Mi perfil (u-1001)». Se reutiliza `useAuth` y no se introduce otra fuente de identidad: `ProfilePage` ya consume ese contexto y muestra `user?.id`; `AuthContext` expone `User | null`; `AppLayout` redirige a ingreso cuando no hay usuario; y `authService` define `id` como cadena y su usuario semilla usa `u-1001` (`src/pages/ProfilePage.tsx`, `src/context/AuthContext.tsx`, `src/components/AppLayout.tsx`, `src/services/authService.ts`). La página y la prueba unitaria quedan dentro del alcance indicado en la propuesta y la spec (`openspec/changes/change-ip-693/proposal.md`, `openspec/changes/change-ip-693/specs/profile-client-identifier/spec.md`); el cambio sigue la organización y verificación descritas por `README.md`, `openspec/config.yaml` y los scripts de `package.json`. El patrón existente de composición autenticada en pruebas está en `src/test/renderApp.tsx` y el de expectativas de encabezados en `src/components/AppLayout.test.tsx`. Alternativa descartada: consultar el almacenamiento o duplicar el identificador fuera del contexto, porque `useAuth` ya proporciona el dato de sesión requerido.

## Risks / Trade-offs

- La identidad visible procede de la sesión existente; una sesión ausente no debe habilitar la pantalla de Perfil. Se conserva el control actual de `AppLayout`, que redirige al ingreso cuando `user` es nulo; no se añade un mecanismo de autorización paralelo (`src/components/AppLayout.tsx`, `src/context/AuthContext.tsx`).

## Migration Plan

Sin migración de datos: no cambian el esquema ni los datos almacenados, y se usa el `id` ya presente en la sesión (`src/services/authService.ts`). Para revertir, restaurar el texto del encabezado y retirar la prueba unitaria añadida; la reversión no requiere restaurar datos ni modificar la autenticación.
