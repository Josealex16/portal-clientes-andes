# orders-shipment-tracking-disclosure Specification

## Purpose
Esta capacidad informa a las personas que consultan Pedidos cómo solicitar el estado de un envío sin alterar el historial de pedidos existente.

## Requirements

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

### Requirement: Conservar la tabla de pedidos
La página Pedidos SHALL conservar las columnas, el orden y los datos existentes de la tabla al agregar la nota de seguimiento.

#### Scenario: Mostrar la nota sin cambiar la tabla ni sus datos
- **GIVEN** la tabla contiene los pedidos de ejemplo `PED-2041`, `PED-2037`, `PED-2029`, `PED-2018` y `PED-2003`
- **WHEN** se muestra la página Pedidos con la nota de seguimiento
- **THEN** la tabla conserva las columnas «N°», «Fecha», «Detalle», «Total» y «Estado», el orden cronológico descendente y los valores existentes de fecha, detalle, total y estado de cada pedido
