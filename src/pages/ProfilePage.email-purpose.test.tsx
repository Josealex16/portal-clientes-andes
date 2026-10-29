import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../context/AuthContext'
import ProfilePage from './ProfilePage'

describe('ProfilePage email purpose', () => {
  it('shows the email purpose below its value and associates it only with that field', () => {
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

    const emailValue = screen.getByText('ana@andes.example', { exact: true })
    const emailDetails = emailValue.closest('dd')
    const emailPurpose = screen.getByText(
      'El correo electrónico se usa para iniciar sesión y recibir avisos sobre pedidos y facturas.',
      { exact: true, selector: 'p' },
    )

    expect(emailDetails).toHaveAttribute('aria-describedby', 'email-purpose')
    expect(emailDetails?.lastElementChild).toBe(emailPurpose)

    for (const label of ['Nombre', 'Empresa', 'Identificador de cliente']) {
      const fieldValue = screen.getByText(label, { exact: true }).parentElement?.querySelector('dd')

      expect(fieldValue).not.toHaveAttribute('aria-describedby')
      expect(fieldValue).not.toContainElement(emailPurpose)
    }
  })
})
