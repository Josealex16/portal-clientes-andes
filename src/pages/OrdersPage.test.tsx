import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { formatCurrency, orders, type Order } from '../data/sampleData'
import OrdersPage from './OrdersPage'

const expectedOrders: Order[] = [
  {
    id: 'PED-2041',
    date: '2026-09-28',
    description: 'Resmas de papel carta (40 cajas)',
    total: 1280000,
    status: 'En preparación',
  },
  {
    id: 'PED-2037',
    date: '2026-09-21',
    description: 'Toner para impresoras láser (12 u.)',
    total: 864000,
    status: 'En camino',
  },
  {
    id: 'PED-2029',
    date: '2026-09-12',
    description: 'Sillas ergonómicas (6 u.)',
    total: 2190000,
    status: 'Entregado',
  },
  {
    id: 'PED-2018',
    date: '2026-08-30',
    description: 'Archivadores y carpetas (200 u.)',
    total: 410000,
    status: 'Entregado',
  },
  {
    id: 'PED-2003',
    date: '2026-08-14',
    description: 'Pizarras de pared (4 u.)',
    total: 735000,
    status: 'Entregado',
  },
]

describe('OrdersPage', () => {
  it('muestra la aclaración del orden inmediatamente después de la introducción y antes de la tabla', () => {
    render(<OrdersPage />)

    const introduction = screen.getByText('Historial reciente de pedidos de tu empresa.')
    const disclosure = screen.getByText('Los pedidos se ordenan del más reciente al más antiguo.')
    const table = screen.getByRole('table')

    expect(disclosure).toHaveTextContent('Los pedidos se ordenan del más reciente al más antiguo.')
    expect(introduction.nextElementSibling).toBe(disclosure)
    expect(disclosure.nextElementSibling).toBe(table.parentElement)
  })

  it('muestra los pedidos en orden cronológico descendente', () => {
    render(<OrdersPage />)

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row').slice(1)

    expect(rows.map((row) => within(row).getAllByRole('cell')[0].textContent)).toEqual([
      'PED-2041',
      'PED-2037',
      'PED-2029',
      'PED-2018',
      'PED-2003',
    ])
    expect(within(rows[0]).getByText('PED-2041')).toBeInTheDocument()
    expect(within(rows[rows.length - 1]).getByText('PED-2003')).toBeInTheDocument()
  })

  it('muestra la nota exacta inmediatamente después de la tabla y como último contenido', () => {
    render(<OrdersPage />)

    const table = screen.getByRole('table')
    const note = screen.getByText('Para consultar un envío, escribe a soporte@andes.example.', { exact: true })

    expect(table.parentElement?.nextElementSibling).toBe(note)
    expect(note.nextElementSibling).toBeNull()
    expect(note.parentElement?.lastElementChild).toBe(note)
  })

  it('ordena por fecha descendente cuando los pedidos llegan en orden inverso', () => {
    render(<OrdersPage ordersToDisplay={[...expectedOrders].reverse()} />)

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row').slice(1)

    expect(rows.map((row) => within(row).getAllByRole('cell')[0].textContent)).toEqual([
      'PED-2041',
      'PED-2037',
      'PED-2029',
      'PED-2018',
      'PED-2003',
    ])
  })

  it('muestra el contador y solo los pedidos visibles', () => {
    render(<OrdersPage ordersToDisplay={expectedOrders.slice(0, 2)} />)

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row').slice(1)

    expect(screen.getByRole('heading', { name: 'Pedidos (2)' })).toBeInTheDocument()
    expect(rows.map((row) => within(row).getAllByRole('cell')[0].textContent)).toEqual([
      'PED-2041',
      'PED-2037',
    ])
    expect(within(table).queryByText('PED-2029')).not.toBeInTheDocument()
  })

  it('muestra cero y ninguna fila de pedido cuando la lista está vacía', () => {
    render(<OrdersPage ordersToDisplay={[]} />)

    const table = screen.getByRole('table')

    expect(screen.getByRole('heading', { name: 'Pedidos (0)' })).toBeInTheDocument()
    expect(within(table).getAllByRole('row')).toHaveLength(1)
  })

  it('cuenta solo los resultados filtrados que recibe la página', () => {
    const filteredOrders = expectedOrders.slice(0, 2)
    render(<OrdersPage ordersToDisplay={filteredOrders} />)

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row').slice(1)

    expect(screen.getByRole('heading', { name: 'Pedidos (2)' })).toBeInTheDocument()
    expect(rows.map((row) => within(row).getAllByRole('cell')[0].textContent)).toEqual([
      'PED-2041',
      'PED-2037',
    ])
  })

  it('conserva las columnas, el formato de fecha y los valores de cada pedido sin mutar orders', () => {
    const originalOrders = [...orders]
    Object.freeze(orders)

    render(<OrdersPage />)

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row')
    expect(screen.getByText('Para consultar un envío, escribe a soporte@andes.example.', { exact: true }))
      .toBeInTheDocument()

    expect(within(rows[0]).getAllByRole('columnheader').map((header) => header.textContent)).toEqual([
      'N°',
      'Fecha',
      'Detalle',
      'Total',
      'Estado',
    ])
    expect(rows.slice(1).map((row) =>
      within(row).getAllByRole('cell').map((cell) => cell.textContent),
    )).toEqual(
      expectedOrders.map((order) => [
        order.id,
        `${order.date.slice(8, 10)}/${order.date.slice(5, 7)}/${order.date.slice(0, 4)}`,
        order.description,
        formatCurrency(order.total),
        order.status,
      ]),
    )
    expect(orders).toEqual(expectedOrders)
    expect(orders).toEqual(originalOrders)
  })
})
