
export type ANY = any

export type Hook = ((...args: any[]) => any[]) | null
export type ChainHook<T = void> =
	| ((preArgs: any[], returnArgs: any[], postArgs: any[]) => T)
	| null

interface Result {
	id: number
	subtype: string
	title: string
	type: string
	url: string
}

export type {
	Result
}
