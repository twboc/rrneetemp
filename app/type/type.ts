
export type ANY = any

export type Hook = ((...args: any[]) => any[]) | null
export type ChainHook<T = void> =
	| ((preArgs: any[], returnArgs: any[], postArgs: any[]) => T)
	| null
