'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'
import { useCartStore } from '@/stores/cartStore'
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  Code, 
  Brain, 
  Bot, 
  LineChart, 
  PenTool, 
  Database, 
  Cloud,
  ArrowRight,
  X,
  Grid,
  List
} from 'lucide-react'

// 模拟 Agent 数据
const allAgents = [
  {
    id: '1',
    name: '金融分析Agent',
    description: '智能分析股票、基金、债券市场数据，提供投资建议和风险评估',
    price: 299,
    category: '金融',
    rating: 4.9,
    sales: 128,
    icon: LineChart,
    seller: { id: 's1', name: '金融科技工作室' },
    features: ['实时行情分析', '风险评估', '投资建议', '财报解读'],
  },
  {
    id: '2',
    name: '代码助手Pro',
    description: '支持多语言代码生成、调试、优化，效率提升10倍',
    price: 199,
    category: '开发',
    rating: 4.8,
    sales: 256,
    icon: Code,
    seller: { id: 's2', name: '极客工坊' },
    features: ['多语言支持', '代码优化', 'Bug修复', '性能分析'],
  },
  {
    id: '3',
    name: '内容创作精灵',
    description: '文章、脚本、广告文案一键生成，支持30+语言',
    price: 149,
    category: '内容',
    rating: 4.7,
    sales: 189,
    icon: PenTool,
    seller: { id: 's3', name: '文案工作室' },
    features: ['多语言支持', '风格定制', '批量生成', 'SEO优化'],
  },
  {
    id: '4',
    name: '数据分析专家',
    description: '自动化数据清洗、可视化、报表生成',
    price: 249,
    category: '数据',
    rating: 4.9,
    sales: 97,
    icon: Database,
    seller: { id: 's4', name: '数据研究院' },
    features: ['数据清洗', '可视化', '报表生成', '预测分析'],
  },
  {
    id: '5',
    name: '智能客服助手',
    description: '7x24小时智能响应，多轮对话，支持自定义知识库',
    price: 179,
    category: '客服',
    rating: 4.6,
    sales: 312,
    icon: Bot,
    seller: { id: 's5', name: '客服科技' },
    features: ['多轮对话', '知识库', '情绪识别', '自动转人工'],
  },
  {
    id: '6',
    name: '云架构设计师',
    description: '自动生成云架构方案，成本优化建议',
    price: 399,
    category: '架构',
    rating: 4.8,
    sales: 45,
    icon: Cloud,
    seller: { id: 's6', name: '云端科技' },
    features: ['架构设计', '成本优化', '安全性评估', '扩展性分析'],
  },
  {
    id: '7',
    name: 'AI绘画大师',
    description: '文字描述生成精美图片，支持多种风格',
    price: 129,
    category: '设计',
    rating: 4.8,
    sales: 178,
    icon: PenTool,
    seller: { id: 's7', name: '创意工坊' },
    features: ['多风格支持', '高清输出', '批量生成', '风格迁移'],
  },
  {
    id: '8',
    name: '智能写作助手',
    description: '论文、报告、总结智能写作，语法检查润色',
    price: 99,
    category: '内容',
    rating: 4.7,
    sales: 234,
    icon: Brain,
    seller: { id: 's8', name: '写作工坊' },
    features: ['智能写作', '语法检查', '润色优化', '查重检测'],
  },
]

const categories = [
  { name: '全部', icon: Grid, count: 8 },
  { name: '金融', icon: LineChart, count: 1 },
  { name: '开发', icon: Code, count: 1 },
  { name: '内容', icon: PenTool, count: 2 },
  { name: '数据', icon: Database, count: 1 },
  { name: '客服', icon: Bot, count: 1 },
  { name: '架构', icon: Cloud, count: 1 },
  { name: '设计', icon: Brain, count: 1 },
]

export default function AgentsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '全部')
  const [sortBy, setSortBy] = useState<'sales' | 'price' | 'rating'>('sales')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const { addItem, isInCart, items } = useCartStore()
  const cartCount = items.length

  // 过滤和排序
  const filteredAgents = allAgents
    .filter(agent => {
      const matchCategory = selectedCategory === '全部' || agent.category === selectedCategory
      const matchSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
    .sort((a, b) => {
      if (sortBy === 'sales') return b.sales - a.sales
      if (sortBy === 'price') return a.price - b.price
      return b.rating - a.rating
    })

  const handleAddToCart = (agent: typeof allAgents[0]) => {
    addItem({
      agentId: agent.id,
      name: agent.name,
      description: agent.description,
      price: agent.price,
      icon: agent.category,
      sellerId: agent.seller.id,
      sellerName: agent.seller.name,
    })
  }

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
            
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索 AI Agent..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <Link 
              href="/cart" 
              className="p-2 text-gray-600 hover:text-primary transition-colors relative"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 侧边栏 */}
          <aside className="w-56 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-20">
              <h3 className="font-semibold text-gray-900 mb-4">分类</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === cat.name
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <cat.icon size={18} />
                      {cat.name}
                    </span>
                    <span className={`text-xs ${selectedCategory === cat.name ? 'text-white/80' : 'text-gray-400'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 商品列表 */}
          <div className="flex-1">
            {/* 工具栏 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  共 <span className="font-semibold text-gray-900">{filteredAgents.length}</span> 个 Agent
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="sales">销量优先</option>
                  <option value="price">价格优先</option>
                  <option value="rating">评分优先</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* 商品卡片 */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <agent.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {agent.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{agent.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{agent.rating}</span>
                      </div>
                      <span className="text-gray-400">销量 {agent.sales}</span>
                      <span className="text-gray-400">|</span>
                      <span className="text-gray-400">{agent.seller.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-2xl font-bold text-primary">¥{agent.price}</span>
                      {isInCart(agent.id) ? (
                        <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm">
                          已加入
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(agent)}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primaryDark transition-colors"
                        >
                          加入购物车
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAgents.map((agent) => (
                  <div key={agent.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow flex gap-5">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <agent.icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.name}</h3>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {agent.category}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-primary">¥{agent.price}</span>
                      </div>
                      
                      <p className="text-gray-500 text-sm mt-2">{agent.description}</p>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-medium">{agent.rating}</span>
                          </div>
                          <span className="text-gray-400">销量 {agent.sales}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-400">{agent.seller.name}</span>
                        </div>
                        
                        {isInCart(agent.id) ? (
                          <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-sm">
                            已加入
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(agent)}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primaryDark transition-colors"
                          >
                            加入购物车
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}