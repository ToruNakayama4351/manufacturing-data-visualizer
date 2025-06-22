import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '製造業データ可視化ツール',
  description: 'シンプル・確実動作版',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
