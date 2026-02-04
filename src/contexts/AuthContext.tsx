import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  provider: 'google' | 'github'
  joinedDate: string
}

type QuizResult = {
  id: string
  category: string
  score: number
  totalQuestions: number
  date: string
  difficulty: string
  timeSpent: number
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  loginWithGoogle: () => void
  loginWithGithub: () => void
  logout: () => void
  quizResults: QuizResult[]
  addQuizResult: (result: QuizResult) => void
  getStatistics: () => {
    totalQuizzes: number
    averageScore: number
    bestScore: number
    totalTimeSpent: number
    categoriesAttempted: string[]
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])

  useEffect(() => {
    // Simulate loading saved data from localStorage
    const savedUser = localStorage.getItem('quizapp_user')
    const savedResults = localStorage.getItem('quizapp_results')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedResults) {
      setQuizResults(JSON.parse(savedResults))
    }
    
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (quizResults.length > 0) {
      localStorage.setItem('quizapp_results', JSON.stringify(quizResults))
    }
  }, [quizResults])

  const mockGoogleLogin = () => {
    const newUser: User = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'Alex Johnson',
      email: 'alex@gmail.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      provider: 'google',
      joinedDate: new Date().toISOString().split('T')[0],
    }
    setUser(newUser)
    localStorage.setItem('quizapp_user', JSON.stringify(newUser))
  }

  const mockGithubLogin = () => {
    const newUser: User = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'Sam Developer',
      email: 'sam@github.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      provider: 'github',
      joinedDate: new Date().toISOString().split('T')[0],
    }
    setUser(newUser)
    localStorage.setItem('quizapp_user', JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('quizapp_user')
  }

  const addQuizResult = (result: QuizResult) => {
    const newResult = {
      ...result,
      id: 'result_' + Math.random().toString(36).substr(2, 9),
    }
    setQuizResults([newResult, ...quizResults])
  }

  const getStatistics = () => {
    const stats = {
      totalQuizzes: quizResults.length,
      averageScore: quizResults.length > 0 
        ? Math.round((quizResults.reduce((acc, r) => acc + r.score, 0) / quizResults.length) * 100) / 100
        : 0,
      bestScore: quizResults.length > 0
        ? Math.max(...quizResults.map(r => Math.round((r.score / r.totalQuestions) * 100)))
        : 0,
      totalTimeSpent: quizResults.reduce((acc, r) => acc + r.timeSpent, 0),
      categoriesAttempted: [...new Set(quizResults.map(r => r.category))],
    }
    return stats
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      loginWithGoogle: mockGoogleLogin,
      loginWithGithub: mockGithubLogin,
      logout,
      quizResults,
      addQuizResult,
      getStatistics,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
