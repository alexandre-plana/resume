import styles from './QRCode.module.css'

interface QRCodeProps {
  url: string
  language: 'fr' | 'en'
}

export function QRCode({ url, language }: QRCodeProps) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=${encodeURIComponent(url)}`
  
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
          <div className={styles.qrCodeLabel}>
            {language === 'fr' ? 'Version en ligne' : 'Online version'}
          </div>
          <div className={styles.qrCodeUrl}>{url}</div>
        </div>
      </div>
    </div>
  )
}
