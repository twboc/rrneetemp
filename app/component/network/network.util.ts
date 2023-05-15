import {NetworkConfig} from './network.type'

export const mock = async (config: NetworkConfig): Promise<NetworkConfig> => {
  return new Promise<NetworkConfig>( resolve => {
    return resolve(config)
  })
}
