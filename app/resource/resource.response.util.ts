import { NetworkResponse } from '../network/network.type'
import { NetworkResponseData } from './resource.response.type'

export const IsSuccess = <R>(res: NetworkResponse<R>): boolean =>
	res?.data && (res?.data as unknown as NetworkResponseData<null>)?.isSuccess

export const HasData = <R>(res: NetworkResponse<R>): boolean =>
	res?.data && res.data != undefined

export const HasStatus =
	(status: number) =>
	<R>(res: NetworkResponse<R>): boolean =>
		res.status === status

export const Is200 = HasStatus(200)
