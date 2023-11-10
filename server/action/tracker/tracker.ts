import { Request, Response } from 'express'
import auth from '../../module/authorization/authorization'
import respond from '../../respond/respond'
import model from '../../model/model'
import {v4} from 'uuid'

export const create = async (req: Request<{}, {}, { domain: string, organisation_id: string}>, res: Response) => {
    console.log("Create!!!", req.body.domain)
    const domainName = 'google.com'
    const token = await auth.token(req)
    if (!token.success) return respond.user.init.fail.default(res)

    const domain = { id : v4(), domain: domainName }
    const domainResult = await model.domain.create(domain)
    
    if (!domainResult.success) { console.log("FIRST ERROR")}

    const domainPermission = {
        id: v4(),
        domain_id: domain.id,
        user_id: token.data.token.id,
        organisation_id: req.body.organisation_id,
        access: 'OWNER'
    }

    const domainPermissionResult = await model.domain_permission.create(domainPermission)

    if (!domainPermissionResult.success) { console.log("SECOND ERROR")}

    
    const response = {
        ...domain,
        permissions: [domainPermission]
    }

    return respond.tracker.domain.create.success(res, response)

}

class Tracker {
    domain = {
        create: create
    }
}

export default new Tracker()