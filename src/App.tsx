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
import styles from './App.module.css'

function App() {
  const { data: profile, isLoading: profileLoading } = useProfile()
  const { data: experiences, isLoading: expLoading } = useExperiences()
  const { data: projects, isLoading: projLoading } = useProjects()
  const { data: skills, isLoading: skillsLoading } = useSkills()
  const { data: formation, isLoading: formationLoading } = useFormation()
  const { data: activity, isLoading: activityLoading } = useActivity()
  const { language, activeTab, contactOpen, setContactOpen } = useAppStore()
  const t = getTranslations(language)

  const isLoading = profileLoading || expLoading || projLoading || skillsLoading || formationLoading || activityLoading

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
            <div className={styles.label}>Top languages</div>
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
            <div className={styles.label}>{t.sections.uiUxCulture}</div>
            <div className={styles.uiuxDesc}>{profile.uiuxHighlight.desc}</div>
            <div className={styles.tags}>
              {profile.uiuxHighlight.tools.map((tool, idx) => (
                <TechBadge key={`${tool}-${idx}`} label={tool} kind={tool === 'Figma' || tool === 'Adobe XD' ? 'figma' : 'uiux'} />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.label}>{t.sidebar.interests === 'Intérêts' ? 'Intérêts' : t.sidebar.interests}</div>
            <div className={styles.tags}>
              {profile.interests.map((interest, idx) => (
                <TechBadge key={`${interest}-${idx}`} label={interest} kind="green" />
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
                            <div className={styles.tags}>
                              {mission.tags.map((tag, idx) => (
                                <TechBadge key={`mission-${mission.id}-${tag}-${idx}`} label={tag} kind={tag} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              <div className={styles.printQrBanner}>
                <QRCode url="https://alexandre-plana.github.io/resume/" language={language} />
              </div>

              {/* COMPÉTENCES */}
              <div className={styles.skillsSection}>
                <div className={styles.sectionHeader}>🏷 {language === 'fr' ? 'Compétences & Technologies' : 'Skills & Technologies'}</div>
                <div className={styles.skillsBlock}>
                  {!isLoading &&
                    skills?.map((skillCat, idx) => (
                      <div key={idx} className={skillCat.featured ? styles.skCatFeatured : styles.skCat}>
                        <div className={skillCat.featured ? styles.catLabelFeatured : styles.catLabel}>
                          {skillCat.cat}
                        </div>
                        <div className={styles.tags}>
                          {skillCat.tags.map((tag, tagIdx) => (
                            <TechBadge key={`skill-${idx}-${tag.k}-${tagIdx}`} label={tag.l} kind={tag.k} />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
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

      <footer className={styles.footer}>
        {profile.handle} © 2026 · {profile.email} · <PhoneNumber number={profile.phone} />
      </footer>
    </>
  )
}

export default App
