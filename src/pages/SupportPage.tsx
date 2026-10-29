import { supportTopics } from '../data/sampleData'

export default function SupportPage() {
  return (
    <section>
      <h1 className="page__title">Soporte</h1>
      <p>Need help? We usually reply within one business day.</p>
      <a href="mailto:support@example.com">Email support</a>
      <p className="page__lead">Resolvemos tus dudas sobre pedidos, facturas y tu cuenta.</p>
      <p>Horario de atención: lunes a viernes, de 9:00 a 18:00.</p>

      <div className="panel">
        <h2 className="panel__title">Preguntas frecuentes</h2>
        <dl className="faq">
          {supportTopics.map((topic) => (
            <div key={topic.title} className="faq__item">
              <dt>{topic.title}</dt>
              <dd>{topic.answer}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="panel">
        <h2 className="panel__title">Contacto directo</h2>
        <p>Correo: soporte@andes.example</p>
        <p>Correo de facturación: facturacion@andes.example</p>
        <p>Teléfono: +56 2 2555 0100</p>
        <p>Oficina: Av. Providencia 1234, Santiago</p>
        <p>Horario de atención: lunes a viernes de 09:00 a 18:00</p>
      </div>
    </section>
  )
}
