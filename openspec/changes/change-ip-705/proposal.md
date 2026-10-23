## Why
IP-705 solicita destacar en rojo el importe de «Saldo pendiente» en Inicio, porque actualmente se ve igual que las otras tarjetas y puede pasar inadvertido. El ticket y la respuesta de aclaración especifican que el rojo se aplique con `style={{ color: 'red' }}` directamente en el elemento, sin modificar hojas de estilo.

## What Changes
- Mostrar en rojo el importe de «Saldo pendiente» mediante el atributo `style` inline en su elemento `<p className="card__value">`.
- Mantener sin cambios las otras dos tarjetas de Inicio.

## Capabilities
### New Capabilities
- Ninguna.

### Modified Capabilities
- `home-amounts-disclosure`: destaca en rojo el importe de «Saldo pendiente» en Inicio.

## Impact
El cambio se limita al elemento del importe de «Saldo pendiente» en `src/pages/HomePage.tsx`; no se modifican hojas de estilo ni las otras dos tarjetas. Como supuesto confirmado en la respuesta de aclaración, para este alcance prevalece el atributo inline expresamente solicitado por el ticket sobre la convención general de `AGENTS.md` de definir estilos en hojas CSS.
