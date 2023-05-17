import Network from '../../../app/network/network'
import {is200} from '../util'
import {OAuthDropboxApisConfig} from './dropbox.type'
import {NetworkResponse} from '../../../app/network/network.type'

const response = <R>(res: NetworkResponse<R>) => {
  return {
    ...res,
    success: is200(res),
  }
}

const DropboxApi = new Network<OAuthDropboxApisConfig>({
  baseURL: 'https://www.dropbox.com',
  response,
})

export default DropboxApi
