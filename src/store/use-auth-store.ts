import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type UserRole = 'admin' | 'teacher' | 'student'

interface UserProfile {
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  role: UserRole
  user: UserProfile | null
  setRole: (role: UserRole) => void
  setUser: (user: UserProfile | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'admin', // Default role for demo
      user: {
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.k@nexus.edu',
        avatar: 'https://i.pravatar.cc/150?u=admin'
      },
      setRole: (role) => set({ role }),
      setUser: (user) => set({ user }),
      logout: () => set({ role: 'student', user: null }),
    }),
    {
      name: 'sms-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
