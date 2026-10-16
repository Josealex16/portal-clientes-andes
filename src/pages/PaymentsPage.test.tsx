import { fireEvent, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { login } from '../services/authService'
import { renderApp } from '../test/renderApp'

describe('PaymentsPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('descarga el CSV de pagos del usuario autenticado con contenido y tipo CSV', async () => {
    const createObjectURL = vi.fn((blob: Blob) => {
      expect(blob).toBeInstanceOf(Blob)
      return 'blob:payments'
    })
    vi.stubGlobal('URL', {
      createObjectURL,
      revokeObjectURL: vi.fn(),
    })
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-16T12:00:00'))
    login('demo@andes.example', 'Demo1234')
    renderApp('/pagos')

    expect(screen.getByRole('heading', { name: 'Pagos' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Descargar CSV de pagos' }))

    expect(createObjectURL).toHaveBeenCalledOnce()
    const blob = createObjectURL.mock.calls[0][0]
    expect(blob.type).toBe('text/csv;charset=utf-8')
    const csvPromise = new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = () => reject(reader.error)
      reader.readAsText(blob)
    })
    await vi.runAllTimersAsync()
    const csv = await csvPromise
    expect(csv).toBe(
      'fecha,monto,estado\n2026-09-05,1280000,Pagado\n2026-09-20,864000,Pendiente',
    )
  })
})
