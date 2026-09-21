import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlignTable,
  WidthType,
} from 'docx'
import type { IRunOptions } from 'docx'
import type { Language } from '../locales'
import { getTranslations } from '../locales'
import type { Experience, Formation, PersonalProject, Profile, Skill } from '../types'

export interface CvExportData {
  profile: Profile
  experiences: Experience[]
  skills: Skill[]
  formations: Formation[]
  personalProjects: PersonalProject[]
}

// Visual tokens inspired by src/styles/variables.css

const PALETTE = {
  bg: 'FFFFFF',
  bgAlt: 'F6F8FA',
  border: 'D0D7DE',
  borderSoft: 'EAEEF2',
  text: '1F2328',
  text2: '636C76',
  text3: '9198A1',
  blue: '0969DA',
  blueSoft: 'DCEBFF',
  blueBorder: 'B6D4FE',
  neutralSoft: 'F3F4F6',
  featuredBg: 'F0F9FF',
  featuredBorder: 'BAE6FD',
  green: '1A7F37',
  greenSoft: 'E9FBEA',
  greenBorder: 'A7E3AF',
}

const FONTS = {
  body: 'Mona Sans',
  mono: 'JetBrains Mono',
}

type DocChild = Paragraph | Table
type RunOverrides = Omit<Partial<IRunOptions>, 'text' | 'children'>
type BadgeVariant = 'blue' | 'neutral' | 'success'

const borderLine = (color: string, size = 6) => ({
  style: BorderStyle.SINGLE,
  size,
  color,
})

const noBorder = {
  style: BorderStyle.NONE,
  size: 0,
  color: 'FFFFFF',
}

const bodyRun = (text: string, options: RunOverrides = {}): TextRun =>
  new TextRun({
    text,
    font: FONTS.body,
    size: 21,
    color: PALETTE.text,
    ...options,
  })

const monoRun = (text: string, options: RunOverrides = {}): TextRun =>
  new TextRun({
    text,
    font: FONTS.mono,
    size: 18,
    color: PALETTE.text3,
    ...options,
  })

const spacer = (after = 120): Paragraph => new Paragraph({ text: '', spacing: { after } })

const badgeTheme: Record<BadgeVariant, { fill: string; border: string; color: string }> = {
  blue: { fill: PALETTE.blueSoft, border: PALETTE.blueBorder, color: PALETTE.blue },
  neutral: { fill: PALETTE.neutralSoft, border: PALETTE.border, color: PALETTE.text2 },
  success: { fill: PALETTE.greenSoft, border: PALETTE.greenBorder, color: PALETTE.green },
}

const badgeRun = (text: string, variant: BadgeVariant, allCaps = false): TextRun => {
  const theme = badgeTheme[variant]
  return new TextRun({
    text: ` ${text} `,
    font: FONTS.mono,
    size: 15,
    bold: true,
    allCaps,
    color: theme.color,
    characterSpacing: 4,
    shading: { type: ShadingType.CLEAR, fill: theme.fill, color: 'auto' },
    border: borderLine(theme.border, 4),
  })
}

