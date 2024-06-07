export type Amount = {
	unit: string
	quantity: string
}

export type AddressInfo = {
	address: string
	amount: Amount[]
	stake_address: string
	type: string
	script: boolean
}

export type AssetInfo = {
	asset: string
	policy_id: string
	asset_name: string
	fingerprint: string
	quantity: string
	initial_mint_tx_hash: string
	mint_or_burn_count: number
	onchain_metadata: any
	onchain_metadata_standard: string
	onchain_metadata_extra: any
	metadata: any
}
