import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import { HomeIcon, LifebuoyIcon, PackageIcon, ReceiptIcon, UserIcon } from './Icons'
import '../styles/sidebar.css'

interface MenuItem {
  to: string
  label: string
  icon: ReactNode
  end?: boolean
}

const MENU: MenuItem[] = [
  { to: '/', label: 'Inicio', icon: <HomeIcon />, end: true },
  { to: '/pedidos', label: 'Pedidos', icon: <PackageIcon /> },
  { to: '/facturas', label: 'Facturas', icon: <ReceiptIcon /> },
  { to: '/soporte', label: 'Soporte', icon: <LifebuoyIcon /> },
  { to: '/perfil', label: 'Mi perfil', icon: <UserIcon /> },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav aria-label="Menú principal">
        <ul className="sidebar__list">
          {MENU.map((item) => (
            <li key={item.to} className="sidebar__item">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
                }
              >
                <span className="sidebar__icon">{item.icon}</span>
                <span className="sidebar__label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
