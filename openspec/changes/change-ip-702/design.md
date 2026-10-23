## Context

La spec `profile-support-contact` requiere que Mi perfil muestre, debajo del panel, el párrafo exacto «Para cambiar tus datos escribe a soporte@andes.example.» y que conserve los datos de cuenta mostrados, incluidos los valores del escenario. `src/pages/ProfilePage.tsx` ya obtiene el usuario mediante `useAuth` y presenta nombre, correo, empresa e identificador dentro de un panel; el alcance es únicamente de presentación. El proyecto es una aplicación Vite/React en español, según `openspec/config.yaml` y `README.md`; no se encontró `AGENTS.md` ni ADR en el repositorio.

## Goals / Non-Goals

- Mostrar el texto solicitado inmediatamente después del panel existente de Mi perfil.
- Dejar intactos el panel y sus cuatro campos y valores proporcionados por el usuario autenticado.
- No añadir enlaces, edición de cuenta, cambios de autenticación, persistencia ni otros comportamientos.

## Decisions

### 1. Añadir el párrafo estático debajo del panel existente

La spec exige el texto y su posición, mientras que la propuesta aclara que la dirección se presenta como texto, sin comportamiento de enlace. Se añade un elemento `<p>` con el literal exacto, como texto plano, inmediatamente después del `div.panel` de `src/pages/ProfilePage.tsx`; no se modifica el `dl` que presenta los cuatro campos ni el acceso a `user` mediante `useAuth`. Esto sigue la estructura de páginas y el stack descritos en `README.md` y `openspec/config.yaml`, y el uso de párrafos de contenido en `src/pages/SupportPage.tsx`; `src/pages/SupportPage.test.tsx` y `src/components/AppLayout.test.tsx` documentan las convenciones de presentación textual y acceso a Mi perfil. La spec `openspec/changes/change-ip-702/specs/profile-support-contact/spec.md` fija el texto, la posición y los valores que deben permanecer; `src/context/AuthContext.tsx` respalda que los datos actuales vienen del usuario del contexto. Alternativa descartada: extraer un componente o crear estilos específicos, innecesario para un único párrafo sin requisitos de presentación particulares.

## Risks / Trade-offs

- La dirección de soporte podría transcribirse incorrectamente y orientar mal a la persona; mantener el literal exacto definido en la spec y presentarlo como texto estático evita transformaciones o interpretación como enlace. La adición no acepta datos, no altera la autenticación ni almacena información nueva (`src/pages/ProfilePage.tsx`, `src/context/AuthContext.tsx`, `README.md`).

## Migration Plan

Sin migración de datos: el cambio es solo JSX, no añade ni cambia datos persistidos o estructuras de almacenamiento. `README.md` describe el servicio de autenticación de demostración en `localStorage` y confirma que no hay servidor ni base de datos; la página obtiene los datos ya existentes desde el contexto (`src/context/AuthContext.tsx`). Se despliega el cambio junto con la aplicación web. Para revertirlo, se elimina el párrafo añadido en `src/pages/ProfilePage.tsx`; no se requiere restauración ni transformación de datos.
