import { Progress } from "@/components/ui/progress"

type ProgressBarProps = {
  currentQuestion: number;
  totalQuestions: number;
}

export function ProgressBar({ currentQuestion, totalQuestions }: ProgressBarProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">
          Question {currentQuestion + 1} of {totalQuestions}
        </h3>
        <span className="text-slate-400 text-sm">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="w-full h-2" />
    </div>
  )
}
