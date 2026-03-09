import React, { useEffect, useState } from 'react'
import styles from './ContribGraph.module.css'

const COLORS = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
const BORDERS = ['1px solid #d0d7de', 'none', 'none', 'none', 'none']
const LEVELS = [0, 0, 0, 0, 1, 1, 2, 2, 3, 4]

export const ContribGraph: React.FC<{ contributions: number }> = ({ contributions }) => {
  const [weeks, setWeeks] = useState<number[][]>([])

  useEffect(() => {
    const weeksData: number[][] = []
    for (let w = 0; w < 52; w++) {
      const week: number[] = []
      for (let d = 0; d < 7; d++) {
        const level = LEVELS[Math.floor(Math.random() * LEVELS.length)]
        week.push(level)
      }
      weeksData.push(week)
    }
    setWeeks(weeksData)
  }, [])

  return (
    <div className={styles.contrib}>
      <div className={styles.header}>
        <strong>{contributions.toLocaleString()}</strong> contributions in the last year — majoritairement web (Vue, TS, JS)
      </div>
      <div className={styles.grid}>
        {weeks.map((week, wIdx) => (
          <div key={wIdx} className={styles.week}>
            {week.map((level, dIdx) => (
              <div
                key={`${wIdx}-${dIdx}`}
                className={styles.day}
                style={{
                  background: COLORS[level],
                  border: BORDERS[level],
                }}
                title={`${level} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <span>Less</span>
        <div className={styles.legendItems}>
          {COLORS.map((color, idx) => (
            <div
              key={idx}
              className={styles.legendItem}
              style={{
                background: color,
                border: BORDERS[idx],
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
