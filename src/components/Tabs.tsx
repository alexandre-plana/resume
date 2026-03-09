import React from 'react'
import { useAppStore, Tab } from '../store/appStore'
import styles from './Tabs.module.css'

const tabsData: { id: Tab; label: string; icon: string; count?: number }[] = [
  { id: 'overview', label: 'Overview', icon: '📋' },
  { id: 'repositories', label: 'Repositories', icon: '📁', count: 18 },
  { id: 'stars', label: 'Stars', icon: '⭐', count: 94 },
  { id: 'packages', label: 'Packages', icon: '📦' },
]

export const Tabs: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore()

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
          {tab.count && <span className={styles.count}>{tab.count}</span>}
        </div>
      ))}
    </nav>
  )
}
