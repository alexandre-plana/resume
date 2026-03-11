import { useEffect, useState, type CSSProperties } from 'react'
import { useActivity, useExperiences, useFormation, useProfile, useProjects, useSkills } from './hooks/useApi'
import { useAppStore } from './store/appStore'
import { Avatar } from './components/Avatar'
import { Tabs } from './components/Tabs'
import { TechBadge } from './components/TechBadge'
import { ContactModal } from './components/ContactModal'
import { Toolbar } from './components/Toolbar'
import { PhoneNumber } from './components/PhoneNumber'
import { getTranslations } from './locales'
import type { Mission } from './types'
import { FormationsTab } from './components/tabs/FormationsTab'
import { OverviewTab } from './components/tabs/OverviewTab'
import { ProjectsTab } from './components/tabs/ProjectsTab'
import styles from './App.module.css'

type MissionPopout = {
  company: string
  employer: string
  mission: Mission
  animation: {
    fromX: number
    fromY: number
    fromScale: number
  }
}

function App() {
  const profileQuery = useProfile()
  const experiencesQuery = useExperiences()
  const projectsQuery = useProjects()
  const skillsQuery = useSkills()
  const formationQuery = useFormation()
  const activityQuery = useActivity()

  const language = useAppStore((state) => state.language)
  const activeTab = useAppStore((state) => state.activeTab)
  const contactOpen = useAppStore((state) => state.contactOpen)
  const setContactOpen = useAppStore((state) => state.setContactOpen)
  const setActiveTab = useAppStore((state) => state.setActiveTab)
  const t = getTranslations(language)

  const profile = profileQuery.data
  const skills = skillsQuery.data
  const hasAnyQueryError =
    experiencesQuery.isError ||
    projectsQuery.isError ||
    skillsQuery.isError ||
    formationQuery.isError ||
    activityQuery.isError

  const [activeMission, setActiveMission] = useState<MissionPopout | null>(null)

  const getMissionPopoutAnimation = (sourceEl: HTMLElement | null) => {
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

  const openMissionPopout = (mission: Mission, company: string, employer: string, sourceEl: HTMLElement | null) => {
    setActiveMission({ mission, company, employer, animation: getMissionPopoutAnimation(sourceEl) })
  }

  const closeMissionPopout = () => {
    setActiveMission(null)
  }

  useEffect(() => {
    if (activeTab === 'skills') {
      setActiveTab('overview')
    }
  }, [activeTab, setActiveTab])

  useEffect(() => {
    if (!activeMission) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMissionPopout()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeMission])

  const missionModalStyle = activeMission
    ? ({
        '--mission-from-x': `${activeMission.animation.fromX}px`,
        '--mission-from-y': `${activeMission.animation.fromY}px`,
        '--mission-from-scale': `${activeMission.animation.fromScale}`,
      } as CSSProperties)
    : undefined

  if (profileQuery.isLoading) {
    return <div className={styles.loading}>{t.common.loading}</div>
  }

  if (profileQuery.isError || !profile) {
    return <div className={styles.loading}>{t.queryErrors.profile}</div>
  }

  return (
    <>
      <Toolbar language={language} />
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <Avatar name={profile.name} language={language} />

            <div className={styles.profileName}>{profile.name}</div>
            <div className={styles.profileHandle}>@{profile.handle}</div>
            <div className={styles.profileTitle}>{profile.title}</div>
            <div className={styles.profileSubtitle}>{profile.subtitle}</div>

            <ul className={styles.meta}>
              <li>
                <span className={styles.icon}>🏢</span>
                {profile.company}
              </li>
              <li>
                <span className={styles.icon}>📍</span>
                {profile.location}
              </li>
              <li>
                <span className={styles.icon}>✉</span>
                {profile.email}
              </li>
              <li>
                <span className={styles.icon}>📞</span>
                <PhoneNumber number={profile.phone} />
              </li>
            </ul>

            <div className={styles.aboutMobileAfterContact}>
              <div className={styles.sectionHeader}>👤 {t.sections.about}</div>
              <div className={styles.aboutSection}>
                <p className={styles.aboutText}>{profile.bio}</p>
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.label}>{t.common.languages}</div>
              <div className={styles.langRow}>
                {profile.langs.map((lang, idx) => (
                  <span key={`${lang.label}-${idx}`} className={styles.langPill}>
                    {lang.label} <span>{lang.level}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.label}>{t.common.languageStack}</div>
              <div className={styles.langBar}>
                {profile.languages.map((lang, idx) => (
                  <div
                    key={`langbar-${lang.name}-${idx}`}
                    className={styles.langSeg}
                    style={{
                      width: `${lang.pct}%`,
                      background: lang.color,
                    }}
                  />
                ))}
              </div>
              <div className={styles.langLegend}>
                {profile.languages.map((lang, idx) => (
                  <div key={`legend-${lang.name}-${idx}`} className={styles.legendItem}>
                    <div className={styles.legendDot} style={{ background: lang.color }} />
                    {lang.name}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.label}>{t.common.coreSkills}</div>
              <div className={styles.sidebarSkillList}>
                {skillsQuery.isLoading && <div className={styles.formationEmpty}>{t.common.loading}</div>}
                {skillsQuery.isError && <div className={styles.formationEmpty}>{t.queryErrors.skills}</div>}
                {!skillsQuery.isLoading && !skillsQuery.isError &&
                  skills?.map((skillCat, idx) => (
                    <div key={idx} className={skillCat.featured ? styles.sidebarSkillGroupFeatured : styles.sidebarSkillGroup}>
                      <div className={skillCat.featured ? styles.sidebarSkillTitleFeatured : styles.sidebarSkillTitle}>
                        {skillCat.cat.replace(/^\/\/\s*/, '')}
                      </div>
                      <div className={styles.tags}>
                        {skillCat.tags.map((tag, tagIdx) => (
                          <TechBadge key={`sidebar-skill-${idx}-${tag.k}-${tagIdx}`} label={tag.l} kind={tag.k} />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className={`${styles.section} ${styles.interestsSection}`}>
              <div className={styles.label}>{t.sidebar.interests}</div>
              <div className={styles.tags}>
                {profile.interests.map((interest, idx) => (
                  <TechBadge key={`${interest}-${idx}`} label={interest} kind="interest" />
                ))}
              </div>
            </div>
          </aside>

          <main className={styles.main}>
            <div className={styles.aboutDesktop}>
              <div className={styles.sectionHeader}>👤 {t.sections.about}</div>
              <div className={styles.aboutSection}>
                <p className={styles.aboutText}>{profile.bio}</p>
              </div>
            </div>

            <Tabs />

            {hasAnyQueryError && <div className={styles.formationEmpty}>{t.queryErrors.partialData}</div>}

            {activeTab === 'overview' && (
              <OverviewTab
                experiences={experiencesQuery.data}
                isLoading={experiencesQuery.isLoading}
                isError={experiencesQuery.isError}
                errorMessage={t.queryErrors.experiences}
                language={language}
                t={t}
                onOpenMission={openMissionPopout}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsTab
                projects={projectsQuery.data}
                isLoading={projectsQuery.isLoading}
                isError={projectsQuery.isError}
                errorMessage={t.queryErrors.projects}
                t={t}
              />
            )}

            {activeTab === 'formations' && (
              <FormationsTab
                formation={formationQuery.data}
                isLoading={formationQuery.isLoading}
                isError={formationQuery.isError}
                errorMessage={t.queryErrors.formation}
                language={language}
                t={t}
              />
            )}
          </main>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} language={language} />

      {activeMission && (
        <div className={styles.missionOverlay} onClick={closeMissionPopout}>
          <div
            className={styles.missionModal}
            style={missionModalStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-popout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.missionModalHeader}>
              <div className={styles.missionModalTitleWrap}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <div id="mission-popout-title" className={styles.missionModalTitle}>
                    {activeMission.mission.name}
                  </div>
                  {activeMission.mission.isCurrent && (
                    <span style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'rgba(41, 128, 185, 0.2)', color: '#2980b9', borderRadius: '3px', fontWeight: 600 }}>
                      {t.mission.current}
                    </span>
                  )}
                </div>
                <div className={styles.missionModalCompany}>
                  ⏱ {activeMission.mission.period} - {activeMission.mission.badge}
                </div>
                <div className={styles.missionModalCompany} style={{ marginTop: '4px' }}>
                  {activeMission.company} · {activeMission.employer}
                </div>
              </div>
              <button className={styles.missionModalClose} onClick={closeMissionPopout} title={t.mission.close}>
                ✕
              </button>
            </div>

            <div className={styles.missionModalCore}>
              <div className={styles.missionModalContext}>{activeMission.mission.context}</div>
              <div className={styles.missionModalDesc}>{activeMission.mission.desc}</div>

              {activeMission.mission.tasks && activeMission.mission.tasks.length > 0 && (
                <div className={styles.missionTasksSection}>
                  <div className={styles.missionTasksTitle}>{t.mission.tasksTitle}</div>
                  <ul className={styles.missionTasksList}>
                    {activeMission.mission.tasks.map((task, idx) => (
                      <li key={`mission-task-${activeMission.mission.id}-${idx}`} className={styles.missionTaskItem}>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeMission.mission.featured && activeMission.mission.metrics.length > 0 && (
                <div className={styles.metricsGrid}>
                  {activeMission.mission.metrics.map((metric, idx) => (
                    <div key={idx} className={styles.metricItem}>
                      <div className={styles.metricValue}>{metric.value}</div>
                      <div className={styles.metricLabel}>{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeMission.mission.retrospective && (
                <div className={styles.missionRetrospectiveSection}>
                  <div className={styles.missionRetrospectiveTitle}>{t.mission.retrospective}</div>
                  <div className={styles.missionRetrospectiveText}>{activeMission.mission.retrospective}</div>
                </div>
              )}
            </div>

            <div className={styles.missionMetaGrid}>
              <div className={styles.missionMetaTags}>
                {activeMission.mission.tags.map((tag, idx) => (
                  <TechBadge key={`mission-popout-${activeMission.mission.id}-${tag}-${idx}`} label={tag} kind={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        {profile.handle} © 2026 · {profile.email} · <PhoneNumber number={profile.phone} />
      </footer>
    </>
  )
}

export default App
