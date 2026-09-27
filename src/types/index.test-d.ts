import type { Mission } from './index'

declare const missionBase: Omit<Mission, 'type' | 'parentMissionId'>

// @ts-expect-error un projet rattaché exige parentMissionId
const invalidAttachedProject: Mission = { ...missionBase, type: 'projet' }

// @ts-expect-error une mission principale refuse parentMissionId
const invalidProfessionalMission: Mission = { ...missionBase, type: 'mission', parentMissionId: 31 }

void invalidAttachedProject
void invalidProfessionalMission
