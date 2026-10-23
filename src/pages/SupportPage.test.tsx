import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SupportPage from './SupportPage'

describe('SupportPage', () => {
  it('muestra el correo de contacto directo como enlace mailto', () => {
    render(<SupportPage />)

    const emailLink = screen.getByRole('link', { name: 'soporte@andes.example' })

    expect(emailLink).toHaveAttribute('href', 'mailto:soporte@andes.example')
  })
})
