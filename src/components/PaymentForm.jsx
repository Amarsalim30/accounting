import React, { useState } from 'react'
import { createPayment } from '../api/Payment'
import PropTypes from 'prop-types'
import './PaymentForm.css'

const PaymentForm = ({ invoiceId, onPaymentSuccess }) => {
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('CASH')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      await createPayment({
        invoiceId,
        paymentAmount: parseFloat(amount),
        paymentMethod,
        paymentDate: new Date().toISOString()
      })
      setMessage('Payment processed successfully!')
      setAmount('')
      if (onPaymentSuccess) onPaymentSuccess()
    } catch (error) {
      console.error('Error processing payment:', error)
      setMessage('Error: ' + (error.response?.data?.message || 'Failed to process payment'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="payment-form">
      <h4>Make Payment</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount ($):</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Payment Method:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="CASH">Cash</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Submit Payment'}
        </button>
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  )
}

PaymentForm.propTypes = {
  invoiceId: PropTypes.number.isRequired,
  onPaymentSuccess: PropTypes.func
}

export default PaymentForm
