import React, { memo } from 'react'
import avatarImg from '../Avatar.png'
import { getTranslations, type Language } from '../locales'
import styles from './Avatar.module.css'

interface AvatarProps {
  name: string
  initials?: string
  language?: Language
}

const AvatarComponent: React.FC<AvatarProps> = ({ name, language = 'fr' }) => {
  const t = getTranslations(language)

  return (
    <div className={styles.wrap}>
      <img src={avatarImg} alt={name} className={styles.avatar} />
      <div className={styles.badge}>
        <span className={styles.dot}></span>
        {t.common.openToWork}
      </div>
    </div>
  )
}

export const Avatar = memo(AvatarComponent)
