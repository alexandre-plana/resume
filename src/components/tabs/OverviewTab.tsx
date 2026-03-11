import { memo } from 'react'
import type { Experience, Mission } from '../../types'
import type { Language, Translations } from '../../locales'
import { QRCode } from '../QRCode'
import { TechBadge } from '../TechBadge'
import styles from '../../App.module.css'

const MISSION_TASK_PREVIEW_LIMIT = 3
const TASK_PREVIEW_MAX_LENGTH = 92

const summarizeTaskPreview = (task: string) => {
  const normalized = task.replace(/\s+/g, ' ').trim().replace(/[.?!;:]+$/, '')
  const lowerCased = normalized.toLowerCase()

  for (const separator of [':', ';', ',']) {
    const separatorIndex = normalized.indexOf(separator)
    if (separatorIndex > 36) {
      return normalized.slice(0, separatorIndex).trim()
    }
  }

  for (const separator of [' pour ', ' avec ', ' via ', ' afin de ']) {
    const separatorIndex = lowerCased.indexOf(separator)
    if (separatorIndex > 44) {
      return normalized.slice(0, separatorIndex).trim()
    }
  }

  if (normalized.length <= TASK_PREVIEW_MAX_LENGTH) {
    return normalized
  }

  const shortened = normalized.slice(0, TASK_PREVIEW_MAX_LENGTH)
  const lastWordBoundary = shortened.lastIndexOf(' ')

  return `${shortened.slice(0, lastWordBoundary > 52 ? lastWordBoundary : TASK_PREVIEW_MAX_LENGTH).trim()}…`
}

interface OverviewTabProps {
  experiences: Experience[] | undefined
  isLoading: boolean
  isError: boolean
  errorMessage: string
  language: Language
  t: Translations
  onOpenMission: (mission: Mission, company: string, employer: string, sourceEl: HTMLElement | null) => void
}

function OverviewTabComponent({
  experiences,
  isLoading,
  isError,
  errorMessage,
  language,
  t,
  onOpenMission,
}: OverviewTabProps) {
  if (isLoading) {
    return <div className={styles.formationEmpty}>{t.common.loading}</div>
  }

  if (isError) {
    return <div className={styles.formationEmpty}>{errorMessage}</div>
  }

  if (!experiences || experiences.length === 0) {
    return <div className={styles.formationEmpty}>{t.common.noData}</div>
  }

  return (
    <>
      <div className={styles.sectionHeader}>📌 {t.sections.professionalExperience}</div>
      <div className={styles.timeline}>
        {experiences.map((exp) => (
          <div key={exp.id}>
            <div className={styles.tlCompany}>
              <div className={styles.tlDot} />
              <div className={styles.tlInfo}>
                <div className={styles.tlName}>{exp.company}</div>
                <div className={styles.tlRole}>{exp.employer}</div>
                <span className={styles.tlPeriod}>{exp.period}</span>
              </div>
            </div>
            <div className={styles.tlMissions}>
              {exp.missions.map((mission) => {
                const missionTasks = mission.tasks ?? []
                const previewTasks = missionTasks.slice(0, MISSION_TASK_PREVIEW_LIMIT)
                const remainingTaskCount = Math.max(0, missionTasks.length - previewTasks.length)

                return (
                  <div
                    key={mission.id}
                    className={mission.featured ? styles.missionFeatured : styles.mission}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="dialog"
                    aria-label={t.mission.openDetails}
                    onClick={(event) => onOpenMission(mission, exp.company, exp.employer, event.currentTarget)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onOpenMission(mission, exp.company, exp.employer, event.currentTarget)
                      }
                    }}
                  >
                    <div className={styles.missionTop}>
                      <span style={{ color: 'var(--text-3)' }}>📁</span>
                      <span className={styles.missionName}>{mission.name}</span>
                      <span className={styles.missionBadge}>{mission.badge}</span>
                    </div>
                    <div className={styles.missionContext}>{mission.context}</div>
                    <div className={`${styles.missionDesc} ${styles.missionDescCompact}`}>{mission.desc}</div>
                    {previewTasks.length > 0 && (
                      <ul className={styles.missionTaskPreview} aria-label={t.mission.tasksTitle}>
                        {previewTasks.map((task, idx) => (
                          <li
                            key={`mission-preview-${mission.id}-${idx}`}
                            className={styles.missionTaskPreviewItem}
                            title={task}
                          >
                            {summarizeTaskPreview(task)}
                          </li>
                        ))}
                        {remainingTaskCount > 0 && (
                          <li className={styles.missionTaskPreviewMore}>+{remainingTaskCount}</li>
                        )}
                      </ul>
                    )}
                    <div className={styles.missionFooterRow}>
                      <div className={`${styles.tags} ${styles.missionTagsRow}`}>
                        {mission.tags.map((tag, idx) => (
                          <TechBadge key={`mission-${mission.id}-${tag}-${idx}`} label={tag} kind={tag} />
                        ))}
                      </div>
                      <span className={styles.missionExpandIcon} aria-hidden="true" title={t.mission.expand}>
                        ⤢
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.printQrBanner}>
        <QRCode url="https://alexandre-plana.github.io/resume/" language={language} />
      </div>
    </>
  )
}

export const OverviewTab = memo(OverviewTabComponent)
