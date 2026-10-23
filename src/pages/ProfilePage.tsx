import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <section>
      <h1 className="page__title">Mi perfil</h1>
      <p className="page__lead">Datos de tu cuenta en el portal.</p>
      <p>Estos datos se usan para emitir tus facturas.</p>
      <div className="panel">
        <dl className="details">
          <div>
            <dt>Nombre</dt>
            <dd>{user?.name}</dd>
          </div>
          <div>
            <dt>Correo electrónico</dt>
            <dd>{user?.email}</dd>
          </div>
          <div>
            <dt>Empresa</dt>
            <dd>{user?.company}</dd>
          </div>
          <div>
            <dt>Identificador de cliente</dt>
            <dd>{user?.id}</dd>
          </div>
        </dl>
      </div>
      <p>Para cambiar tus datos escribe a soporte@andes.example.</p>
    </section>
  )
}
