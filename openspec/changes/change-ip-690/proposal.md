## Why
IP-690 solicita dos mejoras pequeñas en el portal de Clientes Andes: identificar de inmediato las facturas vencidas desde Inicio y consultar el horario de atención en Soporte sin buscarlo entre otras preguntas. Hoy Inicio no distingue las facturas vencidas y Soporte no presenta ese horario en un panel dedicado antes del contacto directo.

## What Changes
- Añadir a las tarjetas de resumen de Inicio una tarjeta «Facturas vencidas» con el total correspondiente a las facturas de ejemplo cuyo estado es «Vencida» y un enlace «Ver facturas» a `/facturas`.
- Añadir en Soporte un panel «Horario de atención» con el horario solicitado, antes del panel de contacto directo.
- Mantener ambas mejoras independientes y cubrir sus resultados visibles en las pruebas unitarias de cada página.

## Capabilities
### New Capabilities
- `home-overdue-invoices`: muestra en Inicio el total de facturas vencidas y permite abrir Facturas.
- `support-hours`: presenta el horario de atención en Soporte antes del contacto directo.

### Modified Capabilities
- Ninguna.

## Impact
El alcance se limita a las páginas Inicio y Soporte y a la cobertura unitaria de sus resultados visibles; se asume que ambas adiciones reutilizan las tarjetas y paneles ya existentes y no requieren estilos globales ni cambios en otras pantallas. El conteo se deriva de los datos de ejemplo actuales y considera vencidas solo las facturas cuyo estado es exactamente «Vencida»; con los datos actuales el total es 1. No se cambia la sección de preguntas frecuentes ni el contenido del contacto directo.
