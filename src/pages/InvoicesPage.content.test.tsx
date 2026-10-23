import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate, invoices } from '../data/sampleData'
import InvoicesPage from './InvoicesPage'

describe('contenido de InvoicesPage', () => {
  it('muestra la orientación inmediatamente después de la aclaración de moneda y antes de la tabla', () => {
    render(<InvoicesPage />)

    const disclosure = screen.getByText('Los montos están expresados en pesos chilenos (CLP).')
    const supportMessage = screen.getByText(
      'Si una factura no aparece, escribe a soporte@andes.example.',
    )
    const table = screen.getByRole('table')

    expect(disclosure.nextElementSibling).toBe(supportMessage)
    expect(supportMessage.nextElementSibling).toBe(table.parentElement)
  })

  it('conserva las columnas y los cinco registros de facturas con sus datos', () => {
    const expectedInvoices = [
      { id: 'FAC-8812', issued: '2026-09-30', due: '2026-10-30', amount: 1280000, status: 'Pendiente' },
      { id: 'FAC-8790', issued: '2026-09-22', due: '2026-10-22', amount: 864000, status: 'Pendiente' },
      { id: 'FAC-8741', issued: '2026-09-13', due: '2026-10-13', amount: 2190000, status: 'Pagada' },
      { id: 'FAC-8702', issued: '2026-08-31', due: '2026-09-30', amount: 410000, status: 'Pagada' },
      { id: 'FAC-8655', issued: '2026-08-15', due: '2026-09-14', amount: 735000, status: 'Vencida' },
    ]
    render(<InvoicesPage />)

    expect(
      screen.getByText('Si una factura no aparece, escribe a soporte@andes.example.'),
    ).toBeInTheDocument()

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row')
    const dataRows = rows.slice(1)

    expect(invoices).toEqual(expectedInvoices)
    expect(within(table).getAllByRole('columnheader').map((header) => header.textContent)).toEqual([
      'N°',
      'Emisión',
      'Vencimiento',
      'Monto',
      'Estado',
    ])
    expect(dataRows).toHaveLength(5)
    expect(
      dataRows.map((row) => within(row).getAllByRole('cell')[0].textContent),
    ).toEqual(expectedInvoices.map((invoice) => invoice.id))

    expectedInvoices.forEach((invoice, index) => {
      const cells = within(dataRows[index]).getAllByRole('cell')

      expect(cells[1]).toHaveTextContent(formatDate(invoice.issued))
      expect(cells[2]).toHaveTextContent(formatDate(invoice.due))
      expect(cells[3]).toHaveTextContent(formatCurrency(invoice.amount))
      expect(cells[4]).toHaveTextContent(invoice.status)
    })
  })
})
