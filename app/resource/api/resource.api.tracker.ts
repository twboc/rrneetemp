import { API_POST } from './resource.api.method'
import { IRes } from './resource.api.type'
import { WithName } from '../../type/interface'
import type {IUser, IUserOrganisation, IUserOrganisationWithUser} from '../../../shared/type/type'
import URL from '../../../shared/url/url'

interface CreateDomainReq {
    domain: string
}

interface SignupReq {
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
}

interface ChangeNameReq extends WithName {
    organisation_id: string
}

interface SignupReq {
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
}

interface AddUserReq extends SignupReq {
    organisation_id: string
}

interface UserAddRes extends IRes<{ user: Omit<IUser, 'salt' | 'password_hash'>, user_organisation: IUserOrganisation }> { }

interface DeleteUserReq {
    user_id: string
    organisation_id: string
}

interface GetUserReq {
    organisation_id: string
}

interface GetUserRes extends IRes<{ 
    user_organisation: IUserOrganisationWithUser[]
}> { }

class Tracker {
    
    create = async (req: CreateDomainReq) => (await API_POST<CreateDomainReq, GetUserRes>(URL.TRACKER.DOMAIN.CREATE, req))
    
}

export default new Tracker()