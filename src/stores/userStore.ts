import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'demand' | 'supply' | null

export interface User {
  id: string
  email: string
  phone?: string
  nickname: string
  avatar?: string
  role: UserRole
  createdAt: string
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  
  // Actions
  login: (user: User) => void
  logout: () => void
  setRole: (role: UserRole) => void
  updateProfile: (data: Partial<User>) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (user) => set({ user, isAuthenticated: true }),
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      setRole: (role) => set((state) => ({
        user: state.user ? { ...state.user, role } : null
      })),
      
      updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
    }),
    {
      name: 'gaolengmiao-user-storage',
    }
  )
)

// 模拟用户数据（用于演示）
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@gaolengmiao.com',
    phone: '13800138000',
    nickname: '演示用户',
    role: 'demand',
    createdAt: '2024-01-01',
  },
]
