'use client'

import Image from 'next/image'
import { useState } from 'react'

import { AssetInfo } from '#/utils/api/types'
import { getAssetName } from '#/utils/misc'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'

export const AssetDetail = ({ asset }: { asset: AssetInfo }) => {
	const [error, setError] = useState(false)

	let imageSrc = '/error.png'
	let altText = 'Error Image'

	if (!error) {
		if (
			asset.onchain_metadata &&
			typeof asset.onchain_metadata.image === 'string' &&
			asset.onchain_metadata.image.includes('ipfs://')
		) {
			imageSrc = asset.onchain_metadata.image.replace(
				'ipfs://',
				'https://ipfs.io/ipfs/',
			)
			altText = 'Onchain Metadata Image'
		} else if (asset.metadata && typeof asset.metadata.logo === 'string') {
			imageSrc = `data:image/png;base64,${asset.metadata.logo}`
			altText = 'Metadata Image'
		}
	}

	return (
		<Dialog>
			<DialogTrigger className="w-full">
				{imageSrc === '/error.png' || error ? (
					<div className="rounded-lg hover:border border-primary bg-primary/10 w-full aspect-square max-w-[420px] grid items-center justify-center text-5xl">
						⚠️
					</div>
				) : (
					<Image
						src={imageSrc}
						alt={altText}
						width={420}
						height={420}
						className="rounded-lg hover:border border-primary"
						onError={() => setError(true)}
					/>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{getAssetName(asset)}</DialogTitle>
					<DialogDescription>
						<div className="flex gap-2">
							<b>Asset:</b>
							<div className="break-all">{asset.asset}</div>
						</div>
						<div className="flex gap-2">
							<b>Policy:</b>
							<div className="break-all">{asset.policy_id}</div>
						</div>
						<div className="flex gap-2">
							<b>Quantity:</b>
							<div className="break-all">{asset.quantity}</div>
						</div>
						<div className="flex gap-2">
							<b>Mint Count:</b>
							<div className="break-all">{asset.mint_or_burn_count}</div>
						</div>
					</DialogDescription>
				</DialogHeader>
				{asset.onchain_metadata && (
					<>
						<div>Onchain Metadata:</div>
						<pre className="text-xs lg:text-sm overflow-x-auto">
							<code>{JSON.stringify(asset.onchain_metadata, null, 2)}</code>
						</pre>
					</>
				)}
				{asset.metadata && (
					<>
						<div>Metadata:</div>
						<pre className="text-xs lg:text-sm overflow-x-auto">
							<code>
								{JSON.stringify(
									asset.metadata,
									(key, value) => (key === 'logo' ? undefined : value),
									2,
								)}
							</code>
						</pre>
					</>
				)}
			</DialogContent>
		</Dialog>
	)
}
