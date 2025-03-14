import React, { useEffect, useState } from 'react'
import { getPaymentsByInvoice } from '../api/Payment'
import './PaymentList.css'

const PaymentList = ({ invoiceId }) => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (invoiceId) {
      loadPayments()
    }
  }, [invoiceId])

  const loadPayments = async () => {
    try {
      const response = await getPaymentsByInvoice(invoiceId)
      setPayments(response.data || [])
      setError(null)
    } catch (err) {
      console.error('Error loading payments:', err)
      setError('Failed to load payments: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="payment-list"><LoadingSpinner /></div>
  if (error) return <div className="payment-list error">{error}</div>
  if (!payments.length) return <div className="payment-list">No payment history available</div>

  return (
    <div className="payment-list">
      <h4>Payment History</h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.transactionReference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PaymentList
