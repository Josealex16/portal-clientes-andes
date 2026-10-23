## ADDED Requirements

### Requirement: Mostrar la ruta solicitada en la página 404
La página «Página no encontrada» SHALL mostrar debajo del título el texto «No encontramos <ruta>», donde `<ruta>` es el `pathname` de la dirección solicitada.

#### Scenario: Mostrar la ruta de una dirección inexistente
- **GIVEN** la persona abre la ruta inexistente `/facturas-viejas`
- **WHEN** se muestra la página «Página no encontrada»
- **THEN** debajo del título ve «No encontramos /facturas-viejas»
