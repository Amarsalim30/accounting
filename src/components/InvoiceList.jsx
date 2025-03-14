import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { getInvoices } from '../api/Invoice'
import LoadingSpinner from './LoadingSpinner'
import PaymentForm from './PaymentForm'
import PaymentList from './PaymentList'
import './InvoiceList.css'

const InvoiceList = forwardRef((props, ref) => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    try {
      const response = await getInvoices()
      setInvoices(response.data || []) // Handle empty response
      setError(null)
    } catch (err) {
      console.error('Error loading invoices:', err)
      setError('Failed to load invoices: ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    loadInvoices
  }))

  const handleRowClick = (invoice) => {
    setSelectedInvoice(selectedInvoice?.id === invoice.id ? null : invoice)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error">{error}</div>

  return (
    <div className="invoice-list">
      <h3>Invoices</h3>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Date</th>
            <th>Subtotal</th>
            <th>VAT</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <React.Fragment key={invoice.invoiceNumber}>
              <tr 
                onClick={() => handleRowClick(invoice)}
                className={selectedInvoice?.id === invoice.id ? 'selected' : ''}
              >
                <td>{invoice.invoiceNumber}</td>
                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                <td>${(invoice.subtotal || 0).toFixed(2)}</td>
                <td>${(invoice.vat || 0).toFixed(2)}</td>
                <td>${(invoice.total || 0).toFixed(2)}</td>
                <td>{invoice.status}</td>
              </tr>
              {selectedInvoice?.id === invoice.id && (
                <tr>
                  <td colSpan="6" className="details-cell">
                    <div className="invoice-details">
                      <PaymentForm 
                        invoiceId={invoice.id} 
                        onPaymentSuccess={loadInvoices}
                      />
                      <PaymentList invoiceId={invoice.id} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
})

export default InvoiceList
