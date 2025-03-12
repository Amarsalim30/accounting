import React from 'react'
import InvoiceForm from './components/InvoiceForm'

function App() {
  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <header>
        <h2>Accounting Module - Invoice Creation</h2>
      </header>
      <InvoiceForm />
    </div>
  )
}

export default App
