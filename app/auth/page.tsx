import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ModeToggle } from '#/components/mode-toggle'
import { WalletForm } from '#/components/wallet-form'

export default function Auth() {
	const cookieStore = cookies()
	const wallet = cookieStore.get('wallet')

	if (wallet) {
		redirect('/')
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<ModeToggle />
			<WalletForm />
		</main>
	)
}
