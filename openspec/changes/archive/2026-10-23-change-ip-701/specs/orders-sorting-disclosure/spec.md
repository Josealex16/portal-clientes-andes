## Purpose
Esta capacidad permite a las personas conocer el criterio cronológico con que se presenta el historial de pedidos.

## ADDED Requirements

### Requirement: Aclaración del orden de los pedidos
La página Pedidos SHALL mostrar debajo de su frase de introducción y antes de la tabla el párrafo «Los pedidos se ordenan del más reciente al más antiguo.».

#### Scenario: Consultar la aclaración del orden en Pedidos
- **GIVEN** una persona abre la página Pedidos
- **WHEN** se muestra el contenido de la página
- **THEN** ve el párrafo «Los pedidos se ordenan del más reciente al más antiguo.» inmediatamente después de «Historial reciente de pedidos de tu empresa.» y antes de la tabla
