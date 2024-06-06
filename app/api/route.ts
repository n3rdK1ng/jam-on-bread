import { addHours } from 'date-fns'
import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'

import { blockfrost } from '#/utils/api'

export const GET = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams
	const walletParam = searchParams.get('wallet') as string

	await blockfrost.get('/addresses/' + walletParam)

	cookies().set('wallet', walletParam, {
		httpOnly: true,
		path: '/',
		// the cookie will expire in 1 hour
		expires: addHours(new Date(), 1),
	})

	return new Response(null, {
		status: 200,
	})
}
