'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { useUserStore } from '@/stores/userStore'
import { 
  Store, 
  Package, 
  DollarSign, 
  MessageCircle, 
  ShoppingCart, 
  Plus,
  TrendingUp,
  Users,
  ArrowUp,
  ArrowDown,
  FileText
} from 'lucide-react'

export default function SupplyDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useUserStore()

  // 检查权限
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'supply') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'supply') {
    return null
  }

  // 模拟数据
  const stats = {
    totalSales: 12800,
    salesChange: 12.5,
    orders: 32,
    ordersChange: 8,
    agents: 5,
    income: 9600,
    incomeChange: -3.2,
  }

  const recentOrders = [
    { id: '1', agent: '金融分析Agent', buyer: '张三', amount: 299, status: 'completed', date: '2024-01-15' },
    { id: '2', agent: '代码助手Pro', buyer: '李四', amount: 199, status: 'completed', date: '2024-01-14' },
    { id: '3', agent: '内容创作精灵', buyer: '王五', amount: 149, status: 'pending', date: '2024-01-14' },
  ]

  const recentDemands = [
    { id: '1', title: '定制电商客服Agent', budget: '3000-5000', deadline: '7天', proposals: 3 },
    { id: '2', title: '企业数据分析Agent', budget: '5000-10000', deadline: '14天', proposals: 5 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-xl font-bold text-gray-900">高冷喵</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/supply/dashboard" className="text-primary font-medium">
                仪表盘
              </Link>
              <Link href="/supply/orders" className="text-gray-600 hover:text-primary">
                订单管理
              </Link>
              <Link href="/supply/income" className="text-gray-600 hover:text-primary">
                收入管理
              </Link>
              <Link href="/demands" className="text-gray-600 hover:text-primary">
                需求大厅
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/supply/publish" 
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={18} />
                发布商品
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Store size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.nickname}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎语 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">欢迎回来，{user?.nickname}！</h1>
          <p className="text-gray-500">这里是你的生产方仪表盘</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 销售额 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`flex items-center text-sm ${stats.salesChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stats.salesChange > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {Math.abs(stats.salesChange)}%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥{stats.totalSales.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-1">总销售额</div>
          </div>

          {/* 订单数 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <span className="flex items-center text-sm text-green-500">
                <ArrowUp size={16} />
                {stats.ordersChange}%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.orders}</div>
            <div className="text-sm text-gray-500 mt-1">总订单数</div>
          </div>

          {/* 商品数 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.agents}</div>
            <div className="text-sm text-gray-500 mt-1">在售商品</div>
          </div>

          {/* 收入 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className={`flex items-center text-sm ${stats.incomeChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stats.incomeChange > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                {Math.abs(stats.incomeChange)}%
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥{stats.income.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-1">可提现收入</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 最近订单 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">最近订单</h2>
              <Link href="/supply/orders" className="text-primary text-sm hover:underline">
                查看全部
              </Link>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="font-medium text-gray-900">{order.agent}</div>
                    <div className="text-sm text-gray-500">{order.buyer} · {order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">¥{order.amount}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {order.status === 'completed' ? '已完成' : '待处理'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 热门需求 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">热门需求</h2>
              <Link href="/demands" className="text-primary text-sm hover:underline">
                查看全部
              </Link>
            </div>
            <div className="space-y-4">
              {recentDemands.map((demand) => (
                <div key={demand.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900 mb-2">{demand.title}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <DollarSign size={14} />
                      {demand.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText size={14} />
                      {demand.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {demand.proposals}人投标
                    </span>
                  </div>
                  <Link 
                    href={`/demands/${demand.id}`} 
                    className="mt-3 inline-block text-sm text-primary hover:underline"
                  >
                    查看详情 →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 快捷操作 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/supply/publish" 
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-medium text-gray-900">发布新商品</div>
                <div className="text-sm text-gray-500">创建新的 AI Agent</div>
              </div>
            </Link>
            
            <Link 
              href="/demands" 
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">承接需求</div>
                <div className="text-sm text-gray-500">浏览并投标定制需求</div>
              </div>
            </Link>
            
            <Link 
              href="/supply/income" 
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">提现收入</div>
                <div className="text-sm text-gray-500">申请提现到账户</div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}