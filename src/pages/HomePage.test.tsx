import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../context/AuthContext'
import HomePage from './HomePage'

function renderHomePage() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('muestra las novedades existentes en orden seguidas del aviso de Providencia', () => {
    renderHomePage()

    const newsPanel = screen.getByRole('heading', { name: 'Novedades' }).parentElement
    if (!newsPanel) throw new Error('No se encontró el panel de Novedades')
    const news = within(newsPanel).getByRole('list')

    expect(within(news).getAllByRole('listitem').map((item) => item.textContent)).toEqual([
      'Nuevo horario de despachos: martes y jueves por la mañana.',
      'Ya puedes solicitar copias de tus facturas desde la sección Soporte.',
      'Mantención programada del portal el sábado de 02:00 a 04:00.',
      'Atención presencial en la oficina de Providencia, de lunes a viernes.',
    ])
  })

  it('conserva las tarjetas de Inicio y los destinos de sus enlaces', () => {
    renderHomePage()

    const ordersCard = screen.getByRole('heading', { name: 'Pedidos abiertos' }).closest('article')
    if (!ordersCard) throw new Error('No se encontró la tarjeta Pedidos abiertos')
    expect(within(ordersCard).getByRole('link', { name: 'Ver pedidos' })).toHaveAttribute(
      'href',
      '/pedidos',
    )

    const invoicesCard = screen.getByRole('heading', { name: 'Facturas por pagar' }).closest('article')
    if (!invoicesCard) throw new Error('No se encontró la tarjeta Facturas por pagar')
    expect(within(invoicesCard).getByRole('link', { name: 'Ver facturas' })).toHaveAttribute(
      'href',
      '/facturas',
    )

    const balanceCard = screen.getByRole('heading', { name: 'Saldo pendiente' }).closest('article')
    if (!balanceCard) throw new Error('No se encontró la tarjeta Saldo pendiente')
    expect(within(balanceCard).getByRole('link', { name: '¿Dudas con tu saldo?' })).toHaveAttribute(
      'href',
      '/soporte',
    )
  })
})
