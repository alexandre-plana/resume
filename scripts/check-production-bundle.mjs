import { readFile, stat } from 'node:fs/promises'
import { basename, resolve } from 'node:path'

const distDir = resolve('dist')
const indexPath = resolve(distDir, 'index.html')
const referenceSizeKb = 574.49
const ooxmlMarkers = [
  'word/document.xml',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const fail = (message) => {
  console.error(`Bundle check failed: ${message}`)
  process.exitCode = 1
}

let html
try {
  html = await readFile(indexPath, 'utf8')
} catch {
  fail(`initial chunk absent (unable to read ${indexPath})`)
}

if (html) {
  const scriptMatch = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/i)
  if (!scriptMatch) {
    fail('initial chunk absent (no module script in dist/index.html)')
  } else {
    const initialChunkPath = resolve(distDir, 'assets', basename(scriptMatch[1]))
    let source
    try {
      source = await readFile(initialChunkPath, 'utf8')
    } catch {
      fail(`initial chunk absent (${initialChunkPath} does not exist)`)
    }

    if (source) {
      const fileStats = await stat(initialChunkPath)
      const sizeKb = fileStats.size / 1024
      console.log(`initial chunk: ${basename(initialChunkPath)} (${sizeKb.toFixed(2)} kB)`)

      const foundMarker = ooxmlMarkers.find((marker) => source.includes(marker))
      if (foundMarker) {
        fail(`docx marker found: ${foundMarker}`)
      } else {
        console.log('docx markers: absent')
      }

      if (sizeKb >= referenceSizeKb) {
        fail(`initial chunk is ${sizeKb.toFixed(2)} kB; expected less than ${referenceSizeKb.toFixed(2)} kB`)
      }
    }
  }
}
