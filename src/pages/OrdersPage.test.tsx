import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { formatCurrency, orders } from '../data/sampleData'
import OrdersPage from './OrdersPage'

describe('OrdersPage', () => {
  it('muestra el total de todos los pedidos después de sus cinco filas', () => {
    render(<OrdersPage />)

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row')
    const totalRow = rows[rows.length - 1]
    const totalCells = within(totalRow).getAllByRole('cell')

    expect(orders.map((order) => order.total)).toEqual([
      1_280_000,
      864_000,
      2_190_000,
      410_000,
      735_000,
    ])
    expect(rows).toHaveLength(orders.length + 2)
    expect(
      rows.slice(1, -1).map((row) => within(row).getAllByRole('cell')[0].textContent),
    ).toEqual(orders.map((order) => order.id))
    expect(totalCells).toHaveLength(3)
    expect(totalCells[0]).toHaveAttribute('colspan', '3')
    expect(totalCells[0]).toHaveTextContent('Total de pedidos')
    expect(totalCells[1]).toHaveTextContent(formatCurrency(5_479_000))
    expect(totalCells[2]).toBeEmptyDOMElement()
  })
})
