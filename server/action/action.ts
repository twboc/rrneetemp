import AuthAction from './auth'
import OrganisationAction from './organisation'

class Action {
    Auth = AuthAction
    Organisation = OrganisationAction
}

export default new Action()