// import { hookFunction } from '../../Util/Util'
// import { Hook, ChainHook } from '../../Type/Type'
import { SliceActions } from './store.type'

import { useEffect, useRef } from 'react'
// import { ANY, Hook, ChainHook } from '../Type/Type'

export const usePrevious = <T extends unknown>(value: T): T | undefined => {
	const ref = useRef<T>()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}

export const hookFunction = <R>(
	source: any,
	pre: Hook = null,
	post: Hook = null,
	chain: ChainHook = null
): R => {
	return ((originalFunction) => {
		return function (...args: any[]) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const self = this
			const preArgs = pre ? pre.apply(self, args) : args
			const returnArgs = originalFunction.apply(self, preArgs)
			const postArgs = post
				? post.apply(self, [returnArgs, originalFunction, args])
				: returnArgs
			return chain ? chain(preArgs, returnArgs, postArgs) : postArgs
		} as unknown as R
	})(source)
}


export type Hook = ((...args: any[]) => any[]) | null
export type ChainHook<T = void> =
	| ((preArgs: any[], returnArgs: any[], postArgs: any[]) => T)
	| null


export const HookActions =
	<T>(pre: Hook = null, post: Hook = null, chain: ChainHook = null) =>
	(actions: SliceActions): T => {
		const hookedActions: T = {} as T
		for (const key in actions) {
			hookedActions[key as keyof T] = hookFunction<T[keyof T]>(
				actions[key],
				pre,
				post,
				chain
			)
		}
		return hookedActions
	}
