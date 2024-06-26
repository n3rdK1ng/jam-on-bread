import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { ThemeProvider } from '#/components/theme-provider'
import { cn } from '#/utils/misc'

import './globals.css'

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'NFT Wallet',
	description: 'Display your wallet details',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
