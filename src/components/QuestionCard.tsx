import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <>
      <div className="">
        <div className="text-[2rem] font-bold text-center mb-4">
          Quiz App with React JS{" "}
        </div>
        <p className="  text-lg">
          This page is an example of a quiz app with React JS with shadcn ui
          components.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p
            className="mb-4 text-md"
            dangerouslySetInnerHTML={{ __html: question }}
          ></p>
          <RadioGroup value={selectedAnswer} onValueChange={onAnswerSelect}>
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={answer} id={`answer-${index}`} />
                <Label
                  htmlFor={`answer-${index}`}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  className="text-md text-justify"
                ></Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </>
  );
}
