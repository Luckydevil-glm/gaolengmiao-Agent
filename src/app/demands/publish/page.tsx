'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { useUserStore } from '@/stores/userStore'
import { ArrowLeft, Send, Upload, DollarSign, Clock, CheckCircle } from 'lucide-react'

interface DemandForm {
  title: string
  category: string
  budget: string
  deadline: string
  description: string
  requirements: string
  attachment: boolean
}

export default function PublishDemandPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useUserStore()
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState<DemandForm>({
    title: '',
    category: '',
    budget: '',
    deadline: '',
    description: '',
    requirements: '',
    attachment: false,
  })

  if (!isAuthenticated) {
    router.push('/login?redirect=/demands/publish')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.category || !formData.budget || !formData.description) {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">需求发布成功！</h2>
          <p className="text-gray-500 mb-6">开发者很快就会看到你的需求并报价</p>
          <div className="flex gap-4 justify-center">
            <Link href="/demands" className="btn-primary">
              查看需求大厅
            </Link>
            <Link href="/" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              返回首页
            </Link>
          </div>
        </div>
      </div>
    )
  }

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

  const budgetRanges = [
    { value: '0-500', label: '500元以下' },
    { value: '500-1000', label: '500-1000元' },
    { value: '1000-3000', label: '1000-3000元' },
    { value: '3000-5000', label: '3000-5000元' },
    { value: '5000-10000', label: '5000-10000元' },
    { value: '10000+', label: '10000元以上' },
  ]

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
              href="/demands" 
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
          <h1 className="text-2xl font-bold text-gray-900">发布定制需求</h1>
          <p className="text-gray-500 mt-1">描述你的需求，让开发者为你打造专属 AI Agent</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
            
            {/* 需求标题 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                需求标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="例如：定制一个金融数据分析Agent"
                className="input-field"
                required
              />
            </div>

            {/* 分类 */}
            <div className="mb-4">
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

            {/* 预算和工期 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  预算范围 <span className="text-red-500">*</span>
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">请选择预算</option>
                  {budgetRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  期望工期
                </label>
                <select
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">不限</option>
                  <option value="7">7天内</option>
                  <option value="14">14天内</option>
                  <option value="30">30天内</option>
                  <option value="60">60天内</option>
                </select>
              </div>
            </div>
          </div>

          {/* 详细描述 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">详细描述</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                需求描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="详细描述你的需求，包括使用场景、目标用户、核心功能等"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                具体要求
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                placeholder="列出具体的功能要求、性能指标、验收标准等"
                className="input-field"
              />
            </div>
          </div>

          {/* 附件说明 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">附件材料</h2>
                <p className="text-sm text-gray-500 mt-1">如需求文档、参考案例等（可选）</p>
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
                  <Send size={20} />
                  发布需求
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}