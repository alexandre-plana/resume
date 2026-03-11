import { memo, useEffect, useRef, useState } from 'react'
import { useAppStore } from '../store/appStore'
import styles from './Toolbar.module.css'
import { getTranslations } from '../locales'
import { exportMockCvToWord } from '../utils/exportMockCvToWord'

interface ToolbarProps {
  language: 'fr' | 'en'
}

function ToolbarComponent({ language }: ToolbarProps) {
  const setLanguage = useAppStore((state) => state.setLanguage)
  const t = getTranslations(language)
  const [isHidden, setIsHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current
      const delta = Math.abs(currentScrollY - lastScrollY.current)

      if (currentScrollY <= 8) {
        setIsHidden(false)
      } else if (delta > 4 && isScrollingDown) {
        setIsHidden(true)
      } else if (delta > 4 && !isScrollingDown) {
        setIsHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleExportWord = async () => {
    await exportMockCvToWord(language)
  }

  const printLabel = t.toolbar.print
  const exportWordLabel = t.toolbar.exportWord

  return (
    <div className={`${styles.toolbar} ${isHidden ? styles.toolbarHidden : ''}`}>
      <div className={styles.actions}>
        {/* TODO: Réactiver le bouton Me contacter */}
        {/* <button className={styles.contactBtn} onClick={onContact}>
          {t.common.contact}
        </button> */}
        <div className={styles.langControl}>
          <button
            className={`${styles.langBtn} ${language === 'fr' ? styles.active : ''}`}
            onClick={() => setLanguage('fr')}
            title="Français"
          >
            FR
          </button>
          <button
            className={`${styles.langBtn} ${language === 'en' ? styles.active : ''}`}
            onClick={() => setLanguage('en')}
            title="English"
          >
            EN
          </button>
        </div>
        <button className={styles.exportBtn} onClick={handleExportWord} title={exportWordLabel}>
          <span className={styles.icon}>📝</span>
          {exportWordLabel}
        </button>
        <button className={styles.printBtn} onClick={handlePrint} title={printLabel}>
          <span className={styles.icon}>🖨️</span>
          {printLabel}
        </button>
      </div>
    </div>
  )
}

export const Toolbar = memo(ToolbarComponent)
