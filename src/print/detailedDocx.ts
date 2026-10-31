import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  ImageRun,
  LevelFormat,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TabStopType,
  TextRun,
  WidthType,
  type IRunOptions,
} from 'docx'
import { getTechTagTheme } from '../theme/techTagTheme'
import { tokenizeTechText } from '../utils/techTokens'
import type { CompanyHead, DetailedModel, MissionView, OverviewEntry } from './detailed'
import type { ProjectRow } from './detailedContent'

// Word version of the detailed CV: same model, same palette and building blocks as the
// printable page (cards, chips, inline #tech tags, repository listings), within what Word can draw.

const C = {
  bg: 'FFFFFF',
  bg2: 'F6F8FA',
  border: 'D0D7DE',
  border2: 'EAEEF2',
  text: '1F2328',
  text2: '636C76',
  text3: '9198A1',
  blue: '0969DA',
  blueBg: 'E7F0FB',
  featuredBg: 'F0F9FF',
  featuredBorder: 'BAE6FD',
}

// Fonts every Word install has; the web page uses Mona Sans and JetBrains Mono.
const BODY = 'Segoe UI'
const MONO = 'Consolas'

// A4 with 10 mm margins, in twentieths of a point.
const MARGIN = 567
const PAGE_WIDTH = 11906 - 2 * MARGIN
const SIDE_WIDTH = 3500
const GAP = 280
const MAIN_WIDTH = PAGE_WIDTH - SIDE_WIDTH - GAP
const CARD_INDENT = 360

const pt = (size: number) => Math.round(size * 2)
const hex = (color: string) => color.replace('#', '').toUpperCase()

const run = (text: string, options: Omit<IRunOptions, 'text'> = {}) =>
  new TextRun({ text, font: BODY, size: pt(8), color: C.text, ...options })

const mono = (text: string, options: Omit<IRunOptions, 'text'> = {}) =>
  run(text, { font: MONO, ...options })

// A chip: colored, shaded run with a dot, like TechBadge (lowercase, mono).
// No-break spaces and hyphens keep a chip on one line; the plain space after it is where lines wrap.
const chip = (label: string, kind: string) => {
  const theme = getTechTagTheme(kind)
  return [
    new TextRun({
      text: `\u00A0●\u00A0${label.toLowerCase().replace(/ /g, '\u00A0').replace(/-/g, '\u2011')}\u00A0`,
      font: MONO,
      size: pt(6.5),
      color: hex(theme.text),
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: hex(theme.bg) },
    }),
    run(' ', { size: pt(6.5) }),
  ]
}

const chips = (tags: { l: string; k: string }[], spacingBefore = 60) =>
  new Paragraph({ spacing: { before: spacingBefore, line: 300 }, children: tags.flatMap((tag) => chip(tag.l, tag.k)) })

// Prose with #tech tags rendered as small shaded mono runs, like InlineTechText.
const inline = (text: string, base: Omit<IRunOptions, 'text'> = {}) =>
  tokenizeTechText(text).map((token) => {
    if (token.type === 'text') return run(token.value, base)
    const theme = getTechTagTheme(token.key)
    return new TextRun({
      text: token.value,
      font: MONO,
      size: pt(6.5),
      color: hex(theme.text),
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: hex(theme.bg) },
    })
  })

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
}

const line = (color: string) => ({ style: BorderStyle.SINGLE, size: 6, color })

// A bordered, shaded box: mission cards, cover timeline cards, project cards.
const card = (children: (Paragraph | Table)[], width: number, featured = false, indent = CARD_INDENT) =>
  new Table({
    width: { size: width, type: WidthType.DXA },
    columnWidths: [width],
    indent: { size: indent, type: WidthType.DXA },
    borders: noBorders,
    rows: [
      new TableRow({
        // A card moves to the next page whole rather than splitting.
        cantSplit: true,
        children: [
          new TableCell({
            width: { size: width, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, color: 'auto', fill: featured ? C.featuredBg : C.bg2 },
            borders: {
              top: line(featured ? C.featuredBorder : C.border),
              bottom: line(featured ? C.featuredBorder : C.border),
              left: line(featured ? C.featuredBorder : C.border),
              right: line(featured ? C.featuredBorder : C.border),
            },
            margins: { top: 90, bottom: 90, left: 140, right: 140 },
            children,
          }),
        ],
      }),
    ],
  })

