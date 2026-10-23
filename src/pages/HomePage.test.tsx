import { screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderApp } from '../test/renderApp'

vi.mock('../data/sampleData', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../data/sampleData')>()),
  invoices: [
    { id: 'FAC-OVERDUE', issued: '2026-09-01', due: '2026-09-30', amount: 100, status: 'Vencida' },
    { id: 'FAC-PENDING-1', issued: '2026-09-02', due: '2026-10-30', amount: 200, status: 'Pendiente' },
    { id: 'FAC-PENDING-2', issued: '2026-09-03', due: '2026-10-31', amount: 300, status: 'Pendiente' },
    { id: 'FAC-PAID-1', issued: '2026-09-04', due: '2026-09-30', amount: 400, status: 'Pagada' },
    { id: 'FAC-PAID-2', issued: '2026-09-05', due: '2026-09-30', amount: 500, status: 'Pagada' },
  ],
}))

describe('HomePage', () => {
  it('muestra solo las facturas vencidas y enlaza a Facturas', () => {
    window.localStorage.setItem(
      'andes.demo.session',
      JSON.stringify({
        id: 'test-user',
        name: 'Ana Prueba',
        email: 'ana@example.test',
        company: 'Empresa de prueba',
      }),
    )
    renderApp('/')

    const cardHeading = screen.getByRole('heading', { name: 'Facturas vencidas' })
    const card = cardHeading.closest('article')
    expect(card).not.toBeNull()
    if (!card) throw new Error('No se encontró la tarjeta de facturas vencidas.')

    expect(within(card).getByText('1')).toBeInTheDocument()
    expect(within(card).getByRole('link', { name: 'Ver facturas' })).toHaveAttribute('href', '/facturas')
  })
})
