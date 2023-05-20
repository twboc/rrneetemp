import UserModel from './user'
import OrganisationModel from './organisation'
import UserOrganisationModel from './user_organisation'

class Model {
    User = UserModel
    Organisation = OrganisationModel
    UserOrganisation = UserOrganisationModel
}


export default new Model() 