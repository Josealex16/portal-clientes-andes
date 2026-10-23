## 1. Página de Soporte

- [x] 1.1 Agregar en `src/pages/SupportPage.tsx` la línea exacta «Correo de facturación: facturacion@andes.example» dentro del panel «Contacto directo», conservando el correo general, el teléfono, el horario y el resto de la página; extender `src/pages/SupportPage.test.tsx` con una prueba unitaria de `SupportPage` que compruebe que la línea exacta aparece dentro de ese panel para cubrir el escenario «Consultar el correo de facturación en Contacto directo»; `npm test -- --run` y `npm test` pasan, `npm run build` compila y `npm run lint` pasa.
