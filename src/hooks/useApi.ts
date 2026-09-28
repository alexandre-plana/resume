import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../store/appStore'
import { getMockDataLocale } from '../api/mockDataLocales'
import { api } from '../api'
import { localizeFormations, localizeSkills } from '../api/localizeData'

export const useProfile = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  const query = useQuery({
    queryKey: ['profile'],
    queryFn: ({ signal }) => api.profileService.getProfile(signal),
  })
  const data = useMemo(() => {
    if (!query.data) return undefined

    return {
      ...query.data,
      title: dataLocales.profile.title,
      subtitle: dataLocales.profile.subtitle,
      bio: dataLocales.profile.bio,
      company: dataLocales.profile.company,
      langs: dataLocales.profile.langs,
      interests: dataLocales.profile.interests,
    }
  }, [dataLocales, query.data])

  return { ...query, data }
}

export const useExperiences = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  const query = useQuery({
    queryKey: ['experiences'],
    queryFn: ({ signal }) => api.experienceService.getExperiences(signal),
  })
  const data = useMemo(() => {
    if (!query.data) return undefined

    return query.data.map((exp) => {
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
  }, [dataLocales, query.data])

  return { ...query, data }
}

export const useSkills = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  const query = useQuery({
    queryKey: ['skills'],
    queryFn: ({ signal }) => api.skillService.getSkills(signal),
  })
  const data = useMemo(
    () => (query.data ? localizeSkills(query.data, dataLocales.skills) : undefined),
    [dataLocales, query.data],
  )

  return { ...query, data }
}

export const useFormation = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  const query = useQuery({
    queryKey: ['formation'],
    queryFn: ({ signal }) => api.formationService.getFormation(signal),
  })
  const data = useMemo(
    () => (query.data ? localizeFormations(query.data, dataLocales.formation) : undefined),
    [dataLocales, query.data],
  )

  return { ...query, data }
}

export const usePersonalProjects = () => {
  const language = useAppStore((state) => state.language)
  const dataLocales = getMockDataLocale(language)

  const query = useQuery({
    queryKey: ['personalProjects'],
    queryFn: ({ signal }) => api.personalProjectService.getPersonalProjects(signal),
  })
  const data = useMemo(() => {
    if (!query.data) return undefined

    return query.data.map((project) => ({
      ...project,
      kind: dataLocales.personalProjects[project.id]?.kind || project.kind,
      role: dataLocales.personalProjects[project.id]?.role || project.role,
      desc: dataLocales.personalProjects[project.id]?.desc || project.desc,
      details: dataLocales.personalProjects[project.id]?.details || project.details,
      highlights: dataLocales.personalProjects[project.id]?.highlights || project.highlights,
      period: dataLocales.personalProjects[project.id]?.period || project.period,
      status: dataLocales.personalProjects[project.id]?.status || project.status,
      images: dataLocales.personalProjects[project.id]?.images || project.images,
    }))
  }, [dataLocales, query.data])

  return { ...query, data }
}

export const useContact = () => {
  return {
    sendMessage: async (data: { name: string; email: string; message: string }) => {
      return api.contactService.sendMessage(data)
    },
  }
}
