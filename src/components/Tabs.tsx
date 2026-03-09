import { useAppStore } from '../store/appStore'
import type { Tab } from '../store/appStore'
import { getTranslations } from '../locales'
import styles from './Tabs.module.css'

export const Tabs = () => {
  const { activeTab, setActiveTab, language } = useAppStore()
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
