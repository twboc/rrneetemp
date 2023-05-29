import { API_POST, API_GET } from './resource.api.method'
import { IRes } from './resource.api.type'
import { WithName } from '../../type/interface'

interface SignupReq {
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
}

interface ChangeNameReq extends WithName {
    organisation_id: string
}

interface OrganisationGetRes extends IRes<{ authorization: string }> {}

class Organisation {
    get = async (req: SignupReq) => await API_GET<SignupReq, OrganisationGetRes>('/api/organisation', req)
    changeName = async (req: ChangeNameReq) => await API_POST<ChangeNameReq, IRes<WithName> >('/api/organisation/name', req)
}

export default new Organisation()