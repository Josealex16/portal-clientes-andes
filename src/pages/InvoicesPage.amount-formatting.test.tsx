import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const testData = vi.hoisted(() => ({
  invoices: [] as {
    id: string
    issued: string
    due: string
    amount: number
    status: 'Pendiente'
  }[],
}))

vi.mock('../data/sampleData', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../data/sampleData')>()),
  invoices: testData.invoices,
}))

import InvoicesPage from './InvoicesPage'

function setInvoiceAmount(amount: number) {
  testData.invoices.splice(0, testData.invoices.length, {
    id: 'FAC-FORMAT-TEST',
    issued: '2026-09-30',
    due: '2026-10-30',
    amount,
    status: 'Pendiente',
  })
}

describe('formato de los totales de Facturas', () => {
  beforeEach(() => {
    testData.invoices.splice(0)
  })

  it('muestra 1280000 y 864000 con agrupación española, dos decimales y la indicación CLP', () => {
    testData.invoices.push(
      {
        id: 'FAC-1280000',
        issued: '2026-09-30',
        due: '2026-10-30',
        amount: 1280000,
        status: 'Pendiente',
      },
      {
        id: 'FAC-864000',
        issued: '2026-09-30',
        due: '2026-10-30',
        amount: 864000,
        status: 'Pendiente',
      },
    )

    render(<InvoicesPage />)

    const firstRow = screen.getByRole('row', { name: /FAC-1280000/u })
    const secondRow = screen.getByRole('row', { name: /FAC-864000/u })
    expect(within(firstRow).getAllByRole('cell')[3].textContent?.replace(/^\D+/u, '')).toBe(
      '1.280.000,00',
    )
    expect(within(secondRow).getAllByRole('cell')[3].textContent?.replace(/^\D+/u, '')).toBe(
      '864.000,00',
    )
    expect(screen.getByText('Los montos están expresados en pesos chilenos (CLP).')).toBeInTheDocument()
  })

  it('muestra 1234.5 como 1.234,50 y conserva la indicación CLP', () => {
    setInvoiceAmount(1234.5)

    render(<InvoicesPage />)

    const row = screen.getByRole('row', { name: /FAC-FORMAT-TEST/u })
    expect(within(row).getAllByRole('cell')[3].textContent?.replace(/^\D+/u, '')).toBe('1.234,50')
    expect(screen.getByText('Los montos están expresados en pesos chilenos (CLP).')).toBeInTheDocument()
  })
})
