'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { useUserStore } from '@/stores/userStore'
import { 
  Users, 
  ShoppingCart, 
  Package, 
  Settings, 
  DollarSign,
  TrendingUp,
  BarChart3,
  Shield,
  MessageCircle,
  FileText,
  Bell,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

type TabType = 'overview' | 'users' | 'orders' | 'agents' | 'demands' | 'settings'

export default function AdminPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useUserStore()
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  // 模拟管理员账号
  const isAdmin = user?.email === 'admin@gaolengmiao.com'

  useEffect(() => {
    // 简单模拟：实际应该通过后端验证管理员权限
    // 这里允许演示账号或特定邮箱访问
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // 模拟数据
  const stats = {
    totalUsers: 1256,
    activeUsers: 892,
    totalOrders: 3280,
    todayOrders: 45,
    totalRevenue: 128000,
    monthRevenue: 25600,
    pendingAgents: 12,
    pendingDemands: 5,
  }

  const recentOrders = [
    { id: '1', user: '张三', agent: '金融分析Agent', amount: 299, status: 'completed', date: '2024-01-15 14:30' },
    { id: '2', user: '李四', agent: '代码助手Pro', amount: 199, status: 'pending', date: '2024-01-15 13:20' },
    { id: '3', user: '王五', agent: '内容创作精灵', amount: 149, status: 'completed', date: '2024-01-15 12:15' },
    { id: '4', user: '赵六', agent: '数据分析专家', amount: 249, status: 'refunded', date: '2024-01-15 11:00' },
  ]

  const pendingAgents = [
    { id: '1', name: '医疗健康Agent', seller: '健康科技', price: 399, submittedAt: '2024-01-14' },
    { id: '2', name: '教育辅导Agent', seller: '智慧教育', price: 299, submittedAt: '2024-01-13' },
  ]

  const tabs = [
    { id: 'overview', label: '数据概览', icon: BarChart3 },
    { id: 'users', label: '用户管理', icon: Users },
    { id: 'orders', label: '订单管理', icon: ShoppingCart },
    { id: 'agents', label: '商品审核', icon: Package },
    { id: 'demands', label: '需求管理', icon: FileText },
    { id: 'settings', label: '系统设置', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3">
                <Logo size="sm" />
                <span className="text-xl font-bold text-gray-900">高冷喵</span>
              </Link>
              <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                管理后台
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-primary relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-700">管理员</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 侧边栏 */}
        <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
                {tab.id === 'agents' && pendingAgents.length > 0 && (
                  <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {pendingAgents.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* 主内容 */}
        <main className="flex-1 p-8">
          {activeTab === 'overview' && (
            <>
              {/* 统计卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="flex items-center text-sm text-green-500">
                      <ArrowUp size={16} />
                      12%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 mt-1">总用户数</div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="flex items-center text-sm text-green-500">
                      <ArrowUp size={16} />
                      8%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.todayOrders}</div>
                  <div className="text-sm text-gray-500 mt-1">今日订单</div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="flex items-center text-sm text-green-500">
                      <ArrowUp size={16} />
                      15%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">¥{stats.monthRevenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 mt-1">本月收入</div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.pendingAgents}</div>
                  <div className="text-sm text-gray-500 mt-1">待审核商品</div>
                </div>
              </div>

              {/* 最近订单 */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">最近订单</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {recentOrders.map(order => (
                    <div key={order.id} className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{order.agent}</div>
                        <div className="text-sm text-gray-500">{order.user} · {order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">¥{order.amount}</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {order.status === 'completed' ? '已完成' : order.status === 'pending' ? '待处理' : '已退款'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">用户列表</h2>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                      <th className="pb-3">用户</th>
                      <th className="pb-3">角色</th>
                      <th className="pb-3">注册时间</th>
                      <th className="pb-3">状态</th>
                      <th className="pb-3">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: '张三', email: 'zhangsan@email.com', role: '需求方', date: '2024-01-10', status: '正常' },
                      { name: '李四', email: 'lisi@email.com', role: '生产方', date: '2024-01-08', status: '正常' },
                      { name: '王五', email: 'wangwu@email.com', role: '需求方', date: '2024-01-05', status: '正常' },
                    ].map((u, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3">
                          <div className="font-medium text-gray-900">{u.name}</div>
                          <div className="text-sm text-gray-500">{u.email}</div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            u.role === '生产方' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 text-gray-500">{u.date}</td>
                        <td className="py-3">
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckCircle size={14} />
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button className="text-primary hover:underline text-sm">查看</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'agents' && (
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">待审核商品</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {pendingAgents.map(agent => (
                  <div key={agent.id} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{agent.name}</div>
                      <div className="text-sm text-gray-500">卖家: {agent.seller} · 提交于 {agent.submittedAt}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">¥{agent.price}</span>
                      <button className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200">
                        通过
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm hover:bg-red-200">
                        拒绝
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">系统设置</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">平台抽成比例</h3>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      defaultValue={10}
                      className="input-field w-32"
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">每笔交易平台收取的佣金比例</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">最低提现金额</h3>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      defaultValue={100}
                      className="input-field w-32"
                    />
                    <span className="text-gray-500">元</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">新用户注册</h3>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                    <span className="text-gray-700">允许新用户注册</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="btn-primary">
                    保存设置
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}