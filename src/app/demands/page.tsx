'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { useUserStore } from '@/stores/userStore'
import { 
  Search, 
  Filter, 
  Clock, 
  DollarSign, 
  Users, 
  ArrowRight,
  Briefcase,
  MessageCircle
} from 'lucide-react'

// 模拟需求数据
const allDemands = [
  {
    id: '1',
    title: '定制电商智能客服Agent',
    description: '需要一款针对电商场景的智能客服Agent，支持多轮对话、订单查询、退换货处理等',
    category: '客服',
    budget: '3000-5000',
    deadline: '7天',
    proposals: 5,
    views: 128,
    publishedAt: '2024-01-15',
  },
  {
    id: '2',
    title: '企业数据分析Agent',
    description: '需要能够自动清洗数据、生成可视化报表、进行趋势预测的数据分析Agent',
    category: '数据',
    budget: '5000-10000',
    deadline: '14天',
    proposals: 8,
    views: 256,
    publishedAt: '2024-01-14',
  },
  {
    id: '3',
    title: '金融风控Agent',
    description: '需要能够实时监控交易风险、识别异常行为、提供风险评估报告的金融风控Agent',
    category: '金融',
    budget: '8000-15000',
    deadline: '21天',
    proposals: 3,
    views: 89,
    publishedAt: '2024-01-13',
  },
  {
    id: '4',
    title: '代码审查Agent',
    description: '自动化代码审查工具，支持主流编程语言，提供代码质量评分和改进建议',
    category: '开发',
    budget: '2000-4000',
    deadline: '7天',
    proposals: 12,
    views: 345,
    publishedAt: '2024-01-12',
  },
  {
    id: '5',
    title: '内容创作Agent',
    description: '支持文章、脚本、广告文案创作，多语言支持，可定制写作风格',
    category: '内容',
    budget: '1500-3000',
    deadline: '5天',
    proposals: 7,
    views: 178,
    publishedAt: '2024-01-11',
  },
  {
    id: '6',
    title: '云架构设计Agent',
    description: '自动生成云架构方案，支持AWS/阿里云/腾讯云，成本优化建议',
    category: '架构',
    budget: '6000-12000',
    deadline: '30天',
    proposals: 4,
    views: 156,
    publishedAt: '2024-01-10',
  },
]

const categories = ['全部', '金融', '开发', '内容', '数据', '客服', '架构', '设计']

export default function DemandsPage() {
  const { user, isAuthenticated } = useUserStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const filteredDemands = allDemands.filter(demand => {
    const matchCategory = selectedCategory === '全部' || demand.category === selectedCategory
    const matchSearch = demand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       demand.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const isSupply = user?.role === 'supply'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-xl font-bold text-gray-900">高冷喵</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/agents" className="text-gray-600 hover:text-primary">
                AI Agent市场
              </Link>
              <Link href="/demands" className="text-primary font-medium">
                需求大厅
              </Link>
              {isSupply && (
                <Link href="/supply/dashboard" className="text-gray-600 hover:text-primary">
                  生产方后台
                </Link>
              )}
            </nav>
            
            {isAuthenticated ? (
              isSupply ? (
                <Link href="/demands/publish" className="btn-primary">
                  发布需求
                </Link>
              ) : (
                <Link href="/demands/publish" className="btn-primary">
                  发布需求
                </Link>
              )
            ) : (
              <Link href="/login?redirect=/demands" className="btn-primary">
                登录查看
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 标题区域 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">需求大厅</h1>
          <p className="text-gray-500 mt-2">寻找定制机会，展现你的技术实力</p>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索需求..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 统计 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{allDemands.length}</div>
            <div className="text-sm text-gray-500">在招需求</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">¥15万+</div>
            <div className="text-sm text-gray-500">总预算</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">45</div>
            <div className="text-sm text-gray-500">参与开发者</div>
          </div>
        </div>

        {/* 需求列表 */}
        <div className="space-y-4">
          {filteredDemands.map(demand => (
            <div key={demand.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{demand.title}</h3>
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      {demand.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{demand.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} />
                      预算: {demand.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      工期: {demand.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {demand.proposals}人投标
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {demand.views}人浏览
                    </span>
                  </div>
                </div>
                
                <div className="ml-4">
                  {isSupply ? (
                    <button className="btn-primary flex items-center gap-2">
                      <MessageCircle size={18} />
                      立即投标
                    </button>
                  ) : isAuthenticated ? (
                    <Link 
                      href={`/demands/${demand.id}`} 
                      className="btn-primary flex items-center gap-2"
                    >
                      查看详情
                      <ArrowRight size={18} />
                    </Link>
                  ) : (
                    <Link href="/login?redirect=/demands" className="btn-primary">
                      登录投标
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400">
                发布于 {demand.publishedAt}
              </div>
            </div>
          ))}
        </div>

        {filteredDemands.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">暂无匹配的需求</p>
          </div>
        )}
      </main>
    </div>
  )
}