import { render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { invoices } from '../data/sampleData'
import InvoicesPage from './InvoicesPage'

const initialInvoices = [...invoices]

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
  invoices.splice(0, invoices.length, ...initialInvoices)
})

describe('InvoicesPage', () => {
  it('muestra el contador de las dos facturas presentadas', () => {
    invoices.splice(
      0,
      invoices.length,
      { id: 'FAC-8812', issued: '2026-09-30', due: '2026-10-30', amount: 1280000, status: 'Pendiente' },
      { id: 'FAC-8790', issued: '2026-09-22', due: '2026-10-22', amount: 864000, status: 'Pendiente' },
    )

    render(<InvoicesPage />)

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row').slice(1)

    expect(screen.getByRole('heading', { name: 'Facturas (2)' })).toBeInTheDocument()
    expect(rows.map((row) => within(row).getAllByRole('cell')[0].textContent)).toEqual([
      'FAC-8812',
      'FAC-8790',
    ])
    expect(within(rows[0]).getAllByRole('cell')[3].textContent?.replace(/^\D+/u, '')).toBe(
      '1.280.000,00',
    )
    expect(within(rows[1]).getAllByRole('cell')[3].textContent?.replace(/^\D+/u, '')).toBe(
      '864.000,00',
    )
    expect(screen.getByText('Los montos están expresados en pesos chilenos (CLP).')).toBeInTheDocument()
  })

  it('muestra los importes fraccionarios de Facturas con dos decimales y conserva la indicación CLP', () => {
    invoices.splice(
      0,
      invoices.length,
      { id: 'FAC-FRACTIONAL', issued: '2026-09-30', due: '2026-10-30', amount: 1234.5, status: 'Pendiente' },
    )

    render(<InvoicesPage />)

    const row = screen.getByRole('row', { name: /FAC-FRACTIONAL/ })

    expect(within(row).getAllByRole('cell')[3].textContent?.replace(/^\D+/u, '')).toBe('1.234,50')
    expect(screen.getByText('Los montos están expresados en pesos chilenos (CLP).')).toBeInTheDocument()
  })

  it('muestra el mensaje vacío en lugar de la tabla y conserva el contenido informativo', () => {
    invoices.splice(0, invoices.length)

    render(<InvoicesPage />)

    const introduction = screen.getByText(
      'Documentos emitidos a tu empresa y su estado de pago.',
      { exact: true },
    )
    const currencyDisclosure = screen.getByText(
      'Los montos están expresados en pesos chilenos (CLP).',
      { exact: true },
    )
    const supportMessage = screen.getByText(
      'Si una factura no aparece, escribe a soporte@andes.example.',
      { exact: true },
    )
    const emptyMessage = screen.getByText('Todavía no hay facturas.', { exact: true })
    const pdfDisclosure = screen.getByText('Los documentos se descargan en formato PDF.', {
      exact: true,
    })

    expect(screen.getByRole('heading', { name: 'Facturas (0)' })).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(introduction.nextElementSibling).toBe(currencyDisclosure)
    expect(currencyDisclosure.nextElementSibling).toBe(supportMessage)
    expect(supportMessage.nextElementSibling).toBe(emptyMessage)
    expect(emptyMessage.nextElementSibling).toBe(pdfDisclosure)
    expect(pdfDisclosure.nextElementSibling).toBeNull()
  })

  it('muestra la aclaración de moneda inmediatamente después de la introducción y antes de la tabla', () => {
    render(<InvoicesPage />)

    const introduction = screen.getByText('Documentos emitidos a tu empresa y su estado de pago.')
    const disclosure = screen.getByText('Los montos están expresados en pesos chilenos (CLP).')
    const table = screen.getByRole('table')

    expect(disclosure).toHaveTextContent('Los montos están expresados en pesos chilenos (CLP).')
    expect(introduction.nextElementSibling).toBe(disclosure)
    expect(disclosure.nextElementSibling).toHaveTextContent(
      'Si una factura no aparece, escribe a soporte@andes.example.',
    )
    expect(disclosure.nextElementSibling?.nextElementSibling).toBe(table.parentElement)
  })

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
