import { memo } from 'react'
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

const isPersonalProject = (project: Project): boolean => project.name.toLowerCase() === 'alexandre-plana/cv-react'

function ProjectsTabComponent({ projects, isLoading, isError, errorMessage, t }: ProjectsTabProps) {
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
      <div className={styles.sectionHeader}>📁 {t.sections.professionalProjects}</div>
      <div className={styles.timeline}>
        {projects.map((project) => (
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
      </div>
    </div>
  )
}

export const ProjectsTab = memo(ProjectsTabComponent)
