## ADDED Requirements

### Requirement: Aclaración de moneda de las facturas
La página Facturas SHALL mostrar debajo de su frase de introducción y antes de la tabla el párrafo «Los montos están expresados en pesos chilenos (CLP).».

#### Scenario: Consultar la moneda de los montos en Facturas
- **GIVEN** una persona abre la página Facturas
- **WHEN** se muestra el contenido de la página
- **THEN** ve el párrafo «Los montos están expresados en pesos chilenos (CLP).» inmediatamente después de «Documentos emitidos a tu empresa y su estado de pago.» y antes de la tabla
