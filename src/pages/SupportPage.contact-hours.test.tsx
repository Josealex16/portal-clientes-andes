import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SupportPage from './SupportPage'

describe('horario de atención de Soporte', () => {
  it('muestra el horario inmediatamente después de la introducción y antes de las preguntas frecuentes', () => {
    render(<SupportPage />)

    const introduction = screen.getByText(
      'Resolvemos tus dudas sobre pedidos, facturas y tu cuenta.',
      { exact: true },
    )
    const hours = screen.getByText(
      'Horario de atención: lunes a viernes, de 9:00 a 18:00.',
      { exact: true },
    )
    const faqHeading = screen.getByRole('heading', { name: 'Preguntas frecuentes' })

    expect(hours.previousElementSibling).toBe(introduction)
    expect(hours.nextElementSibling).toBe(faqHeading.parentElement)
  })
})
