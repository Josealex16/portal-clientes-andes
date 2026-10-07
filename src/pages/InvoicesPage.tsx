import { formatCurrency, formatDate, invoices } from '../data/sampleData'
import StatusBadge from '../components/StatusBadge'

export default function InvoicesPage() {
  return (
    <section>
      <h1 className="page__title">Facturas</h1>
      <p className="page__lead">Documentos emitidos a tu empresa y su estado de pago.</p>
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
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{formatDate(invoice.issued)}</td>
                <td>{formatDate(invoice.due)}</td>
                <td className="table__num">{formatCurrency(invoice.amount)}</td>
                <td>
                  <StatusBadge status={invoice.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
