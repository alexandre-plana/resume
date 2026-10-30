import React from 'react'
import ReactDOM from 'react-dom/client'
import type { Language } from '../locales'
import { DetailedCv } from './DetailedCv'
import { buildDetailedModel } from './detailed'

const requested = new URLSearchParams(window.location.search).get('lang')
const language: Language = requested === 'en' ? 'en' : 'fr'
const model = buildDetailedModel(language)

document.documentElement.lang = language
document.title = `${model.name} · ${model.labels.document}`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DetailedCv model={model} />
  </React.StrictMode>,
)
