# Code Review Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger les défauts fonctionnels, d’accessibilité et de performance relevés pendant la revue, puis réduire les principales dettes structurelles sans réécrire l’application.

**Architecture:** Conserver React, Zustand et TanStack Query, mais séparer les responsabilités aujourd’hui concentrées dans `App.tsx` et `useApi.ts`. Introduire une infrastructure de tests légère, des fonctions pures pour la navigation et la localisation, un composant de dialogue accessible partagé et une vue d’impression indépendante de l’onglet affiché à l’écran.

**Tech Stack:** React 18, TypeScript 6, Vite 8, Zustand 4, TanStack Query 5, Vitest, Testing Library, jsdom, Zod, CSS Modules.

**Spec:** `docs/superpowers/specs/2026-09-27-code-review-remediation-design.md`

## Global Constraints

- Conserver Node.js `^20.19.0 || >=22.12.0` et npm `>=10.0.0`.
- Conserver le chemin GitHub Pages `/resume/`.
- Préserver les contenus français et anglais et leur changement à chaud.
- L’impression doit toujours produire le CV professionnel, quel que soit l’onglet affiché avant l’impression.
- Les parcours principaux doivent fonctionner au clavier et avec un lecteur d’écran.
- Le module `docx` ne doit plus appartenir au chunk JavaScript initial de production.
- Les données reçues de l’API distante doivent être validées avant d’entrer dans l’application.
- Les traductions de compétences et de formations doivent être associées par identifiant stable, jamais par position de tableau.
- La langue ne doit pas faire partie des clés React Query des données distantes.
- Les variantes métier doivent être représentées par des unions littérales, pas par `string` ou par l’analyse d’un libellé traduit.
- Les états asynchrones transmis aux composants doivent former une union discriminée, pas plusieurs booléens indépendants.
- Ne pas réactiver le formulaire de contact incomplet : supprimer le code mort correspondant.
- Chaque tâche suit un cycle test en échec, correction minimale, test réussi, puis commit dédié.

## Review Focus

- Impression lancée depuis chacun des trois onglets : le parcours professionnel et le QR code doivent rester présents.
- Navigation clavier : Tab, Entrée, Espace, flèches, Échap et retour du focus doivent conserver un ordre prévisible.
- Fragment valide, absent ou mal formé : aucune exception CSS et aucune sélection de projet arbitraire.
- API réordonnée, partielle ou mal formée : localisation correcte par identifiant et erreur contrôlée en cas de schéma invalide.
- Changement répété FR/EN : mise à jour immédiate du contenu sans nouvel appel réseau.
- Build de production : aucun marqueur OOXML de `docx` dans le chunk initial et aucun fichier suivi par Git modifié par la compilation.

---

### Task 1: Installer le socle de tests et stabiliser les artefacts TypeScript

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Modify: `tsconfig.node.json`
- Modify: `.gitignore`
- Create: `src/test/setup.ts`
- Create: `src/test/smoke.test.tsx`
- Delete: `vite.config.js`
- Delete: `vite.config.d.ts`
- Delete: `tsconfig.tsbuildinfo`
- Delete: `tsconfig.node.tsbuildinfo`

**Interfaces:**
- Consumes: configuration Vite et TypeScript actuelle.
- Produces: commandes `npm test`, `npm run test:watch` et environnement jsdom partagé par les tâches suivantes.

- [ ] **Step 1: Ajouter un test sentinelle avant d’installer le runner**

```tsx
// src/test/smoke.test.tsx
import { describe, expect, it } from 'vitest'

describe('test environment', () => {
  it('provides a DOM', () => {
    const element = document.createElement('div')
    element.textContent = 'resume'
    expect(element).toHaveTextContent('resume')
  })
})
```

- [ ] **Step 2: Vérifier que la commande de test est absente**

Run: `npm test`

Expected: FAIL avec l’erreur npm indiquant que le script `test` n’existe pas.

- [ ] **Step 3: Installer les dépendances de test**

Run: `npm install --save-dev vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom`

Expected: `package.json` et `package-lock.json` contiennent les cinq dépendances de développement.

- [ ] **Step 4: Déclarer les scripts et la configuration Vitest**

Ajouter dans `package.json` :

```json
"test": "vitest run",
"test:watch": "vitest"
```

