import auth from './resource.api.auth'
import user from './resource.api.user'
import organisation from './resource.api.organisation'

class Api {
    auth = auth
    user = user
    organisation = organisation
}

export default new Api()