import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string
}

export default function FormField({ label, name, error, ...inputProps }: FormFieldProps) {
  const errorId = `${name}-error`
  return (
    <div className="field">
      <label className="field__label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={error ? 'field__input field__input--invalid' : 'field__input'}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  )
}
