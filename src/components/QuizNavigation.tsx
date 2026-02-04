import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type QuizNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export function QuizNavigation({
  onPrevious,
  onNext,
  isFirstQuestion,
  isLastQuestion
}: QuizNavigationProps) {
  return (
    <div className="flex gap-4 justify-between">
      <Button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className="flex-1 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <ChevronLeft size={20} />
        Previous
      </Button>
      <Button
        onClick={onNext}
        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLastQuestion ? 'Finish' : 'Next'}
        <ChevronRight size={20} />
      </Button>
    </div>
  )
}
