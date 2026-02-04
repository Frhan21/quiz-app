import { useState, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import { QuestionCard } from './components/QuestionCard'
import { ResultCard } from './components/ResultCard'
import { ProgressBar } from './components/ProgressBar'
import { QuizNavigation } from './components/QuizNavigation'
import { CategorySelector } from './components/CategorySelector'
import { ArrowLeft } from 'lucide-react'

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

type QuizQuestion = Question & {
  all_answers: string[];
}

type Category = {
  id: number;
  name: string;
}

type QuizPageProps = {
  onBack: () => void
}

export default function QuizPage({ onBack }: QuizPageProps) {
  const { addQuizResult } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium')
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php')
      const data = await response.json()
      setCategories(data.trivia_categories)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setLoading(false)
    }
  }

  const fetchQuestions = async () => {
    if (!selectedCategory) return

    setLoading(true)
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`)
      const data = await response.json()
      const quizQuestions: QuizQuestion[] = data.results.map((q: Question) => ({
        ...q,
        all_answers: shuffleArray([...q.incorrect_answers, q.correct_answer])
      }))
      setQuestions(quizQuestions)
      setUserAnswers(new Array(data.results.length).fill(''))
      setStartTime(Date.now())
      setLoading(false)
      setQuizStarted(true)
    } catch (error) {
      console.error('Error fetching questions:', error)
      setLoading(false)
    }
  }

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId)
    const category = categories.find(c => c.id === categoryId)
    if (category) {
      setSelectedCategoryName(category.name)
    }
  }

  const handleStartQuiz = () => {
    if (selectedCategory) {
      fetchQuestions()
    }
  }

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateScore()
      setShowResult(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let newScore = 0
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correct_answer) {
        newScore++
      }
    }
    setScore(newScore)
  }

  const restartQuiz = () => {
    // Save quiz result to context
    const timeSpent = (Date.now() - startTime) / 1000
    addQuizResult({
      id: '',
      category: selectedCategoryName,
      score,
      totalQuestions: questions.length,
      date: new Date().toISOString(),
      difficulty: selectedDifficulty,
      timeSpent,
    })

    setQuestions([])
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setShowResult(false)
    setScore(0)
    setQuizStarted(false)
    setSelectedCategory(null)
  }

  if (loading && !quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="text-4xl mb-4">⏳</div>
          </div>
          <p className="text-white">Loading quiz categories...</p>
        </div>
      </div>
    )
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <CategorySelector
            categories={categories}
            onCategorySelect={handleCategorySelect}
            onStartQuiz={handleStartQuiz}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <ResultCard
            score={score}
            totalQuestions={questions.length}
            questions={questions}
            userAnswers={userAnswers}
            onRestart={restartQuiz}
            onBack={onBack}
          />
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <ProgressBar
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
        />
        <QuestionCard
          question={currentQuestion.question}
          answers={currentQuestion.all_answers}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
        <QuizNavigation
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  )
}
