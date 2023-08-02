import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

const notoSans = Noto_Sans({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-noto-sans'
})

export const metadata: Metadata = {
    title: 'X-Call-ympics',
    description: 'Make your NFT an olympic champion by making it run through chains with XCalls !'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${notoSans.variable} font-sans bg-black text-grey`}>{children}</body>
        </html>
    )
}
