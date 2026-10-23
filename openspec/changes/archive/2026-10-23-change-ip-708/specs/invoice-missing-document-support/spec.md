## ADDED Requirements

### Requirement: Orientación para facturas no encontradas
La página Facturas SHALL mostrar el párrafo «Si una factura no aparece, escribe a soporte@andes.example.» debajo de la introducción, después de la aclaración de moneda existente y antes de la tabla, sin modificar la tabla ni los datos de facturas.

#### Scenario: Consultar qué hacer si falta una factura
- **GIVEN** una persona abre Facturas, donde la aclaración de moneda aparece después de la introducción
- **WHEN** se muestra el contenido de la página
- **THEN** ve el párrafo «Si una factura no aparece, escribe a soporte@andes.example.» inmediatamente después de la aclaración de moneda y antes de la tabla

#### Scenario: Conservar la tabla y los datos de facturas
- **GIVEN** la tabla de Facturas muestra FAC-8812 (2026-09-30, 2026-10-30, 1280000, Pendiente), FAC-8790 (2026-09-22, 2026-10-22, 864000, Pendiente), FAC-8741 (2026-09-13, 2026-10-13, 2190000, Pagada), FAC-8702 (2026-08-31, 2026-09-30, 410000, Pagada) y FAC-8655 (2026-08-15, 2026-09-14, 735000, Vencida)
- **WHEN** se muestra el nuevo párrafo de orientación
- **THEN** la tabla conserva las columnas N°, Emisión, Vencimiento, Monto y Estado y muestra los mismos cinco registros con sus datos indicados
