import { blockfrost } from '#/utils/api'
import { Amount, AssetInfo } from '#/utils/api/types'
import { getAssetName } from '#/utils/misc'

import { AssetDetail } from './asset-detail'

export const AssetItem = async ({ asset }: { asset: Amount }) => {
	const { data }: { data: AssetInfo } = await blockfrost.get(
		'/assets/' + asset.unit,
	)

	return (
		<div className="flex flex-col gap-4 hover:border-b border-primary items-center">
			<AssetDetail asset={data} />
			<div className="flex justify-between max-w-[420px] w-full items-center">
				<div className="text-lg text-primary font-semibold">
					{getAssetName(data)}
				</div>
				<div className="text-primary/90">{asset.quantity}</div>
			</div>
		</div>
	)
}
