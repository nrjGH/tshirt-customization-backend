import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const register = (userData: { username: string; email: string; fullname: string; password: string }) =>
  api.post('/register', userData)

export const login = (credentials: { email: string; password: string }) =>
  api.post('/login', credentials)

export const logout = () => api.post('/logout')

export const getPublicDesigns = (page: number) => api.get(`/designs/public?page=${page}`)

export const createDesign = (designData: { designLink: string; name: string; isPublic: boolean; color: string }) =>
  api.post('/designs', designData)

export const toggleLike = (designId: string) => api.post(`/likes/${designId}/toggle`)

export const getLikeCount = (designId: string) => api.get(`/likes/${designId}/count`)

export const addToCart = (designId: string) => api.post('/cart/add', { designId })

export const getCart = () => api.get('/cart')

export const updateCartItem = (designId: string, quantity: number) =>
  api.put('/cart/update', { designId, quantity })

export const removeFromCart = (designId: string) => api.delete(`/cart/remove`, { data: { designId } })

export default api

