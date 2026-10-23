## 1. Página no encontrada

- [ ] 1.1 Añadir en `src/pages/NotFoundPage.tsx` el párrafo «Vuelve al inicio desde el menú lateral.» inmediatamente después de la frase introductoria y ampliar la prueba unitaria de `src/pages/NotFoundPage.test.tsx` para `/facturas-viejas`: comprobar que se mantienen el título «Página no encontrada» y «No encontramos /facturas-viejas», que el párrafo aparece en esa posición y que «Volver al inicio» apunta a `/` antes de «Ir a Soporte», que apunta a `/soporte`; `npm test` (`npm test -- --run` en una pasada), `npm run build` y `npm run lint` pasan.
