import axios from 'axios'

const API_URL = '/api'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

export const createPayment = (paymentData) => {
  return axiosInstance.post('/payments', paymentData)
}

export const getPaymentsByInvoice = (invoiceId) => {
  return axiosInstance.get(`/payments/${invoiceId}`)
}

export const getAllPayments = () => {
  return axiosInstance.get('/payments')
}
