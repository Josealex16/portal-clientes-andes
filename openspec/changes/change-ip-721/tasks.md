## 1. Pedidos (IP-722)

- [ ] 1.1 IP-722: En `src/pages/OrdersPage.tsx`, deriva el contador de `ordersToDisplay` y muestra el título como `Pedidos (N)` sin cambiar el orden ni las filas de la tabla; amplía `src/pages/OrdersPage.test.tsx` con pruebas unitarias Vitest/Testing Library para que PED-2041 y PED-2037 den `Pedidos (2)` y sean las dos filas visibles sin PED-2029, una lista vacía dé `Pedidos (0)` y ninguna fila de pedido, y una lista filtrada recibida por la página cuente solo sus dos resultados sin añadir filtros; `npm run build`, `npm run lint` y `npm test -- --run` pasan.

## 2. Facturas (IP-723)

- [ ] 2.1 IP-723: En `src/pages/InvoicesPage.tsx`, deriva el contador de la misma colección `invoices` que genera la tabla y muestra el título como `Facturas (N)` sin cambiar filas ni columnas; amplía `src/pages/InvoicesPage.test.tsx` con pruebas unitarias Vitest/Testing Library usando colecciones de prueba para que FAC-8812 y FAC-8790 den `Facturas (2)` y sean las dos filas presentadas, y una lista vacía dé `Facturas (0)` sin filas de factura; `npm run build`, `npm run lint` y `npm test -- --run` pasan.

## 3. Mi perfil (IP-724)

- [ ] 3.1 IP-724: En `src/pages/ProfilePage.tsx`, conserva el párrafo «Estos datos se usan para emitir tus facturas.» inmediatamente después de la introducción y añade debajo del valor de Correo electrónico «El correo electrónico se usa para iniciar sesión y recibir avisos sobre pedidos y facturas.», enlazando el valor a esa ayuda con `aria-describedby` sin asociarla a otros campos; amplía `src/pages/ProfilePage.test.tsx` con pruebas unitarias Vitest/Testing Library que comprueben el orden del párrafo existente, los mismos datos visibles (Ana Pérez, ana@andes.example, Andes y C-204), la ayuda bajo el correo, su referencia accesible y que Nombre, Empresa e Identificador de cliente no muestran esa ayuda; `npm run build`, `npm run lint` y `npm test -- --run` pasan.

## 4. Soporte (IP-725)

- [ ] 4.1 IP-725: En `src/pages/SupportPage.tsx`, inserta inmediatamente debajo del título el párrafo exacto «Need help? We usually reply within one business day.» y debajo el enlace visible «Email support» con `href="mailto:support@example.com"`, conservando sin cambios la introducción existente, el horario, las preguntas frecuentes y todo el bloque «Contacto directo»; amplía `src/pages/SupportPage.test.tsx` con pruebas unitarias Vitest/Testing Library que comprueben orden, texto, destino del enlace y conservación del contenido existente; `npm run build`, `npm run lint` y `npm test -- --run` pasan.
