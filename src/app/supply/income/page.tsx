'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { useUserStore } from '@/stores/userStore'
import { 
  DollarSign, 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

interface Transaction {
  id: string
  type: 'income' | 'withdraw'
  amount: number
  status: 'pending' | 'completed'
  description: string
  date: string
}

export default function IncomePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useUserStore()
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'supply') {
      router.push('/login')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== 'supply') {
    return null
  }

  // 模拟数据
  const balance = {
    total: 12800,
    available: 9600,
    frozen: 3200,
    withdrawable: 9600,
  }

  const transactions: Transaction[] = [
    { id: '1', type: 'income', amount: 299, status: 'completed', description: '销售：金融分析Agent', date: '2024-01-15' },
    { id: '2', type: 'withdraw', amount: -2000, status: 'completed', description: '提现至支付宝', date: '2024-01-14' },
    { id: '3', type: 'income', amount: 199, status: 'completed', description: '销售：代码助手Pro', date: '2024-01-13' },
    { id: '4', type: 'income', amount: 149, status: 'pending', description: '销售：内容创作精灵', date: '2024-01-12' },
    { id: '5', type: 'income', amount: 399, status: 'completed', description: '销售：云架构设计师', date: '2024-01-11' },
  ]

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount)
    if (amount > 0 && amount <= balance.available) {
      // 模拟提现
      alert(`申请提现 ¥${amount} 成功！`)
      setShowWithdrawModal(false)
      setWithdrawAmount('')
    }
  }

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
              <Link href="/supply/dashboard" className="text-gray-600 hover:text-primary">
                仪表盘
              </Link>
              <Link href="/supply/orders" className="text-gray-600 hover:text-primary">
                订单管理
              </Link>
              <Link href="/supply/income" className="text-primary font-medium">
                收入管理
              </Link>
              <Link href="/demands" className="text-gray-600 hover:text-primary">
                需求大厅
              </Link>
            </nav>
            
            <div className="flex items-center gap-4">
              <Link href="/supply/dashboard" className="text-gray-600 hover:text-primary">
                返回后台
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">收入管理</h1>
          <p className="text-gray-500">查看你的收入和提现</p>
        </div>

        {/* 收入概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary to-primaryDark rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={20} />
              <span className="text-sm opacity-80">总收入</span>
            </div>
            <div className="text-3xl font-bold">¥{balance.total.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-2 text-gray-500">
              <CheckCircle size={18} />
              <span className="text-sm">可提现</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥{balance.available.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-2 text-gray-500">
              <Clock size={18} />
              <span className="text-sm">待结算</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥{balance.frozen.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-2 text-gray-500">
              <TrendingUp size={18} />
              <span className="text-sm">本月收入</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">¥4,280</div>
          </div>
        </div>

        {/* 提现按钮 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">立即提现</h2>
              <p className="text-sm text-gray-500 mt-1">可提现金额：¥{balance.available.toLocaleString()}</p>
            </div>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <CreditCard size={18} />
              申请提现
            </button>
          </div>
        </div>

        {/* 交易记录 */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">交易记录</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'income' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {tx.type === 'income' ? (
                      <ArrowDownRight className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{tx.description}</div>
                    <div className="text-sm text-gray-500">{tx.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-semibold ${
                    tx.type === 'income' ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {tx.type === 'income' ? '+' : ''}¥{Math.abs(tx.amount)}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    tx.status === 'completed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {tx.status === 'completed' ? '已完成' : '处理中'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 提现弹窗 */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">申请提现</h3>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">提现金额</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder={`最高可提现 ¥${balance.available}`}
                  className="input-field"
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                提现将在 1-3 个工作日内到账
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  onClick={handleWithdraw}
                  className="flex-1 btn-primary"
                >
                  确认提现
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}