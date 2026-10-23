import { render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { invoices } from '../data/sampleData'
import InvoicesPage from './InvoicesPage'

vi.mock('../data/sampleData', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../data/sampleData')>()),
  invoices: [
    { id: 'FAC-26', issued: '2026-09-30', due: '2026-10-26', amount: 100, status: 'Pendiente' },
    { id: 'FAC-23', issued: '2026-09-30', due: '2026-10-23', amount: 200, status: 'Pendiente' },
    { id: 'FAC-27', issued: '2026-09-30', due: '2026-10-27', amount: 300, status: 'Pendiente' },
    { id: 'FAC-22', issued: '2026-09-30', due: '2026-10-22', amount: 400, status: 'Pendiente' },
    { id: 'FAC-PAID', issued: '2026-09-30', due: '2026-10-26', amount: 500, status: 'Pagada' },
  ],
}))

beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date(2026, 9, 23))
})

afterEach(() => {
  vi.useRealTimers()
})

describe('InvoicesPage', () => {
  it('muestra tres días junto a la fecha en la celda Vencimiento de la tabla', () => {
    render(<InvoicesPage />)

    const table = screen.getByRole('table')
    const row = within(table).getByRole('row', { name: /FAC-26/ })
    const dueCell = within(row).getAllByRole('cell')[2]
    const notice = within(dueCell).getByText('Vence en 3 días')

    expect(dueCell).toHaveTextContent('26/10/2026')
    expect(table).toContainElement(notice)
    expect(screen.getAllByText('Vence en 3 días')).toHaveLength(1)
    expect(invoices[0].due).toBe('2026-10-26')
  })

  it('muestra cero días cuando una factura pendiente vence hoy', () => {
    render(<InvoicesPage />)

    const row = screen.getByRole('row', { name: /FAC-23/ })
    const dueCell = within(row).getAllByRole('cell')[2]

    expect(dueCell).toHaveTextContent('23/10/2026')
    expect(within(dueCell).getByText('Vence en 0 días')).toBeInTheDocument()
    expect(invoices[1].due).toBe('2026-10-23')
  })

  it('no muestra el aviso para vencimientos posteriores al plazo ni pasados', () => {
    render(<InvoicesPage />)

    for (const [id, formattedDate] of [
      ['FAC-27', '27/10/2026'],
      ['FAC-22', '22/10/2026'],
    ]) {
      const row = screen.getByRole('row', { name: new RegExp(id) })
      const dueCell = within(row).getAllByRole('cell')[2]

      expect(dueCell).toHaveTextContent(formattedDate)
      expect(dueCell).not.toHaveTextContent('Vence en')
    }
  })

  it('no muestra el aviso para una factura pagada dentro del plazo', () => {
    render(<InvoicesPage />)

    const row = screen.getByRole('row', { name: /FAC-PAID/ })
    const dueCell = within(row).getAllByRole('cell')[2]

    expect(dueCell).toHaveTextContent('26/10/2026')
    expect(dueCell).not.toHaveTextContent('Vence en')
    expect(invoices[4].due).toBe('2026-10-26')
  })

  it('limita todos los avisos de vencimiento a la tabla de Facturas', () => {
    render(<InvoicesPage />)

    const table = screen.getByRole('table')
    const notices = screen.getAllByText(/^Vence en \d+ días$/)

    expect(notices.length).toBeGreaterThan(0)
    for (const notice of notices) {
      expect(table).toContainElement(notice)
    }
  })
})
