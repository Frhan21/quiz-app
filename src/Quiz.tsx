import { useState, useEffect } from 'react'
import { QuestionCard } from './components/QuestionCard'
import { ResultCard } from './components/ResultCard'
import { ProgressBar } from './components/ProgressBar'
import { QuizNavigation } from './components/QuizNavigation'
import { CategorySelector } from './components/CategorySelector'

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

export default function QuizApp() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)

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
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&type=multiple`)
      const data = await response.json()
      const quizQuestions: QuizQuestion[] = data.results.map((q: Question) => ({
        ...q,
        all_answers: shuffleArray([...q.incorrect_answers, q.correct_answer])
      }))
      setQuestions(quizQuestions)
      setUserAnswers(new Array(data.results.length).fill(''))
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
    setQuestions([])
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setShowResult(false)
    setScore(0)
    setQuizStarted(false)
    setSelectedCategory(null)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!quizStarted) {
    return (
      <CategorySelector
        categories={categories}
        onCategorySelect={handleCategorySelect}
        onStartQuiz={handleStartQuiz}
      />
    )
  }

  if (showResult) {
    return (
      <ResultCard
        score={score}
        totalQuestions={questions.length}
        questions={questions}
        userAnswers={userAnswers}
        onRestart={restartQuiz}
      />
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="w-[350px] mx-auto mt-10 space-y-4">
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
  )
}