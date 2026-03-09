import React from 'react'
import styles from './Avatar.module.css'

interface AvatarProps {
  name: string
  initials: string
}

export const Avatar: React.FC<AvatarProps> = ({ name, initials }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.badge}>
        <span className={styles.dot}></span>
        Open to work
      </div>
    </div>
  )
}
