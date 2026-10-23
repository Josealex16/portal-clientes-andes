## Context

El bloque «Contacto directo» de Soporte ya muestra correo y teléfono, pero no el horario. La spec `support-contact-hours` requiere exactamente la línea «Horario de atención: lunes a viernes de 09:00 a 18:00» dentro de ese bloque. La página es una función React en `src/pages/SupportPage.tsx`; el repositorio organiza sus vistas en `src/pages/` y usa Vitest y Testing Library (`README.md`, `package.json`). `openspec/config.yaml` especifica la interfaz en español y los comandos de verificación. No se encontró `AGENTS.md` ni ADR en las rutas de convenciones consultadas.

## Goals / Non-Goals

- Mostrar el texto indicado en «Contacto directo».
- Añadir cobertura unitaria de `SupportPage` para el escenario de la spec.
- No cambiar las rutas, estilos, datos de ejemplo, correo, teléfono ni el resto de la página.
- No incorporar servicios, dependencias, capas ni persistencia.

## Decisions

### 1. Añadir la línea fija al panel existente de «Contacto directo»

La spec pide que el texto aparezca en ese bloque, sin cambios al contenido restante. Decisión: agregar un párrafo con la cadena exacta después de los datos actuales de contacto en el panel existente y cubrir el escenario «Consultar el horario de atención en Contacto directo» con una prueba unitaria de la página. Se seguirá el componente actual en `src/pages/SupportPage.tsx` y el patrón de pruebas de páginas con Vitest y Testing Library observado en `src/pages/InvoicesPage.test.tsx`; las convenciones de interfaz y verificación están en `README.md`, `package.json` y `openspec/config.yaml`. No se añade una abstracción ni se modifica el enrutamiento. Alternativa descartada: crear un componente o fuente de datos para una sola cadena estática; añadiría estructura sin un requisito que la justifique.

## Risks / Trade-offs

No se identifican riesgos de seguridad ni de datos: se añade solo texto estático, sin entrada del usuario, autorización, secretos ni almacenamiento. Mantener el horario como texto fijo evita ampliar el alcance a configuración dinámica.

## Migration Plan

Sin migración de datos: el cambio no altera almacenamiento, formatos ni eventos. La reversión consiste en retirar el párrafo y la cobertura unitaria que se agreguen; no requiere migración inversa ni afecta datos existentes.
