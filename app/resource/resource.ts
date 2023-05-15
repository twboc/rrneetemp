import Network from "../component/network/network"
import config from '../../config/config'

const API = new Network({
    baseURL: `${config.server.url}:${config.server.port}`
})

const API_POST = API.CreateCaller({
    method: 'POST'
})


interface LoginReq {}
interface LoginRes {}

interface SignupReq {
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
}

interface SignupRes {

}

class Api {
	public login = () => API_POST<LoginReq, LoginRes>('/api/login')
    public signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/signup', req)
}

export default {
    api: new Api()
}