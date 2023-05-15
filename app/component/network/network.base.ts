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
      this.DefaultResponse = config.response?.bind(this)
    }
  }

  protected NetworkDefaultAuth = async (
    config: NetworkConfig,
  ): Promise<NetworkConfig> => {
    return await mock(config)
  }

  protected DefaultResponse = <R>(
    res: NetworkResponse<R>,
    config: NetworkConfig,
  ): NetworkResponse<R> => res

  protected CreateCallerConfigBase = (config: NetworkConfig): NetworkConfig => {
    if (!config.baseURL) {
      config.baseURL = this.baseURL
    }

    if (!config.method) {
      config.method = Method.GET
    }

    if (!config.response) {
      config.response = this.DefaultResponse
    }

    return {...config}
  }

  protected EstablishConfig = async <T>(
    config: NetworkConfig,
    url: NetworkUrl,
    data?: T,
  ): Promise<NetworkConfig> => {
    config = this.SetUrlAndData(config, url, data)
    config = await this.UseAuthDecorator(config)
    return config
  }

  protected SetUrlAndData = <T>(
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

  protected UseAuthDecorator = async (
    config: NetworkConfig,
  ): Promise<NetworkConfig> => {
    if (this.auth != undefined) {
      await this.auth(config)
    }
    return config
  }

  protected DefineResponseHandler = (
    config: NetworkConfig,
  ): NetworkResponseHandler => {
    return config?.response ? config.response : this.DefaultResponse
  }
}

export default NetworkBase
