## MODIFIED Requirements

### Requirement: Nota para consultar el seguimiento de envíos
La página Pedidos SHALL mostrar al final, después de la tabla cuando hay pedidos o después del mensaje de estado vacío cuando no los hay, el párrafo «Para consultar un envío, escribe a soporte@andes.example.».

#### Scenario: Consultar cómo obtener el estado de un envío
- **GIVEN** una persona abre la página Pedidos con pedidos
- **WHEN** se muestra el contenido de la página
- **THEN** ve el párrafo «Para consultar un envío, escribe a soporte@andes.example.» después de la tabla y como último contenido de la página

#### Scenario: Conservar la nota de seguimiento cuando no hay pedidos
- **GIVEN** la lista visible de Pedidos está vacía
- **WHEN** se muestra el contenido de la página
- **THEN** ve «Todavía no hay pedidos.» en lugar de la tabla
- **AND** ve el párrafo «Para consultar un envío, escribe a soporte@andes.example.» después del mensaje y como último contenido de la página
