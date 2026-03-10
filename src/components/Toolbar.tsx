import { useAppStore } from '../store/appStore'
import styles from './Toolbar.module.css'
import { getTranslations } from '../locales'

interface ToolbarProps {
  language: 'fr' | 'en'
  onContact: () => void
}

export function Toolbar({ language, onContact }: ToolbarProps) {
  const { setLanguage } = useAppStore()
  const t = getTranslations(language)

  const handlePrint = () => {
    window.print()
  }

  const printLabel = language === 'fr' ? 'Imprimer' : 'Print'

  return (
    <div className={styles.toolbar}>
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
        <button className={styles.printBtn} onClick={handlePrint} title={printLabel}>
          <span className={styles.icon}>🖨️</span>
          {printLabel}
        </button>
      </div>
    </div>
  )
}
