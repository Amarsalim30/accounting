import React from 'react'
import InvoiceForm from './components/InvoiceForm'
import InvoiceList from './components/InvoiceList'
import './App.css'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Accounting Module</h1>
      </header>
      <main className="content">
        <div className="form-section">
          <InvoiceForm />
        </div>
        <div className="list-section">
          <InvoiceList />
        </div>
      </main>
    </div>
  )
}

export default App
