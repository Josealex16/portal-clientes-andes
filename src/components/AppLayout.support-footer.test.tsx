import { screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { login } from '../services/authService'
import { renderApp } from '../test/renderApp'

const SUPPORT_CONTACT = 'Soporte: soporte@andes.example · Lunes a viernes de 09:00 a 18:00'

describe('AppLayout - pie de contacto', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it.each([
    ['/', 'Hola, Camila'],
    ['/pedidos', 'Pedidos (5)'],
    ['/facturas', 'Facturas'],
    ['/soporte', 'Soporte'],
    ['/perfil', 'Mi perfil'],
    ['/ruta-autenticada-inexistente', 'Página no encontrada'],
  ])('muestra una única línea de soporte después del contenido en %s', (path, heading) => {
    login('demo@andes.example', 'Demo1234')
    renderApp(path)

    const main = screen.getByRole('main')
    expect(within(main).getByRole('heading', { name: heading })).toBeInTheDocument()

    const contactLines = screen.getAllByText(SUPPORT_CONTACT, { exact: true })
    expect(contactLines).toHaveLength(1)
    expect(main.compareDocumentPosition(contactLines[0]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it.each(['/login', '/registro'])('no muestra el pie de soporte en %s sin sesión', (path) => {
    renderApp(path)

    expect(screen.queryByText(SUPPORT_CONTACT, { exact: true })).not.toBeInTheDocument()
  })
})
