import { useAuth } from '../contexts/AuthContext'
import { ArrowLeft, LogOut } from 'lucide-react'

type ProfilePageProps = {
  onBack: () => void
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { user, logout, quizResults, getStatistics } = useAuth()
  const stats = getStatistics()

  if (!user) return null

  const handleLogout = () => {
    logout()
    onBack()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <img
                src={user.avatar || 'https://i.pravatar.cc/150?img=1'}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-slate-400 mb-2">{user.email}</p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full font-semibold">
                    {user.provider === 'google' ? 'Google' : 'GitHub'} Account
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                    Joined {new Date(user.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors font-semibold"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-sm text-slate-400 font-semibold mb-2">Total Quizzes Completed</h3>
            <p className="text-4xl font-bold text-blue-400">{stats.totalQuizzes}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-sm text-slate-400 font-semibold mb-2">Average Score</h3>
            <p className="text-4xl font-bold text-green-400">{stats.averageScore}%</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-sm text-slate-400 font-semibold mb-2">Best Score</h3>
            <p className="text-4xl font-bold text-purple-400">{stats.bestScore}%</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-sm text-slate-400 font-semibold mb-2">Total Time Spent</h3>
            <p className="text-4xl font-bold text-yellow-400">{Math.round(stats.totalTimeSpent / 60)}m</p>
          </div>
        </div>

        {/* Categories */}
        {stats.categoriesAttempted.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Categories Attempted</h3>
            <div className="flex flex-wrap gap-2">
              {stats.categoriesAttempted.map((category) => (
                <span key={category} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          {quizResults.length > 0 ? (
            <div className="space-y-3">
              {quizResults.slice(0, 10).map((result) => (
                <div key={result.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{result.category}</p>
                    <p className="text-slate-400 text-sm">{new Date(result.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">{result.score}/{result.totalQuestions}</p>
                    <p className="text-slate-400 text-sm">{Math.round((result.score / result.totalQuestions) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No quiz activity yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
