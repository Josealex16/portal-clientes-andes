## Why
IP-709 solicita que las personas que consultan Soporte conozcan el horario de atención desde el inicio de la página. Aunque el horario ya aparece en «Contacto directo», la introducción no informa cuándo se atiende; se agregará allí el párrafo exacto solicitado sin modificar los demás bloques.

## What Changes
- Agregar inmediatamente debajo de la introducción de Soporte el párrafo «Horario de atención: lunes a viernes, de 9:00 a 18:00.».
- Conservar sin cambios el resto de los bloques y la información existente de la página, incluido el horario actual de «Contacto directo».
- Añadir una prueba unitaria de `SupportPage` que compruebe el texto y su ubicación.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `support-contact-hours`: añade el horario debajo de la introducción y conserva la línea ya existente en «Contacto directo».

## Impact
El cambio se limita a `src/pages/SupportPage.tsx` y a la cobertura unitaria de esa página. El párrafo nuevo conserva exactamente puntuación y texto del ticket y aparece inmediatamente después de la introducción, antes de «Preguntas frecuentes». Se asume que la línea «Horario de atención: lunes a viernes de 09:00 a 18:00» ya existente en «Contacto directo» debe mantenerse, junto con los demás bloques y su contenido; no se amplía el alcance a estilos, rutas ni otros datos.
