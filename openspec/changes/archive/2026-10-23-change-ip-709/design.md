## Context

La especificación `support-contact-hours` amplía la página Soporte para que el horario también aparezca inmediatamente después de su frase de introducción, antes de «Preguntas frecuentes», y exige conservar el horario y los demás datos de «Contacto directo». Actualmente `SupportPage` renderiza la introducción, las preguntas frecuentes y el contacto directo en ese orden; el horario existente está dentro del último bloque. La propuesta limita el cambio a esta página y su cobertura unitaria.

El repositorio usa Vite, React 18 y TypeScript (`openspec/config.yaml`, `README.md`); su estructura sitúa las páginas en `src/pages/` y las pruebas junto a ellas (`README.md`). `AGENTS.md` exige textos visibles en español y prueba unitaria para cambios de comportamiento, y restringe estilos a hojas CSS, aunque este cambio no necesita estilos. La verificación del proyecto está descrita en `openspec/config.yaml` y los comandos en `package.json`. No se encontraron ADR en `docs/adr/`, `adr/` ni `docs/decisions/`, ni documentos de arquitectura aplicables.

## Goals / Non-Goals

- Mostrar el párrafo exacto «Horario de atención: lunes a viernes, de 9:00 a 18:00.» inmediatamente después de «Resolvemos tus dudas sobre pedidos, facturas y tu cuenta.» y antes de «Preguntas frecuentes».
- Conservar el texto y los datos existentes de «Contacto directo», incluida su línea «Horario de atención: lunes a viernes de 09:00 a 18:00», así como el contenido y el orden relativo de los demás bloques.
- No cambiar estilos, rutas, datos compartidos, autenticación ni otras páginas; no añadir dependencias ni capas.

## Decisions

### 1. Renderizar el nuevo párrafo en `SupportPage` sin alterar los bloques actuales

La ubicación y ambos textos del horario son requisitos explícitos. Se añadirá un párrafo estático justo después del párrafo de introducción y antes del bloque FAQ en `src/pages/SupportPage.tsx`; se mantendrán intactos el FAQ y el bloque «Contacto directo», incluida la línea de horario allí existente. Esto satisface explícitamente los escenarios «Consultar el horario de atención en Contacto directo», «Consultar el horario debajo de la introducción» y «Se conservan los demás bloques de Soporte» de `openspec/changes/change-ip-709/specs/support-contact-hours/spec.md`, y preserva el contenido que ya define `openspec/specs/support-contact-hours/spec.md`. La ubicación sigue la composición actual de la página (`src/pages/SupportPage.tsx`) y su convención de textos en español (`AGENTS.md`); la página y su prueba existente (`src/pages/SupportPage.test.tsx`), junto con la descripción del bloque (`docs/support-contact-hours.md`), respaldan la conservación de los datos actuales. `AGENTS.md`, `openspec/config.yaml`, `README.md` y `package.json` describen respectivamente las reglas de contenido, el stack y los comandos; no hay ADR aplicable que contradiga esta decisión. Se descarta mover o sustituir el horario de contacto porque la especificación exige mantenerlo en su bloque. No se necesita clase o CSS nuevo: no se ha solicitado un estilo distinto y `AGENTS.md` reserva los estilos a hojas CSS.

### 2. Ampliar la prueba unitaria existente de la página, sin crear otra estructura de pruebas

La propuesta exige cobertura unitaria del texto y su ubicación, y `AGENTS.md` exige prueba unitaria para cada cambio de comportamiento. Se ampliará `src/pages/SupportPage.test.tsx`, que ya comprueba contenido dentro de «Contacto directo», para cubrir la presencia del nuevo texto en su posición requerida y la conservación del horario existente y del orden de los bloques. Se mantiene el patrón existente de pruebas de página, conforme a la organización documentada en `README.md`; `package.json` y `openspec/config.yaml` documentan las dependencias y comandos de verificación disponibles. Se descarta introducir una capa de pruebas o dependencia nueva porque los componentes y pruebas actuales ya cubren esta página.

## Risks / Trade-offs

- La presencia intencional de dos versiones cercanas del horario podría llevar a editar una y omitir la otra; mantener cada texto literalmente como lo exige la especificación y en su bloque correspondiente, y conservar cobertura de ambos en `src/pages/SupportPage.test.tsx`, mitiga la divergencia accidental.
- El cambio no introduce entradas de usuario, acceso a datos, secretos ni nuevos puntos de acceso; por tanto no modifica controles de autorización ni tratamiento de datos. El único riesgo de regresión relevante es alterar contenido o ubicación de los bloques existentes; la decisión anterior limita el cambio al componente de Soporte y explicita su conservación.

## Migration Plan

Sin migración de datos: solo se añade texto estático al renderizado React y no cambian esquemas, formatos persistidos ni datos almacenados. Despliegue normal de la aplicación. Para revertir, retirar el párrafo añadido y su cobertura unitaria en `src/pages/SupportPage.tsx` y `src/pages/SupportPage.test.tsx`; el horario ya existente en «Contacto directo» permanece sin cambios.
