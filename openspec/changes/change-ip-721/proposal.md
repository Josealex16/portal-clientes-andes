## Why
IP-721 agrupa las historias IP-722, IP-723, IP-724 e IP-725 para que los clientes vean cuántas filas aparecen en Pedidos y Facturas, entiendan el uso del correo en Mi perfil y encuentren una vía directa de contacto desde Soporte.

## What Changes
- Mostrar junto a los títulos de Pedidos y Facturas el número de filas visibles en cada tabla, incluido cero cuando no haya filas.
- Añadir bajo el valor de Correo electrónico en Mi perfil un texto que explique su uso y asociarlo al campo mediante `aria-describedby`.
- Añadir en Soporte la introducción y el enlace de contacto especificados para IP-725, sin cambiar el resto de su contenido.
- Conservar los datos del perfil y las filas y columnas actuales de las tablas.

## Capabilities
### New Capabilities
- `orders-list-count`: muestra el número de filas de pedido visibles junto al título de Pedidos.
- `invoices-list-count`: muestra el número de filas de factura visibles junto al título de Facturas.
- `support-intro-contact`: añade en Soporte la introducción y el enlace de correo solicitados.

### Modified Capabilities
- `profile-data-purpose`: amplía el propósito comunicado en Mi perfil con una explicación accesible del uso del correo electrónico.

## Impact
El cambio afecta `src/pages/OrdersPage.tsx`, `src/pages/InvoicesPage.tsx`, `src/pages/ProfilePage.tsx` y `src/pages/SupportPage.tsx`, junto con sus pruebas unitarias. No requiere cambios al modelo de datos ni a la autenticación. Actualmente Pedidos no tiene controles de filtro o búsqueda; se asume que su contador refleja las filas efectivamente visibles y, si hay un filtro o búsqueda activa, solo cuenta las filas resultantes, sin agregar un filtro nuevo. Para IP-724 se asume que el texto auxiliar aparece inmediatamente debajo del valor de Correo electrónico y que ese valor referencia el texto con `aria-describedby`. La descripción de IP-721 excluye Soporte, pero la respuesta más reciente para IP-725 pide una modificación concreta de esa página; se resuelve la contradicción incluyendo IP-725 en el alcance a pesar de la exclusión general.

## Orden de las historias
1. IP-722: mostrar el número de pedidos visibles junto al título de Pedidos.
2. IP-723: mostrar el número de facturas visibles junto al título de Facturas.
3. IP-724: explicar el uso del correo electrónico en Mi perfil y asociarlo para tecnologías de asistencia.
4. IP-725: añadir la introducción y el enlace de correo a Soporte.

## Dependencias entre historias
Ninguna. Las cuatro historias modifican páginas independientes y pueden implementarse en el orden indicado sin depender entre sí.

## Lagunas y supuestos
- IP-722: el código actual no presenta filtros ni búsquedas en Pedidos; el contador cuenta las filas mostradas y seguirá el resultado si se presenta una lista filtrada, sin incorporar controles de filtrado.
- IP-724: el valor existente de Correo electrónico es de solo lectura; se asocia a él el texto auxiliar con `aria-describedby`, sin añadir un formulario ni cambiar otros campos.
- IP-725: aunque la descripción de IP-721 excluye la página Soporte, la respuesta de aclaración de esta historia requiere expresamente cambiarla. Se toma la respuesta como la definición más reciente y se incluye IP-725 en el alcance.
