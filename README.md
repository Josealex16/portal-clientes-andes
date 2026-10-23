# Portal de Clientes Andes

Extranet de demostración para clientes de una distribuidora ficticia ("Andes"). Permite ingresar con una cuenta, crear una cuenta nueva y, una vez dentro, revisar el resumen de la cuenta, los pedidos, las facturas, el soporte y el perfil.

Todo el contenido es de ejemplo: no hay servidor ni base de datos. La autenticación es un servicio ficticio en memoria del navegador (`src/services/authService.ts`) que guarda usuarios y sesión en `localStorage`. No uses credenciales reales.

## Requisitos

- Node.js 20.19 o superior (se recomienda 22; ver `.nvmrc`)
- npm 10 o superior

## Cómo ejecutarla

```bash
npm ci
npm run dev
```

La aplicación queda disponible en http://localhost:5173 (o en el puerto indicado con `npm run dev -- --port 5180 --strictPort`).

## Credenciales de demostración

- Correo: `demo@andes.example`
- Contraseña: `Demo1234`

También puedes crear otra cuenta desde "Regístrate" en la pantalla de ingreso.

Al crear una cuenta con datos válidos y aceptar los términos, el portal guarda la cuenta y te lleva a la pantalla de ingreso con el aviso «Tu cuenta se creó correctamente. Inicia sesión para continuar.» Debes iniciar sesión explícitamente para entrar. Si la contraseña y su confirmación no coinciden, aparece «Las contraseñas no coinciden.» junto al campo «Confirmar contraseña» y no se registra la cuenta.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo de Vite |
| `npm run build` | Revisión de tipos (`tsc -b`) y build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run lint` | ESLint (configuración flat) |
| `npm test` | Vitest con Testing Library (usa `npm test -- --run` para una sola pasada) |

## Estructura

```
src/
  components/   Encabezado, menú lateral, layout y componentes compartidos
  context/      Contexto de autenticación
  data/         Datos de ejemplo (pedidos, facturas, preguntas frecuentes)
  pages/        Ingreso, registro, inicio, pedidos, facturas, soporte, perfil
  services/     Servicio de autenticación de demostración
  styles/       Hojas de estilo por área
  test/         Configuración y utilidades de pruebas
openspec/       Especificaciones del proyecto (OpenSpec)
```

## Fechas de facturas y pedidos

En las tablas de Facturas, las fechas de Emisión y Vencimiento, y en la tabla de Pedidos, la Fecha se muestran en formato día/mes/año (`DD/MM/AAAA`), con dos dígitos para el día y el mes. Por ejemplo, la fecha ISO `2026-09-30` se muestra como `30/09/2026`. La presentación no modifica los valores ISO de los datos.

En la tabla de Facturas, una factura «Pendiente» con vencimiento entre hoy y los tres días calendario siguientes, inclusive, muestra junto a la fecha el aviso `Vence en N días`, donde N es la diferencia en días calendario. Por ejemplo, si hoy es el 23/10/2026, una factura que vence el 26/10/2026 muestra `Vence en 3 días` y una que vence hoy muestra `Vence en 0 días`. No se muestra el aviso para facturas vencidas, con vencimiento posterior al plazo ni con otro estado. El cálculo usa el día calendario local del dispositivo; el aviso solo aparece en la tabla de Facturas y no modifica la fecha ISO.

## Estados de facturas y pedidos

Las insignias distinguen los estados por tono: «Pagada» y «Entregado» usan éxito; «Pendiente» y «En preparación», advertencia; «Vencida», peligro; y «En camino», informativo.

## Tecnología

Vite, React 18, TypeScript, React Router 6, Vitest y Testing Library, ESLint 9.
