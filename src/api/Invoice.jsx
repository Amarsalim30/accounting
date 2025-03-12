import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

export const createInvoice = (invoiceData) => {
  return axios.post(`${API_URL}/invoices`, invoiceData)
}

export const getInvoices = () => {
  return axios.get(`${API_URL}/invoices`)
}
