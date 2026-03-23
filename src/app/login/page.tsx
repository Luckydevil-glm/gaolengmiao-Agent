'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, Phone, ArrowLeft } from 'lucide-react'
import { useUserStore, mockUsers } from '@/stores/userStore'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const login = useUserStore((state) => state.login)
  
  const [formData, setFormData] = useState({
    account: '', // 邮箱或手机号
    password: '',
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.account) {
      setError('请输入邮箱或手机号')
      return
    }
    if (!formData.password) {
      setError('请输入密码')
      return
    }

    setLoading(true)
    
    // 模拟登录请求
    setTimeout(() => {
      // 查找用户（模拟演示账号）
      const user = mockUsers.find(
        u => (u.email === formData.account || u.phone === formData.account) 
      )
      
      // 如果是演示账号，直接登录
      if (user) {
        login(user)
        setLoading(false)
        router.push('/')
        return
      }
      
      // 模拟新用户登录（实际应该验证密码）
      const newUser = {
        id: Date.now().toString(),
        email: formData.account.includes('@') ? formData.account : '',
        phone: formData.account.includes('@') ? '' : formData.account,
        nickname: '用户' + formData.account.slice(-4),
        role: 'demand' as const,
        createdAt: new Date().toISOString().split('T')[0],
      }
      
      login(newUser)
      setLoading(false)
      router.push('/')
    }, 1000)
  }

  const handleDemoLogin = () => {
    const demoUser = mockUsers[0]
    login(demoUser)
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Logo size="sm" />
              <span className="ml-2 text-xl font-bold text-gray-900">高冷喵</span>
            </Link>
            <Link 
              href="/register" 
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              没有账号？立即注册
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">登录账号</h2>
            <p className="mt-2 text-gray-600">欢迎回到高冷喵</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* 账号 */}
              <div>
                <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱 / 手机号 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="account"
                    name="account"
                    type="text"
                    value={formData.account}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="请输入邮箱或手机号"
                  />
                </div>
              </div>

              {/* 密码 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  密码 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field pl-10 pr-10"
                    placeholder="请输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
                {error}
              </div>
            )}

            {/* 记住我 & 忘记密码 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  记住我
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                忘记密码？
              </Link>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  登录中...
                </span>
              ) : (
                '登录'
              )}
            </button>

            {/* 分割线 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">或</span>
              </div>
            </div>

            {/* 演示账号登录 */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              使用演示账号登录
            </button>
          </form>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-1" />
              返回首页
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
