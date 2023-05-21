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

const API_GET = API.CreateCaller({
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

interface LogoutReq {}

class Auth {
    public Signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/auth/signup', req)
	public Login = (req: LoginReq) => API_POST<LoginReq, LoginRes>('/api/auth/login', req)
    public Logout = () => API_POST<LogoutReq, IRes<{}>>('/api/auth/logout')
}

class Organisation {
    Get = async (req: SignupReq) => await API_GET<SignupReq, SignupRes>('/api/organisation', req)
    // public Signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/auth/signup', req)
	// public Login = (req: LoginReq) => API_POST<LoginReq, LoginRes>('/api/auth/login', req)
    // public Logout = () => API_POST<LogoutReq, IRes<{}>>('/api/auth/logout')
}



class Api {

    Auth = new Auth()
    // public signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/auth/signup', req)
	// public login = (req: LoginReq) => API_POST<LoginReq, LoginRes>('/api/auth/login', req)
    // public logout = () => API_POST<LogoutReq, IRes<{}>>('/api/auth/logout')
}

export default {
    api: new Api()
}