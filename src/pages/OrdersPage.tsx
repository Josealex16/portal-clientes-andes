import { formatCurrency, formatDate, orders, type Order } from '../data/sampleData'
import StatusBadge from '../components/StatusBadge'

interface OrdersPageProps {
  ordersToDisplay?: Order[]
}

export default function OrdersPage({ ordersToDisplay = orders }: OrdersPageProps) {
  return (
    <section>
      <h1 className="page__title">Pedidos</h1>
      <p className="page__lead">Historial reciente de pedidos de tu empresa.</p>
      <p>Los pedidos se ordenan del más reciente al más antiguo.</p>
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
            {[...ordersToDisplay].sort((a, b) => b.date.localeCompare(a.date)).map((order) => (
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
          </tbody>
        </table>
      </div>
      <p>Para consultar un envío, escribe a soporte@andes.example.</p>
    </section>
  )
}
