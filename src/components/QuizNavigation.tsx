import { Button } from "@/components/ui/button"

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
    <div className="flex justify-between">
      <Button onClick={onPrevious} disabled={isFirstQuestion} className="bg-black text-white border-2 border-black">
        Previous
      </Button>
      <Button onClick={onNext} className="bg-black text-white border-2 border-black">
        {isLastQuestion ? 'Finish' : 'Next'}
      </Button>
    </div>
  )
}