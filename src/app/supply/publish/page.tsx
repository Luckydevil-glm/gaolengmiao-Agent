'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { useUserStore } from '@/stores/userStore'
import { 
  ArrowLeft, 
  Upload, 
  CheckCircle, 
  Code, 
  Brain, 
  Bot, 
  LineChart, 
  PenTool, 
  Database, 
  Cloud 
} from 'lucide-react'

interface AgentForm {
  name: string
  category: string
  price: string
  description: string
  features: string
  icon: string
}

const iconOptions = [
  { value: 'code', icon: Code, label: '代码开发' },
  { value: 'brain', icon: Brain, label: '智能分析' },
  { value: 'bot', icon: Bot, label: '对话交互' },
  { value: 'chart', icon: LineChart, label: '数据分析' },
  { value: 'pen', icon: PenTool, label: '内容创作' },
  { value: 'database', icon: Database, label: '数据处理' },
  { value: 'cloud', icon: Cloud, label: '云服务' },
]

const categories = [
  { value: '金融', label: '金融领域' },
  { value: '开发', label: '软件开发' },
  { value: '内容', label: '内容创作' },
  { value: '数据', label: '数据分析' },
  { value: '客服', label: '智能客服' },
  { value: '架构', label: '系统架构' },
  { value: '设计', label: 'UI/UX设计' },
  { value: '其他', label: '其他领域' },
]

export default function PublishAgentPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useUserStore()
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState<AgentForm>({
    name: '',
    category: '',
    price: '',
    description: '',
    features: '',
    icon: 'brain',
  })

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'supply') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'supply') {
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      return
    }

    setLoading(true)
    
    // 模拟提交
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 1500)
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">商品发布成功！</h2>
          <p className="text-gray-500 mb-6">你的 AI Agent 已上架到市场</p>
          <div className="flex gap-4 justify-center">
            <Link href="/agents" className="btn-primary">
              查看市场
            </Link>
            <Link href="/supply/dashboard" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              返回后台
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-xl font-bold text-gray-900">高冷喵</span>
            </Link>
            <Link 
              href="/supply/dashboard" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <ArrowLeft size={20} />
              返回
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">发布 AI Agent</h1>
          <p className="text-gray-500 mt-1">创建并发布你的 AI Agent 到市场</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
            
            {/* 商品名称 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                商品名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="例如：金融分析助手Pro"
                className="input-field"
                required
              />
            </div>

            {/* 分类和价格 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  领域分类 <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">请选择领域</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  价格 (元) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="99"
                  className="input-field"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* 图标选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择图标
              </label>
              <div className="grid grid-cols-4 gap-3">
                {iconOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, icon: opt.value }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.icon === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <opt.icon className={`w-6 h-6 mx-auto ${formData.icon === opt.value ? 'text-primary' : 'text-gray-600'}`} />
                    <span className="text-xs text-gray-500 mt-1 block">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 详细描述 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">详细描述</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                商品描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="描述你的 AI Agent 功能、特点、使用场景"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                功能列表
              </label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={4}
                placeholder="每行一个功能点，例如：
- 智能数据分析
- 自动报表生成
- 多维度可视化"
                className="input-field"
              />
            </div>
          </div>

          {/* 上传演示 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">上传演示</h2>
                <p className="text-sm text-gray-500 mt-1">上传演示视频或截图（可选）</p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Upload size={18} />
                上传文件
              </button>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-8 py-3 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  发布中...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  发布商品
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}