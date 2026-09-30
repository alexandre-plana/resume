import { z } from 'zod'
import type { Experience, Formation, Mission, PersonalProject, Profile, Skill } from '../types'

const localizedLevelSchema = z.object({ label: z.string(), level: z.string() })
const relatedProjectSchema = z.object({ id: z.number().int(), name: z.string() })

export const profileSchema = z.object({
  name: z.string(),
  handle: z.string(),
  title: z.string(),
  subtitle: z.string(),
  bio: z.string(),
  company: z.string(),
  location: z.string(),
  email: z.string().email(),
  phone: z.string(),
  langs: z.array(localizedLevelSchema),
  interests: z.array(z.string()),
}) satisfies z.ZodType<Profile>

const missionBaseSchema = z.object({
  id: z.number().int(),
  featured: z.boolean(),
  name: z.string(),
  badge: z.string(),
  period: z.string(),
  context: z.string(),
  desc: z.string(),
  cardSummary: z.string().optional(),
  tasks: z.array(z.string()).optional(),
  priorityActionIndexes: z.array(z.number().int().nonnegative()).optional(),
  retrospective: z.string().optional(),
  tags: z.array(z.string()),
  isCurrent: z.boolean().optional(),
  relatedPersonalProject: relatedProjectSchema.optional(),
})

export const missionSchema = z.discriminatedUnion('type', [
  missionBaseSchema.extend({ type: z.literal('mission') }),
  missionBaseSchema.extend({ type: z.literal('projet'), parentMissionId: z.number().int() }),
]) satisfies z.ZodType<Mission>

export const experienceSchema = z.object({
  id: z.number().int(),
  company: z.string(),
  employer: z.string(),
  period: z.string(),
  missions: z.array(missionSchema),
}) satisfies z.ZodType<Experience>

export const skillSchema = z.object({
  id: z.string().min(1),
  cat: z.string(),
  featured: z.boolean(),
  tags: z.array(z.object({ l: z.string(), k: z.string() })),
}) satisfies z.ZodType<Skill>

export const formationSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['training', 'degree']),
  label: z.string(),
  title: z.string(),
  sub: z.string(),
  meta: z.string(),
}) satisfies z.ZodType<Formation>

export const personalProjectSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  kind: z.string(),
  role: z.string(),
  desc: z.string(),
  details: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  stack: z.array(z.string()),
  period: z.string(),
  status: z.string().optional(),
  images: z.array(z.object({ src: z.string().min(1), alt: z.string().min(1) })).optional(),
}) satisfies z.ZodType<PersonalProject>

export const experiencesSchema = z.array(experienceSchema)
export const skillsSchema = z.array(skillSchema)
export const formationsSchema = z.array(formationSchema)
export const personalProjectsSchema = z.array(personalProjectSchema)
