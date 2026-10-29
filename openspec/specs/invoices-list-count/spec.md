# invoices-list-count Specification

## Purpose
Esta capacidad muestra cuántas facturas aparecen en la tabla para que la persona pueda identificar el tamaño de la lista visible.

## Requirements

### Requirement: Contador de facturas visibles
La página Facturas SHALL mostrar junto al título el número de filas de factura visibles, con el formato `Facturas (N)`. El contador SHALL corresponder a las filas de factura presentadas en la tabla.

#### Scenario: IP-723 El contador corresponde a las facturas visibles
- **GIVEN** la tabla de Facturas muestra FAC-8812 y FAC-8790
- **WHEN** una persona consulta el título de Facturas
- **THEN** el título muestra «Facturas (2)» y la tabla presenta esas dos filas

#### Scenario: IP-723 El título muestra cero cuando no hay facturas
- **GIVEN** la lista de Facturas está vacía
- **WHEN** una persona consulta el título de Facturas
- **THEN** el título muestra «Facturas (0)» y la tabla no presenta filas de factura
