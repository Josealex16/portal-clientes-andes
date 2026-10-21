import { describe, expect, it } from 'vitest'
import { formatDate, generatePaymentsCsv, invoices, orders, type Payment } from './sampleData'

const octoberSixteenth = new Date(2026, 9, 16)

describe('formatDate', () => {
  it('muestra las fechas de facturas y pedidos en formato día/mes/año sin alterar los valores ISO', () => {
    const invoice = invoices[0]
    const order = orders[0]

    expect(formatDate(invoice.issued)).toBe('30/09/2026')
    expect(formatDate(invoice.due)).toBe('30/10/2026')
    expect(formatDate(order.date)).toBe('28/09/2026')
    expect([invoice.issued, invoice.due, order.date]).toEqual([
      '2026-09-30',
      '2026-10-30',
      '2026-09-28',
    ])
  })

  it('completa con cero inicial un día de un dígito', () => {
    expect(formatDate('2026-09-03')).toBe('03/09/2026')
  })

  it('completa con cero inicial un mes de un dígito', () => {
    expect(formatDate('2026-03-03')).toBe('03/03/2026')
  })

  it('fija el formato día/mes/año para una fecha ISO', () => {
    expect(formatDate('2026-09-30')).toBe('30/09/2026')
  })
})

describe('generatePaymentsCsv', () => {
  it('exporta todos los pagos del mes anterior de la cuenta, sin filtrar estados', () => {
    const payments: Payment[] = [
      { accountId: 'account-1', date: '2026-09-05', amount: 1280000, status: 'Pagado' },
      { accountId: 'account-1', date: '2026-09-20', amount: 864000, status: 'Pendiente' },
      { accountId: 'account-2', date: '2026-09-12', amount: 410000, status: 'Rechazado' },
    ]

    expect(generatePaymentsCsv(payments, 'account-1', octoberSixteenth)).toBe(
      'fecha,monto,estado\n2026-09-05,1280000,Pagado\n2026-09-20,864000,Pendiente',
    )
  })

  it('incluye ambos extremos del mes anterior y excluye las fechas adyacentes', () => {
    const payments: Payment[] = [
      { accountId: 'account-1', date: '2026-08-31', amount: 100, status: 'Pagado' },
      { accountId: 'account-1', date: '2026-09-01', amount: 200, status: 'Pagado' },
      { accountId: 'account-1', date: '2026-09-30', amount: 300, status: 'Pendiente' },
      { accountId: 'account-1', date: '2026-10-01', amount: 400, status: 'Pagado' },
    ]

    expect(generatePaymentsCsv(payments, 'account-1', octoberSixteenth)).toBe(
      'fecha,monto,estado\n2026-09-01,200,Pagado\n2026-09-30,300,Pendiente',
    )
  })

  it('devuelve solo el encabezado cuando la cuenta no tiene pagos en el mes anterior', () => {
    expect(generatePaymentsCsv([], 'account-1', octoberSixteenth)).toBe('fecha,monto,estado')
  })

  it('mantiene fechas ISO y montos CLP enteros sin formato', () => {
    const payments: Payment[] = [
      { accountId: 'account-1', date: '2026-09-05', amount: 1250000, status: 'Pagado' },
    ]

    expect(generatePaymentsCsv(payments, 'account-1', octoberSixteenth)).toBe(
      'fecha,monto,estado\n2026-09-05,1250000,Pagado',
    )
  })

  it('calcula correctamente el mes anterior al cruzar el cambio de año', () => {
    const payments: Payment[] = [
      { accountId: 'account-1', date: '2025-12-31', amount: 500, status: 'Pagado' },
      { accountId: 'account-1', date: '2026-01-01', amount: 600, status: 'Pendiente' },
    ]

    expect(generatePaymentsCsv(payments, 'account-1', new Date(2026, 0, 16))).toBe(
      'fecha,monto,estado\n2025-12-31,500,Pagado',
    )
  })
})
