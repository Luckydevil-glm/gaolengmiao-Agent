'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Store, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import Logo from '@/components/Logo'

export default function RoleSelectPage() {
  const router = useRouter()
  const { user, setRole } = useUserStore()
  const [selectedRole, setSelectedRole] = useState<'demand' | 'supply' | null>(null)
  const [loading, setLoading] = useState(false)

  if (!user) {
    router.push('/login')
    return null
  }

  const handleConfirm = async () => {
    if (!selectedRole) return
    
    setLoading(true)
    
    // 模拟保存角色
    setTimeout(() => {
      setRole(selectedRole)
      setLoading(false)
      
      // 根据角色跳转不同页面
      if (selectedRole === 'demand') {
        router.push('/')
      } else {
        router.push('/supply/dashboard')
      }
    }, 500)
  }

  const handleSkip = () => {
    // 跳过选择，默认设为需求方
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">选择你的角色</h2>
            <p className="mt-2 text-gray-600">
              你好，{user.nickname}！请选择你想要的身份，你可以随时切换
            </p>
          </div>

          {/* 角色选择卡片 */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 需求方 */}
            <div
              onClick={() => setSelectedRole('demand')}
              className={`relative p-6 bg-white rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedRole === 'demand'
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {selectedRole === 'demand' && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <User className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">需求方</h3>
              <p className="text-gray-600 text-sm mb-4">
                购买现成 AI Agent 或发布定制需求，让开发者为你打造专属 AI 助手
              </p>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  浏览 & 购买 AI Agent
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  发布定制需求
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  管理订单 & 消息
                </li>
              </ul>
            </div>

            {/* 生产方 */}
            <div
              onClick={() => setSelectedRole('supply')}
              className={`relative p-6 bg-white rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedRole === 'supply'
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-gray-200 hover:border-primary/50'
              }`}
            >
              {selectedRole === 'supply' && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Store className="w-7 h-7 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">生产方</h3>
              <p className="text-gray-600 text-sm mb-4">
                发布你的 AI Agent 产品，或承接定制需求，在高冷喵赚取收益
              </p>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  发布 & 销售 AI Agent
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  承接定制需求
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  收入管理 & 提现
                </li>
              </ul>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSkip}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              暂不选择
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedRole || loading}
              className={`flex-1 btn-primary py-3 px-6 flex items-center justify-center ${
                !selectedRole ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  确认中...
                </span>
              ) : (
                <>
                  确认选择
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            提示：你可以在个人中心随时切换角色
          </p>
        </div>
      </main>
    </div>
  )
}
