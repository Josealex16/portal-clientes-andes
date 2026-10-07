import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { AuthProvider } from '../context/AuthContext'

const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true }

export function renderApp(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]} future={ROUTER_FUTURE}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MemoryRouter>,
  )
}
