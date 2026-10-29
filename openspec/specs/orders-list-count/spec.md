# orders-list-count Specification

## Purpose
Esta capacidad muestra cuántos pedidos aparecen en la tabla para que la persona pueda identificar el tamaño de la lista visible.

## Requirements

### Requirement: Contador de pedidos visibles
La página Pedidos SHALL mostrar junto al título el número de filas de pedido visibles, con el formato `Pedidos (N)`. El contador SHALL reflejar las filas que la página muestra después de cualquier filtro o búsqueda activa.

#### Scenario: IP-722 El contador corresponde a las filas visibles
- **GIVEN** la lista de Pedidos muestra PED-2041 y PED-2037, y no muestra PED-2029
- **WHEN** una persona consulta el título de Pedidos
- **THEN** el título muestra «Pedidos (2)» y la tabla presenta esas dos filas visibles

#### Scenario: IP-722 El título muestra cero cuando no hay pedidos
- **GIVEN** la lista de Pedidos está vacía
- **WHEN** una persona consulta el título de Pedidos
- **THEN** el título muestra «Pedidos (0)» y la tabla no presenta filas de pedido

#### Scenario: IP-722 El filtro limita el contador a los pedidos resultantes
- **GIVEN** un filtro activo deja visibles los pedidos PED-2041 y PED-2037, mientras PED-2029 no coincide y no aparece en la tabla
- **WHEN** se muestra la página Pedidos
- **THEN** el título muestra «Pedidos (2)» y solo se cuentan las dos filas resultantes visibles
