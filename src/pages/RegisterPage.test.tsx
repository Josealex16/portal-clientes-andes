import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

describe('RegisterPage', () => {
  it('rechaza contraseñas distintas sin registrar una cuenta', async () => {
    const user = userEvent.setup()
    renderApp('/registro')

    await user.type(screen.getByLabelText('Nombre completo'), 'Ada Lovelace')
    await user.type(screen.getByLabelText('Correo electrónico'), 'ada@andes.example')
    await user.type(screen.getByLabelText('Contraseña'), 'Andes1234')
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'Andes5678')
    await user.click(screen.getByLabelText('Acepto los términos y condiciones del servicio'))
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(await screen.findByText('Las contraseñas no coinciden.')).toBeInTheDocument()
    expect(window.localStorage.getItem('andes.demo.users')).toBeNull()
  })
})
