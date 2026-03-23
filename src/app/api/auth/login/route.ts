import { NextResponse } from 'next/server'

// 模拟用户数据 - 后续替换为真实数据库查询
const users = [
  { id: '1', email: 'demo@gaolengmiao.com', phone: '13800138000', nickname: '演示用户', password: '123456', role: 'demand' },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { account, password } = body

    // 验证账号密码
    const user = users.find(
      u => (u.email === account || u.phone === account) && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { success: false, message: '账号或密码错误' },
        { status: 401 }
      )
    }

    // 生成 token（后续替换为真实 JWT）
    const token = Buffer.from(JSON.stringify({ userId: user.id })).toString('base64')

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          nickname: user.nickname,
          role: user.role,
        },
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    )
  }
}
