import React, { useEffect, useState } from 'react'
import { getInvoices } from '../api/Invoice'

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    try {
      const response = await getInvoices()
      setInvoices(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load invoices')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading invoices...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="invoice-list">
      <h3>Invoices</h3>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Subtotal</th>
            <th>Tax Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>${invoice.subtotal.toFixed(2)}</td>
              <td>{(invoice.taxRate * 100).toFixed(1)}%</td>
              <td>${(invoice.subtotal * (1 + invoice.taxRate)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvoiceList
