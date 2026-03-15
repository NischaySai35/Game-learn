import React from 'react'
import styles from './Badge.module.css'

export const Badge = ({ children, variant = 'default', icon, ...props }) => {
  return (
    <span className={`${styles.badge} ${styles[variant]}`} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  )
}
