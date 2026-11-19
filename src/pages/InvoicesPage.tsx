import { formatDate, invoices } from '../data/sampleData'
import StatusBadge from '../components/StatusBadge'

const formatInvoiceCurrency = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function daysUntilDue(due: string, today: Date): number {
  const [year, month, day] = due.split('-').map(Number)
  const dueCalendarDay = Date.UTC(year, month - 1, day)
  const todayCalendarDay = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())

  return (dueCalendarDay - todayCalendarDay) / 86400000
}

export default function InvoicesPage() {
  const today = new Date()

  return (
    <section>
      <h1 className="page__title">Facturas ({invoices.length})</h1>
      <p className="page__lead">Documentos emitidos a tu empresa y su estado de pago.</p>
      <p>Los montos están expresados en pesos chilenos (CLP).</p>
      <p>Si una factura no aparece, escribe a soporte@andes.example.</p>
      {invoices.length === 0 ? (
        <p>Todavía no hay facturas.</p>
      ) : (
        <div className="panel panel--table">
          <table className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>Emisión</th>
                <th>Vencimiento</th>
                <th className="table__num">Monto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                const daysRemaining =
                  invoice.status === 'Pendiente' ? daysUntilDue(invoice.due, today) : null

                return (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{formatDate(invoice.issued)}</td>
                    <td>
                      {formatDate(invoice.due)}
                      {daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= 3 && (
                        <span> Vence en {daysRemaining} días</span>
                      )}
                    </td>
                    <td className="table__num">{formatInvoiceCurrency.format(invoice.amount)}</td>
                    <td>
                      <StatusBadge status={invoice.status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      <p>Los documentos se descargan en formato PDF.</p>
    </section>
  )
}
