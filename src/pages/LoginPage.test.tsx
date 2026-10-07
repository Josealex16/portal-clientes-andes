import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from '../test/renderApp'
import { getSession } from '../services/authService'

describe('LoginPage', () => {
  it('muestra el formulario de ingreso', () => {
    renderApp('/login')
    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
  })

  it('valida los campos vacíos', async () => {
    const user = userEvent.setup()
    renderApp('/login')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(screen.getByText('Ingresa tu correo electrónico.')).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu contraseña.')).toBeInTheDocument()
  })

  it('rechaza un correo con formato inválido', async () => {
    const user = userEvent.setup()
    renderApp('/login')
    await user.type(screen.getByLabelText('Correo electrónico'), 'correo-sin-arroba')
    await user.type(screen.getByLabelText('Contraseña'), 'Demo1234')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(screen.getByText('Ingresa un correo electrónico válido.')).toBeInTheDocument()
  })

  it('muestra un error con credenciales incorrectas', async () => {
    const user = userEvent.setup()
    renderApp('/login')
    await user.type(screen.getByLabelText('Correo electrónico'), 'demo@andes.example')
    await user.type(screen.getByLabelText('Contraseña'), 'Incorrecta1')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(await screen.findByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
    expect(getSession()).toBeNull()
  })

  it('inicia sesión con las credenciales de demostración', async () => {
    const user = userEvent.setup()
    renderApp('/login')
    await user.type(screen.getByLabelText('Correo electrónico'), 'demo@andes.example')
    await user.type(screen.getByLabelText('Contraseña'), 'Demo1234')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(await screen.findByRole('heading', { name: /Hola, Camila/ })).toBeInTheDocument()
    expect(getSession()?.email).toBe('demo@andes.example')
  })
})
