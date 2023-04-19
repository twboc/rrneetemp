import {NetworkResponse} from '../network/network.type'

export const HasData = <R>(res: NetworkResponse<R>): boolean =>
  res?.data && res.data != undefined

export const HasStatus =
  (status: number) =>
  <R>(res: NetworkResponse<R>): boolean =>
    res.status === status

export const is200 = HasStatus(200)
