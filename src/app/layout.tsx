import { Inter } from 'next/font/google'
import './globals.css'
import SplashScreen from '@/components/SplashScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DSLT - Dollar Secure Ledger Token',
  description: 'The future of crypto commerce: Token launch, e-commerce integration, debit card, NFT marketplace, staking rewards, and dedicated exchange + wallet.',
  keywords: 'DSLT, cryptocurrency, token, blockchain, e-commerce, debit card, NFT, staking, exchange, wallet',
  author: 'DSLT Team',
  icons: {
    icon: [
      { url: '/logo.png', sizes: 'any' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  openGraph: {
    title: 'DSLT - Dollar Secure Ledger Token',
    description: 'The future of crypto commerce: Token launch, e-commerce integration, debit card, NFT marketplace, staking rewards, and dedicated exchange + wallet.',
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSLT - Dollar Secure Ledger Token',
    description: 'The future of crypto commerce',
    images: ['/logo.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`} style={{background: '#0f0f1e', color: '#ffffff'}}>
        <SplashScreen />
        {children}
      </body>
    </html>
  )
}