## ADDED Requirements

### Requirement: Página autenticada de pagos
El portal SHALL ofrecer una página de Pagos en `/pagos`, accesible desde la navegación autenticada, con una acción para descargar la exportación mensual. El acceso SHALL respetar la protección por sesión del portal.

#### Scenario: Acceso autenticado a Pagos
- **GIVEN** una persona tiene una sesión activa
- **WHEN** abre la opción «Pagos» de la navegación
- **THEN** el portal muestra la página de pagos en `/pagos` y la acción para descargar el CSV

#### Scenario: Acceso a Pagos sin sesión
- **GIVEN** una persona no tiene una sesión activa
- **WHEN** intenta abrir `/pagos`
- **THEN** el portal la redirige a `/login` y no permite acceder a la página ni descargar el CSV

### Requirement: Exportación CSV de pagos del mes anterior
El portal SHALL descargar desde la página de Pagos un CSV UTF-8 separado por comas con los encabezados `fecha,monto,estado` y exactamente una fila por cada pago de la cuenta cuya fecha calendario cae en el mes anterior a la descarga. La fecha SHALL usar el formato `AAAA-MM-DD`, el monto SHALL expresarse en pesos chilenos enteros sin separadores ni símbolo, y el estado SHALL conservar su etiqueta en español.

#### Scenario: Exportar todos los pagos del mes anterior
- **GIVEN** la descarga se solicita el 16 de octubre de 2026 y la cuenta tiene dos pagos fechados el 5 y el 20 de septiembre de 2026 con estados «Pagado» y «Pendiente»
- **WHEN** la persona descarga el CSV desde `/pagos`
- **THEN** el archivo contiene el encabezado `fecha,monto,estado` y una fila por cada uno de esos dos pagos con fecha, monto y estado
- **AND** incluye pagos de ambos estados, en vez de limitarse a los que están pagados

#### Scenario: Incluir los extremos del mes anterior y excluir fechas adyacentes
- **GIVEN** la descarga se solicita el 16 de octubre de 2026 y existen pagos fechados el 31 de agosto, el 1 y el 30 de septiembre y el 1 de octubre de 2026
- **WHEN** la persona descarga el CSV
- **THEN** el archivo incluye los pagos del 1 y el 30 de septiembre
- **AND** excluye los pagos del 31 de agosto y el 1 de octubre

#### Scenario: Mes anterior sin pagos
- **GIVEN** la cuenta no tiene pagos fechados en septiembre de 2026
- **WHEN** la persona descarga el CSV el 16 de octubre de 2026
- **THEN** se descarga un CSV que contiene el encabezado `fecha,monto,estado` y ninguna fila de datos
