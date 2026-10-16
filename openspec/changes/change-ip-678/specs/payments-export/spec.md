## ADDED Requirements

### Requirement: Página autenticada de pagos
El portal SHALL ofrecer una página de Pagos en `/pagos`, accesible desde la navegación autenticada, con un botón «Exportar» que inicia la descarga CSV. El acceso SHALL respetar la protección por sesión del portal.

#### Scenario: Abrir Pagos con sesión
- **GIVEN** una persona tiene una sesión activa
- **WHEN** abre «Pagos» desde la navegación
- **THEN** el portal muestra la página en `/pagos` y el botón «Exportar»

#### Scenario: Abrir Pagos sin sesión
- **GIVEN** una persona no tiene una sesión activa
- **WHEN** intenta abrir `/pagos`
- **THEN** el portal la redirige a `/login` y no permite acceder a la página ni descargar el CSV

### Requirement: Exportación CSV de pagos del mes anterior
El portal SHALL descargar, al seleccionar «Exportar», un CSV UTF-8 separado por comas con encabezados `fecha,monto,estado` y una fila por cada pago de la cuenta autenticada cuya fecha calendario pertenezca al mes anterior a la descarga. Cada fila SHALL contener la fecha en formato `AAAA-MM-DD`, el monto entero en pesos chilenos sin separadores ni símbolo y la etiqueta de estado en español.

#### Scenario: Exportar pagos del mes anterior de la cuenta
- **GIVEN** la descarga se solicita el 16 de octubre de 2026 y la cuenta autenticada tiene pagos del 5 y el 20 de septiembre de 2026 por 1280000 y 864000 pesos, con estados «Pagado» y «Pendiente»
- **WHEN** la persona selecciona «Exportar»
- **THEN** se descarga un CSV cuyo encabezado es `fecha,monto,estado` y que contiene una fila por esos dos pagos con sus fechas, montos y estados
- **AND** se incluye el pago «Pendiente» además del pago «Pagado»

#### Scenario: Incluir los días extremos y excluir fechas fuera del mes
- **GIVEN** la descarga se solicita el 16 de octubre de 2026 y la cuenta tiene pagos fechados el 31 de agosto, el 1 y el 30 de septiembre, y el 1 de octubre de 2026
- **WHEN** la persona selecciona «Exportar»
- **THEN** el CSV incluye los pagos del 1 y el 30 de septiembre y excluye los del 31 de agosto y el 1 de octubre

#### Scenario: Excluir pagos de otra cuenta
- **GIVEN** la descarga se solicita el 16 de octubre de 2026 y otra cuenta tiene un pago del 12 de septiembre de 2026
- **WHEN** la persona autenticada selecciona «Exportar»
- **THEN** el CSV no contiene la fila del pago de la otra cuenta

#### Scenario: Mes anterior sin pagos
- **GIVEN** la cuenta autenticada no tiene pagos en septiembre de 2026
- **WHEN** la persona selecciona «Exportar» el 16 de octubre de 2026
- **THEN** se descarga un CSV con el encabezado `fecha,monto,estado` y ninguna fila de datos

#### Scenario: Mes anterior al cambiar de año
- **GIVEN** la descarga se solicita el 16 de enero de 2026 y la cuenta tiene pagos el 31 de diciembre de 2025 y el 1 de enero de 2026
- **WHEN** la persona selecciona «Exportar»
- **THEN** el CSV incluye el pago del 31 de diciembre de 2025 y excluye el del 1 de enero de 2026
