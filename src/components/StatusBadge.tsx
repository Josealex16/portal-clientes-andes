const TONES: Record<string, string> = {
  'En preparación': 'warning',
  'En camino': 'info',
  Entregado: 'success',
  Pagada: 'success',
  Pendiente: 'warning',
  Vencida: 'danger',
}

export default function StatusBadge({ status }: { status: string }) {
  return <span className={`badge badge--${TONES[status] ?? 'info'}`}>{status}</span>
}
