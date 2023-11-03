import axios from 'axios'

const API_KEY = import.meta.env.VITE_CRUD_API_KEY
export const instance = axios.create({
  baseURL: 'https://crudapi.co.uk/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
})
