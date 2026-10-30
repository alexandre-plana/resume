import { useEffect, useRef } from 'react'
import avatar from '../Avatar.png'
import qrCode from '../assets/resume-qr.svg'
import type { CompanyHead, DetailedModel, MissionView } from './detailed'
import './detailed.css'

function Stack({ items }: { items: string[] }) {
  if (items.length === 0) return null
  return (
    <ul className="dcv-stack">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function Company({ head }: { head: CompanyHead }) {
  return (
    <p className="dcv-company">
      <strong>{head.company}</strong> — {head.employer}
      <span>{head.period}</span>
    </p>
  )
}

function MissionTitle({ mission, short = false }: { mission: MissionView; short?: boolean }) {
  return (
    <div className="dcv-mission-head">
      <h3>{short ? mission.shortTitle : mission.title}</h3>
      <span className="dcv-period">{mission.period}</span>
      <p className="dcv-badge">{mission.badge}</p>
    </div>
  )
}

// Full mission: narrative, every achievement and the stack.
function Mission({ mission, achievements }: { mission: MissionView; achievements: string }) {
  return (
    <article className="dcv-mission">
      <MissionTitle mission={mission} />
      <p>{mission.summary}</p>
      {mission.tasks.length > 0 && (
        <>
          <h4>{achievements}</h4>
          <ul className="dcv-tasks">
            {mission.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </>
      )}
      <Stack items={mission.stack} />
    </article>
  )
}

// Compact mission: the card summary only.
function MissionCard({ mission }: { mission: MissionView }) {
  return (
    <article className="dcv-card">
      <MissionTitle mission={mission} short />
      <p>{mission.brief}</p>
    </article>
  )
}

export function DetailedCv({ model }: { model: DetailedModel }) {
  const coverRef = useRef<HTMLDivElement>(null)
  const { labels } = model

  // Only the cover has a fixed height; flags overflow so the export script refuses a clipped first page.
  useEffect(() => {
    const check = () => {
      const cover = coverRef.current
      if (!cover) return
      const bottom = cover.getBoundingClientRect().bottom
      const overflow = [...cover.querySelectorAll('.dcv-side, .dcv-cover-main')].some(
        (column) => column.scrollHeight > column.clientHeight + 1 || column.getBoundingClientRect().bottom > bottom + 1,
      )
      document.documentElement.dataset.fit = overflow ? 'overflow' : 'ok'
    }

    check()
    void document.fonts.ready.then(check)
  }, [model])

  return (
    <div className="dcv" lang={model.language}>
      <div className="dcv-cover" ref={coverRef}>
        <aside className="dcv-side">
          <img className="dcv-avatar" src={avatar} alt={model.name} />

          <p className="dcv-contact">
            <span>{model.email}</span>
            <span>{model.phone}</span>
          </p>

          <section>
            <h2>{labels.skills}</h2>
            {model.skills.map((skill) => (
              <div className="dcv-skill" key={skill.cat}>
                <h3>{skill.cat}</h3>
                <p>{skill.items.join(' · ')}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>{labels.education}</h2>
            {model.formations.map((formation) => (
              <div className="dcv-edu" key={`${formation.title}-${formation.sub}`}>
                <h3>{formation.title}</h3>
                <p>{formation.sub}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>{labels.languages}</h2>
            <p>{model.languages.map((lang) => `${lang.label} (${lang.level})`).join(' · ')}</p>
          </section>

          <div className="dcv-online">
            <img className="dcv-qr" src={qrCode} alt={labels.online} />
            <p>
              <strong>{labels.online}</strong>
              <br />
              {model.url.replace('https://', '')}
            </p>
          </div>
        </aside>

        <main className="dcv-cover-main">
          <header>
            <h1>{model.name}</h1>
            <p className="dcv-title">{model.title}</p>
            <p className="dcv-subtitle">{model.subtitle}</p>
          </header>

          <section>
            <h2>{labels.profile}</h2>
            <p>{model.bio}</p>
          </section>

          <section>
            <h2>{labels.highlights}</h2>
            <div className="dcv-highlights">
              {model.highlights.map((highlight) => (
                <div className="dcv-highlight" key={highlight.title}>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>{labels.vueFocus}</h2>
            <Company head={model.schneiderWeb.head} />
            <Mission mission={model.schneiderWeb.mission} achievements={labels.achievements} />
          </section>
        </main>
      </div>

      <div className="dcv-flow">
        <section>
          <h2>{labels.webXpert}</h2>
          <Company head={model.xpert.head} />
          <Mission mission={model.xpert.xistar} achievements={labels.achievements} />
          <h4 className="dcv-subhead">{labels.companionTools}</h4>
          <div className="dcv-grid">
            {model.xpert.companionTools.map((mission) => (
              <MissionCard mission={mission} key={mission.title} />
            ))}
          </div>
          {model.xpert.missions.map((mission) => (
            <Mission mission={mission} achievements={labels.achievements} key={mission.title} />
          ))}
        </section>

        <section>
          <h2>{labels.industrialAr}</h2>
          <Company head={model.schneiderAr.head} />
          <Mission mission={model.schneiderAr.mission} achievements={labels.achievements} />
        </section>

        <section>
          <h2>{labels.oreka}</h2>
          <Company head={model.oreka.head} />
          <Mission mission={model.oreka.overview} achievements={labels.achievements} />
          <h4 className="dcv-subhead">{labels.keyProjects}</h4>
          {model.oreka.keyProjects.map((mission) => (
            <Mission mission={mission} achievements={labels.achievements} key={mission.title} />
          ))}
          <h4 className="dcv-subhead">{labels.otherProjects}</h4>
          <div className="dcv-grid">
            {model.oreka.otherProjects.map((mission) => (
              <MissionCard mission={mission} key={mission.title} />
            ))}
          </div>
        </section>

        <section>
          <h2>{labels.personalProjects}</h2>
          <div className="dcv-grid">
            {model.personalProjects.map((project) => (
              <article className="dcv-card" key={project.name}>
                <div className="dcv-mission-head">
                  <h3>{project.name}</h3>
                  <span className="dcv-period">{project.period}</span>
                  <p className="dcv-badge">{project.kind}</p>
                </div>
                <p>{project.text}</p>
                <Stack items={project.stack} />
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
