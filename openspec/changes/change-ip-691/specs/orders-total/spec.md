## ADDED Requirements

### Requirement: Total de pedidos al pie de la tabla
La página Pedidos SHALL mostrar al pie de su tabla una fila «Total de pedidos» cuyo monto sea la suma del campo `total` de todos los pedidos disponibles en `sampleData`, formateada en pesos chilenos mediante `formatCurrency`.

#### Scenario: Mostrar el total de todos los pedidos
- **GIVEN** `sampleData` contiene cinco pedidos con montos de 1.280.000, 864.000, 2.190.000, 410.000 y 735.000 pesos chilenos
- **WHEN** se muestra la tabla de Pedidos
- **THEN** después de las filas de esos cinco pedidos aparece una fila con la etiqueta «Total de pedidos»
- **AND** esa fila muestra 5.479.000 pesos chilenos con el formato producido por `formatCurrency`
