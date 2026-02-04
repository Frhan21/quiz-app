import { useAuth } from '../contexts/AuthContext'
import { LogOut, Plus } from 'lucide-react'
import { StatisticsCard } from '../components/StatisticsCard'
import { QuizHistoryCard } from '../components/QuizHistoryCard'
import { AnalyticsChart } from '../components/AnalyticsChart'

type DashboardPageProps = {
  onStartQuiz: () => void
  onViewProfile: () => void
}

export function DashboardPage({ onStartQuiz, onViewProfile }: DashboardPageProps) {
  const { user, logout, quizResults, getStatistics } = useAuth()
  const stats = getStatistics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-blue-400">📚 QuizMaster</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onViewProfile}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                <img
                  src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                {user?.name}
              </button>
              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-400">Here's your learning progress</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatisticsCard
            title="Total Quizzes"
            value={stats.totalQuizzes}
            icon="📝"
            trend="completed"
          />
          <StatisticsCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon="📊"
            trend="active"
          />
          <StatisticsCard
            title="Best Score"
            value={`${stats.bestScore}%`}
            icon="🏆"
            trend="record"
          />
          <StatisticsCard
            title="Total Time"
            value={`${Math.round(stats.totalTimeSpent / 60)}m`}
            icon="⏱️"
            trend="active"
          />
        </div>

        {/* Charts and History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Analytics Chart */}
          <div className="lg:col-span-2">
            <AnalyticsChart results={quizResults} />
          </div>

          {/* Start Quiz Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready for a Challenge?</h3>
              <p className="text-blue-100">Start a new quiz and test your knowledge across different topics.</p>
            </div>
            <button
              onClick={onStartQuiz}
              className="mt-6 bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Start New Quiz
            </button>
          </div>
        </div>

        {/* Recent History */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Quiz History</h2>
          <div className="space-y-3">
            {quizResults.length > 0 ? (
              quizResults.slice(0, 5).map((result) => (
                <QuizHistoryCard key={result.id} result={result} />
              ))
            ) : (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
                <p className="text-slate-400">No quizzes taken yet. Start your first quiz to see your history!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
