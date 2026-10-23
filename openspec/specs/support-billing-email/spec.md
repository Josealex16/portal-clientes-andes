# support-billing-email Specification

## Purpose
Permite que las personas con consultas sobre facturas encuentren el correo específico de facturación en el bloque de contacto de la página Soporte.

## Requirements

### Requirement: Correo de facturación visible en Contacto directo
La página Soporte SHALL mostrar en el bloque «Contacto directo» la línea «Correo de facturación: facturacion@andes.example».

#### Scenario: Consultar el correo de facturación en Contacto directo
- **GIVEN** una persona abre la página Soporte
- **WHEN** consulta el bloque «Contacto directo»
- **THEN** ve en ese bloque la línea «Correo de facturación: facturacion@andes.example»
