import React, { useState } from 'react'
import { createInvoice } from '../api/Invoice'

const InvoiceForm = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [subtotal, setSubtotal] = useState('')
  const [taxRate, setTaxRate] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const payload = {
      invoiceNumber,
      subtotal: parseFloat(subtotal),
      taxRate: parseFloat(taxRate)
    }

    try {
      await createInvoice(payload)
      setMessage('Invoice created successfully!')
      setInvoiceNumber('')
      setSubtotal('')
      setTaxRate('')
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error creating invoice'
      setMessage(`Error: ${errorMsg}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Create Invoice</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div>
          <label>Invoice Number: </label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subtotal: </label>
          <input
            type="number"
            step="0.01"
            value={subtotal}
            onChange={(e) => setSubtotal(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tax Rate: </label>
          <input
            type="number"
            step="0.01"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} style={{ padding: '0.5rem', fontSize: '1rem' }}>
          {isLoading ? 'Creating...' : 'Create Invoice'}
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }} className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
    </div>
  )
}

export default InvoiceForm
