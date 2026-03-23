'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { useUserStore } from '@/stores/userStore';
import { 
  Search, 
  ShoppingCart, 
  MessageCircle, 
  User, 
  Menu,
  X,
  Sparkles,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Code,
  Brain,
  Bot,
  LineChart,
  PenTool,
  Database,
  Cloud,
  LogOut,
  Settings,
  Store,
  Package
} from 'lucide-react';

// 模拟数据
const featuredAgents = [
  {
    id: 1,
    name: '金融分析Agent',
    description: '智能分析股票、基金、债券市场数据，提供投资建议',
    price: 299,
    category: '金融',
    rating: 4.9,
    sales: 128,
    icon: LineChart,
  },
  {
    id: 2,
    name: '代码助手Pro',
    description: '支持多语言代码生成、调试、优化，效率提升10倍',
    price: 199,
    category: '开发',
    rating: 4.8,
    sales: 256,
    icon: Code,
  },
  {
    id: 3,
    name: '内容创作精灵',
    description: '文章、脚本、广告文案一键生成，支持30+语言',
    price: 149,
    category: '内容',
    rating: 4.7,
    sales: 189,
    icon: PenTool,
  },
  {
    id: 4,
    name: '数据分析专家',
    description: '自动化数据清洗、可视化、报表生成',
    price: 249,
    category: '数据',
    rating: 4.9,
    sales: 97,
    icon: Database,
  },
  {
    id: 5,
    name: '智能客服助手',
    description: '7x24小时智能响应，多轮对话，支持自定义知识库',
    price: 179,
    category: '客服',
    rating: 4.6,
    sales: 312,
    icon: Bot,
  },
  {
    id: 6,
    name: '云架构设计师',
    description: '自动生成云架构方案，成本优化建议',
    price: 399,
    category: '架构',
    rating: 4.8,
    sales: 45,
    icon: Cloud,
  },
];

const categories = [
  { name: '金融', icon: LineChart, count: 56 },
  { name: '开发', icon: Code, count: 89 },
  { name: '内容', icon: PenTool, count: 124 },
  { name: '数据', icon: Database, count: 67 },
  { name: '客服', icon: Bot, count: 78 },
  { name: '架构', icon: Cloud, count: 34 },
];

const features = [
  {
    icon: Sparkles,
    title: '海量Agent资源',
    desc: '汇集各领域专业AI Agent，满足多样化需求',
  },
  {
    icon: Shield,
    title: '安全交易保障',
    desc: '资金托管、评价系统，交易更安心',
  },
  {
    icon: Zap,
    title: '快速定制服务',
    desc: '专业团队响应，7天完成定制交付',
  },
];

