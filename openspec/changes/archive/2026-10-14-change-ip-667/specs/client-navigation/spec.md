## Purpose

Describe la navegación autenticada del portal para que las opciones sean legibles, el estado activo esté alineado y el menú se adapte al ancho disponible sin obstruir el contenido.

## ADDED Requirements
### Requirement: Menú principal legible y alineado
El portal SHALL mostrar completas las opciones Inicio, Pedidos, Facturas, Soporte y Mi perfil en el menú principal. SHALL alinear los iconos y textos de las opciones en columnas coherentes y mostrar el fondo activo y su barra indicadora alineados con la opción actual.

#### Scenario: Etiquetas e iconos del menú
- **GIVEN** una persona autenticada abre cualquier sección del portal
- **WHEN** consulta el menú principal
- **THEN** ve completas las etiquetas «Inicio», «Pedidos», «Facturas», «Soporte» y «Mi perfil»
- **AND** los iconos y textos de las cinco opciones mantienen sus columnas alineadas

#### Scenario: Opción activa alineada
- **GIVEN** una persona autenticada está en `/facturas`
- **WHEN** se muestra el menú principal
- **THEN** el enlace «Facturas» tiene su fondo activo y barra indicadora dentro de los límites de esa opción
- **AND** el fondo y la barra no aparecen desplazados respecto del enlace

### Requirement: Menú adaptable sin obstrucción del contenido
El portal SHALL disponer el menú principal en una forma que no cubra el contenido de la página cuando el viewport mida menos de 900 px de ancho. A 900 px o más, SHALL conservar el menú lateral junto al contenido.

#### Scenario: Viewport inmediatamente menor al umbral
- **GIVEN** una persona autenticada ve una página del portal con un viewport de 899 px de ancho
- **WHEN** se presenta el menú principal
- **THEN** el menú se muestra en una disposición no superpuesta al contenido, como una fila superior
- **AND** el contenido de la página permanece visible debajo o junto al menú

#### Scenario: Viewport en el umbral
- **GIVEN** una persona autenticada ve una página del portal con un viewport de 900 px de ancho
- **WHEN** se presenta el menú principal
- **THEN** el menú se muestra lateralmente junto al contenido sin cubrirlo

#### Scenario: Viewport mayor al umbral
- **GIVEN** una persona autenticada ve una página del portal con un viewport de 901 px de ancho
- **WHEN** se presenta el menú principal
- **THEN** el menú se muestra lateralmente junto al contenido sin cubrirlo

### Requirement: Verificación automatizada de navegación adaptable
El portal SHALL incluir verificaciones automatizadas de las etiquetas del menú, el estado activo y su comportamiento de disposición alrededor del umbral de 900 px. Las verificaciones existentes de lint, pruebas y build SHALL poder completarse correctamente.

#### Scenario: Prueba del menú y del estado activo
- **GIVEN** la suite automatizada ejecuta la aplicación con una sesión autenticada en `/facturas`
- **WHEN** comprueba el menú principal
- **THEN** verifica las cinco etiquetas completas y que «Facturas» está marcado como activo mientras «Pedidos» no lo está

#### Scenario: Comandos de verificación del proyecto
- **GIVEN** los cambios del menú están implementados
- **WHEN** se ejecutan `npm run lint`, `npm test -- --run` y `npm run build`
- **THEN** los tres comandos finalizan correctamente
