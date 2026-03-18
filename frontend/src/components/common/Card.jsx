import React from 'react'
import styles from './Card.module.css'

export const Card = ({ children, className, variant = 'default', ...props }) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
