import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { login } from '../services/authService'
import { renderApp } from '../test/renderApp'

describe('NotFoundPage', () => {
  it('muestra el acceso a Soporte debajo del enlace de inicio en una ruta inexistente', () => {
    login('demo@andes.example', 'Demo1234')
    renderApp('/facturas-viejas')

    const heading = screen.getByRole('heading', { name: 'Página no encontrada' })
    const requestedPath = screen.getByText('No encontramos /facturas-viejas')
    const introduction = screen.getByText('La dirección que buscas no existe o fue movida.')
    const returnGuidance = screen.getByText('Vuelve al inicio desde el menú lateral.')
    expect(heading).toBeInTheDocument()
    expect(heading.nextElementSibling).toBe(requestedPath)
    expect(introduction).toBeInTheDocument()
    expect(introduction.nextElementSibling).toBe(returnGuidance)
    expect(returnGuidance).toBeInTheDocument()

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
