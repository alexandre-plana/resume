import { memo } from 'react'
import styles from '../App.module.css'

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  vue3: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  react: { bg: '#e0f2fe', text: '#075985', border: '#7dd3fc' },
  typescript: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  nodejs: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  zod: { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  sigmajs: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  apirest: { bg: '#e0f2fe', text: '#0c4a6e', border: '#7dd3fc' },
  mcp: { bg: '#f3e8ff', text: '#7e22ce', border: '#d8b4fe' },
  threejs: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
  reactthreefiber: { bg: '#ccfbf1', text: '#115e59', border: '#5eead4' },
  webworkers: { bg: '#ffedd5', text: '#9a3412', border: '#fdba74' },
  singlespa: { bg: '#ddd6fe', text: '#5b21b6', border: '#d8b4fe' },
  microfrontend: { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  jest: { bg: '#f3e8ff', text: '#7e22ce', border: '#d8b4fe' },
  sonarqube: { bg: '#f3e8ff', text: '#7e22ce', border: '#d8b4fe' },
  scrum: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  unity: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
  csharp: { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  ar: { bg: '#fce7f3', text: '#9d174d', border: '#f9a8d4' },
  mobile: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  desktop: { bg: '#e0f2fe', text: '#075985', border: '#7dd3fc' },
  offline: { bg: '#f6f8fa', text: '#6e7781', border: '#d8dee4' },
  api: { bg: '#e0f2fe', text: '#0c4a6e', border: '#7dd3fc' },
  performance: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
  maintenabilite: { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  maplibre: { bg: '#e0f2fe', text: '#075985', border: '#7dd3fc' },
  deckgl: { bg: '#ccfbf1', text: '#115e59', border: '#5eead4' },
  mqtt: { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  socketio: { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' },
  treeshaking: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  vitest: { bg: '#ecfccb', text: '#3f6212', border: '#bef264' },
  gitlabci: { bg: '#ffedd5', text: '#9a3412', border: '#fdba74' },
}

const DEFAULT_TAG_COLOR = {
  bg: 'rgba(9,105,218,0.08)',
  text: 'var(--blue)',
  border: 'rgba(9,105,218,0.2)',
}

interface InlineTechTextProps {
  text: string
}

function InlineTechTextComponent({ text }: InlineTechTextProps) {
  const parts = text.split(/(#[a-zA-Z0-9-]+)/g).filter((part) => part.length > 0)

  return parts.map((part, index) => {
    if (!part.startsWith('#')) {
      return <span key={`inline-tech-text-${index}`}>{part}</span>
    }

    const tagName = part.slice(1).toLowerCase().replace(/[^a-z0-9]/g, '')
    const color = TAG_COLORS[tagName] ?? DEFAULT_TAG_COLOR

    return (
      <span
        key={`inline-tech-tag-${index}`}
        className={styles.missionInlineTag}
        style={{ background: color.bg, color: color.text, borderColor: color.border }}
      >
        {part}
      </span>
    )
  })
}

export const InlineTechText = memo(InlineTechTextComponent)
