export type Language = 'fr' | 'en'

export interface Translations {
  common: {
    languages: string
    coreSkills: string
    openToWork: string
    contact: string
    follow: string
    followers: string
    following: string
    contributions: string
    loading: string
    noData: string
  }
  sidebar: {
    seekingLabel: string
    awards: string
    interests: string
  }
  tabs: {
    overview: string
    formations: string
    personalProjects: string
  }
  sections: {
    uiUxCulture: string
    skills: string
    formation: string
    timeline: string
    contributions: string
    about: string
    professionalExperience: string
  }
  toolbar: {
    print: string
    exportWord: string
  }
  queryErrors: {
    profile: string
    partialData: string
    experiences: string
    skills: string
    formation: string
    personalProjects: string
  }
  formationControls: {
    sortBy: string
    sortDate: string
    sortName: string
    types: string
    training: string
    degree: string
    personalProject: string
    empty: string
  }
  mission: {
    current: string
    openDetails: string
    expand: string
    close: string
    tasksPreviewTitle: string
    tasksTitle: string
    retrospective: string
  }
  personalModal: {
    openDetails: string
    highlightsTitle: string
  }
  contactModal: {
    title: string
    wip: string
    name: string
    email: string
    subject: string
    message: string
    send: string
    cancel: string
    namePlaceholder: string
    emailPlaceholder: string
    subjectPlaceholder: string
    messagePlaceholder: string
  }
  qr: {
    label: string
    message: string
    alt: string
  }
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      languages: 'Langues',
      coreSkills: 'Competences cles',
      openToWork: 'Ouvert à un poste',
      contact: '✉ Me contacter',
      follow: 'Follow',
      followers: 'followers',
      following: 'following',
      contributions: 'contributions',
      loading: 'Chargement...',
      noData: 'Aucune donnee a afficher.',
    },
    sidebar: {
      seekingLabel: 'À la recherche d\'un poste',
      awards: 'Récompenses',
      interests: 'Centres d\'intérêt',
    },
    tabs: {
      overview: 'Aperçu',
      formations: 'Formations',
      personalProjects: 'Projets persos',
    },
    sections: {
      uiUxCulture: '🎨 Culture UI/UX',
      skills: 'Compétences',
      formation: 'Formation',
      timeline: 'Expérience',
      contributions: 'Contribution',
      about: 'A propos',
      professionalExperience: 'Experiences professionnelles',
    },
    toolbar: {
      print: 'Imprimer',
      exportWord: 'Exporter Word',
    },
    queryErrors: {
      profile: 'Impossible de charger le profil.',
      partialData: 'Certaines donnees sont indisponibles pour le moment.',
      experiences: 'Impossible de charger les experiences.',
      skills: 'Impossible de charger les competences.',
      formation: 'Impossible de charger les formations.',
      personalProjects: 'Impossible de charger les projets personnels.',
    },
    formationControls: {
      sortBy: 'Trier par',
      sortDate: 'Date (plus recent)',
      sortName: 'Nom (A-Z)',
      types: 'Types',
      training: 'formation',
      degree: 'diplome',
      personalProject: 'projet perso',
      empty: 'Aucun element a afficher avec les filtres actuels.',
    },
    mission: {
      current: 'actuel',
      openDetails: 'Ouvrir le detail de la mission',
      expand: 'Agrandir',
      close: 'Fermer',
      tasksPreviewTitle: 'Actions cles',
      tasksTitle: 'Exemple de taches effectuees',
      retrospective: 'Retrospective',
    },
    personalModal: {
      openDetails: 'Ouvrir le detail du projet',
      highlightsTitle: 'Points cles',
    },
    contactModal: {
      title: 'Me contacter',
      wip: '🚧 Fonctionnalite en developpement',
      name: 'Nom',
      email: 'Email',
      subject: 'Sujet',
      message: 'Message',
      send: 'Envoyer',
      cancel: 'Annuler',
      namePlaceholder: 'Votre nom',
      emailPlaceholder: 'votre@email.com',
      subjectPlaceholder: 'Sujet du message',
      messagePlaceholder: 'Votre message...',
    },
    qr: {
      label: 'Version complete du CV',
      message: 'QR code vers une version plus complete du CV en ligne.',
      alt: 'QR code du CV en ligne',
    },
  },
  en: {
    common: {
      languages: 'Languages',
      coreSkills: 'Core Skills',
      openToWork: 'Open to work',
      contact: '✉ Contact me',
      follow: 'Follow',
      followers: 'followers',
      following: 'following',
      contributions: 'contributions',
      loading: 'Loading...',
      noData: 'No data to display.',
    },
    sidebar: {
      seekingLabel: 'Looking for a role',
      awards: 'Awards',
      interests: 'Interests',
    },
    tabs: {
      overview: 'Overview',
      formations: 'Trainings',
      personalProjects: 'Side Projects',
    },
    sections: {
      uiUxCulture: '🎨 UI/UX Culture',
      skills: 'Skills',
      formation: 'Education',
      timeline: 'Experience',
      contributions: 'Contributions',
      about: 'About',
      professionalExperience: 'Professional Experience',
    },
    toolbar: {
      print: 'Print',
      exportWord: 'Export Word',
    },
    queryErrors: {
      profile: 'Unable to load profile data.',
      partialData: 'Some data is currently unavailable.',
      experiences: 'Unable to load experiences.',
      skills: 'Unable to load skills.',
      formation: 'Unable to load education entries.',
      personalProjects: 'Unable to load personal projects.',
    },
    formationControls: {
      sortBy: 'Sort by',
      sortDate: 'Date (newest)',
      sortName: 'Name (A-Z)',
      types: 'Types',
      training: 'training',
      degree: 'degree',
      personalProject: 'personal project',
      empty: 'No item to display with the current filters.',
    },
    mission: {
      current: 'current',
      openDetails: 'Open mission details',
      expand: 'Expand',
      close: 'Close',
      tasksPreviewTitle: 'Key actions',
      tasksTitle: 'Tasks Performed On The Project',
      retrospective: 'Retrospective',
    },
    personalModal: {
      openDetails: 'Open project details',
      highlightsTitle: 'Highlights',
    },
    contactModal: {
      title: 'Contact me',
      wip: '🚧 Feature in development',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send',
      cancel: 'Cancel',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      subjectPlaceholder: 'Message subject',
      messagePlaceholder: 'Your message...',
    },
    qr: {
      label: 'Extended Resume',
      message: 'QR code to a more complete online resume version.',
      alt: 'QR code for online resume',
    },
  },
}

export const getTranslations = (lang: Language): Translations => translations[lang]
