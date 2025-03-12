import React, { useState } from 'react'
import axios from 'axios'

const InvoiceForm = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [subtotal, setSubtotal] = useState('')
  const [taxRate, setTaxRate] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Build the payload
    const payload = {
      invoiceNumber,
      subtotal: parseFloat(subtotal),
      taxRate: parseFloat(taxRate)
    }

    try {
      // Adjust the URL if your Spring Boot service runs on a different host/port
      await axios.post('http://localhost:8080/api/invoices', payload)
      setMessage('Invoice created successfully!')
      setInvoiceNumber('')
      setSubtotal('')
      setTaxRate('')
    } catch (error) {
      const errorMsg = error.response && error.response.data && error.response.data.message 
        ? error.response.data.message 
        : 'Error creating invoice'
      setMessage(`Error: ${errorMsg}`)
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
        <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem' }}>Create Invoice</button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  )
}

export default InvoiceForm
