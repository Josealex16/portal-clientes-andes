## Context

La página Soporte muestra hoy `soporte@andes.example` como texto plano dentro del panel «Contacto directo» (`src/pages/SupportPage.tsx`). La especificación `specs/support-contact-email/spec.md` requiere que, al consultar ese panel, la dirección siga siendo visible pero sea el texto de un enlace con destino exacto `mailto:soporte@andes.example`. La propuesta limita el cambio a esa página y a su cobertura unitaria; no modifica otras pantallas ni estilos (`proposal.md`).

El repositorio usa React 18 y TypeScript, mantiene las páginas en `src/pages/` y usa Vitest con Testing Library para las pruebas unitarias (`README.md`, `package.json`, `openspec/config.yaml`). No se encontró un `AGENTS.md` ni ADR aplicables en las ubicaciones del repositorio.

## Goals / Non-Goals

- Cumplir el escenario «Abrir el correo de contacto desde Soporte»: el panel presenta `soporte@andes.example` como texto visible del enlace cuyo destino es `mailto:soporte@andes.example` (`specs/support-contact-email/spec.md`).
- Añadir la cobertura unitaria de `SupportPage` solicitada en `proposal.md`, incluyendo la comprobación del `href`.
- No cambiar el contenido restante de Soporte, otras pantallas ni los estilos.
- No añadir autenticación, persistencia, configuración o dependencias; no hay datos dinámicos ni una migración involucrada.

## Decisions

### 1. Enlazar la dirección mediante un ancla HTML en Contacto directo

La implementación actual presenta la dirección como texto dentro del párrafo «Correo» (`src/pages/SupportPage.tsx`). Decisión: sustituir solo ese texto por un enlace nativo con `href="mailto:soporte@andes.example"` y conservar `soporte@andes.example` como su texto visible; mantener sin cambios el teléfono, los otros contenidos y la estructura de panel existente. Esto cubre explícitamente el escenario «Abrir el correo de contacto desde Soporte»: al consultar «Contacto directo», la persona ve la dirección como enlace y su destino es exactamente el URI mailto requerido (`specs/support-contact-email/spec.md`). Sigue la organización de páginas descrita en `README.md` y el alcance fijado en `proposal.md`; no introduce una capa o dependencia nueva. La dirección y destino son constantes del contenido, sin entrada de usuario, credenciales ni datos persistidos; no se altera ningún control de autenticación o autorización. Alternativa descartada: añadir un componente o servicio para un enlace estático, sin necesidad funcional. No hay ADR aplicable ni `AGENTS.md` en este repositorio.

### 2. Mantener la cobertura unitaria junto a la página

Decisión: incorporar la prueba unitaria de `SupportPage` en `src/pages/SupportPage.test.tsx` y comprobar que la dirección visible corresponde a un enlace cuyo `href` es `mailto:soporte@andes.example`, según el alcance de `proposal.md` y el escenario de `specs/support-contact-email/spec.md`. El patrón de pruebas de páginas usa Vitest y Testing Library (`src/pages/LoginPage.test.tsx`, `src/test/renderApp.tsx`); los comandos de lint, pruebas unitarias y build están documentados en `package.json`, `README.md` y `openspec/config.yaml`. No se añaden herramientas ni dependencias. Alternativa descartada: añadir pruebas de navegador para un destino estático, que excederían el alcance sin aportar un comportamiento adicional pedido. No hay ADR aplicable ni `AGENTS.md` en este repositorio.

## Risks / Trade-offs

- Si el dispositivo de la persona no tiene un gestor para URI `mailto`, activar el enlace no abrirá una aplicación de correo. Mitigación: mantener la dirección completa como texto visible del enlace para que pueda consultarse y copiarse; no se añade otra interacción que la especificación no solicita.
- No se identifican riesgos nuevos de seguridad o persistencia: el destino es una dirección fija, no hay entrada de usuario ni datos sensibles, y el cambio no crea ni modifica estado almacenado.

## Migration Plan

Sin migración de datos: el cambio es solo de presentación y cobertura unitaria; no modifica tablas, formatos almacenados, eventos ni archivos. Despliegue como actualización normal de la aplicación. Reversión: restaurar en `src/pages/SupportPage.tsx` el texto plano de la dirección y retirar la prueba añadida; el contenido restante y el estado persistido permanecen sin cambios.
