## Context

IP-705 pide que el importe de «Saldo pendiente» en Inicio destaque en rojo. La spec fija un único escenario: aplicar `style={{ color: 'red' }}` directamente al elemento `<p className="card__value">` de esa tarjeta, mantener las otras dos tarjetas y sus enlaces actuales «Ver pedidos» a `/pedidos` y «Ver facturas» a `/facturas`. `HomePage` ya concentra las tres tarjetas, sus importes calculados y sus enlaces; no hay persistencia implicada en esta vista (`src/pages/HomePage.tsx`).

El repositorio organiza la interfaz por páginas y componentes en React/TypeScript, y documenta Vitest con Testing Library y los comandos `npm run lint`, `npm test -- --run` y `npm run build` (`README.md`, `openspec/config.yaml`, `package.json`, `src/pages/HomePage.test.tsx`). La convención general de estilos de `AGENTS.md` prohíbe estilos inline y pide pruebas unitarias para cambios de comportamiento; la propuesta y la spec de este cambio, en cambio, priorizan expresamente el atributo inline. No se encontraron ADR aplicables en las ubicaciones de ADR revisadas (`docs/adr/`, `adr/`, `docs/decisions/`).

## Goals / Non-Goals

**Goals**
- Mostrar en rojo, con el atributo inline exacto requerido, solo el importe de «Saldo pendiente».
- Mantener los valores y enlaces «Ver pedidos» y «Ver facturas» de las otras tarjetas.

**Non-Goals**
- Cambiar hojas CSS, los importes o su cálculo, las tarjetas restantes o sus enlaces.
- Introducir persistencia, dependencias, capas o nuevas reglas generales de estilo.

## Decisions

### 1. Aplicar el estilo inline solo al importe de «Saldo pendiente»

La spec «Destacar el saldo pendiente en Inicio», escenario «Destacar solo el importe de saldo pendiente», prescribe `style={{ color: 'red' }}` en el `<p className="card__value">` y conserva las tarjetas «Pedidos abiertos» y «Facturas por pagar» y sus enlaces. Decisión: añadir ese atributo únicamente al párrafo de «Saldo pendiente» en `src/pages/HomePage.tsx`, sin modificar las expresiones de los importes ni los enlaces; el test existente de Inicio documenta los destinos actuales y es el lugar de la cobertura unitaria del comportamiento (`src/pages/HomePage.test.tsx`). Esto constituye una excepción puntual y explícita a la prohibición de estilos inline de `AGENTS.md`; la spec y la aclaración que recoge la propuesta requieren este mecanismo, por lo que se descarta la alternativa de una clase CSS, que contradiría el requisito de no tocar hojas de estilo. Se reutiliza la página React existente, sin capa ni dependencia nueva (`README.md`, `openspec/config.yaml`, `package.json`). No hay ADR aplicable identificado que esta decisión contradiga.

## Risks / Trade-offs

- **El atributo inline de esta tarjeta contradice la convención general de `AGENTS.md` y puede normalizar excepciones de estilo.** Mitigación: limitar la desviación al único párrafo y al valor exacto que exige la spec, sin crear una convención general ni cambiar `src/styles/global.css` (`src/pages/HomePage.tsx`, `src/styles/global.css`).

## Migration Plan

Sin migración de datos: el cambio es solo de presentación en una página, y el repositorio describe el portal como una demostración sin servidor ni base de datos (`src/pages/HomePage.tsx`, `README.md`). Para revertirlo, se elimina el atributo inline de ese párrafo; los importes y datos permanecen intactos.
