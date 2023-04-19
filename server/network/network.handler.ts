import Axios from 'axios'
import {NetworkConfigNative, NetworkResponse} from './network.type'

class NetworkNativeHandler {
  public Request = async <R>(
    config: NetworkConfigNative,
  ): Promise<NetworkResponse<R>> => await Axios.request<R>(config)
}

export default NetworkNativeHandler
