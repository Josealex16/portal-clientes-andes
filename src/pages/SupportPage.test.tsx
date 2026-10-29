import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SupportPage from './SupportPage'

describe('SupportPage', () => {
  it('muestra la introducción y el enlace de soporte inmediatamente debajo del título', () => {
    render(<SupportPage />)

    const title = screen.getByRole('heading', { name: 'Soporte' })
    const introduction = screen.getByText(
      'Need help? We usually reply within one business day.',
      { exact: true },
    )
    const emailLink = screen.getByRole('link', { name: 'Email support' })

    expect(title.nextElementSibling).toBe(introduction)
    expect(introduction.nextElementSibling).toBe(emailLink)
    expect(emailLink).toHaveAttribute('href', 'mailto:support@example.com')
  })

  it('muestra el nuevo horario inmediatamente después de la introducción y antes de Preguntas frecuentes', () => {
    render(<SupportPage />)

    const introduction = screen.getByText(
      'Resolvemos tus dudas sobre pedidos, facturas y tu cuenta.',
      { exact: true },
    )
    const hoursParagraph = screen.getByText(
      'Horario de atención: lunes a viernes, de 9:00 a 18:00.',
      { exact: true },
    )
    const faqHeading = screen.getByRole('heading', { name: 'Preguntas frecuentes' })
    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const faqPanel = faqHeading.parentElement
    if (!faqPanel) throw new Error('No se encontró el panel de Preguntas frecuentes')

    expect(hoursParagraph.previousElementSibling).toBe(introduction)
    expect(hoursParagraph.nextElementSibling).toBe(faqPanel)
    expect(faqHeading.compareDocumentPosition(contactHeading)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    )
  })

  it('conserva las tres preguntas frecuentes con sus respuestas actuales y en el mismo orden', () => {
    render(<SupportPage />)

    const faqHeading = screen.getByRole('heading', { name: 'Preguntas frecuentes' })
    const faqPanel = faqHeading.parentElement
    if (!faqPanel) throw new Error('No se encontró el panel de Preguntas frecuentes')

    expect(within(faqPanel).getAllByRole('term').map((term) => term.textContent)).toEqual([
      '¿Cómo descargo una factura?',
      '¿Puedo modificar un pedido en preparación?',
      '¿Cuál es el horario de atención?',
    ])
    expect(within(faqPanel).getAllByRole('definition').map((answer) => answer.textContent)).toEqual([
      'Ingresa a la sección Facturas y selecciona el documento que necesitas. Recibirás el PDF por correo.',
      'Sí, mientras el estado sea En preparación. Escríbenos con el número de pedido y los cambios requeridos.',
      'Nuestro equipo atiende de lunes a viernes, de 8:30 a 18:00 (hora de Santiago).',
    ])
  })

  it('muestra el correo de facturación en el bloque Contacto directo', () => {
    render(<SupportPage />)

    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const contactPanel = contactHeading.parentElement
    const billingEmailLine = screen.getByText('Correo de facturación: facturacion@andes.example', {
      exact: true,
    })

    expect(contactPanel).toContainElement(billingEmailLine)
  })

  it('muestra el horario de atención en el bloque Contacto directo', () => {
    render(<SupportPage />)

    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const contactPanel = contactHeading.parentElement
    const hoursLine = screen.getByText('Horario de atención: lunes a viernes de 09:00 a 18:00', {
      exact: true,
    })

    expect(contactPanel).toContainElement(hoursLine)
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

  it('conserva el correo de soporte y el teléfono en el bloque Contacto directo', () => {
    render(<SupportPage />)

    const contactHeading = screen.getByRole('heading', { name: 'Contacto directo' })
    const contactPanel = contactHeading.parentElement
    const supportEmailLine = screen.getByText('Correo: soporte@andes.example', { exact: true })
    const phoneLine = screen.getByText('Teléfono: +56 2 2555 0100', { exact: true })

    expect(contactPanel).toContainElement(supportEmailLine)
    expect(contactPanel).toContainElement(phoneLine)
  })
})
