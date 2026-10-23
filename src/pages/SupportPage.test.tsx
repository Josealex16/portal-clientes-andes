import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SupportPage from './SupportPage'

describe('SupportPage', () => {
  it('muestra el horario de atención en el bloque Contacto directo', () => {
    render(<SupportPage />)

    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const contactPanel = contactHeading.parentElement
    const hoursLine = screen.getByText('Horario de atención: lunes a viernes de 09:00 a 18:00', {
      exact: true,
    })

    expect(contactPanel).toContainElement(hoursLine)
  })
})
