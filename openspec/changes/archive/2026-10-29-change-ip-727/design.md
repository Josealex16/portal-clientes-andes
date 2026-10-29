## Context

La especificación modificada requiere añadir un enlace «Back to home» con destino `/` a la página 404, preservando el contenido y los destinos existentes. También fija el orden del contenido, incluida la posición del párrafo de contacto como último elemento. `src/pages/NotFoundPage.tsx` ya contiene la introducción, la indicación para volver, los enlaces «Volver al inicio» y «Ir a Soporte» y el párrafo de contacto; `src/pages/NotFoundPage.test.tsx` cubre esos textos, destinos y relaciones de orden. La propuesta sitúa el enlace nuevo después de «Ir a Soporte» y antes del contacto.

El repositorio organiza esta interfaz por páginas en `src/pages/`, usa React 18, TypeScript y React Router 6 (`README.md`, `openspec/config.yaml`), y exige pruebas unitarias para cambios de comportamiento (`AGENTS.md`). La verificación establecida es `npm run lint`, `npm test -- --run` y `npm run build` (`openspec/config.yaml`; los scripts correspondientes están definidos en `package.json`). No se encontraron ADRs aplicables en `docs/adr/`, `adr/` ni `docs/decisions/`.

## Goals / Non-Goals

- Añadir el enlace solicitado a la página «Página no encontrada», después de «Ir a Soporte» y antes del párrafo de contacto.
- Mantener todos los textos, enlaces y destinos existentes, así como el contacto como último elemento de contenido.
- No modificar rutas, otras páginas, estilos ni persistencia.

## Decisions

### 1. Añadir el enlace en el componente de página 404 existente

La página 404 ya reúne el contenido afectado y usa `Link` de React Router para sus enlaces. Se agregará un `Link` con el nombre visible exacto «Back to home» y `to="/"` dentro del contenido de `NotFoundPage`, inmediatamente después del bloque de «Ir a Soporte» y antes del párrafo de contacto; no se alterarán los textos ni destinos existentes. Esto satisface los escenarios «Mostrar la indicación sin alterar el contenido existente», «Mostrar el contacto como último elemento de la página 404» y «Volver al inicio con el nuevo enlace» de `openspec/changes/change-ip-727/specs/not-found-support-link/spec.md`. La ubicación sigue el módulo de páginas del `README.md`, la implementación actual de `src/pages/NotFoundPage.tsx` y el orden que caracteriza `src/pages/NotFoundPage.test.tsx`; además cumple la regla de pruebas unitarias de `AGENTS.md`. Sigue la pila y verificación existente descrita por `openspec/config.yaml` y `package.json`. No hay un ADR aplicable localizado que requiera otra decisión. Se descarta modificar el menú lateral o las rutas porque la especificación pide un enlace en el contenido de la página 404, sin cambiar las rutas.

### 2. Mantener intacto el resto del contenido y el contacto al final

La página debe conservar el título, la ruta solicitada, la frase introductoria, la indicación «Vuelve al inicio desde el menú lateral.», y los enlaces existentes «Volver al inicio» a `/` e «Ir a Soporte» a `/soporte` en su orden actual; el contacto «Si el enlace falla, escribe a soporte@andes.example.» queda después del enlace nuevo y como último elemento de contenido. No se cambiará el tratamiento existente del `pathname`. Esta decisión cubre los tres escenarios de la especificación, particularmente la condición de último elemento en «Mostrar el contacto como último elemento de la página 404». La evidencia del comportamiento actual está en `src/pages/NotFoundPage.tsx`, `src/pages/NotFoundPage.test.tsx` y `docs/not-found-support-link.md`; se ajusta a preservar textos visibles en español según `AGENTS.md` y no contradice ADR aplicable localizado.

## Risks / Trade-offs

- El enlace conserva el texto inglés exacto exigido por la especificación, aunque la convención general pide textos visibles en español (`AGENTS.md`); se mantiene porque sustituirlo incumpliría el nombre y el escenario explícitos de `openspec/changes/change-ip-727/specs/not-found-support-link/spec.md`.
- El nuevo enlace es navegación estática hacia `/`; no añade entrada de datos, acceso a datos ni manejo de secretos. No cambia la exposición de datos o el control de acceso existentes (`src/pages/NotFoundPage.tsx`, `README.md`).

## Migration Plan

No hay migración de datos: el cambio solo añade un enlace en una página React y no cambia esquemas, formatos almacenados ni persistencia (`src/pages/NotFoundPage.tsx`, `README.md`). El despliegue es el habitual del frontend; si fuera necesario revertirlo, se retira el enlace nuevo y se recupera el componente anterior, manteniendo intactos los demás contenidos y rutas.
