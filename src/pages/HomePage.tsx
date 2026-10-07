import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, invoices, orders } from '../data/sampleData'

export default function HomePage() {
  const { user } = useAuth()
  const openOrders = orders.filter((o) => o.status !== 'Entregado').length
  const pendingInvoices = invoices.filter((i) => i.status !== 'Pagada')
  const pendingTotal = pendingInvoices.reduce((sum, i) => sum + i.amount, 0)

  return (
    <section>
      <h1 className="page__title">Hola, {user?.name.split(' ')[0]}</h1>
      <p className="page__lead">Este es el resumen de tu cuenta al día de hoy.</p>

      <div className="cards">
        <article className="card">
          <h2 className="card__label">Pedidos abiertos</h2>
          <p className="card__value">{openOrders}</p>
          <Link to="/pedidos">Ver pedidos</Link>
        </article>
        <article className="card">
          <h2 className="card__label">Facturas por pagar</h2>
          <p className="card__value">{pendingInvoices.length}</p>
          <Link to="/facturas">Ver facturas</Link>
        </article>
        <article className="card">
          <h2 className="card__label">Saldo pendiente</h2>
          <p className="card__value">{formatCurrency(pendingTotal)}</p>
          <Link to="/soporte">¿Dudas con tu saldo?</Link>
        </article>
      </div>

      <div className="panel">
        <h2 className="panel__title">Novedades</h2>
        <ul className="news">
          <li>Nuevo horario de despachos: martes y jueves por la mañana.</li>
          <li>Ya puedes solicitar copias de tus facturas desde la sección Soporte.</li>
          <li>Mantención programada del portal el sábado de 02:00 a 04:00.</li>
        </ul>
      </div>
    </section>
  )
}
