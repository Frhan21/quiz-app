import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Category = {
  id: number;
  name: string;
};

type CategorySelectorProps = {
  categories: Category[];
  onCategorySelect: (categoryId: number) => void;
  onStartQuiz: () => void;
  selectedCategory?: number | null;
  selectedDifficulty?: string;
  onDifficultyChange?: (difficulty: string) => void;
};

export function CategorySelector({
  categories,
  onCategorySelect,
  onStartQuiz,
  selectedCategory,
  selectedDifficulty = 'medium',
  onDifficultyChange,
}: CategorySelectorProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Select Your Quiz</h1>
        <p className="text-slate-400">Choose a category and difficulty level to get started</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-xl">
        {/* Category Selection */}
        <div className="mb-6">
          <label className="block text-white font-semibold mb-3">Category</label>
          <Select onValueChange={(value) => onCategorySelect(Number(value))} value={selectedCategory?.toString() || ""}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-8">
          <label className="block text-white font-semibold mb-3">Difficulty</label>
          <Select value={selectedDifficulty} onValueChange={(value) => onDifficultyChange?.(value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Choose difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStartQuiz}
          disabled={!selectedCategory}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
        >
          Start Quiz
        </Button>
      </div>

      {/* Category Grid */}
      <div className="mt-12">
        <h3 className="text-white font-semibold mb-4">Browse All Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.slice(0, 9).map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`p-4 rounded-lg text-left text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
