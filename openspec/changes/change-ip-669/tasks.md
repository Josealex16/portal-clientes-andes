## 1. Datos y generación CSV

- [ ] 1.1 Añade el modelo `Payment` con `accountId`, fecha calendario, monto CLP entero y estado en español, datos ficticios separados de las facturas y un generador CSV puro en `src/data/sampleData.ts`; sus pruebas unitarias en `src/data/sampleData.test.ts` cubren «Exportar todos los pagos del mes anterior» (incluidos estados distintos y solo pagos de la cuenta), «Incluir los extremos del mes anterior y excluir fechas adyacentes» y «Mes anterior sin pagos» (solo encabezado), además de encabezado y formatos exactos `fecha,monto,estado`, `AAAA-MM-DD` y monto entero sin formato; `npm run build`, `npm run lint` y `npm test` pasan.

## 2. Página y acceso autenticado

- [ ] 2.1 Crea `src/pages/PaymentsPage.tsx` y conecta `/pagos` bajo `AppLayout` en `src/App.tsx` y el enlace «Pagos» en `src/components/Sidebar.tsx`; la página usa el `user.id` autenticado para descargar el resultado del generador como Blob CSV UTF-8 desde una acción visible. Las pruebas unitarias de interfaz con Vitest/Testing Library en `src/pages/PaymentsPage.test.tsx` y `src/components/AppLayout.test.tsx` cubren «Acceso autenticado a Pagos» (enlace, página, acción y descarga) y «Acceso a Pagos sin sesión» (redirige a `/login` y no muestra página ni acción), y comprueban contenido y tipo CSV de la descarga; `npm run build`, `npm run lint` y `npm test` pasan.
