'use client'

import Image from 'next/image'
import { useState } from 'react'

import { AssetInfo } from '#/utils/api/types'

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

	return (
		<Dialog>
			<DialogTrigger className="w-full">
				{!error ? (
					<Image
						src={
							typeof asset.onchain_metadata.image === 'string'
								? asset.onchain_metadata.image.replace(
										'ipfs://',
										'https://ipfs.io/ipfs/',
									)
								: '/error.png'
						}
						alt="Onchain Metadata Image"
						width={420}
						height={420}
						className="rounded-lg hover:border border-primary"
						onError={() => setError(true)}
					/>
				) : (
					<div className="rounded-lg hover:border border-primary bg-primary/10 w-full aspect-square max-w-[420px] grid items-center justify-center text-5xl">
						⚠️
					</div>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{asset.onchain_metadata.name}</DialogTitle>
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
				<div>Metadata:</div>
				<pre className="text-xs lg:text-sm overflow-x-auto">
					<code>{JSON.stringify(asset.onchain_metadata, null, 2)}</code>
				</pre>
			</DialogContent>
		</Dialog>
	)
}
