import { formatDistanceToNow } from '../lib/dateUtils'

type QuizResult = {
  id: string
  category: string
  score: number
  totalQuestions: number
  date: string
  difficulty: string
  timeSpent: number
}

type QuizHistoryCardProps = {
  result: QuizResult
}

export function QuizHistoryCard({ result }: QuizHistoryCardProps) {
  const scorePercentage = Math.round((result.score / result.totalQuestions) * 100)
  const scoreColor = scorePercentage >= 80 ? 'text-green-400' : scorePercentage >= 60 ? 'text-yellow-400' : 'text-red-400'
  
  const difficultyBadgeColor = {
    easy: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    hard: 'bg-red-500/20 text-red-400',
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-3xl">📝</div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">{result.category}</h3>
            <p className="text-slate-400 text-sm">
              {formatDistanceToNow(new Date(result.date))} • {Math.round(result.timeSpent / 60)} minutes
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${difficultyBadgeColor[result.difficulty as keyof typeof difficultyBadgeColor] || 'bg-slate-600 text-slate-300'}`}>
            {result.difficulty}
          </span>
          
          <div className="text-right">
            <p className={`text-lg font-bold ${scoreColor}`}>
              {result.score}/{result.totalQuestions}
            </p>
            <p className="text-slate-400 text-sm">{scorePercentage}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
