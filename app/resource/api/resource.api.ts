import auth from './resource.api.auth'
import user from './resource.api.user'
import organisation from './resource.api.organisation'
import tracker from './resource.api.tracker'

class Api {
    auth = auth
    user = user
    organisation = organisation
    tracker = tracker
}

export default new Api()