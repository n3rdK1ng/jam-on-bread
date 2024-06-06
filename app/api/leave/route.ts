import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async () => {
	cookies().delete('wallet')
	return new NextResponse('OK')
}
