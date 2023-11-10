import auth from './auth/auth'
import user from './user/user'
import organisation from './organisation/organisation'
import tracker from './tracker/tracker'

class Action {
    auth = auth
    user = user
    organisation = organisation
    tracker = tracker
}

export default new Action()