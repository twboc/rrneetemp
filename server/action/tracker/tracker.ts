import { Request, Response } from 'express'
import auth from '../../module/authorization/authorization'
import respond from '../../respond/respond'
import model from '../../model/model'
import {v4} from 'uuid'
// import { userOrganisationFlatten } from './user.util'

export const create = async (req: Request, res: Response) => {
    const token = await auth.token(req)
    if (!token.success) return respond.user.init.fail.default(res)

    const domainId = v4()
    const domainResult = await model.domain.create({ id : domainId, domain: '' // req.domain 
})
    
    if (!domainResult.success) { console.log("FIRST ERROR")}

    const domainPermissionId = v4()
    const domainPermissionResult = await model.domain_permission.create({
        id: domainPermissionId,
        domain_id: domainId,
        user_id: token.data.token.id,
        organisation_id: req.body.organisation_id,
        access: 'OWNER'
    })

    if (!domainPermissionResult.success) { console.log("SECOND ERROR")}


    // const domainPermissionResult = await model.domain_





    // const token = await auth.token(req)
    // if (!token.success) return respond.user.init.fail.default(res)
    // const result = await model.userOrganisation.readByUser({ user_id: token.data.token.id })
    // if (!result.success) { return respond.user.init.fail.userOrganisationQuery(res) }
    // const organisations = result.data.UserOrganisation.map(userOrganisationFlatten)
    // return respond.user.init.success(res, { organisations })

}

class Tracker {
    domain = {
        create: create
    }
}

export default new Tracker()