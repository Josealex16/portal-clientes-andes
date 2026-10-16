import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { login } from '../services/authService'
import { renderApp } from '../test/renderApp'

describe('AppLayout', () => {
  it('redirige al ingreso cuando no hay sesión', () => {
    renderApp('/pedidos')
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })

  it('muestra el encabezado con el usuario y el menú lateral', () => {
    login('demo@andes.example', 'Demo1234')
    renderApp('/')

    const header = screen.getByRole('banner')
    expect(within(header).getByText('Portal de Clientes Andes')).toBeInTheDocument()
    expect(within(header).getByText('Camila Rojas')).toBeInTheDocument()

    const menu = screen.getByRole('navigation', { name: 'Menú principal' })
    const labels = within(menu)
      .getAllByRole('link')
      .map((link) => link.textContent)
    expect(labels).toEqual(['Inicio', 'Pedidos', 'Facturas', 'Pagos', 'Soporte', 'Mi perfil'])
  })

  it('marca como activa la sección actual', () => {
    login('demo@andes.example', 'Demo1234')
    renderApp('/facturas')

    const menu = screen.getByRole('navigation', { name: 'Menú principal' })
    const links = within(menu).getAllByRole('link')
    expect(links.map((link) => link.textContent)).toEqual([
      'Inicio',
      'Pedidos',
      'Facturas',
      'Pagos',
      'Soporte',
      'Mi perfil',
    ])
    expect(within(menu).getByRole('link', { name: 'Facturas' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(within(menu).getByRole('link', { name: 'Pedidos' })).not.toHaveAttribute('aria-current')

    expect(screen.getByRole('heading', { name: 'Facturas' })).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('navega entre secciones desde el menú', async () => {
    const user = userEvent.setup()
    login('demo@andes.example', 'Demo1234')
    renderApp('/')
    await user.click(screen.getByRole('link', { name: 'Pedidos' }))
    expect(screen.getByRole('heading', { name: 'Pedidos' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Mi perfil' }))
    expect(screen.getByRole('heading', { name: 'Mi perfil' })).toBeInTheDocument()
  })

  it('permite acceder a Pagos desde el menú con sesión activa', async () => {
    const user = userEvent.setup()
    login('demo@andes.example', 'Demo1234')
    renderApp('/')

    await user.click(screen.getByRole('link', { name: 'Pagos' }))

    expect(screen.getByRole('heading', { name: 'Pagos' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Descargar CSV de pagos' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pagos' })).toHaveAttribute('aria-current', 'page')
  })

  it('redirige Pagos al ingreso y no presenta su página ni descarga sin sesión', () => {
    renderApp('/pagos')

    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Pagos' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Descargar CSV de pagos' })).not.toBeInTheDocument()
  })

  it('cierra la sesión', async () => {
    const user = userEvent.setup()
    login('demo@andes.example', 'Demo1234')
    renderApp('/')
    await user.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })
})
