import styles from './QRCode.module.css'

interface QRCodeProps {
  url: string
  language: 'fr' | 'en'
}

export function QRCode({ url, language }: QRCodeProps) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=${encodeURIComponent(url)}`
  const qrMessage = language === 'fr'
    ? 'QR code vers une version plus complete du DV en ligne.'
    : 'QR code to a more complete online resume version.'
  const qrLabel = language === 'fr' ? 'Version complete du CV' : 'Extended Resume'
  
  return (
    <div className={styles.qrCodeContainer}>
      <div className={styles.qrCodeCard}>
        <img 
          src={qrCodeUrl} 
          alt="QR Code" 
          width={64}
          height={64}
          className={styles.qrCodeImage}
        />
        <div className={styles.qrCodeText}>
          <div className={styles.qrCodeLabel}>{qrLabel}</div>
          <div className={styles.qrCodeMessage}>{qrMessage}</div>
        </div>
      </div>
    </div>
  )
}
