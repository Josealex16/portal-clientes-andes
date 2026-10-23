## Context

La capacidad `support-contact-hours` ya presenta el horario de atención dentro de «Contacto directo» en la página Soporte. El cambio agrega inmediatamente después la línea exacta «Tiempo de respuesta: hasta 24 horas hábiles.» y requiere conservar el texto y el orden de las líneas existentes. El repositorio organiza las páginas en `src/pages/` (README.md) y su verificación documentada usa lint, tests y build (openspec/config.yaml); no hay `AGENTS.md`, ADR ni documento de arquitectura en las rutas revisadas.

## Goals / Non-Goals

**Goals**
- Mostrar la nueva línea de tiempo de respuesta después del horario en «Contacto directo».
- Mantener idénticos y en el orden actual el correo, el correo de facturación, el teléfono, la oficina y el horario.

**Non-Goals**
- Cambiar cualquier otro contenido de Soporte o de otras páginas.
- Añadir comportamiento dinámico, persistencia o dependencias.

## Decisions

### 1. Añadir la línea de respuesta en el bloque existente de Contacto directo

La pantalla ya construye dicho bloque con párrafos estáticos y muestra el horario como su última línea. Decisión: añadir un párrafo con el texto exacto de tiempo de respuesta inmediatamente después del horario en `src/pages/SupportPage.tsx`, sin editar las demás líneas. Así, el escenario «Consultar el horario de atención en Contacto directo» sigue mostrando el horario y el escenario «Consultar tiempo de respuesta sin alterar las otras líneas» ve la nueva línea tras él, conservando sin cambios y en su orden previo todas las líneas enumeradas en la especificación. Se sigue la estructura de páginas descrita en `README.md` y el alcance existente de `openspec/specs/support-contact-hours/spec.md`; `openspec/config.yaml` documenta los comandos de verificación del repositorio. `src/pages/SupportPage.tsx` muestra la ubicación y el orden actual, y `src/pages/SupportPage.test.tsx` documenta la cobertura y el patrón existente para el contenido del bloque. No se encontró `AGENTS.md` ni ADR aplicable. Alternativa descartada: extraer el texto a datos o a un componente nuevo, pues sería una abstracción innecesaria para una línea estática.

## Risks / Trade-offs

- Riesgo de modificar accidentalmente el contenido existente al editar el bloque -> limitar el cambio a insertar la línea nueva después del horario; los textos y el orden previos quedan tal como aparecen en `src/pages/SupportPage.tsx` y se describen expresamente en la especificación.
- Riesgo de que la línea estática se confunda con información privada o protegida -> mantenerla como texto de interfaz del bloque público ya existente; el cambio no incorporará datos personales, secretos, almacenamiento ni una nueva superficie de autorización.

## Migration Plan

Sin migración de datos: el cambio solo añade texto estático en la página y no altera datos persistidos, formatos ni esquemas. Reversión: retirar el párrafo nuevo de `src/pages/SupportPage.tsx`; las líneas preexistentes permanecen intactas.
