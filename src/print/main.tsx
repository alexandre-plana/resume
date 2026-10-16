import React from 'react'
import ReactDOM from 'react-dom/client'
import type { Language } from '../locales'
import { OnePageCv } from './OnePageCv'
import { buildOnePageModel } from './onePage'

const requested = new URLSearchParams(window.location.search).get('lang')
const language: Language = requested === 'en' ? 'en' : 'fr'
const model = buildOnePageModel(language)

document.title = `${model.name} · CV`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OnePageCv model={model} />
  </React.StrictMode>,
)
