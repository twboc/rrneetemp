import { NetworkCustomResponseHandler } from '../../network/network.type'
import { ApiResponseHandler } from '../resource.response.type'

interface ApiDefaultResponseHandler extends ApiResponseHandler {
	NetworkFail: NetworkCustomResponseHandler
	ResponseFail: NetworkCustomResponseHandler
	ResponseIsSuccess: NetworkCustomResponseHandler
	ResponseIsNotSuccess: NetworkCustomResponseHandler
}

export default ApiDefaultResponseHandler
