import { Request, Response } from 'express'
import auth from '../../module/authorization/authorization'
import respond from '../../respond/respond'
import model from '../../model/model'
import { userOrganisationFlatten } from './user.util'

export const init = async (req: Request, res: Response) => {
    const token = await auth.token(req)
    if (!token.success) return respond.user.init.fail.default(res)
    const result = await model.userOrganisation.readByUser({ user_id: token.data.token.id })
    if (!result.success) { return respond.user.init.fail.userOrganisationQuery(res) }
    const organisations = result.data.UserOrganisation.map(userOrganisationFlatten)
    return respond.user.init.success(res, { organisations })
}

class User {
    init = init
}

export default new User()