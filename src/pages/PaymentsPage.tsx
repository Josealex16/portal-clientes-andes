import { useAuth } from '../context/AuthContext'
import { generatePaymentsCsv, payments } from '../data/sampleData'

export default function PaymentsPage() {
  const { user } = useAuth()

  function handleDownload() {
    if (!user) return

    const referenceDate = new Date()
    const csv = generatePaymentsCsv(payments, user.id, referenceDate)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const previousMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - 1, 1)
    const month = String(previousMonth.getMonth() + 1).padStart(2, '0')

    link.href = downloadUrl
    link.download = `pagos-${previousMonth.getFullYear()}-${month}.csv`
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(downloadUrl)
  }

  return (
    <section>
      <h1 className="page__title">Pagos</h1>
      <p className="page__lead">Descarga los pagos de tu cuenta correspondientes al mes anterior.</p>
      <button type="button" className="btn btn--primary" onClick={handleDownload}>
        Descargar CSV de pagos
      </button>
    </section>
  )
}
