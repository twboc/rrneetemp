import user from './user'
import organisation from './organisation'
import userOrganisation from './user_organisation'
import domain from './domain'
import domain_order from './domain_order'
import domain_permission from './domain_permission'
import query from './query'
import query_variant from './query_variant'

class Model {
    user = user
    organisation = organisation
    userOrganisation = userOrganisation
    domain = domain
    domain_order = domain_order
    domain_permission = domain_permission
    query = query
    query_variant = query_variant
}

export default new Model() 