import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import { AuthError, register } from '../services/authService'
import '../styles/auth.css'

type RegisterForm = Record<string, string>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const GENERIC_ERROR = 'Ocurrió un error inesperado. Intenta de nuevo.'

const INITIAL_FORM: RegisterForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: '',
}

function validate(form: RegisterForm): RegisterForm {
  const errors: RegisterForm = {}
  if (form.name.trim().length < 3) {
    errors.name = 'Ingresa tu nombre completo.'
  }
  if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }
  if (form.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.'
  }
  if (!form.acceptTerms) {
    errors.acceptTerms = 'Debes aceptar los términos y condiciones.'
  }
  if (Object.keys(errors).length > 0) return errors

  if (form.password !== form.passwordConfirm.trim()) {
    errors.confirmPassword = 'Las contraseñas no coinciden.'
  }
  return errors
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<RegisterForm>({})
  const [formError, setFormError] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? (checked ? 'true' : '') : value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    try {
      const found = validate(form)
      setErrors(found)
      if (Object.keys(found).length > 0) return

      register({ name: form.name, email: form.email, password: form.password })
      navigate('/login')
    } catch (error) {
      setFormError(error instanceof AuthError ? error.message : GENERIC_ERROR)
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <div className="auth__brand">
          <span className="header__logo" aria-hidden="true">A</span>
          <h1 className="auth__title">Crear cuenta</h1>
        </div>
        <p className="auth__subtitle">Registra a tu empresa en el Portal de Clientes Andes.</p>

        {formError && (
          <div className="banner banner--error" role="alert">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Nombre completo"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormField
            label="Correo electrónico"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <FormField
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <div className="check">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={Boolean(form.acceptTerms)}
              onChange={handleChange}
            />
            <label htmlFor="acceptTerms">Acepto los términos y condiciones del servicio</label>
          </div>
          {errors.acceptTerms && <p className="field__error">{errors.acceptTerms}</p>}

          <button type="submit" className="btn btn--primary btn--block">
            Crear cuenta
          </button>
        </form>

        <p className="auth__footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}
