import { API_POST, API_GET } from './resource.api.method'
import { IRes } from './resource.api.type'
import { WithName } from '../../type/interface'
import type {user as IUser, user_organisation as IUserOrganisation} from '@prisma/client'

interface SignupReq {
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
}

interface ChangeNameReq extends WithName {
    organisation_id: string
}

// interface OrganisationGetRes extends IRes<{ authorization: string }> {}

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

class Organisation {
    changeName = async (req: ChangeNameReq) => await API_POST<ChangeNameReq, IRes<WithName> >('/api/organisation/name', req)
    user = {
        add: async (req: AddUserReq) => await API_POST<AddUserReq, UserAddRes>('/api/organisation/user/add', req)
    }
}

export default new Organisation()