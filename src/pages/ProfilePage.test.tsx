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

    const introduction = screen.getByText('Datos de tu cuenta en el portal.', {
      exact: true,
      selector: 'p',
    })
    const purposeParagraph = screen.getByText('Estos datos se usan para emitir tus facturas.', {
      exact: true,
      selector: 'p',
    })
    const panel = screen.getByText('Nombre').closest('.panel')
    const emailValue = screen.getByText('ana@andes.example', { exact: true })
    const emailDetails = emailValue.closest('dd')
    const emailPurpose = screen.getByText(
      'El correo electrónico se usa para iniciar sesión y recibir avisos sobre pedidos y facturas.',
      { exact: true, selector: 'p' },
    )
    const contactParagraph = screen.getByText(
      'Para cambiar tus datos escribe a soporte@andes.example.',
      { exact: true, selector: 'p' },
    )

    expect(introduction.nextElementSibling).toBe(purposeParagraph)
    expect(purposeParagraph.nextElementSibling).toBe(panel)
    expect(panel).toContainElement(screen.getByText('Ana Pérez', { exact: true }))
    expect(panel).toContainElement(screen.getByText('ana@andes.example', { exact: true }))
    expect(panel).toContainElement(screen.getByText('Andes', { exact: true }))
    expect(panel).toContainElement(screen.getByText('C-204', { exact: true }))
    expect(emailDetails).toHaveAttribute('aria-describedby', 'email-purpose')
    expect(emailDetails?.lastElementChild).toBe(emailPurpose)
    for (const label of ['Nombre', 'Empresa', 'Identificador de cliente']) {
      const field = screen.getByText(label, { exact: true }).parentElement
      const value = field?.querySelector('dd')

      expect(value).not.toHaveAttribute('aria-describedby')
      expect(value).not.toContainElement(emailPurpose)
    }
    expect(panel?.nextElementSibling).toBe(contactParagraph)
  })
})
