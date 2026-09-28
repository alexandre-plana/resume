import { useEffect, useState } from 'react'
import { useExperiences, useFormation, usePersonalProjects, useProfile, useSkills } from './hooks/useApi'
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
import { PersonalProjectsTab } from './components/tabs/PersonalProjectsTab'
import { parsePersonalProjectHash } from './navigation/personalProjectHash'
import { MissionDialog, type MissionPopout } from './components/MissionDialog'
import { getPopoutAnimation } from './utils/popoutAnimation'
import styles from './App.module.css'

function App() {
  const profileQuery = useProfile()
  const experiencesQuery = useExperiences()
  const skillsQuery = useSkills()
  const formationQuery = useFormation()
  const personalProjectsQuery = usePersonalProjects()

  const language = useAppStore((state) => state.language)
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)
  const contactOpen = useAppStore((state) => state.contactOpen)
  const setContactOpen = useAppStore((state) => state.setContactOpen)
  const t = getTranslations(language)

  const profile = profileQuery.data
  const skills = skillsQuery.data
  const hasAnyQueryError =
    experiencesQuery.isError ||
    skillsQuery.isError ||
    formationQuery.isError ||
    personalProjectsQuery.isError

  const [activeMission, setActiveMission] = useState<MissionPopout | null>(null)

  const openMissionPopout = (mission: Mission, company: string, employer: string, sourceEl: HTMLElement | null) => {
    setActiveMission({ mission, company, employer, animation: getPopoutAnimation(sourceEl) })
  }

  const closeMissionPopout = () => {
    setActiveMission(null)
  }

  const openRelatedPersonalProject = (projectId: number) => {
    closeMissionPopout()
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}#personal-project-${projectId}`,
    )
    setActiveTab('personal')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const projectCard = document.getElementById(`personal-project-${projectId}`)
        projectCard?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        projectCard?.focus({ preventScroll: true })
      })
    })
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const handleHashChange = () => {
      if (parsePersonalProjectHash(window.location.hash) !== null) {
        setActiveTab('personal')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [setActiveTab])

  if (profileQuery.isLoading) {
    return <div className={styles.loading}>{t.common.loading}</div>
  }

  if (profileQuery.isError || !profile) {
    return <div className={styles.loading}>{t.queryErrors.profile}</div>
  }

  return (
    <>
      <Toolbar
        language={language}
        exportData={
          experiencesQuery.data && skillsQuery.data && formationQuery.data && personalProjectsQuery.data
            ? {
                profile,
                experiences: experiencesQuery.data,
                skills: skillsQuery.data,
                formations: formationQuery.data,
                personalProjects: personalProjectsQuery.data,
              }
            : undefined
        }
      />
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

            <div
              id="panel-overview"
              role="tabpanel"
              aria-labelledby="tab-overview"
              aria-hidden={activeTab !== 'overview'}
            >
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
            </div>

            <div
              id="panel-formations"
              role="tabpanel"
              aria-labelledby="tab-formations"
              aria-hidden={activeTab !== 'formations'}
            >
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
            </div>

            <div
              id="panel-personal"
              role="tabpanel"
              aria-labelledby="tab-personal"
              aria-hidden={activeTab !== 'personal'}
            >
              {activeTab === 'personal' && (
                <PersonalProjectsTab
                  projects={personalProjectsQuery.data}
                  isLoading={personalProjectsQuery.isLoading}
                  isError={personalProjectsQuery.isError}
                  errorMessage={t.queryErrors.personalProjects}
                  t={t}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} language={language} />

      {activeMission && (
        <MissionDialog
          popout={activeMission}
          t={t}
          onClose={closeMissionPopout}
          onOpenPersonalProject={openRelatedPersonalProject}
        />
      )}

      <footer className={styles.footer}>
        {profile.handle} © 2026 · {profile.email} · <PhoneNumber number={profile.phone} />
      </footer>
    </>
  )
}

export default App
