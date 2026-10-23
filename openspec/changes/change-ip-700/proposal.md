## Why
IP-700 solicita que las personas que consultan Inicio conozcan que la oficina de Providencia atiende presencialmente. Actualmente el panel «Novedades» presenta tres avisos y ninguno informa de esa atención, por lo que se añadirá el aviso solicitado sin alterar el resto del contenido.

## What Changes
- Agregar al final de la lista «Novedades» el aviso «Atención presencial en la oficina de Providencia, de lunes a viernes.».
- Conservar las tarjetas, los enlaces y los tres avisos existentes de Inicio.

## Capabilities
### New Capabilities
- `home-news`: presenta las novedades disponibles en Inicio, incluida la información sobre atención presencial en Providencia.

### Modified Capabilities
- Ninguna.

## Impact
El cambio se limita a la lista «Novedades» de `src/pages/HomePage.tsx` y su comportamiento visible en Inicio. Se asume que el aviso es texto estático y que se agrega como cuarto elemento después de los tres avisos existentes; no se modifican tarjetas, enlaces, otros avisos ni otras páginas.
