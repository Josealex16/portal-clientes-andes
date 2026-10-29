# Acceso a Soporte desde la página 404

Cuando se muestra «Página no encontrada» para una dirección inexistente, la página indica debajo del título el `pathname` solicitado con el texto «No encontramos <ruta>». La ruta se muestra sin los parámetros de búsqueda ni el fragmento. También ofrece «Volver al inicio» y, debajo, «Ir a Soporte». Este segundo enlace lleva a `/soporte`.

Debajo de la frase introductoria «La dirección que buscas no existe o fue movida.», la página muestra «Vuelve al inicio desde el menú lateral.».

Después del enlace «Ir a Soporte», la página muestra «Back to home», que lleva a `/`. El párrafo «Si el enlace falla, escribe a soporte@andes.example.» aparece después de ese enlace y es el último elemento de contenido.

Por ejemplo, al abrir `/facturas-viejas`, debajo del título se muestra «No encontramos /facturas-viejas». La página conserva los enlaces «Volver al inicio» a `/` e «Ir a Soporte» a `/soporte`, en ese orden, y luego muestra «Back to home» a `/` antes del párrafo de contacto.
