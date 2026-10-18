import type { CSSProperties, PointerEvent } from 'react'
import type { Language } from '../locales'
import { eventTitle, firstYear, timeForYear, type JourneyEvent, type JourneyModel } from './model'
import type { useJourneyClock } from './useJourneyClock'

interface Props {
  model: JourneyModel
  clock: ReturnType<typeof useJourneyClock>
  year: number
  event: JourneyEvent
  index: number
  language: Language
}
const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`

export function JourneyTimeline({ model, clock, year, event, index, language }: Props) {
  const fr = language === 'fr'
  const percent = (value: number) => (value - model.from) / (model.to - model.from) * 100
  const interval = (start: number, end: number): CSSProperties => ({ left: `${percent(start)}%`, width: `${percent(end) - percent(start)}%` })
  const professional = model.events.filter(e => e.experience)
  const businesses = [...new Map(professional.map(e => [e.experience!.id, e.experience!])).values()]
  const chapters = ['industrial', 'augmented', 'edge', 'maritime'] as const
  const names = { industrial: 'Oreka Ingénierie', augmented: 'Augmented Operator Advisor', edge: 'Industrial Automation Edge', maritime: 'Xistar' }
  const personal = model.events.filter(e => e.project)

  const scrub = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    clock.seek(timeForYear(model, model.from + fraction * (model.to - model.from)))
  }
  return <section className="journey-timeline" aria-label={fr ? 'Chronologie du parcours' : 'Career timeline'}>
    <div className="journey-controls" id="journey-controls" tabIndex={-1}>
      <div className="journey-transport">
        <button type="button" className="journey-play" onClick={clock.toggle} aria-label={clock.playing ? (fr ? 'Mettre en pause' : 'Pause playback') : (fr ? 'Lire le parcours' : 'Play the journey')} aria-pressed={clock.playing}><span aria-hidden="true">{clock.playing ? 'Ⅱ' : '▶'}</span></button>
        <button type="button" aria-label={fr ? 'Point précédent' : 'Previous point'} onClick={() => clock.seek(model.events[Math.max(0, index - 1)].start)} disabled={index === 0}><span aria-hidden="true">‹</span></button>
        <button type="button" aria-label={fr ? 'Point suivant' : 'Next point'} onClick={() => clock.seek(model.events[Math.min(model.events.length - 1, index + 1)].start)} disabled={index === model.events.length - 1}><span aria-hidden="true">›</span></button>
        <span className="journey-time">{formatTime(clock.time)} <span>/ {formatTime(model.duration)}</span></span>
        <label className="journey-speed"><span className="journey-sr">{fr ? 'Vitesse de lecture' : 'Playback speed'}</span><select value={clock.speed} onChange={e => clock.setSpeed(Number(e.target.value))}>{[0.5, 1, 1.5, 2].map(speed => <option key={speed} value={speed}>{speed}×</option>)}</select></label>
      </div>
      <p className="journey-control-help">{clock.reduced ? (fr ? 'Mouvement réduit · exploration libre' : 'Reduced motion · explore freely') : clock.playing ? (fr ? 'Laissez-vous guider, ou explorez la timeline' : 'Follow the story, or explore the timeline') : (fr ? 'En pause · explorez à votre rythme' : 'Paused · explore at your own pace')}</p>
      <button className="journey-restart" type="button" aria-label={fr ? 'Recommencer le parcours' : 'Restart the journey'} onClick={clock.restart}>↺ <span>{fr ? 'Recommencer' : 'Restart'}</span></button>
    </div>
    <div className="journey-chart" onPointerDown={e => {
      if ((e.target as Element).closest('button, input, select, a')) return
      e.currentTarget.setPointerCapture(e.pointerId)
      scrub(e)
    }} onPointerMove={e => { if (e.currentTarget.hasPointerCapture(e.pointerId)) scrub(e) }} onPointerUp={e => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
    }}>
      <div className="journey-axis">
        {[2013, 2015, 2017, 2020, 2023, 2026].filter(value => value >= model.from && value <= model.to).map(value => <span key={value} style={{ left: `${percent(value)}%` }} className={Math.floor(year) === value ? 'current' : ''}>{value}</span>)}
        <input type="range" min={model.from} max={model.to} step="0.001" value={year} aria-label={fr ? 'Position dans le parcours' : 'Journey position'} aria-valuetext={`${Math.floor(year)} · ${event.project?.name ?? event.mission?.context}`} onChange={e => clock.seek(timeForYear(model, Number(e.target.value)))} />
      </div>
      <div className="journey-grid-lines" aria-hidden="true">{[2013, 2015, 2017, 2020, 2023, 2026].map(value => <i key={value} style={{ left: `${percent(value)}%` }} />)}</div>
      <div className="journey-track journey-companies">
        <div className="journey-track-label"><span aria-hidden="true">▥</span>{fr ? 'ENTREPRISES' : 'COMPANIES'}</div>
        {businesses.map(business => {
          const start = firstYear(business.period)
          const years = business.period.match(/\d{4}/g) ?? []
          const end = years.length > 1 ? Number(years[1]) : model.to
          const current = business.id === event.experience?.id
          const title = business.id === 2 ? business.company : business.id === 1 ? 'Schneider Electric' : 'X-PERT'
          return <button type="button" key={business.id} className={`journey-company company-${business.id} ${current ? 'selected' : ''}`} style={interval(start, end)} onClick={() => clock.seek(professional.find(e => e.experience?.id === business.id)!.start)} title={`${title} · ${business.period} · ${years.length > 1 ? `${end - start} ${fr ? 'ans' : 'years'}` : (fr ? 'En cours' : 'Ongoing')}${business.id !== 2 ? ' · Datacorp' : ''}`} aria-label={`${fr ? 'Afficher' : 'Show'} ${title}, ${business.period}`} aria-current={current ? 'true' : undefined}>
            <span className="journey-company-mark" aria-hidden="true">{business.id === 2 ? 'O' : business.id === 1 ? 'S' : 'X'}</span>
            <span><strong>{title}</strong><small>{business.period}{years.length > 1 ? ` · ${end - start} ${fr ? 'ans' : 'years'}` : ' →'}</small></span>
          </button>
        })}
      </div>
      <div className="journey-track journey-projects">
        <div className="journey-track-label"><span aria-hidden="true">▱</span>{fr ? 'PROJETS' : 'PROJECTS'}</div>
        {chapters.map((scene, i) => {
          const events = model.events.filter(e => e.scene === scene)
          if (!events.length) return null
          const nextYear = scene === 'maritime' ? model.to : model.events.find(e => e.start > events[events.length - 1].start && e.scene !== scene)?.year ?? model.to
          return <div key={scene} className={`journey-project-group group-${scene}`} style={interval(events[0].year, Math.max(nextYear, events[0].year + 0.1))}>
            <span className="journey-project-group-name">{i === 0 ? (fr ? 'Simulation & VR' : 'Simulation & VR') : i === 1 ? 'AOA · AR' : i === 2 ? 'IECA · Edge' : 'Xistar'}</span>
            <div>{events.map(point => <button type="button" key={point.id} className={point.id === event.id ? 'selected' : ''} aria-label={`${fr ? 'Sélectionner' : 'Select'} ${eventTitle(point)}`} aria-current={point.id === event.id ? 'true' : undefined} title={`${point.mission?.context} · ${point.mission?.period}`} onClick={() => clock.seek(point.start)}><i /><span className="journey-sr">{names[scene]}</span></button>)}</div>
          </div>
        })}
      </div>
      <div className="journey-track journey-skills">
        <div className="journey-track-label"><span aria-hidden="true">&lt;/&gt;</span>{fr ? 'COMPÉTENCES' : 'SKILLS'}</div>
        {chapters.map(scene => {
          const events = model.events.filter(e => e.scene === scene)
          if (!events.length) return null
          const nextYear = scene === 'maritime' ? model.to : model.events.find(e => e.start > events[events.length - 1].start && e.scene !== scene)?.year ?? model.to
          const tags = events[0].mission?.tags.slice(0, scene === 'maritime' ? 2 : 3) ?? []
          return <div key={scene} className={`journey-skill-group group-${scene}`} style={interval(events[0].year, Math.max(nextYear, events[0].year + 0.1))}>{tags.map(tag => <button type="button" key={tag} onClick={() => clock.seek(events[0].start)} title={`${tag} · ${events[0].mission?.period}`} aria-label={`${fr ? 'Explorer' : 'Explore'} ${tag}, ${names[scene]}`}>#{tag}</button>)}</div>
        })}
      </div>
      <div className="journey-track journey-explorations">
        <div className="journey-track-label"><span aria-hidden="true">◎</span>EXPLORATIONS</div>
        <span className="journey-exploration-note">{fr ? 'En parallèle, des idées prennent vie.' : 'Along the way, ideas come to life.'}<span> {fr ? 'Projets personnels →' : 'Personal projects →'}</span></span>
        <div className="journey-personal-group" role="group" aria-label={`${fr ? 'Projets personnels' : 'Personal projects'} · ${personal[0]?.year ?? ''}`} style={{ right: 0 }}><span className="journey-personal-year">{personal[0]?.year}</span>{personal.map(point => <button key={point.id} type="button" className={point.id === event.id ? 'selected' : ''} title={`${point.project?.name} · ${point.project?.period} · ${point.project?.kind}`} aria-label={`${fr ? 'Sélectionner' : 'Select'} ${point.project?.name}`} aria-current={point.id === event.id ? 'true' : undefined} onClick={() => clock.seek(point.start)}><i /><span>{point.project?.name}</span></button>)}</div>
      </div>
      <div className="journey-playhead" aria-hidden="true" style={{ left: `${percent(year)}%` }}><span /></div>
    </div>
    <footer className="journey-timeline-footer"><span>{fr ? 'Projets groupés par période · compétences contextualisées' : 'Projects grouped by period · skills shown in context'}</span><span>{fr ? 'ESPACE' : 'SPACE'} <b>Ⅱ / ▶</b><span>← →</span><span className="journey-footer-year">{Math.floor(year)}</span></span></footer>
  </section>
}
