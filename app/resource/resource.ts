import Network from "../network/network"
import { NetworkConfig, NetworkResponse } from '../network/network.type'
import config from '../../config/config'
import Storage from '../module/storage/storage'
import { CONST_KEYS } from '../const/const'
import { response } from './response/resource.api.response'
import { IUserOrganisationByUser } from '../../shared/type/type'

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

const API_POST = API.caller({
    method: 'POST'
})

const API_GET = API.caller({
    method: 'GET'
})

interface IRes<T> {
    meta: NetworkResponse<T>
    success: boolean
    error: {
        code: string
        message: string
    }
    data: T
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

interface UserInnitRes extends IRes<{ organisations: IUserOrganisationByUser[] }> {}

interface LogoutReq {}

class Auth {
    signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/auth/signup', req)
	login = (req: LoginReq) => API_POST<LoginReq, LoginRes>('/api/auth/login', req)
    logout = () => API_POST<LogoutReq, IRes<{}>>('/api/auth/logout')
}

class Organisation {
    get = async (req: SignupReq) => await API_GET<SignupReq, SignupRes>('/api/organisation', req)
}


class User {
    init = async () => await API_GET<UserInitReq, UserInnitRes>('/api/user/init')
}


class Api {
    auth = new Auth()
    user = new User()
    organisation = new Organisation()
}

export default {
    api: new Api()
}