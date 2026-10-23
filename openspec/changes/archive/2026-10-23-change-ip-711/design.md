## Context

La página de perfil ya presenta una frase introductoria, un panel con los cuatro datos de la cuenta y un párrafo de contacto con soporte. El requisito nuevo es aclarar el propósito de esos datos sin modificar el contenido existente. El repositorio es una aplicación de demostración React/Vite sin servidor ni base de datos (`README.md`); la convención exige contenido en español y una prueba unitaria por cambio de comportamiento (`AGENTS.md`). No se encontró un ADR aplicable en `docs/adr/`, `adr/` ni `docs/decisions/`.

## Goals / Non-Goals

- Mostrar exactamente «Estos datos se usan para emitir tus facturas.» inmediatamente después de «Datos de tu cuenta en el portal.» y antes del panel.
- Conservar visibles y sin cambios los datos de cuenta y el resto del contenido actual.
- No añadir persistencia, lógica de negocio, estilos ni dependencias para este texto estático.

## Decisions

### 1. Añadir el párrafo en la página de perfil entre la introducción y el panel

Contexto: el escenario «Consultar para qué se usan los datos del perfil» requiere la frase literal y su posición, y «Conservar los datos mostrados en Mi perfil» requiere mantener visibles Ana Pérez, ana@andes.example, Andes y C-204. Decisión: renderizar un párrafo en español inmediatamente después del elemento de introducción existente y antes del panel, conservando sin cambios el panel de datos, la información de contacto y el resto del contenido. Es suficiente con el componente de página existente: no hace falta introducir otra capa o componente para texto estático. Como restricción del diseño (no una elección), los cuatro valores del perfil permanecen intactos. Se ampliará `src/pages/ProfilePage.test.tsx` para comprobar el texto exacto y su posición entre introducción y panel, manteniendo las comprobaciones existentes de los cuatro datos. Esta ubicación sigue la estructura de `src/pages/ProfilePage.tsx` y las convenciones de `AGENTS.md` y `openspec/config.yaml`; el contenido existente y las comprobaciones de datos están respaldados por `src/pages/ProfilePage.tsx` y `src/pages/ProfilePage.test.tsx`. La convención de estilos de `AGENTS.md` no requiere estilos para el párrafo; `src/styles/global.css` establece el tratamiento general de párrafos. El stack de interfaz y las herramientas de pruebas existentes están documentados en `README.md` y `package.json`. No contradice ADR conocido.

## Risks / Trade-offs

- Riesgo: si el párrafo se agrega en una ubicación distinta, no se cumple la relación requerida con la introducción y el panel. Mitigación: la cobertura unitaria ampliada de `src/pages/ProfilePage.test.tsx` verificará el texto exacto y su posición, además de conservar las aserciones de los cuatro datos.
- Riesgo: la frase explica el uso de los datos y no debe interpretarse como una modificación de los datos personales. Mitigación: se muestra como texto estático; no se cambian la sesión, los campos del panel ni los flujos de autenticación existentes en `src/pages/ProfilePage.tsx`.

## Migration Plan

No hay migración de datos: el cambio solo añade texto a la interfaz, no altera almacenamiento, esquema, eventos ni formatos persistidos; el repositorio no tiene servidor ni base de datos (`README.md`). Para revertirlo, se elimina el párrafo de la página y las aserciones añadidas para ese texto, manteniendo las comprobaciones del contenido existente. No se requiere una tarea de despliegue de esquema ni un backfill.
