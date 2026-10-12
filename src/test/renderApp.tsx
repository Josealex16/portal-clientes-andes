import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import { AuthProvider } from '../context/AuthContext'

const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true }

export function renderApp(initialPath: string, observer?: ReactNode, initialState?: unknown) {
  return render(
    <MemoryRouter
      initialEntries={[{ pathname: initialPath, state: initialState }]}
      future={ROUTER_FUTURE}
    >
      <AuthProvider>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
        {observer}
      </AuthProvider>
    </MemoryRouter>,
  )
}
