import auth from './auth/auth'
import user from './user/user'
import organisation from './organisation/organisation'

class Action {
    auth = auth
    user = user
    organisation = organisation
}

export default new Action()