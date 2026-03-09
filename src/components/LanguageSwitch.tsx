import { useAppStore } from '../store/appStore'
import styles from './LanguageSwitch.module.css'

export function LanguageSwitch() {
  const { language, setLanguage } = useAppStore()

  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${language === 'fr' ? styles.active : ''}`}
        onClick={() => setLanguage('fr')}
        title="Français"
      >
        FR
      </button>
      <button
        className={`${styles.btn} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
        title="English"
      >
        EN
      </button>
    </div>
  )
}
