import { BASE_URL } from '../config'
import {
  contactResponseSchema,
  formationsSchema,
  personalProjectsSchema,
  profileSchema,
  skillsSchema,
  experiencesSchema,
} from '../schemas'
import { fetchJson } from './fetchJson'
import type { Experience, Formation, PersonalProject, Profile, Skill } from '../../types'

export const profileService = {
  getProfile: (signal?: AbortSignal): Promise<Profile> =>
    fetchJson(`${BASE_URL}/profile`, profileSchema, { signal }),
}

export const experienceService = {
  getExperiences: (signal?: AbortSignal): Promise<Experience[]> =>
    fetchJson(`${BASE_URL}/experiences`, experiencesSchema, { signal }),
}

export const skillService = {
  getSkills: (signal?: AbortSignal): Promise<Skill[]> =>
    fetchJson(`${BASE_URL}/skills`, skillsSchema, { signal }),
}

export const formationService = {
  getFormation: (signal?: AbortSignal): Promise<Formation[]> =>
    fetchJson(`${BASE_URL}/formation`, formationsSchema, { signal }),
}

export const personalProjectService = {
  getPersonalProjects: (signal?: AbortSignal): Promise<PersonalProject[]> =>
    fetchJson(`${BASE_URL}/personal-projects`, personalProjectsSchema, { signal }),
}

export const contactService = {
  sendMessage: async (data: { name: string; email: string; message: string }): Promise<{ success: boolean }> => {
    return fetchJson(`${BASE_URL}/contact`, contactResponseSchema, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  },
}
