import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SupportPage from './SupportPage'

describe('SupportPage', () => {
  it('muestra el correo de facturación en el bloque Contacto directo', () => {
    render(<SupportPage />)

    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const contactPanel = contactHeading.parentElement
    const billingEmailLine = screen.getByText('Correo de facturación: facturacion@andes.example', {
      exact: true,
    })

    expect(contactPanel).toContainElement(billingEmailLine)
  })

  it('Consultar el horario de atención en Contacto directo', () => {
    render(<SupportPage />)

    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const contactPanel = contactHeading.parentElement
    const hoursLine = screen.getByText('Horario de atención: lunes a viernes de 09:00 a 18:00', {
      exact: true,
    })

    expect(contactPanel).toContainElement(hoursLine)
  })

  it('Consultar tiempo de respuesta sin alterar las otras líneas', () => {
    render(<SupportPage />)

    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const contactPanel = contactHeading.parentElement
    const responseLine = screen.getByText('Tiempo de respuesta: hasta 24 horas hábiles.', {
      exact: true,
    })

    expect(contactPanel).toContainElement(responseLine)
    expect(
      Array.from(contactPanel?.querySelectorAll('p') ?? [], (line) => line.textContent),
    ).toEqual([
      'Correo: soporte@andes.example',
      'Correo de facturación: facturacion@andes.example',
      'Teléfono: +56 2 2555 0100',
      'Oficina: Av. Providencia 1234, Santiago',
      'Horario de atención: lunes a viernes de 09:00 a 18:00',
      'Tiempo de respuesta: hasta 24 horas hábiles.',
    ])
  })

  it('muestra la dirección de la oficina en el bloque Contacto directo', () => {
    render(<SupportPage />)

    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const contactPanel = contactHeading.parentElement
    const officeAddressLine = screen.getByText('Oficina: Av. Providencia 1234, Santiago', {
      exact: true,
    })

    expect(contactPanel).toContainElement(officeAddressLine)
  })
})
