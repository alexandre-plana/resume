import { memo } from 'react'
import styles from './PhoneNumber.module.css'

interface PhoneNumberProps {
  number: string
}

function PhoneNumberComponent({ number }: PhoneNumberProps) {
  const obfuscatedNumber = number.split('').join('\u200B')

  return <span className={styles.phoneNumber}>{obfuscatedNumber}</span>
}

export const PhoneNumber = memo(PhoneNumberComponent)
