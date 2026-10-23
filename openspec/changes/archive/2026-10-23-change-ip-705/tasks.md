## 1. Inicio

- [x] 1.1 Destacar únicamente el importe de «Saldo pendiente» con `style={{ color: 'red' }}` en su `<p className="card__value">` de `src/pages/HomePage.tsx`; ampliar `src/pages/HomePage.test.tsx` con pruebas unitarias que comprueben el estilo inline exacto solo en ese importe, que «Pedidos abiertos» conserva el valor 2 y «Facturas por pagar» el valor 3, sin alterar sus enlaces actuales a `/pedidos` y `/facturas`; `npm test -- --run`, `npm run build` y `npm run lint` pasan.
