import { memo, useEffect, useState, type CSSProperties } from 'react'
import type { PersonalProject } from '../../types'
import type { Translations } from '../../locales'
import { TechBadge } from '../TechBadge'
import styles from '../../App.module.css'

type ProjectPopout = {
  project: PersonalProject
  animation: {
    fromX: number
    fromY: number
    fromScale: number
  }
}

interface PersonalProjectsTabProps {
  projects: PersonalProject[] | undefined
  isLoading: boolean
  isError: boolean
  errorMessage: string
  t: Translations
}

const getProjectPopoutAnimation = (sourceEl: HTMLElement | null) => {
  if (!sourceEl) {
    return { fromX: 0, fromY: 8, fromScale: 0.96 }
  }

  const rect = sourceEl.getBoundingClientRect()
  const viewportCenterX = window.innerWidth / 2
  const viewportCenterY = window.innerHeight / 2
  const sourceCenterX = rect.left + rect.width / 2
  const sourceCenterY = rect.top + rect.height / 2
  const targetModalWidth = Math.max(1, Math.min(840, window.innerWidth - 32))
  const fromScale = Math.min(0.98, Math.max(0.42, rect.width / targetModalWidth))

  return {
    fromX: sourceCenterX - viewportCenterX,
    fromY: sourceCenterY - viewportCenterY,
    fromScale,
  }
}

function PersonalProjectsTabComponent({ projects, isLoading, isError, errorMessage, t }: PersonalProjectsTabProps) {
  const [activeProject, setActiveProject] = useState<ProjectPopout | null>(null)

  const openProjectPopout = (project: PersonalProject, sourceEl: HTMLElement | null) => {
    setActiveProject({ project, animation: getProjectPopoutAnimation(sourceEl) })
  }

  const closeProjectPopout = () => {
    setActiveProject(null)
  }

  useEffect(() => {
    if (!activeProject) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectPopout()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject])

  if (isLoading) {
    return <div className={styles.formationEmpty}>{t.common.loading}</div>
  }

  if (isError) {
    return <div className={styles.formationEmpty}>{errorMessage}</div>
  }

  const visibleProjects = projects ?? []

  const projectModalStyle = activeProject
    ? ({
        '--mission-from-x': `${activeProject.animation.fromX}px`,
        '--mission-from-y': `${activeProject.animation.fromY}px`,
        '--mission-from-scale': `${activeProject.animation.fromScale}`,
      } as CSSProperties)
    : undefined

  return (
    <div className={styles.formationsSection}>
      <div className={styles.personalGrid}>
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            className={`${styles.formationCard} ${styles.personalCardClickable}`}
            role="button"
            tabIndex={0}
            title={t.personalModal.openDetails}
            onClick={(event) => openProjectPopout(project, event.currentTarget)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openProjectPopout(project, event.currentTarget)
              }
            }}
          >
            <div className={styles.formLabel}>
              <span className={styles.formLabelIcon} aria-hidden="true">
                🛠️
              </span>
              {project.kind}
              {project.status && <span className={styles.personalStatus}>{project.status}</span>}
              <span className={styles.personalExpandIcon} aria-hidden="true" title={t.mission.expand}>
                ⤢
              </span>
            </div>
            <div className={styles.formTitle}>{project.name}</div>
            <div className={styles.formSubtitle}>{project.desc}</div>
            <div className={styles.formMeta}>
              🗓 {project.period} · {project.role}
            </div>
            <div className={styles.personalStack}>
              {project.stack.map((tech, idx) => (
                <TechBadge key={`personal-${project.id}-${tech}-${idx}`} label={tech} kind={tech} />
              ))}
            </div>
          </div>
        ))}
        {visibleProjects.length === 0 && <div className={styles.formationEmpty}>{t.formationControls.empty}</div>}
      </div>

      {activeProject && (
        <div className={styles.missionOverlay} onClick={closeProjectPopout}>
          <div
            className={styles.missionModal}
            style={projectModalStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="personal-popout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.missionModalHeader}>
              <div className={styles.missionModalTitleWrap}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <div id="personal-popout-title" className={styles.missionModalTitle}>
                    {activeProject.project.name}
                  </div>
                  {activeProject.project.status && (
                    <span className={styles.personalStatus}>{activeProject.project.status}</span>
                  )}
                </div>
                <div className={styles.missionModalCompany}>
                  ⏱ {activeProject.project.period} - {activeProject.project.role}
                </div>
                <div className={styles.missionModalCompany} style={{ marginTop: '4px' }}>
                  {activeProject.project.kind}
                </div>
              </div>
              <button className={styles.missionModalClose} onClick={closeProjectPopout} title={t.mission.close}>
                ✕
              </button>
            </div>

            <div className={styles.missionModalCore}>
              <div className={styles.missionModalContext}>{activeProject.project.desc}</div>
              {activeProject.project.details && (
                <div className={styles.missionModalDesc}>{activeProject.project.details}</div>
              )}

              {activeProject.project.highlights && activeProject.project.highlights.length > 0 && (
                <div className={styles.missionTasksSection}>
                  <div className={styles.missionTasksTitle}>{t.personalModal.highlightsTitle}</div>
                  <ul className={styles.missionTasksList}>
                    {activeProject.project.highlights.map((highlight, idx) => (
                      <li key={`personal-highlight-${activeProject.project.id}-${idx}`} className={styles.missionTaskItem}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.missionMetaGrid}>
              <div className={styles.missionMetaTags}>
                {activeProject.project.stack.map((tech, idx) => (
                  <TechBadge
                    key={`personal-popout-${activeProject.project.id}-${tech}-${idx}`}
                    label={tech}
                    kind={tech}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const PersonalProjectsTab = memo(PersonalProjectsTabComponent)
