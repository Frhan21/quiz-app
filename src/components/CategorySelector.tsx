import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Category = {
  id: number;
  name: string;
};

type CategorySelectorProps = {
  categories: Category[];
  onCategorySelect: (categoryId: number) => void;
  onStartQuiz: () => void;
};

export function CategorySelector({
  categories,
  onCategorySelect,
  onStartQuiz,
}: CategorySelectorProps) {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center">
        <div className="text-[2rem] font-bold text-center mb-4">Quiz App with React JS </div>
        <p className="w-1/3 text-lg">This page is an example of a quiz app with React JS with shadcn ui components.</p>
        <Card className="w-[350px] mx-auto mt-4 bg-white shadow-lg border-2 border-black items-center">
          <CardHeader>
            <CardTitle>Select Quiz Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={onStartQuiz}
              className="w-full bg-black text-white"
            >
              Start Quiz
            </Button>
            <Select onValueChange={(value) => onCategorySelect(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
