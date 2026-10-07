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

## Tecnología

Vite, React 18, TypeScript, React Router 6, Vitest y Testing Library, ESLint 9.
