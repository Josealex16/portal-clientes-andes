## ADDED Requirements

### Requirement: Acceso a Soporte desde la página 404
La página «Página no encontrada» SHALL mostrar el enlace «Ir a Soporte» debajo de «Volver al inicio» y SHALL dirigirlo a `/soporte`.

#### Scenario: Ir a Soporte desde una ruta inexistente
- **GIVEN** una persona abre `/pagina-inexistente` y se muestra «Página no encontrada»
- **WHEN** consulta los enlaces de esa página
- **THEN** ve «Volver al inicio» seguido debajo por «Ir a Soporte»
- **AND** el destino de «Ir a Soporte» es `/soporte`
