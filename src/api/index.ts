import { USE_MOCK } from './config'
import * as mockSvc from './mock/mockServices'
import * as realSvc from './services/apiServices'

export const api = USE_MOCK
  ? {
      profileService: mockSvc.mockProfileService,
      experienceService: mockSvc.mockExperienceService,
      projectService: mockSvc.mockProjectService,
      skillService: mockSvc.mockSkillService,
      formationService: mockSvc.mockFormationService,
      activityService: mockSvc.mockActivityService,
      personalProjectService: mockSvc.mockPersonalProjectService,
      contactService: mockSvc.mockContactService,
    }
  : {
      profileService: realSvc.profileService,
      experienceService: realSvc.experienceService,
      projectService: realSvc.projectService,
      skillService: realSvc.skillService,
      formationService: realSvc.formationService,
      activityService: realSvc.activityService,
      personalProjectService: realSvc.personalProjectService,
      contactService: realSvc.contactService,
    }
