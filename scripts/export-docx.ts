// Word export of the detailed CV, from the same model as print-detailed.html.
// Run with `npm run export:docx [fr] [en]`; files land in public/docx/.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { Packer } from 'docx'
import type { Language } from '../src/locales'
import { buildDetailedModel } from '../src/print/detailed'
import { buildDetailedDocx } from '../src/print/detailedDocx'

const requested = process.argv.slice(2).filter((arg): arg is Language => arg === 'fr' || arg === 'en')
const languages: Language[] = requested.length > 0 ? requested : ['fr', 'en']

const outDir = resolve('public', 'docx')
mkdirSync(outDir, { recursive: true })
const avatar = readFileSync(resolve('src', 'Avatar.png'))

for (const language of languages) {
  const document = buildDetailedDocx(buildDetailedModel(language), avatar)
  const output = join(outDir, `cv-alexandre-plana-detaille-${language}.docx`)
  writeFileSync(output, await Packer.toBuffer(document))
  console.log(`[${language}] ${output}`)
}
