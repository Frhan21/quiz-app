import { Progress } from "@/components/ui/progress"

type ProgressBarProps = {
  currentQuestion: number;
  totalQuestions: number;
}

export function ProgressBar({ currentQuestion, totalQuestions }: ProgressBarProps) {
  return (
    <Progress value={(currentQuestion + 1) / totalQuestions * 100} className="w-full" />
  )
}