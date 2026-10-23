## Context

La propuesta y la especificación `date-formatting` agregan un aviso `Vence en N días` junto al vencimiento de las facturas pendientes que vencen entre hoy y tres días calendario después, inclusive; el aviso corresponde solo a la tabla de Facturas. `src/pages/InvoicesPage.tsx` ya presenta allí la fecha con `formatDate` y recorre las facturas existentes; `src/data/sampleData.ts` conserva vencimientos como cadenas ISO `AAAA-MM-DD` y estados explícitos. El portal es una SPA de React y TypeScript, sin servidor ni base de datos, según `README.md`; `src/App.tsx` asigna páginas separadas a Facturas, Pedidos e Inicio. No se encontraron `AGENTS.md` ni ADR en las ubicaciones del repositorio exploradas; las convenciones verificadas están en `README.md` y `openspec/config.yaml`.

## Goals / Non-Goals

**Goals**
- Mostrar el texto exacto `Vence en N días` junto a la fecha formateada para facturas «Pendiente» con diferencia de 0 a 3 días calendario inclusive.
- No mostrar el aviso para fechas anteriores a hoy, posteriores al plazo, ni estados distintos de «Pendiente».
- Mantener el aviso exclusivamente en la tabla de Facturas y conservar las fechas ISO originales.

**Non-Goals**
- Cambiar otras pantallas, la presentación de Pedidos, los estados o el formato de fecha existente.
- Cambiar datos, persistencia, servicios, rutas, dependencias o mecanismos de autenticación.

## Decisions

### 1. Calcular los días restantes como diferencia de fechas calendario en la página Facturas

El vencimiento ya se recibe como fecha ISO sin hora y la regla de la especificación compara días calendario, no horas. Decisión: mantener un cálculo puro y local a `src/pages/InvoicesPage.tsx`, derivar la fecha de hoy del calendario local del dispositivo y calcular la diferencia entre componentes de fecha con aritmética de días calendario (sin comparar horas ni milisegundos locales); aplicar la ventana inclusiva de 0 a 3 días solo si el estado es exactamente «Pendiente». Para el escenario «Factura pendiente que vence dentro de tres días», 23/10/2026 a 26/10/2026 da N=3; para «Vencimiento en la fecha actual», da N=0; el escenario «Vencimiento fuera del plazo o ya pasado» excluye las fechas 27/10/2026 y 22/10/2026; «Factura no pendiente dentro del plazo» excluye «Pagada». Se conserva `formatDate` para representar la fecha, sin modificar la cadena ISO. Esta ubicación respeta el módulo de páginas y la separación de datos descritos en `README.md`, las tecnologías y el comando de verificación configurados en `openspec/config.yaml`, y el uso existente de `invoices`/`formatDate` en `src/pages/InvoicesPage.tsx` y `src/data/sampleData.ts`; `src/data/sampleData.test.ts` documenta el patrón de pruebas unitarias del proyecto. No hay ADR aplicable ni `AGENTS.md` localizado. Se descarta poner el cálculo en un servicio compartido porque el único consumidor que requiere esta regla es esta tabla.

### 2. Renderizar el aviso condicionalmente en la celda Vencimiento de Facturas

La especificación limita el aviso a una sola tabla y lo requiere junto a la fecha. Decisión: conservar la fecha formateada y, en la misma celda de Vencimiento en `src/pages/InvoicesPage.tsx`, añadir el texto exacto `Vence en N días` únicamente cuando el cálculo de la decisión 1 está entre 0 y 3 inclusive; mantenerlo ausente en todos los demás casos. Así queda cubierto también el escenario «Aviso limitado a la tabla de Facturas»: fuera de esa tabla no se añade texto. No se cambia `src/pages/OrdersPage.tsx`, `src/pages/HomePage.tsx`, ni la ruta compartida, coherente con el alcance por módulos descrito en `README.md` y las rutas distintas de `src/App.tsx`; el contrato existente del formato se conserva como muestran `src/data/sampleData.ts` y `src/data/sampleData.test.ts`. Se sigue el stack y la verificación definidos en `openspec/config.yaml`; no hay ADR aplicable ni `AGENTS.md` localizado. Se descarta modificar `StatusBadge`, pues la insignia representa el estado de factura, no el aviso de vencimiento (`src/components/StatusBadge.tsx`).

## Risks / Trade-offs

- La especificación no fija zona horaria y el portal no tiene una fuente horaria de servidor. Un reloj o zona local incorrectos podrían desplazar el aviso respecto de la fecha que espera el negocio; el cálculo usa solo el día calendario local y evita sensibilidad a horas y cambios de horario estacional. No se usa el aviso como dato persistido ni como decisión financiera.
- La presentación depende del calendario local del dispositivo del usuario; se limita a la celda de Vencimiento en la tabla y no altera el valor de fecha original, el estado ni otras vistas, manteniendo acotado el efecto de una diferencia horaria.

## Migration Plan

Sin migración de datos: el cambio solo deriva texto de presentación de la fecha ISO y el estado ya existentes; `README.md` confirma que no hay servidor ni base de datos, y `src/data/sampleData.ts` contiene los datos de ejemplo en su formato actual. Desplegar el cambio de interfaz junto con el cálculo local. Para revertirlo, retirar el cálculo y el texto condicional de la celda Vencimiento; no hay datos que restaurar.
