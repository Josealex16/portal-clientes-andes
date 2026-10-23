## ADDED Requirements

### Requirement: Indicación para pedir ayuda desde Inicio
Inicio SHALL mostrar inmediatamente debajo de la frase de introducción el párrafo exacto «Para pedir ayuda, entra a Soporte desde el menú.» y SHALL conservar sin cambios los demás bloques de la página.

#### Scenario: Consultar cómo pedir ayuda sin alterar los demás bloques de Inicio
- **GIVEN** Inicio muestra la introducción «Este es el resumen de tu cuenta al día de hoy. Los montos incluyen IVA.», las tarjetas «Pedidos abiertos», «Facturas por pagar» y «Saldo pendiente», y las novedades existentes
- **WHEN** una persona consulta Inicio
- **THEN** ve inmediatamente debajo de la introducción el párrafo «Para pedir ayuda, entra a Soporte desde el menú.»
- **AND** las tres tarjetas conservan sus etiquetas y los enlaces «Ver pedidos» a `/pedidos`, «Ver facturas» a `/facturas` y «¿Dudas con tu saldo?» a `/soporte`
- **AND** la lista «Novedades» conserva en el mismo orden «Nuevo horario de despachos: martes y jueves por la mañana.», «Ya puedes solicitar copias de tus facturas desde la sección Soporte.», «Mantención programada del portal el sábado de 02:00 a 04:00.» y «Atención presencial en la oficina de Providencia, de lunes a viernes.»
