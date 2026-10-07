import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import InvoicesPage from './pages/InvoicesPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import OrdersPage from './pages/OrdersPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import SupportPage from './pages/SupportPage'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="pedidos" element={<OrdersPage />} />
        <Route path="facturas" element={<InvoicesPage />} />
        <Route path="soporte" element={<SupportPage />} />
        <Route path="perfil" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
