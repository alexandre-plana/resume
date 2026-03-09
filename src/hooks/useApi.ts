import { useQuery } from '@tanstack/react-query'
import { api } from '../api'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => api.profileService.getProfile(),
  })
}

export const useExperiences = () => {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: () => api.experienceService.getExperiences(),
  })
}

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => api.skillService.getSkills(),
  })
}

export const useFormation = () => {
  return useQuery({
    queryKey: ['formation'],
    queryFn: () => api.formationService.getFormation(),
  })
}

export const useActivity = () => {
  return useQuery({
    queryKey: ['activity'],
    queryFn: () => api.activityService.getActivity(),
  })
}

export const useContact = () => {
  return {
    sendMessage: async (data: { name: string; email: string; message: string }) => {
      return api.contactService.sendMessage(data)
    },
  }
}
