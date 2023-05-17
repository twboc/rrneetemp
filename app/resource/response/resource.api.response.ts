import { ApiResponseHandler } from '../resource.response.type'
import DefaultHandler from './resource.api.response.default'

class Response {
	public response
	constructor(handler: ApiResponseHandler) {
		this.response = handler.Response
	}
}

const APIResponder = new Response(new DefaultHandler())
const response = APIResponder.response

export default Response

export { response, APIResponder }
