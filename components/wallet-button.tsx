'use client'

import axios from 'axios'
import { CircleUser } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const WalletButton = ({ adaAmount }: { adaAmount: number }) => {
	const router = useRouter()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="absolute left-6 top-6">
				<Button variant="outline" size="icon">
					<CircleUser className="absolute h-[1.2rem] w-[1.2rem]" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuLabel>₳ {adaAmount}</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={async () => {
						await axios.get('/api/leave')
						router.push('/auth')
					}}
				>
					Leave
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
