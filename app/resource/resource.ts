import Network from "../network/network"
import config from '../../config/config'



const API = new Network({
    baseURL: `http://${config.server.url}:${config.server.port}`
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

interface LoginRes extends IRes<{}>{}

interface SignupReq {
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
}

interface SignupRes extends IRes<{}> {}

class Api {
	public login = (req: LoginReq) => API_POST<LoginReq, LoginRes>('/api/login', req)
    public signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/signup', req)
}

export default {
    api: new Api()
}