// Datos de ejemplo ficticios para la demostracion.

export interface Order {
  id: string
  date: string
  description: string
  total: number
  status: 'En preparación' | 'En camino' | 'Entregado'
}

export interface Invoice {
  id: string
  issued: string
  due: string
  amount: number
  status: 'Pagada' | 'Pendiente' | 'Vencida'
}

export const orders: Order[] = [
  { id: 'PED-2041', date: '2026-09-28', description: 'Resmas de papel carta (40 cajas)', total: 1280000, status: 'En preparación' },
  { id: 'PED-2037', date: '2026-09-21', description: 'Toner para impresoras láser (12 u.)', total: 864000, status: 'En camino' },
  { id: 'PED-2029', date: '2026-09-12', description: 'Sillas ergonómicas (6 u.)', total: 2190000, status: 'Entregado' },
  { id: 'PED-2018', date: '2026-08-30', description: 'Archivadores y carpetas (200 u.)', total: 410000, status: 'Entregado' },
  { id: 'PED-2003', date: '2026-08-14', description: 'Pizarras de pared (4 u.)', total: 735000, status: 'Entregado' },
]

export const invoices: Invoice[] = [
  { id: 'FAC-8812', issued: '2026-09-30', due: '2026-10-30', amount: 1280000, status: 'Pendiente' },
  { id: 'FAC-8790', issued: '2026-09-22', due: '2026-10-22', amount: 864000, status: 'Pendiente' },
  { id: 'FAC-8741', issued: '2026-09-13', due: '2026-10-13', amount: 2190000, status: 'Pagada' },
  { id: 'FAC-8702', issued: '2026-08-31', due: '2026-09-30', amount: 410000, status: 'Pagada' },
  { id: 'FAC-8655', issued: '2026-08-15', due: '2026-09-14', amount: 735000, status: 'Vencida' },
]

export const supportTopics = [
  {
    title: '¿Cómo descargo una factura?',
    answer: 'Ingresa a la sección Facturas y selecciona el documento que necesitas. Recibirás el PDF por correo.',
  },
  {
    title: '¿Puedo modificar un pedido en preparación?',
    answer: 'Sí, mientras el estado sea En preparación. Escríbenos con el número de pedido y los cambios requeridos.',
  },
  {
    title: '¿Cuál es el horario de atención?',
    answer: 'Nuestro equipo atiende de lunes a viernes, de 8:30 a 18:00 (hora de Santiago).',
  },
]

const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

export function formatCurrency(value: number): string {
  return clp.format(value)
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${day}/${month}/${year}`
}
