import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="notfound">
      <h1 className="page__title">Página no encontrada</h1>
      <p className="page__lead">La dirección que buscas no existe o fue movida.</p>
      <div>
        <Link to="/">Volver al inicio</Link>
      </div>
      <div>
        <Link to="/soporte">Ir a Soporte</Link>
      </div>
    </section>
  )
}
