import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../store/appStore'
import { getMockDataLocale } from '../api/mockDataLocales'
import { api } from '../api'

export const useProfile = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  return useQuery({
    queryKey: ['profile', language],
    queryFn: async () => {
      const profile = await api.profileService.getProfile()
      return {
        ...profile,
        title: dataLocales.profile.title,
        subtitle: dataLocales.profile.subtitle,
        bio: dataLocales.profile.bio,
        company: dataLocales.profile.company,
        interests: dataLocales.profile.interests,
      }
    },
  })
}

export const useExperiences = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  return useQuery({
    queryKey: ['experiences', language],
    queryFn: async () => {
      const experiences = await api.experienceService.getExperiences()
      return experiences.map((exp) => {
        const expLocale = dataLocales.experiences[exp.id.toString()]
        return {
          ...exp,
          company: expLocale?.company || exp.company,
          employer: expLocale?.employer || exp.employer,
          missions: exp.missions.map((mission) => {
            const missionLocale = expLocale?.missions[mission.id.toString()]
            const baseMetrics = mission.metrics ?? []
            const localeMetrics = missionLocale?.metrics ?? baseMetrics
            return {
              ...mission,
              badge: missionLocale?.badge || mission.badge,
              context: missionLocale?.context || mission.context,
              desc: missionLocale?.desc || mission.desc,
              cardSummary: missionLocale?.cardSummary || mission.cardSummary,
              tasks: missionLocale?.tasks || mission.tasks,
              retrospective: missionLocale?.retrospective || mission.retrospective,
              metrics: localeMetrics.map((m, idx) => ({
                ...(baseMetrics[idx] || {}),
                label: m.label,
              })),
            }
          }),
        }
      })
    },
  })
}

export const useSkills = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  return useQuery({
    queryKey: ['skills', language],
    queryFn: async () => {
      const skills = await api.skillService.getSkills()
      return skills.map((skill, idx) => ({
        ...skill,
        cat: dataLocales.skills[idx]?.cat || skill.cat,
      }))
    },
  })
}

export const useFormation = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  return useQuery({
    queryKey: ['formation', language],
    queryFn: async () => {
      const formation = await api.formationService.getFormation()
      return formation.map((form, idx) => ({
        ...form,
        label: dataLocales.formation[idx]?.label || form.label,
        title: dataLocales.formation[idx]?.title || form.title,
        sub: dataLocales.formation[idx]?.sub || form.sub,
        meta: dataLocales.formation[idx]?.meta || form.meta,
      }))
    },
  })
}

export const usePersonalProjects = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  return useQuery({
    queryKey: ['personalProjects', language],
    queryFn: async () => {
      const personalProjects = await api.personalProjectService.getPersonalProjects()
      return personalProjects.map((project) => ({
        ...project,
        kind: dataLocales.personalProjects[project.id]?.kind || project.kind,
        role: dataLocales.personalProjects[project.id]?.role || project.role,
        desc: dataLocales.personalProjects[project.id]?.desc || project.desc,
        details: dataLocales.personalProjects[project.id]?.details || project.details,
        highlights: dataLocales.personalProjects[project.id]?.highlights || project.highlights,
        period: dataLocales.personalProjects[project.id]?.period || project.period,
        status: dataLocales.personalProjects[project.id]?.status || project.status,
      }))
    },
  })
}

export const useContact = () => {
  return {
    sendMessage: async (data: { name: string; email: string; message: string }) => {
      return api.contactService.sendMessage(data)
    },
  }
}
