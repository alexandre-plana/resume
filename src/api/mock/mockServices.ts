import { mockProfile, mockExperiences, mockSkills, mockFormation, mockPersonalProjects } from '../mockData'
import { Profile, Experience, Skill, Formation, PersonalProject } from '../../types'

export const mockProfileService = {
  getProfile: async (signal?: AbortSignal): Promise<Profile> => {
    void signal
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockProfile
  },
}

export const mockExperienceService = {
  getExperiences: async (signal?: AbortSignal): Promise<Experience[]> => {
    void signal
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockExperiences
  },
}

export const mockSkillService = {
  getSkills: async (signal?: AbortSignal): Promise<Skill[]> => {
    void signal
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockSkills
  },
}

export const mockFormationService = {
  getFormation: async (signal?: AbortSignal): Promise<Formation[]> => {
    void signal
    await new Promise(resolve => setTimeout(resolve, 250))
    return mockFormation
  },
}

export const mockPersonalProjectService = {
  getPersonalProjects: async (signal?: AbortSignal): Promise<PersonalProject[]> => {
    void signal
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockPersonalProjects
  },
}

export const mockContactService = {
  sendMessage: async (data: { name: string; email: string; message: string }): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    console.log('Message sent:', data)
    return { success: true }
  },
}
