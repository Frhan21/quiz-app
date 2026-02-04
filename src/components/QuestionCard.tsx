import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type QuestionCardProps = {
  question: string;
  answers: string[];
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
};

export function QuestionCard({
  question,
  answers,
  selectedAnswer,
  onAnswerSelect,
  currentQuestionIndex,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <p
          className="text-lg text-white leading-relaxed"
          dangerouslySetInnerHTML={{ __html: question }}
        ></p>
      </div>

      <RadioGroup value={selectedAnswer} onValueChange={onAnswerSelect}>
        <div className="space-y-3">
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedAnswer === answer
                  ? 'bg-blue-500/20 border-blue-500'
                  : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
              }`}
            >
              <RadioGroupItem value={answer} id={`answer-${index}`} className="mt-1" />
              <Label
                htmlFor={`answer-${index}`}
                className="text-slate-100 text-sm leading-relaxed cursor-pointer flex-1"
                dangerouslySetInnerHTML={{ __html: answer }}
              ></Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
