import {
  NetworkConfig,
  NetworkUrl,
  NetworkConfigDecorator,
  NetworkInitConfig,
  NetworkResponse,
  NetworkResponseHandler,
  Method,
} from './network.type'
import {mock} from './network.util'

abstract class NetworkBase {
  protected baseURL: NetworkUrl
  protected auth?: NetworkConfigDecorator = undefined

  constructor(config: NetworkInitConfig) {
    this.baseURL = config.baseURL
    if (config.auth) {
      this.auth = config.auth
    }
    if (config.response) {
      this.defaultResponse = config.response?.bind(this)
    }
  }

  protected networkDefaultAuth = async (
    config: NetworkConfig,
  ): Promise<NetworkConfig> => {
    return await mock(config)
  }

  protected defaultResponse = <R>(
    res: NetworkResponse<R>,
    config: NetworkConfig,
  ): NetworkResponse<R> => res

  protected callerConfigBase = (config: NetworkConfig): NetworkConfig => {
    if (!config.baseURL) {
      config.baseURL = this.baseURL
    }

    if (!config.method) {
      config.method = Method.GET
    }

    if (!config.response) {
      config.response = this.defaultResponse
    }

    return {...config}
  }

  protected establishConfig = async <T>(
    config: NetworkConfig,
    url: NetworkUrl,
    data?: T,
  ): Promise<NetworkConfig> => {
    config = this.setUrlAndData(config, url, data)
    config = await this.useAuthDecorator(config)
    return config
  }

  protected setUrlAndData = <T>(
    config: NetworkConfig,
    url: NetworkUrl,
    data?: T,
  ): NetworkConfig => {
    config.url = url
    if (data) {
      config.data = data
    }
    return config
  }

  protected useAuthDecorator = async (
    config: NetworkConfig,
  ): Promise<NetworkConfig> => {
    if (this.auth != undefined) {
      await this.auth(config)
    }
    return config
  }

  protected defineResponseHandler = (
    config: NetworkConfig,
  ): NetworkResponseHandler => {
    return config?.response ? config.response : this.defaultResponse
  }
}

export default NetworkBase
