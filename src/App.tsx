import { useEffect, useState, type CSSProperties } from 'react'
import { useProfile, useExperiences, useSkills, useFormation, useActivity, useProjects } from './hooks/useApi'
import { useAppStore } from './store/appStore'
import { Avatar } from './components/Avatar'
import { Tabs } from './components/Tabs'
import { TechBadge } from './components/TechBadge'
import { ContactModal } from './components/ContactModal'
import { Toolbar } from './components/Toolbar'
import { QRCode } from './components/QRCode'
import { PhoneNumber } from './components/PhoneNumber'
import { getTranslations } from './locales'
import type { Mission } from './types'
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
  const { data: profile, isLoading: profileLoading } = useProfile()
  const { data: experiences, isLoading: expLoading } = useExperiences()
  const { data: projects, isLoading: projLoading } = useProjects()
  const { data: skills, isLoading: skillsLoading } = useSkills()
  const { data: formation, isLoading: formationLoading } = useFormation()
  const { data: activity, isLoading: activityLoading } = useActivity()
  const { language, activeTab, contactOpen, setContactOpen, setActiveTab } = useAppStore()
  const t = getTranslations(language)

  const isLoading = profileLoading || expLoading || projLoading || skillsLoading || formationLoading || activityLoading
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

  if (!profile) return <div className={styles.loading}>Chargement...</div>

  return (
    <>
      <Toolbar language={language} onContact={() => setContactOpen(true)} />
      <div className={styles.wrapper}>
        <div className={styles.layout}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <Avatar name={profile.name} />

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
            <div className={styles.label}>{language === 'fr' ? 'Langages' : 'Languages'}</div>
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
                  <div
                    className={styles.legendDot}
                    style={{ background: lang.color }}
                  />
                  {lang.name}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.label}>{language === 'fr' ? 'Compétences clés' : 'Core Skills'}</div>
            <div className={styles.sidebarSkillList}>
              {!isLoading &&
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

          <div className={styles.section}>
            <div className={styles.label}>{t.sidebar.interests === 'Intérêts' ? 'Intérêts' : t.sidebar.interests}</div>
            <div className={styles.tags}>
              {profile.interests.map((interest, idx) => (
                <TechBadge key={`${interest}-${idx}`} label={interest} kind="interest" />
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className={styles.main}>
          {/* ABOUT */}
          <div className={styles.sectionHeader}>👤 {language === 'fr' ? 'À propos' : 'About'}</div>
          <div className={styles.aboutSection}>
            <p className={styles.aboutText}>{profile.bio}</p>
          </div>

          <Tabs />

          {/* TABS CONTENT */}
          {activeTab === 'overview' && (
            <>
              {/* EXPÉRIENCES */}
              <div className={styles.sectionHeader}>📌 {language === 'fr' ? 'Expériences professionnelles' : 'Professional Experience'}</div>
              <div className={styles.timeline}>
                {!isLoading &&
                  experiences?.map((exp) => (
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
                        {exp.missions.map((mission) => (
                          <div
                            key={mission.id}
                            className={mission.featured ? styles.missionFeatured : styles.mission}
                            role="button"
                            tabIndex={0}
                            aria-haspopup="dialog"
                            aria-label={language === 'fr' ? 'Ouvrir le detail de la mission' : 'Open mission details'}
                            onClick={(event) => openMissionPopout(mission, exp.company, exp.employer, event.currentTarget)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                openMissionPopout(mission, exp.company, exp.employer, event.currentTarget)
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
                            <div className={styles.tags}>
                              {mission.tags.map((tag, idx) => (
                                <TechBadge key={`mission-${mission.id}-${tag}-${idx}`} label={tag} kind={tag} />
                              ))}
                            </div>
                            <span className={styles.missionExpandIcon} aria-hidden="true" title={language === 'fr' ? 'Agrandir' : 'Expand'}>⤢</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles.printQrBanner}>
                <QRCode url="https://alexandre-plana.github.io/resume/" language={language} />
              </div>
            </>
          )}

          {activeTab === 'projects' && (
            <div className={styles.projectsSection}>
              <div className={styles.sectionHeader}>📁 {language === 'fr' ? 'Projets professionnels' : 'Professional Projects'}</div>
              <div className={styles.timeline}>
                {!isLoading &&
                  projects?.map((project) => (
                    <div key={project.id} className={styles.project}>
                      <div className={styles.projectHeader}>
                        <div className={styles.tlDot} />
                        <div className={styles.tlInfo}>
                          <div className={styles.tlName}>{project.name}</div>
                          <div className={styles.tlRole}>{project.role}</div>
                          <span className={styles.tlPeriod}>{project.period}</span>
                        </div>
                      </div>
                      <div className={styles.projectContent}>
                        <div className={styles.projectContext}>{project.context}</div>
                        <div className={styles.projectDesc}>{project.desc}</div>
                        <div className={styles.projectStack}>{project.stack}</div>
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
          )}

          {activeTab === 'formations' && (
            <div className={styles.formationsSection}>
              {/* FORMATION */}
              <div className={styles.sectionHeader}>🎓 {language === 'fr' ? 'Formation' : 'Education'}</div>
              <div className={styles.formationGrid}>
                {!isLoading &&
                  formation?.map((form, idx) => (
                    <div key={idx} className={styles.formationCard}>
                      <div className={styles.formLabel}>{form.label}</div>
                      <div className={styles.formTitle}>{form.title}</div>
                      <div className={styles.formSubtitle}>{form.sub}</div>
                      <div className={styles.formMeta}>{form.meta}</div>
                    </div>
                  ))}
              </div>
            </div>
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
                    <span style={{ fontSize: '0.75rem', padding: '2px 6px', background: 'rgba(41, 128, 185, 0.2)', color: '#2980b9', borderRadius: '3px', fontWeight: 600 }}>actuel</span>
                  )}
                </div>
                <div className={styles.missionModalCompany}>
                  ⏱ {activeMission.mission.period} - {activeMission.mission.badge}
                </div>
                <div className={styles.missionModalCompany} style={{ marginTop: '4px' }}>
                  {activeMission.company} · {activeMission.employer}
                </div>
              </div>
              <button className={styles.missionModalClose} onClick={closeMissionPopout} title={language === 'fr' ? 'Fermer' : 'Close'}>
                ✕
              </button>
            </div>

            <div className={styles.missionModalContext}>{activeMission.mission.context}</div>
            <div className={styles.missionModalDesc}>{activeMission.mission.descLong}</div>

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
