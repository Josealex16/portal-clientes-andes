# orders-sorting-disclosure Specification

## Purpose
Esta capacidad permite a las personas conocer el criterio cronológico con que se presenta el historial de pedidos.

## Requirements

### Requirement: Aclaración del orden de los pedidos
La página Pedidos SHALL mostrar debajo de su frase de introducción y antes de la tabla cuando hay pedidos, o antes del mensaje de estado vacío cuando no los hay, el párrafo «Los pedidos se ordenan del más reciente al más antiguo.».

#### Scenario: Consultar la aclaración del orden en Pedidos
- **GIVEN** una persona abre la página Pedidos con los pedidos de ejemplo
- **WHEN** se muestra el contenido de la página
- **THEN** ve el párrafo «Los pedidos se ordenan del más reciente al más antiguo.» inmediatamente después de «Historial reciente de pedidos de tu empresa.» y antes de la tabla

#### Scenario: Mantener la aclaración del orden cuando no hay pedidos
- **GIVEN** la lista visible de Pedidos está vacía
- **WHEN** se muestra el contenido de la página
- **THEN** ve el párrafo «Los pedidos se ordenan del más reciente al más antiguo.» inmediatamente después de «Historial reciente de pedidos de tu empresa.» y antes de «Todavía no hay pedidos.»
