import axios from 'axios'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AssetItem } from '#/components/asset-item'
import { ModeToggle } from '#/components/mode-toggle'
import { WalletButton } from '#/components/wallet-button'
import { AddressInfo } from '#/utils/types'

export default async function Home() {
	const walletCookie = cookies().get('wallet')

	if (!walletCookie?.value) {
		redirect('/auth')
	}

	const { data }: { data: AddressInfo } = await axios.get(
		process.env.BLOCKFROST_API_URL + `/addresses/${walletCookie.value}`,
		{
			headers: {
				project_id: process.env.BLOCKFROST_API_KEY,
			},
		},
	)

	return (
		<main className="container pb-12 pt-20">
			<WalletButton adaAmount={parseInt(data.amount[0].quantity) / 1000000} />
			<ModeToggle />
			<div className="text-4xl font-semibold text-primary mb-6 border-b border-primary w-full pb-2">
				Assets
			</div>
			{data && (
				<div className="grid grid-cols-3 gap-6">
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
