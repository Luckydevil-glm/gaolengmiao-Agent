'use client'

import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  animated?: boolean
}

export default function Logo({ size = 'md', showText = false }: LogoProps) {
  const dimensions = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 },
  }

  const { width, height } = dimensions[size]

  return (
    <div className="flex items-center gap-2">
      <div style={{ width, height, position: 'relative' }}>
        <Image
          src="/logo.png"
          alt="高冷喵"
          width={width}
          height={height}
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      
      {showText && (
        <span className="text-xl font-bold text-gray-900">高冷喵</span>
      )}
    </div>
  )
}

// 独立的 Logo 图标组件 - 用于 favicon
export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <div className={className} style={{ width: 32, height: 32, position: 'relative' }}>
      <Image
        src="/logo.png"
        alt="高冷喵"
        width={32}
        height={32}
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}
