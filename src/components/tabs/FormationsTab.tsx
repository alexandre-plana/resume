import { memo, useMemo, useState } from 'react'
import type { Formation, FormationKind } from '../../types'
import type { Language, Translations } from '../../locales'
import { matchAsyncViewState, type AsyncViewState } from '../../types/asyncViewState'
import styles from '../../App.module.css'

type FormationSort = 'date' | 'name'

interface FormationsTabProps {
  state: AsyncViewState<Formation[]>
  language: Language
  t: Translations
}

const cleanFormationLabel = (rawLabel: string): string => rawLabel.replace(/^📌\s*/, '').trim()

const getFormationLabelMeta = (kind: FormationKind, rawLabel: string): { icon: string; text: string } => {
  const text = cleanFormationLabel(rawLabel)

  if (kind === 'degree') {
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

function FormationsTabComponent({ state, language, t }: FormationsTabProps) {
  const [formationSort, setFormationSort] = useState<FormationSort>('date')
  const [formationTypeFilters, setFormationTypeFilters] = useState<Record<FormationKind, boolean>>({
    training: true,
    degree: true,
  })

  const toggleFormationType = (kind: FormationKind) => {
    setFormationTypeFilters((prev) => ({ ...prev, [kind]: !prev[kind] }))
  }

  const visibleFormation = useMemo(() => {
    const formation = state.status === 'ready' ? state.data : []
    const collator = new Intl.Collator(language === 'fr' ? 'fr' : 'en', { sensitivity: 'base' })

    return formation
      .filter((form) => formationTypeFilters[form.kind])
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
  }, [state, formationSort, formationTypeFilters, language])

  return matchAsyncViewState(state, {
    loading: () => <div className={styles.formationEmpty}>{t.common.loading}</div>,
    error: ({ message }) => <div className={styles.formationEmpty}>{message}</div>,
    ready: () => {
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
              checked={formationTypeFilters.training}
              onChange={() => toggleFormationType('training')}
            />
            {t.formationControls.training}
          </label>
          <label className={styles.formationFilterItem}>
            <input
              type="checkbox"
              checked={formationTypeFilters.degree}
              onChange={() => toggleFormationType('degree')}
            />
            {t.formationControls.degree}
          </label>
        </div>
      </div>
      <div className={styles.formationGrid}>
        {visibleFormation.map((form) => {
          const formLabelMeta = getFormationLabelMeta(form.kind, form.label)

          return (
            <div key={form.id} className={styles.formationCard}>
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
    },
  })
}

export const FormationsTab = memo(FormationsTabComponent)
