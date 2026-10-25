## Context

La capacidad «not-found-support-link» ya muestra una página 404 con el título, la ruta solicitada, una frase introductoria, la indicación para volver al inicio y los enlaces «Volver al inicio» y «Ir a Soporte». El cambio requiere añadir el texto de contacto después de esos enlaces, conservando los textos, destinos y orden existentes. La página se presenta para rutas no reconocidas desde `src/App.tsx`; su contenido se implementa en `src/pages/NotFoundPage.tsx`.

## Goals / Non-Goals

- Añadir al final del contenido de la página 404 el párrafo exacto «Si el enlace falla, escribe a soporte@andes.example.».
- Conservar exactamente el título, la ruta solicitada, la frase introductoria, la indicación para volver al inicio y ambos enlaces, incluyendo sus textos, destinos y orden.
- No cambiar el enrutamiento, el resto del contenido, ni añadir comportamiento o persistencia para el contacto.

## Decisions

### 1. Añadir el párrafo de contacto como último elemento de contenido de la página 404

Contexto: El requisito modificado de `openspec/changes/change-ip-720/specs/not-found-support-link/spec.md` incluye el escenario «Mostrar la indicación sin alterar el contenido existente» y el escenario «Mostrar el contacto como último elemento de la página 404». El segundo exige el párrafo literal después del enlace «Ir a Soporte» y como último elemento de contenido; ambos requieren preservar el resto de la página. Decisión: Añadir un párrafo de texto estático después del contenedor del enlace «Ir a Soporte» en `src/pages/NotFoundPage.tsx`; mantener intactos el título «Página no encontrada», `No encontramos {pathname}`, la frase introductoria, la indicación «Vuelve al inicio desde el menú lateral.» y los enlaces «Volver al inicio» (`/`) y «Ir a Soporte» (`/soporte`) en el orden actual. La ruta comodín existente de `src/App.tsx` sigue siendo la que presenta esta pantalla. Alternativas: Modificar los enlaces existentes o convertir la indicación en una navegación habría alterado contenido o comportamiento fuera del requisito. Esta ubicación y el patrón de contenido de página siguen `AGENTS.md` (textos visibles en español; estilos solo en `src/styles/*.css`; los cambios de comportamiento requieren prueba unitaria), `openspec/config.yaml` y `README.md` (Vite, React, TypeScript y comandos de verificación del proyecto), y la descripción de la capacidad en `docs/not-found-support-link.md`. La implementación y el orden actuales están respaldados por `src/pages/NotFoundPage.tsx` y `src/App.tsx`; el escenario de la ruta `/facturas-viejas`, los textos y el orden de los enlaces ya están reflejados en `src/pages/NotFoundPage.test.tsx`. No se encontraron ADR en `docs/adr/`, `adr/` ni `docs/decisions/`; no hay un ADR aplicable que contradiga esta decisión.

## Risks / Trade-offs

- La dirección de soporte estará visible en una página pública y podría ser recopilada por robots de correo no deseado. Mitigación: mostrar únicamente la dirección pública exacta que pide la especificación, como texto, sin añadir formularios, datos personales ni mecanismo de envío.

## Migration Plan

No hay migración de datos: el cambio solo añade texto estático a la interfaz y no altera esquemas, almacenamiento ni formatos persistidos. Se despliega junto con la versión de la aplicación; para revertirlo basta con retirar el párrafo añadido en `src/pages/NotFoundPage.tsx` y volver a desplegar la versión resultante.
