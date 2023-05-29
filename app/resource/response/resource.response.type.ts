import { NetworkCustomResponseHandler } from '../../network/network.type'

export interface ApiResponseHandler {
	Response: NetworkCustomResponseHandler
}

export interface NetworkResponseError {
	code: string
	description: string
	field: string
}

export interface NetworkResponseData<D = null> {
	isSuccess: boolean
	data: D
	error: NetworkResponseError[] | null
}
