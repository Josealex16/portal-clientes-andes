## Context

El cambio añade un aviso informativo estático al panel «Novedades» de Inicio. La spec define el texto exacto, exige que siga los tres avisos existentes y que las tarjetas y sus enlaces permanezcan iguales. El alcance corresponde al componente de página existente `src/pages/HomePage.tsx`; el repositorio es una aplicación Vite, React 18 y TypeScript, sin servidor ni base de datos (`openspec/config.yaml`, `README.md`).

## Goals / Non-Goals

- Cumplir el escenario «Ver el aviso de Providencia después de las novedades existentes», agregando el texto especificado como cuarto elemento.
- Cumplir el escenario «Conservar las tarjetas y enlaces de Inicio», sin alterar las tarjetas, los destinos, sus etiquetas ni los tres avisos actuales.
- No cambiar otras páginas, estilos, servicios, dependencias ni persistencia.

## Decisions

### 1. Añadir el aviso literal como cuarto elemento de la lista existente

El escenario «Ver el aviso de Providencia después de las novedades existentes» requiere el mismo orden y texto exacto; la lista actual ya contiene los tres avisos en `src/pages/HomePage.tsx`. Decisión: añadir un `<li>` estático después de esos elementos en la lista `.news` del mismo componente, reutilizando la estructura y presentación existentes. Sigue la organización descrita en `README.md` y el stack y verificación declarados en `openspec/config.yaml`; el componente y la lista actuales se respaldan en `src/pages/HomePage.tsx`. Las pruebas del proyecto usan Vitest y Testing Library, como muestran `package.json` y `src/pages/SupportPage.test.tsx`. No se añade lógica, componente ni servicio nuevo.

### 2. Mantener sin cambios las tarjetas, enlaces y novedades anteriores

El escenario «Conservar las tarjetas y enlaces de Inicio» exige conservar las tres tarjetas («Pedidos abiertos», «Facturas por pagar» y «Saldo pendiente») y sus destinos, además del orden de los tres avisos existentes. Decisión: limitar el cambio al elemento nuevo al final de la lista, dejando intacto el resto de `HomePage`; las etiquetas, destinos y avisos actuales están definidos en `src/pages/HomePage.tsx`. Esto respeta el alcance de página existente descrito en `README.md` y las convenciones del stack de `openspec/config.yaml`; `package.json` y `src/pages/SupportPage.test.tsx` documentan el framework de pruebas existente. No hay autenticación, entrada de usuario ni datos persistidos involucrados por este contenido estático.

## Risks / Trade-offs

- El aviso es texto estático dentro del componente, de modo que cambiarlo requiere modificar ese componente. Mitigación: limitarlo al texto exacto pedido y no introducir almacenamiento ni configuración que el alcance no requiere (`src/pages/HomePage.tsx`, `openspec/changes/change-ip-700/specs/home-news/spec.md`).

## Migration Plan

Sin migración de datos: el cambio solo agrega contenido estático de interfaz en `src/pages/HomePage.tsx`; no modifica esquemas, datos almacenados, eventos ni formatos persistidos (`README.md`). Reversión: retirar el `<li>` agregado, restaurando la lista previa; no se requiere operación de datos ni despliegue de esquema.
