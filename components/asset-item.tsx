import Link from 'next/link'

import { blockfrost } from '#/utils/api'
import { Amount, AssetInfo } from '#/utils/api/types'

import { AssetImage } from './asset-image'

export const AssetItem = async ({ asset }: { asset: Amount }) => {
	const { data }: { data: AssetInfo } = await blockfrost.get(
		'/assets/' + asset.unit,
	)

	return (
		<Link
			href={''}
			className="flex flex-col gap-4 hover:border-b border-primary items-center"
		>
			<AssetImage src={data.onchain_metadata.image} />
			<div className="flex justify-between max-w-[420px] w-full items-center">
				<div className="text-lg text-primary font-semibold">
					{data.onchain_metadata.name}
				</div>
				<div className="text-primary/90">{asset.quantity}</div>
			</div>
		</Link>
	)
}
