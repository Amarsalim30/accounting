import React, { useRef } from 'react'
import InvoiceForm from './components/InvoiceForm'
import InvoiceList from './components/InvoiceList'
import './App.css'

function App() {
  const invoiceListRef = useRef()

  const handleInvoiceCreated = () => {
    invoiceListRef.current?.loadInvoices()
  }

  return (
    <div className="App">
      <header>
        <h1>Accounting Module</h1>
      </header>
      <main className="content">
        <div className="form-section">
          <InvoiceForm onSuccess={handleInvoiceCreated} />
        </div>
        <div className="list-section">
          <InvoiceList ref={invoiceListRef} />
        </div>
      </main>
    </div>
  )
}

export default App