const inlineTaggedRuns = (text: string, options: RunOverrides = {}): TextRun[] =>
  text
    .split(/(#[a-zA-Z0-9-]+)/g)
    .filter((part) => part.length > 0)
    .map((part) => (part.startsWith('#') ? badgeRun(part, 'blue') : bodyRun(part, options)))

const badgeRuns = (
  values: string[],
  variant: BadgeVariant,
  format: (value: string) => string = (value) => value,
): TextRun[] => {
  const runs: TextRun[] = []
  values.forEach((value, index) => {
    runs.push(badgeRun(format(value), variant))
    if (index < values.length - 1) {
      runs.push(new TextRun({ text: ' ' }))
    }
  })
  return runs
}

const sectionHeading = (label: string): Paragraph =>
  new Paragraph({
    keepNext: true,
    children: [
      monoRun('◆ ', {
        bold: true,
        size: 16,
        color: PALETTE.blue,
        characterSpacing: 10,
      }),
      monoRun(label.toUpperCase(), {
        bold: true,
        allCaps: true,
        color: PALETTE.blue,
        characterSpacing: 22,
      }),
    ],
    shading: {
      type: ShadingType.CLEAR,
      fill: PALETTE.blueSoft,
      color: 'auto',
    },
    border: {
      top: borderLine(PALETTE.borderSoft, 6),
      left: borderLine(PALETTE.blue, 16),
      bottom: borderLine(PALETTE.borderSoft, 6),
    },
    indent: { left: 80 },
    spacing: { before: 120, after: 180 },
  })

const buildHeaderCard = (profile: Profile): Table =>
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: borderLine(PALETTE.border, 8),
      bottom: borderLine(PALETTE.border, 8),
      left: borderLine(PALETTE.border, 8),
      right: borderLine(PALETTE.border, 8),
      insideHorizontal: noBorder,
      insideVertical: noBorder,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 65, type: WidthType.PERCENTAGE },
            margins: { top: 140, bottom: 140, left: 140, right: 140 },
            verticalAlign: VerticalAlignTable.TOP,
            children: [
              new Paragraph({
                children: [bodyRun(profile.name, { bold: true, size: 44, color: PALETTE.text })],
                spacing: { after: 70 },
              }),
              new Paragraph({
                children: [monoRun(`@${profile.handle}`, { size: 17, color: PALETTE.text2 })],
                spacing: { after: 120 },
              }),
              new Paragraph({
                children: [
                  monoRun(profile.title.toUpperCase(), {
                    bold: true,
                    allCaps: true,
                    size: 17,
                    color: PALETTE.blue,
                    characterSpacing: 10,
                  }),
                ],
                spacing: { after: 70 },
              }),
              new Paragraph({
                children: [bodyRun(profile.subtitle, { size: 20, color: PALETTE.text3 })],
              }),
            ],
          }),
          new TableCell({
            width: { size: 35, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlignTable.TOP,
            shading: { type: ShadingType.CLEAR, fill: PALETTE.bgAlt, color: 'auto' },
            margins: { top: 140, bottom: 140, left: 140, right: 140 },
            children: [
              new Paragraph({
                children: [
                  monoRun('CONTACT', {
                    bold: true,
                    allCaps: true,
                    size: 16,
                    color: PALETTE.text3,
                    characterSpacing: 16,
                  }),
                ],
                spacing: { after: 100 },
              }),
              new Paragraph({
                children: [monoRun('Company: ', { bold: true, color: PALETTE.text2 }), bodyRun(profile.company, { size: 19, color: PALETTE.text2 })],
                spacing: { line: 220, after: 40 },
              }),
              new Paragraph({
                children: [monoRun('Location: ', { bold: true, color: PALETTE.text2 }), bodyRun(profile.location, { size: 19, color: PALETTE.text2 })],
                spacing: { line: 220, after: 40 },
              }),
              new Paragraph({
                children: [monoRun('Email: ', { bold: true, color: PALETTE.text2 }), bodyRun(profile.email, { size: 19, color: PALETTE.text2 })],
                spacing: { line: 220, after: 40 },
              }),
              new Paragraph({
                children: [monoRun('Phone: ', { bold: true, color: PALETTE.text2 }), bodyRun(profile.phone, { size: 19, color: PALETTE.text2 })],
                spacing: { line: 220 },
              }),
            ],
          }),
        ],
      }),
    ],
  })

const buildAboutCard = (text: string): Table =>
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: borderLine(PALETTE.border, 6),
      bottom: borderLine(PALETTE.border, 6),
      left: borderLine(PALETTE.blue, 12),
      right: borderLine(PALETTE.border, 6),
      insideHorizontal: noBorder,
      insideVertical: noBorder,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: PALETTE.bgAlt, color: 'auto' },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                children: [bodyRun(text, { size: 21, color: PALETTE.text2 })],
                spacing: { line: 280 },
              }),
            ],
          }),
        ],
      }),
    ],
  })

