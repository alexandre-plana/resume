import { execFile } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { mkdtemp } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { createServer } from 'vite'

// Async on purpose: the Vite server lives in this process and must keep serving while the browser runs.
const run = (file, args) =>
  promisify(execFile)(file, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 60000 }).catch((error) => error)

const languages = process.argv.slice(2).filter((arg) => arg === 'fr' || arg === 'en')
const targets = languages.length > 0 ? languages : ['fr']

const browserCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)

const browser = browserCandidates.find((path) => existsSync(path))
if (!browser) {
  console.error('Aucun navigateur Chromium trouvé. Définissez CHROME_PATH.')
  process.exit(1)
}

// Served as static files by the site (public/ is copied to dist/ by Vite).
const outDir = resolve('public', 'pdf')
mkdirSync(outDir, { recursive: true })

// HMR is disabled: its open websocket keeps headless Chromium from ever settling.
const server = await createServer({
  server: { port: 5199, strictPort: false, open: false, hmr: false },
  logLevel: 'error',
})
await server.listen()
const port = server.config.server.port
let failed = false

try {
  for (const lang of targets) {
    const url = `http://localhost:${port}/resume/print.html?lang=${lang}`
    const profile = await mkdtemp(join(tmpdir(), 'cv-pdf-'))
    const common = ['--headless=new', '--disable-gpu', `--user-data-dir=${profile}`, '--virtual-time-budget=10000']

    // The page flags whether its content fits one A4 sheet; refuse to print a clipped CV.
    const dom = await run(browser, [...common, '--dump-dom', url])
    const fit = /data-fit="(\w+)"/.exec(dom.stdout ?? '')?.[1]
    if (fit !== 'ok') {
      console.error(`[${lang}] La page ne tient pas sur une feuille A4 (état : ${fit ?? 'inconnu'}).`)
      if (!fit) console.error(`navigateur : ${dom.message ?? dom.stderr?.slice(0, 400)}`)
      failed = true
      continue
    }

    const output = join(outDir, `cv-alexandre-plana-${lang}.pdf`)
    const print = await run(browser, [...common, '--no-pdf-header-footer', `--print-to-pdf=${output}`, url])
    if (!existsSync(output)) {
      console.error(`[${lang}] Export PDF échoué.\n${print.stderr}`)
      failed = true
      continue
    }
    console.log(`[${lang}] ${output}`)
  }
} finally {
  await server.close()
}

process.exit(failed ? 1 : 0)
