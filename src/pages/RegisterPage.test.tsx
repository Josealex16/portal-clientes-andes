import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useLocation, useNavigate } from 'react-router-dom'
import { renderApp } from '../test/renderApp'

const USERS_KEY = 'andes.demo.users'
const SESSION_KEY = 'andes.demo.session'

function LocationStateProbe() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>
      <output data-testid="location-state">
        {JSON.stringify({ pathname: location.pathname, state: location.state })}
      </output>
      <button type="button" onClick={() => navigate('/registro')}>Reiniciar</button>
    </>
  )
}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('RegisterPage', () => {
  it('muestra la aclaración sobre el uso de los datos inmediatamente después del subtítulo', () => {
    renderApp('/registro')
    const subtitle = screen.getByText('Registra a tu empresa en el Portal de Clientes Andes.')
    const disclosure = screen.getByText('Tus datos se usan solo para gestionar tu cuenta.', { exact: true })

    expect(disclosure.tagName).toBe('P')
    expect(subtitle.nextElementSibling).toBe(disclosure)
  })

  it('conserva los controles del formulario junto con la aclaración sobre los datos', () => {
    renderApp('/registro')

    expect(screen.getByText('Tus datos se usan solo para gestionar tu cuenta.', { exact: true })).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre completo')).toBeInTheDocument()
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirmar contraseña')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Acepto los términos y condiciones del servicio' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Crear cuenta' })).toBeInTheDocument()
  })

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

  it('registra una cuenta y navega al ingreso con el estado de éxito sin errores JavaScript', async () => {
    const user = userEvent.setup()
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    renderApp('/registro', <LocationStateProbe />)

    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Andes')
    await user.type(screen.getByLabelText('Correo electrónico'), 'ana@andes.example')
    await user.type(screen.getByLabelText('Contraseña'), 'Andes1234')
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'Andes1234')
    await user.click(screen.getByRole('checkbox', { name: /acepto los términos/i }))
    await user.click(screen.getByRole('button', { name: 'Crear cuenta' }))

    await waitFor(() => {
      expect(window.localStorage.getItem(USERS_KEY)).toContain('ana@andes.example')
      expect(screen.getByRole('heading', { name: 'Portal de Clientes Andes' })).toBeInTheDocument()
    })
    expect(screen.getByTestId('location-state')).toHaveTextContent(
      JSON.stringify({ pathname: '/login', state: { registrationSuccess: true } }),
    )
    expect(window.localStorage.getItem(SESSION_KEY)).toBeNull()
    expect(consoleError).not.toHaveBeenCalled()
    consoleError.mockRestore()
  })
})
