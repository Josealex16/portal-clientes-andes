import { formatCurrency, formatDate, orders } from '../data/sampleData'
import StatusBadge from '../components/StatusBadge'

export default function OrdersPage() {
  const total = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <section>
      <h1 className="page__title">Pedidos</h1>
      <p className="page__lead">Historial reciente de pedidos de tu empresa.</p>
      <div className="panel panel--table">
        <table className="table">
          <thead>
            <tr>
              <th>N°</th>
              <th>Fecha</th>
              <th>Detalle</th>
              <th className="table__num">Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{formatDate(order.date)}</td>
                <td>{order.description}</td>
                <td className="table__num">{formatCurrency(order.total)}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>Total de pedidos</td>
              <td className="table__num">{formatCurrency(total)}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
