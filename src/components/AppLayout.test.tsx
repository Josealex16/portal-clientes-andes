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
    expect(labels).toEqual(['Inicio', 'Pedidos', 'Facturas', 'Soporte', 'Mi perfil'])
  })

  it('marca como activa la sección actual', () => {
    login('demo@andes.example', 'Demo1234')
    renderApp('/facturas')
    expect(screen.getByRole('link', { name: 'Facturas' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Pedidos' })).not.toHaveAttribute('aria-current')
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

  it('cierra la sesión', async () => {
    const user = userEvent.setup()
    login('demo@andes.example', 'Demo1234')
    renderApp('/')
    await user.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })
})
