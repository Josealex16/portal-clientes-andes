import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/header.css'

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    navigate('/login')
  }

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">A</span>
        <span className="header__title">Portal de Clientes Andes</span>
      </div>
      <div className="header__user">
        <div className="header__identity">
          <span className="header__name">{user?.name}</span>
          <span className="header__company">{user?.company}</span>
        </div>
        <button type="button" className="btn btn--ghost" onClick={handleSignOut}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}
