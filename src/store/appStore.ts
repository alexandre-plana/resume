import { create } from 'zustand'
import { Language } from '../locales'

export type Tab = 'overview' | 'projects' | 'formations' | 'skills'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

interface AppStore {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  contactOpen: boolean
  setContactOpen: (open: boolean) => void
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  language: Language
  setLanguage: (lang: Language) => void
}

export const useAppStore = create<AppStore>((set) => ({
  activeTab: 'overview',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  contactOpen: false,
  setContactOpen: (open) => set({ contactOpen: open }),
  
  toasts: [],
  addToast: (toast) => {
    const id = `${Date.now()}-${Math.random()}`
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))
    if (toast.duration) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }))
      }, toast.duration)
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  language: 'fr',
  setLanguage: (lang) => set({ language: lang }),
}))
