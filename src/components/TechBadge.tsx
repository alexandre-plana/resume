import React, { memo } from 'react'
import { getTechTagTheme } from '../theme/techTagTheme'
import styles from './TechBadge.module.css'

interface TechBadgeProps {
  label: string
  kind: string
}

const TechBadgeComponent: React.FC<TechBadgeProps> = ({ label, kind }) => {
  const theme = getTechTagTheme(kind)
  const style = {
    background: theme.bg,
    color: theme.text,
    borderColor: theme.border,
  }

  return (
    <span className={styles.tag} style={style}>
      <span
        className={styles.dot}
        style={{ background: theme.dot }}
      />
      {label.toLowerCase()}
    </span>
  )
}

export const TechBadge = memo(TechBadgeComponent)
