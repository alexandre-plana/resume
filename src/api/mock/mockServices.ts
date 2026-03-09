import { mockProfile, mockExperiences, mockSkills, mockFormation, mockActivity, mockProjects } from '../mockData'
import { Profile, Experience, Skill, Formation, Activity, Project } from '../../types'

export const mockProfileService = {
  getProfile: async (): Promise<Profile> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockProfile
  },
}

export const mockExperienceService = {
  getExperiences: async (): Promise<Experience[]> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockExperiences
  },
}

export const mockProjectService = {
  getProjects: async (): Promise<Project[]> => {
    await new Promise(resolve => setTimeout(resolve, 350))
    return mockProjects
  },
}

export const mockSkillService = {
  getSkills: async (): Promise<Skill[]> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockSkills
  },
}

export const mockFormationService = {
  getFormation: async (): Promise<Formation[]> => {
    await new Promise(resolve => setTimeout(resolve, 250))
    return mockFormation
  },
}

export const mockActivityService = {
  getActivity: async (): Promise<Activity[]> => {
    await new Promise(resolve => setTimeout(resolve, 350))
    return mockActivity
  },
}

export const mockContactService = {
  sendMessage: async (data: { name: string; email: string; message: string }): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Message sent:', data)
    return { success: true }
  },
}
