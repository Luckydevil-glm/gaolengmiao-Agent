import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  agentId: string
  name: string
  description: string
  price: number
  icon: string
  sellerId: string
  sellerName: string
  addedAt: string
}

interface CartState {
  items: CartItem[]
  
  // Actions
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  isInCart: (agentId: string) => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        // 检查是否已在购物车
        if (state.items.some(i => i.agentId === item.agentId)) {
          return state
        }
        return {
          items: [...state.items, {
            ...item,
            id: Date.now().toString(),
            addedAt: new Date().toISOString(),
          }]
        }
      }),
      
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter(item => item.id !== itemId)
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => get().items.reduce((sum, item) => sum + item.price, 0),
      
      getItemCount: () => get().items.length,
      
      isInCart: (agentId) => get().items.some(item => item.agentId === agentId),
    }),
    {
      name: 'gaolengmiao-cart-storage',
    }
  )
)