'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form'
import { Input } from './ui/input'

const FormSchema = z.object({
	wallet: z.string().min(2, {
		message: 'Wallet must be at least 2 characters.',
	}),
})

export const WalletForm = () => {
	const router = useRouter()
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { wallet: '' },
	})

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		try {
			await axios.get(`/api?wallet=${data.wallet}`)
			router.push('/')
		} catch (error) {
			if (error instanceof AxiosError && error.response) {
				form.setError('wallet', {
					type: 'manual',
					message: 'An error occurred. Please try again.',
				})
			}
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}
					name="wallet"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Wallet</FormLabel>
							<FormControl>
								<Input placeholder="addr1vpu5vlrf4xkx..." {...field} />
							</FormControl>
							<FormDescription>
								This is your chosen payment address.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
