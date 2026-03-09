import { BASE_URL } from '../config'
import { Profile, Experience, Skill, Formation, Activity, Project } from '../../types'

export const profileService = {
  getProfile: async (): Promise<Profile> => {
    const response = await fetch(`${BASE_URL}/profile`)
    if (!response.ok) throw new Error('Failed to fetch profile')
    return response.json()
  },
}

export const experienceService = {
  getExperiences: async (): Promise<Experience[]> => {
    const response = await fetch(`${BASE_URL}/experiences`)
    if (!response.ok) throw new Error('Failed to fetch experiences')
    return response.json()
  },
}

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const response = await fetch(`${BASE_URL}/projects`)
    if (!response.ok) throw new Error('Failed to fetch projects')
    return response.json()
  },
}

export const skillService = {
  getSkills: async (): Promise<Skill[]> => {
    const response = await fetch(`${BASE_URL}/skills`)
    if (!response.ok) throw new Error('Failed to fetch skills')
    return response.json()
  },
}

export const formationService = {
  getFormation: async (): Promise<Formation[]> => {
    const response = await fetch(`${BASE_URL}/formation`)
    if (!response.ok) throw new Error('Failed to fetch formation')
    return response.json()
  },
}

export const activityService = {
  getActivity: async (): Promise<Activity[]> => {
    const response = await fetch(`${BASE_URL}/activity`)
    if (!response.ok) throw new Error('Failed to fetch activity')
    return response.json()
  },
}

export const contactService = {
  sendMessage: async (data: { name: string; email: string; message: string }): Promise<{ success: boolean }> => {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to send message')
    return response.json()
  },
}
