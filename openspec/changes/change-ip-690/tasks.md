## 1. Inicio

- [x] 1.1 Añadir en `src/pages/HomePage.tsx` la tarjeta «Facturas vencidas», calculando solo las facturas con estado exacto «Vencida» y con el enlace «Ver facturas» a `/facturas`; añadir `src/pages/HomePage.test.tsx` con Vitest y Testing Library, usando una sesión de prueba y fixtures con una factura «Vencida», dos «Pendiente» y dos «Pagada», para comprobar que la tarjeta muestra `1` (sin contar pendientes ni pagadas) y que su enlace apunta a `/facturas`; pasan `npm run build`, `npm run lint` y `npm test -- --run` (comando de test configurado en el pod: `npm test`).

## 2. Soporte

- [ ] 2.1 Añadir en `src/pages/SupportPage.tsx`, entre Preguntas frecuentes y Contacto directo, el panel «Horario de atención» con el texto exacto «Lunes a viernes, de 8:30 a 18:00 (hora de Santiago).»; añadir `src/pages/SupportPage.test.tsx` con Vitest y Testing Library para comprobar el título, el texto exacto y que el panel precede a «Contacto directo»; pasan `npm run build`, `npm run lint` y `npm test -- --run` (comando de test configurado en el pod: `npm test`).