const buildMissionCard = (mission: Experience['missions'][number], t: ReturnType<typeof getTranslations>): Table => {
  const borderColor = mission.featured ? PALETTE.featuredBorder : PALETTE.border
  const fillColor = mission.featured ? PALETTE.featuredBg : PALETTE.bgAlt
  const missionTasks = mission.tasks ?? []
  const missionHeaderBadges: TextRun[] = [badgeRun(mission.badge, 'blue', true)]

  if (mission.isCurrent) {
    missionHeaderBadges.push(new TextRun({ text: ' ' }), badgeRun(t.mission.current, 'success', true))
  }

  const children: Paragraph[] = []
  // Header block (title, badge, period)
  const headerBlock: Paragraph[] = [
    new Paragraph({
      children: [
        monoRun(mission.name, { bold: true, color: PALETTE.blue, size: 18 }),
        new TextRun({ text: '  ' }),
        ...missionHeaderBadges,
      ],
      spacing: { after: 70 },
    }),
    new Paragraph({
      children: [monoRun(mission.period, { size: 16, color: PALETTE.text3 })],
      spacing: { after: 110, line: 200 },
    }),
  ]
  children.push(...headerBlock)

  const pushMissionGap = (after = 70): void => {
    children.push(new Paragraph({ text: '', spacing: { after } }))
  }

  if (mission.context) {
    children.push(
      new Paragraph({
        children: [bodyRun(mission.context, { italics: true, size: 19, color: PALETTE.text3 })],
        spacing: { after: 40, line: 230 },
      }),
    )
    pushMissionGap(70)
  }

  children.push(
    new Paragraph({
      children: inlineTaggedRuns(mission.desc, { size: 20, color: PALETTE.text2 }),
      spacing: { after: 40, line: 270 },
    }),
  )
  pushMissionGap(80)

  if (missionTasks.length > 0) {
    children.push(
      new Paragraph({
        children: [
          bodyRun('\u00A0\u00A0', { size: 16 }),
          monoRun(t.mission.tasksTitle.toUpperCase(), { bold: true, allCaps: true, size: 16, color: PALETTE.blue, characterSpacing: 8 }),
        ],
        indent: { left: 120 },
        spacing: { after: 90 },
      }),
    )

    missionTasks.forEach((task) => {
      children.push(
        new Paragraph({
          children: inlineTaggedRuns(task, { size: 20, color: PALETTE.text2 }),
          bullet: { level: 0 },
          indent: { left: 340 },
          spacing: { line: 240, after: 70 },
        }),
      )
    })
    pushMissionGap(70)
  }

  // metrics removed: no longer in Mission interface

  if (mission.retrospective?.trim()) {
    children.push(
      new Paragraph({
        children: [bodyRun(`${t.mission.retrospective}: ${mission.retrospective}`, { italics: true, color: PALETTE.green, size: 19 })],
        spacing: { after: 40, line: 240 },
      }),
    )
    pushMissionGap(70)
  }

  if (mission.tags.length > 0) {
    children.push(
      new Paragraph({
        children: badgeRuns(mission.tags, 'neutral', (tag) => `#${tag}`),
        spacing: { before: 20, after: 20 },
      }),
    )
  }

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: borderLine(borderColor, 6),
      bottom: borderLine(borderColor, 6),
      left: borderLine(borderColor, 6),
      right: borderLine(borderColor, 6),
      insideHorizontal: noBorder,
      insideVertical: noBorder,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: fillColor, color: 'auto' },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            children,
          }),
        ],
      }),
    ],
  })
}

const buildPersonalProjectCard = (
  project: PersonalProject,
  t: ReturnType<typeof getTranslations>,
): Table => {
  const headerRuns: TextRun[] = [
    monoRun(project.name, { bold: true, size: 18, color: PALETTE.blue }),
    new TextRun({ text: '  ' }),
    badgeRun(project.role, 'blue', true),
  ]

  if (project.status) {
    headerRuns.push(new TextRun({ text: ' ' }), badgeRun(project.status, 'success', true))
  }

  const children: Paragraph[] = [
    new Paragraph({
      children: headerRuns,
      spacing: { after: 50 },
    }),
    new Paragraph({
      children: [monoRun(`${project.kind} · ${project.period}`, { size: 16, color: PALETTE.text3 })],
      spacing: { after: 70 },
    }),
    new Paragraph({
      children: inlineTaggedRuns(project.desc, { size: 20, color: PALETTE.text2 }),
      spacing: { after: 70, line: 250 },
    }),
  ]

  if (project.details) {
    children.push(
      new Paragraph({
        children: inlineTaggedRuns(project.details, { size: 19, color: PALETTE.text2 }),
        spacing: { after: 80, line: 250 },
      }),
    )
  }

  if (project.highlights?.length) {
    children.push(
      new Paragraph({
        keepNext: true,
        children: [
          monoRun(t.personalModal.highlightsTitle.toUpperCase(), {
            bold: true,
            allCaps: true,
            size: 16,
            color: PALETTE.blue,
            characterSpacing: 8,
          }),
        ],
        spacing: { after: 80 },
      }),
    )

    project.highlights.forEach((highlight) => {
      children.push(
        new Paragraph({
          children: inlineTaggedRuns(highlight, { size: 19, color: PALETTE.text2 }),
          bullet: { level: 0 },
          indent: { left: 340 },
          spacing: { line: 230, after: 60 },
        }),
      )
    })
  }

  if (project.stack.length > 0) {
    children.push(
      new Paragraph({
        children: badgeRuns(project.stack, 'neutral', (technology) => `#${technology}`),
        spacing: { before: 30 },
      }),
    )
  }

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: borderLine(PALETTE.borderSoft, 6),
      bottom: borderLine(PALETTE.borderSoft, 6),
      left: borderLine(PALETTE.borderSoft, 6),
      right: borderLine(PALETTE.borderSoft, 6),
      insideHorizontal: noBorder,
      insideVertical: noBorder,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            margins: { top: 110, bottom: 110, left: 120, right: 120 },
            children,
          }),
        ],
      }),
    ],
  })
}

const addSpacingBetweenCards = (children: DocChild[]): void => {
  children.push(spacer(100))
}

