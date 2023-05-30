import { API_POST } from './resource.api.method'
import { IRes } from './resource.api.type'
import { WithName } from '../../type/interface'
import type {IUser, IUserOrganisation, IUserOrganisationWithUser} from '../../../shared/type/type'

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

class Organisation {
    changeName = async (req: ChangeNameReq) => await API_POST<ChangeNameReq, IRes<WithName> >('/api/organisation/name', req)
    user = {
        get: async (req: GetUserReq) => (await API_POST<GetUserReq, GetUserRes>('/api/organisation/user/', req)),
        add: async (req: AddUserReq) => (await API_POST<AddUserReq, UserAddRes>('/api/organisation/user/add', req)),
        delete: async (req: DeleteUserReq) => (await API_POST<DeleteUserReq, IRes<{}>>('/api/organisation/user/delete', req)),
    }
}

export default new Organisation()