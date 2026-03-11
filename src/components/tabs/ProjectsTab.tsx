import { memo, useMemo, useState } from 'react'
import type { Project } from '../../types'
import type { Translations } from '../../locales'
import { TechBadge } from '../TechBadge'
import styles from '../../App.module.css'

interface ProjectsTabProps {
  projects: Project[] | undefined
  isLoading: boolean
  isError: boolean
  errorMessage: string
  t: Translations
}

type ProjectType = 'professional' | 'personal'

const isPersonalProject = (project: Project): boolean => project.name.toLowerCase() === 'alexandre-plana/cv-react'

const getProjectType = (project: Project): ProjectType => isPersonalProject(project) ? 'personal' : 'professional'

function ProjectsTabComponent({ projects, isLoading, isError, errorMessage, t }: ProjectsTabProps) {
  const [projectTypeFilters, setProjectTypeFilters] = useState<Record<ProjectType, boolean>>({
    professional: true,
    personal: true,
  })

  const toggleProjectType = (kind: ProjectType) => {
    setProjectTypeFilters((prev) => ({ ...prev, [kind]: !prev[kind] }))
  }

  const visibleProjects = useMemo(() => {
    if (!projects) {
      return []
    }

    return projects.filter((project) => projectTypeFilters[getProjectType(project)])
  }, [projects, projectTypeFilters])

  if (isLoading) {
    return <div className={styles.formationEmpty}>{t.common.loading}</div>
  }

  if (isError) {
    return <div className={styles.formationEmpty}>{errorMessage}</div>
  }

  if (!projects || projects.length === 0) {
    return <div className={styles.formationEmpty}>{t.common.noData}</div>
  }

  return (
    <div className={styles.projectsSection}>
      <div className={styles.formationControls}>
        <div className={styles.formationFilters}>
          <span className={styles.formationControlLabel}>{t.projectControls.types}</span>
          <label className={styles.formationFilterItem}>
            <input
              type="checkbox"
              checked={projectTypeFilters.professional}
              onChange={() => toggleProjectType('professional')}
            />
            {t.projectControls.professional}
          </label>
          <label className={styles.formationFilterItem}>
            <input
              type="checkbox"
              checked={projectTypeFilters.personal}
              onChange={() => toggleProjectType('personal')}
            />
            {t.projectControls.personal}
          </label>
        </div>
      </div>

      <div className={styles.timeline}>
        {visibleProjects.map((project) => (
          <div key={project.id} className={styles.project}>
            <div className={styles.projectHeader}>
              <div className={styles.tlDot} />
              <div className={styles.tlInfo}>
                <div className={styles.projectTitleRow}>
                  <div className={styles.tlName}>{project.name}</div>
                  <span
                    className={`${styles.projectTypeBadge} ${isPersonalProject(project) ? styles.projectTypeBadgePersonal : styles.projectTypeBadgeProfessional}`}
                  >
                    {isPersonalProject(project) ? 'Perso' : 'Pro'}
                  </span>
                </div>
                <div className={styles.tlRole}>{project.role}</div>
                <span className={styles.tlPeriod}>{project.period}</span>
              </div>
            </div>
            <div className={styles.projectContent}>
              <div className={styles.projectContext}>{project.context}</div>
              <div className={styles.projectDesc}>{project.desc}</div>
              <div className={styles.tags}>
                {project.tags.map((tag, idx) => (
                  <TechBadge key={`project-${project.id}-${tag}-${idx}`} label={tag} kind={tag} />
                ))}
              </div>
            </div>
          </div>
        ))}
        {visibleProjects.length === 0 && <div className={styles.formationEmpty}>{t.projectControls.empty}</div>}
      </div>
    </div>
  )
}

export const ProjectsTab = memo(ProjectsTabComponent)
