import ApiDefaultResponseHandler from './resource.api.response.default.type'
import {
	Response,
	NetworkFail,
	ResponseFail,
	ResponseIsSuccess,
	ResponseIsNotSuccess
} from './resource.api.response.default.methods'

export class DefaultHandler implements ApiDefaultResponseHandler {
	Response = Response
	NetworkFail = NetworkFail
	ResponseFail = ResponseFail
	ResponseIsSuccess = ResponseIsSuccess
	ResponseIsNotSuccess = ResponseIsNotSuccess
}

export default DefaultHandler
