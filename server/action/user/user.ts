import { Request, Response } from 'express'
import { hasAuthorization, validateAuthorisation } from '../../module/authorization/authorization'
import Respond from '../../respond/respond'
import Model from '../../model/model'
import { userOrganisationFlatten } from './user.util'

export const init = async (req: Request, res: Response) => {
    const authorization = hasAuthorization(req)
    const token = await validateAuthorisation(authorization)
    const result = await Model.UserOrganisation.readByUser({ id: token.id })
    if (!result.success) { return Respond.User.Init.Fail.UserOrganisationQuery(res) }
    const organisations = result.data.UserOrganisation.map(userOrganisationFlatten)
    return Respond.User.Init.Success(res, { organisations })
}

class User {
    init = init
}

export default new User()