import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { login } from '../services/authService'
import { renderApp } from '../test/renderApp'

describe('NotFoundPage', () => {
  it('muestra el acceso a Soporte debajo del enlace de inicio en una ruta inexistente', () => {
    login('demo@andes.example', 'Demo1234')
    renderApp('/pagina-inexistente')

    expect(screen.getByRole('heading', { name: 'Página no encontrada' })).toBeInTheDocument()

    const homeLink = screen.getByRole('link', { name: 'Volver al inicio' })
    const supportLink = screen.getByRole('link', { name: 'Ir a Soporte' })
    expect(homeLink).toHaveAttribute('href', '/')
    expect(supportLink).toHaveAttribute('href', '/soporte')
    expect(
      homeLink.compareDocumentPosition(supportLink) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(homeLink.parentElement?.nextElementSibling).toBe(supportLink.parentElement)
  })
})
