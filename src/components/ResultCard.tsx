import { Button } from "@/components/ui/button";

type ResultCardProps = {
  score: number;
  totalQuestions: number;
  questions: Array<{
    question: string;
    correct_answer: string;
  }>;
  userAnswers: string[];
  onRestart: () => void;
  onBack: () => void;
};

export function ResultCard({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRestart,
  onBack,
}: ResultCardProps) {
  const scorePercentage = Math.round((score / totalQuestions) * 100)
  const performanceMessage = scorePercentage >= 80 ? '🎉 Outstanding!' : scorePercentage >= 60 ? '👍 Good job!' : '💪 Keep practicing!'

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
        <div className="text-6xl font-bold mb-4">{scorePercentage}%</div>
        <p className="text-2xl mb-2">{performanceMessage}</p>
        <p className="text-blue-100">You got {score} out of {totalQuestions} correct</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={onRestart}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Try Another Quiz
        </Button>
        <Button
          onClick={onBack}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Back to Dashboard
        </Button>
      </div>

      {/* Detailed Results */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Detailed Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((question, index) => {
            const isCorrect = userAnswers[index] === question.correct_answer
            return (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 ${
                  isCorrect
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-red-500/10 border-red-500'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-2xl mt-1">{isCorrect ? '✓' : '✗'}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-2">Question {index + 1}</h4>
                    <p
                      className="text-slate-300 text-sm"
                      dangerouslySetInnerHTML={{ __html: question.question }}
                    ></p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-400">Correct answer:</p>
                    <p className="text-green-400 font-semibold">{question.correct_answer}</p>
                  </div>
                  {!isCorrect && (
                    <div>
                      <p className="text-slate-400">Your answer:</p>
                      <p className="text-red-400 font-semibold">{userAnswers[index] || 'Not answered'}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
