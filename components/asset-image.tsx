'use client'

import Image from 'next/image'
import { useState } from 'react'

export const AssetImage = ({ src }: { src: string }) => {
	const [error, setError] = useState(false)

	return (
		<>
			{!error ? (
				<Image
					src={
						typeof src === 'string'
							? src.replace('ipfs://', 'https://ipfs.io/ipfs/')
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
		</>
	)
}
