import axios from 'axios'

export const blockfrost = axios.create({
	baseURL: process.env.BLOCKFROST_API_URL,
	headers: {
		project_id: process.env.BLOCKFROST_API_KEY,
	},
})
