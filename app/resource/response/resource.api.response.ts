import { ApiResponseHandler } from '../response/resource.response.type'
import DefaultHandler from './resource.api.response.default'

class Response {
	response
	constructor(handler: ApiResponseHandler) {
		this.response = handler.Response
	}
}

const APIResponder = new Response(new DefaultHandler())
const response = APIResponder.response

export default Response

export { response, APIResponder }
