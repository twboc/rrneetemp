import {NetworkResponse} from '../../../app/network/network.type'

export interface OAuthGoogleApisConfig {}

export interface WithSuccess {
  success: boolean
}

export interface OAuthGoogleApisResponse<R>
  extends NetworkResponse<R>,
    WithSuccess {
  data: R
}

export interface TokenReq {
  code: string
}

export interface TokenRes {
  access_token: string
  refresh_token: string
  scope: string
  token_type: string
  id_token: string
}
