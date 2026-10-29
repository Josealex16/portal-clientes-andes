## Context

IP-721 reúne cuatro cambios de presentación independientes en Pedidos, Facturas, Mi perfil y Soporte. Las páginas actuales renderizan sus tablas y datos directamente desde sus props o desde los datos de ejemplo; Mi perfil ya muestra el párrafo sobre el uso de los datos generales, y Soporte ya contiene el horario, las preguntas frecuentes y el bloque de contacto. El cambio conserva esas estructuras y los datos existentes, y añade únicamente los contadores y textos/enlace exigidos por las especificaciones.

El repositorio es una aplicación Vite con React y TypeScript organizada en páginas, datos y componentes (`README.md`, `openspec/config.yaml`). Se mantienen sus reglas: estilos solo en hojas CSS, textos visibles en español y prueba unitaria por cambio de comportamiento (`AGENTS.md`). La verificación documentada es `npm run lint`, `npm test -- --run` y `npm run build` (`openspec/config.yaml`). No se encontraron ADR en `docs/adr/`, `adr/` ni `docs/decisions/`.

## Goals / Non-Goals

**Goals**
- Mostrar junto a los títulos de Pedidos y Facturas el número de filas de sus tablas, incluyendo el caso vacío y, para Pedidos, cualquier lista ya filtrada que se entregue a la página.
- Comunicar el propósito de los datos del perfil y enlazar accesiblemente la ayuda con el valor de Correo electrónico, manteniendo visibles los datos de cuenta actuales.
- Añadir en Soporte exactamente la introducción y el enlace de correo pedidos, sin alterar su contenido actual.

**Non-Goals**
- Añadir controles de filtrado o búsqueda, cambiar columnas o filas de las tablas, o modificar el modelo de datos, la autenticación o la persistencia.
- Reescribir textos, horarios, preguntas frecuentes o datos de contacto existentes, salvo la adición requerida en Soporte.

## Decisions

### 1. El contador de Pedidos se deriva de la misma lista que se representa

La tabla de `OrdersPage` representa los elementos de `ordersToDisplay` (ordenándolos en una copia) y ya admite recibir una lista alternativa; no hay que introducir un filtro ni otra fuente del contador. Se mostrará el título `Pedidos (N)` usando la longitud de esa lista, que equivale a las filas de datos representadas. Así, los casos IP-722 de dos filas visibles, lista vacía y filtro que deja dos resultados muestran respectivamente `Pedidos (2)`, `Pedidos (0)` y `Pedidos (2)`; no se añade un filtro nuevo. Decisión coherente con la página y su patrón de props (`src/pages/OrdersPage.tsx`), la cobertura existente de orden y filas (`src/pages/OrdersPage.test.tsx`), la exigencia de pruebas unitarias (`AGENTS.md`) y los comandos del proyecto (`openspec/config.yaml`); requisito: `openspec/changes/change-ip-721/specs/orders-list-count/spec.md`. No hay ADR aplicable. Se descarta contar otra colección o el número total de origen, porque podría no corresponder a las filas visibles.

### 2. El contador de Facturas corresponde a las facturas que se recorren en la tabla

La tabla de Facturas se genera recorriendo `invoices`, así que el título usará la longitud de esa misma colección y el formato `Facturas (N)`. Los escenarios IP-723 de dos filas y lista vacía producirán `Facturas (2)` y `Facturas (0)` sin cambiar las filas o columnas. Decisión basada en `src/pages/InvoicesPage.tsx`, en la cobertura de contenido actual de `src/pages/InvoicesPage.content.test.tsx` y `src/pages/InvoicesPage.test.tsx`, en `AGENTS.md` y en la verificación definida en `openspec/config.yaml`; requisito: `openspec/changes/change-ip-721/specs/invoices-list-count/spec.md`. No hay ADR aplicable. Se descarta una consulta o estado separado para el total: la especificación pide contar las filas ya presentadas.

### 3. La ayuda del correo se asocia al valor del campo sin modificar la cuenta

Se conserva el párrafo existente «Estos datos se usan para emitir tus facturas.» inmediatamente después de la introducción. El valor de Correo electrónico mostrará debajo el texto exacto «El correo electrónico se usa para iniciar sesión y recibir avisos sobre pedidos y facturas.» y lo referenciará mediante `aria-describedby`; ningún otro campo recibirá esa ayuda. Nombre, correo, empresa e identificador permanecen visibles sin cambios en el escenario de conservación de datos. La página ya obtiene y presenta los valores actuales (`src/pages/ProfilePage.tsx`) y su cobertura verifica el orden y la conservación (`src/pages/ProfilePage.test.tsx`); se siguen `AGENTS.md` y `openspec/config.yaml`. Requisito: `openspec/changes/change-ip-721/specs/profile-data-purpose/spec.md`. No se encontró ADR aplicable. Se descarta convertir el correo de solo lectura en un formulario o cambiar el modelo, que no son requisitos.

### 4. Soporte agrega solo el texto y el enlace de contacto especificados

Inmediatamente bajo el título se insertará el párrafo literal «Need help? We usually reply within one business day.» y, a continuación, un enlace visible «Email support» con `href="mailto:support@example.com"`. La introducción española, el horario, las preguntas frecuentes y todo el bloque «Contacto directo» permanecen sin cambios, como exige IP-725. La página y las pruebas de su contenido existente están en `src/pages/SupportPage.tsx`, `src/pages/SupportPage.test.tsx` y `src/pages/SupportPage.contact-hours.test.tsx`; se aplican `AGENTS.md` y `openspec/config.yaml`. Requisito: `openspec/changes/change-ip-721/specs/support-intro-contact/spec.md`. No hay ADR aplicable. Aunque `AGENTS.md` establece español para los textos visibles, en este único texto se respeta la frase exacta en inglés requerida por la especificación; el resto de la página permanece igual. Se descarta reemplazar o traducir el texto requerido, pues incumpliría la aceptación.

## Risks / Trade-offs

- `AGENTS.md` prescribe textos visibles en español, mientras que la especificación de Soporte prescribe dos cadenas exactas en inglés. Mitigación: limitar la excepción a esas cadenas requeridas y no modificar los otros textos de la página.
- El enlace de Soporte abre el manejador de correo del dispositivo del usuario y no envía un formulario desde el portal. Mitigación: usar únicamente el destino fijo `mailto:support@example.com` especificado; no incorporar datos de cuenta ni valores suministrados por el usuario al destino. No se añade endpoint, almacenamiento ni cambio de autenticación.

## Migration Plan

No hay migración de datos: el cambio solo altera la presentación de colecciones y datos ya existentes; no modifica esquemas, archivos ni persistencia. Para revertirlo, se revierten los cambios de presentación en las cuatro páginas. Los datos de cuenta y las filas existentes no requieren restauración ni transformación.
