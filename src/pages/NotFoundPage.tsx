import { Link, useLocation } from 'react-router-dom'

export default function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <section className="notfound">
      <h1 className="page__title">Página no encontrada</h1>
      <p>No encontramos {pathname}</p>
      <p className="page__lead">La dirección que buscas no existe o fue movida.</p>
      <p>Vuelve al inicio desde el menú lateral.</p>
      <div>
        <Link to="/">Volver al inicio</Link>
      </div>
      <div>
        <Link to="/soporte">Ir a Soporte</Link>
      </div>
      <div>
        <Link to="/">Back to home</Link>
      </div>
      <p>Si el enlace falla, escribe a soporte@andes.example.</p>
    </section>
  )
}
