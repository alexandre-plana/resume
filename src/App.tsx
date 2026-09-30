import { useEffect, useState } from 'react'
import { useExperiences, useFormation, usePersonalProjects, useProfile, useSkills } from './hooks/useApi'
import { useAppStore } from './store/appStore'
import { Avatar } from './components/Avatar'
import { Tabs } from './components/Tabs'
import { TechBadge } from './components/TechBadge'
import { Toolbar } from './components/Toolbar'
import { PhoneNumber } from './components/PhoneNumber'
import { getTranslations } from './locales'
import type { Mission } from './types'
import { TabPanels } from './components/TabPanels'
import { parsePersonalProjectHash } from './navigation/personalProjectHash'
import { MissionDialog } from './components/MissionDialog'
import { getPopoutAnimation } from './utils/popoutAnimation'
import styles from './App.module.css'
import type { AsyncViewState } from './types/asyncViewState'

type AsyncQueryState<T> = {
  data: T | undefined
  isPending: boolean
  isError: boolean
  status: 'pending' | 'error' | 'success'
}

type ActiveMissionSelection = {
  missionId: number
  experienceId: number
  animation: ReturnType<typeof getPopoutAnimation>
}

export const getAsyncViewState = <T,>(
  query: AsyncQueryState<T>,
  errorMessage: string,
): AsyncViewState<T> => {
  if (query.isPending || query.status === 'pending') return { status: 'loading' }
  if (query.isError || query.status === 'error' || query.data === undefined) {
    return { status: 'error', message: errorMessage }
  }
  return { status: 'ready', data: query.data }
}

function App() {
  const profileQuery = useProfile()
  const experiencesQuery = useExperiences()
  const skillsQuery = useSkills()
  const formationQuery = useFormation()
  const personalProjectsQuery = usePersonalProjects()

  const language = useAppStore((state) => state.language)
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)
  const t = getTranslations(language)

  const profile = profileQuery.data
  const skills = skillsQuery.data
  const skillsPending = skillsQuery.isPending || String(skillsQuery.status) === 'pending'
  const experiencesState = getAsyncViewState(experiencesQuery, t.queryErrors.experiences)
  const formationState = getAsyncViewState(formationQuery, t.queryErrors.formation)
  const personalProjectsState = getAsyncViewState(personalProjectsQuery, t.queryErrors.personalProjects)
  const hasAnyQueryError = [experiencesState, formationState, personalProjectsState].some(
    (state) => state.status === 'error',
  ) || skillsQuery.isError

  const [activeMission, setActiveMission] = useState<ActiveMissionSelection | null>(null)

  const openMissionPopout = (mission: Mission, experienceId: number, sourceEl: HTMLElement | null) => {
    setActiveMission({ missionId: mission.id, experienceId, animation: getPopoutAnimation(sourceEl) })
  }

  const closeMissionPopout = () => {
    setActiveMission(null)
  }

  const activeMissionExperience = activeMission
    ? experiencesQuery.data?.find((experience) => experience.id === activeMission.experienceId)
    : undefined
  const activeMissionData = activeMissionExperience?.missions.find((mission) => mission.id === activeMission?.missionId)

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

  if (profileQuery.status === 'pending' || profileQuery.isPending) {
    return <div className={styles.loading}>{t.common.loading}</div>
  }

  if (profileQuery.status === 'error' || profileQuery.isError || !profile) {
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
                {skillsPending && <div className={styles.formationEmpty}>{t.common.loading}</div>}
                {skillsQuery.isError && <div className={styles.formationEmpty}>{t.queryErrors.skills}</div>}
                {!skillsPending && !skillsQuery.isError &&
                  skills?.map((skillCat) => (
                    <div key={skillCat.id} className={skillCat.featured ? styles.sidebarSkillGroupFeatured : styles.sidebarSkillGroup}>
                      <div className={skillCat.featured ? styles.sidebarSkillTitleFeatured : styles.sidebarSkillTitle}>
                        {skillCat.cat.replace(/^\/\/\s*/, '')}
                      </div>
                      <div className={styles.tags}>
                        {skillCat.tags.map((tag, tagIdx) => (
                          <TechBadge key={`sidebar-skill-${skillCat.id}-${tag.k}-${tagIdx}`} label={tag.l} kind={tag.k} />
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

            <TabPanels
              activeTab={activeTab}
              experiencesState={experiencesState}
              formationState={formationState}
              personalProjectsState={personalProjectsState}
              language={language}
              t={t}
              onOpenMission={openMissionPopout}
            />
          </main>
        </div>
      </div>

      {activeMission && activeMissionData && activeMissionExperience && (
        <MissionDialog
          popout={{
            mission: activeMissionData,
            company: activeMissionExperience.company,
            employer: activeMissionExperience.employer,
            animation: activeMission.animation,
          }}
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
