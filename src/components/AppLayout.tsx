import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Header from './Header'
import Sidebar from './Sidebar'
import '../styles/layout.css'

export default function AppLayout() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="layout">
      <Header />
      <div className="layout__body">
        <Sidebar />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
      <footer className="layout__footer">
        Soporte: soporte@andes.example · Lunes a viernes de 09:00 a 18:00
      </footer>
    </div>
  )
}
