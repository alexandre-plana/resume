import styles from './PhoneNumber.module.css'

interface PhoneNumberProps {
  number: string
}

export function PhoneNumber({ number }: PhoneNumberProps) {
  // Fonction pour ajouter des espaces zero-width entre chaque caractère
  const addZeroWidthSpaces = (str: string) => {
    return str.split('').join('\u200B')
  }
  
  // Découper le numéro en segments et inverser certains pour tromper les bots
  // Le vrai numéro: 06.71.03.97.84
  // On inverse l'ordre des caractères dans certains segments, puis on utilise CSS rtl pour les afficher correctement
  const segments = number.split('.')
  
  return (
    <span className={styles.phoneNumber}>
      <span className={styles.normal}>{addZeroWidthSpaces(segments[0] || '')}</span>
      {segments[1] && <span className={styles.sep}>.</span>}
      <span className={styles.reversed}>{addZeroWidthSpaces(segments[1]?.split('').reverse().join('') || '')}</span>
      {segments[2] && <span className={styles.sep}>.</span>}
      <span className={styles.normal}>{addZeroWidthSpaces(segments[2] || '')}</span>
      {segments[3] && <span className={styles.sep}>.</span>}
      <span className={styles.reversed}>{addZeroWidthSpaces(segments[3]?.split('').reverse().join('') || '')}</span>
      {segments[4] && <span className={styles.sep}>.</span>}
      <span className={styles.normal}>{addZeroWidthSpaces(segments[4] || '')}</span>
    </span>
  )
}
