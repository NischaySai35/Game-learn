import React from 'react'
import { motion } from 'framer-motion'
import { useGame } from '../../context/GameContext'
import { mockMarketplaceItems } from '../../api/mockData'
import styles from './Marketplace.module.css'

export default function Marketplace() {
  const { user, unlockMarketplaceItem } = useGame()

  return (
    <div className={styles.marketPage}>
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={styles.intro}>
        <h1>Skill unlock shop</h1>
        <p>Spend coins to unlock advanced interview packs and role-based content.</p>
      </motion.section>

      <div className={styles.shopGrid}>
        {mockMarketplaceItems.map(item => {
          const unlocked = user.unlockedContent.includes(item.id)
          const canAfford = user.coins >= item.cost
          return (
            <motion.div key={item.id} className={`${styles.card} ${unlocked ? styles.unlocked : ''}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className={styles.bottomRow}>
                <span>{item.cost} Coins</span>
                <button disabled={unlocked || !canAfford} onClick={() => unlockMarketplaceItem(item)}>
                  {unlocked ? 'Unlocked' : canAfford ? 'Unlock' : 'Need more coins'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
