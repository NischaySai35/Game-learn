import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GameProvider, useGame } from './context/GameContext'
import { Header } from './components/Header'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import Onboarding from './pages/Onboarding/Onboarding'
import CourseDetail from './pages/Course/CourseDetail'
import MazeTopic from './pages/Maze/MazeTopic'
import Quiz from './pages/Quiz/Quiz'
import Marketplace from './pages/Marketplace/Marketplace'
import Login from './pages/Auth/Login'
import './App.module.css'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useGame()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

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
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
              <Route path="/course/:id" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
              <Route path="/course/:courseId/topic/:topicId" element={<ProtectedRoute><MazeTopic /></ProtectedRoute>} />
              <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
              <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.main>
        </div>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