const spacer = (after = 80) => new Paragraph({ spacing: { after }, children: [] })

const sectionHeader = (text: string) =>
  new Paragraph({ keepNext: true, spacing: { before: 200, after: 100 }, children: [run(text, { bold: true, size: pt(9) })] })

const subhead = (text: string, indent = 0) =>
  new Paragraph({
    keepNext: true,
    indent: { left: indent },
    spacing: { before: 140, after: 60 },
    children: [mono(text.toUpperCase(), { size: pt(6.5), color: C.text3, bold: true })],
  })

// Company row of the timeline: dot, name, period pill, role.
const companyRow = (head: CompanyHead, inline = false) => {
  const dot = run(head.current ? '● ' : '○ ', { color: C.blue, size: pt(10), bold: true })
  const name = run(head.company, { bold: true, size: pt(9) })
  const period = mono(` ${head.period} `, {
    size: pt(6.5),
    color: C.text3,
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.bg2 },
  })
  const role = run(head.employer, { color: C.text2, size: pt(7.5) })
  if (inline) {
    return [new Paragraph({ keepNext: true, spacing: { before: 120, after: 60 }, children: [dot, name, run('  '), period, run('  '), role] })]
  }
  return [
    new Paragraph({ keepNext: true, spacing: { before: 120 }, children: [dot, name, run('  '), period] }),
    new Paragraph({ keepNext: true, indent: { left: CARD_INDENT }, spacing: { after: 80 }, children: [role] }),
  ]
}

// Card head: 📁 repo name on the left, role badge on the right. No keepNext here: Word and
// LibreOffice extend a table's first paragraph setting to the whole card, chaining cards together.
const cardTop = (icon: string, name: string, badge: string | undefined, width: number) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: width - 300 }],
    children: [
      run(`${icon} `),
      mono(name, { bold: true, color: C.blue, size: pt(8) }),
      ...(badge
        ? [
            run('\t'),
            run(` ${badge} `, {
              bold: true,
              color: C.blue,
              size: pt(6.5),
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.blueBg },
            }),
          ]
        : []),
    ],
  })

const muted = (text: string, size = 7, color = C.text2) =>
  new Paragraph({ keepNext: true, spacing: { after: 30 }, children: [run(text, { size: pt(size), color })] })

const overviewCard = (entry: OverviewEntry) => {
  const width = MAIN_WIDTH - CARD_INDENT
  return card(
    [
      cardTop('📁', entry.name, entry.badge, width),
      muted(`${entry.title} · ${entry.period}`),
      ...(entry.note ? [muted(`👥 ${entry.note}`, 6.5)] : []),
      ...(entry.summary
        ? [new Paragraph({ spacing: { before: 20, after: 40 }, children: [run(entry.summary, { size: pt(7), color: C.text2 })] })]
        : []),
      chips(entry.chips, 30),
    ],
    width,
    entry.featured,
  )
}

const missionCard = (mission: MissionView, tasksLabel: string) => {
  const width = PAGE_WIDTH - CARD_INDENT
  const tags = mission.tags.map((tag) => ({ l: tag, k: tag }))
  return card(
    [
      cardTop('📁', mission.name, mission.badge, width),
      muted(`${mission.title} · ${mission.period}`),
      ...(mission.team ? [muted(`👥 ${mission.team}`, 7)] : []),
      new Paragraph({ spacing: { before: 40, after: 60 }, children: inline(mission.desc, { color: C.text2 }) }),
      ...(mission.tasks.length > 0
        ? [
            new Paragraph({
              keepNext: true,
              spacing: { before: 60, after: 40 },
              children: [mono(tasksLabel.toUpperCase(), { size: pt(6), color: C.text3, bold: true })],
            }),
            ...mission.tasks.map(
              (task) =>
                new Paragraph({
                  numbering: { reference: 'dcv-bullets', level: 0 },
                  spacing: { after: 30 },
                  children: inline(task, { color: C.text2, size: pt(7.5) }),
                }),
            ),
          ]
        : []),
      ...(mission.extra
        ? [new Paragraph({ spacing: { before: 60 }, children: inline(mission.extra, { color: C.text2, size: pt(7.5) }) })]
        : []),
      chips(tags, 80),
    ],
    width,
    mission.featured,
  )
}

