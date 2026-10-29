## MODIFIED Requirements

### Requirement: Indicación para volver al inicio desde la página 404
La página «Página no encontrada» SHALL mostrar el párrafo «Vuelve al inicio desde el menú lateral.» inmediatamente debajo de la frase introductoria «La dirección que buscas no existe o fue movida.» y SHALL mostrar al final de su contenido el párrafo «Si el enlace falla, escribe a soporte@andes.example.» después de los enlaces existentes. SHALL mostrar además el enlace «Back to home» con destino `/` después de «Ir a Soporte» y antes del párrafo de contacto, sin cambiar ningún texto ni destino existente de la página.

#### Scenario: Mostrar la indicación sin alterar el contenido existente
- **GIVEN** una persona abre la ruta inexistente `/facturas-viejas`
- **WHEN** se muestra la página «Página no encontrada»
- **THEN** el título sigue siendo «Página no encontrada» y se conserva el texto «No encontramos /facturas-viejas»
- **AND** después de «La dirección que buscas no existe o fue movida.» aparece inmediatamente el párrafo «Vuelve al inicio desde el menú lateral.»
- **AND** se conservan los enlaces «Volver al inicio» a `/` y «Ir a Soporte» a `/soporte`, en ese orden
- **AND** después del enlace «Ir a Soporte» aparece el enlace «Back to home» a `/`

#### Scenario: Mostrar el contacto como último elemento de la página 404
- **GIVEN** una persona abre la ruta inexistente `/facturas-viejas`
- **WHEN** se muestra la página «Página no encontrada»
- **THEN** después de los enlaces «Ir a Soporte» a `/soporte` y «Back to home» a `/`, como último elemento de contenido, ve el párrafo «Si el enlace falla, escribe a soporte@andes.example.»
- **AND** el título, la ruta solicitada, la frase introductoria, la indicación para volver al inicio y los enlaces «Volver al inicio» a `/` e «Ir a Soporte» a `/soporte` conservan sus textos, destinos y orden

#### Scenario: Volver al inicio con el nuevo enlace
- **GIVEN** una persona abre la ruta inexistente `/facturas-viejas` y la página conserva sus textos y enlaces existentes
- **WHEN** consulta los enlaces de la página
- **THEN** ve un enlace llamado «Back to home» después de «Ir a Soporte»
- **AND** el destino de «Back to home» es `/`
