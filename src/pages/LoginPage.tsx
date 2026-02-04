import { useAuth } from '../contexts/AuthContext'
import { Github, Mail } from 'lucide-react'

export function LoginPage() {
  const { loginWithGoogle, loginWithGithub } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-500/20 rounded-lg mb-4">
            <div className="text-3xl font-bold text-blue-400">📚</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">QuizMaster</h1>
          <p className="text-slate-400">Master your knowledge with interactive quizzes</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-8">Welcome Back</h2>

          {/* Google Login */}
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-semibold py-3 px-4 rounded-lg transition-colors mb-4 border border-slate-200"
          >
            <Mail size={20} />
            Continue with Google
          </button>

          {/* GitHub Login */}
          <button
            onClick={loginWithGithub}
            className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors border border-slate-600"
          >
            <Github size={20} />
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Or continue as guest</span>
            </div>
          </div>

          {/* Guest Login */}
          <button
            onClick={() => {
              // For demo purposes - this would be handled differently in production
              console.log('Guest login not implemented yet')
            }}
            className="w-full bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 font-semibold py-3 px-4 rounded-lg transition-colors border border-slate-600"
          >
            Skip for Now
          </button>

          {/* Footer */}
          <p className="text-center text-slate-500 text-sm mt-6">
            By signing in, you agree to our Terms of Service
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-xs text-slate-400">Diverse Topics</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-xs text-slate-400">Track Progress</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🏆</div>
            <p className="text-xs text-slate-400">Compete & Win</p>
          </div>
        </div>
      </div>
    </div>
  )
}
