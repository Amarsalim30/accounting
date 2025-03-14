import React, { useState } from 'react'
import { createInvoice } from '../api/Invoice'
import PropTypes from 'prop-types'
import './InvoiceForm.css'

const InvoiceForm = ({ onSuccess }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [subtotal, setSubtotal] = useState('')
  const [taxRate, setTaxRate] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      await createInvoice({
        invoiceNumber,
        subtotal,
        taxRate
      })
      setMessage('Invoice created successfully!')
      setInvoiceNumber('')
      setSubtotal('')
      setTaxRate('')
      
      // Call parent's onSuccess callback
      if (typeof onSuccess === 'function') {
        onSuccess()
      }
    } catch (error) {
      console.error('Error creating invoice:', error)
      const errorMsg = error.response?.data?.message || 
                      error.response?.data?.error ||
                      'Error creating invoice'
      setMessage(`Error: ${errorMsg}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="invoice-form">
      <h3>Create Invoice</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Invoice Number:</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Subtotal ($):</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={subtotal}
            onChange={(e) => setSubtotal(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Tax Rate (%):</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Invoice'}
        </button>
        {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
      </form>
    </div>
  )
}

InvoiceForm.propTypes = {
  onSuccess: PropTypes.func
}

export default InvoiceForm
