import { useEffect, useRef, type ReactNode } from 'react'
import qrCode from '../assets/resume-qr.svg'
import { Avatar } from '../components/Avatar'
import { InlineTechText } from '../components/InlineTechText'
import { TechBadge } from '../components/TechBadge'
import type { CompanyHead, DetailedLabels, DetailedModel, MissionView, OverviewEntry } from './detailed'
import type { DetailBlock } from './iecaDetails'
import './detailed.css'

// Same building blocks as the online resume: TechBadge chips, inline #tech tags,
// timeline, mission cards and formation-style cards (see App.module.css).

function Chips({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <div className="dcv-chips">
      {tags.map((tag) => (
        <TechBadge key={tag} label={tag} kind={tag} />
      ))}
    </div>
  )
}

// The section title travels with the company row so neither is left alone at the bottom of a page.
function Timeline({ title, head, children }: { title?: string; head: CompanyHead; children: ReactNode }) {
  return (
    <div className="dcv-timeline">
      <div className="dcv-keep">
        {title && <div className="dcv-section-header">{title}</div>}
        <div className="dcv-tl-company">
          <span className={`dcv-tl-dot${head.current ? ' dcv-tl-dot-current' : ''}`} />
          <div>
            <div className="dcv-tl-name">
              {head.company} <span className="dcv-tl-period">{head.period}</span>
            </div>
            <div className="dcv-tl-role">{head.employer}</div>
          </div>
        </div>
      </div>
      <div className="dcv-tl-missions">{children}</div>
    </div>
  )
}