export default function Home() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useUserStore()

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    router.push('/')
  }

  const getRoleText = (role: string | null) => {
    switch (role) {
      case 'demand': return '需求方'
      case 'supply': return '生产方'
      default: return '未选择角色'
    }
  }

  return (
    <div className="min-h-screen">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-neutral-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Logo size="sm" />
              <span className="text-xl font-bold text-neutral-900">高冷喵</span>
            </Link>

            {/* 桌面导航 */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/agents" className="text-neutral-600 hover:text-primary transition-colors">
                AI Agent市场
              </Link>
              <Link href="/custom" className="text-neutral-600 hover:text-primary transition-colors">
                定制服务
              </Link>
              <Link href="/demands" className="text-neutral-600 hover:text-primary transition-colors">
                需求大厅
              </Link>
              <Link href="/about" className="text-neutral-600 hover:text-primary transition-colors">
                关于我们
              </Link>
            </nav>

            {/* 操作按钮 */}
            <div className="hidden md:flex items-center gap-4">
              <button className="p-2 text-neutral-500 hover:text-primary transition-colors">
                <Search size={20} />
              </button>
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/cart" 
                    className="p-2 text-neutral-500 hover:text-primary transition-colors relative"
                  >
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">2</span>
                  </Link>
                  <Link 
                    href="/messages" 
                    className="p-2 text-neutral-500 hover:text-primary transition-colors"
                  >
                    <MessageCircle size={20} />
                  </Link>
                  {/* 用户下拉菜单 */}
                  <div className="relative">
                    <button 
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User size={16} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">{user?.nickname}</span>
                    </button>
                    
                    {/* 下拉菜单 */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-neutral-100">
                          <p className="text-sm font-medium text-neutral-900">{user?.nickname}</p>
                          <p className="text-xs text-neutral-500">{user?.email || user?.phone}</p>
                          <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {getRoleText(user?.role ?? null)}
                          </span>
                        </div>
                        
                        {user?.role === 'supply' && (
                          <Link 
                            href="/supply/dashboard" 
                            className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <Store size={16} />
                            生产方后台
                          </Link>
                        )}
                        
                        <Link 
                          href="/orders" 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Package size={16} />
                          我的订单
                        </Link>
                        
                        <Link 
                          href="/profile" 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings size={16} />
                          个人设置
                        </Link>
                        
                        <div className="border-t border-neutral-100 mt-1 pt-1">
                          <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                          >
                            <LogOut size={16} />
                            退出登录
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <User size={18} />
                    <span>登录</span>
                  </Link>
                  <Link 
                    href="/register" 
                    className="btn-primary"
                  >
                    注册
                  </Link>
                </>
              )}
            </div>

            {/* 移动端菜单按钮 */}
            <button 
              className="md:hidden p-2 text-neutral-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200">
            <div className="px-4 py-4 space-y-3">
              <Link href="/agents" className="block py-2 text-neutral-600">
                AI Agent市场
              </Link>
              <Link href="/custom" className="block py-2 text-neutral-600">
                定制服务
              </Link>
              <Link href="/demands" className="block py-2 text-neutral-600">
                需求大厅
              </Link>
              <Link href="/about" className="block py-2 text-neutral-600">
                关于我们
              </Link>
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <Link href="/login" className="block py-2 text-center text-neutral-600">
                  登录
                </Link>
                <Link href="/register" className="block py-2 text-center btn-primary">
                  注册
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero 区域 */}
      <section className="pt-24 pb-16 tech-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              发现你的专属 <span className="text-primary">AI Agent</span>
            </h1>
            <p className="text-xl text-neutral-500 mb-8 max-w-2xl mx-auto">
              连接需求方与生产方的专业AI Agent交易平台
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/agents" className="btn-primary flex items-center gap-2 text-lg">
                探索Agent <ArrowRight size={20} />
              </Link>
              <Link 
                href="/register?role=provider" 
                className="px-6 py-2.5 border-2 border-neutral-300 text-neutral-700 rounded-lg font-medium hover:border-primary hover:text-primary transition-colors"
              >
                成为生产者
              </Link>
            </div>
          </div>

          {/* 统计数字 */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'AI Agent' },
              { number: '1200+', label: '注册用户' },
              { number: '98%', label: '满意度' },
              { number: '50万+', label: '交易金额' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 分类导航 */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">浏览分类</h2>
            <Link href="/agents" className="text-primary hover:text-primaryDark flex items-center gap-1">
              查看全部 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                href={`/agents?category=${cat.name}`}
                className="bg-white p-6 rounded-xl border border-neutral-200 card-hover text-center"
              >
                <cat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="font-medium text-neutral-900">{cat.name}</div>
                <div className="text-sm text-neutral-400">{cat.count} 个Agent</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 热门Agent */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">热门推荐</h2>
            <Link href="/agents" className="text-primary hover:text-primaryDark flex items-center gap-1">
              查看更多 <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAgents.map((agent) => (
              <Link 
                key={agent.id} 
                href={`/agents/${agent.id}`}
                className="bg-white p-6 rounded-xl border border-neutral-200 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <agent.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="tag tag-gray">{agent.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{agent.name}</h3>
                <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{agent.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                    <span className="text-sm text-neutral-400">({agent.sales})</span>
                  </div>
                  <div className="text-lg font-bold text-primary">¥{agent.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 平台优势 */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 text-center mb-12">为什么选择高冷喵</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-neutral-200 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">准备好开始了吗？</h2>
          <p className="text-neutral-500 mb-8">加入高冷喵，开启您的AI Agent之旅</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg">
              立即注册
            </Link>
            <Link href="/custom" className="px-6 py-2.5 text-primary border border-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
              发布定制需求
            </Link>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-neutral-900 text-neutral-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Logo size="sm" />
                <span className="text-xl font-bold text-white">高冷喵</span>
              </div>
              <p className="text-sm">专业的AI Agent交易与定制平台</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">产品</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/agents" className="hover:text-white">AI Agent市场</Link></li>
                <li><Link href="/custom" className="hover:text-white">定制服务</Link></li>
                <li><Link href="/demands" className="hover:text-white">需求大厅</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">支持</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-white">帮助中心</Link></li>
                <li><Link href="/contact" className="hover:text-white">联系我们</Link></li>
                <li><Link href="/terms" className="hover:text-white">服务条款</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">关注我们</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white">微信</a>
                <a href="#" className="hover:text-white">微博</a>
                <a href="#" className="hover:text-white">QQ</a>
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 高冷喵. All rights reserved. | 备案号：XXXXXXXX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}