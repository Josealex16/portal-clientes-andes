import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { login } from '../services/authService'
import { renderApp } from '../test/renderApp'

const SUPPORT_CONTACT = 'Soporte: soporte@andes.example · Lunes a viernes de 09:00 a 18:00'

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

    const menu = screen.getByRole('navigation', { name: 'Menú principal' })
    const links = within(menu).getAllByRole('link')
    expect(links.map((link) => link.textContent)).toEqual([
      'Inicio',
      'Pedidos',
      'Facturas',
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

  it('cierra la sesión', async () => {
    const user = userEvent.setup()
    login('demo@andes.example', 'Demo1234')
    renderApp('/')
    await user.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })

  it.each([
    ['/', 'Hola, Camila'],
    ['/pedidos', 'Pedidos'],
    ['/facturas', 'Facturas'],
    ['/soporte', 'Soporte'],
    ['/perfil', 'Mi perfil'],
    ['/ruta-inexistente', 'Página no encontrada'],
  ])('muestra una sola línea de contacto después de %s', (path, heading) => {
    login('demo@andes.example', 'Demo1234')
    renderApp(path)

    const content = screen.getByRole('main')
    expect(within(content).getByRole('heading', { name: heading })).toBeInTheDocument()

    const footers = screen.getAllByText(SUPPORT_CONTACT, { exact: true })
    expect(footers).toHaveLength(1)
    expect(content.compareDocumentPosition(footers[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it.each(['/login', '/registro'])('no muestra el pie sin sesión en %s', (path) => {
    renderApp(path)

    expect(screen.queryByText(SUPPORT_CONTACT, { exact: true })).not.toBeInTheDocument()
  })
})
