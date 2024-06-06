import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AssetItem } from '#/components/asset-item'
import { ModeToggle } from '#/components/mode-toggle'
import { WalletButton } from '#/components/wallet-button'
import { blockfrost } from '#/utils/api'
import { AddressInfo } from '#/utils/api/types'

export default async function Home() {
	const walletCookie = cookies().get('wallet')

	if (!walletCookie?.value) {
		redirect('/auth')
	}

	const { data }: { data: AddressInfo } = await blockfrost.get(
		'/addresses/' + walletCookie.value,
	)

	return (
		<main className="container pb-12 pt-20">
			<WalletButton adaAmount={parseInt(data.amount[0].quantity) / 1000000} />
			<ModeToggle />
			<div className="text-4xl font-semibold text-primary mb-6 border-b border-primary w-full pb-2">
				Assets
			</div>
			{data && (
				<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
					{data.amount
						.filter(item => item.unit !== 'lovelace')
						.map(item => (
							<AssetItem key={item.unit} asset={item} />
						))}
				</div>
			)}
		</main>
	)
}
