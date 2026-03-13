import { memo } from 'react'
import type { Experience, Mission } from '../../types'
import type { Language, Translations } from '../../locales'
import { QRCode } from '../QRCode'
import styles from '../../App.module.css'

const MISSION_TASK_PREVIEW_LIMIT = 2
const TASK_PREVIEW_MAX_LENGTH = 160

const getPrioritizedTaskPreview = (
  missionTasks: string[],
  priorityActionIndexes: number[] | undefined,
  limit: number,
): string[] => {
  if (missionTasks.length <= limit) {
    return missionTasks
  }

  const prioritizedTasks: string[] = []
  const usedIndexes = new Set<number>()

  for (const idx of priorityActionIndexes ?? []) {
    if (Number.isInteger(idx) && idx >= 0 && idx < missionTasks.length && !usedIndexes.has(idx)) {
      prioritizedTasks.push(missionTasks[idx])
      usedIndexes.add(idx)
    }

    if (prioritizedTasks.length >= limit) {
      return prioritizedTasks
    }
  }

  for (let idx = 0; idx < missionTasks.length; idx += 1) {
    if (usedIndexes.has(idx)) {
      continue
    }

    prioritizedTasks.push(missionTasks[idx])

    if (prioritizedTasks.length >= limit) {
      break
    }
  }

  return prioritizedTasks
}

const summarizeTaskPreview = (task: string) => {
  const normalized = task.replace(/\s+/g, ' ').trim().replace(/[.?!;:]+$/, '')

  if (normalized.length <= TASK_PREVIEW_MAX_LENGTH) {
    return normalized
  }

  const shortened = normalized.slice(0, TASK_PREVIEW_MAX_LENGTH)
  const lastWordBoundary = shortened.lastIndexOf(' ')

  return `${shortened.slice(0, lastWordBoundary > 96 ? lastWordBoundary : TASK_PREVIEW_MAX_LENGTH).trim()}…`
}

// Inline tag color logic (matches TechBadge)
const TAG_COLORS: { [key: string]: { bg: string; text: string; border: string } } = {
  vue3: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
  typescript: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
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
  // Add more as needed
}

const renderSummaryWithInlineTags = (summary: string) => {
  const parts = summary.split(/(#[a-zA-Z0-9-]+)/g).filter((part) => part.length > 0)

  return parts.map((part, idx) => {
    if (part.startsWith('#')) {
      const tagName = part.slice(1).toLowerCase().replace(/[^a-z0-9]/g, '')
      const color = TAG_COLORS[tagName] || { bg: 'rgba(9,105,218,0.08)', text: 'var(--blue)', border: 'rgba(9,105,218,0.2)' }
      return (
        <span
          key={`mission-summary-tag-${idx}`}
          className={styles.missionInlineTag}
          style={{ background: color.bg, color: color.text, borderColor: color.border }}
        >
          {part}
        </span>
      )
    }
    return <span key={`mission-summary-text-${idx}`}>{part}</span>
  })
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
        {experiences.map((exp) => {
          const missions = exp.missions.filter((m) => m.type !== 'projet');
          return (
            <div key={exp.id}>
              <div className={styles.tlCompany}>
                <div className={styles.tlDot} />
                <div className={styles.tlInfo}>
                  <div className={styles.tlName}>{exp.company}</div>
                  <div className={styles.tlRole}>{exp.employer}</div>
                  <span className={styles.tlPeriod}>{exp.period}</span>
                </div>
              </div>
              {/* Missions (une par ligne) */}
              {missions.length > 0 && (
                <div className={styles.tlMissions}>
                  {missions.map((mission) => {
                    const missionTasks = mission.tasks ?? [];
                    const cardSummary = mission.cardSummary?.trim();
                    const hasCardSummary = Boolean(cardSummary);
                    const previewTasks = getPrioritizedTaskPreview(
                      missionTasks,
                      mission.priorityActionIndexes,
                      MISSION_TASK_PREVIEW_LIMIT,
                    );
                    const remainingTaskCount = Math.max(0, missionTasks.length - previewTasks.length);
                    const cardClass = mission.featured ? styles.missionFeatured : styles.mission;
                    return (
                      <div
                        key={mission.id}
                        className={cardClass}
                        role="button"
                        tabIndex={0}
                        aria-haspopup="dialog"
                        aria-label={t.mission.openDetails}
                        onClick={(event) => onOpenMission(mission, exp.company, exp.employer, event.currentTarget)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onOpenMission(mission, exp.company, exp.employer, event.currentTarget);
                          }
                        }}
                      >
                        <div className={styles.missionTop}>
                          <span style={{ color: 'var(--text-3)' }}>📁</span>
                          <span className={styles.missionName}>{mission.name}</span>
                          <span className={styles.missionBadge}>{mission.badge}</span>
                          <span className={styles.missionExpandIcon} aria-hidden="true" title={t.mission.expand}>
                            ⤢
                          </span>
                        </div>
                        <div className={styles.missionContext}>{mission.context}</div>
                        <div className={`${styles.missionDesc} ${hasCardSummary ? styles.missionDescTagged : styles.missionDescCompact}`}>
                          {hasCardSummary ? renderSummaryWithInlineTags(cardSummary ?? '') : mission.desc}
                        </div>
                        {/* Affichage des missions de type 'projet' */}
                        {exp.missions.filter((m) => m.type === 'projet').length > 0 && (
                          <div className={styles.tlProjects}>
                            {(() => {
                              const projets = exp.missions.filter((m) => m.type === 'projet');
                              const rows = [];
                              for (let i = 0; i < projets.length; i += 2) {
                                rows.push(
                                  <div key={`projet-row-${i}`} className={styles.projectRow}>
                                    {projets.slice(i, i + 2).map((projet) => (
                                      <div
                                        key={projet.id}
                                        className={styles.mission}
                                        role="button"
                                        tabIndex={0}
                                        aria-haspopup="dialog"
                                        aria-label={t.mission.openDetails}
                                        style={{ flex: 1 }}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          onOpenMission(projet, exp.company, exp.employer, event.currentTarget);
                                        }}
                                        onKeyDown={(event) => {
                                          if (event.key === 'Enter' || event.key === ' ') {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            onOpenMission(projet, exp.company, exp.employer, event.currentTarget);
                                          }
                                        }}
                                      >
                                        <div className={styles.missionTop}>
                                          <span style={{ color: 'var(--text-3)' }}>🗂️</span>
                                          <span className={styles.missionName}>{projet.name}</span>
                                        </div>
                                        <div className={styles.missionContext}>{projet.context}</div>
                                      </div>
                                    ))}
                                  </div>
                                );
                              }
                              return rows;
                            })()}
                          </div>
                        )}
                        {!hasCardSummary && previewTasks.length > 0 && (
                          <div className={styles.missionTaskPreviewBlock}>
                            <div className={styles.missionTaskPreviewTitle}>{t.mission.tasksPreviewTitle}</div>
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
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.printQrBanner}>
        <QRCode url="https://alexandre-plana.github.io/resume/" language={language} />
      </div>
    </>
  )
}

export const OverviewTab = memo(OverviewTabComponent)
