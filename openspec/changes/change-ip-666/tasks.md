## 1. Validación del formulario de registro

- [ ] 1.1 En `src/pages/RegisterPage.tsx`, corregir la validación para comparar `password` con `confirmPassword` antes de llamar a `register` y mostrar «Las contraseñas no coinciden.» en el campo de confirmación; añadir prueba de componente en `src/pages/RegisterPage.test.tsx` que envíe datos válidos con contraseñas distintas, compruebe el mensaje y verifique que no se registra una cuenta (escenarios «Confirmación diferente» y «Prueba automatizada de contraseñas distintas»; Vitest/Testing Library con `renderApp` y almacenamiento limpio).

## 2. Flujo de éxito y aviso en ingreso

- [ ] 2.1 En `src/pages/RegisterPage.tsx`, al completar el registro llamar al servicio existente y navegar a `/login` con el aviso temporal de éxito mediante estado de React Router; añadir prueba de componente en `src/pages/RegisterPage.test.tsx` que con almacenamiento limpio y datos válidos compruebe usuario persistido, ruta `/login`, aviso de éxito y ausencia de errores JavaScript causados por el registro (escenarios «Cuenta nueva registrada sin errores» y «Prueba automatizada de éxito»); ejecutar con Vitest/Testing Library y `renderApp`.
- [ ] 2.2 En `src/pages/LoginPage.tsx`, presentar el aviso de registro exitoso recibido mediante estado de navegación sin alterar el inicio de sesión; añadir prueba de componente en `src/pages/LoginPage.test.tsx` para la presentación del aviso al entrar a `/login` con dicho estado y para el ingreso normal sin aviso (escenario «Cuenta nueva registrada sin errores»); ejecutar con Vitest/Testing Library y `renderApp`.

## 3. Verificación del cambio

- [ ] 3.1 Ejecutar `npm run lint`, `npm test -- --run` y `npm run build`, y comprobar que los tres comandos terminan correctamente; no incluye correcciones indeterminadas.
