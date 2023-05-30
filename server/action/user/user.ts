import { Request, Response } from 'express'
import { hasAuthorization, validateAuthorisation } from '../../module/authorization/authorization'
import respond from '../../respond/respond'
import model from '../../model/model'
import { userOrganisationFlatten } from './user.util'

export const init = async (req: Request, res: Response) => {
    const authorization = hasAuthorization(req)
    const token = await validateAuthorisation(authorization)
    const result = await model.userOrganisation.readByUser({ id: token.id })
    if (!result.success) { return respond.user.init.fail.userOrganisationQuery(res) }
    const organisations = result.data.UserOrganisation.map(userOrganisationFlatten)
    return respond.user.init.success(res, { organisations })
}

class User {
    init = init
}

export default new User()