import type { Metadata } from 'next';
import './globals.css';
import { LogoIcon } from '@/components/Logo';

export const metadata: Metadata = {
  title: '高冷喵 AI Agent 交易平台',
  description: '连接需求方与生产方的AI Agent交易与定制平台',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}