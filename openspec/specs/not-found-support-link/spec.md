# not-found-support-link Specification

## Purpose
Esta capacidad permite que las personas que encuentran una dirección inexistente accedan directamente a Soporte desde la página de error 404.

## Requirements

### Requirement: Acceso a Soporte desde la página 404
La página «Página no encontrada» SHALL mostrar el enlace «Ir a Soporte» debajo de «Volver al inicio» y SHALL dirigirlo a `/soporte`.

#### Scenario: Ir a Soporte desde una ruta inexistente
- **GIVEN** una persona abre `/pagina-inexistente` y se muestra «Página no encontrada»
- **WHEN** consulta los enlaces de esa página
- **THEN** ve «Volver al inicio» seguido debajo por «Ir a Soporte»
- **AND** el destino de «Ir a Soporte» es `/soporte`

### Requirement: Mostrar la ruta solicitada en la página 404
La página «Página no encontrada» SHALL mostrar debajo del título el texto «No encontramos <ruta>», donde `<ruta>` es el `pathname` de la dirección solicitada.

#### Scenario: Mostrar la ruta de una dirección inexistente
- **GIVEN** la persona abre la ruta inexistente `/facturas-viejas`
- **WHEN** se muestra la página «Página no encontrada»
- **THEN** debajo del título ve «No encontramos /facturas-viejas»

### Requirement: Indicación para volver al inicio desde la página 404
La página «Página no encontrada» SHALL mostrar el párrafo «Vuelve al inicio desde el menú lateral.» inmediatamente debajo de la frase introductoria «La dirección que buscas no existe o fue movida.» y SHALL mostrar al final de su contenido el párrafo «Si el enlace falla, escribe a soporte@andes.example.» después de los enlaces existentes. SHALL conservar sin cambios el título y el resto del contenido existente de la página.

#### Scenario: Mostrar la indicación sin alterar el contenido existente
- **GIVEN** una persona abre la ruta inexistente `/facturas-viejas`
- **WHEN** se muestra la página «Página no encontrada»
- **THEN** el título sigue siendo «Página no encontrada» y se conserva el texto «No encontramos /facturas-viejas»
- **AND** después de «La dirección que buscas no existe o fue movida.» aparece inmediatamente el párrafo «Vuelve al inicio desde el menú lateral.»
- **AND** se conservan los enlaces «Volver al inicio» a `/` y «Ir a Soporte» a `/soporte`, en ese orden

#### Scenario: Mostrar el contacto como último elemento de la página 404
- **GIVEN** una persona abre la ruta inexistente `/facturas-viejas`
- **WHEN** se muestra la página «Página no encontrada»
- **THEN** después del enlace «Ir a Soporte» a `/soporte`, como último elemento de contenido, ve el párrafo «Si el enlace falla, escribe a soporte@andes.example.»
- **AND** el título, la ruta solicitada, la frase introductoria, la indicación para volver al inicio y los dos enlaces existentes conservan sus textos, destinos y orden
