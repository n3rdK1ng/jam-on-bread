import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { AssetInfo } from './api/types'

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const getAssetName = (asset: AssetInfo) => {
	let name
	if (asset.onchain_metadata) {
		name = asset.onchain_metadata.name
	} else if (asset.metadata) {
		name = asset.metadata.name
	} else {
		name = 'Unknown Name'
	}
	return name
}
