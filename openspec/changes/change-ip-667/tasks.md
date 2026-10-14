## 1. Estilos del menú y layout adaptable

- [x] 1.1 Ajustar `src/styles/sidebar.css` para que el ancho y la cuadrícula permitan mostrar completas Inicio, Pedidos, Facturas, Soporte y Mi perfil con iconos y textos alineados, y para que el fondo activo y la barra indicadora queden dentro del enlace sin desplazamientos; conservar rutas y etiquetas. Actualizar `src/styles/layout.css` y las reglas responsivas de Sidebar para disponer el menú en fila superior dentro del flujo a menos de 900 px y lateral junto al contenido a partir de 900 px inclusive. Añadir comprobaciones automatizadas de reglas/estilos compatibles con Vitest (`css: false`, sin nuevas dependencias) que cubran el layout y las etiquetas a 899, 900 y 901 px; `npm run lint`, `npm test -- --run` y `npm run build` pasan. (Estimación: 230 líneas cambiadas.)

## 2. Pruebas de navegación autenticada

- [ ] 2.1 Ampliar `src/components/AppLayout.test.tsx` usando `login` y `renderApp` para probar en `/facturas` que las cinco etiquetas son completas, Facturas tiene `aria-current="page"` y Pedidos no, y que la vista autenticada conserva la navegación y el contenido esperado en el flujo integrado; incluir cobertura de los escenarios de etiquetas/iconos y opción activa de `client-navigation`. `npm run lint`, `npm test -- --run` y `npm run build` pasan. (Estimación: 100 líneas cambiadas.)
