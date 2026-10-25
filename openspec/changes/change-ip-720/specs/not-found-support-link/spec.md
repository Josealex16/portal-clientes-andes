## MODIFIED Requirements
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