// GitHub-style repository listing: optional group header rows, then one row per repository.
const repoList = (groups: { title?: string; blocks: ProjectRow[] }[], icon: string) => {
  const width = PAGE_WIDTH - CARD_INDENT
  const left = Math.round(width * 0.38)
  const right = width - left
  const rows: TableRow[] = []
  for (const group of groups) {
    if (group.title) {
      rows.push(
        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              columnSpan: 2,
              width: { size: width, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.bg2 },
              margins: { top: 40, bottom: 40, left: 140, right: 140 },
              children: [new Paragraph({ children: [mono(group.title.toUpperCase(), { size: pt(6), bold: true, color: C.text3 })] })],
            }),
          ],
        }),
      )
    }
    for (const block of group.blocks) {
      rows.push(
        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              width: { size: left, type: WidthType.DXA },
              margins: { top: 50, bottom: 50, left: 140, right: 100 },
              children: [
                new Paragraph({ children: [run(`${icon} `, { size: pt(7) }), mono(block.repo, { bold: true, color: C.blue, size: pt(7) })] }),
                new Paragraph({ children: [run(block.title, { bold: true, size: pt(7.5) })] }),
              ],
            }),
            new TableCell({
              width: { size: right, type: WidthType.DXA },
              margins: { top: 50, bottom: 50, left: 100, right: 140 },
              children: [new Paragraph({ children: inline(block.text, { color: C.text2, size: pt(7.5) }) })],
            }),
          ],
        }),
      )
    }
  }
  return new Table({
    width: { size: width, type: WidthType.DXA },
    columnWidths: [left, right],
    indent: { size: CARD_INDENT, type: WidthType.DXA },
    borders: {
      top: line(C.border),
      bottom: line(C.border),
      left: line(C.border),
      right: line(C.border),
      insideHorizontal: line(C.border2),
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
    rows,
  })
}

const sidebar = (model: DetailedModel, avatar: Uint8Array) => {
  const { labels } = model
  const label = (text: string) =>
    new Paragraph({ spacing: { before: 140, after: 60 }, children: [run(text, { bold: true, size: pt(7.5) })] })
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new ImageRun({ type: 'png', data: avatar, transformation: { width: 138, height: 138 } })],
    }),
    new Paragraph({ children: [run(model.name, { bold: true, size: pt(15) })] }),
    new Paragraph({ spacing: { before: 40 }, children: [run(model.title, { bold: true, color: C.blue, size: pt(8) })] }),
    new Paragraph({ spacing: { before: 30, after: 60 }, children: [run(model.subtitle, { color: C.text3, size: pt(7) })] }),
    label(labels.about),
    new Paragraph({ spacing: { line: 276 }, children: [run(model.bio, { size: pt(7.5) })] }),
    new Paragraph({ spacing: { before: 120 }, children: [run(`📍  ${model.location}`, { color: C.text2, size: pt(7.5) })] }),
    new Paragraph({ children: [run(`✉  ${model.email}`, { color: C.text2, size: pt(7.5) })] }),
    new Paragraph({ children: [run(`📞  ${model.phone}`, { color: C.text2, size: pt(7.5) })] }),
    label(labels.languages),
    new Paragraph({
      children: model.languages.flatMap((lang) => [
        run(` ${lang.label} `, { size: pt(7), color: C.text2, shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.bg2 } }),
        run(`${lang.level}  `, { size: pt(7), color: C.text3 }),
      ]),
    }),
    label(labels.coreSkills),
    ...model.skills.flatMap((skill) => [
      new Paragraph({
        spacing: { before: 80, after: 20 },
        children: [mono(skill.cat.toUpperCase(), { size: pt(6), bold: true, color: skill.featured ? C.blue : C.text3 })],
      }),
      chips(skill.tags, 0),
    ]),
    label(labels.interests),
    chips(
      model.interests.map((interest) => ({ l: interest, k: 'interest' })),
      0,
    ),
  ]
}

const coverMain = (model: DetailedModel) => [
  sectionHeader(model.labels.overview),
  ...model.overview.flatMap((company) => [
    ...companyRow(company.head, true),
    ...company.entries.flatMap((entry) => [overviewCard(entry), spacer(30)]),
    ...(company.more ? [new Paragraph({ indent: { left: CARD_INDENT }, children: [run('…', { color: C.text3 })] })] : []),
    spacer(60),
  ]),
]

