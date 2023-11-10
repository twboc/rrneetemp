import { IUserOrganisationByUser } from '../../../shared/type/type'
import { API_GET } from './resource.api.method'
import { IRes } from './resource.api.type'
import URL from '../../../shared/url/url'

interface UserInitReq {}

interface UserInnitRes extends IRes<{ organisations: IUserOrganisationByUser[] }> {}

class User {
    init = async () => await API_GET<UserInitReq, UserInnitRes>(URL.USER.INIT)
}

export default new User()