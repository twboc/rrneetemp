import {
	NetworkResponse,
	NetworkCustomResponseHandler,
	NetworkConfig
} from '../../network/network.type'
import { Is200, HasData, IsSuccess } from '../resource.response.util'

export interface ApiCustomConfig {
	UnhandledResponse?: NetworkCustomResponseHandler
	NetworkFail?: NetworkCustomResponseHandler
	ResponseFail?: NetworkCustomResponseHandler
	ResponseIsSuccess?: NetworkCustomResponseHandler
	ResponseIsNotSuccess?: NetworkCustomResponseHandler
}

export const UnhandledResponse: NetworkCustomResponseHandler = <R>(
	res: NetworkResponse<R>
): R => {
	return {
		isSuccess: false,
		//@ts-ignore
		data: null,
		error: [res?.statusText]
	} as unknown as R
}

export const NetworkFail: NetworkCustomResponseHandler = <R>(
	res: NetworkResponse<R>
): R => {
	const resFailed = {
		isSuccess: false,
		//@ts-ignore
		data: null,
		error: [res?.statusText]
	}
	return resFailed as unknown as R
}

export const ResponseFail: NetworkCustomResponseHandler = <R>(
	res: NetworkResponse<R>
): R => {
	const resFailed = {
		isSuccess: false,
		//@ts-ignore
		data: null,
		error: [res?.statusText]
	}
	return resFailed as unknown as R
}

export const ResponseIsSuccess: NetworkCustomResponseHandler = <R>(
	res: NetworkResponse<R>
): R => {
	return res.data as unknown as R
}

export const ResponseIsNotSuccess: NetworkCustomResponseHandler = <R>(
	res: NetworkResponse<R>
): R => {
	return res.data as unknown as R
}

export const Response: NetworkCustomResponseHandler = <R>(
	res: NetworkResponse<R>,
	config: NetworkConfig & ApiCustomConfig
): R => {
	if (!Is200(res)) {
		return config.NetworkFail
			? config.NetworkFail<R>(res, config)
			: NetworkFail<R>(res, config)
	}

	if (!HasData<R>(res)) {
		return config.ResponseFail
			? config.ResponseFail<R>(res, config)
			: ResponseFail<R>(res, config)
	}

	if (HasData<R>(res)) {
		return IsSuccess<R>(res)
			? config.ResponseIsSuccess
				? config.ResponseIsSuccess<R>(res, config)
				: ResponseIsSuccess<R>(res, config)
			: config.ResponseIsNotSuccess
				? config.ResponseIsNotSuccess<R>(res, config)
				: ResponseIsNotSuccess<R>(res, config)
	}

	return config.UnhandledResponse
		? config.UnhandledResponse<R>(res, config)
		: UnhandledResponse<R>(res, config)
}
