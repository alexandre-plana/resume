import { useProfile, useExperiences, useSkills, useFormation, useActivity } from './hooks/useApi'
import { useAppStore } from './store/appStore'
import { Avatar } from './components/Avatar'
import { LanguageSwitch } from './components/LanguageSwitch'
import { Tabs } from './components/Tabs'
import { ContribGraph } from './components/ContribGraph'
import { TechBadge } from './components/TechBadge'
import { getTranslations } from './locales'
import styles from './App.module.css'

function App() {
  const { data: profile, isLoading: profileLoading } = useProfile()
  const { data: experiences, isLoading: expLoading } = useExperiences()
  const { data: skills, isLoading: skillsLoading } = useSkills()
  const { data: formation, isLoading: formationLoading } = useFormation()
  const { data: activity, isLoading: activityLoading } = useActivity()
  const { language } = useAppStore()
  const t = getTranslations(language)

  const isLoading = profileLoading || expLoading || skillsLoading || formationLoading || activityLoading

  if (!profile) return <div className={styles.loading}>Chargement...</div>

  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <Avatar name={profile.name} initials="AP" />
          <LanguageSwitch />

          <div className={styles.profileName}>{profile.name}</div>
          <div className={styles.profileHandle}>@{profile.handle}</div>
          <div className={styles.profileTitle}>{profile.title}</div>
          <div className={styles.profileSubtitle}>{profile.subtitle}</div>

          <p className={styles.profileBio}>{profile.bio}</p>

          <div className={styles.btnRow}>
            <button className={styles.btnPrimary}>{t.common.contact}</button>
            <button className={styles.btnSecondary}>{t.common.follow}</button>
          </div>

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
              {profile.phone}
            </li>
          </ul>

          <div className={styles.section}>
            <div className={styles.label}>{t.common.languages}</div>
            <div className={styles.langRow}>
              {profile.langs.map((lang) => (
                <span key={lang.label} className={styles.langPill}>
                  {lang.label} <span>{lang.level}</span>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.seekingBox}>
            <strong>{t.sidebar.seekingLabel}</strong>
            {profile.seeking}
          </div>

          <div className={styles.section}>
            <div className={styles.label}>Top languages</div>
            <div className={styles.langBar}>
              {profile.languages.map((lang) => (
                <div
                  key={lang.name}
                  className={styles.langSeg}
                  style={{
                    width: `${lang.pct}%`,
                    background: lang.color,
                  }}
                />
              ))}
            </div>
            <div className={styles.langLegend}>
              {profile.languages.map((lang) => (
                <div key={lang.name} className={styles.legendItem}>
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
            <div className={styles.label}>{t.sections.uiUxCulture}</div>
            <div className={styles.uiuxDesc}>{profile.uiuxHighlight.desc}</div>
            <div className={styles.tags}>
              {profile.uiuxHighlight.tools.map((tool) => (
                <TechBadge key={tool} label={tool} kind={tool === 'Figma' || tool === 'Adobe XD' ? 'figma' : 'uiux'} />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.label}>{t.sidebar.awards === '🏆 Awards' ? '🏆 Awards' : t.sidebar.awards}</div>
            {profile.awards.map((award) => (
              <div key={`${award.year}-${award.title}`} className={styles.awardItem}>
                <strong>{award.title} {award.year}</strong>
                {award.desc}
              </div>
            ))}
          </div>

          <div className={styles.section}>
            <div className={styles.label}>{t.sidebar.interests === 'Intérêts' ? 'Intérêts' : t.sidebar.interests}</div>
            <div className={styles.tags}>
              {profile.interests.map((interest) => (
                <TechBadge key={interest} label={interest} kind="green" />
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className={styles.main}>
          <Tabs />

          <ContribGraph contributions={profile.contributions} />

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
                      >
                        <div className={styles.missionTop}>
                          <span style={{ color: 'var(--text-3)' }}>📁</span>
                          <span className={styles.missionName}>{mission.name}</span>
                          <span className={styles.missionBadge}>{mission.badge}</span>
                        </div>
                        <div className={styles.missionContext}>{mission.context}</div>
                        <div className={styles.missionDesc}>{mission.desc}</div>
                        {mission.featured && (
                          <div className={styles.metricsGrid}>
                            {mission.metrics.map((metric, idx) => (
                              <div key={idx} className={styles.metricItem}>
                                <div className={styles.metricValue}>{metric.value}</div>
                                <div className={styles.metricLabel}>{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className={styles.missionStack}>{mission.stack}</div>
                        <div className={styles.tags}>
                          {mission.tags.map((tag) => (
                            <TechBadge key={tag} label={tag} kind={tag} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* COMPÉTENCES */}
          <div className={styles.sectionHeader}>🏷 {language === 'fr' ? 'Compétences & Technologies' : 'Skills & Technologies'}</div>
          <div className={styles.skillsBlock}>
            {!isLoading &&
              skills?.map((skillCat, idx) => (
                <div key={idx} className={skillCat.featured ? styles.skCatFeatured : styles.skCat}>
                  <div className={skillCat.featured ? styles.catLabelFeatured : styles.catLabel}>
                    {skillCat.cat}
                  </div>
                  <div className={styles.tags}>
                    {skillCat.tags.map((tag) => (
                      <TechBadge key={tag.k} label={tag.l} kind={tag.k} />
                    ))}
                  </div>
                </div>
              ))}
          </div>

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

          {/* ACTIVITY */}
          <div className={styles.sectionHeader}>⚡ {language === 'fr' ? 'Activité Récente' : 'Recent Activity'}</div>
          <div className={styles.activity}>
            {!isLoading &&
              activity?.map((act) => (
                <div key={act.id} className={styles.activityItem}>
                  <div className={`${styles.activityIcon} ${styles[act.type]}`}>{act.icon}</div>
                  <div>
                    <strong>
                      {act.action} {act.repo}
                    </strong>
                    {act.detail && <div className={styles.activityTime}>{act.detail}</div>}
                    <div className={styles.activityTime}>{act.time}</div>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </div>

      <footer className={styles.footer}>
        {profile.handle} © 2026 · {profile.email} · {profile.phone}
      </footer>
    </div>
  )
}

export default App
