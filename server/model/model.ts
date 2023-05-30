import user from './user'
import organisation from './organisation'
import userOrganisation from './user_organisation'

class Model {
    user = user
    organisation = organisation
    userOrganisation = userOrganisation
}

export default new Model() 