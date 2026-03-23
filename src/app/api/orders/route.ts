import { NextResponse } from 'next/server'

// 模拟订单数据 - 后续替换为真实数据库
let orders = [
  { id: '1', userId: '1', items: [], total: 299, status: 'completed', createdAt: '2024-01-15' },
]

// 获取订单列表
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const status = searchParams.get('status')

  let filteredOrders = orders

  if (userId) {
    filteredOrders = filteredOrders.filter(o => o.userId === userId)
  }
  if (status) {
    filteredOrders = filteredOrders.filter(o => o.status === status)
  }

  return NextResponse.json({
    success: true,
    data: filteredOrders,
  })
}

// 创建订单
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, items, total } = body

    if (!userId || !items || !total) {
      return NextResponse.json(
        { success: false, message: '参数不完整' },
        { status: 400 }
      )
    }

    // 创建订单
    const newOrder = {
      id: `ORD${Date.now()}`,
      userId,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    }

    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      data: newOrder,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '创建订单失败' },
      { status: 500 }
    )
  }
}

// 更新订单状态
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { orderId, status } = body

    const order = orders.find(o => o.id === orderId)
    if (!order) {
      return NextResponse.json(
        { success: false, message: '订单不存在' },
        { status: 404 }
      )
    }

    order.status = status

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '更新订单失败' },
      { status: 500 }
    )
  }
}
