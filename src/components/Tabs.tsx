import { memo, useRef, useState } from 'react'
import { useAppStore } from '../store/appStore'
import type { Tab } from '../store/appStore'
import { getTranslations } from '../locales'
import { parsePersonalProjectHash } from '../navigation/personalProjectHash'
import styles from './Tabs.module.css'

function TabsComponent() {
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)
  const language = useAppStore((state) => state.language)
  const t = getTranslations(language)
  const [focusedTab, setFocusedTab] = useState<Tab>(activeTab)
  const [focusWithinTablist, setFocusWithinTablist] = useState(false)
  const tablistRef = useRef<HTMLElement>(null)

  const tabsData: { id: Tab; label: string; icon: string }[] = [
     { id: 'overview', label: t.tabs.overview, icon: '📋' },
     { id: 'formations', label: t.tabs.formations, icon: '🎓' },
     { id: 'personal', label: t.tabs.personalProjects, icon: '🛠️' },
  ]

  const selectTab = (tab: Tab) => {
    if (tab !== 'personal' && typeof window !== 'undefined' && parsePersonalProjectHash(window.location.hash) !== null) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
    setFocusedTab(tab)
    setActiveTab(tab)
  }

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, tab: Tab) => {
    const currentIndex = tabsData.findIndex((candidate) => candidate.id === tab)
    if (currentIndex < 0) {
      return
    }

    let nextIndex: number | null = null
    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabsData.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabsData.length) % tabsData.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabsData.length - 1
    }

    if (nextIndex !== null) {
      event.preventDefault()
      const nextTab = tabsData[nextIndex].id
      setFocusedTab(nextTab)
      document.getElementById(`tab-${nextTab}`)?.focus()
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      selectTab(tab)
    }
  }

  const handleTabBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    const nextFocus = event.relatedTarget as Node | null
    const remainsWithinTablist = Boolean(nextFocus && tablistRef.current?.contains(nextFocus))
    setFocusWithinTablist(remainsWithinTablist)
    if (!remainsWithinTablist) {
      setFocusedTab(activeTab)
    }
  }

  const rovingTab = focusWithinTablist ? focusedTab : activeTab

  return (
    <nav
      ref={tablistRef}
      className={styles.tabs}
      role="tablist"
      aria-label={language === 'fr' ? 'Sections' : 'Sections'}
    >
      {tabsData.map((tab) => (
        <button
          key={tab.id}
          id={`tab-${tab.id}`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          tabIndex={rovingTab === tab.id ? 0 : -1}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => selectTab(tab.id)}
          onFocus={() => {
            setFocusedTab(tab.id)
            setFocusWithinTablist(true)
          }}
          onBlur={handleTabBlur}
          onKeyDown={(event) => handleTabKeyDown(event, tab.id)}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}

export const Tabs = memo(TabsComponent)
