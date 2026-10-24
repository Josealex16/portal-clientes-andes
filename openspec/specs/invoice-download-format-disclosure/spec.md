# invoice-download-format-disclosure Specification

## Purpose
Esta capacidad informa a las personas que consultan Facturas del formato de descarga de los documentos sin alterar la tabla ni sus datos.

## Requirements

### Requirement: Aclaración del formato de descarga de facturas
La página Facturas SHALL mostrar el párrafo «Los documentos se descargan en formato PDF.» al final de su contenido, después de la tabla, sin modificar las columnas ni los datos de facturas existentes.

#### Scenario: Consultar el formato de descarga
- **GIVEN** una persona abre la página Facturas
- **WHEN** se muestra el contenido completo de la página
- **THEN** ve el párrafo «Los documentos se descargan en formato PDF.» inmediatamente después de la tabla de facturas

#### Scenario: Conservar la tabla y los datos de facturas
- **GIVEN** la tabla de Facturas muestra FAC-8812 (2026-09-30, 2026-10-30, 1280000, Pendiente), FAC-8790 (2026-09-22, 2026-10-22, 864000, Pendiente), FAC-8741 (2026-09-13, 2026-10-13, 2190000, Pagada), FAC-8702 (2026-08-31, 2026-09-30, 410000, Pagada) y FAC-8655 (2026-08-15, 2026-09-14, 735000, Vencida)
- **WHEN** se muestra el párrafo sobre el formato de descarga
- **THEN** la tabla conserva las columnas N°, Emisión, Vencimiento, Monto y Estado y los mismos cinco registros con sus datos indicados
