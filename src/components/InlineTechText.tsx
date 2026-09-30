import { memo } from 'react'
import styles from '../App.module.css'
import { getTechTagTheme } from '../theme/techTagTheme'
import { tokenizeTechText } from '../utils/techTokens'

interface InlineTechTextProps {
  text: string
}

function InlineTechTextComponent({ text }: InlineTechTextProps) {
  return tokenizeTechText(text).map((token, index) => {
    if (token.type === 'text') {
      return <span key={`inline-tech-text-${index}`}>{token.value}</span>
    }

    const theme = getTechTagTheme(token.key)

    return (
      <span
        key={`inline-tech-tag-${index}`}
        className={styles.missionInlineTag}
        style={{ background: theme.bg, color: theme.text, borderColor: theme.border }}
      >
        {token.value}
      </span>
    )
  })
}

export const InlineTechText = memo(InlineTechTextComponent)
