import { memo } from 'react'
import { useAppStore } from '../store/appStore'
import type { Tab } from '../store/appStore'
import { getTranslations } from '../locales'
import styles from './Tabs.module.css'

function TabsComponent() {
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)
  const language = useAppStore((state) => state.language)
  const t = getTranslations(language)

  const tabsData: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: t.tabs.overview, icon: '📋' },
    { id: 'projects', label: t.tabs.projects, icon: '📁' },
    { id: 'formations', label: t.tabs.formations, icon: '🎓' },
  ]

  return (
    <nav className={styles.tabs}>
      {tabsData.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </div>
      ))}
    </nav>
  )
}

export const Tabs = memo(TabsComponent)
