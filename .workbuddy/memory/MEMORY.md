# 项目关键信息

## 高冷喵 AI Agent 交易平台

### 技术栈
- Next.js 14.2.5 + TypeScript + Tailwind CSS
- Zustand 状态管理
- Lucide React 图标库
- SVG 矢量图形

### 核心功能模块

#### 1. 用户系统
- `/src/stores/userStore.ts` - 用户状态管理
- `/register` - 注册页面
- `/login` - 登录页面（含演示账号）
- `/role-select` - 角色选择（需求方/生产方）

#### 2. 需求方功能
- `/agents` - Agent 市场（分类、搜索、排序、购物车）
- `/cart` - 购物车与结算
- `/demands/publish` - 发布定制需求

#### 3. 生产方功能
- `/supply/dashboard` - 生产方仪表盘
- `/supply/publish` - 发布商品
- `/supply/income` - 收入管理与提现
- `/demands` - 需求大厅（接单）

#### 4. 管理后台
- `/admin` - 管理后台（用户、订单、商品审核、系统设置）

### 关键页面组件
- `/src/components/Logo.tsx` - SVG 线条风格 Logo
- `/src/stores/cartStore.ts` - 购物车状态

### 域名
- 目标域名: www.gaolengmiao.com

### 更新时间
2026-03-24
