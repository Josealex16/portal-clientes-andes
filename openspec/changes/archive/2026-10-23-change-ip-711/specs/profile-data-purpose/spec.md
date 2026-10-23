## Purpose

Esta capacidad explica a las personas qué uso tienen los datos de cuenta que consultan en Mi perfil.

## ADDED Requirements

### Requirement: Propósito de los datos del perfil
Mi perfil SHALL mostrar el párrafo «Estos datos se usan para emitir tus facturas.» inmediatamente después de su frase de introducción y conservar los datos de la cuenta mostrados.

#### Scenario: Consultar para qué se usan los datos del perfil
- **GIVEN** una persona abre Mi perfil
- **WHEN** se muestra el contenido de la página
- **THEN** ve el párrafo «Estos datos se usan para emitir tus facturas.» inmediatamente después de «Datos de tu cuenta en el portal.» y antes del panel de datos

#### Scenario: Conservar los datos mostrados en Mi perfil
- **GIVEN** la cuenta del cliente muestra el nombre «Ana Pérez», el correo «ana@andes.example», la empresa «Andes» y el identificador «C-204»
- **WHEN** se muestra el nuevo párrafo explicativo en Mi perfil
- **THEN** los mismos cuatro datos de la cuenta permanecen visibles sin cambios
