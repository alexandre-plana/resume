export type Language = 'fr' | 'en'

export interface Translations {
  common: {
    languages: string
    openToWork: string
    contact: string
    follow: string
    followers: string
    following: string
    contributions: string
  }
  sidebar: {
    seekingLabel: string
    awards: string
    interests: string
  }
  tabs: {
    overview: string
    projects: string
    formations: string
  }
  sections: {
    uiUxCulture: string
    skills: string
    formation: string
    activity: string
    timeline: string
    contributions: string
  }
  activity: {
    follower: string
    starred: string
    followed: string
  }
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      languages: 'Langues',
      openToWork: 'Ouvert à un poste',
      contact: '✉ Me contacter',
      follow: 'Follow',
      followers: 'followers',
      following: 'following',
      contributions: 'contributions',
    },
    sidebar: {
      seekingLabel: 'À la recherche d\'un poste',
      awards: 'Récompenses',
      interests: 'Centres d\'intérêt',
    },
    tabs: {
      overview: 'Aperçu',
      projects: 'Projets professionnels',
      formations: 'Formations',
    },
    sections: {
      uiUxCulture: '🎨 Culture UI/UX',
      skills: 'Compétences',
      formation: 'Formation',
      activity: 'Activité',
      timeline: 'Expérience',
      contributions: 'Contribution',
    },
    activity: {
      follower: 'a commencé à suivre',
      starred: 'a mis en étoile',
      followed: 'a suivi',
    },
  },
  en: {
    common: {
      languages: 'Languages',
      openToWork: 'Open to work',
      contact: '✉ Contact me',
      follow: 'Follow',
      followers: 'followers',
      following: 'following',
      contributions: 'contributions',
    },
    sidebar: {
      seekingLabel: 'Looking for a role',
      awards: 'Awards',
      interests: 'Interests',
    },
    tabs: {
      overview: 'Overview',
      projects: 'Professional Projects',
      formations: 'Trainings',
    },
    sections: {
      uiUxCulture: '🎨 UI/UX Culture',
      skills: 'Skills',
      formation: 'Education',
      activity: 'Activity',
      timeline: 'Experience',
      contributions: 'Contributions',
    },
    activity: {
      follower: 'started following',
      starred: 'starred',
      followed: 'followed',
    },
  },
}

export const getTranslations = (lang: Language): Translations => translations[lang]
