import Network from '../../network/network'
import {is200} from '../util'
import {OAuthGoogleApisConfig, OAuthGoogleApisResponse} from './google.type'
import {NetworkResponse} from '../../network/network.type'

const response = <R>(res: NetworkResponse<R>): OAuthGoogleApisResponse<R> => {
  return {
    ...res,
    success: is200(res),
  }
}

const OAuth2GoogleApis = new Network<OAuthGoogleApisConfig>({
  baseURL: 'https://oauth2.googleapis.com',
  response,
})

export default OAuth2GoogleApis