function Tasks({ tasks, label }: { tasks: string[]; label: string }) {
  if (tasks.length === 0) return null
  return (
    <div className="dcv-tasks">
      <div className="dcv-tasks-title">{label}</div>
      <ul>
        {tasks.map((task) => (
          <li key={task}>
            <InlineTechText text={task} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function MissionCard({
  mission,
  labels,
  full = true,
  chips = true,
  children,
}: {
  mission: MissionView
  labels: DetailedLabels
  full?: boolean
  chips?: boolean
  children?: ReactNode
}) {
  return (
    <article className={mission.featured ? 'dcv-mission dcv-mission-featured' : 'dcv-mission'}>
      <div className="dcv-mission-top">
        <span>📁</span>
        <span className="dcv-mission-name">{mission.name}</span>
        <span className="dcv-mission-badge">{mission.badge}</span>
      </div>
      <div className="dcv-mission-context">
        {mission.title} · {mission.period}
      </div>
      <p className="dcv-mission-desc">
        <InlineTechText text={full ? mission.desc : mission.brief} />
      </p>
      {children}
      {full && <Tasks tasks={mission.tasks} label={labels.tasks} />}
      {full && chips && <Chips tags={mission.tags} />}
    </article>
  )
}

// Cover timeline entry: what, role, when and the domain/technology chips; details follow on the next pages.
function OverviewCard({ entry }: { entry: OverviewEntry }) {
  return (
    <article className={entry.featured ? 'dcv-overview dcv-mission-featured' : 'dcv-overview'}>
      <div className="dcv-mission-top">
        <span>📁</span>
        <span className="dcv-mission-name">{entry.name}</span>
        <span className="dcv-mission-badge">{entry.badge}</span>
      </div>
      <div className="dcv-mission-context">
        {entry.title} · {entry.period}
      </div>
      {entry.projects.length > 0 && (
        <ul className="dcv-overview-projects">
          {entry.projects.map((project) => (
            <li key={project.name}>
              <span>🗂️</span>
              <span className="dcv-overview-project-name">{project.name}</span>
              <span className="dcv-mission-context">
                {project.title} · {project.period}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="dcv-chips">
        {entry.chips.map((chip) => (
          <TechBadge key={chip.l} label={chip.l} kind={chip.k} />
        ))}
      </div>
    </article>
  )
}

function ProjectCard({ mission }: { mission: MissionView }) {
  return (
    <article className="dcv-project">
      <div className="dcv-mission-top">
        <span>🗂️</span>
        <span className="dcv-mission-name">{mission.name}</span>
      </div>
      <div className="dcv-mission-context">
        {mission.title} · {mission.period}
      </div>
      <p className="dcv-mission-desc">
        <InlineTechText text={mission.brief} />
      </p>
    </article>
  )
}

function DetailCards({ blocks }: { blocks: DetailBlock[] }) {
  return (
    <div className="dcv-grid">
      {blocks.map((block) => (
        <article className="dcv-project" key={block.repo}>
          <div className="dcv-mission-top">
            <span>📁</span>
            <span className="dcv-mission-name">{block.repo}</span>
          </div>
          <div className="dcv-card-title">{block.title}</div>
          <p className="dcv-mission-desc">
            <InlineTechText text={block.text} />
          </p>
          {block.tags && <Chips tags={block.tags} />}
        </article>
      ))}
    </div>
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
          <div className="dcv-avatar">
            <Avatar name={model.name} language={model.language} />
          </div>

          <div className="dcv-profile-name">{model.name}</div>
          <div className="dcv-profile-handle">@{model.handle}</div>
          <div className="dcv-profile-title">{model.title}</div>
          <div className="dcv-profile-subtitle">{model.subtitle}</div>

          <ul className="dcv-meta">
            <li>
              <span className="dcv-icon">🏢</span>
              {model.company}
            </li>
            <li>
              <span className="dcv-icon">📍</span>
              {model.location}
            </li>
            <li>
              <span className="dcv-icon">✉</span>
              {model.email}
            </li>
            <li>
              <span className="dcv-icon">📞</span>
              {model.phone}
            </li>
          </ul>

          <div className="dcv-side-section">
            <div className="dcv-label">{labels.languages}</div>
            <div className="dcv-lang-row">
              {model.languages.map((lang) => (
                <span className="dcv-lang-pill" key={lang.label}>
                  {lang.label}
                  <span>{lang.level}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="dcv-side-section">
            <div className="dcv-label">{labels.coreSkills}</div>
            <div className="dcv-skill-list">
              {model.skills.map((skill) => (
                <div className="dcv-skill-group" key={skill.cat}>
                  <div className={skill.featured ? 'dcv-skill-title dcv-skill-title-featured' : 'dcv-skill-title'}>
                    {skill.cat}
                  </div>
                  <div className="dcv-chips">
                    {skill.tags.map((tag) => (
                      <TechBadge key={tag.l} label={tag.l} kind={tag.k} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dcv-online">
            <img className="dcv-qr" src={qrCode} alt={labels.online} />
            <div>
              <div className="dcv-label">{labels.online}</div>
              <div className="dcv-online-url">{model.url.replace('https://', '')}</div>
            </div>
          </div>
        </aside>

        <main className="dcv-cover-main">
          <section>
            <div className="dcv-section-header">{labels.about}</div>
            <div className="dcv-about">
              <p>{model.bio}</p>
            </div>
          </section>

          <section>
            <div className="dcv-section-header">{labels.overview}</div>
            {model.overview.map((company) => (
              <Timeline head={company.head} key={`${company.head.company}-${company.head.period}`}>
                {company.entries.map((entry) => (
                  <OverviewCard entry={entry} key={entry.name} />
                ))}
              </Timeline>
            ))}
          </section>
        </main>
      </div>

      <div className="dcv-flow">
        <section>
          <Timeline title={labels.vueFocus} head={model.schneiderWeb.head}>
            <MissionCard mission={model.schneiderWeb.mission} labels={labels} />
          </Timeline>
        </section>

        <section>
          <div className="dcv-section-header">{labels.iecaDetails}</div>
          <div className="dcv-about">
            <p>
              <InlineTechText text={model.schneiderWeb.details.intro} />
            </p>
          </div>
          <div className="dcv-subhead">{labels.iecaModules}</div>
          <DetailCards blocks={model.schneiderWeb.details.modules} />
          <div className="dcv-subhead">{labels.iecaFoundation}</div>
          <DetailCards blocks={model.schneiderWeb.details.foundation} />
          <div className="dcv-subhead">{labels.iecaOther}</div>
          <DetailCards blocks={model.schneiderWeb.details.other} />
        </section>

        <section>
          <Timeline title={labels.webXpert} head={model.xpert.head}>
            <MissionCard mission={model.xpert.xistar} labels={labels}>
              <div className="dcv-grid dcv-grid-3">
                {model.xpert.companionTools.map((mission) => (
                  <ProjectCard mission={mission} key={mission.name} />
                ))}
              </div>
            </MissionCard>
            {model.xpert.missions.map((mission) => (
              <MissionCard mission={mission} labels={labels} key={mission.name} />
            ))}
          </Timeline>
        </section>

        <section>
          <Timeline title={labels.industrialAr} head={model.schneiderAr.head}>
            <MissionCard mission={model.schneiderAr.mission} labels={labels} />
          </Timeline>
        </section>

        <section>
          <Timeline title={labels.oreka} head={model.oreka.head}>
            <MissionCard mission={model.oreka.overview} labels={labels} />
            <div className="dcv-subhead">{labels.keyProjects}</div>
            {model.oreka.keyProjects.map((mission) => (
              <MissionCard mission={mission} labels={labels} key={mission.name} />
            ))}
            <div className="dcv-subhead">{labels.otherProjects}</div>
            <div className="dcv-grid">
              {model.oreka.otherProjects.map((mission) => (
                <ProjectCard mission={mission} key={mission.name} />
              ))}
            </div>
          </Timeline>
        </section>

        <section>
          <div className="dcv-section-header">{labels.personalProjects}</div>
          <div className="dcv-stack">
            {model.personalProjects.map((project) => (
              <article className="dcv-card" key={project.name}>
                <div className="dcv-form-label">
                  <span>🛠️</span>
                  {project.kind}
                  {project.status && <span className="dcv-status">{project.status}</span>}
                </div>
                <div className="dcv-form-title">{project.name}</div>
                <p className="dcv-form-subtitle">
                  <InlineTechText text={project.desc} />
                </p>
                <div className="dcv-form-meta">
                  🗓 {project.period} · {project.role}
                </div>
                <Chips tags={project.stack} />
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="dcv-section-header">{labels.education}</div>
          <div className="dcv-grid dcv-grid-3">
            {model.formations.map((formation) => (
              <article className="dcv-card" key={formation.id}>
                <div className="dcv-form-label">
                  <span>{formation.kind === 'degree' ? '🎓' : '📚'}</span>
                  {formation.label.replace(/^📌\s*/, '')}
                </div>
                <div className="dcv-form-title">{formation.title}</div>
                <div className="dcv-form-subtitle">{formation.sub}</div>
                <div className="dcv-form-meta">{formation.meta}</div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
