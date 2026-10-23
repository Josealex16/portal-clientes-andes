## ADDED Requirements

### Requirement: Línea de contacto al pie de páginas autenticadas
El portal SHALL mostrar, debajo del contenido de cada página con sesión iniciada, una única línea centrada con el texto exacto «Soporte: soporte@andes.example · Lunes a viernes de 09:00 a 18:00».

#### Scenario: Ver el pie de contacto en las páginas con sesión iniciada
- **GIVEN** una persona tiene una sesión iniciada
- **WHEN** abre Inicio (`/`), Pedidos (`/pedidos`), Facturas (`/facturas`), Soporte (`/soporte`), Mi perfil (`/perfil`) o una ruta autenticada inexistente
- **THEN** debajo del contenido de cada página ve una única línea centrada con el texto «Soporte: soporte@andes.example · Lunes a viernes de 09:00 a 18:00»

#### Scenario: No mostrar el pie en las rutas públicas
- **GIVEN** una persona no tiene una sesión iniciada
- **WHEN** abre la página de ingreso (`/login`) o de registro (`/registro`)
- **THEN** esas páginas no muestran el pie de contacto
