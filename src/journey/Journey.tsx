import { lazy, Suspense, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useExperiences, usePersonalProjects, useProfile } from '../hooks/useApi'
import { useAppStore } from '../store/appStore'
import { getTranslations } from '../locales'
import { getPopoutAnimation } from '../utils/popoutAnimation'
import avatar from '../Avatar.png'
import { buildJourney, eventTitle, getMoment, yearForTime } from './model'
import { useJourneyClock } from './useJourneyClock'
import { JourneyTimeline } from './JourneyTimeline'
import { JourneyScene } from './JourneyScene'
import './journey.css'

const MissionDetails = lazy(() => import('../components/MissionDialog').then(m => ({ default: m.MissionDialog })))
const ProjectDetails = lazy(() => import('../components/ProjectDialog').then(m => ({ default: m.ProjectDialog })))
const techNames: Record<string, string> = { csharp: 'C#', unity: 'Unity', typescript: 'TypeScript', react: 'React', nodejs: 'Node.js', threejs: 'Three.js', vue3: 'Vue 3', cao: 'CAO', seriousgame: '' }
const plain = (text: string) => text.replace(/#([\p{L}\p{N}._-]+)/gu, (_, name: string) => techNames[name] ?? name).replace(/\s{2,}/g, ' ').replace(/\s+([,.;])/g, '$1')

export default function Journey() {
  const profileQuery = useProfile()
  const experienceQuery = useExperiences()
  const projectQuery = usePersonalProjects()
  const language = useAppStore(s => s.language)
  const setLanguage = useAppStore(s => s.setLanguage)
  const fr = language === 'fr'
  const t = getTranslations(language)
  const model = useMemo(() => buildJourney(experienceQuery.data ?? [], projectQuery.data ?? []), [experienceQuery.data, projectQuery.data])
  const ready = Boolean(profileQuery.data && experienceQuery.data?.length && !profileQuery.isError && !experienceQuery.isError)
  const clock = useJourneyClock(model.duration, ready)
  const { seek, toggle } = clock
  const { event, index, progress } = getMoment(model, clock.time)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [projectMenu, setProjectMenu] = useState(false)

  useEffect(() => {
    document.body.classList.add('journey-open')
    document.documentElement.classList.add('journey-open')
    return () => {
      document.body.classList.remove('journey-open')
      document.documentElement.classList.remove('journey-open')
    }
  }, [])
  useEffect(() => { document.documentElement.lang = language }, [language])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || detailsOpen ||
        (e.target instanceof Element && e.target.closest('input, select, textarea, [contenteditable="true"], [role="dialog"]'))) return
      const target = e.key === 'Home' ? 0 : e.key === 'End' ? model.duration
        : e.key === 'ArrowLeft' ? model.events[Math.max(0, index - 1)]?.start
        : e.key === 'ArrowRight' ? model.events[Math.min(model.events.length - 1, index + 1)]?.start : undefined
      if (e.key === ' ') {
        if (e.target instanceof Element && e.target.closest('button, a, [role="button"]')) return
        e.preventDefault(); toggle()
      }
      else if (target !== undefined) { e.preventDefault(); seek(target) }
      if (e.key === 'Escape') setProjectMenu(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle, seek, model, index, detailsOpen])

  const classicHref = `?view=cv&lang=${language}`
  const header = <header className="journey-header">
    <a className="journey-identity" href={`?lang=${language}`}>
      <img src={avatar} alt="" width="34" height="34" />
      <span><strong>Alexandre Plana</strong><small>{fr ? 'Développeur full-stack · UI/UX' : 'Full-stack developer · UI/UX'}</small></span>
    </a>
    <span className="journey-header-caption">{fr ? 'LE PARCOURS, EN MOUVEMENT' : 'A CAREER IN MOTION'}</span>
    <nav aria-label={fr ? 'Navigation principale' : 'Main navigation'}>
      <div className="journey-languages">
        <button type="button" aria-label="Français" aria-pressed={fr} onClick={() => setLanguage('fr')}>FR</button><span>/</span>
        <button type="button" aria-label="English" aria-pressed={!fr} onClick={() => setLanguage('en')}>EN</button>
      </div>
      <a className="journey-classic" href={classicHref}>{fr ? 'CV classique' : 'Classic résumé'} <span aria-hidden="true">↗</span></a>
    </nav>
  </header>

  if (!ready || !event || !profileQuery.data) return <div className="journey journey-loading">{header}<main>
    <p role="status">{experienceQuery.isError || profileQuery.isError ? (fr ? 'Le parcours est indisponible.' : 'The journey is unavailable.') : experienceQuery.data?.length === 0 ? t.common.noData : t.common.loading}</p>
    {(experienceQuery.isError || profileQuery.isError || experienceQuery.data?.length === 0) && <button onClick={() => { void experienceQuery.refetch(); void profileQuery.refetch() }}>{fr ? 'Réessayer' : 'Try again'}</button>}
  </main></div>

  const personal = Boolean(event.project)
  const company = personal ? (fr ? 'Explorations' : 'Explorations') : event.scene === 'industrial' ? 'Oreka Ingénierie' : event.scene === 'maritime' ? 'X-PERT' : 'Schneider Electric'
  const period = event.project?.period ?? event.experience?.period ?? ''
  const subtitle = event.project?.kind ?? event.mission?.context ?? ''
  const description = plain(event.project?.desc ?? event.mission?.cardSummary ?? event.mission?.desc ?? '')
  const tags = event.project?.stack ?? event.mission?.tags ?? []
  const peers = model.events.filter(e => personal ? Boolean(e.project) : e.experience?.id === event.experience?.id)
  const year = yearForTime(model, clock.time)
  const sceneStart = model.events.find(e => e.scene === event.scene)?.start ?? 0
  const phase = clock.reduced ? 1 : Math.min(1, (clock.time - sceneStart) / 1.5)
  const openDetails = () => { clock.seek(clock.time); setDetailsOpen(true) }

  return <div className={`journey ${clock.reduced ? 'journey-reduced' : ''}`} data-scene={event.scene}
    style={{ '--journey-progress': progress, '--journey-phase': phase } as CSSProperties}>
    <a className="journey-skip" href="#journey-controls">{fr ? 'Aller aux commandes' : 'Skip to controls'}</a>
    {header}
    <main className="journey-stage" id="journey-main">
      <div className="journey-stage-top"><span><i /> {fr ? 'PARCOURS INTERACTIF' : 'INTERACTIVE JOURNEY'}</span><span>{String(index + 1).padStart(2, '0')} <b>/ {String(model.events.length).padStart(2, '0')}</b></span></div>
      <section className="journey-story" aria-label={fr ? 'Période sélectionnée' : 'Selected period'}>
        <div className="journey-period">{period}<span>{personal ? (fr ? 'PROJETS PERSONNELS' : 'PERSONAL PROJECTS') : event.scene === 'industrial' ? (fr ? 'LES FONDATIONS' : 'THE FOUNDATIONS') : (fr ? 'DATACORP · MISSION' : 'DATACORP · ASSIGNMENT')}</span></div>
        <h1>{company === 'Oreka Ingénierie' ? <>Oreka<br /><span>Ingénierie.</span></> : company === 'Schneider Electric' ? <>Schneider<br /><span>Electric.</span></> : <>{company}<span>.</span></>}</h1>
        <p className="journey-role">{event.project?.role ?? event.mission?.badge}</p>
        <h2>{personal ? event.project?.name : subtitle}</h2>
        <p className="journey-description">{description}</p>
        <div className="journey-tags" aria-label={fr ? 'Technologies du projet' : 'Project technologies'}>{tags.slice(0, 7).map(tag => <span key={tag}>#{tag.replace(/\s/g, '')}</span>)}</div>
        <div className="journey-story-actions">
          <button type="button" onClick={openDetails}>{fr ? 'Explorer le projet' : 'Explore the project'} <span aria-hidden="true">↗</span></button>
          <button type="button" className="journey-project-trigger" aria-expanded={projectMenu} aria-controls="journey-project-menu" onClick={() => { clock.seek(clock.time); setProjectMenu(!projectMenu) }}>{peers.length} {fr ? 'projets' : 'projects'} <span aria-hidden="true">⌄</span></button>
        </div>
        {projectMenu && <div className="journey-project-menu" id="journey-project-menu">
          <div><strong>{fr ? 'Dans cette période' : 'In this period'}</strong><button aria-label={fr ? 'Fermer les projets' : 'Close projects'} onClick={() => setProjectMenu(false)}>×</button></div>
          <div className="journey-project-options">{peers.map(peer => <button key={peer.id} aria-current={peer.id === event.id ? 'true' : undefined} onClick={() => { clock.seek(peer.start); setProjectMenu(false) }}><span>{eventTitle(peer)}</span><small>{peer.project?.period ?? peer.mission?.period}</small></button>)}</div>
        </div>}
      </section>
      <JourneyScene event={event} time={clock.reduced ? event.start + event.duration * 0.65 : clock.time} progress={phase} language={language} />
      <div className="journey-stage-bottom"><span><i /> {fr ? 'CONCEVOIR · DÉVELOPPER · EXPLORER' : 'DESIGN · DEVELOP · EXPLORE'}</span><span>{fr ? 'Une histoire à parcourir. À votre rythme.' : 'A story to explore. At your own pace.'}</span></div>
    </main>
    {projectQuery.isError && <p className="journey-data-error" role="status">{t.queryErrors.personalProjects} <button onClick={() => void projectQuery.refetch()}>{fr ? 'Réessayer' : 'Try again'}</button></p>}
    <JourneyTimeline model={model} clock={clock} year={year} event={event} index={index} language={language} />
    <Suspense fallback={<div className="journey-detail-loading" role="status">{t.common.loading}</div>}>
      {detailsOpen && event.mission && event.experience && <MissionDetails popout={{ mission: event.mission, company: event.experience.company, employer: event.experience.employer, animation: getPopoutAnimation(null) }} t={t} onClose={() => setDetailsOpen(false)} onOpenPersonalProject={id => { const target = model.events.find(e => e.project?.id === id); if (target) { clock.seek(target.start); setDetailsOpen(false) } }} />}
      {detailsOpen && event.project && <ProjectDetails popout={{ project: event.project, animation: getPopoutAnimation(null) }} t={t} onClose={() => setDetailsOpen(false)} />}
    </Suspense>
    {clock.time >= model.duration && <div className="journey-end"><span>{fr ? 'Et maintenant ?' : 'What comes next?'}</span><a href={`mailto:${profileQuery.data.email}`}>{fr ? 'Parlons de votre projet' : 'Let’s talk about your project'} ↗</a><button onClick={clock.restart}>{fr ? 'Revoir le parcours' : 'Replay the journey'} ↺</button></div>}
  </div>
}
