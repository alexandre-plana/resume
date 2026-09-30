import type { CSSProperties } from 'react'
import type { Translations } from '../locales'
import type { Mission } from '../types'
import type { PopoutAnimation } from '../utils/popoutAnimation'
import { Dialog } from './Dialog'
import { InlineTechText } from './InlineTechText'
import { TechBadge } from './TechBadge'
import styles from '../App.module.css'

export interface MissionPopout {
  company: string
  employer: string
  mission: Mission
  animation: PopoutAnimation
}

export interface MissionDialogProps {
  popout: MissionPopout
  t: Translations
  onClose: () => void
  onOpenPersonalProject: (projectId: number) => void
}

const getDialogStyle = (animation: PopoutAnimation): CSSProperties => ({
  '--mission-from-x': `${animation.fromX}px`,
  '--mission-from-y': `${animation.fromY}px`,
  '--mission-from-scale': `${animation.fromScale}`,
} as CSSProperties)

export function MissionDialog({ popout, t, onClose, onOpenPersonalProject }: MissionDialogProps) {
  const { mission, company, employer, animation } = popout
  const relatedProject = mission.relatedPersonalProject

  return (
    <Dialog
      labelledBy="mission-popout-title"
      onClose={onClose}
      className={styles.missionModal}
      style={getDialogStyle(animation)}
    >
      <div className={styles.missionModalHeader}>
        <div className={styles.missionModalTitleWrap}>
          <div className={styles.missionModalTitleRow}>
            <div id="mission-popout-title" className={styles.missionModalTitle}>
              {mission.name}
            </div>
            {mission.isCurrent && <span className={styles.missionModalCurrentBadge}>{t.mission.current}</span>}
          </div>
          <div className={styles.missionModalCompany}>
            ⏱ {mission.period} - {mission.badge}
          </div>
          <div className={`${styles.missionModalCompany} ${styles.missionModalEmployer}`}>
            {company} · {employer}
          </div>
        </div>
        <button type="button" className={styles.missionModalClose} onClick={onClose} title={t.mission.close} aria-label={t.mission.close}>
          ✕
        </button>
      </div>

      <div className={styles.missionModalCore}>
        <div className={styles.missionModalContext}>{mission.context}</div>
        <div className={styles.missionModalDesc}>
          <InlineTechText text={mission.desc} />
        </div>

        {mission.tasks && mission.tasks.length > 0 && (
          <div className={styles.missionTasksSection}>
            <div className={styles.missionTasksTitle}>{t.mission.tasksTitle}</div>
            <ul className={styles.missionTasksList}>
              {mission.tasks.map((task, idx) => (
                <li key={`mission-task-${mission.id}-${idx}`} className={styles.missionTaskItem}>
                  <InlineTechText text={task} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {mission.retrospective && (
          <div className={styles.missionRetrospectiveSection}>
            <div className={styles.missionRetrospectiveTitle}>{t.mission.retrospective}</div>
            <div className={styles.missionRetrospectiveText}>{mission.retrospective}</div>
          </div>
        )}

        {relatedProject && (
          <a
            href={`#personal-project-${relatedProject.id}`}
            className={styles.relatedPersonalProjectLink}
            onClick={(event) => {
              event.preventDefault()
              onOpenPersonalProject(relatedProject.id)
            }}
          >
            {t.mission.relatedPersonalProject} : {relatedProject.name} →
          </a>
        )}
      </div>

      <div className={styles.missionMetaGrid}>
        <div className={styles.missionMetaTags}>
          {mission.tags.map((tag, idx) => (
            <TechBadge key={`mission-popout-${mission.id}-${tag}-${idx}`} label={tag} kind={tag} />
          ))}
        </div>
      </div>
    </Dialog>
  )
}
