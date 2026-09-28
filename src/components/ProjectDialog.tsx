import type { CSSProperties } from 'react'
import type { Translations } from '../locales'
import type { PersonalProject } from '../types'
import type { PopoutAnimation } from '../utils/popoutAnimation'
import { Dialog } from './Dialog'
import { InlineTechText } from './InlineTechText'
import { TechBadge } from './TechBadge'
import styles from '../App.module.css'

export interface ProjectPopout {
  project: PersonalProject
  animation: PopoutAnimation
}

export interface ProjectDialogProps {
  popout: ProjectPopout
  t: Translations
  onClose: () => void
}

const getDialogStyle = (animation: PopoutAnimation): CSSProperties => ({
  '--mission-from-x': `${animation.fromX}px`,
  '--mission-from-y': `${animation.fromY}px`,
  '--mission-from-scale': `${animation.fromScale}`,
} as CSSProperties)

export function ProjectDialog({ popout, t, onClose }: ProjectDialogProps) {
  const { project, animation } = popout

  return (
    <Dialog
      labelledBy="personal-popout-title"
      onClose={onClose}
      className={styles.missionModal}
      style={getDialogStyle(animation)}
    >
      <div className={styles.missionModalHeader}>
        <div className={styles.missionModalTitleWrap}>
          <div className={styles.missionModalTitleRow}>
            <div id="personal-popout-title" className={styles.missionModalTitle}>
              {project.name}
            </div>
            {project.status && <span className={styles.personalStatus}>{project.status}</span>}
          </div>
          <div className={styles.missionModalCompany}>
            ⏱ {project.period} - {project.role}
          </div>
          <div className={`${styles.missionModalCompany} ${styles.missionModalEmployer}`}>
            {project.kind}
          </div>
        </div>
        <button type="button" className={styles.missionModalClose} onClick={onClose} title={t.mission.close}>
          ✕
        </button>
      </div>

      <div className={styles.missionModalCore}>
        <div className={styles.missionModalContext}>
          <InlineTechText text={project.desc} />
        </div>
        {project.details && (
          <div className={styles.missionModalDesc}>
            <InlineTechText text={project.details} />
          </div>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <div className={styles.missionTasksSection}>
            <div className={styles.missionTasksTitle}>{t.personalModal.highlightsTitle}</div>
            <ul className={styles.missionTasksList}>
              {project.highlights.map((highlight, idx) => (
                <li key={`personal-highlight-${project.id}-${idx}`} className={styles.missionTaskItem}>
                  <InlineTechText text={highlight} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.missionMetaGrid}>
        <div className={styles.missionMetaTags}>
          {project.stack.map((tech, idx) => (
            <TechBadge key={`personal-popout-${project.id}-${tech}-${idx}`} label={tech} kind={tech} />
          ))}
        </div>
      </div>
    </Dialog>
  )
}
