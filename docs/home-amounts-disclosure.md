# Aclaración de los montos de Inicio

La introducción de Inicio muestra: «Este es el resumen de tu cuenta al día de hoy. Los montos incluyen IVA.». Esta aclaración informa que los montos del resumen incluyen IVA.

Inmediatamente después de la introducción, Inicio muestra el párrafo «Para pedir ayuda, entra a Soporte desde el menú.». Es una indicación de texto; no agrega un enlace directo.

En la tarjeta «Saldo pendiente», el importe se muestra en rojo mediante `style={{ color: 'red' }}` aplicado directamente al elemento `<p className="card__value">`. Las tarjetas «Pedidos abiertos» y «Facturas por pagar» conservan sus valores y sus enlaces «Ver pedidos» a `/pedidos` y «Ver facturas» a `/facturas`; el enlace «¿Dudas con tu saldo?» continúa apuntando a `/soporte`.
