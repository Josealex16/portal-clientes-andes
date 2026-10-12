import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'

const USERS_KEY = 'andes.demo.users'
const SESSION_KEY = 'andes.demo.session'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('RegisterPage', () => {
  it('rechaza contraseñas distintas y no registra una cuenta', async () => {
    const user = userEvent.setup()
    renderApp('/registro')

    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Andes')
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@andes.example')
    await user.type(screen.getByLabelText('Contraseña'), 'Andes1234')
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'Andes5678')
    await user.click(screen.getByRole('checkbox', { name: /acepto los términos/i }))
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument()
    expect(window.localStorage.getItem(USERS_KEY)).toBeNull()
    expect(window.localStorage.getItem(SESSION_KEY)).toBeNull()
  })
})
