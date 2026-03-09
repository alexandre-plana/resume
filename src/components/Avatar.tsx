import React from 'react'
import avatarImg from '../Avatar.png'
import styles from './Avatar.module.css'

interface AvatarProps {
  name: string
  initials?: string
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  return (
    <div className={styles.wrap}>
      <img src={avatarImg} alt={name} className={styles.avatar} />
      <div className={styles.badge}>
        <span className={styles.dot}></span>
        Open to work
      </div>
    </div>
  )
}
