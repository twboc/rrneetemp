import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosPromise,
  Method as AxiosMethod,
} from 'axios'

export type NetworkConfigNative = AxiosRequestConfig
export interface NetworkConfig extends NetworkConfigNative {
  withAuth?: boolean
  response?: NetworkResponseHandler
}

export interface NetworkCallerConfig extends NetworkConfig {
  method: NetworkMethod
}

export type NetworkUrl = string
export type NetworkMethod = AxiosMethod
export type NetworkPayload = unknown
export type NetworkResponse<T> = AxiosResponse<T>
export type NetworkPromise<T> = AxiosPromise<T>

export type NetworkDefaultResponseHandler = <R>(
  res: NetworkResponse<R>,
  config: NetworkConfig,
) => NetworkResponse<R>

export type NetworkCustomResponseHandler = <R>(
  res: NetworkResponse<R>,
  config: NetworkConfig,
) => R

export type NetworkResponseHandler =
  | NetworkDefaultResponseHandler
  | NetworkCustomResponseHandler

export type NetworkCallerCreator<C> = <
  T = unknown,
  R = NetworkResponse<T>,
  Custom = C,
>(
  url: NetworkUrl,
  data?: T | NetworkPayload,
  customConfig?: NetworkConfig | Custom,
) => Promise<R>

export type NetworkConfigDecorator = (
  config: NetworkConfig,
) => Promise<NetworkConfig>

export interface NetworkInitConfig {
  baseURL: NetworkUrl
  auth?: NetworkConfigDecorator
  response?: NetworkDefaultResponseHandler
}

export interface MethodList {
  [key: string]: NetworkMethod
}

export const Method: MethodList = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
  HEAD: 'head',
  OPTIONS: 'options',
  PURGE: 'purge',
  LINK: 'link',
  UNLINK: 'unlink',
}
