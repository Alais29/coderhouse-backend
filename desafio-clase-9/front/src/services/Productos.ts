import axios from 'axios'
import { IItem } from '../interfaces'
const baseUrl = '/api/productos'

export const getProducts = async () => {
  const response = await axios.get(`${baseUrl}/listar`)
  return response.data.data
}

export const saveProduct = async (newProduct: IItem) => {
  const response = await axios.post(`${baseUrl}/guardar`, newProduct)
  return response.data.data
}