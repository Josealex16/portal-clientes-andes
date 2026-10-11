## ADDED Requirements
### Requirement: Registro exitoso
El portal SHALL crear una cuenta nueva cuando se envíen datos válidos y los términos estén aceptados. Después del éxito SHALL navegar a `/login` y mostrar un aviso de registro exitoso, sin errores JavaScript en la consola del navegador.

#### Scenario: Cuenta nueva registrada sin errores
- **GIVEN** el formulario contiene nombre, correo válido no registrado, contraseña válida, la misma confirmación y términos aceptados
- **WHEN** la persona selecciona «Crear cuenta»
- **THEN** la cuenta queda registrada y la aplicación navega a `/login` mostrando un aviso de registro exitoso
- **AND** la consola del navegador no contiene errores JavaScript causados por el registro

### Requirement: Contraseñas de registro coincidentes
El portal SHALL comparar la contraseña y su confirmación antes de registrar. Si no coinciden, SHALL mostrar «Las contraseñas no coinciden.» junto al campo «Confirmar contraseña» y SHALL omitir el intento de registro.

#### Scenario: Confirmación diferente
- **GIVEN** el formulario tiene datos válidos, términos aceptados, contraseña «Andes1234» y confirmación «Andes5678»
- **WHEN** la persona selecciona «Crear cuenta»
- **THEN** se muestra «Las contraseñas no coinciden.» junto al campo «Confirmar contraseña» y no se crea ninguna cuenta

### Requirement: Pruebas automatizadas de registro
El portal SHALL incluir pruebas automatizadas que verifiquen el resultado del registro exitoso y el rechazo de contraseñas distintas.

#### Scenario: Prueba automatizada de éxito
- **GIVEN** la suite automatizada de registro ejecutándose con almacenamiento limpio y datos válidos
- **WHEN** se envía el formulario con contraseñas coincidentes y términos aceptados
- **THEN** la prueba comprueba la creación de la cuenta, la navegación a `/login` y el aviso de éxito

#### Scenario: Prueba automatizada de contraseñas distintas
- **GIVEN** la suite automatizada de registro con contraseñas distintas y términos aceptados
- **WHEN** se envía el formulario
- **THEN** la prueba comprueba el mensaje junto a la confirmación y que la cuenta no se registra
