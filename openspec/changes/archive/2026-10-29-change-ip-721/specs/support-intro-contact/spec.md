## Purpose
Esta capacidad presenta una orientación inicial en Soporte y ofrece un enlace de correo para que las personas puedan contactar directamente.

## ADDED Requirements

### Requirement: Introducción y correo de contacto en Soporte
La página Soporte SHALL mostrar inmediatamente debajo del título el párrafo exacto «Need help? We usually reply within one business day.» y debajo de ese párrafo un enlace visible con la etiqueta «Email support» y el destino `mailto:support@example.com`. La página SHALL conservar el contenido que ya mostraba.

#### Scenario: IP-725 Añadir la introducción y el enlace sin cambiar el contenido existente
- **GIVEN** la página Soporte muestra su título, la introducción «Resolvemos tus dudas sobre pedidos, facturas y tu cuenta.», el horario, las preguntas frecuentes y el bloque «Contacto directo»
- **WHEN** una persona abre la página Soporte
- **THEN** inmediatamente después del título ve el párrafo «Need help? We usually reply within one business day.»
- **AND** debajo de ese párrafo ve el enlace «Email support» cuyo destino es `mailto:support@example.com`
- **AND** la introducción existente, el horario, las preguntas frecuentes y el contenido del bloque «Contacto directo» permanecen sin cambios
