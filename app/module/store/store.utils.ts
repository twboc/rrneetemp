import {SliceActions} from './store.type'
import {useEffect, useRef} from 'react'
import {Hook, ChainHook} from '../../type/type'

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
  chain: ChainHook = null,
): R => {
  return (originalFunction => {
    return function (...args: any[]) {
      //@ts-ignore
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

export const hookActions =
  <T>(pre: Hook = null, post: Hook = null, chain: ChainHook = null) =>
  (actions: SliceActions): T => {
    const hookedActions: T = {} as T
    for (const key in actions) {
      hookedActions[key as keyof T] = hookFunction<T[keyof T]>(
        actions[key],
        pre,
        post,
        chain,
      )
    }
    return hookedActions
  }
