import { IUserOrganisationByUser } from '../../../shared/type/type'
import { API_GET } from './resource.api.method'
import { IRes } from './resource.api.type'

interface UserInitReq {}

interface UserInnitRes extends IRes<{ organisations: IUserOrganisationByUser[] }> {}

class User {
    init = async () => await API_GET<UserInitReq, UserInnitRes>('/api/user/init')
}

export default new User()