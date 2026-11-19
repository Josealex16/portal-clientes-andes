import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { formatDate, invoices } from '../data/sampleData'
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

  it('muestra la aclaración del formato inmediatamente después de la tabla', () => {
    render(<InvoicesPage />)

    const table = screen.getByRole('table')
    const disclosure = screen.getByText('Los documentos se descargan en formato PDF.')

    expect(table.parentElement?.nextElementSibling).toBe(disclosure)
    expect(disclosure.parentElement?.lastElementChild).toBe(disclosure)
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
    expect(screen.getByText('Los documentos se descargan en formato PDF.')).toBeInTheDocument()

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

    const expectedAmounts = ['1.280.000,00', '864.000,00', '2.190.000,00', '410.000,00', '735.000,00']
    expectedInvoices.forEach((invoice, index) => {
      const cells = within(dataRows[index]).getAllByRole('cell')

      expect(cells[1]).toHaveTextContent(formatDate(invoice.issued))
      expect(cells[2]).toHaveTextContent(formatDate(invoice.due))
      expect(cells[3].textContent?.replace(/^\D+/u, '')).toBe(expectedAmounts[index])
      expect(cells[4]).toHaveTextContent(invoice.status)
    })
  })

  it('formatea 1234.5 como un importe fraccionario y conserva la indicación CLP', () => {
    const originalInvoices = [...invoices]
    invoices.splice(
      0,
      invoices.length,
      { id: 'FAC-FRACTIONAL', issued: '2026-09-30', due: '2026-10-30', amount: 1234.5, status: 'Pendiente' },
    )

    try {
      render(<InvoicesPage />)

      const row = screen.getByRole('row', { name: /FAC-FRACTIONAL/ })
      expect(within(row).getAllByRole('cell')[3].textContent?.replace(/^\D+/u, '')).toBe(
        '1.234,50',
      )
      expect(screen.getByText('Los montos están expresados en pesos chilenos (CLP).')).toBeInTheDocument()
    } finally {
      invoices.splice(0, invoices.length, ...originalInvoices)
    }
  })
})
