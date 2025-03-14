import axios from 'axios'

// Use relative path when using Vite proxy
const API_URL = '/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add any auth headers here
  },
  withCredentials: true // Required for CORS with credentials
})

export const createInvoice = (invoiceData) => {
  return axiosInstance.post('/invoices', {
    invoiceNumber: invoiceData.invoiceNumber,
    subtotal: parseFloat(invoiceData.subtotal),
    taxRate: parseFloat(invoiceData.taxRate) / 100
  })
}

export const getInvoices = () => {
  return axiosInstance.get('/invoices')
}
