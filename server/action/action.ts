import AuthAction from './auth/auth'
import User from './user'
import OrganisationAction from './organisation'

class Action {
    
    Auth = AuthAction
    User = User
    Organisation = OrganisationAction
}

export default new Action()