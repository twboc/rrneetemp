import Network from "../network/network"
import { NetworkConfig } from '../network/network.type'
import config from '../../config/config'
import Storage from '../module/storage/storage'
import { CONST_KEYS } from '../const/const'
import { response } from './response/resource.api.response'

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
    // response
})

const API_POST = API.caller({
    method: 'POST'
})

const API_GET = API.caller({
    method: 'GET'
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

interface UserInitReq {}

interface UserInnitRes extends IRes<{ organisations: any[] }> {}

interface LogoutReq {}

class Auth {
    Signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/auth/signup', req)
	Login = (req: LoginReq) => API_POST<LoginReq, LoginRes>('/api/auth/login', req)
    Logout = () => API_POST<LogoutReq, IRes<{}>>('/api/auth/logout')
}

class Organisation {
    Get = async (req: SignupReq) => await API_GET<SignupReq, SignupRes>('/api/organisation', req)
}


class User {
    Init = async () => await API_GET<UserInitReq, UserInnitRes>('/api/user/init')
}


class Api {
    Auth = new Auth()
    User = new User()
    Organisation = new Organisation()
}

export default {
    Api: new Api()
}