import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../context/AuthContext'
import ProfilePage from './ProfilePage'

describe('ProfilePage', () => {
  it('indica cómo solicitar cambios y conserva los datos de la cuenta', () => {
    window.localStorage.setItem(
      'andes.demo.session',
      JSON.stringify({
        id: 'C-204',
        name: 'Ana Pérez',
        email: 'ana@andes.example',
        company: 'Andes',
      }),
    )

    render(
      <AuthProvider>
        <ProfilePage />
      </AuthProvider>,
    )

    const panel = screen.getByText('Nombre').closest('.panel')
    const contactParagraph = screen.getByText(
      'Para cambiar tus datos escribe a soporte@andes.example.',
      { exact: true, selector: 'p' },
    )

    expect(panel).toContainElement(screen.getByText('Ana Pérez', { exact: true }))
    expect(panel).toContainElement(screen.getByText('ana@andes.example', { exact: true }))
    expect(panel).toContainElement(screen.getByText('Andes', { exact: true }))
    expect(panel).toContainElement(screen.getByText('C-204', { exact: true }))
    expect(panel?.nextElementSibling).toBe(contactParagraph)
  })
})
