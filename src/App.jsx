import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GameProvider } from './context/GameContext'
import { Header } from './components/Header'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import './App.module.css'

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <motion.main
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </motion.main>
        </div>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
