import {
  NetworkConfig,
  NetworkUrl,
  NetworkPayload,
  NetworkResponse,
  NetworkResponseHandler,
  NetworkCallerConfig,
  NetworkCallerCreator,
  NetworkInitConfig,
} from './network.type'
import NetworkBase from './network.base'
import NetworkNativeHandler from './network.handler'

class Network<CustomConfig> extends NetworkBase {
  private Native: NetworkNativeHandler
  constructor(config: NetworkInitConfig & CustomConfig) {
    super(config)
    this.Native = new NetworkNativeHandler()
  }

  factory = (
    config: NetworkInitConfig & CustomConfig,
  ): Network<CustomConfig> => {
    return new Network<CustomConfig>(config)
  }

  caller = <
    DefaultCallerData = NetworkPayload,
    DefaultCallerResponse = NetworkResponse<DefaultCallerData>,
  >(
    configTemplate: NetworkCallerConfig, // | CustomConfig
  ): NetworkCallerCreator<CustomConfig> => {
    const configBase = this.callerConfigBase(configTemplate)
    return async <
      T = DefaultCallerData,
      R = DefaultCallerResponse,
      C = CustomConfig,
    >(
      url: NetworkUrl,
      data?: T,
      customConfig?: NetworkConfig | CustomConfig | C,
    ): Promise<R> => {
      const config: NetworkConfig = await this.establishConfig<T>(
        {...configBase, ...customConfig},
        url,
        data,
      )

      const responseHandler: NetworkResponseHandler =
        this.defineResponseHandler(config)

      return this.Native.Request<R>(config)
        .then<R>(res => responseHandler<R>(res, config) as R)
        .catch<R>(error => responseHandler<R>(error.response, config) as R)
    }
  }
}

export default Network
