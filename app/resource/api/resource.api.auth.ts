import { API_POST } from './resource.api.method'
import { IRes } from './resource.api.type'

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

interface AddUserReq extends SignupReq {
    organisation_id: string
}

interface SignupRes extends IRes<{ authorization: string }> {}

interface LogoutReq {}

class Auth {
    signup = async (req: SignupReq) => await API_POST<SignupReq, SignupRes>('/api/auth/signup', req)
	login = (req: LoginReq) => API_POST<LoginReq, LoginRes>('/api/auth/login', req)
    logout = () => API_POST<LogoutReq, IRes<{}>>('/api/auth/logout')
}

export default new Auth()