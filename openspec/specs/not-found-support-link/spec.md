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
