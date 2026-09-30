import { create } from 'zustand'
import { Language } from '../locales'
import { parsePersonalProjectHash } from '../navigation/personalProjectHash'

export type Tab = 'overview' | 'formations' | 'personal'

interface AppStore {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
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
  language: 'fr',
  setLanguage: (lang) => set({ language: lang }),
}))