// Main export

export const createCvWordBlob = async (data: CvExportData, language: Language): Promise<Blob> => {
  const t = getTranslations(language)
  const { profile, experiences, skills, formations, personalProjects } = data

  const children: DocChild[] = []

  children.push(buildHeaderCard(profile))
  children.push(spacer(200))

  children.push(sectionHeading(t.sections.about))
  children.push(buildAboutCard(profile.bio))
  children.push(spacer(180))

  children.push(sectionHeading(t.sidebar.seekingLabel))
  children.push(
    new Paragraph({
      children: [bodyRun(profile.seeking, { size: 20, color: PALETTE.text2 })],
      spacing: { line: 230, after: 180 },
    }),
  )

  children.push(sectionHeading(t.common.languages))
  children.push(
    new Paragraph({
      children: badgeRuns(profile.langs.map((entry) => `${entry.label} · ${entry.level}`), 'neutral'),
      spacing: { line: 220, after: 180 },
    }),
  )

  children.push(sectionHeading(t.common.coreSkills))
  skills.forEach((skill) => {
    children.push(
      new Paragraph({
        children: [
          monoRun(skill.cat.toUpperCase(), {
            bold: true,
            allCaps: true,
            size: 16,
            color: PALETTE.blue,
            characterSpacing: 8,
          }),
          bodyRun(`  ${skill.tags.map((tag) => tag.l).join(' · ')}`, { size: 20, color: PALETTE.text2 }),
        ],
        spacing: { after: 80, line: 230 },
      }),
    )
  })
  children.push(spacer(180))

  children.push(sectionHeading(t.sections.professionalExperience))
  experiences.forEach((experience, index) => {
    if (index > 0) {
      children.push(spacer(120))
    }

    children.push(
      new Paragraph({
        keepNext: true,
        children: [
          bodyRun(experience.company, { bold: true, size: 26, color: PALETTE.text }),
          bodyRun(`  ${experience.employer}`, { size: 20, color: PALETTE.text2 }),
        ],
        spacing: { after: 40 },
      }),
      new Paragraph({
        keepNext: true,
        children: [monoRun(experience.period, { size: 16, color: PALETTE.text3 })],
        spacing: { after: 80 },
      }),
    )

    experience.missions.forEach((mission, missionIndex) => {
      children.push(buildMissionCard(mission, t))
      if (missionIndex < experience.missions.length - 1) {
        addSpacingBetweenCards(children)
      }
    })

    children.push(spacer(140))
  })

  children.push(sectionHeading(t.tabs.formations))
  formations.forEach((formation, index) => {
    children.push(
      new Paragraph({
        keepNext: true,
        children: [bodyRun(formation.title, { bold: true, size: 23 })],
        spacing: { after: 40 },
      }),
      new Paragraph({
        keepNext: true,
        children: [monoRun(formation.sub, { size: 16, color: PALETTE.text3 })],
        spacing: { after: 40 },
      }),
      new Paragraph({
        children: [bodyRun(formation.meta, { size: 20, color: PALETTE.text2 })],
        spacing: { line: 240, after: index < formations.length - 1 ? 120 : 80 },
      }),
    )
  })
  children.push(spacer(160))

  children.push(sectionHeading(t.tabs.personalProjects))
  personalProjects.forEach((project, index) => {
    children.push(buildPersonalProjectCard(project, t))
    if (index < personalProjects.length - 1) {
      addSpacingBetweenCards(children)
    }
  })
  children.push(spacer(180))

  children.push(sectionHeading(t.sidebar.interests))
  children.push(
    new Paragraph({
      children: badgeRuns(profile.interests, 'neutral', (interest) => `#${interest}`),
      spacing: { line: 220, after: 280 },
    }),
  )


  children.push(
    new Paragraph({
      children: [
        monoRun(`CV · ${profile.name} · ${new Date().getFullYear()}`, {
          size: 15,
          color: PALETTE.text3,
          characterSpacing: 10,
        }),
      ],
      alignment: AlignmentType.CENTER,
      border: {
        top: borderLine(PALETTE.borderSoft, 6),
      },
      spacing: { before: 220, after: 60 },
    }),
  )

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 760, right: 760, bottom: 760, left: 760 },
          },
        },
        children,
      },
    ],
  })

  return Packer.toBlob(doc)
}

export const exportCvToWord = async (data: CvExportData, language: Language): Promise<void> => {
  const { profile } = data
  const blob = await createCvWordBlob(data, language)
  const link = document.createElement('a')
  const fileDate = new Date().toISOString().slice(0, 10)

  link.href = URL.createObjectURL(blob)
  link.download = `cv-${profile.handle}-${language}-${fileDate}.docx`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
