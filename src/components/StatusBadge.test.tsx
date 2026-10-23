import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import StatusBadge from './StatusBadge'

describe('StatusBadge', () => {
  it.each([
    ['Vencida', 'badge--danger'],
    ['Pagada', 'badge--success'],
    ['Pendiente', 'badge--warning'],
    ['En preparación', 'badge--warning'],
    ['En camino', 'badge--info'],
    ['Entregado', 'badge--success'],
  ])('muestra %s con la clase %s', (status, tone) => {
    render(<StatusBadge status={status} />)

    expect(screen.getByText(status)).toHaveClass('badge', tone)
  })
})
