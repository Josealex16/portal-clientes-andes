## Why
IP-707 solicita dos aclaraciones breves para las páginas públicas de ingreso y registro. Actualmente esas páginas muestran sus subtítulos, pero no ofrecen la orientación específica sobre cómo pedir ayuda para recuperar la contraseña ni explican el uso de los datos; añadir los párrafos indicados hace visible esa información sin alterar los formularios ni sus estilos.

## What Changes
- Agregar debajo del subtítulo de ingreso el párrafo «Si olvidaste tu contraseña, escribe a soporte@andes.example.».
- Agregar debajo del subtítulo de registro el párrafo «Tus datos se usan solo para gestionar tu cuenta.».

## Capabilities
### New Capabilities
- `auth-page-disclosures`: añade las aclaraciones indicadas a las páginas públicas de ingreso y registro.

### Modified Capabilities
- Ninguna.

## Impact
El cambio afecta `src/pages/LoginPage.tsx` y `src/pages/RegisterPage.tsx`, y establece el comportamiento en la nueva capacidad `auth-page-disclosures`. Se asume que cada texto se presenta como un párrafo inmediatamente después del subtítulo correspondiente. No se modifican formularios, estilos ni otras páginas. Aunque el ticket indica que cada cambio es independiente y debe ir en su propia tarea, esta especificación cubre ambos párrafos solicitados por IP-707; su ejecución podrá separarse en tareas posteriores.
