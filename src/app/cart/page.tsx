'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { ShoppingCart, Trash2, ArrowLeft, CreditCard, Shield } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, clearCart, getTotal } = useCartStore()
  const { user, isAuthenticated } = useUserStore()
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/cart')
      return
    }

    if (items.length === 0) return

    setLoading(true)
    
    // 模拟支付流程
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
      
      // 清空购物车
      setTimeout(() => {
        clearCart()
        router.push('/orders')
      }, 2000)
    }, 1500)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">购买成功！</h2>
          <p className="text-gray-500">正在跳转至订单页面...</p>
        </div>
      </div>
    )
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
            <Link 
              href="/agents" 
              className="flex items-center gap-2 text-gray-600 hover:text-primary"
            >
              <ArrowLeft size={20} />
              继续购物
            </Link>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">购物车</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">购物车是空的</h2>
            <p className="text-gray-500 mb-6">快去挑选心仪的 AI Agent 吧</p>
            <Link href="/agents" className="btn-primary">
              去逛逛
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 购物车商品 */}
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="p-5 flex items-center gap-5">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-2xl">🤖</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                    <p className="text-gray-400 text-xs mt-1">卖家: {item.sellerName}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">¥{item.price}</div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 mt-2 flex items-center gap-1 text-sm"
                    >
                      <Trash2 size={16} />
                      删除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 结算信息 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">商品数量</span>
                <span className="font-semibold">{items.length} 件</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-600">合计</span>
                <span className="text-3xl font-bold text-primary">¥{getTotal()}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Shield size={16} className="text-green-500" />
                资金安全有保障，交易出问题全额退款
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    处理中...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    立即结算
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}