export const buildDetailedDocx = (model: DetailedModel, avatar: Uint8Array): Document => {
  const { labels } = model

  const cover = new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    columnWidths: [SIDE_WIDTH, GAP, MAIN_WIDTH],
    borders: noBorders,
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: SIDE_WIDTH, type: WidthType.DXA }, children: sidebar(model, avatar) }),
          new TableCell({ width: { size: GAP, type: WidthType.DXA }, children: [new Paragraph({ children: [] })] }),
          new TableCell({ width: { size: MAIN_WIDTH, type: WidthType.DXA }, children: coverMain(model) }),
        ],
      }),
    ],
  })

  const timeline = (title: string, head: CompanyHead, content: (Paragraph | Table)[]) => [
    sectionHeader(title),
    ...companyRow(head),
    ...content,
  ]

  const details = [
    ...timeline(labels.vueFocus, model.schneiderWeb.head, [
      missionCard(model.schneiderWeb.mission, labels.tasks),
      subhead(labels.iecaComponents, CARD_INDENT),
      new Paragraph({
        indent: { left: CARD_INDENT },
        spacing: { after: 80 },
        children: inline(model.schneiderWeb.details.intro, { size: pt(7.5) }),
      }),
      repoList(model.schneiderWeb.details.groups, '🧩'),
    ]),
    ...timeline(
      labels.webXpert,
      model.xpert.head,
      model.xpert.missions.flatMap((mission) => [missionCard(mission, labels.tasks), spacer(60)]),
    ),
    ...timeline(labels.industrialAr, model.schneiderAr.head, [missionCard(model.schneiderAr.mission, labels.tasks)]),
    ...timeline(labels.oreka, model.oreka.head, [
      missionCard(model.oreka.overview, labels.tasks),
      subhead(labels.orekaProjects, CARD_INDENT),
      repoList([{ blocks: model.oreka.projects }], '🗂️'),
    ]),
    sectionHeader(labels.personalProjects),
    ...model.personalProjects.flatMap((project) => [
      card(
        [
          new Paragraph({
            keepNext: true,
            children: [
              run(`🛠️ ${project.kind.toUpperCase()}  `, { bold: true, color: C.text3, size: pt(6.5) }),
              ...(project.status
                ? [run(` ${project.status} `, { size: pt(6), color: '2980B9', shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'DCEAF5' } })]
                : []),
            ],
          }),
          new Paragraph({ keepNext: true, children: [run(project.name, { bold: true, color: C.blue, size: pt(8.5) })] }),
          new Paragraph({ children: inline(project.desc, { color: C.text2, size: pt(7.5) }) }),
          chips(
            project.stack.map((tag) => ({ l: tag, k: tag })),
            40,
          ),
        ],
        PAGE_WIDTH,
        false,
        0,
      ),
      spacer(60),
    ]),
    sectionHeader(labels.education),
    ...model.formations.map(
      (formation) =>
        new Paragraph({
          spacing: { after: 40 },
          children: [
            run(`${formation.kind === 'degree' ? '🎓' : '📚'}  `),
            run(formation.title, { bold: true, color: C.blue, size: pt(8) }),
            run(`   ${formation.sub}`, { color: C.text3, size: pt(7) }),
          ],
        }),
    ),
  ]

  const footer = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          mono(`${model.name} · `, { size: pt(6.5), color: C.text3 }),
          new TextRun({ children: [PageNumber.CURRENT], font: MONO, size: pt(6.5), color: C.text3 }),
          mono(' / ', { size: pt(6.5), color: C.text3 }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: MONO, size: pt(6.5), color: C.text3 }),
        ],
      }),
    ],
  })

  return new Document({
    creator: model.name,
    title: `${model.name} · ${labels.document}`,
    styles: { default: { document: { run: { font: BODY, size: pt(8), color: C.text } } } },
    numbering: {
      config: [
        {
          reference: 'dcv-bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 260, hanging: 180 } }, run: { color: C.blue } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: { page: { margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
        children: [cover],
      },
      {
        properties: { page: { margin: { top: MARGIN, bottom: MARGIN + 200, left: MARGIN, right: MARGIN, footer: 300 } } },
        footers: { default: footer },
        children: details,
      },
    ],
  })
}
