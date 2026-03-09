import React from 'react'
import styles from './TechBadge.module.css'

const TAG_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  js: { bg: '#fef9c3', text: '#854d0e', border: '#fde047', dot: '#f1e05a' },
  ts: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd', dot: '#3178c6' },
  html: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5', dot: '#e34c26' },
  css: { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd', dot: '#9b59b6' },
  vue: { bg: '#dcfce7', text: '#166534', border: '#86efac', dot: '#41b883' },
  csharp: { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd', dot: '#a97bff' },
  dart: { bg: '#cffafe', text: '#155e75', border: '#67e8f9', dot: '#00b4d8' },
  flutter: { bg: '#e0f2fe', text: '#075985', border: '#7dd3fc', dot: '#54c5f8' },
  unity: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1', dot: '#94a3b8' },
  figma: { bg: '#f3e8ff', text: '#6b21a8', border: '#d8b4fe', dot: '#a259ff' },
  git: { bg: '#ffedd5', text: '#9a3412', border: '#fdba74', dot: '#fdba74' },
  uiux: { bg: '#ffe4e6', text: '#9f1239', border: '#fda4af', dot: '#fda4af' },
  mobile: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7', dot: '#6ee7b7' },
  desktop: { bg: '#e0f2fe', text: '#075985', border: '#7dd3fc', dot: '#7dd3fc' },
  ar: { bg: '#fce7f3', text: '#9d174d', border: '#f9a8d4', dot: '#f9a8d4' },
  vr: { bg: '#eef2ff', text: '#3730a3', border: '#a5b4fc', dot: '#a5b4fc' },
  '3d': { bg: '#fef3c7', text: '#92400e', border: '#fcd34d', dot: '#fcd34d' },
  jest: { bg: '#f3e8ff', text: '#7e22ce', border: '#d8b4fe', dot: '#c084fc' },
  spa: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d', dot: '#fde047' },
  agile: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7', dot: '#6ee7b7' },
  green: { bg: '#dcfce7', text: '#166534', border: '#86efac', dot: '#86efac' },
  jira: { bg: '#e0f0ff', text: '#0052cc', border: '#2684ff', dot: '#2684ff' },
}

interface TechBadgeProps {
  label: string
  kind: string
}

export const TechBadge: React.FC<TechBadgeProps> = ({ label, kind }) => {
  const colors = TAG_COLORS[kind] || TAG_COLORS.green
  const style = {
    background: colors.bg,
    color: colors.text,
    borderColor: colors.border,
  }

  return (
    <span className={styles.tag} style={style}>
      <span
        className={styles.dot}
        style={{ background: colors.dot }}
      />
      {label}
    </span>
  )
}