Remplacer l’import de `defineConfig` dans `vite.config.ts` et compléter la configuration :

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/resume/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    restoreMocks: true,
  },
  server: {
    port: 5173,
    open: true,
  },
})
```

Créer `src/test/setup.ts` :

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Déplacer les informations incrémentales hors du dépôt**

Compléter `tsconfig.node.json` :

```json
{
  "compilerOptions": {
    "composite": true,
    "noEmit": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

Ajouter dans `.gitignore` :

```gitignore
*.tsbuildinfo
vite.config.js
vite.config.d.ts
```

Retirer de Git les quatre artefacts générés listés dans la section Files.

- [ ] **Step 6: Vérifier le socle et la propreté du dépôt**

Run: `npm test && npm run lint && npm run build && git status --short`

Expected: un test réussi, lint et build réussis; après prise en compte des fichiers volontairement modifiés par cette tâche, aucune modification supplémentaire créée par le build.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.node.json .gitignore src/test vite.config.js vite.config.d.ts tsconfig.tsbuildinfo tsconfig.node.tsbuildinfo
git commit -m "test: add frontend test harness"
```

---

### Task 2: Renforcer les types métier et découpler cache et localisation

**Files:**
- Modify: `src/types/index.ts`
- Modify: `src/api/mockData.ts`
- Modify: `src/api/mockDataLocales.ts`
- Create: `src/api/localizeData.ts`
- Create: `src/api/localizeData.test.ts`
- Modify: `src/hooks/useApi.ts`
- Modify: `src/components/tabs/FormationsTab.tsx`
- Create: `src/types/index.test-d.ts`

**Interfaces:**
- Consumes: `Skill`, `Formation`, `LocalizedMockData` et les données locales existantes.
- Produces: `FormationKind`, union discriminée `Mission`, fonctions de localisation fondées sur des identifiants stables et cache React Query indépendant de la langue.

- [ ] **Step 1: Écrire les tests qui reproduisent l’erreur d’association par index**

```ts
// src/api/localizeData.test.ts
import { describe, expect, it } from 'vitest'
import { localizeFormations, localizeSkills } from './localizeData'

describe('localizeSkills', () => {
  it('uses the stable id when the API changes the order', () => {
    const skills = [
      { id: 'backend', cat: 'Back-end', featured: false, tags: [] },
      { id: 'frontend', cat: 'Front-end', featured: true, tags: [] },
    ]
    const locale = {
      frontend: { cat: 'Interface' },
      backend: { cat: 'Services' },
    }

    expect(localizeSkills(skills, locale).map((skill) => skill.cat)).toEqual(['Services', 'Interface'])
  })

  it('keeps the source label when a translation is missing', () => {
    const skills = [{ id: 'tools', cat: 'Tools', featured: false, tags: [] }]
    expect(localizeSkills(skills, {})).toEqual(skills)
  })
})

describe('localizeFormations', () => {
  it('localizes a reordered formation list by id', () => {
    const formations = [
      { id: 'degree', kind: 'degree' as const, label: 'Degree', title: 'A', sub: '2020', meta: 'A' },
      { id: 'training', kind: 'training' as const, label: 'Training', title: 'B', sub: '2024', meta: 'B' },
    ]
    const locale = {
      training: { label: 'Formation', title: 'B FR', sub: '2024', meta: 'B FR' },
      degree: { label: 'Diplôme', title: 'A FR', sub: '2020', meta: 'A FR' },
    }

    expect(localizeFormations(formations, locale).map((item) => item.title)).toEqual(['A FR', 'B FR'])
  })
})
```

- [ ] **Step 2: Exécuter le test et constater l’absence des fonctions**

Run: `npm test -- src/api/localizeData.test.ts`

Expected: FAIL car `localizeData.ts` n’existe pas.

- [ ] **Step 3: Ajouter les identifiants et variantes métier aux types**

```ts
export type FormationKind = 'training' | 'degree'

export interface Skill {
  id: string
  cat: string
  featured: boolean
  tags: { l: string; k: string }[]
}

export interface Formation {
  id: string
  kind: FormationKind
  label: string
  title: string
  sub: string
  meta: string
}

interface MissionBase {
  id: number
  featured: boolean
  name: string
  badge: string
  period: string
  context: string
  desc: string
  cardSummary?: string
  tasks?: string[]
  priorityActionIndexes?: number[]
  retrospective?: string
  tags: string[]
  isCurrent?: boolean
  relatedPersonalProject?: { id: number; name: string }
  metrics?: { label: string }[]
}

export interface ProfessionalMission extends MissionBase {
  type: 'mission'
  parentMissionId?: never
}

export interface AttachedProject extends MissionBase {
  type: 'projet'
  parentMissionId: number
}

export type Mission = ProfessionalMission | AttachedProject
```

Utiliser des identifiants sémantiques et identiques dans les deux langues, par exemple `frontend`, `backend`, `tools`, `degree-web`, `training-ux`. Ajouter `kind: 'training'` ou `kind: 'degree'` à chaque formation. Supprimer `getFormationKind` : le filtrage et le choix d’icône lisent directement `formation.kind`.

Créer `src/types/index.test-d.ts` avec ces assertions négatives, vérifiées par `tsc -b` :

```ts
import type { Mission } from './index'

declare const missionBase: Omit<Mission, 'type' | 'parentMissionId'>

// @ts-expect-error un projet rattaché exige parentMissionId
const invalidAttachedProject: Mission = { ...missionBase, type: 'projet' }

// @ts-expect-error une mission principale refuse parentMissionId
const invalidProfessionalMission: Mission = { ...missionBase, type: 'mission', parentMissionId: 31 }

void invalidAttachedProject
void invalidProfessionalMission
```

Transformer `LocalizedMockData.skills` et `LocalizedMockData.formation` en `Record<string, ...>`.

- [ ] **Step 4: Implémenter les fonctions pures de localisation**

```ts
import type { Formation, Skill } from '../types'

type LocalizedSkill = Pick<Skill, 'cat'>
type LocalizedFormation = Pick<Formation, 'label' | 'title' | 'sub' | 'meta'>

export const localizeSkills = (
  skills: Skill[],
  locale: Record<string, LocalizedSkill>,
): Skill[] => skills.map((skill) => ({ ...skill, ...locale[skill.id] }))

export const localizeFormations = (
  formations: Formation[],
  locale: Record<string, LocalizedFormation>,
): Formation[] => formations.map((formation) => ({ ...formation, ...locale[formation.id] }))
```

- [ ] **Step 5: Remplacer les fusions par index et séparer cache et traduction**

Utiliser les deux fonctions dans `useSkills` et `useFormation`; conserver les clés React fondées sur `id` dans les composants concernés.

Retirer `language` des cinq clés React Query : `['profile']`, `['experiences']`, `['skills']`, `['formation']`, `['personalProjects']`. Les `queryFn` retournent uniquement les données distantes. Chaque hook applique ensuite la traduction avec `useMemo`, à partir de `query.data`, `language` et du dictionnaire local. Le résultat traduit change avec la langue sans invalider le cache réseau.

Ajouter un test de hook qui rend `useSkills`, bascule le store de `fr` vers `en`, puis vérifie que `api.skillService.getSkills` a été appelé une seule fois et que la catégorie exposée par le hook a changé.

- [ ] **Step 6: Vérifier les cas réordonné et incomplet**

Run: `npm test -- src/api/localizeData.test.ts && npm run lint && npm run build`

Expected: tous les tests et contrôles réussissent; `rg "queryKey:.*language" src/hooks/useApi.ts` ne retourne aucune occurrence.

- [ ] **Step 7: Commit**

```bash
git add src/types src/api src/hooks/useApi.ts
git commit -m "refactor: localize resume data by stable ids"
```

---

### Task 3: Valider et annuler proprement les requêtes de l’API distante

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/api/schemas.ts`
- Create: `src/api/services/fetchJson.ts`
- Create: `src/api/services/fetchJson.test.ts`
- Modify: `src/api/services/apiServices.ts`
- Modify: `src/hooks/useApi.ts`

**Interfaces:**
- Consumes: interfaces de `src/types/index.ts` et `BASE_URL`.
- Produces: `fetchJson<T>(url: string, schema: ZodType<T>, init?: RequestInit): Promise<T>`; services acceptant `signal?: AbortSignal`.

- [ ] **Step 1: Écrire les tests du client HTTP**

```ts
import { afterEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { fetchJson } from './fetchJson'

const schema = z.object({ name: z.string() })

describe('fetchJson', () => {
  afterEach(() => vi.restoreAllMocks())

  it('rejects a successful response with an invalid payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ name: 42 }), { status: 200 }))
    await expect(fetchJson('/profile', schema)).rejects.toThrow('Invalid API response')
  })

  it('preserves the HTTP status in an error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('', { status: 503 }))
    await expect(fetchJson('/profile', schema)).rejects.toThrow('503')
  })

  it('passes the abort signal to fetch', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ name: 'Alex' })))
    const controller = new AbortController()
    await fetchJson('/profile', schema, { signal: controller.signal })
    expect(fetchMock).toHaveBeenCalledWith('/profile', expect.objectContaining({ signal: controller.signal }))
  })
})
```

- [ ] **Step 2: Vérifier l’échec avant implémentation**

Run: `npm test -- src/api/services/fetchJson.test.ts`

Expected: FAIL car `fetchJson` et Zod ne sont pas disponibles.

- [ ] **Step 3: Installer Zod et définir les schémas**

Run: `npm install zod`

Créer dans `schemas.ts` les schémas et leurs tableaux :

```ts
import { z } from 'zod'
import type { Experience, Formation, Mission, PersonalProject, Profile, Skill } from '../types'

const localizedLevelSchema = z.object({ label: z.string(), level: z.string() })
const metricSchema = z.object({ label: z.string() })
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
  metrics: z.array(metricSchema).optional(),
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
}) satisfies z.ZodType<PersonalProject>

export const experiencesSchema = z.array(experienceSchema)
export const skillsSchema = z.array(skillSchema)
export const formationsSchema = z.array(formationSchema)
export const personalProjectsSchema = z.array(personalProjectSchema)
```

- [ ] **Step 4: Implémenter le client HTTP commun**

```ts
import type { ZodType } from 'zod'

export const fetchJson = async <T>(url: string, schema: ZodType<T>, init: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  const parsed = schema.safeParse(await response.json())
  if (!parsed.success) {
    throw new Error(`Invalid API response: ${parsed.error.issues[0]?.message ?? 'unknown schema error'}`)
  }
  return parsed.data
}
```

- [ ] **Step 5: Dédupliquer les cinq services GET**

Chaque méthode suit cette signature :

```ts
getProfile: (signal?: AbortSignal): Promise<Profile> =>
  fetchJson(`${BASE_URL}/profile`, profileSchema, { signal })
```

Appliquer la même forme aux expériences, compétences, formations et projets personnels. Le POST de contact sera supprimé dans la tâche 8.

- [ ] **Step 6: Propager le signal TanStack Query**

Chaque `queryFn` reçoit `{ signal }` et transmet ce signal au service correspondant :

```ts
queryFn: async ({ signal }) => {
  const profile = await api.profileService.getProfile(signal)
  return localizeProfile(profile, dataLocales.profile)
}
```

- [ ] **Step 7: Vérifier erreurs, validation et annulation**

Run: `npm test -- src/api/services/fetchJson.test.ts && npm run lint && npm run build`

Expected: tests réussis et aucune duplication directe de `fetch(...); if (!response.ok)` dans `apiServices.ts`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json src/api src/hooks/useApi.ts
git commit -m "refactor: validate remote API responses"
```

---

### Task 4: Rendre les onglets, la langue et les liens profonds accessibles

**Files:**
- Create: `src/navigation/personalProjectHash.ts`
- Create: `src/navigation/personalProjectHash.test.ts`
- Modify: `src/components/Tabs.tsx`
- Create: `src/components/Tabs.test.tsx`
- Modify: `src/components/Toolbar.tsx`
- Modify: `src/App.tsx`
- Modify: `src/store/appStore.ts`
- Modify: `src/components/tabs/PersonalProjectsTab.tsx`

**Interfaces:**
- Consumes: `Tab`, `useAppStore`, hash navigateur.
- Produces: `parsePersonalProjectHash(hash: string): number | null`, onglets ARIA et synchronisation de `document.documentElement.lang`.

- [ ] **Step 1: Écrire les tests du parseur de fragment**

```ts
import { describe, expect, it } from 'vitest'
import { parsePersonalProjectHash } from './personalProjectHash'

describe('parsePersonalProjectHash', () => {
  it.each([
    ['#personal-project-4', 4],
    ['#personal-project-004', 4],
    ['', null],
    ['#personal-project-[', null],
    ['#personal-project-4-extra', null],
  ])('parses %s safely', (hash, expected) => {
    expect(parsePersonalProjectHash(hash)).toBe(expected)
  })
})
```

- [ ] **Step 2: Écrire le test clavier des onglets**

Rendre `Tabs` avec l’état `overview`, déplacer le focus par `ArrowRight`, activer l’onglet avec Entrée et vérifier `aria-selected="true"` sur Formations. Vérifier aussi que chaque onglet possède `role="tab"`, `id="tab-<id>"` et `aria-controls="panel-<id>"`.

- [ ] **Step 3: Exécuter les tests en échec**

Run: `npm test -- src/navigation/personalProjectHash.test.ts src/components/Tabs.test.tsx`

Expected: FAIL car le parseur n’existe pas et les onglets sont encore des `div`.

- [ ] **Step 4: Implémenter le parseur sûr**

```ts
const PERSONAL_PROJECT_HASH = /^#personal-project-(\d+)$/

export const parsePersonalProjectHash = (hash: string): number | null => {
  const match = PERSONAL_PROJECT_HASH.exec(hash)
  if (!match) return null
  const id = Number(match[1])
  return Number.isSafeInteger(id) ? id : null
}
```

Remplacer `querySelector(window.location.hash)` par `getElementById(`personal-project-${id}`)` après validation.

- [ ] **Step 5: Remplacer les onglets cliquables par des boutons ARIA**

Le conteneur reçoit `role="tablist"` et chaque élément devient :

```tsx
<button
  id={`tab-${tab.id}`}
  role="tab"
  type="button"
  aria-selected={activeTab === tab.id}
  aria-controls={`panel-${tab.id}`}
  tabIndex={activeTab === tab.id ? 0 : -1}
  onClick={() => setActiveTab(tab.id)}
  onKeyDown={handleTabKeyDown}
>
```

`handleTabKeyDown` gère `ArrowLeft`, `ArrowRight`, `Home` et `End`, met à jour l’onglet actif et focalise le bouton cible.

- [ ] **Step 6: Exposer les panneaux et la langue courante**

Dans `App.tsx`, chaque contenu d’onglet reçoit `id="panel-<id>"`, `role="tabpanel"`, `aria-labelledby="tab-<id>"` et `aria-hidden` cohérent avec l’état.

Ajouter :

```ts
useEffect(() => {
  document.documentElement.lang = language
}, [language])
```

Ajouter `aria-pressed={language === 'fr'}` et `aria-pressed={language === 'en'}` aux boutons de langue.

- [ ] **Step 7: Nettoyer le fragment en quittant les projets personnels**

Quand l’utilisateur sélectionne `overview` ou `formations`, supprimer uniquement un fragment reconnu par `parsePersonalProjectHash`, en conservant `pathname` et `search`. Ajouter un écouteur `hashchange` qui active l’onglet personnel lorsqu’un fragment valide est saisi ou suivi depuis l’extérieur.

- [ ] **Step 8: Vérifier navigation, fragment et langue**

Run: `npm test -- src/navigation/personalProjectHash.test.ts src/components/Tabs.test.tsx && npm run lint && npm run build`

Expected: tous les tests réussissent; aucun appel à `document.querySelector(window.location.hash)` ne subsiste.

- [ ] **Step 9: Commit**

```bash
git add src/navigation src/components/Tabs.tsx src/components/Tabs.test.tsx src/components/Toolbar.tsx src/components/tabs/PersonalProjectsTab.tsx src/App.tsx src/store/appStore.ts
git commit -m "fix: make resume navigation accessible"
```

---

### Task 5: Centraliser les fenêtres modales et leurs animations

**Files:**
- Create: `src/components/Dialog.tsx`
- Create: `src/components/Dialog.module.css`
- Create: `src/components/Dialog.test.tsx`
- Create: `src/utils/popoutAnimation.ts`
- Create: `src/utils/popoutAnimation.test.ts`
- Create: `src/components/MissionDialog.tsx`
- Create: `src/components/ProjectDialog.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/tabs/PersonalProjectsTab.tsx`
- Modify: `src/App.module.css`

**Interfaces:**
- Consumes: `Mission`, `PersonalProject`, classes visuelles existantes.
- Produces: `Dialog`, `getPopoutAnimation(sourceEl)`, `MissionDialog` et `ProjectDialog`.

- [ ] **Step 1: Écrire les tests d’accessibilité du dialogue**

Créer un harnais qui monte réellement le dialogue depuis son bouton d’ouverture :

```tsx
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog'

const DialogHarness = ({ onClosed = () => undefined }: { onClosed?: () => void }) => {
  const [open, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
    onClosed()
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open</button>
      {open && (
        <Dialog labelledBy="dialog-title" onClose={close}>
          <h2 id="dialog-title">Details</h2>
          <button type="button" data-dialog-initial-focus onClick={close}>Close</button>
          <button type="button">Last action</button>
        </Dialog>
      )}
    </>
  )
}

describe('Dialog', () => {
  it('moves focus inside and restores the opener', async () => {
    const user = userEvent.setup()
    render(<DialogHarness />)
    const opener = screen.getByRole('button', { name: 'Open' })
    await user.click(opener)
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(opener).toHaveFocus()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    const onClosed = vi.fn()
    render(<DialogHarness onClosed={onClosed} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.keyboard('{Escape}')
    expect(onClosed).toHaveBeenCalledOnce()
  })

  it('wraps focus in both directions', async () => {
    const user = userEvent.setup()
    render(<DialogHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.tab({ shift: true })
    expect(screen.getByRole('button', { name: 'Last action' })).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
  })

  it('does not close when its content is clicked', async () => {
    const user = userEvent.setup()
    const onClosed = vi.fn()
    render(<DialogHarness onClosed={onClosed} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('dialog'))
    expect(onClosed).not.toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Écrire le test de calcul d’animation**

Tester la valeur par défaut avec `null`, puis un rectangle connu pour vérifier `fromX`, `fromY` et le bornage de `fromScale` entre `0.42` et `0.98`.

- [ ] **Step 3: Vérifier les échecs avant extraction**

Run: `npm test -- src/components/Dialog.test.tsx src/utils/popoutAnimation.test.ts`

Expected: FAIL car les deux modules n’existent pas.

- [ ] **Step 4: Implémenter `Dialog`**

Signature :

```ts
interface DialogProps {
  labelledBy: string
  onClose: () => void
  children: ReactNode
  className?: string
  style?: CSSProperties
}
```

Le composant mémorise `document.activeElement`, focalise `[data-dialog-initial-focus]` ou le premier contrôle focusable, ferme sur Échap, piège Tab entre les éléments focusables, bloque le défilement de `body`, ferme au clic sur l’overlay et restitue le focus au démontage. L’overlay reçoit `data-testid="dialog-overlay"` pour permettre un test explicite de son clic.

- [ ] **Step 5: Déplacer le calcul d’animation dupliqué**

Extraire le calcul identique de `App.tsx` et `PersonalProjectsTab.tsx` dans `getPopoutAnimation`. La fonction ne lit `window.innerWidth` et `window.innerHeight` qu’une fois et renvoie le type partagé `PopoutAnimation`.

- [ ] **Step 6: Extraire le contenu des deux modales**

`MissionDialog` reçoit :

```ts
interface MissionDialogProps {
  popout: MissionPopout
  t: Translations
  onClose: () => void
  onOpenPersonalProject: (projectId: number) => void
}
```

`ProjectDialog` reçoit :

```ts
interface ProjectDialogProps {
  popout: ProjectPopout
  t: Translations
  onClose: () => void
}
```

Déplacer les styles inline du badge courant et des en-têtes dans des classes CSS nommées. `App.tsx` ne conserve que l’état et les callbacks d’ouverture. Dans `MissionDialog`, affecter `const relatedProject = popout.mission.relatedPersonalProject` avant le JSX puis utiliser cette constante dans le callback; supprimer l’assertion non nulle `relatedPersonalProject!`.

- [ ] **Step 7: Supprimer les deux écouteurs Échap et les overlays dupliqués**

Vérifier que `App.tsx` et `PersonalProjectsTab.tsx` n’installent plus chacun leur propre `window.addEventListener('keydown', ...)`.

- [ ] **Step 8: Vérifier focus, fermeture et compilation**

Run: `npm test -- src/components/Dialog.test.tsx src/utils/popoutAnimation.test.ts && npm run lint && npm run build`

Expected: tests réussis et une seule implémentation du comportement de dialogue.

- [ ] **Step 9: Commit**

```bash
git add src/components src/utils/popoutAnimation.ts src/utils/popoutAnimation.test.ts src/App.tsx src/App.module.css
git commit -m "refactor: share accessible dialog behavior"
```

---

### Task 6: Composer des panneaux à états discriminés et fiabiliser l’impression

**Files:**
- Create: `src/components/TabPanels.tsx`
- Create: `src/components/TabPanels.test.tsx`
- Create: `src/types/asyncViewState.ts`
- Create: `src/types/asyncViewState.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/App.module.css`
- Modify: `src/components/Toolbar.tsx`
- Modify: `src/components/tabs/OverviewTab.tsx`
- Modify: `src/components/tabs/FormationsTab.tsx`
- Modify: `src/components/tabs/PersonalProjectsTab.tsx`

**Interfaces:**
- Consumes: les trois composants d’onglet et `activeTab`.
- Produces: `AsyncViewState<T>`, trois variantes explicites, panneau Aperçu toujours monté, un seul panneau secondaire monté à la demande et Aperçu forcé visible à l’impression.

- [ ] **Step 1: Écrire le test de l’état asynchrone discriminé**

```ts
import { describe, expect, it } from 'vitest'
import { matchAsyncViewState, type AsyncViewState } from './asyncViewState'

describe('matchAsyncViewState', () => {
  it.each<[AsyncViewState<string>, string]>([
    [{ status: 'loading' }, 'loading'],
    [{ status: 'error', message: 'failed' }, 'failed'],
    [{ status: 'ready', data: 'resume' }, 'resume'],
  ])('handles every state', (state, expected) => {
    expect(matchAsyncViewState(state, {
      loading: () => 'loading',
      error: ({ message }) => message,
      ready: ({ data }) => data,
    })).toBe(expected)
  })
})
```

- [ ] **Step 2: Implémenter l’union et son matcher exhaustif**

```ts
export type AsyncViewState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; data: T }

type AsyncViewHandlers<T, R> = {
  [S in AsyncViewState<T>['status']]: (
    state: Extract<AsyncViewState<T>, { status: S }>,
  ) => R
}

export const matchAsyncViewState = <T, R>(
  state: AsyncViewState<T>,
  handlers: AsyncViewHandlers<T, R>,
): R => {
  switch (state.status) {
    case 'loading':
      return handlers.loading(state)
    case 'error':
      return handlers.error(state)
    case 'ready':
      return handlers.ready(state)
  }
}
```

Dans `App.tsx`, convertir chaque résultat TanStack Query en une seule valeur `AsyncViewState<T>`. Remplacer dans les trois composants les propriétés `data`, `isLoading`, `isError`, `errorMessage` par `state`. Chaque variante de l’union transporte uniquement les données qu’elle autorise.

- [ ] **Step 3: Écrire le test de rendu indépendant de l’onglet**

Le test rend `TabPanels` avec `activeTab="personal"`, puis vérifie :

```tsx
expect(screen.getByRole('tabpanel', { name: /projets/i })).toHaveAttribute('aria-hidden', 'false')
const overview = screen.getByRole('tabpanel', { name: /aperçu/i, hidden: true })
expect(overview).toBeInTheDocument()
expect(overview).toHaveClass('overviewPanel')
```

Ajouter un cas pour `activeTab="formations"` afin de garantir que la vue imprimable ne disparaît jamais.

- [ ] **Step 4: Exécuter les tests en échec**

Run: `npm test -- src/types/asyncViewState.test.ts src/components/TabPanels.test.tsx`

Expected: FAIL car `AsyncViewState` et `TabPanels` n’existent pas.

- [ ] **Step 5: Composer trois variantes explicites sans rendre deux panneaux secondaires cachés**

`TabPanels` compose `OverviewPanel`, `FormationsPanel` et `PersonalProjectsPanel` plutôt qu’un composant générique piloté par plusieurs booléens. Chaque variante rend son composant métier avec une unique propriété `state` et les identifiants ARIA de la tâche 4. `OverviewPanel` reste toujours monté et reçoit `styles.overviewPanel`; il est masqué à l’écran lorsqu’un autre onglet est actif. Seul `FormationsPanel` ou `PersonalProjectsPanel` correspondant à `activeTab` est monté. Aucun contenu secondaire inactif n’est conservé dans le DOM.

Ne pas réutiliser `.formationsSection` comme mécanisme global d’impression : ce nom décrit la mise en page interne, pas la visibilité d’un onglet.

- [ ] **Step 6: Définir explicitement les modes écran et impression**

```css
.tabPanel {
  display: none;
}

.tabPanelActive {
  display: block;
}

@media print {
  .tabPanel {
    display: none !important;
  }

  .overviewPanel {
    display: block !important;
  }
}
```

Le panneau Aperçu doit inclure l’expérience professionnelle et le QR code. Les contrôles interactifs et les modales restent masqués par les règles d’impression existantes.

- [ ] **Step 7: Garder `handlePrint` sans mutation de l’onglet**

`Toolbar` conserve un simple `window.print()`. Aucun changement d’état, double `requestAnimationFrame` ou restauration après `afterprint` n’est nécessaire.

- [ ] **Step 8: Vérifier les états asynchrones et les trois onglets**

Run: `npm test -- src/types/asyncViewState.test.ts src/components/TabPanels.test.tsx && npm run lint && npm run build`

Expected: tests réussis; le panneau Aperçu reste monté pour `overview`, `formations` et `personal`, tandis qu’un seul panneau secondaire au maximum est présent.

Manual: lancer `npm run dev`, ouvrir chaque onglet, utiliser l’aperçu avant impression et vérifier que les expériences et le QR code apparaissent dans les trois cas.

- [ ] **Step 9: Commit**

```bash
git add src/types/asyncViewState.ts src/types/asyncViewState.test.ts src/components/TabPanels.tsx src/components/TabPanels.test.tsx src/components/tabs src/App.tsx src/App.module.css src/components/Toolbar.tsx
git commit -m "fix: make printing independent from active tab"
```

---

### Task 7: Sortir l’export Word du bundle initial et unifier le découpage des tags

**Files:**
- Create: `src/utils/techTokens.ts`
- Create: `src/utils/techTokens.test.ts`
- Create: `src/theme/techTagTheme.ts`
- Create: `src/theme/techTagTheme.test.ts`
- Create: `src/assets/resume-qr.svg`
- Modify: `src/components/InlineTechText.tsx`
- Modify: `src/components/TechBadge.tsx`
- Modify: `src/components/QRCode.tsx`
- Create: `src/components/QRCode.test.tsx`
- Modify: `src/utils/exportCvToWord.ts`
- Modify: `src/components/Toolbar.tsx`
- Create: `scripts/check-production-bundle.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: textes contenant des marqueurs `#tag`, types de badges existants et URL publique fixe du CV.
- Produces: `tokenizeTechText(text): TechToken[]`, `getTechTagTheme(kind: string): TechTagTheme`, QR code local, import dynamique de l’exporteur et commande `npm run check:bundle`.

- [ ] **Step 1: Écrire les tests du tokenizer partagé**

```ts
import { describe, expect, it } from 'vitest'
import { tokenizeTechText } from './techTokens'

describe('tokenizeTechText', () => {
  it('keeps punctuation outside tags', () => {
    expect(tokenizeTechText('avec #react, #three.js et #api-rest.')).toEqual([
      { type: 'text', value: 'avec ' },
      { type: 'tag', value: '#react', key: 'react' },
      { type: 'text', value: ', ' },
      { type: 'tag', value: '#three.js', key: 'threejs' },
      { type: 'text', value: ' et ' },
      { type: 'tag', value: '#api-rest', key: 'apirest' },
      { type: 'text', value: '.' },
    ])
  })
})
```

- [ ] **Step 2: Vérifier que la regex actuelle échoue sur `#three.js`**

Run: `npm test -- src/utils/techTokens.test.ts`

Expected: FAIL car le tokenizer n’existe pas; le futur test protège le point actuellement tronqué par `/(#[a-zA-Z0-9-]+)/g`.

- [ ] **Step 3: Implémenter le tokenizer pur**

```ts
export type TechToken =
  | { type: 'text'; value: string }
  | { type: 'tag'; value: string; key: string }

const TECH_TAG_PATTERN = /#[\p{L}\p{N}][\p{L}\p{N}._-]*/gu

export const normalizeTechTag = (value: string): string =>
  value.slice(1).toLocaleLowerCase('en').replace(/[^a-z0-9]/g, '')
```

Construire les segments texte entre les résultats de `matchAll`, puis utiliser la même sortie dans React et dans l’export Word.

- [ ] **Step 4: Remplacer les deux parseurs dupliqués**

`InlineTechText` transforme les tokens en `<span>`; `inlineTaggedRuns` transforme les mêmes tokens en `TextRun`. Les deux conservent les ponctuations et noms comportant un point.

- [ ] **Step 5: Centraliser la palette des badges Web**

Déplacer les couleurs actuellement dupliquées entre `TechBadge.tsx` et `InlineTechText.tsx` vers `src/theme/techTagTheme.ts` :

```ts
export interface TechTagTheme {
  bg: string
  text: string
  border: string
  dot: string
}

const FALLBACK_THEME: TechTagTheme = {
  bg: '#dcfce7',
  text: '#166534',
  border: '#86efac',
  dot: '#86efac',
}

export const getTechTagTheme = (kind: string): TechTagTheme =>
  TECH_TAG_THEMES[kind.toLocaleLowerCase('en')] ?? FALLBACK_THEME
```

Le test vérifie au minimum `react`, `c#`, `three.js` et une clé inconnue. `TechBadge` et `InlineTechText` consomment ensuite la même fonction; aucun second objet de palette ne subsiste dans les composants.

- [ ] **Step 6: Remplacer le QR code distant par un actif local**

Installer le générateur uniquement en développement :

Run: `npm install --save-dev qrcode`

Ajouter un script reproductible :

```json
"generate:qr": "qrcode -t svg -q M -m 2 -o src/assets/resume-qr.svg https://alexandre-plana.github.io/resume/"
```

Run: `npm run generate:qr`

Dans `QRCode.tsx`, importer `resumeQrUrl` depuis `../assets/resume-qr.svg` et l’utiliser comme `src`. Conserver la propriété `url` pour le texte imprimé, mais ne plus construire d’URL vers `api.qrserver.com`.

Le test rend `QRCode`, vérifie que l’image possède l’alternative traduite et que son attribut `src` ne commence ni par `http://` ni par `https://`. Scanner une fois le SVG généré pendant la recette pour confirmer qu’il résout vers l’URL attendue.

- [ ] **Step 7: Charger `docx` uniquement à la demande en développement**

Supprimer l’import statique de `exportCvToWord` dans `Toolbar.tsx` et écrire :

```ts
const handleExportWord = async () => {
  if (!import.meta.env.DEV || !exportData) return
  const { exportCvToWord } = await import('../utils/exportCvToWord')
  await exportCvToWord(exportData, language)
}
```

Remplacer `process.env.NODE_ENV === 'development'` par `import.meta.env.DEV`.

- [ ] **Step 8: Ajouter un contrôle reproductible du bundle**

Le script `scripts/check-production-bundle.mjs` lit les fichiers `dist/assets/index-*.js`, échoue si le chunk initial contient `word/document.xml` ou le MIME OOXML, et affiche sa taille. Ajouter :

```json
"check:bundle": "npm run build && node scripts/check-production-bundle.mjs"
```

- [ ] **Step 9: Vérifier tags, palette, QR code et bundle**

Run: `npm test -- src/utils/techTokens.test.ts src/theme/techTagTheme.test.ts src/components/QRCode.test.tsx && npm run check:bundle`

Expected: tests réussis; sortie `docx markers: absent`; chunk initial inférieur au chunk de référence de 574,49 kB.

- [ ] **Step 10: Commit**

```bash
git add src/utils src/theme src/assets/resume-qr.svg src/components/InlineTechText.tsx src/components/TechBadge.tsx src/components/QRCode.tsx src/components/QRCode.test.tsx src/components/Toolbar.tsx scripts package.json package-lock.json
git commit -m "perf: lazy load Word export"
```

---

### Task 8: Supprimer le code mort et réduire les responsabilités du store

**Files:**
- Delete: `src/components/ContactModal.tsx`
- Delete: `src/components/ContactModal.module.css`
- Delete: `src/components/ContribGraph.tsx`
- Delete: `src/components/ContribGraph.module.css`
- Modify: `src/App.tsx`
- Modify: `src/store/appStore.ts`
- Modify: `src/hooks/useApi.ts`
- Modify: `src/api/index.ts`
- Modify: `src/api/mock/mockServices.ts`
- Modify: `src/api/services/apiServices.ts`
- Modify: `src/api/schemas.ts`
- Modify: `src/api/mockDataLocales.ts`
- Modify: `src/types/index.ts`
- Modify: `src/App.module.css`
- Create: `src/store/appStore.test.ts`

**Interfaces:**
- Consumes: état réellement utilisé `activeTab` et `language`.
- Produces: store limité à la navigation et à la langue; aucune journalisation de données de contact.

- [ ] **Step 1: Écrire le test du store minimal**

```ts
import { describe, expect, it } from 'vitest'
import { useAppStore } from './appStore'

describe('appStore', () => {
  it('only exposes navigation and language state', () => {
    const state = useAppStore.getState()
    expect(Object.keys(state).sort()).toEqual([
      'activeTab',
      'language',
      'setActiveTab',
      'setLanguage',
    ])
  })
})
```

- [ ] **Step 2: Vérifier que le test détecte l’état mort**

Run: `npm test -- src/store/appStore.test.ts`

Expected: FAIL car `contactOpen`, `setContactOpen`, `toasts`, `addToast` et `removeToast` sont encore présents.

- [ ] **Step 3: Supprimer le formulaire de contact inaccessible**

Retirer l’import et le rendu de `ContactModal` dans `App.tsx`, puis supprimer le composant et sa feuille de style. Retirer le commentaire du bouton de contact dans `Toolbar.tsx` au lieu de conserver une fonctionnalité partiellement câblée.

- [ ] **Step 4: Supprimer le service et le hook de contact incomplets**

Retirer `useContact`, `contactService`, `mockContactService` et leur branche dans `api/index.ts`. Cette suppression élimine aussi les deux `console.log` contenant les données du formulaire.

- [ ] **Step 5: Réduire le store**

Supprimer les types `Toast`, les temporisateurs et tout l’état de contact. Le store final contient uniquement les quatre clés vérifiées par le test.

- [ ] **Step 6: Supprimer le graphe de contributions inutilisé**

Supprimer `ContribGraph.tsx` et sa feuille de style. Aucun import ne doit subsister.

- [ ] **Step 7: Supprimer le modèle de métriques et les règles CSS sans consommateur**

Supprimer `Metric`, `Mission.metrics`, les tableaux `metrics` des dictionnaires localisés et la fusion correspondante dans `useExperiences`. Aucun composant n’affiche ces valeurs. Supprimer aussi `.metricsGrid`, `.metricItem`, `.metricValue`, `.metricLabel`, `.missionStack` et la première définition dupliquée de `.tlProjects` dans `App.module.css`.

- [ ] **Step 8: Vérifier l’absence de références mortes**

Run: `npm test -- src/store/appStore.test.ts; if (rg "ContactModal|useContact|contactService|ContribGraph|addToast|toasts|console\.log|metricsGrid|metricItem|metricValue|metricLabel" src) { exit 1 }; npm run lint; npm run build`

Expected: test, lint et build réussis; `rg` ne retourne aucune occurrence et son code de sortie `1` est attendu pour l’absence de correspondance.

- [ ] **Step 9: Commit**

```bash
git add -A src
git commit -m "refactor: remove unreachable resume features"
```

---

### Task 9: Corriger les libellés français et sécuriser les dernières clés React

**Files:**
- Modify: `src/locales/index.ts`
- Modify: `src/components/tabs/FormationsTab.tsx`
- Modify: `src/App.tsx`
- Create: `src/locales/index.test.ts`

**Interfaces:**
- Consumes: dictionnaire français et identifiants ajoutés à la tâche 2.
- Produces: libellés français correctement accentués et clés React stables.

- [ ] **Step 1: Écrire les assertions sur les libellés visibles**

```ts
import { describe, expect, it } from 'vitest'
import { translations } from './index'

describe('French translations', () => {
  it('uses correct accents in visible labels', () => {
    expect(translations.fr.common.coreSkills).toBe('Compétences clés')
    expect(translations.fr.common.noData).toBe('Aucune donnée à afficher.')
    expect(translations.fr.sections.about).toBe('À propos')
    expect(translations.fr.sections.professionalExperience).toBe('Expériences professionnelles')
    expect(translations.fr.mission.tasksTitle).toBe('Exemples de tâches effectuées')
    expect(translations.fr.mission.retrospective).toBe('Rétrospective')
  })
})
```

- [ ] **Step 2: Vérifier l’échec des libellés actuels**

Run: `npm test -- src/locales/index.test.ts`

Expected: FAIL sur les chaînes actuellement privées d’accents.

- [ ] **Step 3: Corriger toutes les chaînes françaises concernées**

Corriger également `Données`, `récent`, `diplôme`, `élément`, `détail`, `clés`, `Fonctionnalité`, `développement` et `complète` dans le même dictionnaire.

- [ ] **Step 4: Remplacer les index servant de clés React**

Dans `FormationsTab`, utiliser `key={form.id}`. Dans la liste des catégories de compétences, utiliser `key={skillCat.id}`. Conserver l’index uniquement lorsque la donnée n’a réellement aucune identité métier, comme un fragment de texte produit par le tokenizer.

- [ ] **Step 5: Vérifier contenu et build**

Run: `npm test -- src/locales/index.test.ts && npm run lint && npm run build`

Expected: tests, lint et build réussis.

- [ ] **Step 6: Commit**

```bash
git add src/locales/index.ts src/locales/index.test.ts src/components/tabs/FormationsTab.tsx src/App.tsx
git commit -m "fix: polish French labels and stable keys"
```

---

### Task 10: Vérification transversale et documentation

**Files:**
- Modify: `README.md`
- Create: `docs/verification/code-review-remediation.md`

**Interfaces:**
- Consumes: toutes les tâches précédentes.
- Produces: commandes documentées et preuve de validation manuelle reproductible.

- [ ] **Step 1: Documenter les commandes de qualité**

Dans `README.md`, remplacer la section de vérification par :

```bash
npm test
npm run lint
npm run build
npm run check:bundle
```

Expliquer en une phrase que `npm test` couvre la navigation, la localisation, les dialogues, les données API et la vue imprimable.

- [ ] **Step 2: Exécuter toute la suite automatisée**

Run: `npm test && npm run lint && npm run check:bundle && npm audit --omit=dev`

Expected: aucun test en échec, aucune erreur ESLint, build réussi, aucun marqueur `docx` dans le chunk initial et aucune vulnérabilité de production connue.

- [ ] **Step 3: Vérifier le dépôt après compilation**

Run: `git status --short`

Expected: seules les modifications intentionnelles de documentation sont présentes; aucun `.tsbuildinfo`, `vite.config.js` ou `vite.config.d.ts` n’est recréé comme fichier suivi.

- [ ] **Step 4: Effectuer la recette clavier**

Dans Chrome ou Edge :

1. Tabuler jusqu’aux onglets.
2. Parcourir les trois onglets avec les flèches.
3. Ouvrir une mission et un projet avec Entrée.
4. Vérifier que le focus entre dans la fenêtre.
5. Parcourir tous les contrôles avec Tab et Maj+Tab.
6. Fermer avec Échap.
7. Vérifier que le focus revient à la carte d’origine.

Consigner chaque résultat dans `docs/verification/code-review-remediation.md` sous forme de tableau `Scénario | Résultat | Navigateur`.

- [ ] **Step 5: Effectuer la recette langue, fragments et impression**

1. Passer en anglais et vérifier `<html lang="en">` dans les outils de développement.
2. Revenir en français et vérifier `<html lang="fr">`.
3. Charger `#personal-project-4` et vérifier le focus du projet.
4. Charger `#personal-project-[` et vérifier l’absence d’erreur console.
5. Lancer l’aperçu avant impression depuis chacun des trois onglets.
6. Vérifier dans les trois aperçus la présence des expériences et du QR code.

Consigner les résultats dans le même document.

- [ ] **Step 6: Vérifier les largeurs responsive**

Tester 320 px, 768 px et 1280 px : aucune barre horizontale, aucun dialogue coupé et boutons de langue/impression accessibles.

- [ ] **Step 7: Commit final de documentation**

```bash
git add README.md docs/verification/code-review-remediation.md
git commit -m "docs: record resume quality checks"
```

- [ ] **Step 8: Revue finale de branche**

Run: `git diff origin/main...HEAD --check && git log --oneline origin/main..HEAD`

Expected: aucune erreur d’espacement et dix commits ou moins, chacun correspondant à une unité testable du plan.

