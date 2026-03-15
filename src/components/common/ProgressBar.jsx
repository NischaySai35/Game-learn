import React from 'react'
import styles from './ProgressBar.module.css'

export const ProgressBar = ({
  progress = 0,
  variant = 'default',
  animated = true,
  showLabel = true,
  label,
  color,
  height = 'md',
}) => {
  const containerClass = `${styles.progressContainer} ${styles[height]}`
  const barClass = `${styles.progressBar} ${styles[variant]} ${animated ? styles.animated : ''}`

  return (
    <div className={containerClass}>
      <div
        className={barClass}
        style={{
          width: `${Math.min(progress, 100)}%`,
          background: color,
          '--progress-width': `${Math.min(progress, 100)}%`,
        }}
      >
        {showLabel && progress > 10 && (
          <span className={styles.label}>{Math.round(progress)}%</span>
        )}
      </div>
      {label && <span className={styles.labelText}>{label}</span>}
    </div>
  )
}
