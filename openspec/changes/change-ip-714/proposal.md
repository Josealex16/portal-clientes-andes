## Why
IP-714 solicita que la página de ingreso indique cómo pedir ayuda si se olvida la contraseña. El texto, su ubicación y la preservación del formulario están definidos; el cambio formaliza ese comportamiento sin ampliar el alcance de la página.

## What Changes
- Mantener el párrafo exacto «Si olvidaste tu contraseña, escribe a soporte@andes.example.» inmediatamente debajo del subtítulo de ingreso.
- Conservar sin cambios los campos y el botón existentes del formulario de ingreso.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `auth-page-disclosures`: precisar la conservación del formulario junto con la aclaración de ayuda en ingreso.

## Impact
El alcance corresponde a `src/pages/LoginPage.tsx` y a la cobertura unitaria de ingreso. El código y la especificación vigentes ya muestran el párrafo exacto en la ubicación solicitada, por lo que se asume que no hace falta cambiar la interfaz; el formulario debe conservar sus campos Correo electrónico y Contraseña y el botón Ingresar. No se modifican la validación ni el flujo de autenticación.
