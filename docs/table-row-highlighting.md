# Filas de las tablas de Pedidos y Facturas

En las tablas de Pedidos y Facturas, las filas pares del cuerpo (`tbody`) usan el fondo `--color-surface-alt` cuando está definido; si no, usan `#f7f9fa`. Las filas impares conservan el fondo normal. El encabezado no participa en la alternancia.

Al pasar el cursor sobre una fila, esta usa el fondo `#eaf1f4`, tanto si es par como impar. Al retirar el cursor, recupera su fondo alterno o normal.

Por ejemplo, con cuatro filas de datos, las filas 2 y 4 tienen el fondo alterno y las filas 1 y 3 el fondo normal. Al pasar el cursor por la fila 2, se muestra `#eaf1f4`; al salir, vuelve al fondo alterno.
