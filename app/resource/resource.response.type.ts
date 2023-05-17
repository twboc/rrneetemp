import { NetworkCustomResponseHandler } from '../network/network.type'

export interface ApiResponseHandler {
	Response: NetworkCustomResponseHandler
}

export interface NetworkResponseError {
	code: string
	description: string
	field: string
}

export interface NetworkResponseData<C = null> {
	isSuccess: boolean
	content: C
	error: NetworkResponseError[] | null
}
