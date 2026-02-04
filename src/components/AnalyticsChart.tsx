type QuizResult = {
  id: string
  category: string
  score: number
  totalQuestions: number
  date: string
  difficulty: string
  timeSpent: number
}

type AnalyticsChartProps = {
  results: QuizResult[]
}

export function AnalyticsChart({ results }: AnalyticsChartProps) {
  // Group results by category and calculate statistics
  const categoryStats = results.reduce((acc, result) => {
    const existing = acc.find(s => s.category === result.category)
    const scorePercentage = Math.round((result.score / result.totalQuestions) * 100)
    
    if (existing) {
      existing.attempts += 1
      existing.scores.push(scorePercentage)
      existing.average = Math.round(existing.scores.reduce((a, b) => a + b, 0) / existing.scores.length)
    } else {
      acc.push({
        category: result.category,
        attempts: 1,
        scores: [scorePercentage],
        average: scorePercentage,
      })
    }
    return acc
  }, [] as Array<{ category: string; attempts: number; scores: number[]; average: number }>)

  // Sort by attempts
  const topCategories = categoryStats.sort((a, b) => b.attempts - a.attempts).slice(0, 6)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Performance by Category</h3>
      
      {topCategories.length > 0 ? (
        <div className="space-y-4">
          {topCategories.map((stat) => (
            <div key={stat.category}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-slate-300">{stat.category}</h4>
                <span className="text-xs text-slate-400">{stat.average}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    stat.average >= 80 ? 'bg-green-500' : 
                    stat.average >= 60 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${stat.average}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{stat.attempts} attempt{stat.attempts > 1 ? 's' : ''}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-400">No quiz data yet. Start a quiz to see your analytics!</p>
        </div>
      )}
    </div>
  )
}
