import { memo, useEffect, useState } from 'react'
import type { PersonalProject } from '../../types'
import type { Translations } from '../../locales'
import { matchAsyncViewState, type AsyncViewState } from '../../types/asyncViewState'
import { InlineTechText } from '../InlineTechText'
import { TechBadge } from '../TechBadge'
import { ProjectDialog } from '../ProjectDialog'
import { getPopoutAnimation } from '../../utils/popoutAnimation'
import { parsePersonalProjectHash } from '../../navigation/personalProjectHash'
import styles from '../../App.module.css'

interface PersonalProjectsTabProps {
  state: AsyncViewState<PersonalProject[]>
  t: Translations
}

function PersonalProjectsTabComponent({ state, t }: PersonalProjectsTabProps) {
  const [activeProjectId, setActiveProjectId] = useState<{ id: number; animation: ReturnType<typeof getPopoutAnimation> } | null>(null)
  const [locationHash, setLocationHash] = useState(() =>
    typeof window === 'undefined' ? '' : window.location.hash,
  )

  useEffect(() => {
    const handleHashChange = () => setLocationHash(window.location.hash)

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const projectId = parsePersonalProjectHash(locationHash)
  const projectAvailable =
    state.status === 'ready' && projectId !== null && state.data.some((project) => project.id === projectId)

  useEffect(() => {
    if (!projectAvailable || projectId === null) return

    const frameId = window.requestAnimationFrame(() => {
      const projectCard = document.getElementById(`personal-project-${projectId}`)
      projectCard?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      projectCard?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [projectAvailable, projectId])

  const openProjectPopout = (project: PersonalProject, sourceEl: HTMLElement | null) => {
    setActiveProjectId({ id: project.id, animation: getPopoutAnimation(sourceEl) })
  }

  const closeProjectPopout = () => {
    setActiveProjectId(null)
  }

  const activeProject =
    activeProjectId && state.status === 'ready'
      ? state.data.find((project) => project.id === activeProjectId.id)
      : undefined

  return matchAsyncViewState(state, {
    loading: () => <div className={styles.formationEmpty}>{t.common.loading}</div>,
    error: ({ message }) => <div className={styles.formationEmpty}>{message}</div>,
    ready: ({ data: visibleProjects }) => (
      <div className={styles.formationsSection}>
      <div className={styles.personalGrid}>
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            id={`personal-project-${project.id}`}
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
            <div className={styles.formSubtitle}>
              <InlineTechText text={project.desc} />
            </div>
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

      {activeProject && activeProjectId && (
        <ProjectDialog popout={{ project: activeProject, animation: activeProjectId.animation }} t={t} onClose={closeProjectPopout} />
      )}
      </div>
    ),
  })
}

export const PersonalProjectsTab = memo(PersonalProjectsTabComponent)
