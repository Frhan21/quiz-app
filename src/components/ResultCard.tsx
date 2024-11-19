import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ResultCardProps = {
  score: number;
  totalQuestions: number;
  questions: Array<{
    question: string;
    correct_answer: string;
  }>;
  userAnswers: string[];
  onRestart: () => void;
};

export function ResultCard({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRestart,
}: ResultCardProps) {
  return (
    <>
      <div className="text-2xl">
        Quiz Results
        <p className="text-2xl font-bold text-center mb-4">
          Your score: {score} out of {totalQuestions}
        </p>
        <Button
          onClick={onRestart}
          className="w-[10em] text-white text-center mb-4 bg-black py-2 px-4 border-2 border-black hover:bg-white hover:text-black hover:shadow-xl"
        >
          Restart Quiz
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {questions.map((question, index) => (
          <Card
            key={index}
            className="w-full md:w-1/3 flex flex-col shadow-xl border-black border-2"
          >
            <CardHeader>
              <CardTitle>Quiz no {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <p
                  className="font-semibold mb-2"
                  dangerouslySetInnerHTML={{ __html: question.question }}
                ></p>
                <p className="text-white bg-green-800 rounded-full px-2 py-1 mb-2">
                  Correct answer: {question.correct_answer}
                </p>
                <p
                  className={
                    userAnswers[index] === question.correct_answer
                      ? "text-white bg-green-800 rounded-full px-2 py-1"
                      : "text-white bg-red-800 rounded-full px-2 py-1"
                  }
                >
                  Your answer: {userAnswers[index] || "Not answered"}
                </p>
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
