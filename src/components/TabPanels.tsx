import { memo } from 'react'
import type { Language, Translations } from '../locales'
import type { Experience, Formation, Mission, PersonalProject } from '../types'
import type { Tab } from '../store/appStore'
import type { AsyncViewState } from '../types/asyncViewState'
import { OverviewTab } from './tabs/OverviewTab'
import { FormationsTab } from './tabs/FormationsTab'
import { PersonalProjectsTab } from './tabs/PersonalProjectsTab'
import styles from '../App.module.css'

interface TabPanelsProps {
  activeTab: Tab
  experiencesState: AsyncViewState<Experience[]>
  formationState: AsyncViewState<Formation[]>
  personalProjectsState: AsyncViewState<PersonalProject[]>
  language: Language
  t: Translations
  onOpenMission: (mission: Mission, experienceId: number, sourceEl: HTMLElement | null) => void
}

interface OverviewPanelProps extends Pick<TabPanelsProps, 'experiencesState' | 'language' | 't' | 'onOpenMission'> {
  active: boolean
}

const OverviewPanel = ({ active, experiencesState, language, t, onOpenMission }: OverviewPanelProps) => (
  <div
    id="panel-overview"
    role="tabpanel"
    aria-labelledby="tab-overview"
    aria-label={t.tabs.overview}
    aria-hidden={!active}
    className={`${styles.tabPanel} ${active ? styles.tabPanelActive : ''} ${styles.overviewPanel} overviewPanel`}
  >
    <OverviewTab state={experiencesState} language={language} t={t} onOpenMission={onOpenMission} />
  </div>
)

const FormationsPanel = ({ state, language, t }: { state: AsyncViewState<Formation[]>; language: Language; t: Translations }) => (
  <div
    id="panel-formations"
    role="tabpanel"
    aria-labelledby="tab-formations"
    aria-label={t.tabs.formations}
    aria-hidden="false"
    className={`${styles.tabPanel} ${styles.tabPanelActive}`}
  >
    <FormationsTab state={state} language={language} t={t} />
  </div>
)

const PersonalProjectsPanel = ({ state, t }: { state: AsyncViewState<PersonalProject[]>; t: Translations }) => (
  <div
    id="panel-personal"
    role="tabpanel"
    aria-labelledby="tab-personal"
    aria-label={t.tabs.personalProjects}
    aria-hidden="false"
    className={`${styles.tabPanel} ${styles.tabPanelActive}`}
  >
    <PersonalProjectsTab state={state} t={t} />
  </div>
)

function TabPanelsComponent({ activeTab, experiencesState, formationState, personalProjectsState, language, t, onOpenMission }: TabPanelsProps) {
  return (
    <>
      <OverviewPanel
        active={activeTab === 'overview'}
        experiencesState={experiencesState}
        language={language}
        t={t}
        onOpenMission={onOpenMission}
      />
      {activeTab === 'formations' && <FormationsPanel state={formationState} language={language} t={t} />}
      {activeTab === 'personal' && <PersonalProjectsPanel state={personalProjectsState} t={t} />}
    </>
  )
}

export const TabPanels = memo(TabPanelsComponent)
