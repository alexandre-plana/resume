import { Language } from '../locales'

export interface LocalizedMockData {
  profile: {
    title: string
    subtitle: string
    bio: string
    company: string
    seeking: string
    interests: string[]
    uiuxHighlight: {
      label: string
      desc: string
      tools: string[]
    }
  }
  experiences: {
    [key: string]: {
      company: string
      employer: string
      missions: {
        [key: string]: {
          badge: string
          context: string
          desc: string
          metrics: { label: string }[]
        }
      }
    }
  }
  skills: {
    [key: number]: {
      cat: string
    }
  }
  formation: {
    [key: number]: {
      label: string
      title: string
      sub: string
      meta: string
    }
  }
  activity: {
    [key: number]: {
      action: string
      repo: string
      detail?: string
      time: string
    }
  }
}

export const mockDataLocales: Record<Language, LocalizedMockData> = {
  fr: {
    profile: {
      title: 'Développeur Front End Web',
      subtitle: 'Industrie · UI/UX · Multi Plateforme',
      bio: 'Développeur Front-End Senior avec 13 ans d\'expérience, j\'ai passé ma carrière dans des secteurs où ce qu\'on construit a un impact concret : énergie, nucléaire, défense, IIoT. De Schneider Electric à AREVA en passant par EDF, j\'ai appris qu\'une bonne interface, c\'est avant tout une interface qu\'on comprend vite et sur laquelle on peut compter. Au fil des projets et des stacks, j\'ai développé la conviction que la technologie est un moyen, jamais une fin — et c\'est avec cet état d\'esprit que j\'aborde chaque nouveau défi.',
      company: 'Consultant R&D · Datacorp / Schneider Electric',
      seeking: 'Poste Front End web dans un contexte industriel · Vue.js ou React · TypeScript · micro-frontend · équipe orientée qualité & UX',
      interests: ['🎮 Jeux', '🚵 VTT', '🥾 Rando', '🍳 Cuisine'],
      uiuxHighlight: {
        label: '🎨 Culture UI/UX',
        desc: 'Pratique du design sur l\'ensemble du parcours — de la maquette Figma au composant en production.',
        tools: ['Figma', 'Adobe XD', 'Design System', 'Prototypage'],
      },
    },
    experiences: {
      '1': {
        company: 'Schneider Electric',
        employer: 'Consultant R&D — Datacorp',
        missions: {
          '11': {
            badge: 'Développeur front end',
            context: 'Industrial Automation Edge (IECA)',
            desc: 'Développement d\'Edge compute apps industrielles en architecture micro-frontend (single-spa). Intégration de composants Vue 3 + TypeScript en équipe Scrum.',
            metrics: [],
          },
          '12': {
            badge: 'Développeur C# / Unity',
            context: 'Augmented Operator Advisor (AOA) — Application AR industrielle',
            desc: 'Développement pendant 6 ans d\'une application AR multi-plateforme (Android, iOS, Windows) pour opérateurs industriels Schneider Electric. Conception et implémentation des interfaces opérateur, gestion des états complexes de la couche AR.',
            metrics: [
              { label: 'développement\ncontinu' },
              { label: 'plateformes\nsimultanées' },
              { label: 'temps réel\nterrain' },
            ],
          },
        },
      },
      '2': {
        company: 'Oreka Ingénierie',
        employer: 'Développeur C# / Unity 3D',
        missions: {
          '21': {
            badge: 'Développeur C# / Unity 3D',
            context: 'Projets VR/AR — Industrie & Patrimoine',
            desc: 'Développement et direction artistique de projets VR/AR pour le patrimoine (sites historiques, musées) et industrie manufacturière. Intégration 3D, optimisation de la performance, UI/UX pour environnements immersifs.',
            metrics: [
              { label: 'ans de\nspecialisation' },
              { label: 'projets VR/AR\ndeliverés' },
              { label: 'utilisateurs\nsur terrain' },
            ],
          },
        },
      },
    },
    skills: {
      0: { cat: 'Frontend' },
      1: { cat: 'Backend & Outils' },
      2: { cat: 'Temps Réel & Immersif' },
      3: { cat: 'Design & UX' },
      4: { cat: 'Pratiques' },
      5: { cat: 'Infrastructure' },
    },
    formation: {
      0: {
        label: 'École',
        title: 'Master Informatique Spécialité Image & Simulation 3D',
        sub: 'Université de Bretagne-Sud',
        meta: '2012',
      },
      1: {
        label: 'École',
        title: 'Licence Informatique',
        sub: 'Université de Bretagne-Sud',
        meta: '2010',
      },
      2: {
        label: 'Certificat',
        title: 'Figma Design System & Component Driven',
        sub: 'Formation Interne Schneider Electric',
        meta: '2024',
      },
      3: {
        label: 'Certificat',
        title: 'Micro-frontends Architecture',
        sub: 'Formation Single-SPA & Module Federation',
        meta: '2023',
      },
    },
    activity: {
      0: {
        action: 'a commencé à suivre',
        repo: 'microsoft/TypeScript',
        detail: 'Type safety + performance',
        time: 'Il y a 2 semaines',
      },
      1: {
        action: 'a mis en étoile',
        repo: 'vuejs/core',
        detail: 'Compositor API & performance',
        time: 'Il y a 1 mois',
      },
      2: {
        action: 'a suivi',
        repo: 'single-spa/single-spa',
        time: 'Il y a 3 mois',
      },
      3: {
        action: 'a mis en étoile',
        repo: 'evanw/esbuild',
        time: 'Il y a 4 mois',
      },
    },
  },
  en: {
    profile: {
      title: 'Senior Frontend Engineer',
      subtitle: 'Industrial · UI/UX · Multi-Platform',
      bio: 'Senior Frontend Developer (13 years of experience) specialized in industrial environments: IIoT, energy, nuclear and defense. I have designed and developed user interfaces for Schneider Electric, EDF, RTE, AREVA and DCNS, built a cross-platform mobile AR application, and contributed to micro-frontend web architectures dedicated to IIoT. Key skills: JavaScript/TypeScript, React, Vue, design systems, performance, UI/UX integration and frontend industrialization. I transform complex business challenges into reliable, intuitive interfaces tailored to industrial environments.',
      company: 'R&D Consultant · Datacorp / Schneider Electric',
      seeking: 'Frontend role in industrial context · Vue.js or React · TypeScript · micro-frontends · quality & UX-oriented team',
      interests: ['🎮 Gaming', '🚵 Mountain Biking', '🥾 Hiking', '🍳 Cooking'],
      uiuxHighlight: {
        label: '🎨 UI/UX Culture',
        desc: 'Design practice across the entire journey — from Figma mockup to production component.',
        tools: ['Figma', 'Adobe XD', 'Design System', 'Prototyping'],
      },
    },
    experiences: {
      '1': {
        company: 'Schneider Electric',
        employer: 'R&D Consultant — Datacorp',
        missions: {
          '11': {
            badge: 'Frontend Developer',
            context: 'Industrial Automation Edge (IECA)',
            desc: 'Development of industrial Edge compute apps in micro-frontend architecture (single-spa). Integration of Vue 3 + TypeScript components in Scrum team.',
            metrics: [],
          },
          '12': {
            badge: 'C# / Unity Developer',
            context: 'Augmented Operator Advisor (AOA) — Industrial AR Application',
            desc: 'Built cross-platform AR app (Android, iOS, Windows) for industrial operators over 6 years. Designed and implemented operator interfaces, managed complex AR layer state management.',
            metrics: [
              { label: 'years of\ncontinuous dev' },
              { label: 'simultaneous\nplatforms' },
              { label: 'real-time\nfield usage' },
            ],
          },
        },
      },
      '2': {
        company: 'Oreka Engineering',
        employer: 'C# / Unity 3D Developer',
        missions: {
          '21': {
            badge: 'C# / Unity 3D Developer',
            context: 'VR/AR Projects — Heritage & Industry',
            desc: 'Developed and directed VR/AR projects for heritage sites (historical monuments, museums) and manufacturing industry. Integrated 3D assets, optimized performance, designed UX for immersive environments.',
            metrics: [
              { label: 'years of\nspecialization' },
              { label: 'VR/AR projects\ndelivered' },
              { label: 'end users\nin field' },
            ],
          },
        },
      },
    },
    skills: {
      0: { cat: 'Frontend' },
      1: { cat: 'Backend & Tools' },
      2: { cat: 'Real-Time & Immersive' },
      3: { cat: 'Design & UX' },
      4: { cat: 'Practices' },
      5: { cat: 'Infrastructure' },
    },
    formation: {
      0: {
        label: 'Degree',
        title: 'Master\'s in Computer Science - Image & 3D Simulation',
        sub: 'University of Brittany-South',
        meta: '2012',
      },
      1: {
        label: 'Degree',
        title: 'Bachelor\'s in Computer Science',
        sub: 'University of Brittany-South',
        meta: '2010',
      },
      2: {
        label: 'Certificate',
        title: 'Figma Design System & Component Driven',
        sub: 'Schneider Electric Internal Training',
        meta: '2024',
      },
      3: {
        label: 'Certificate',
        title: 'Micro-frontends Architecture',
        sub: 'Single-SPA & Module Federation Training',
        meta: '2023',
      },
    },
    activity: {
      0: {
        action: 'started following',
        repo: 'microsoft/TypeScript',
        detail: 'Type safety + performance',
        time: '2 weeks ago',
      },
      1: {
        action: 'starred',
        repo: 'vuejs/core',
        detail: 'Compositor API & performance',
        time: '1 month ago',
      },
      2: {
        action: 'followed',
        repo: 'single-spa/single-spa',
        time: '3 months ago',
      },
      3: {
        action: 'starred',
        repo: 'evanw/esbuild',
        time: '4 months ago',
      },
    },
  },
}

export const getMockDataLocale = (lang: Language): LocalizedMockData => mockDataLocales[lang]
