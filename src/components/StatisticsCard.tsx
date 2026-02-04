type StatisticsCardProps = {
  title: string
  value: string | number
  icon: string
  trend?: 'active' | 'completed' | 'record'
}

export function StatisticsCard({ title, value, icon, trend }: StatisticsCardProps) {
  const trendColors = {
    active: 'text-blue-400',
    completed: 'text-green-400',
    record: 'text-purple-400',
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm mb-2">{title}</p>
          <p className={`text-3xl font-bold ${trendColors[trend || 'active']}`}>
            {value}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  )
}
