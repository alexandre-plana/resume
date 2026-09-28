import { create } from 'zustand'
import { Language } from '../locales'
import { parsePersonalProjectHash } from '../navigation/personalProjectHash'

export type Tab = 'overview' | 'formations' | 'personal'

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

const getInitialTab = (): Tab =>
  typeof window !== 'undefined' && parsePersonalProjectHash(window.location.hash) !== null ? 'personal' : 'overview'

const clearPersonalProjectHash = () => {
  if (typeof window === 'undefined' || parsePersonalProjectHash(window.location.hash) === null) {
    return
  }

  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
}

export const useAppStore = create<AppStore>((set) => ({
  activeTab: getInitialTab(),
  setActiveTab: (tab) => {
    if (tab !== 'personal') {
      clearPersonalProjectHash()
    }
    set({ activeTab: tab })
  },
  
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
