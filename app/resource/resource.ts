import Network from "../network/network"
import { NetworkConfig } from '../network/network.type'
import config from '../../config/config'
import Storage from '../module/storage/storage'
import { CONST_KEYS } from '../const/const'


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
    auth 
})

const API_POST = API.CreateCaller({
    method: 'POST'
})

interface IRes<T> {
    data: {

        success: boolean
        error: {
            code: string
            message: string
        }
        data: T
    }
}

interface LoginReq {
    email: string
    password: string
}

interface LoginRes extends IRes<{ authorization: string }>{}

interface SignupReq {
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
}

interface SignupRes extends IRes<{ authorization: string }> {}

interface LogoutReq {}

class Api {
    public signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/signup', req)
	public login = (req: LoginReq) => API_POST<LoginReq, LoginRes>('/api/login', req)
    public logout = () => API_POST<LogoutReq, IRes<{}>>('/api/logout')
}

export default {
    api: new Api()
}