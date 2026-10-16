import { useEffect, useRef } from 'react'
import avatar from '../Avatar.png'
import qrCode from '../assets/resume-qr.svg'
import type { OnePageModel } from './onePage'
import './onePage.css'

export function OnePageCv({ model }: { model: OnePageModel }) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const { labels } = model

  // Flags whether the content fits one A4 sheet, so the export script can fail loudly instead of printing two pages.
  useEffect(() => {
    const check = () => {
      const sheet = sheetRef.current
      if (!sheet) return
      const bottom = sheet.getBoundingClientRect().bottom
      const overflow = [...sheet.children].some(
        (block) => block.getBoundingClientRect().bottom > bottom + 1 || block.scrollHeight > block.clientHeight + 1,
      )
      document.documentElement.dataset.fit = overflow ? 'overflow' : 'ok'
    }

    // Web fonts change text metrics, so the verdict is only final once they are loaded.
    check()
    void document.fonts.ready.then(check)
  }, [model])

  return (
    <div className="onepage" lang={model.language}>
      <div className="onepage-sheet" ref={sheetRef}>
        <aside className="onepage-side">
          <img className="onepage-avatar" src={avatar} alt={model.name} />

          <p className="onepage-contact">
            <span>{model.email}</span>
            <span>{model.phone}</span>
          </p>

          <section>
            <h2>{labels.skills}</h2>
            {model.skills.map((skill) => (
              <div className="onepage-skill" key={skill.cat}>
                <h3>{skill.cat}</h3>
                <p>{skill.items.join(' · ')}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>{labels.education}</h2>
            {model.formations.map((formation) => (
              <div className="onepage-edu" key={`${formation.title}-${formation.sub}`}>
                <h3>{formation.title}</h3>
                <p>{formation.sub}</p>
              </div>
            ))}
          </section>

          <section>
            <h2>{labels.languages}</h2>
            <p>{model.languages.map((lang) => `${lang.label} (${lang.level})`).join(' · ')}</p>
          </section>

          <div className="onepage-online">
            <img className="onepage-qr" src={qrCode} alt={labels.online} />
            <p>
              <strong>{labels.online}</strong>
              <br />
              {model.url.replace('https://', '')}
            </p>
          </div>
        </aside>

        <main className="onepage-main">
          <header>
            <h1>{model.name}</h1>
            <p className="onepage-title">{model.title}</p>
            <p className="onepage-subtitle">{model.subtitle}</p>
          </header>

          <section>
            <h2>{labels.profile}</h2>
            <p>{model.bio}</p>
          </section>

          <section>
            <h2>{labels.experience}</h2>
            {model.experiences.map((experience) => (
              <div className="onepage-company" key={`${experience.company}-${experience.period}`}>
                <div className="onepage-company-head">
                  <h3>
                    {experience.company} <span>— {experience.employer}</span>
                  </h3>
                  <span className="onepage-period">{experience.period}</span>
                </div>
                <ul>
                  {experience.items.map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <em>
                        {' '}
                        · {item.badge} · {item.period}
                      </em>
                      <br />
                      {item.text}
                      {item.related.length > 0 && (
                        <span className="onepage-related">
                          {' '}
                          {labels.relatedProjects} : {item.related.join(' · ')}.
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2>{labels.personalProjects}</h2>
            <p>
              {model.personalProjects.map((project, index) => (
                <span key={project.name}>
                  {index > 0 && ' · '}
                  <strong>{project.name}</strong> ({project.kind})
                </span>
              ))}
            </p>
          </section>
        </main>

      </div>
    </div>
  )
}
