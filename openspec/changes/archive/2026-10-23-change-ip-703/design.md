## Context

La especificación `specs/home-amounts-disclosure/spec.md` requiere aclarar en Inicio, con una frase exacta, que los montos incluyen IVA y conservar las tres tarjetas y sus destinos actuales. `HomePage` ya contiene la introducción y las tarjetas; Inicio es la ruta índice de la aplicación (`src/pages/HomePage.tsx`, `src/App.tsx`). El README describe una aplicación cliente sin servidor ni base de datos y el contexto OpenSpec establece la interfaz en español y los comandos de verificación (`README.md`, `openspec/config.yaml`, `package.json`). No se encontraron archivos `AGENTS.md` ni ADR en las ubicaciones examinadas.

## Goals / Non-Goals

- Mostrar en la introducción de Inicio el texto exacto «Este es el resumen de tu cuenta al día de hoy. Los montos incluyen IVA.».
- Conservar las tarjetas «Pedidos abiertos», «Facturas por pagar» y «Saldo pendiente», y los enlaces «Ver pedidos» a `/pedidos`, «Ver facturas» a `/facturas` y «¿Dudas con tu saldo?» a `/soporte`.
- No modificar cálculos, importes, enlaces, etiquetas ni otras secciones de Inicio, ni introducir persistencia o cambios de seguridad.

## Decisions

### 1. Actualizar la introducción de Inicio con la aclaración literal de IVA

Escenario «Consultar la aclaración de IVA en Inicio»: se conservará la frase existente completa y se añadirá a continuación «Los montos incluyen IVA.», de modo que la introducción visible coincida literalmente con el requisito. Se limita el cambio al texto de `src/pages/HomePage.tsx`, que contiene hoy dicha introducción; `src/pages/HomePage.test.tsx` muestra el patrón de composición y cobertura de esta página. Esta decisión sigue la interfaz en español y el alcance acotado descritos en `openspec/config.yaml` y `README.md`, y los comandos establecidos en `openspec/config.yaml`, `README.md` y `package.json`. No hay ADR aplicable ni `AGENTS.md` en el repositorio. Alternativa descartada: sustituir la frase existente por una formulación distinta, porque no cumpliría el texto exacto solicitado.

### 2. Mantener las tarjetas y sus tres destinos existentes

Escenario «Conservar las tarjetas y enlaces de Inicio»: la aclaración no alterará las etiquetas, los importes calculados ni la disponibilidad y destino de los enlaces actuales. `src/pages/HomePage.tsx` define las tres tarjetas y sus rutas, y `src/pages/HomePage.test.tsx` documenta esas etiquetas y destinos; `src/App.tsx` confirma las rutas de Inicio, pedidos, facturas y soporte. Esta decisión respeta el alcance visible y las convenciones descritos en `openspec/config.yaml`, `README.md` y `package.json`; no hay ADR aplicable ni `AGENTS.md` en el repositorio. Alternativa descartada: reorganizar o modificar las tarjetas, pues la propuesta explícitamente las mantiene sin cambios.

## Risks / Trade-offs

No se identifican riesgos adicionales de seguridad: el cambio es texto estático, no recibe entradas nuevas, no cambia autorización ni maneja datos o credenciales. La aplicación no tiene almacenamiento de servidor ni base de datos (`README.md`), por lo que no hay datos persistidos afectados.

## Migration Plan

Sin migración de datos: solo cambia un literal de presentación en `src/pages/HomePage.tsx`; no se altera ningún esquema, dato almacenado ni formato persistido. La reversión consiste en restaurar la introducción anterior «Este es el resumen de tu cuenta al día de hoy.»; las tarjetas y enlaces permanecen intactos durante el cambio y la reversión.
