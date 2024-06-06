import axios from 'axios'
import Link from 'next/link'

import { Amount, AssetInfo } from '#/utils/types'

import { AssetImage } from './asset-image'

export const AssetItem = async ({ asset }: { asset: Amount }) => {
	const { data }: { data: AssetInfo } = await axios.get(
		process.env.BLOCKFROST_API_URL + `/assets/${asset.unit}`,
		{
			headers: {
				project_id: process.env.BLOCKFROST_API_KEY,
			},
		},
	)

	return (
		<Link
			href={''}
			className="flex flex-col gap-4 hover:border-b border-primary"
		>
			<AssetImage src={data.onchain_metadata.image} />
			<div className="flex justify-between">
				<div className="text-lg text-primary font-semibold">
					{data.onchain_metadata.name}
				</div>
				<div className="text-primary/90">{asset.quantity}</div>
			</div>
		</Link>
	)
}
