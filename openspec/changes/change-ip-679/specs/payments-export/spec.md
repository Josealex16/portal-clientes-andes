## ADDED Requirements

### Requirement: Página autenticada de pagos
El portal SHALL ofrecer una página de Pagos en `/pagos`, accesible desde la navegación autenticada, con una acción para descargar la exportación mensual. El acceso SHALL respetar la protección por sesión del portal.

#### Scenario: Acceso autenticado a Pagos
- **GIVEN** una persona tiene una sesión activa
- **WHEN** selecciona «Pagos» en la navegación
- **THEN** el portal muestra la página `/pagos` y la acción para descargar el CSV

#### Scenario: Acceso a Pagos sin sesión
- **GIVEN** una persona no tiene una sesión activa
- **WHEN** intenta abrir `/pagos`
- **THEN** el portal la redirige a `/login` y no le permite acceder a la acción de descarga

### Requirement: Exportación CSV de pagos del mes anterior
El portal SHALL descargar desde Pagos un CSV UTF-8 separado por comas con encabezados `fecha,monto,estado` y una fila por cada pago de la cuenta autenticada cuya fecha calendario cae en el mes anterior a la descarga. La fecha SHALL usar `AAAA-MM-DD`, el monto SHALL expresarse como pesos chilenos enteros sin separadores ni símbolo, y el estado SHALL conservar su etiqueta en español, sin filtrar por estado.

#### Scenario: Exportar pagos de la cuenta en el mes anterior
- **GIVEN** la descarga se solicita el 16 de octubre de 2026 y existen pagos de la cuenta autenticada el 5 de septiembre de 2026 por 1280000 con estado «Pagado» y el 20 de septiembre por 864000 con estado «Pendiente», además de un pago de otra cuenta el 12 de septiembre
- **WHEN** la persona descarga el CSV
- **THEN** el archivo contiene el encabezado `fecha,monto,estado` y una fila por cada uno de los dos pagos de su cuenta con sus fechas, montos y estados
- **AND** excluye el pago de la otra cuenta

#### Scenario: Incluir los límites del mes y excluir fechas adyacentes
- **GIVEN** la descarga se solicita el 16 de octubre de 2026 y la cuenta tiene pagos fechados el 31 de agosto, el 1 y el 30 de septiembre y el 1 de octubre de 2026
- **WHEN** la persona descarga el CSV
- **THEN** el archivo incluye los pagos del 1 y el 30 de septiembre
- **AND** excluye los pagos del 31 de agosto y el 1 de octubre

#### Scenario: Mes anterior sin pagos
- **GIVEN** la cuenta no tiene pagos fechados en septiembre de 2026
- **WHEN** la persona descarga el CSV el 16 de octubre de 2026
- **THEN** el archivo contiene el encabezado `fecha,monto,estado` y ninguna fila de datos

#### Scenario: Mes anterior cruza el cambio de año
- **GIVEN** la descarga se solicita el 16 de enero de 2026 y la cuenta tiene pagos fechados el 31 de diciembre de 2025 y el 1 de enero de 2026
- **WHEN** la persona descarga el CSV
- **THEN** el archivo incluye el pago del 31 de diciembre de 2025 y excluye el del 1 de enero de 2026
