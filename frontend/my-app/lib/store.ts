import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
  email: string
  fullname: string
}

interface CartItem {
  id: string
  name: string
  color: string
  quantity: number
  designLink: string
}

interface Store {
  user: User | null
  cart: CartItem[]
  setUser: (user: User | null) => void
  logout: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      cart: [],
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
      removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      updateCartItemQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shirt-customizer-store',
    }
  )
)

