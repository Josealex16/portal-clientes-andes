## Context

El cambio incorpora dos aclaraciones estáticas, cada una en una página pública ya existente. Las páginas se implementan como componentes React en `src/pages/`; actualmente cada una presenta su subtítulo antes del contenido del formulario. La propuesta y la capacidad `auth-page-disclosures` especifican el texto literal y su posición inmediata después del subtítulo, sin modificar formularios ni estilos. El repositorio mantiene el contenido visible en español y exige una prueba unitaria por cambio de comportamiento (`AGENTS.md`); `openspec/config.yaml` identifica React 18 y define lint, pruebas y build como verificaciones del proyecto. No se encontraron ADR ni documentos de arquitectura aplicables en las ubicaciones convencionales consultadas.

## Goals / Non-Goals

**Goals**
- En `/login`, presentar inmediatamente debajo del subtítulo el párrafo exacto de ayuda para recuperar la contraseña.
- En `/registro`, presentar inmediatamente debajo del subtítulo el párrafo exacto sobre el uso de los datos.
- Mantener sin cambios los formularios, estilos y demás contenido o comportamiento de ambas páginas.

**Non-Goals**
- Añadir flujo de recuperación de contraseña, enlaces, formularios o llamadas a soporte.
- Cambiar el registro, el tratamiento de datos de la aplicación, los estilos o páginas distintas de ingreso y registro.

## Decisions

### 1. Presentar la aclaración de ayuda inmediatamente después del subtítulo de ingreso

El escenario **«Consultar la ayuda para recuperar la contraseña»** requiere que quien abre `/login` vea, justo después del subtítulo «Ingresa con tu cuenta para revisar tus pedidos y facturas.», el texto exacto «Si olvidaste tu contraseña, escribe a soporte@andes.example.». Decisión: añadir un párrafo estático en `LoginPage`, inmediatamente después del elemento de subtítulo existente, y dejar intactos el formulario y sus demás estados. Esto sigue el componente y la ubicación actuales (`src/pages/LoginPage.tsx`) y el idioma y la regla de cobertura unitaria del repositorio (`AGENTS.md`); el contexto del stack y sus comandos está en `openspec/config.yaml`, y `src/pages/LoginPage.test.tsx` muestra el patrón de pruebas de esa página. No hay ADR aplicable. Alternativa descartada: añadir un enlace o un flujo de recuperación; no lo pide el escenario y ampliaría el alcance.

### 2. Presentar la aclaración sobre los datos inmediatamente después del subtítulo de registro

El escenario **«Consultar el uso de los datos al registrarse»** requiere que quien abre `/registro` vea, justo después del subtítulo «Registra a tu empresa en el Portal de Clientes Andes.», el texto exacto «Tus datos se usan solo para gestionar tu cuenta.». Decisión: añadir un párrafo estático en `RegisterPage`, inmediatamente después del elemento de subtítulo existente, sin alterar el formulario ni el registro. Esto sigue el componente existente (`src/pages/RegisterPage.tsx`) y el idioma y la regla de cobertura unitaria del repositorio (`AGENTS.md`); `openspec/config.yaml` registra el stack y sus comandos, y `src/pages/RegisterPage.test.tsx` muestra el patrón de pruebas de esa página. No hay ADR aplicable. Alternativa descartada: crear un componente compartido de avisos; son dos textos y ubicaciones puntuales, por lo que no se justifica una abstracción nueva.

## Risks / Trade-offs

Las aclaraciones serán texto público y estático, tal como requieren los escenarios; no reciben entradas de usuario, no exponen datos de cuentas y no cambian autenticación, almacenamiento ni permisos. No se identifican riesgos técnicos o de seguridad adicionales para este cambio acotado. Mantener los textos literales y sus posiciones especificadas evita convertirlos en un flujo funcional distinto.

## Migration Plan

Sin migración de datos: el cambio solo añade texto a dos componentes de presentación y no modifica datos persistidos ni sus formatos. Para revertirlo, retirar los dos párrafos añadidos de `LoginPage` y `RegisterPage`; el contenido y estado preexistentes de las páginas permanecen sin cambios.
