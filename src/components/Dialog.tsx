import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import styles from './Dialog.module.css'

export interface DialogProps {
  labelledBy: string
  onClose: () => void
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const getFocusableElements = (dialog: HTMLElement): HTMLElement[] =>
  Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true',
  )

export function Dialog({ labelledBy, onClose, children, className, style }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useLayoutEffect(() => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const dialog = dialogRef.current
    const initialFocus = dialog?.querySelector<HTMLElement>('[data-dialog-initial-focus]')
    const focusTarget = initialFocus ?? (dialog ? getFocusableElements(dialog)[0] : null) ?? dialog
    focusTarget?.focus({ preventScroll: true })

    return () => {
      document.body.style.overflow = previousOverflow
      const opener = openerRef.current
      if (opener?.isConnected) {
        opener.focus({ preventScroll: true })
      }
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const dialog = dialogRef.current
      if (!dialog || !dialog.contains(document.activeElement)) {
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements(dialog)
      if (focusableElements.length === 0) {
        event.preventDefault()
        dialog.focus({ preventScroll: true })
        return
      }

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && (activeElement === first || activeElement === dialog)) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && (activeElement === last || activeElement === dialog)) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      className={styles.overlay}
      data-testid="dialog-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCloseRef.current()
        }
      }}
    >
      <div
        ref={dialogRef}
        className={className}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  )
}
