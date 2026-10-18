import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
} from "motion/react";
import {
  useExperiences,
  useFormation,
  usePersonalProjects,
  useProfile,
  useSkills,
} from "../hooks/useApi";
import { useAppStore } from "../store/appStore";
import { getTranslations } from "../locales";
import { getPopoutAnimation } from "../utils/popoutAnimation";
import { DesignLab, MaritimeLab, OrbitLab, WorkflowLab } from "./Labs";
import type { Experience, Mission, PersonalProject } from "../types";
import "./portfolio.css";
import { InterfaceSculpture } from "./InterfaceSculpture";

const ClassicCV = lazy(() => import("../App"));
const InteractiveJourney = lazy(() => import("../journey/Journey"));
const MissionDialog = lazy(() =>
  import("../components/MissionDialog").then((module) => ({
    default: module.MissionDialog,
  })),
);
const ProjectDialog = lazy(() =>
  import("../components/ProjectDialog").then((module) => ({
    default: module.ProjectDialog,
  })),
);
const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: 0.35, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.65, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  number,
  label,
  title,
  text,
}: {
  number: string;
  label: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <div className="eyebrow">
        <span>{number}</span> {label}
      </div>
      <div className="section-heading-main">
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const fr = language === "fr";
  const profileQuery = useProfile();
  const experiencesQuery = useExperiences();
  const personalQuery = usePersonalProjects();
  const skillsQuery = useSkills();
  const formationQuery = useFormation();
  const prefersReducedMotion = useReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const [introSkipped, setIntroSkipped] = useState(false);
  const paused = Boolean(prefersReducedMotion) || userPaused;
  const { scrollYProgress } = useScroll();
  const [missionSelection, setMissionSelection] = useState<{
    id: number;
    exp: number;
    animation: ReturnType<typeof getPopoutAnimation>;
  } | null>(null);
  const [projectSelection, setProjectSelection] = useState<{
    id: number;
    animation: ReturnType<typeof getPopoutAnimation>;
  } | null>(null);
  const t = getTranslations(language);
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const profile = profileQuery.data;
  const experiences = experiencesQuery.data ?? [];
  const personal = personalQuery.data ?? [];
  const activeExperience = experiences.find(
    (exp) => exp.id === missionSelection?.exp,
  );
  const activeMission = activeExperience?.missions.find(
    (mission) => mission.id === missionSelection?.id,
  );
  const activeProject = personal.find(
    (project) => project.id === projectSelection?.id,
  );
  function openMission(
    mission: Mission,
    exp: Experience,
    element: HTMLElement,
  ) {
    setMissionSelection({
      id: mission.id,
      exp: exp.id,
      animation: getPopoutAnimation(element),
    });
  }
  function openProject(project: PersonalProject, element: HTMLElement) {
    setProjectSelection({
      id: project.id,
      animation: getPopoutAnimation(element),
    });
  }
  function featuredMission(id: number) {
    const exp = experiences.find((e) => e.missions.some((m) => m.id === id));
    const mission = exp?.missions.find((m) => m.id === id);
    return exp && mission ? { exp, mission } : undefined;
  }
  const xistar = featuredMission(31);
  const designSystem = featuredMission(36);
  const partialError = [
    experiencesQuery,
    personalQuery,
    skillsQuery,
    formationQuery,
  ].some((query) => query.isError);
  const cvHref = `?view=cv&lang=${language}`;
  if (profileQuery.isPending)
    return (
      <div className="portfolio-loading">
        <span>
          ap<span>↗</span>
        </span>
        <p>{fr ? "Ouverture de l’atelier…" : "Opening the studio…"}</p>
      </div>
    );
  if (!profile)
    return (
      <div className="portfolio-loading">
        <p>{t.queryErrors.profile}</p>
        <button onClick={() => void profileQuery.refetch()}>
          {fr ? "Réessayer" : "Try again"}
        </button>
      </div>
    );
  return (
    <MotionConfig
      reducedMotion={paused ? "always" : "user"}
      transition={{ duration: 0.45, ease }}
    >
      <div
        className={`portfolio ${paused ? "motion-paused" : ""} ${introSkipped ? "intro-skipped" : ""}`}
      >
        <a href="#main" className="skip-link">
          {fr ? "Aller au contenu" : "Skip to content"}
        </a>
        <motion.div
          className="reading-progress"
          style={{ scaleX: scrollYProgress }}
        />
        <header className="portfolio-header">
          <a className="wordmark" href="#top" aria-label="Alexandre Plana">
            ap<span>↗</span>
          </a>
          <nav aria-label={fr ? "Navigation principale" : "Main navigation"}>
            <a href="#work">
              {fr ? "Réalisations" : "Selected work"}
              <sup>04</sup>
            </a>
            <a href="#approach">{fr ? "Approche" : "Approach"}</a>
            <a href="#journey">{fr ? "Parcours" : "Journey"}</a>
          </nav>
          <div className="header-actions">
            <div className="language-switch">
              <button
                onClick={() => setLanguage("fr")}
                aria-pressed={fr}
                aria-label="Français"
              >
                FR
              </button>
              <span>/</span>
              <button
                onClick={() => setLanguage("en")}
                aria-pressed={!fr}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <a className="cv-link" href={cvHref}>
              {fr ? "CV classique" : "Classic résumé"} <span>↗</span>
            </a>
            <a className="journey-entry-link" href={`?view=journey&lang=${language}`}>
              <span aria-hidden="true">▷</span> {fr ? "Parcours interactif" : "Interactive journey"}
            </a>
          </div>
        </header>
        <main id="main">
          <section className="hero section-shell" id="top">
            <div className="hero-meta">
              <span>
                <i className="signal-dot" />{" "}
                {fr
                  ? "DÉVELOPPEUR FULL-STACK · EXPERTISE FRONT-END"
                  : "FULL-STACK DEVELOPER · FRONT-END EXPERTISE"}
              </span>
              <span>FRANCE — 2026</span>
            </div>
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-intro">
                  Alexandre Plana <span>↘</span>
                </p>
                <h1>
                  <span className="title-line">
                    {fr ? "Des interfaces" : "Interfaces"}
                  </span>
                  <span className="title-line">
                    {fr ? "qui prennent" : "that come"}
                  </span>
                  <span className="title-line accent-title">
                    {fr ? "vie." : "alive."}
                    <svg viewBox="0 0 260 25" aria-hidden="true">
                      <path d="M4 17C72 2 154 3 253 11M64 23C132 14 196 13 231 17" />
                    </svg>
                  </span>
                </h1>
                <p className="hero-description">
                  {fr
                    ? "Je donne forme aux systèmes complexes. Du premier usage au dernier pixel, je conçois et développe des produits qui se comprennent et se manipulent."
                    : "I give shape to complex systems. From the first use case to the last pixel, I design and build products made to be understood and explored."}
                </p>
                <a className="primary-link" href="#work">
                  {fr ? "Explorer mon travail" : "Explore my work"}{" "}
                  <span>↘</span>
                </a>
              </div>
              <InterfaceSculpture fr={fr} paused={paused} />
            </div>
            <div className="hero-bottom">
              <p>
                <span>01 / 05</span>{" "}
                {fr
                  ? "LE PARCOURS SE LIT. LE SAVOIR-FAIRE SE MANIPULE."
                  : "READ THE JOURNEY. EXPERIENCE THE CRAFT."}
              </p>
              <button
                className="skip-intro"
                onClick={() => {
                  setIntroSkipped(true);
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "instant" });
                }}
              >
                {fr ? "Passer l’introduction" : "Skip introduction"} ↓
              </button>
            </div>
          </section>
          <div
            className="discipline-strip"
            aria-label={fr ? "Domaines d’intervention" : "Fields of work"}
          >
            <span>FRONT-END ENGINEERING</span>
            <i>✳</i>
            <span>UI / UX DESIGN</span>
            <i>✳</i>
            <span>INDUSTRIAL APPLICATIONS</span>
            <i>✳</i>
            <span>INTERACTIVE SYSTEMS</span>
          </div>
          <section className="work-section section-shell" id="work">
            <SectionHeading
              number="01"
              label={fr ? "LE TRAVAIL, EN ACTION" : "WORK, IN ACTION"}
              title={
                <>
                  {fr ? "Moins de promesses." : "Less telling."}
                  <br />
                  <span className="muted-title">
                    {fr ? "Plus d’interactions." : "More interacting."}
                  </span>
                </>
              }
              text={
                fr
                  ? "Quatre terrains d’exploration. Des démonstrations conçues pour ce portfolio, inspirées de mes projets. À vous de prendre les commandes."
                  : "Four places to explore. Interactive demonstrations created for this portfolio, inspired by my projects. Take the controls."
              }
            />
            {partialError && (
              <p role="alert" className="query-feedback">
                {t.queryErrors.partialData}
              </p>
            )}
            <Reveal className="work-item maritime-item">
              <div className="work-description">
                <div className="project-index">
                  <span>01 / INDUSTRIAL INTERFACE</span>
                  <span>2026</span>
                </div>
                <h3>
                  Xistar<span>↗</span>
                </h3>
                <p className="project-subtitle">
                  {fr
                    ? "Rendre la complexité navigable."
                    : "Make complexity navigable."}
                </p>
                <p>
                  {fr
                    ? "Cartographie, données opérationnelles, services Go et espaces de travail multi-écran. Une interface pensée à partir des besoins des opérateurs."
                    : "Maps, operational data, Go services and multi-screen workspaces. An interface shaped around operator needs."}
                </p>
                <div className="stack-tags">
                  {[
                    "React",
                    "TypeScript",
                    "Go",
                    "MapLibre",
                    "Deck.gl",
                    "Dockview",
                  ].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="try-note">
                  <span>↳</span>
                  <p>
                    {fr
                      ? "Sélectionnez un navire. Remontez le temps. Déplacez son panneau."
                      : "Select a vessel. Scrub through time. Move its panel."}
                  </p>
                </div>
                {xistar && (
                  <button
                    className="text-link"
                    onClick={(e) =>
                      openMission(xistar.mission, xistar.exp, e.currentTarget)
                    }
                  >
                    {fr ? "Le projet & mon rôle" : "The project & my role"} ↗
                  </button>
                )}
                <p className="demo-disclaimer">
                  {fr
                    ? "Simulation SVG schématique · données entièrement fictives."
                    : "Schematic SVG simulation · entirely fictional data."}
                </p>
              </div>
              <MaritimeLab language={language} paused={paused} />
            </Reveal>
            <Reveal className="work-item design-item">
              <DesignLab language={language} paused={paused} />
              <div className="work-description">
                <div className="project-index">
                  <span>02 / DESIGN ENGINEERING</span>
                  <span>2026</span>
                </div>
                <h3>
                  {fr ? "Un même langage." : "One shared language."}
                  <span>✳</span>
                </h3>
                <p className="project-subtitle">
                  {fr
                    ? "Du composant au système."
                    : "From component to system."}
                </p>
                <p>
                  {fr
                    ? "Faire dialoguer Figma et les applications. Concevoir des composants cohérents, leurs variantes et leurs états, sans perdre le sens du détail."
                    : "Connect Figma and applications. Design coherent components, their variants and states, with attention to every detail."}
                </p>
                <div className="stack-tags">
                  {["Design tokens", "Figma", "React", "UI/UX"].map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="try-note">
                  <span>↳</span>
                  <p>
                    {fr
                      ? "Changez le thème, l’accent et les rayons. Testez les états."
                      : "Change the theme, accent and radius. Try the states."}
                  </p>
                </div>
                {designSystem && (
                  <button
                    className="text-link"
                    onClick={(e) =>
                      openMission(
                        designSystem.mission,
                        designSystem.exp,
                        e.currentTarget,
                      )
                    }
                  >
                    {fr
                      ? "Découvrir le design system"
                      : "Explore the design system"}{" "}
                    ↗
                  </button>
                )}
                <p className="demo-disclaimer">
                  {fr
                    ? "Playground original, inspiré de ma démarche design system."
                    : "Original playground, inspired by my design system practice."}
                </p>
              </div>
            </Reveal>
            <div className="exploration-grid">
              <Reveal className="exploration-card">
                <WorkflowLab language={language} paused={paused} />
                <div className="exploration-copy">
                  <div className="project-index">
                    <span>03 / AGENT WORKFLOW</span>
                    <span>2026</span>
                  </div>
                  <h3>
                    Iasit <span>↗</span>
                  </h3>
                  <p>
                    {fr
                      ? "Exécuter. Vérifier. Apprendre. Une boucle de développement assisté par IA où les écarts deviennent des règles réutilisables."
                      : "Execute. Verify. Learn. An AI-assisted development loop where findings become reusable rules."}
                  </p>
                  <div className="exploration-footer">
                    <span className="mono">REACT · NODE.JS · MCP</span>
                    {personal.find((p) => p.id === 4) && (
                      <button
                        className="text-link"
                        onClick={(e) =>
                          openProject(
                            personal.find((p) => p.id === 4)!,
                            e.currentTarget,
                          )
                        }
                      >
                        {fr ? "Le projet" : "The project"} ↗
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
              <Reveal className="exploration-card">
                <OrbitLab language={language} paused={paused} />
                <div className="exploration-copy">
                  <div className="project-index">
                    <span>04 / SPATIAL EXPLORATION</span>
                    <span>2026</span>
                  </div>
                  <h3>
                    Vorrery <span>↗</span>
                  </h3>
                  <p>
                    {fr
                      ? "Comprendre en manipulant. Un terrain d’expérimentation 3D pour relier les paramètres d’un système à ce que l’on observe."
                      : "Understand through exploration. A 3D playground connecting system parameters to what we observe."}
                  </p>
                  <div className="exploration-footer">
                    <span className="mono">THREE.JS · REACT · TYPESCRIPT</span>
                    {personal.find((p) => p.id === 6) && (
                      <button
                        className="text-link"
                        onClick={(e) =>
                          openProject(
                            personal.find((p) => p.id === 6)!,
                            e.currentTarget,
                          )
                        }
                      >
                        {fr ? "Le projet" : "The project"} ↗
                      </button>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
          <section className="approach-section" id="approach">
            <div className="section-shell">
              <SectionHeading
                number="02"
                label={fr ? "LA FAÇON DE FAIRE" : "THE WAY I WORK"}
                title={
                  <>
                    {fr ? "Entre l’usage" : "Between use"}
                    <br />
                    {fr ? "et le code." : "and code."}
                    <span className="orange-period">●</span>
                  </>
                }
                text={
                  fr
                    ? "Mon point de départ : comprendre ce que la personne doit accomplir. Ma ligne d’arrivée : un produit cohérent, jusque dans ses contraintes techniques."
                    : "My starting point: understand what someone needs to achieve. My destination: a coherent product, down to its technical constraints."
                }
              />
              <div className="method-grid">
                {(fr
                  ? [
                      [
                        "01",
                        "Comprendre",
                        "Les usages métier, le contexte, les contraintes. Définir ce que l’interface doit permettre avant de décider de sa forme.",
                      ],
                      [
                        "02",
                        "Donner forme",
                        "Relier parcours, composants et interactions. Faire des choix visuels qui rendent les fonctions lisibles.",
                      ],
                      [
                        "03",
                        "Construire",
                        "Articuler front-end et services. Garder une architecture claire et vérifier le comportement du produit.",
                      ],
                    ]
                  : [
                      [
                        "01",
                        "Understand",
                        "Business needs, context and constraints. Define what the interface should make possible before choosing its form.",
                      ],
                      [
                        "02",
                        "Shape",
                        "Connect journeys, components and interactions. Make visual choices that clarify what the product does.",
                      ],
                      [
                        "03",
                        "Build",
                        "Connect front-end and services. Keep the architecture clear and verify product behaviour.",
                      ],
                    ]
                ).map(([num, title, desc]) => (
                  <Reveal className="method-card" key={num}>
                    <span className="method-number">{num}</span>
                    <h3>
                      {title}
                      <span>{["⌕", "◇", "⌘"][+num - 1]}</span>
                    </h3>
                    <p>{desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          <section className="journey-section section-shell" id="journey">
            <SectionHeading
              number="03"
              label={fr ? "LE PARCOURS" : "THE JOURNEY"}
              title={
                <>
                  {fr ? "Un fil conducteur." : "A common thread."}
                  <br />
                  <span className="muted-title">
                    {fr ? "Des terrains multiples." : "Different fields."}
                  </span>
                </>
              }
              text={profile.bio}
            />
            <div className="timeline">
              {experiencesQuery.isPending && <p>{t.common.loading}</p>}
              {experiences.map((exp, index) => (
                <Reveal className="experience-row" key={exp.id}>
                  <div className="experience-period">
                    <span>{exp.period}</span>
                    <i className={index === 0 ? "current" : ""} />
                  </div>
                  <div className="experience-content">
                    <div className="experience-heading">
                      <div>
                        <h3>{exp.company}</h3>
                        <p>{exp.employer}</p>
                      </div>
                      <span className="mono">
                        0{experiences.length - index}
                      </span>
                    </div>
                    <div className="mission-list">
                      {exp.missions
                        .filter((m) => m.type === "mission")
                        .map((mission) => (
                          <div className="mission-group" key={mission.id}>
                            <button
                              className="mission-row"
                              onClick={(e) =>
                                openMission(mission, exp, e.currentTarget)
                              }
                            >
                              <span>
                                {mission.context}
                                <small>{mission.badge}</small>
                              </span>
                              <span className="mission-period">
                                {mission.period}
                              </span>
                              <span>↗</span>
                            </button>
                            {exp.missions
                              .filter((m) => m.parentMissionId === mission.id)
                              .map((child) => (
                                <button
                                  key={child.id}
                                  className="mission-row child-mission"
                                  onClick={(e) =>
                                    openMission(child, exp, e.currentTarget)
                                  }
                                >
                                  <span>↳ {child.context}</span>
                                  <span>↗</span>
                                </button>
                              ))}
                          </div>
                        ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="additional-projects">
              <div className="eyebrow">
                {fr ? "AUSSI DANS L’ATELIER" : "ALSO IN THE STUDIO"}
              </div>
              {personal
                .filter((p) => ![4, 6].includes(p.id))
                .map((project) => (
                  <button
                    key={project.id}
                    id={`personal-project-${project.id}`}
                    onClick={(e) => openProject(project, e.currentTarget)}
                  >
                    <span>
                      <strong>{project.name}</strong>
                      <small>
                        {project.kind} · {project.status}
                      </small>
                    </span>
                    <span>↗</span>
                  </button>
                ))}
            </div>
          </section>
          <section className="expertise-section section-shell">
            <SectionHeading
              number="04"
              label={fr ? "LES OUTILS & LES FONDATIONS" : "TOOLS & FOUNDATIONS"}
              title={
                <>
                  {fr ? "Le fond." : "The substance."}
                  <br />
                  <span className="muted-title">
                    {fr ? "Et la formation." : "And the learning."}
                  </span>
                </>
              }
            />
            <div className="foundations-grid">
              <div className="skills-grid">
                {skillsQuery.isPending && <p>{t.common.loading}</p>}
                {skillsQuery.data?.map((category) => (
                  <div className="skill-category" key={category.id}>
                    <h3>{category.cat}</h3>
                    <div>
                      {category.tags.map((tag) => (
                        <span key={tag.l}>{tag.l}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="education-list">
                {formationQuery.isPending && <p>{t.common.loading}</p>}
                {formationQuery.data?.map((formation) => (
                  <details key={formation.id}>
                    <summary>
                      <span>
                        {formation.title}
                        <small>{formation.sub}</small>
                      </span>
                      <span>+</span>
                    </summary>
                    <p>{formation.meta}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
          <section className="contact-section" id="contact">
            <div className="section-shell">
              <div className="eyebrow">
                <span>05</span>{" "}
                {fr
                  ? "LA SUITE S’ÉCRIT ENSEMBLE"
                  : "LET’S BUILD WHAT COMES NEXT"}
              </div>
              <div className="contact-heading">
                <h2>
                  {fr ? "Un système complexe ?" : "A complex system?"}
                  <br />
                  <a href={`mailto:${profile.email}`}>
                    {fr ? "Parlons-en." : "Let’s talk."} <span>↗</span>
                  </a>
                </h2>
                <span className="contact-symbol" aria-hidden="true">
                  ✳
                </span>
              </div>
              <div className="contact-bottom">
                <a href={`mailto:${profile.email}`}>{profile.email} ↗</a>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                  {profile.phone}
                </a>
                <a href={cvHref}>
                  {fr
                    ? "Consulter & télécharger le CV"
                    : "View & download my résumé"}{" "}
                  ↗
                </a>
              </div>
            </div>
          </section>
        </main>
        <footer className="portfolio-footer section-shell">
          <span>© 2026 ALEXANDRE PLANA</span>
          <span>
            {fr ? "CONÇU POUR ÊTRE EXPLORÉ." : "MADE TO BE EXPLORED."}
          </span>
          <button
            aria-pressed={userPaused}
            onClick={() => setUserPaused(!userPaused)}
          >
            {paused ? "▶" : "Ⅱ"}{" "}
            {prefersReducedMotion
              ? fr
                ? "Mouvement réduit activé"
                : "Reduced motion enabled"
              : paused
                ? fr
                  ? "Activer les animations"
                  : "Enable motion"
                : fr
                  ? "Pause des animations"
                  : "Pause motion"}
          </button>
          <a href="#top">{fr ? "En haut" : "Back to top"} ↑</a>
        </footer>
        <Suspense
          fallback={
            <p className="dialog-loading" role="status">
              {t.common.loading}
            </p>
          }
        >
          {missionSelection && activeMission && activeExperience && (
            <MissionDialog
              popout={{
                mission: activeMission,
                company: activeExperience.company,
                employer: activeExperience.employer,
                animation: missionSelection.animation,
              }}
              t={t}
              onClose={() => setMissionSelection(null)}
              onOpenPersonalProject={(id) => {
                setMissionSelection(null);
                setProjectSelection({
                  id,
                  animation: getPopoutAnimation(null),
                });
              }}
            />
          )}
          {projectSelection && activeProject && (
            <ProjectDialog
              popout={{
                project: activeProject,
                animation: projectSelection.animation,
              }}
              t={t}
              onClose={() => setProjectSelection(null)}
            />
          )}
        </Suspense>
      </div>
    </MotionConfig>
  );
}

export function PortfolioRouter() {
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const view = new URLSearchParams(window.location.search).get("view");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "en" || requested === "fr") setLanguage(requested);
  }, [setLanguage]);
  return view === "journey" ? (
    <Suspense fallback={<p role="status">{language === "fr" ? "Chargement du parcours…" : "Loading the journey…"}</p>}>
      <InteractiveJourney />
    </Suspense>
  ) : view === "cv" ? (
    <>
      <a className="back-to-portfolio" href={`?lang=${language}`}>
        ← {language === "fr" ? "Retour au portfolio" : "Back to portfolio"}
      </a>
      <Suspense fallback={<p>…</p>}>
        <ClassicCV />
      </Suspense>
    </>
  ) : (
    <Portfolio />
  );
}
