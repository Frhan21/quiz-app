import { useState } from 'react'
import './App.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProfilePage } from './pages/ProfilePage'
import Quiz from './Quiz'

type PageType = 'login' | 'dashboard' | 'quiz' | 'profile'

function AppContent() {
  const { user, isLoading } = useAuth()
  const [currentPage, setCurrentPage] = useState<PageType>('login')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  switch (currentPage) {
    case 'dashboard':
      return (
        <DashboardPage
          onStartQuiz={() => setCurrentPage('quiz')}
          onViewProfile={() => setCurrentPage('profile')}
        />
      )
    case 'quiz':
      return <Quiz onBack={() => setCurrentPage('dashboard')} />
    case 'profile':
      return <ProfilePage onBack={() => setCurrentPage('dashboard')} />
    default:
      return (
        <DashboardPage
          onStartQuiz={() => setCurrentPage('quiz')}
          onViewProfile={() => setCurrentPage('profile')}
        />
      )
  }
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
