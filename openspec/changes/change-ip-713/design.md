## Context

La spec `home-support-guidance` pide que Inicio muestre el párrafo exacto «Para pedir ayuda, entra a Soporte desde el menú.» inmediatamente después de su introducción, sin alterar las tarjetas ni las novedades. El componente actual concentra la introducción, las tarjetas y Novedades en `src/pages/HomePage.tsx`; el menú principal ya incluye «Soporte» en `src/components/Sidebar.tsx`. La cobertura existente de la página está en `src/pages/HomePage.test.tsx`.

El repositorio usa Vite, React 18, TypeScript y React Router 6 (`openspec/config.yaml`); sus convenciones exigen textos visibles en español, estilos en hojas CSS y una prueba unitaria por cambio de comportamiento (`AGENTS.md`). No se encontraron ADR aplicables en `docs/adr/`, `adr/` ni `docs/decisions/`, ni un documento de arquitectura adicional. La guía vigente de Inicio también está descrita en `docs/home-news.md` y `docs/home-amounts-disclosure.md`.

## Goals / Non-Goals

**Goals**
- Mostrar el texto solicitado exactamente debajo de la introducción de Inicio.
- Mantener sin cambios los contenidos y destinos de las tarjetas y el orden/contenido de Novedades.

**Non-Goals**
- No crear un enlace directo, cambiar el menú, la navegación ni otros bloques de Inicio.
- No introducir estilos, dependencias, servicios ni cambios de persistencia.

## Decisions

### 1. Añadir el párrafo estático en la página de Inicio, sin enlace

La spec requiere una indicación literal, no una nueva acción de navegación. Se añade un elemento de párrafo con ese texto inmediatamente después del párrafo `page__lead` en `src/pages/HomePage.tsx`; no se modifica el menú existente, que ya muestra «Soporte» (`src/components/Sidebar.tsx`), ni se crea un enlace adicional. Se conserva la convención de español y no se agregan estilos en línea, conforme a `AGENTS.md`; la plataforma y los comandos de verificación existentes constan en `openspec/config.yaml`. La decisión sigue la organización actual de la página y sus expectativas documentadas en `src/pages/HomePage.test.tsx`, `docs/home-news.md` y `docs/home-amounts-disclosure.md`. No hay ADR aplicable que modificar.

### 2. Mantener intactos los demás bloques y su orden

El escenario exige que las tres tarjetas sigan conservando sus etiquetas y rutas («Ver pedidos» a `/pedidos`, «Ver facturas» a `/facturas` y «¿Dudas con tu saldo?» a `/soporte`) y que Novedades conserve los cuatro textos en el orden especificado. La modificación se limita al punto de inserción en `src/pages/HomePage.tsx`; las expectativas que ya protegen tarjetas, enlaces e ítems de noticias se mantienen en `src/pages/HomePage.test.tsx`, en consonancia con `docs/home-news.md` y `AGENTS.md`. No se cambia el comportamiento ni se añade navegación.

### 3. Extender la cobertura unitaria de la página existente

La regla del repositorio es cubrir cada cambio de comportamiento con una prueba unitaria (`AGENTS.md`). Se amplía la cobertura ya ubicada en `src/pages/HomePage.test.tsx` para especificar la frase y su posición inmediata tras la introducción, manteniendo las expectativas existentes de tarjetas, destinos y noticias. La verificación del proyecto continúa usando las capacidades disponibles: `npm run lint`, `npm test -- --run` y `npm run build`, según `openspec/config.yaml` y los scripts de `package.json`. No se añade otra capa de interfaz ni una dependencia de pruebas; no hay ADR aplicable.

## Risks / Trade-offs

- **La indicación podría dejar de corresponder con el menú si este cambia posteriormente.** Mitigación: el texto apunta al elemento «Soporte» que actualmente existe en `src/components/Sidebar.tsx`; si el menú cambia en una modificación futura, actualizar allí la indicación manteniendo el texto requerido mientras esta spec siga vigente. El párrafo es contenido estático: no incorpora datos personales, entrada externa, permisos nuevos ni persistencia.

## Migration Plan

No hay migración de datos: el cambio solo añade texto estático a la interfaz, sin modificar esquemas, almacenamiento ni formatos persistidos. La reversión consiste en retirar el párrafo de `src/pages/HomePage.tsx` y eliminar la cobertura añadida para ese texto; no hace falta restaurar ni transformar datos.
