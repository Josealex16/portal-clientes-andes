import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import { useAuth } from '../context/AuthContext'
import { AuthError } from '../services/authService'
import '../styles/auth.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface LoginErrors {
  email?: string
  password?: string
}

function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {}
  if (!email.trim()) {
    errors.email = 'Ingresa tu correo electrónico.'
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }
  if (!password) {
    errors.password = 'Ingresa tu contraseña.'
  }
  return errors
}

export default function LoginPage() {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginErrors>({})
  const [formError, setFormError] = useState('')

  if (user) {
    return <Navigate to="/" replace />
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')
    const found = validateLogin(email, password)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    try {
      signIn(email, password)
      navigate('/')
    } catch (error) {
      setFormError(error instanceof AuthError ? error.message : 'No pudimos iniciar sesión. Intenta de nuevo.')
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__brand">
          <span className="header__logo" aria-hidden="true">A</span>
          <h1 className="auth__title">Portal de Clientes Andes</h1>
        </div>
        <p className="auth__subtitle">Ingresa con tu cuenta para revisar tus pedidos y facturas.</p>

        {formError && (
          <div className="banner banner--error" role="alert">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <button type="submit" className="btn btn--primary btn--block">
            Ingresar
          </button>
        </form>

        <p className="auth__footer">
          ¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
        <p className="auth__hint">Demo: demo@andes.example / Demo1234</p>
      </div>
    </div>
  )
}
