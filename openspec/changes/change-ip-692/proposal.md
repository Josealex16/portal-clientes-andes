## Why
IP-692 solicita que las personas que consultan Soporte puedan abrir directamente un mensaje al correo de contacto, en lugar de tener que copiar la dirección que hoy aparece como texto plano. En la página actual el correo no es un enlace.

## What Changes
- Presentar `soporte@andes.example` en el panel «Contacto directo» como un enlace `mailto:soporte@andes.example`, conservando la dirección como texto visible.
- Añadir una prueba unitaria de `SupportPage` que compruebe el atributo `href` del enlace de correo.

## Capabilities
### New Capabilities
- `support-contact-email`: permite iniciar un correo desde la dirección de contacto directo de Soporte.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita a `src/pages/SupportPage.tsx` y a la cobertura unitaria de esa página. Se conserva el texto visible de la dirección y el resto del contenido de Soporte; no se modifican otras pantallas ni estilos.
