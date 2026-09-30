import { memo } from 'react'
import { getTranslations, type Language } from '../locales'
import resumeQrUrl from '../assets/resume-qr.svg'
import styles from './QRCode.module.css'

interface QRCodeProps {
  url: string
  language: Language
}

function QRCodeComponent({ url, language }: QRCodeProps) {
  const t = getTranslations(language)
  const qrMessage = t.qr.message
  const qrLabel = t.qr.label
  
  return (
    <div className={styles.qrCodeContainer}>
      <div className={styles.qrCodeCard}>
        <img 
          src={resumeQrUrl}
          alt={t.qr.alt}
          width={150}
          height={150}
          className={styles.qrCodeImage}
        />
        <div className={styles.qrCodeText}>
          <div className={styles.qrCodeLabel}>{qrLabel}</div>
          <div className={styles.qrCodeMessage}>{qrMessage}</div>
          <div className={styles.qrCodeUrl}>{url}</div>
        </div>
      </div>
    </div>
  )
}

export const QRCode = memo(QRCodeComponent)
