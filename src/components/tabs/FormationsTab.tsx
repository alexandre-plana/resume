import { memo, useMemo, useState } from 'react'
import type { Formation } from '../../types'
import type { Language, Translations } from '../../locales'
import styles from '../../App.module.css'

type FormationKind = 'formation' | 'diplome' | 'projetPerso'
type FormationSort = 'date' | 'name'

interface FormationsTabProps {
  formation: Formation[] | undefined
  isLoading: boolean
  isError: boolean
  errorMessage: string
  language: Language
  t: Translations
}

const cleanFormationLabel = (rawLabel: string): string => rawLabel.replace(/^📌\s*/, '').trim()

const getFormationKind = (rawLabel: string): FormationKind => {
  const normalized = cleanFormationLabel(rawLabel).toLowerCase()

  if (normalized.includes('projet') || normalized.includes('personal')) {
    return 'projetPerso'
  }

  if (normalized.includes('dipl') || normalized.includes('degree') || normalized.includes('bachelor')) {
    return 'diplome'
  }

  return 'formation'
}

const getFormationLabelMeta = (rawLabel: string): { icon: string; text: string } => {
  const text = cleanFormationLabel(rawLabel)
  const kind = getFormationKind(rawLabel)

  if (kind === 'projetPerso') {
    return { icon: '🧩', text }
  }

  if (kind === 'diplome') {
    return { icon: '🎓', text }
  }

  return { icon: '📚', text }
}

const getFormationSortYear = (sub: string): number => {
  const yearMatches = sub.match(/\b(?:19|20)\d{2}\b/g)
  if (!yearMatches || yearMatches.length === 0) {
    return 0
  }

  return Math.max(...yearMatches.map((year) => Number(year)))
}

function FormationsTabComponent({ formation, isLoading, isError, errorMessage, language, t }: FormationsTabProps) {
  const [formationSort, setFormationSort] = useState<FormationSort>('date')
  const [formationTypeFilters, setFormationTypeFilters] = useState<Record<FormationKind, boolean>>({
    formation: true,
    diplome: true,
    projetPerso: true,
  })

  const toggleFormationType = (kind: FormationKind) => {
    setFormationTypeFilters((prev) => ({ ...prev, [kind]: !prev[kind] }))
  }

  const visibleFormation = useMemo(() => {
    if (!formation) {
      return []
    }

    const collator = new Intl.Collator(language === 'fr' ? 'fr' : 'en', { sensitivity: 'base' })

    return formation
      .filter((form) => formationTypeFilters[getFormationKind(form.label)])
      .slice()
      .sort((a, b) => {
        if (formationSort === 'name') {
          return collator.compare(a.title, b.title)
        }

        const yearDiff = getFormationSortYear(b.sub) - getFormationSortYear(a.sub)
        if (yearDiff !== 0) {
          return yearDiff
        }

        return collator.compare(a.title, b.title)
      })
  }, [formation, formationSort, formationTypeFilters, language])

  if (isLoading) {
    return <div className={styles.formationEmpty}>{t.common.loading}</div>
  }

  if (isError) {
    return <div className={styles.formationEmpty}>{errorMessage}</div>
  }

  return (
    <div className={styles.formationsSection}>
      <div className={styles.formationControls}>
        <div className={styles.formationSortGroup}>
          <label className={styles.formationControlLabel} htmlFor="formation-sort">
            {t.formationControls.sortBy}
          </label>
          <select
            id="formation-sort"
            className={styles.formationSortSelect}
            value={formationSort}
            onChange={(event) => setFormationSort(event.target.value as FormationSort)}
          >
            <option value="date">{t.formationControls.sortDate}</option>
            <option value="name">{t.formationControls.sortName}</option>
          </select>
        </div>

        <div className={styles.formationFilters}>
          <span className={styles.formationControlLabel}>{t.formationControls.types}</span>
          <label className={styles.formationFilterItem}>
            <input
              type="checkbox"
              checked={formationTypeFilters.formation}
              onChange={() => toggleFormationType('formation')}
            />
            {t.formationControls.training}
          </label>
          <label className={styles.formationFilterItem}>
            <input
              type="checkbox"
              checked={formationTypeFilters.diplome}
              onChange={() => toggleFormationType('diplome')}
            />
            {t.formationControls.degree}
          </label>
          <label className={styles.formationFilterItem}>
            <input
              type="checkbox"
              checked={formationTypeFilters.projetPerso}
              onChange={() => toggleFormationType('projetPerso')}
            />
            {t.formationControls.personalProject}
          </label>
        </div>
      </div>
      <div className={styles.formationGrid}>
        {visibleFormation.map((form, idx) => {
          const formLabelMeta = getFormationLabelMeta(form.label)

          return (
            <div key={idx} className={styles.formationCard}>
              <div className={styles.formLabel}>
                <span className={styles.formLabelIcon} aria-hidden="true">
                  {formLabelMeta.icon}
                </span>
                {formLabelMeta.text}
              </div>
              <div className={styles.formTitle}>{form.title}</div>
              <div className={styles.formSubtitle}>{form.sub}</div>
              <div className={styles.formMeta}>{form.meta}</div>
            </div>
          )
        })}
        {visibleFormation.length === 0 && <div className={styles.formationEmpty}>{t.formationControls.empty}</div>}
      </div>
    </div>
  )
}

export const FormationsTab = memo(FormationsTabComponent)
