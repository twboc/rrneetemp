import AuthAction from './auth/auth'
import User from './user/user'
import OrganisationAction from './organisation/organisation'

class Action {
    
    Auth = AuthAction
    User = User
    Organisation = OrganisationAction
}

export default new Action()