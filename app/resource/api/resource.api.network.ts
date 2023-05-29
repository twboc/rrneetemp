import Network from "../../network/network"
import { NetworkConfig } from '../../network/network.type'
import config from '../../../config/config'
import Storage from '../../module/storage/storage'
import { CONST_KEYS } from '../../const/const'
import { response } from '../response/resource.api.response'

const auth = async (config: NetworkConfig) => {
    const authorization = await Storage.get(CONST_KEYS.authorization)
    if (authorization) {
        config.headers = { ...config.headers }
        config.headers.Authorization = `Bearer ${authorization}`
    }
    return config
}

const API = new Network({
    baseURL: `http://${config.server.url}:${config.server.port}`,
    auth,
    //@ts-ignore
    response
})

export default API