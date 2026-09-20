import { USE_MOCK } from './config'
import * as mockSvc from './mock/mockServices'
import * as realSvc from './services/apiServices'

export const api = USE_MOCK
  ? {
      profileService: mockSvc.mockProfileService,
      experienceService: mockSvc.mockExperienceService,
      skillService: mockSvc.mockSkillService,
      formationService: mockSvc.mockFormationService,
      personalProjectService: mockSvc.mockPersonalProjectService,
      contactService: mockSvc.mockContactService,
    }
  : {
      profileService: realSvc.profileService,
      experienceService: realSvc.experienceService,
      skillService: realSvc.skillService,
      formationService: realSvc.formationService,
      personalProjectService: realSvc.personalProjectService,
      contactService: realSvc.contactService,
    }
